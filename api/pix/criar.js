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
        console.log('[v0] Usando token em cache');
        return cachedToken;
    }

    console.log('[v0] Obtendo novo token DrakePay...');
    
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
    
    console.log('[v0] Resposta auth DrakePay:', JSON.stringify(data, null, 2));

    if (!data.success || !data.token) {
        console.error('[v0] Erro ao obter token:', data);
        throw new Error(data.error || 'Erro ao obter token de autenticação');
    }

    // Cache o token por 55 minutos (tokens expiram em 1 hora)
    cachedToken = data.token;
    tokenExpiry = Date.now() + (55 * 60 * 1000);
    
    console.log('[v0] Token obtido com sucesso');

    return cachedToken;
}

export default async function handler(req, res) {
    // Apenas POST permitido
    if (req.method !== 'POST') {
        return res.status(405).json({ success: false, error: 'Método não permitido' });
    }

    // Validar variáveis de ambiente
    if (!process.env.DRAKEPAY_CLIENT_ID || !process.env.DRAKEPAY_CLIENT_SECRET) {
        console.error('[v0] Credenciais DrakePay não configuradas');
        console.error('[v0] CLIENT_ID existe:', !!process.env.DRAKEPAY_CLIENT_ID);
        console.error('[v0] CLIENT_SECRET existe:', !!process.env.DRAKEPAY_CLIENT_SECRET);
        return res.status(500).json({ success: false, error: 'Configuração incompleta do servidor. Verifique as variáveis de ambiente.' });
    }
    
    console.log('[v0] Credenciais DrakePay configuradas corretamente');

    try {
        const { amount, external_id, payer, clientCallbackUrl } = req.body;

        // Debug: log dos dados recebidos
        console.log('[v0] Dados recebidos na API:', JSON.stringify(req.body, null, 2));

        // Validações
        if (!amount || amount < 0.01) {
            console.log('[v0] Erro: Valor inválido:', amount);
            return res.status(400).json({ success: false, error: 'Valor inválido' });
        }

        if (!external_id) {
            console.log('[v0] Erro: ID externo não fornecido');
            return res.status(400).json({ success: false, error: 'ID externo obrigatório' });
        }

        if (!payer || !payer.name || !payer.email || !payer.document) {
            console.log('[v0] Erro: Dados do pagador incompletos:', payer);
            return res.status(400).json({ success: false, error: 'Dados do pagador incompletos' });
        }

        // Validar CPF (apenas números, 11 dígitos)
        const cpf = payer.document.replace(/\D/g, '');
        if (cpf.length !== 11) {
            console.log('[v0] Erro: CPF inválido:', cpf, 'Tamanho:', cpf.length);
            return res.status(400).json({ success: false, error: 'CPF inválido. Deve conter 11 dígitos.' });
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

        console.log('[v0] Enviando para DrakePay:', JSON.stringify(pixPayload, null, 2));

        const pixResponse = await fetch(`${API_BASE}/payments/deposit`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(pixPayload)
        });

        const pixData = await pixResponse.json();
        
        console.log('[v0] Resposta DrakePay:', JSON.stringify(pixData, null, 2));
        console.log('[v0] Status HTTP DrakePay:', pixResponse.status);

        if (!pixData.success) {
            console.error('[v0] Erro DrakePay:', pixData);
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
