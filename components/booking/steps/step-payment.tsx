"use client"

import { useState, useMemo } from "react"
import { useBookingContext } from "@/components/booking/booking-context"
import { StepHeader } from "@/components/booking/step-header"
import { BANK_ACCOUNTS } from "@/lib/config/booking.config"
import type { PaymentMethod } from "@/lib/types/booking.types"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Dropzone } from "@/components/ui/dropzone"
import { PoliciesModal } from "@/components/booking/policies-modal"
import { FaArrowLeft, FaCheck, FaCopy } from "react-icons/fa"
import { toast } from "sonner"

const PAYMENT_METHODS: {
  value: PaymentMethod
  label: string
  disabled: boolean
  comingSoon?: boolean
}[] = [
  { value: "transfer", label: "Transferencia Bancaria", disabled: false },
  { value: "applePay", label: "Apple Pay", disabled: true, comingSoon: true },
  { value: "card", label: "Tarjeta de Crédito", disabled: true, comingSoon: true },
]

function generateTrackingCode(name: string): string {
  const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789"
  let code = ""
  for (let i = 0; i < 5; i++) {
    code += chars[Math.floor(Math.random() * chars.length)]
  }
  const initials = name
    .split(" ")
    .map((n) => n[0])
    .filter(Boolean)
    .slice(0, 2)
    .join("")
    .toUpperCase()
  return `${code}-${initials || "XX"}`
}

