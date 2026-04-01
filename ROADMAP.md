# ROADMAP COMPLETO - GERADOR DE COMPROVANTES CREDSIMPLES

---

## 1. VISAO GERAL

O site é um gerador de comprovantes de compra para produtos digitais. Ele permite que o usuário insira dados de uma transação e gere um comprovante visual profissional que pode ser impresso ou baixado como PDF.

---

## 2. ARQUITETURA DO SISTEMA

```
app/page.tsx (Pagina Principal)
    |
    |-- Estado: receipt (null ou ReceiptData)
    |
    |-- SE receipt = null:
    |       Exibe FORMULARIO (ReceiptForm)
    |
    |-- SE receipt = dados:
            Exibe COMPROVANTE (ReceiptPreview)
```

---

## 3. FLUXO DE DADOS

### 3.1 ENTRADA DE DADOS (ReceiptForm)

**Interface de Dados (ReceiptData):**
```typescript
{
  clientName: string      // Nome do cliente (obrigatorio)
  date: string            // Data do comprovante (obrigatorio)
  productName: string     // Nome do produto (obrigatorio)
  payerName: string       // Nome do pagador
  value: string           // Valor pago (ex: R$ 37,90)
  cpfCnpj: string         // CPF/CNPJ do pagador
  transactionDate: string // Data/hora da transacao
  endToEnd: string        // Codigo EndToEnd (PIX)
  txId: string            // ID da transacao
}
```

### 3.2 METODOS DE PREENCHIMENTO

**Metodo 1: Colar Dados (Automatico)**
1. Usuário cola texto copiado de sistema bancário/PIX
2. Função `parseTransactionText()` processa o texto
3. Identifica campos por labels conhecidos:
   - "Nome do pagador" → payerName e clientName
   - "Valor" → value
   - "CPF/CNPJ do pagador" → cpfCnpj
   - "Data da transacao" → transactionDate e date
   - "EndToEnd" → endToEnd
   - "TxId" → txId
4. Campos são preenchidos automaticamente

**Metodo 2: Preenchimento Manual**
- Usuário preenche cada campo individualmente
- Campos obrigatórios: Nome do Cliente, Data, Nome do Produto

---

## 4. PROCESSAMENTO (handleSubmit)

```
1. Validacao: clientName, date, productName devem estar preenchidos
2. Transformacao:
   - clientName → UPPERCASE
   - payerName → UPPERCASE
   - Todos os campos → trim()
3. Chamada: onGenerate(receiptData)
4. Atualiza estado na pagina principal
5. Troca visualizacao: Formulario → Comprovante
```

---

## 5. SAIDA (ReceiptPreview)

### 5.1 DADOS GERADOS AUTOMATICAMENTE

```typescript
generateRef()      // Codigo de 12 caracteres aleatorios (ex: VGO6YK2ADJ0X)
generateProtocol() // Numero de 9 digitos (ex: 932840813)
```

### 5.2 ESTRUTURA DO COMPROVANTE

