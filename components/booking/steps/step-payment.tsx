"use client"

import { useState, useMemo } from "react"
import { useBookingContext } from "@/components/booking/booking-context"
import { BANK_ACCOUNTS } from "@/lib/config/booking.config"
import type { PaymentMethod } from "@/lib/types/booking.types"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Dropzone } from "@/components/ui/dropzone"
import { PoliciesModal } from "@/components/booking/policies-modal"
import { FaArrowLeft, FaArrowRight, FaCheckCircle } from "react-icons/fa"
import { cn } from "@/lib/utils"

const PAYMENT_METHODS: {
  value: PaymentMethod
  label: string
  icon: string
  disabled: boolean
  comingSoon?: boolean
}[] = [
  { value: "transfer", label: "Transferencia Bancaria", icon: "🏦", disabled: false },
  { value: "applePay", label: "Apple Pay", icon: "🍎", disabled: true, comingSoon: true },
  { value: "card", label: "Tarjeta de Crédito", icon: "💳", disabled: true, comingSoon: true },
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
  const [error, setError] = useState<string | null>(null)

  const trackingCode = useMemo(
    () => generateTrackingCode(personalInfo.name),
    [personalInfo.name]
  )

  const total = service?.price ?? 0
  const amount = percentage === 50 ? total * 0.5 : total

  function handleSubmit() {
    if (!service) return
    if (method !== "transfer") {
      setError("Este método de pago estará disponible próximamente.")
      return
    }
    if (!receiptData) {
      setError("Debes adjuntar el comprobante de pago")
      return
    }
    if (!accepted) {
      setError("Debes aceptar las políticas de reservación")
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
    <div className="max-w-lg mx-auto">
      <div className="text-center mb-10">
        <h2 className="text-3xl font-serif text-stone-900 dark:text-stone-100 mb-3">
          Pago
        </h2>
        <p className="text-sm text-stone-500 dark:text-stone-400">
          Total: <span className="font-semibold text-stone-900 dark:text-stone-100">${total}</span>
        </p>
      </div>

      <div className="space-y-6">
        {/* Payment method selection */}
        <div>
          <p className="text-[11px] font-medium uppercase tracking-widest text-stone-500 dark:text-stone-400 mb-3">
            Método de pago
          </p>
          <div className="space-y-2">
            {PAYMENT_METHODS.map((pm) => {
              const isSelected = method === pm.value
              return (
                <button
                  key={pm.value}
                  type="button"
                  disabled={pm.disabled}
                  onClick={() => { setMethod(pm.value); setError(null) }}
                  className={cn(
                    "w-full text-left rounded-xl border p-4 transition-all duration-300",
                    isSelected && !pm.disabled
                      ? "border-stone-900 dark:border-stone-100 bg-stone-50 dark:bg-stone-800"
                      : "border-stone-200 dark:border-stone-700 bg-white dark:bg-stone-900 hover:border-stone-400",
                    pm.disabled && "opacity-50 cursor-not-allowed"
                  )}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <span className="text-lg">{pm.icon}</span>
                      <span className="text-sm font-medium text-stone-900 dark:text-stone-100">
                        {pm.label}
                      </span>
                    </div>
                    {pm.comingSoon && (
                      <span className="text-[10px] uppercase tracking-wider text-stone-400 dark:text-stone-500 bg-stone-100 dark:bg-stone-800 px-2 py-0.5 rounded-full">
                        Próximamente
                      </span>
                    )}
                  </div>
                </button>
              )
            })}
          </div>
        </div>

        {/* Transfer details */}
        {method === "transfer" && (
          <>
            {/* Percentage selector */}
            <div>
              <p className="text-[11px] font-medium uppercase tracking-widest text-stone-500 dark:text-stone-400 mb-3">
                Selecciona el monto a pagar
              </p>
              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => setPercentage(50)}
                  className={cn(
                    "rounded-xl border p-4 text-center transition-all duration-300",
                    percentage === 50
                      ? "border-stone-900 dark:border-stone-100 bg-stone-50 dark:bg-stone-800"
                      : "border-stone-200 dark:border-stone-700 bg-white dark:bg-stone-900 hover:border-stone-400"
                  )}
                >
                  <p className="text-lg font-bold text-stone-900 dark:text-stone-100">
                    ${(total * 0.5).toFixed(0)}
                  </p>
                  <p className="text-[10px] text-stone-500 dark:text-stone-400 uppercase tracking-wider mt-1">
                    50% — Anticipo
                  </p>
                </button>
                <button
                  type="button"
                  onClick={() => setPercentage(100)}
                  className={cn(
                    "rounded-xl border p-4 text-center transition-all duration-300",
                    percentage === 100
                      ? "border-stone-900 dark:border-stone-100 bg-stone-50 dark:bg-stone-800"
                      : "border-stone-200 dark:border-stone-700 bg-white dark:bg-stone-900 hover:border-stone-400"
                  )}
                >
                  <p className="text-lg font-bold text-stone-900 dark:text-stone-100">
                    ${total}
                  </p>
                  <p className="text-[10px] text-stone-500 dark:text-stone-400 uppercase tracking-wider mt-1">
                    100% — Completo
                  </p>
                </button>
              </div>
            </div>

            {/* Tracking code & bank accounts */}
            <div className="rounded-2xl bg-stone-50 dark:bg-stone-800/50 border border-stone-200 dark:border-stone-700 p-5 space-y-4">
              <div className="text-center">
                <p className="text-[10px] uppercase tracking-widest text-stone-400 mb-1">
                  Código de seguimiento
                </p>
                <p className="text-2xl font-mono font-bold tracking-wider text-stone-900 dark:text-stone-100">
                  {trackingCode}
                </p>
              </div>

              <div className="text-center">
                <p className="text-xs text-stone-500 dark:text-stone-400 italic">
                  Por favor colocar en el Motivo de transferencia el siguiente código de seguimiento:{" "}
                  <strong className="text-stone-900 dark:text-stone-100 not-italic">{trackingCode}</strong>
                </p>
              </div>

              <div className="border-t border-stone-200 dark:border-stone-700 pt-4">
                <p className="text-[10px] uppercase tracking-widest text-stone-400 mb-3 text-center">
                  Datos para la transferencia
                </p>
                <div className="space-y-3">
                  {BANK_ACCOUNTS.map((bank, i) => (
                    <div
                      key={i}
                      className="bg-white dark:bg-stone-900 rounded-xl p-4 text-sm space-y-1 border border-stone-200 dark:border-stone-700"
                    >
                      <p className="font-semibold text-stone-900 dark:text-stone-100">
                        {bank.bank}
                      </p>
                      <p className="text-stone-600 dark:text-stone-400">
                        {bank.type}: <strong className="text-stone-900 dark:text-stone-100">{bank.number}</strong>
                      </p>
                      <p className="text-stone-600 dark:text-stone-400">
                        Titular: {bank.holder}
                      </p>
                      <p className="text-stone-600 dark:text-stone-400">
                        Cédula: {bank.id}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Receipt dropzone */}
            <div>
              <p className="text-[11px] font-medium uppercase tracking-widest text-stone-500 dark:text-stone-400 mb-3">
                Adjuntar comprobante de pago <span className="text-red-500">*</span>
              </p>
              <Dropzone
                onFile={(f) => { setReceiptData(f); setError(null) }}
                label="Arrastra o haz clic para subir el comprobante"
              />
            </div>
          </>
        )}

        {/* Policies */}
        <div className="space-y-3">
          <div className="flex items-center gap-3">
            <Checkbox
              id="accept-policies"
              checked={accepted}
              onCheckedChange={(v) => { setAccepted(v === true); setError(null) }}
            />
            <label htmlFor="accept-policies" className="text-xs text-stone-600 dark:text-stone-400 cursor-pointer">
              He leído y acepto las{" "}
              <button
                type="button"
                onClick={() => setPoliciesOpen(true)}
                className="underline hover:text-stone-900 dark:hover:text-stone-100"
              >
                políticas de reservación
              </button>
            </label>
          </div>
          <button
            type="button"
            onClick={() => setPoliciesOpen(true)}
            className="text-[11px] text-stone-400 dark:text-stone-500 underline hover:text-stone-600 dark:hover:text-stone-400"
          >
            Ver políticas de reserva
          </button>
        </div>

        {error && (
          <p className="text-xs text-red-500 dark:text-red-400 text-center">{error}</p>
        )}

        <div className="flex gap-3 pt-2">
          <Button
            type="button"
            variant="outline"
            onClick={prevStep}
            className="flex-1 h-12 rounded-xl text-sm border-stone-200 dark:border-stone-700"
          >
            <FaArrowLeft className="w-3.5 h-3.5 mr-2" />
            Atrás
          </Button>
          <Button
            type="button"
            onClick={handleSubmit}
            className="flex-1 bg-stone-900 hover:bg-stone-800 dark:bg-stone-100 dark:hover:bg-stone-200 text-white dark:text-stone-900 h-12 rounded-xl text-sm group"
          >
            <span className="flex items-center justify-center gap-2">
              Confirmar mi reserva
              <FaCheckCircle className="w-3.5 h-3.5" />
            </span>
          </Button>
        </div>
      </div>

      <PoliciesModal open={policiesOpen} onOpenChange={setPoliciesOpen} />
    </div>
  )
}