export function StepPayment() {
  const { service, personalInfo, payment, setPayment, prevStep, nextStep } = useBookingContext()
  const [method, setMethod] = useState<PaymentMethod>(payment?.method ?? "transfer")
  const [percentage, setPercentage] = useState<50 | 100>(payment?.percentage ?? 50)
  const [receiptData, setReceiptData] = useState<{ base64: string; name: string } | null>(
    payment ? { base64: payment.receiptBase64, name: payment.receiptFileName } : null
  )
  const [accepted, setAccepted] = useState(payment?.acceptedPolicies ?? false)
  const [policiesOpen, setPoliciesOpen] = useState(false)
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null)

  const trackingCode = useMemo(
    () => generateTrackingCode(personalInfo.name),
    [personalInfo.name]
  )

  const total = service?.price ?? 0
  const amount = percentage === 50 ? total * 0.5 : total

  function handleCopy(text: string, index: number) {
    navigator.clipboard?.writeText(text).catch(() => {})
    setCopiedIndex(index)
    setTimeout(() => setCopiedIndex((i) => (i === index ? null : i)), 1600)
  }

  function handleSubmit() {
    if (!service) return
    if (method !== "transfer") {
      toast.error("Este método de pago estará disponible próximamente.")
      return
    }
    if (!receiptData) {
      toast.error("Debes adjuntar el comprobante de pago")
      return
    }
    if (!accepted) {
      toast.error("Debes aceptar las políticas de reservación")
      return
    }
    setPayment({
      method,
      amount,
      percentage,
      trackingCode,
      receiptBase64: receiptData.base64,
      receiptFileName: receiptData.name,
      acceptedPolicies: accepted,
    })
    nextStep()
  }

  return (
    <div>
      <StepHeader
        index={4}
        eyebrow="Pago"
        title={
          <>
            Confirma tu <span className="font-normal italic text-stone-500">reserva</span>
          </>
        }
        description={`Total: $${total} — elige tu método de pago y adjunta el comprobante.`}
      />

      <div className="space-y-6">
        <div>
          <p className="mb-3 font-sans text-[10px] font-bold uppercase tracking-[0.15em] text-stone-500">
            Método de pago
          </p>
          <div className="space-y-3">
            {PAYMENT_METHODS.map((pm) => {
              const isSelected = method === pm.value
              return (
                <div
                  key={pm.value}
                  className={`rounded-[1.25rem] p-1 transition-all duration-700 ease-[cubic-bezier(0.32,0.72,0,1)] ${
                    isSelected && !pm.disabled
                      ? "bg-stone-900/8 ring-1 ring-stone-900/20"
                      : "bg-stone-100 ring-1 ring-stone-200"
                  } ${pm.disabled ? "opacity-40" : ""}`}
                >
                  <button
                    type="button"
                    disabled={pm.disabled}
                    onClick={() => { setMethod(pm.value) }}
                    className="w-full rounded-[calc(1.25rem-0.25rem)] bg-white p-4 text-left transition-all duration-500"
                  >
                    <div className="flex items-center justify-between">
                      <span className="flex items-center gap-3 font-sans text-sm font-bold text-stone-900">
                        <span
                          className={`flex h-4 w-4 items-center justify-center rounded-full border transition-all duration-300 ${
                            isSelected && !pm.disabled
                              ? "border-stone-700 bg-stone-700"
                              : "border-stone-300"
                          }`}
                        >
                          {isSelected && !pm.disabled && <FaCheck className="h-2 w-2 text-white" />}
                        </span>
                        {pm.label}
                      </span>
                      {pm.comingSoon && (
                        <span className="rounded-full bg-stone-100 px-3 py-1 font-sans text-[9px] font-bold uppercase tracking-[0.12em] text-stone-500/40">
                          Próximamente
                        </span>
                      )}
                    </div>
                  </button>
                </div>
              )
            })}
          </div>
        </div>

        {method === "transfer" && (
          <div className="space-y-6">
            <div>
              <p className="mb-3 font-sans text-[10px] font-bold uppercase tracking-[0.15em] text-stone-500">
                Monto a pagar
              </p>
              <div className="grid grid-cols-2 gap-3">
                {([50, 100] as const).map((pct) => (
                  <div
                    key={pct}
                    className={`rounded-[1.25rem] p-1 transition-all duration-700 ease-[cubic-bezier(0.32,0.72,0,1)] ${
                      percentage === pct
                        ? "bg-stone-900/8 ring-1 ring-stone-900/20"
                        : "bg-stone-100 ring-1 ring-stone-200"
                    }`}
                  >
                    <button
                      type="button"
                      onClick={() => setPercentage(pct)}
                      className="w-full rounded-[calc(1.25rem-0.25rem)] bg-white p-5 text-center transition-all duration-500"
                    >
                      <p className="font-serif text-2xl font-semibold text-stone-900">
                        ${(pct === 50 ? total * 0.5 : total).toFixed(0)}
                      </p>
                      <p className="mt-1 font-sans text-[10px] font-bold uppercase tracking-[0.12em] text-stone-500">
                        {pct}% — {pct === 50 ? "Anticipo" : "Completo"}
                      </p>
                    </button>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-[1.5rem] bg-stone-100 p-1.5 ring-1 ring-stone-200">
              <div className="rounded-[calc(1.5rem-0.25rem)] bg-white p-6 sm:p-8">
                <div className="text-center">
                  <p className="mb-2 font-sans text-[9px] font-bold uppercase tracking-[0.2em] text-stone-500/40">
                    Código de seguimiento
                  </p>
                  <p className="font-mono text-2xl font-bold tracking-wider text-stone-900">
                    {trackingCode}
                  </p>
                  <p className="mt-2 font-sans text-xs italic text-stone-500/50">
                    Colócalo en el motivo de la transferencia
                  </p>
                </div>

                <div className="my-6 border-t border-dashed border-stone-300" />

                <div className="space-y-3">
                  {BANK_ACCOUNTS.map((bank, i) => (
                    <div
                      key={i}
                      className="rounded-[1rem] border border-stone-200 bg-white p-4"
                    >
                      <div className="flex items-start justify-between gap-3">
                        <div className="space-y-1 text-sm">
                          <p className="font-sans text-sm font-bold text-stone-900">
                            {bank.bank}
                          </p>
                          <p className="font-mono text-[12px] text-stone-500/60">
                            {bank.type}: <strong className="text-stone-900">{bank.number}</strong>
                          </p>
                          <p className="font-mono text-[12px] text-stone-500/60">
                            Titular: {bank.holder}
                          </p>
                          <p className="font-mono text-[12px] text-stone-500/60">
                            Cédula: {bank.id}
                          </p>
                        </div>
                        <button
                          type="button"
                          onClick={() => handleCopy(bank.number, i)}
                          className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-stone-300 bg-white text-stone-500/60 transition-all duration-300 hover:border-stone-500 hover:text-stone-500"
                          aria-label={`Copiar número de cuenta ${bank.bank}`}
                        >
                          {copiedIndex === i ? (
                            <FaCheck className="h-3 w-3 text-stone-500" />
                          ) : (
                            <FaCopy className="h-3 w-3" />
                          )}
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div>
              <p className="mb-3 font-sans text-[10px] font-bold uppercase tracking-[0.15em] text-stone-500">
                Comprobante de pago <span className="text-stone-700">*</span>
              </p>
              <Dropzone
                onFile={(f) => { setReceiptData(f) }}
                label="Arrastra o haz clic para subir el comprobante"
              />
            </div>
          </div>
        )}

        <div className="space-y-3">
          <div className="flex items-center gap-3">
            <Checkbox
              id="accept-policies"
              checked={accepted}
              onCheckedChange={(v) => { setAccepted(v === true) }}
            />
            <label htmlFor="accept-policies" className="cursor-pointer font-sans text-xs text-stone-500/70">
              He leído y acepto las{" "}
              <button
                type="button"
                onClick={() => setPoliciesOpen(true)}
                className="underline hover:text-stone-900"
              >
                políticas de reservación
              </button>
            </label>
          </div>
          <button
            type="button"
            onClick={() => setPoliciesOpen(true)}
            className="font-sans text-[10px] text-stone-500/40 underline hover:text-stone-500"
          >
            Ver políticas de reserva
          </button>
        </div>

        <div className="flex gap-3 pt-2">
          <Button
            type="button"
            variant="outline"
            onClick={prevStep}
            className="group h-12 flex-1 rounded-full border-stone-300 bg-transparent font-sans text-sm font-semibold text-stone-900 transition-all duration-700 ease-[cubic-bezier(0.32,0.72,0,1)] hover:bg-stone-50"
          >
            <span className="flex items-center justify-center gap-2">
              <FaArrowLeft className="h-3.5 w-3.5 transition-transform duration-300 group-hover:-translate-x-0.5" />
              Atrás
            </span>
          </Button>
          <Button
            type="button"
            onClick={handleSubmit}
            className="group h-12 flex-1 rounded-full bg-stone-900 font-sans text-sm font-semibold text-white transition-all duration-700 ease-[cubic-bezier(0.32,0.72,0,1)] hover:bg-stone-700 active:scale-[0.98]"
          >
            <span className="flex items-center justify-center gap-2">
              Confirmar mi reserva
              <span className="flex h-6 w-6 items-center justify-center rounded-full bg-white/10 transition-transform duration-700 ease-[cubic-bezier(0.32,0.72,0,1)] group-hover:translate-x-0.5">
                <FaCheck className="h-3 w-3" />
              </span>
            </span>
          </Button>
        </div>
      </div>

      <PoliciesModal open={policiesOpen} onOpenChange={setPoliciesOpen} />
    </div>
  )
}
