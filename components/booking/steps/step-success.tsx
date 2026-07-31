"use client"

import { useEffect, useRef, useState } from "react"
import Link from "next/link"
import { motion, useReducedMotion } from "motion/react"
import { useBookingContext } from "@/components/booking/booking-context"
import { RESCHEDULE_POLICY } from "@/lib/config/booking.config"
import { format } from "date-fns"
import { es } from "date-fns/locale"
import { Button } from "@/components/ui/button"
import { FaWhatsapp } from "react-icons/fa"
import { FiClock } from "react-icons/fi"
import { toast } from "sonner"

const EASE = [0.32, 0.72, 0, 1] as const

export function StepSuccess() {
  const { personalInfo, service, location, dateTime, payment, reset } = useBookingContext()
  const [submitting, setSubmitting] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const called = useRef(false)
  const reduce = useReducedMotion()

  useEffect(() => {
    if (called.current) return
    called.current = true

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
            documentId: personalInfo.documentId,
            service: service.name,
            servicePrice: service.price,
            serviceCategory: service.category,
            locationType: location?.type ?? "studio",
            address: location?.address ?? "",
            reference: location?.reference ?? "",
            lat: location?.lat ?? null,
            lng: location?.lng ?? null,
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
      const msg = err instanceof Error ? err.message : "Ocurrió un error. Te contactaremos por WhatsApp."
      setError(msg)
      toast.error(msg)
      } finally {
        setSubmitting(false)
      }
    }
    confirm()
  }, [])

  if (submitting) {
    return (
      <div className="mx-auto max-w-lg py-16 text-center">
        <div className="mx-auto mb-6 h-10 w-10 animate-spin rounded-full border-2 border-stone-500 border-t-transparent" />
        <p className="font-serif text-xl italic text-stone-900">Procesando tu reserva...</p>
        <p className="mt-2 font-sans text-xs text-stone-500/50">Un momento, por favor.</p>
      </div>
    )
  }

  return (
    <div className="text-center">
      <motion.div
        initial={reduce ? { opacity: 0 } : { opacity: 0, y: 20, filter: "blur(6px)" }}
        animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
        transition={{ duration: 0.8, ease: EASE }}
        className="mb-7"
      >
        <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-full bg-stone-200 ring-1 ring-stone-300">
          <FiClock className="h-6 w-6 text-stone-500" />
        </div>

        <div className="mb-4 flex items-center justify-center gap-3">
          <span className="h-px w-10 bg-stone-500" />
          <span className="font-sans text-[10px] font-bold uppercase tracking-[0.3em] text-stone-500">
            Reserva recibida
          </span>
          <span className="h-px w-10 bg-stone-500" />
        </div>

        <h2 className="font-serif text-[clamp(2.2rem,5vw,3.5rem)] font-semibold leading-[1.05] tracking-[-0.02em] text-stone-900">
          Tu cita está en
          <br />
          <span className="font-normal italic text-stone-500">buenas manos</span>
        </h2>

        <p
          className="mt-3 text-xl text-stone-500/70"
          style={{ fontFamily: "var(--font-caveat)" }}
        >
          gracias por confiar
        </p>

        <p className="mx-auto mt-3 max-w-md font-sans text-sm leading-relaxed text-stone-500/80">
          Una vez que verifiquemos tu comprobante de pago, te enviaremos un correo de
          confirmación y un mensaje de WhatsApp con los detalles.
        </p>
      </motion.div>

      <motion.div
        initial={reduce ? { opacity: 0 } : { opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: EASE, delay: 0.15 }}
        className="mx-auto mb-5 max-w-lg rounded-[1.5rem] bg-stone-100 p-1.5 ring-1 ring-stone-200"
      >
        <div className="rounded-[calc(1.5rem-0.25rem)] bg-white p-5 text-left sm:p-6">
          <p className="mb-4 text-center font-sans text-[10px] font-bold uppercase tracking-[0.3em] text-stone-500">
            Resumen de tu reserva
          </p>
          <div className="space-y-3">
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
          </div>

          <div className="my-6 border-t border-dashed border-stone-300" />

          <div className="flex items-baseline justify-between gap-4">
            <span className="font-sans text-[10px] font-bold uppercase tracking-[0.15em] text-stone-500/60">
              Total pagado ({payment?.percentage ?? 50}%)
            </span>
            <span className="font-serif text-3xl font-semibold leading-none text-stone-900">
              ${payment?.amount ?? 0}
            </span>
          </div>

          {payment?.trackingCode && (
            <div className="mt-6 rounded-[1rem] bg-stone-100 p-4 text-center ring-1 ring-stone-300">
              <p className="font-sans text-[9px] font-bold uppercase tracking-[0.2em] text-stone-500">
                Tu código de seguimiento
              </p>
              <p className="mt-1.5 font-mono text-xl font-bold tracking-widest text-stone-900">
                {payment.trackingCode}
              </p>
              <p className="mt-1.5 font-sans text-[11px] text-stone-500/50">
                Guárdalo para consultar el estado de tu reserva
              </p>
            </div>
          )}
        </div>
      </motion.div>

      {error && (
        <div className="mx-auto mb-5 max-w-lg rounded-[1.25rem] border border-stone-300 bg-stone-50 p-4">
          <p className="mb-2 font-sans text-xs text-stone-500">{error}</p>
          <a
            href={`https://api.whatsapp.com/send?phone=593983366831&text=Hola%2C%20mi%20c%C3%B3digo%20de%20seguimiento%20es%20${payment?.trackingCode}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 font-sans text-xs font-semibold text-[#25D366] underline"
          >
            <FaWhatsapp className="h-3 w-3" />
            Contáctanos por WhatsApp
          </a>
        </div>
      )}

      <div className="mx-auto mb-5 max-w-lg">
        <p className="font-sans text-[11px] leading-relaxed text-stone-500/50">
          {RESCHEDULE_POLICY}
        </p>
      </div>

      <div className="flex flex-col justify-center gap-3 sm:flex-row">
        <Link href="/">
          <Button
            type="button"
            variant="outline"
            className="h-12 w-full rounded-full border-stone-300 bg-transparent px-8 font-sans text-sm font-semibold text-stone-900 transition-all duration-500 hover:bg-stone-50 sm:w-auto"
          >
            Ir al inicio
          </Button>
        </Link>
        <Link href="/agendar">
          <Button
            type="button"
            onClick={reset}
            className="h-12 w-full rounded-full bg-stone-900 px-8 font-sans text-sm font-semibold text-white transition-all duration-500 hover:bg-stone-700 active:scale-[0.98] sm:w-auto"
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
    <div className="flex items-baseline justify-between gap-4">
      <span className="shrink-0 font-sans text-[10px] font-bold uppercase tracking-[0.15em] text-stone-500/60">
        {label}
      </span>
      <span className="text-right font-sans text-[13px] font-semibold text-stone-900">
        {value}
      </span>
    </div>
  )
}