```
+----------------------------------------------------------+
| HEADER (fundo preto)                                     |
| - Logo "CS" + Nome "CREDSIMPLES"                         |
| - Badge "Documento Verificado"                           |
+----------------------------------------------------------+
| TITULO                                                    |
| - "COMPROVANTE DE COMPRA"                                |
| - Numero do Protocolo                                     |
+----------------------------------------------------------+
| STATUS                                                    |
| - Badge "PAGAMENTO CONFIRMADO" (verde)                   |
| - Data/hora                                              |
+----------------------------------------------------------+
| GRID DE INFORMACOES (2 colunas)                          |
| +------------------------+ +------------------------+     |
| | DADOS DO CLIENTE       | | DADOS DA TRANSACAO     |     |
| | - Nome Completo        | | - Data/Hora            |     |
| | - CPF/CNPJ             | | - Valor Pago           |     |
| +------------------------+ +------------------------+     |
+----------------------------------------------------------+
| PRODUTO ADQUIRIDO (fundo preto)                          |
| - Icone + Nome do produto                                |
| - "Acesso Liberado" + "Acesso Vitalicio"                 |
+----------------------------------------------------------+
| IDENTIFICADORES DA TRANSACAO                             |
| - EndToEnd ID                                            |
| - TxId                                                    |
| - Codigo de Referencia (gerado)                          |
+----------------------------------------------------------+
| BOTAO "Acessar Area de Membros"                          |
+----------------------------------------------------------+
| SUPORTE (apenas na tela, NAO no PDF)                     |
| - Email: suporte@credsimplesip.online                    |
| - Site: www.credsimplesip.online                         |
+----------------------------------------------------------+
| FOOTER                                                    |
| - Data de geracao                                        |
| - Copyright                                              |
| - Codigo de autenticacao                                 |
+----------------------------------------------------------+
| ACOES (apenas na tela, NAO no PDF)                       |
| - Botao "Imprimir"                                       |
| - Botao "Baixar PDF"                                     |
+----------------------------------------------------------+
```

---

## 6. GERACAO DE PDF/IMPRESSAO

### 6.1 FUNCAO handlePrint / handleDownloadPDF

```typescript
1. Define nome do arquivo: "CREDSIMPLES - COMPROVANTE - {PrimeiroNome} {Data}"
2. Altera document.title para esse nome
3. Chama window.print()
```

### 6.2 ELEMENTOS OCULTOS NO PDF

Classe `no-print` oculta:
- Secao de suporte (email/site)
- Botoes de acao (Imprimir/Baixar)
- Botao "Voltar ao formulario"

### 6.3 AJUSTES DE IMPRESSAO

```css
@media print {
  - Tamanho A4
  - Margem 0
  - Cores exatas preservadas
  - Sem sombras/bordas
}
```

---

## 7. FLUXO VISUAL COMPLETO

```
[USUARIO ACESSA SITE]
        |
        v
[TELA DO FORMULARIO]
        |
        |-- [Cola texto da transacao]
        |       |
        |       v
        |   [Campos preenchidos automaticamente]
        |
        |-- [Preenche manualmente]
        |
        v
[Clica "Gerar Comprovante"]
        |
        v
[TELA DO COMPROVANTE]
        |
        |-- [Clica "Imprimir"]
        |       |
        |       v
        |   [Dialog de impressao do navegador]
        |   [Usuario DEVE desmarcar "Cabecalhos e rodapes"]
        |       |
        |       v
        |   [PDF gerado ou impresso]
        |
        |-- [Clica "Baixar PDF"]
        |       |
        |       v
        |   [Mesmo fluxo de impressao]
        |
        |-- [Clica "Voltar ao formulario"]
                |
                v
            [Retorna ao formulario vazio]
```

---

## 8. REGRAS DE NEGOCIO

| Regra | Descricao |
|-------|-----------|
| Campos obrigatorios | clientName, date, productName |
| Formatacao nomes | Sempre UPPERCASE |
| Codigo de referencia | 12 caracteres aleatorios por comprovante |
| Protocolo | 9 digitos aleatorios por comprovante |
| Elementos ocultos no PDF | Suporte, botoes de acao |
| Nome do arquivo PDF | "CREDSIMPLES - COMPROVANTE - {Nome} {Data}" |

---

## 9. TRATATIVA DE INFORMACOES

| Campo de Entrada | Tratamento | Saida no Comprovante |
|------------------|------------|---------------------|
| clientName | trim() + toUpperCase() | Dados do Cliente |
| payerName | trim() + toUpperCase() | Dados do Pagador (se diferente) |
| date | trim() | Status + Data da Transacao |
| productName | trim() | Produto Adquirido |
| value | trim() | Valor Pago |
| cpfCnpj | trim() | CPF/CNPJ |
| transactionDate | trim() | Data/Hora Transacao |
| endToEnd | trim() | EndToEnd ID |
| txId | trim() | TxId |
| - | generateRef() | Codigo de Referencia + Autenticacao |
| - | generateProtocol() | Protocolo |

