"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { useBookingContext } from "@/components/booking/booking-context"
import { BANK_ACCOUNTS, RESCHEDULE_POLICY } from "@/lib/config/booking.config"
import { format } from "date-fns"
import { es } from "date-fns/locale"
import { Button } from "@/components/ui/button"
import { FaCheckCircle, FaWhatsapp } from "react-icons/fa"

export function StepSuccess() {
  const { personalInfo, service, location, dateTime, payment, reset } = useBookingContext()
  const [submitting, setSubmitting] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function confirm() {
      if (!service || !dateTime || !payment) return
      try {
        const res = await fetch("/api/booking/confirm", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            name: personalInfo.name,
            email: personalInfo.email,
            phone: personalInfo.phone,
            service: service.name,
            servicePrice: service.price,
            locationType: location?.type ?? "studio",
            address: location?.address ?? "",
            reference: location?.reference ?? "",
            date: format(dateTime.date, "yyyy-MM-dd"),
            timeSlot: dateTime.timeSlot,
            amountPaid: payment.amount,
            percentage: payment.percentage,
            trackingCode: payment.trackingCode,
            receiptBase64: payment.receiptBase64,
            receiptFileName: payment.receiptFileName,
          }),
        })
        if (!res.ok) {
          const data = await res.json()
          throw new Error(data.error ?? "Error al confirmar la reserva")
        }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Ocurrió un error. Te contactaremos por WhatsApp.")
      } finally {
        setSubmitting(false)
      }
    }
    confirm()
  }, [])

  if (submitting) {
    return (
      <div className="max-w-lg mx-auto text-center py-20">
        <div className="w-10 h-10 border-2 border-stone-900 dark:border-stone-100 border-t-transparent rounded-full animate-spin mx-auto mb-6" />
        <p className="text-stone-500 dark:text-stone-400 text-sm">
          Confirmando tu reserva...
        </p>
      </div>
    )
  }

  return (
    <div className="max-w-lg mx-auto text-center">
      <div className="mb-8">
        <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-green-100 dark:bg-green-900/30">
          <FaCheckCircle className="w-8 h-8 text-green-600 dark:text-green-400" />
        </div>
        <h2 className="text-3xl font-serif text-stone-900 dark:text-stone-100 mb-3">
          ¡Reserva confirmada!
        </h2>
        <p className="text-sm text-stone-500 dark:text-stone-400">
          Te hemos enviado un correo con los detalles de tu reserva
        </p>
      </div>

      <div className="rounded-2xl bg-stone-50 dark:bg-stone-800/50 border border-stone-200 dark:border-stone-700 p-6 text-left space-y-3 mb-8">
        <h3 className="text-sm font-semibold text-stone-900 dark:text-stone-100 text-center mb-4">
          Resumen de tu reserva
        </h3>
        <div className="space-y-2 text-sm">
          <Row label="Cliente" value={personalInfo.name} />
          <Row label="Email" value={personalInfo.email} />
          <Row label="Teléfono" value={personalInfo.phone} />
          <Row label="Servicio" value={service?.name ?? ""} />
          {dateTime && (
            <Row
              label="Fecha y hora"
              value={`${format(dateTime.date, "dd 'de' MMMM 'de' yyyy", { locale: es })} — ${dateTime.timeSlot}`}
            />
          )}
          {location && location.type !== "studio" && location.address && (
            <Row label="Dirección" value={location.address} />
          )}
          <Row
            label="Total pagado"
            value={`$${payment?.amount ?? 0} (${payment?.percentage ?? 50}%)`}
          />
          <Row label="Código" value={payment?.trackingCode ?? ""} />
        </div>
      </div>

      {error && (
        <div className="rounded-xl bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-700 p-4 mb-6">
          <p className="text-xs text-amber-700 dark:text-amber-400 mb-2">{error}</p>
          <a
            href={`https://api.whatsapp.com/send?phone=593983366831&text=Hola%2C%20mi%20c%C3%B3digo%20de%20seguimiento%20es%20${payment?.trackingCode}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-xs font-medium text-green-600 dark:text-green-400 underline"
          >
            <FaWhatsapp className="w-3 h-3" />
            Contáctanos por WhatsApp
          </a>
        </div>
      )}

      <div className="rounded-xl bg-stone-100 dark:bg-stone-800 p-4 mb-8">
        <p className="text-xs text-stone-500 dark:text-stone-400 leading-relaxed">
          {RESCHEDULE_POLICY}
        </p>
      </div>

      <div className="flex flex-col sm:flex-row gap-3 justify-center">
        <Link href="/">
          <Button
            type="button"
            variant="outline"
            className="h-12 rounded-xl text-sm border-stone-200 dark:border-stone-700 w-full sm:w-auto px-8"
          >
            Ir al inicio
          </Button>
        </Link>
        <Link href="/agendar">
          <Button
            type="button"
            onClick={reset}
            className="h-12 rounded-xl text-sm bg-stone-900 hover:bg-stone-800 dark:bg-stone-100 dark:hover:bg-stone-200 text-white dark:text-stone-900 px-8 w-full sm:w-auto"
          >
            Agendar otra cita
          </Button>
        </Link>
      </div>
    </div>
  )
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between gap-2">
      <span className="text-stone-500 dark:text-stone-400 text-[11px] uppercase tracking-wider shrink-0">
        {label}
      </span>
      <span className="text-stone-900 dark:text-stone-100 text-sm font-medium text-right">
        {value}
      </span>
    </div>
  )
}
