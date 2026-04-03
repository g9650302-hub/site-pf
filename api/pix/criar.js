// API Route para criar cobrança PIX via DrakePay
// Variáveis de ambiente necessárias:
// - DRAKEPAY_CLIENT_ID
// - DRAKEPAY_CLIENT_SECRET

const API_BASE = 'https://api.drakepay.app/api';

// Cache do token para evitar requisições desnecessárias
let cachedToken = null;
let tokenExpiry = null;

async function obterToken() {
    // Se temos um token válido em cache, usa ele
    if (cachedToken && tokenExpiry && Date.now() < tokenExpiry) {
        return cachedToken;
    }

    const response = await fetch(`${API_BASE}/auth/login`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            client_id: process.env.DRAKEPAY_CLIENT_ID,
            client_secret: process.env.DRAKEPAY_CLIENT_SECRET
        })
    });

    const data = await response.json();

    if (!data.success || !data.token) {
        throw new Error(data.error || 'Erro ao obter token de autenticação');
    }

    // Cache o token por 55 minutos (tokens expiram em 1 hora)
    cachedToken = data.token;
    tokenExpiry = Date.now() + (55 * 60 * 1000);

    return cachedToken;
}

export default async function handler(req, res) {
    // Apenas POST permitido
    if (req.method !== 'POST') {
        return res.status(405).json({ success: false, error: 'Método não permitido' });
    }

    // Validar variáveis de ambiente
    if (!process.env.DRAKEPAY_CLIENT_ID || !process.env.DRAKEPAY_CLIENT_SECRET) {
        console.error('Credenciais DrakePay não configuradas');
        return res.status(500).json({ success: false, error: 'Configuração incompleta do servidor' });
    }

    try {
        const { amount, external_id, payer, clientCallbackUrl } = req.body;

        // Validações
        if (!amount || amount < 0.01) {
            return res.status(400).json({ success: false, error: 'Valor inválido' });
        }

        if (!external_id) {
            return res.status(400).json({ success: false, error: 'ID externo obrigatório' });
        }

        if (!payer || !payer.name || !payer.email || !payer.document) {
            return res.status(400).json({ success: false, error: 'Dados do pagador incompletos' });
        }

        // Validar CPF (apenas números, 11 dígitos)
        const cpf = payer.document.replace(/\D/g, '');
        if (cpf.length !== 11) {
            return res.status(400).json({ success: false, error: 'CPF inválido' });
        }

        // Obter token de autenticação
        const token = await obterToken();

        // Criar cobrança PIX
        const pixPayload = {
            amount: parseFloat(amount),
            external_id: external_id,
            payer: {
                name: payer.name,
                email: payer.email,
                document: cpf
            }
        };

        // Adicionar URL de callback se fornecida
        if (clientCallbackUrl) {
            pixPayload.clientCallbackUrl = clientCallbackUrl;
        }

        const pixResponse = await fetch(`${API_BASE}/payments/deposit`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(pixPayload)
        });

        const pixData = await pixResponse.json();

        if (!pixData.success) {
            console.error('Erro DrakePay:', pixData);
            return res.status(400).json({ 
                success: false, 
                error: pixData.error || 'Erro ao criar cobrança PIX' 
            });
        }

        // Retornar dados do PIX
        return res.status(200).json({
            success: true,
            transactionId: pixData.transactionId,
            status: pixData.status,
            qrcode: pixData.qrcode,
            amount: pixData.amount
        });

    } catch (error) {
        console.error('Erro ao criar PIX:', error);
        return res.status(500).json({ 
            success: false, 
            error: 'Erro interno do servidor' 
        });
    }
}