---

## 10. COMPONENTES DO PROJETO

### 10.1 app/page.tsx
- Componente principal
- Gerencia estado do comprovante
- Renderiza formulário ou preview

### 10.2 components/receipt-form.tsx
- Formulário de entrada
- Funções de parse automático
- Validação de campos

### 10.3 components/receipt-preview.tsx
- Visualização do comprovante
- Geração de PDF
- Funções de print e download

### 10.4 app/globals.css
- Cores do tema (preto e tons neutros)
- Estilos de impressão
- Media queries para PDF

---

## 11. FLUXO DE INFORMACOES DETALHADO

### 11.1 ENTRADA → PROCESSAMENTO → SAIDA

```
ENTRADA (Usuario)
    ↓
1. Cola texto OU Preenche manualmente
    ↓
2. ReceiptForm processa dados
    - Valida campos obrigatorios
    - Transforma texto em campos
    - Formata strings (uppercase, trim)
    ↓
3. handleSubmit envia dados
    ↓
PROCESSAMENTO (page.tsx)
    ↓
4. Atualiza estado: receipt = receiptData
    ↓
5. Renderiza ReceiptPreview
    ↓
SAIDA (ReceiptPreview)
    ↓
6. Gera dados aleatorios (ref, protocol)
    ↓
7. Renderiza HTML do comprovante
    ↓
8. Usuario clica "Imprimir" ou "Baixar PDF"
    ↓
9. window.print() abre dialog do navegador
    ↓
10. CSS @media print oculta elementos desnecessarios
    ↓
11. Usuario salva como PDF
    ↓
SAIDA FINAL: PDF com logo CREDSIMPLES
```

---

## 12. VALIDACOES E REGRAS

### 12.1 Validacoes Obrigatorias
- clientName não pode ser vazio
- date não pode ser vazio
- productName não pode ser vazio

### 12.2 Transformacoes de Dados
- Todas as strings: `trim()` para remover espacos
- Nomes: `toUpperCase()` para padronizar
- CPF/CNPJ: mantém formato original
- Valores: preserva formatacao monetaria

### 12.3 Geracao de IDs
- Codigo de Referencia: 12 caracteres alfanumericos aleatorios
- Protocolo: 9 digitos numericos aleatorios
- Novos valores gerados a cada impressao

---

## 13. CONSIDERACOES DE UX/UI

- **Feedback visual**: Badge verde "Pagamento Confirmado"
- **Profissionalismo**: Design preto e branco de Credisimples
- **Acessibilidade**: Tamanho de fonte legivel (12px em print)
- **Responsividade**: Grid 2 colunas para dados, adaptavel
- **Impressao**: Sem elementos desnecessarios no PDF
- **Facilidade**: Colar dados economiza tempo

---

## 14. CICLO DE VIDA DO COMPROVANTE

```
1. CRIACAO: Usuario submete formulario
   └─ Dados sao salvos em estado React

2. RENDERIZACAO: ReceiptPreview exibe comprovante
   └─ Codigos aleatorios gerados

3. VISUALIZACAO: Usuario ve comprovante na tela
   └─ Pode revisar dados antes de imprimir

4. IMPRESSAO: Usuario clica "Imprimir"
   └─ window.print() abre dialog

5. PDF GERADO: Usuario salva como PDF
   └─ Arquivo nomeado: CREDSIMPLES - COMPROVANTE - ...

6. COMPARTILHAMENTO: Usuario compartilha PDF com cliente
   └─ PDF contem dados identificados
   └─ Sem link do gerador
```

---

Este documento descreve completamente a logica, tratativa de informacoes e fluxo do gerador de comprovantes CREDSIMPLES.
