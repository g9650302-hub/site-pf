"use client"

import {
  Printer,
  Download,
  CheckCircle,
  GraduationCap,
  Infinity,
  Mail,
  Globe,
  Receipt,
  Shield,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import type { ReceiptData } from "@/components/receipt-form"

function generateRef(date: string) {
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789"
  let ref = ""
  for (let i = 0; i < 12; i++) {
    ref += chars.charAt(Math.floor(Math.random() * chars.length))
  }
  return ref
}

function generateProtocol() {
  return Math.floor(Math.random() * 900000000) + 100000000
}

export function ReceiptPreview({
  clientName,
  date,
  productName,
  payerName,
  value,
  cpfCnpj,
  transactionDate,
  endToEnd,
  txId,
}: ReceiptData) {
  const refCode = generateRef(date)
  const protocol = generateProtocol()
  const hasTransactionDetails = payerName || value || cpfCnpj || transactionDate || endToEnd || txId

  function getFileName() {
    const firstName = clientName.split(" ")[0]
    const dateClean = date.replace(/[/:,]/g, "-").replace(/\s+/g, "").replace(/-+/g, "-")
    return `CREDSIMPLES - COMPROVANTE - ${firstName} ${dateClean}`
  }

  function handlePrint() {
    document.title = getFileName()
    window.print()
  }

  async function handleDownloadPDF() {
    document.title = getFileName()
    window.print()
  }

  return (
    <div id="receipt" className="bg-card rounded-lg shadow-xl overflow-hidden border border-border print:text-[11px]">
      {/* Header - Estilo Credisimples com fundo preto */}
      <div className="bg-black px-6 py-5 print:py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="bg-white rounded-md p-2">
              <span className="text-black font-black text-xl print:text-lg tracking-tight">CS</span>
            </div>
            <div>
              <h1 className="text-white font-bold text-2xl print:text-xl tracking-tight">CREDSIMPLES</h1>
              <p className="text-white/60 text-xs">Plataforma de Produtos Digitais</p>
            </div>
          </div>
          <div className="flex items-center gap-2 bg-white/10 rounded-md px-3 py-1.5">
            <Shield className="h-4 w-4 text-white/80" />
            <span className="text-white/90 text-xs font-medium">Documento Verificado</span>
          </div>
        </div>
      </div>

      {/* Título do Documento */}
      <div className="bg-neutral-100 border-b border-border px-6 py-4 print:py-2">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg print:text-base font-bold text-foreground tracking-tight">
              COMPROVANTE DE COMPRA
            </h2>
            <p className="text-muted-foreground text-xs mt-0.5">
              Documento comprobatorio de transacao realizada
            </p>
          </div>
          <div className="text-right">
            <p className="text-[10px] text-muted-foreground uppercase tracking-wide">Protocolo</p>
            <p className="font-mono text-sm font-bold text-foreground">{protocol}</p>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="px-6 py-5 print:px-4 print:py-3">
        {/* Status Badge */}
        <div className="flex items-center gap-2 mb-5 print:mb-3">
          <div className="flex items-center gap-2 bg-emerald-50 border border-emerald-200 text-emerald-700 px-3 py-1.5 rounded-full">
            <CheckCircle className="h-4 w-4" />
            <span className="text-xs font-semibold uppercase tracking-wide">Pagamento Confirmado</span>
          </div>
          <span className="text-muted-foreground text-xs">em {date}</span>
        </div>

        {/* Grid de Informacoes */}
        <div className="grid grid-cols-2 gap-4 mb-5 print:mb-3">
          {/* Dados do Cliente */}
          <div className="bg-neutral-50 border border-border rounded-lg p-4 print:p-2">
            <h3 className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider mb-3 print:mb-1.5">
              Dados do Cliente
            </h3>
            <div className="space-y-2 print:space-y-1">
              <div>
                <p className="text-[10px] text-muted-foreground">Nome Completo</p>
                <p className="text-sm font-semibold text-foreground">{clientName}</p>
              </div>
              {cpfCnpj && (
                <div>
                  <p className="text-[10px] text-muted-foreground">CPF/CNPJ</p>
                  <p className="text-sm font-semibold text-foreground">{cpfCnpj}</p>
                </div>
              )}
            </div>
          </div>

          {/* Dados da Transacao */}
          <div className="bg-neutral-50 border border-border rounded-lg p-4 print:p-2">
            <h3 className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider mb-3 print:mb-1.5">
              Dados da Transacao
            </h3>
            <div className="space-y-2 print:space-y-1">
              <div>
                <p className="text-[10px] text-muted-foreground">Data/Hora</p>
                <p className="text-sm font-semibold text-foreground">{transactionDate || date}</p>
              </div>
              {value && (
                <div>
                  <p className="text-[10px] text-muted-foreground">Valor Pago</p>
                  <p className="text-sm font-bold text-foreground">{value}</p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Detalhes do Pagador - se diferente do cliente */}
        {payerName && payerName !== clientName && (
          <div className="bg-neutral-50 border border-border rounded-lg p-4 print:p-2 mb-5 print:mb-3">
            <h3 className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider mb-3 print:mb-1.5 flex items-center gap-1.5">
              <Receipt className="h-3 w-3" />
              Dados do Pagador
            </h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-[10px] text-muted-foreground">Nome do Pagador</p>
                <p className="text-sm font-semibold text-foreground">{payerName}</p>
              </div>
            </div>
          </div>
        )}

        {/* Produto Adquirido */}
        <div className="bg-black text-white rounded-lg p-4 print:p-3 mb-5 print:mb-3">
          <div className="flex items-start gap-3">
            <div className="bg-white/10 rounded-lg p-2">
              <GraduationCap className="h-5 w-5 text-white" />
            </div>
            <div className="flex-1">
              <p className="text-[10px] text-white/60 uppercase tracking-wider mb-1">Produto Adquirido</p>
              <p className="font-bold text-base print:text-sm">{productName}</p>
              <div className="flex items-center gap-4 mt-3 print:mt-2">
                <div className="flex items-center gap-1.5 text-emerald-400">
                  <CheckCircle className="h-3.5 w-3.5" />
                  <span className="text-xs font-medium">Acesso Liberado</span>
                </div>
                <div className="flex items-center gap-1.5 text-white/70">
                  <Infinity className="h-3.5 w-3.5" />
                  <span className="text-xs font-medium">Acesso Vitalicio</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Identificadores da Transacao */}
        {(endToEnd || txId) && (
          <div className="border border-border rounded-lg p-4 print:p-2 mb-5 print:mb-3">
            <h3 className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider mb-3 print:mb-1.5">
              Identificadores da Transacao
            </h3>
            <div className="space-y-2 print:space-y-1">
              {endToEnd && (
                <div className="flex items-center justify-between bg-neutral-50 rounded px-3 py-2 print:px-2 print:py-1">
                  <span className="text-[10px] text-muted-foreground">EndToEnd ID</span>
                  <span className="font-mono text-[10px] font-semibold text-foreground">{endToEnd}</span>
                </div>
              )}
              {txId && (
                <div className="flex items-center justify-between bg-neutral-50 rounded px-3 py-2 print:px-2 print:py-1">
                  <span className="text-[10px] text-muted-foreground">TxId</span>
                  <span className="font-mono text-[10px] font-semibold text-foreground">{txId}</span>
                </div>
              )}
              <div className="flex items-center justify-between bg-neutral-50 rounded px-3 py-2 print:px-2 print:py-1">
                <span className="text-[10px] text-muted-foreground">Codigo de Referencia</span>
                <span className="font-mono text-[10px] font-semibold text-foreground">{refCode}</span>
              </div>
            </div>
          </div>
        )}

        {/* CTA Button */}
        <button className="w-full bg-black hover:bg-neutral-800 text-white font-bold py-3 print:py-2 rounded-lg transition-colors text-sm mb-5 print:mb-3">
          Acessar Area de Membros
        </button>

        {/* Suporte - apenas na tela, nao no PDF */}
        <div className="no-print border-t border-border pt-4">
          <p className="text-center text-muted-foreground text-xs mb-3">
            Em caso de duvidas, entre em contato com nossa equipe de suporte:
          </p>
          <div className="flex items-center justify-center gap-6">
            <div className="flex items-center gap-2">
              <Mail className="h-4 w-4 text-muted-foreground" />
              <span className="text-xs font-medium text-foreground">suporte@credsimplesip.online</span>
            </div>
            <div className="flex items-center gap-2">
              <Globe className="h-4 w-4 text-muted-foreground" />
              <span className="text-xs font-medium text-foreground">www.credsimplesip.online</span>
            </div>
          </div>
        </div>
      </div>

      {/* Footer do Documento */}
      <div className="bg-neutral-100 border-t border-border px-6 py-3 print:py-2">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-[10px] text-muted-foreground">
              Documento gerado eletronicamente em {new Date().toLocaleDateString('pt-BR')}
            </p>
            <p className="text-[10px] text-muted-foreground">
              CREDSIMPLES &copy; {new Date().getFullYear()} — Todos os direitos reservados
            </p>
          </div>
          <div className="text-right">
            <p className="text-[10px] text-muted-foreground">Autenticacao</p>
            <p className="font-mono text-[10px] font-bold text-foreground">{refCode}</p>
          </div>
        </div>
      </div>

      {/* Action Footer */}
      <div className="no-print bg-black px-6 py-4 flex items-center justify-between">
        <p className="text-xs text-white/60 leading-tight">
          Imprima ou baixe seu comprovante
        </p>
        <div className="flex items-center gap-3">
          <Button
            onClick={handlePrint}
            className="bg-white hover:bg-neutral-100 text-black font-semibold"
          >
            <Printer className="mr-2 h-4 w-4" />
            Imprimir
          </Button>
          <Button
            onClick={handleDownloadPDF}
            variant="outline"
            className="border-white/30 text-white hover:bg-white/10 font-semibold"
          >
            <Download className="mr-2 h-4 w-4" />
            Baixar PDF
          </Button>
        </div>
      </div>
    </div>
  )
}
