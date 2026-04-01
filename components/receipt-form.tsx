"use client"

import { useState, useRef } from "react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { FileText, ClipboardPaste, CheckCircle } from "lucide-react"

export interface ReceiptData {
  clientName: string
  date: string
  productName: string
  payerName: string
  value: string
  cpfCnpj: string
  transactionDate: string
  endToEnd: string
  txId: string
}

interface ReceiptFormProps {
  onGenerate: (data: ReceiptData) => void
}

function parseTransactionText(text: string) {
  const lines = text.split("\n").map((l) => l.trim()).filter(Boolean)

  const result: Record<string, string> = {}

  const fieldMap: Record<string, string> = {
    "nome do pagador": "payerName",
    "valor": "value",
    "cpf/cnpj do pagador": "cpfCnpj",
    "data da transação": "transactionDate",
    "data da transacao": "transactionDate",
    "endtoend": "endToEnd",
    "txid": "txId",
  }

  for (let i = 0; i < lines.length; i++) {
    const lower = lines[i].toLowerCase()
    for (const [label, key] of Object.entries(fieldMap)) {
      if (lower === label || lower.startsWith(label)) {
        if (i + 1 < lines.length) {
          const nextLower = lines[i + 1].toLowerCase()
          const isNextALabel = Object.keys(fieldMap).some(
            (l) => nextLower === l || nextLower.startsWith(l)
          )
          if (!isNextALabel && nextLower !== "detalhes da transação" && nextLower !== "detalhes da transacao") {
            result[key] = lines[i + 1]
          }
        }
      }
    }
  }

  return result
}

