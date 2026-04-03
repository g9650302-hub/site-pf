// API Route para consultar status de transação PIX via DrakePay
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
    // Apenas GET permitido
    if (req.method !== 'GET') {
        return res.status(405).json({ success: false, error: 'Método não permitido' });
    }

    // Validar variáveis de ambiente
    if (!process.env.DRAKEPAY_CLIENT_ID || !process.env.DRAKEPAY_CLIENT_SECRET) {
        console.error('Credenciais DrakePay não configuradas');
        return res.status(500).json({ success: false, error: 'Configuração incompleta do servidor' });
    }

    try {
        const { transactionId } = req.query;

        if (!transactionId) {
            return res.status(400).json({ success: false, error: 'ID da transação obrigatório' });
        }

        // Obter token de autenticação
        const token = await obterToken();

        // Consultar status da transação
        const statusResponse = await fetch(
            `${API_BASE}/transactions/getStatusTransac/${transactionId}`,
            {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            }
        );

        const statusData = await statusResponse.json();

        // Retornar dados do status
        return res.status(200).json({
            success: true,
            status: statusData.status,
            value: statusData.value,
            external_id: statusData.external_id,
            created_at: statusData.created_at,
            updated_at: statusData.updated_at,
            paid_at: statusData.paid_at
        });

    } catch (error) {
        console.error('Erro ao consultar status:', error);
        return res.status(500).json({ 
            success: false, 
            error: 'Erro interno do servidor' 
        });
    }
}
