// API Route para receber webhooks do DrakePay
// Variável de ambiente necessária:
// - DRAKEPAY_WEBHOOK_SECRET

import crypto from 'crypto';

export const config = {
    api: {
        bodyParser: false, // Necessário para validar a assinatura HMAC
    },
};

async function getRawBody(req) {
    return new Promise((resolve, reject) => {
        let data = '';
        req.on('data', chunk => {
            data += chunk;
        });
        req.on('end', () => {
            resolve(data);
        });
        req.on('error', reject);
    });
}

function validateSignature(rawBody, signature, secret) {
    if (!signature || !secret) {
        return false;
    }

    const expectedSignature = 'sha256=' + crypto
        .createHmac('sha256', secret)
        .update(rawBody)
        .digest('hex');

    try {
        return crypto.timingSafeEqual(
            Buffer.from(expectedSignature),
            Buffer.from(signature)
        );
    } catch {
        return false;
    }
}

export default async function handler(req, res) {
    // Apenas POST permitido
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Método não permitido' });
    }

    try {
        const rawBody = await getRawBody(req);
        const signature = req.headers['x-drakepay-signature'];
        const webhookSecret = process.env.DRAKEPAY_WEBHOOK_SECRET;

        // Validar assinatura HMAC
        if (webhookSecret) {
            const isValid = validateSignature(rawBody, signature, webhookSecret);
            if (!isValid) {
                console.error('Assinatura de webhook inválida');
                return res.status(401).json({ error: 'Assinatura inválida' });
            }
        }

        // Parse do body
        const event = JSON.parse(rawBody);

        console.log('[v0] Webhook DrakePay recebido:', {
            transaction_id: event.transaction_id,
            status: event.status,
            amount: event.amount,
            timestamp: event.timestamp
        });

        // Processar evento baseado no status
        switch (event.status) {
            case 'PENDING':
                // Transação criada, aguardando pagamento
                console.log(`[v0] Transação ${event.transaction_id} aguardando pagamento`);
                break;

            case 'COMPLETED':
                // Pagamento confirmado!
                console.log(`[v0] Pagamento ${event.transaction_id} confirmado!`);
                console.log(`[v0] Valor: R$ ${event.amount}, Líquido: R$ ${event.net_amount}`);
                
                // Salvar comprovante de pagamento em cache na memória do servidor
                // Em produção, isso seria salvo em um banco de dados
                if (!global.pixConfirmacoes) {
                    global.pixConfirmacoes = {};
                }
                global.pixConfirmacoes[event.transaction_id] = {
                    status: 'COMPLETED',
                    amount: event.amount,
                    net_amount: event.net_amount,
                    confirmedAt: new Date().toISOString()
                };
                
                console.log(`[v0] Comprovante armazenado para transação: ${event.transaction_id}`);
                break;

            case 'FAILED':
                // Pagamento falhou ou expirou
                console.log(`[v0] Pagamento ${event.transaction_id} falhou: ${event.reason}`);
                
                // Salvar falha no cache
                if (!global.pixConfirmacoes) {
                    global.pixConfirmacoes = {};
                }
                global.pixConfirmacoes[event.transaction_id] = {
                    status: 'FAILED',
                    reason: event.reason,
                    failedAt: new Date().toISOString()
                };
                break;

            case 'MED':
                // Mecanismo Especial de Devolução (chargeback)
                console.log(`[v0] MED recebido para ${event.transaction_id}: ${event.reason}`);
                break;

            case 'REFUND':
                // Reembolso
                console.log(`[v0] Reembolso ${event.transaction_id}: R$ ${event.refund_amount}`);
                break;

            default:
                console.log(`[v0] Status desconhecido: ${event.status}`);
        }

        // Retornar 200 OK para confirmar recebimento
        return res.status(200).json({ received: true });

    } catch (error) {
        console.error('Erro ao processar webhook:', error);
        return res.status(500).json({ error: 'Erro interno' });
    }
}
