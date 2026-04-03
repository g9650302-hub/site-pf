## Integração API PIX - DrakePay

A integração do PIX foi configurada para permitir pagamento de tarifas através do DrakePay com credenciais atualizadas.

### Credenciais Configuradas

As seguintes variáveis de ambiente foram adicionadas ao projeto:

| Variável | Descrição |
|----------|-----------|
| `DRAKEPAY_CLIENT_ID` | ID do cliente: `dp_56b11f596a52e58d1973d68fa621a263` |
| `DRAKEPAY_CLIENT_SECRET` | Chave secreta para autenticação |
| `DRAKEPAY_WEBHOOK_SECRET` | Secret para validação de webhooks |

### Arquivos da API

#### 1. **`/api/pix/criar.js`**
- **Método**: POST
- **Endpoint**: `/api/pix/criar`
- **Função**: Cria uma cobrança PIX no DrakePay
- **Parâmetros**:
  - `amount`: valor em reais (ex: 257.25)
  - `external_id`: ID único da transação
  - `payer`: objeto com dados do pagador (name, email, document)
- **Retorno**: `{ success: true, transactionId, qrcode, status }`

#### 2. **`/api/pix/status.js`**
- **Método**: GET
- **Endpoint**: `/api/pix/status?transactionId=XXX`
- **Função**: Verifica o status de um pagamento PIX
- **Retorno**: `{ success: true, status, value, external_id, paid_at }`

#### 3. **`/api/pix/webhook.js`**
- **Método**: POST
- **Endpoint**: `/api/pix/webhook`
- **Função**: Recebe notificações do DrakePay quando há alterações de status
- **Eventos suportados**:
  - `PENDING`: Pagamento aguardando confirmação
  - `COMPLETED`: Pagamento confirmado
  - `FAILED`: Pagamento falhou ou expirou
  - `REFUND`: Reembolso processado

### Frontend - Página de Pagamento

#### **`pagamento.html`**
A página foi atualizada com:

1. **Fluxo de seleção de taxa**:
   - Passaporte Comum: R$ 257,25
   - Passaporte com Urgência/Emergência: R$ 334,42
   - Passaporte Extraviado: R$ 514,50

2. **Geração de PIX**:
   - QR Code dinâmico gerado via qrserver.com
   - Código PIX em formato copia e cola
   - Botão para copiar código para a área de transferência

3. **Verificação de Status**:
   - Polling automático a cada 5 segundos
   - Atualização em tempo real do status do pagamento
   - Redirecionamento automático para página de confirmação após sucesso

### Como Funciona

1. **Usuário seleciona taxa** → Clica em "Continuar para Pagamento PIX"
2. **Sistema chama `/api/pix/criar`** → DrakePay gera QR Code e retorna `transactionId`
3. **QR Code exibido** → Usuário escaneia com o banco ou copia código
4. **Sistema faz polling** → A cada 5s, checa status em `/api/pix/status`
5. **Pagamento confirmado** → Status muda para `COMPLETED` e usuário é redirecionado

### Dados Persistidos

Após pagamento confirmado, os dados são salvos em `localStorage`:
```javascript
{
  transactionId: "...",
  valor: 257.25,
  taxa: "comum",
  data: "2026-04-02T..."
}
```

### Webhook do DrakePay

Configure no painel do DrakePay:
- **URL**: `https://seu-dominio.com/api/pix/webhook`
- **Secret**: O valor de `DRAKEPAY_WEBHOOK_SECRET`
- **Eventos**: payment.completed, transaction.paid, payment.failed

### Segurança

✅ **Credenciais protegidas**: Cliente ID e Secret nunca são expostos no frontend
✅ **Validação de assinatura**: Webhook valida assinatura HMAC SHA-256
✅ **HTTPS obrigatório**: Comunicação sempre criptografada
✅ **Sanitização de entrada**: CPF removido de caracteres especiais, valores validados

### Próximos Passos

1. Configure o webhook no painel do DrakePay
2. Teste em ambiente de sandbox
3. Valide os dados de pagamento recebidos
4. Implemente lógica de confirmação no banco de dados
5. Envie emails de confirmação aos usuários
