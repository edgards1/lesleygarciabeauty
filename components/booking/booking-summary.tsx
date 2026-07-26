"use client"

import { useBookingContext } from "@/components/booking/booking-context"
import { format } from "date-fns"
import { es } from "date-fns/locale"

export function BookingSummary() {
  const { service, location, dateTime, payment } = useBookingContext()

  if (!service) return null

  return (
    <div className="p-1.5 bg-black/[0.03] rounded-[1.5rem] ring-1 ring-black/[0.04]">
      <div className="rounded-[calc(1.5rem-0.25rem)] bg-white p-5 sm:p-6">
        <p className="mb-4 font-sans text-[10px] font-bold uppercase tracking-[0.18em] text-[#C4956A]">
          Resumen
        </p>
        <div className="space-y-3 text-sm">
          <Row label="Servicio" value={service.name} />
          <Row label="Precio" value={`$${service.price}`} />
          {dateTime && (
            <Row
              label="Fecha"
              value={`${format(dateTime.date, "dd MMM yyyy", { locale: es })} — ${dateTime.timeSlot}`}
            />
          )}
          {location && location.type !== "studio" && location.address && (
            <Row label="Dirección" value={location.address} />
          )}
          {payment && (
            <Row
              label="Pagado"
              value={`$${payment.amount} (${payment.percentage}%)`}
            />
          )}
        </div>
      </div>
    </div>
  )
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between gap-3 border-b border-black/[0.06] pb-2.5 last:border-0 last:pb-0">
      <span className="shrink-0 font-sans text-[11px] font-medium uppercase tracking-[0.1em] text-[#6B5B50]">
        {label}
      </span>
      <span className="text-right text-[13px] font-semibold text-[#2D1B13]">
        {value}
      </span>
    </div>
  )
}
