"use client"

import { useState, useEffect } from "react"
import { format } from "date-fns"
import { es } from "date-fns/locale"
import { useBookingContext } from "@/components/booking/booking-context"
import { TIME_SLOTS, WHATSAPP_NUMBER } from "@/lib/config/booking.config"
import type { CalendarSlot } from "@/lib/types/booking.types"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { FaArrowLeft, FaArrowRight, FaWhatsapp, FaCalendarAlt } from "react-icons/fa"
import { cn } from "@/lib/utils"

export function StepDateTime() {
  const { dateTime, setDateTime, prevStep, nextStep } = useBookingContext()
  const [date, setDate] = useState<Date | undefined>(dateTime?.date)
  const [selectedSlot, setSelectedSlot] = useState<string | null>(dateTime?.timeSlot ?? null)
  const [calendarOpen, setCalendarOpen] = useState(false)
  const [slots, setSlots] = useState<CalendarSlot[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!date) return
    async function fetchAvailability() {
      setLoading(true)
      setError(null)
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
      setError("Selecciona una fecha y un horario")
      return
    }
    setDateTime({ date, timeSlot: selectedSlot })
    nextStep()
  }

  const hasAvailableSlots = slots.some((s) => s.available)
  const allUnavailable = slots.length > 0 && !hasAvailableSlots

  return (
    <div className="max-w-lg mx-auto">
      <div className="text-center mb-10">
        <h2 className="text-3xl font-serif text-stone-900 dark:text-stone-100 mb-3">
          ¿Cuándo te gustaría?
        </h2>
        <p className="text-sm text-stone-500 dark:text-stone-400">
          Selecciona la fecha y el horario disponible
        </p>
      </div>

      <div className="space-y-6">
        {/* Date picker */}
        <div className="flex flex-col items-center">
          <Popover open={calendarOpen} onOpenChange={setCalendarOpen}>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className={cn(
                  "w-full h-12 rounded-xl text-sm font-normal justify-start text-left border-stone-200 dark:border-stone-700",
                  !date && "text-stone-400"
                )}
              >
                <FaCalendarAlt className="mr-2 h-4 w-4 shrink-0" />
                {date
                  ? format(date, "dd 'de' MMMM 'de' yyyy", { locale: es })
                  : "Selecciona una fecha"}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="center">
              <Calendar
                mode="single"
                selected={date}
                onSelect={(d) => {
                  setDate(d)
                  setSelectedSlot(null)
                  setCalendarOpen(false)
                }}
                disabled={(d) => {
                  const today = new Date()
                  today.setHours(0, 0, 0, 0)
                  return d < today || d.getDay() === 0
                }}
                initialFocus
              />
            </PopoverContent>
          </Popover>
        </div>

        {/* Time slots */}
        {date && (
          <div>
            <p className="text-[11px] font-medium uppercase tracking-widest text-stone-500 dark:text-stone-400 mb-3">
              Horarios disponibles
            </p>
            {loading ? (
              <div className="flex items-center justify-center py-8">
                <div className="w-5 h-5 border-2 border-stone-900 dark:border-stone-100 border-t-transparent rounded-full animate-spin" />
              </div>
            ) : (
              <div className="grid grid-cols-3 gap-2">
                {slots.map((slot) => {
                  const isSelected = selectedSlot === slot.time
                  return (
                    <button
                      key={slot.time}
                      type="button"
                      disabled={!slot.available}
                      onClick={() => setSelectedSlot(slot.time)}
                      className={cn(
                        "h-12 rounded-xl text-sm font-medium transition-all duration-300",
                        isSelected &&
                          "bg-stone-900 text-white dark:bg-stone-100 dark:text-stone-900",
                        !isSelected &&
                          slot.available &&
                          "bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-700 hover:border-stone-900 dark:hover:border-stone-100 text-stone-700 dark:text-stone-300",
                        !slot.available &&
                          "bg-stone-100 dark:bg-stone-800 text-stone-300 dark:text-stone-600 cursor-not-allowed line-through"
                      )}
                    >
                      {slot.time}
                    </button>
                  )
                })}
              </div>
            )}

            {allUnavailable && (
              <div className="mt-6 text-center space-y-3">
                <p className="text-sm text-stone-500 dark:text-stone-400">
                  No hay horarios disponibles para esta fecha
                </p>
                <a
                  href={`https://api.whatsapp.com/send?phone=${WHATSAPP_NUMBER}&text=Hola%2C%20quiero%20consultar%20disponibilidad%20para%20el%20d%C3%ADa%20${date ? format(date, "dd/MM/yyyy") : ""}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 h-11 px-5 bg-green-500 hover:bg-green-600 text-white rounded-xl text-sm font-medium transition-all duration-300"
                >
                  <FaWhatsapp className="w-4 h-4" />
                  Consultar por WhatsApp
                </a>
              </div>
            )}
          </div>
        )}
      </div>

      {error && (
        <p className="text-xs text-red-500 dark:text-red-400 mt-4 text-center">{error}</p>
      )}

      <div className="flex gap-3 mt-8">
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
          onClick={handleContinue}
          disabled={!date || !selectedSlot}
          className="flex-1 bg-stone-900 hover:bg-stone-800 dark:bg-stone-100 dark:hover:bg-stone-200 text-white dark:text-stone-900 h-12 rounded-xl text-sm group disabled:opacity-40"
        >
          <span className="flex items-center justify-center gap-2">
            Continuar
            <FaArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform duration-300" />
          </span>
        </Button>
      </div>
    </div>
  )
}
