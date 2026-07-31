"use client"

import { AnimatePresence, motion } from "motion/react"
import { useBookingContext } from "@/components/booking/booking-context"
import { format } from "date-fns"
import { es } from "date-fns/locale"

const EASE = [0.32, 0.72, 0, 1] as const

const LOCATION_LABELS: Record<string, string> = {
  studio: "En estudio",
  home: "A domicilio",
  outOfCity: "Fuera de la ciudad",
}

export function BookingTicket() {
  const { service, location, dateTime, payment } = useBookingContext()

  const rows: { key: string; label: string; value: string }[] = []

  if (service) rows.push({ key: "service", label: "Servicio", value: service.name.replace(/^Paquete de /i, "").replace(/^Paquete /i, "") })
  if (location) rows.push({ key: "location", label: "Modalidad", value: LOCATION_LABELS[location.type] ?? location.type })
  if (dateTime) {
    rows.push({
      key: "date",
      label: "Fecha",
      value: `${format(dateTime.date, "dd MMM yyyy", { locale: es })} · ${dateTime.timeSlot}`,
    })
  }

  return (
    <div className="rounded-[1.5rem] bg-stone-100 p-1 ring-1 ring-stone-200">
      <div className="relative rounded-[calc(1.5rem-0.25rem)] bg-white">
        <div className="flex items-center justify-between px-5 pt-5 sm:px-6 sm:pt-6">
          <p className="font-sans text-[9px] font-bold uppercase tracking-[0.3em] text-stone-500">
            Tu cita
          </p>
        </div>

        <div className="px-5 pb-5 pt-3.5 sm:px-6 sm:pb-6">
          {rows.length === 0 ? (
            <div className="py-4 text-center">
              <p className="font-serif text-base italic text-stone-900/70">
                Tu comprobante
              </p>
              <p className="mx-auto mt-1.5 max-w-[200px] font-sans text-[11px] leading-relaxed text-stone-500/60">
                Aquí se irá llenando el detalle de tu cita a medida que elijas.
              </p>
            </div>
          ) : (
            <dl className="space-y-2.5">
              <AnimatePresence initial={false}>
                {rows.map((row) => (
                  <motion.div
                    key={row.key}
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.4, ease: EASE }}
                    className="flex items-baseline justify-between gap-3"
                  >
                    <dt className="shrink-0 font-sans text-[9px] font-bold uppercase tracking-[0.15em] text-stone-500/60">
                      {row.label}
                    </dt>
                    <dd className="text-right font-sans text-[12px] font-semibold leading-snug text-stone-900">
                      {row.value}
                    </dd>
                  </motion.div>
                ))}
              </AnimatePresence>
            </dl>
          )}
        </div>

        {service && (
          <>
            <div className="relative">
              <div className="mx-4 border-t border-dashed border-stone-300" />
              <span className="absolute -left-2 top-1/2 h-4 w-4 -translate-y-1/2 rounded-full bg-stone-100 ring-1 ring-stone-200" />
              <span className="absolute -right-2 top-1/2 h-4 w-4 -translate-y-1/2 rounded-full bg-stone-100 ring-1 ring-stone-200" />
            </div>

            <div className="px-5 py-5 sm:px-6">
              <div className="flex items-baseline justify-between gap-3">
                <span className="font-sans text-[9px] font-bold uppercase tracking-[0.15em] text-stone-500/60">
                  Total
                </span>
                <span className="font-serif text-[1.75rem] font-semibold leading-none text-stone-900">
                  ${service.price}
                </span>
              </div>
              {payment ? (
                <div className="mt-2.5 flex items-baseline justify-between gap-3">
                  <span className="font-sans text-[9px] font-bold uppercase tracking-[0.15em] text-stone-500">
                    Pagado ({payment.percentage}%)
                  </span>
                  <span className="font-sans text-[12px] font-semibold text-stone-500">
                    ${payment.amount}
                  </span>
                </div>
              ) : (
                <p className="mt-2.5 font-sans text-[10px] leading-relaxed text-stone-500/50">
                  Anticipo del 50% (${(service.price * 0.5).toFixed(0)}) para confirmar. El saldo el día de tu cita.
                </p>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  )
}