export function ReceiptForm({ onGenerate }: ReceiptFormProps) {
  const [clientName, setClientName] = useState("")
  const [date, setDate] = useState("")
  const [productName, setProductName] = useState("")
  const [payerName, setPayerName] = useState("")
  const [value, setValue] = useState("")
  const [cpfCnpj, setCpfCnpj] = useState("")
  const [transactionDate, setTransactionDate] = useState("")
  const [endToEnd, setEndToEnd] = useState("")
  const [txId, setTxId] = useState("")
  const [pasteSuccess, setPasteSuccess] = useState(false)
  const pasteRef = useRef<HTMLTextAreaElement>(null)

  function applyParsed(parsed: Record<string, string>) {
    if (parsed.payerName) {
      setPayerName(parsed.payerName)
      setClientName(parsed.payerName)
    }
    if (parsed.value) setValue(parsed.value)
    if (parsed.cpfCnpj) setCpfCnpj(parsed.cpfCnpj)
    if (parsed.transactionDate) {
      setTransactionDate(parsed.transactionDate)
      setDate(parsed.transactionDate)
    }
    if (parsed.endToEnd) setEndToEnd(parsed.endToEnd)
    if (parsed.txId) setTxId(parsed.txId)
  }

  function handlePasteArea(e: React.ClipboardEvent<HTMLTextAreaElement>) {
    const text = e.clipboardData.getData("text/plain")
    if (text) {
      const parsed = parseTransactionText(text)
      if (Object.keys(parsed).length > 0) {
        applyParsed(parsed)
        setPasteSuccess(true)
        setTimeout(() => setPasteSuccess(false), 3000)
        setTimeout(() => {
          if (pasteRef.current) pasteRef.current.value = ""
        }, 100)
      }
    }
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!clientName.trim() || !date.trim() || !productName.trim()) return
    onGenerate({
      clientName: clientName.trim().toUpperCase(),
      date: date.trim(),
      productName: productName.trim(),
      payerName: payerName.trim().toUpperCase(),
      value: value.trim(),
      cpfCnpj: cpfCnpj.trim(),
      transactionDate: transactionDate.trim(),
      endToEnd: endToEnd.trim(),
      txId: txId.trim(),
    })
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      {/* Paste Area */}
      <div className="space-y-2">
        <Label className="text-sm font-medium text-foreground flex items-center gap-2">
          <ClipboardPaste className="h-4 w-4 text-foreground" />
          Colar Dados da Transacao
        </Label>
        <div className="relative">
          <textarea
            ref={pasteRef}
            onPaste={handlePasteArea}
            placeholder={"Cole aqui os detalhes da transacao...\n\nEx:\nDetalhes da Transacao\nNome do pagador\nEDUARDO PEDRO PEREIRA\nValor\nR$ 100,00\n..."}
            className="w-full min-h-[100px] rounded-lg border border-dashed border-border bg-muted/50 p-3 text-xs text-muted-foreground placeholder:text-muted-foreground/60 resize-none focus:outline-none focus:ring-2 focus:ring-ring/30 focus:border-foreground"
          />
          {pasteSuccess && (
            <div className="absolute inset-0 bg-emerald-500/10 rounded-lg flex items-center justify-center pointer-events-none">
              <div className="flex items-center gap-2 bg-card rounded-full px-4 py-2 shadow-md border border-emerald-500/30">
                <CheckCircle className="h-4 w-4 text-emerald-600" />
                <span className="text-sm font-semibold text-emerald-600">Dados preenchidos!</span>
              </div>
            </div>
          )}
        </div>
        <p className="text-[11px] text-muted-foreground">
          Cole o texto copiado e os campos serao preenchidos automaticamente.
        </p>
      </div>

      <div className="relative py-1">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t border-border" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-card px-3 text-muted-foreground font-semibold">
            ou preencha manualmente
          </span>
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="clientName" className="text-sm font-medium text-foreground">
          Nome do Cliente
        </Label>
        <Input
          id="clientName"
          type="text"
          placeholder="Ex: Maria da Silva"
          value={clientName}
          onChange={(e) => setClientName(e.target.value)}
          required
          className="h-11"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="date" className="text-sm font-medium text-foreground">
          Data
        </Label>
        <Input
          id="date"
          type="text"
          placeholder="Ex: 03/06/2025, 03:58"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          required
          className="h-11"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="productName" className="text-sm font-medium text-foreground">
          Nome do Produto
        </Label>
        <Input
          id="productName"
          type="text"
          placeholder="Ex: Curso de Marketing Digital 2025"
          value={productName}
          onChange={(e) => setProductName(e.target.value)}
          required
          className="h-11"
        />
      </div>

      {/* Separator */}
      <div className="relative py-2">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t border-border" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-card px-3 text-muted-foreground font-semibold">
            Detalhes da Transacao
          </span>
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="payerName" className="text-sm font-medium text-foreground">
          Nome do Pagador
        </Label>
        <Input
          id="payerName"
          type="text"
          placeholder="Ex: Suelen dos Santos"
          value={payerName}
          onChange={(e) => setPayerName(e.target.value)}
          className="h-11"
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="value" className="text-sm font-medium text-foreground">
            Valor
          </Label>
          <Input
            id="value"
            type="text"
            placeholder="Ex: R$ 10,00"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            className="h-11"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="cpfCnpj" className="text-sm font-medium text-foreground">
            CPF/CNPJ do Pagador
          </Label>
          <Input
            id="cpfCnpj"
            type="text"
            placeholder="Ex: 353.467.008-62"
            value={cpfCnpj}
            onChange={(e) => setCpfCnpj(e.target.value)}
            className="h-11"
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="transactionDate" className="text-sm font-medium text-foreground">
          Data da Transacao
        </Label>
        <Input
          id="transactionDate"
          type="text"
          placeholder="Ex: 22/02/2026, 16:51:58"
          value={transactionDate}
          onChange={(e) => setTransactionDate(e.target.value)}
          className="h-11"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="endToEnd" className="text-sm font-medium text-foreground">
          EndToEnd
        </Label>
        <Input
          id="endToEnd"
          type="text"
          placeholder="Ex: E00416968202602221951X8JAy2T3Yxk"
          value={endToEnd}
          onChange={(e) => setEndToEnd(e.target.value)}
          className="h-11 font-mono text-xs"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="txId" className="text-sm font-medium text-foreground">
          TxId
        </Label>
        <Input
          id="txId"
          type="text"
          placeholder="Ex: 651a098d1e6f0ec6a695c3202249735f"
          value={txId}
          onChange={(e) => setTxId(e.target.value)}
          className="h-11 font-mono text-xs"
        />
      </div>

      <Button
        type="submit"
        className="w-full h-12 text-base font-semibold bg-primary text-primary-foreground hover:bg-primary/90"
      >
        <FileText className="mr-2 h-5 w-5" />
        Gerar Comprovante
      </Button>
    </form>
  )
}
