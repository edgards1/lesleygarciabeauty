"use client"

import { useState, useEffect } from "react"
import { format } from "date-fns"
import { es } from "date-fns/locale"
import { motion, AnimatePresence, useReducedMotion } from "motion/react"
import { useBookingContext } from "@/components/booking/booking-context"
import { StepHeader } from "@/components/booking/step-header"
import { TIME_SLOTS, WHATSAPP_NUMBER } from "@/lib/config/booking.config"
import type { CalendarSlot } from "@/lib/types/booking.types"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { FaArrowLeft, FaArrowRight, FaWhatsapp } from "react-icons/fa"
import { toast } from "sonner"
import { cn } from "@/lib/utils"

const EASE = [0.32, 0.72, 0, 1] as const

export function StepDateTime() {
  const { dateTime, setDateTime, prevStep, nextStep } = useBookingContext()
  const [date, setDate] = useState<Date | undefined>(dateTime?.date)
  const [selectedSlot, setSelectedSlot] = useState<string | null>(dateTime?.timeSlot ?? null)
  const [slots, setSlots] = useState<CalendarSlot[]>([])
  const [loading, setLoading] = useState(false)
  const reduce = useReducedMotion()

  useEffect(() => {
    if (!date) return
    async function fetchAvailability() {
      setLoading(true)
      try {
        const dateStr = format(date as Date, "yyyy-MM-dd")
        const res = await fetch(`/api/calendar/availability?date=${dateStr}`)
        if (!res.ok) throw new Error("Error al consultar disponibilidad")
        const data = await res.json()
        setSlots(data.slots ?? [])
      } catch {
        setSlots(
          (TIME_SLOTS as readonly string[]).map((t) => ({ time: t, available: true }))
        )
      } finally {
        setLoading(false)
      }
    }
    fetchAvailability()
  }, [date])

  function handleContinue() {
    if (!date || !selectedSlot) {
      toast.error("Selecciona una fecha y un horario")
      return
    }
    setDateTime({ date, timeSlot: selectedSlot })
    nextStep()
  }

  const hasAvailableSlots = slots.some((s) => s.available)
  const allUnavailable = slots.length > 0 && !hasAvailableSlots

  return (
    <div>
      <StepHeader
        index={3}
        eyebrow="Fecha y hora"
        title={
          <>
            ¿Cuándo te <span className="font-normal italic text-stone-500">gustaría</span>?
          </>
        }
        description="Elige el día en el calendario y luego uno de los horarios disponibles."
      />

      <div className="grid gap-7 lg:grid-cols-[auto,1fr] lg:gap-10">
        <div className="mx-auto w-fit lg:mx-0">
          <div className="rounded-[1.5rem] bg-stone-100 p-1.5 ring-1 ring-stone-200">
            <div className="rounded-[calc(1.5rem-0.25rem)] bg-white p-4">
              <Calendar
                mode="single"
                locale={es}
                weekStartsOn={1}
                selected={date}
                onSelect={(d) => {
                  setDate(d)
                  setSelectedSlot(null)
                }}
                classNames={{
                  day: "relative h-9 w-9 p-0 text-center transition-colors duration-500",
                  day_button:
                    "relative z-10 flex h-full w-full items-center justify-center rounded-full font-sans text-sm transition-colors duration-500 focus:outline-none",
                  weekday:
                    "text-muted-foreground w-9 font-sans text-[9px] font-bold uppercase tracking-[0.15em]",
                  selected: "bg-stone-900 text-white hover:bg-stone-900/90 rounded-full",
                  today: "border border-stone-500 rounded-full",
                  button_previous:
                    "h-7 w-7 bg-transparent p-0 opacity-50 hover:opacity-100 absolute left-1 rounded-full",
                  button_next:
                    "h-7 w-7 bg-transparent p-0 opacity-50 hover:opacity-100 absolute right-1 rounded-full",
                }}
                disabled={(d) => {
                  const today = new Date()
                  today.setHours(0, 0, 0, 0)
                  return d < today || d.getDay() === 0
                }}
              />
            </div>
          </div>
        </div>

        <div className="min-h-[280px]">
          <AnimatePresence mode="wait">
            {date ? (
              <motion.div
                key="slots"
                initial={reduce ? { opacity: 0 } : { opacity: 0, y: 16, filter: "blur(4px)" }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                exit={reduce ? { opacity: 0 } : { opacity: 0, y: -16, filter: "blur(4px)" }}
                transition={{ duration: 0.5, ease: EASE }}
              >
                <p className="mb-3 font-sans text-[10px] font-bold uppercase tracking-[0.15em] text-stone-500">
                  Horarios disponibles
                </p>

                {loading ? (
                  <div className="flex items-center justify-center py-8">
                    <div className="h-6 w-6 animate-spin rounded-full border-2 border-stone-900 border-t-transparent" />
                  </div>
                ) : (
                  <div className="grid grid-cols-3 gap-2 sm:grid-cols-4 xl:grid-cols-6">
                    {slots.map((slot) => {
                      const isSelected = selectedSlot === slot.time
                      return (
                        <button
                          key={slot.time}
                          type="button"
                          disabled={!slot.available}
                          onClick={() => setSelectedSlot(slot.time)}
                          className={cn(
                            "h-12 rounded-full font-sans text-sm font-semibold transition-all duration-700 ease-[cubic-bezier(0.32,0.72,0,1)]",
                            isSelected &&
                              "bg-stone-900 text-white",
                            !isSelected &&
                              slot.available &&
                              "border border-stone-300 bg-white text-stone-900 hover:border-stone-500 hover:text-stone-500",
                            !slot.available &&
                              "cursor-not-allowed bg-stone-100 text-stone-500/30 line-through"
                          )}
                        >
                          {slot.time}
                        </button>
                      )
                    })}
                  </div>
                )}

                {allUnavailable && (
                  <div className="mt-8 space-y-3 text-center">
                    <p className="font-sans text-sm text-stone-500/50">
                      No hay horarios disponibles para esta fecha
                    </p>
                    <a
                      href={`https://api.whatsapp.com/send?phone=${WHATSAPP_NUMBER}&text=Hola%2C%20quiero%20consultar%20disponibilidad%20para%20el%20d%C3%ADa%20${date ? format(date, "dd/MM/yyyy") : ""}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group inline-flex h-11 items-center gap-2 rounded-full bg-[#25D366] px-5 font-sans text-sm font-semibold text-white transition-all duration-700 ease-[cubic-bezier(0.32,0.72,0,1)] hover:bg-[#1EBE5D] active:scale-[0.98]"
                    >
                      <FaWhatsapp className="h-4 w-4" />
                      Consultar por WhatsApp
                    </a>
                  </div>
                )}
              </motion.div>
            ) : (
              <motion.div
                key="no-date"
                initial={reduce ? { opacity: 0 } : { opacity: 0, y: 16, filter: "blur(4px)" }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                exit={reduce ? { opacity: 0 } : { opacity: 0, y: -16, filter: "blur(4px)" }}
                transition={{ duration: 0.5, ease: EASE }}
                className="flex h-full min-h-[280px] flex-col items-center justify-center rounded-[1.5rem] border border-dashed border-stone-300 bg-white/60 p-10 text-center"
              >
                <p className="font-serif text-xl font-semibold italic text-stone-900">
                  Elige una fecha
                </p>
                <p className="mt-3 max-w-xs font-sans text-sm text-stone-500/60">
                  Selecciona un día en el calendario para ver los horarios disponibles.
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      <div className="mt-8 flex gap-3">
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
          onClick={handleContinue}
          disabled={!date || !selectedSlot}
          className="group h-12 flex-1 rounded-full bg-stone-900 font-sans text-sm font-semibold text-white transition-all duration-700 ease-[cubic-bezier(0.32,0.72,0,1)] hover:bg-stone-700 active:scale-[0.98] disabled:opacity-30"
        >
          <span className="flex items-center justify-center gap-2">
            Continuar
            <span className="flex h-6 w-6 items-center justify-center rounded-full bg-white/10 transition-transform duration-700 ease-[cubic-bezier(0.32,0.72,0,1)] group-hover:translate-x-0.5">
              <FaArrowRight className="h-3 w-3" />
            </span>
          </span>
        </Button>
      </div>
    </div>
  )
}
