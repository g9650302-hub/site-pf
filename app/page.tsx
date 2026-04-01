"use client"

import { useState } from "react"
import { ReceiptForm, type ReceiptData } from "@/components/receipt-form"
import { ReceiptPreview } from "@/components/receipt-preview"
import { ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function Home() {
  const [receipt, setReceipt] = useState<ReceiptData | null>(null)

  if (receipt) {
    return (
      <main className="min-h-screen bg-neutral-100 py-8 px-4">
        <div className="max-w-2xl mx-auto">
          <Button
            variant="ghost"
            onClick={() => setReceipt(null)}
            className="no-print mb-4 text-muted-foreground hover:text-foreground"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Voltar ao formulario
          </Button>
          <ReceiptPreview {...receipt} />
        </div>
      </main>
    )
  }

  return (
    <main className="min-h-screen bg-neutral-100 flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md">
        {/* Brand */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-3 mb-4">
            <div className="bg-black rounded-lg p-3">
              <span className="text-white font-black text-2xl tracking-tight">XF</span>
            </div>
            <h1 className="text-3xl font-extrabold text-foreground tracking-tight">
              XF HUB
            </h1>
          </div>
          <p className="text-muted-foreground text-base">
            Gerador de Comprovantes de Compra
          </p>
        </div>

        {/* Form Card */}
        <div className="bg-card rounded-lg shadow-lg border border-border p-6">
          <h2 className="text-lg font-bold text-foreground mb-1">
            Dados do Comprovante
          </h2>
          <p className="text-sm text-muted-foreground mb-5">
            Preencha os campos abaixo para gerar o comprovante.
          </p>
          <ReceiptForm onGenerate={setReceipt} />
        </div>

        <p className="text-center text-xs text-muted-foreground mt-6">
          XF HUB &copy; {new Date().getFullYear()} — Todos os direitos reservados
        </p>
      </div>
    </main>
  )
}
