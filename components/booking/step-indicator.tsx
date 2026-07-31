"use client"

import { useBookingContext } from "@/components/booking/booking-context"
import { motion } from "motion/react"

export const WIZARD_STEPS = [
  { id: "personal", label: "Tus datos", sub: "¿Quién eres?" },
  { id: "service", label: "Servicio", sub: "Elige tu experiencia" },
  { id: "location", label: "Ubicación", sub: "¿Dónde te atendemos?" },
  { id: "datetime", label: "Fecha", sub: "¿Cuándo te gustaría?" },
  { id: "payment", label: "Pago", sub: "Confirma tu reserva" },
]

export function StepIndicator() {
  const { currentStep } = useBookingContext()

  return (
    <nav aria-label="Progreso" className="flex items-center gap-0">
      {WIZARD_STEPS.map((s, i) => {
        const isActive = currentStep === i
        const isDone = currentStep > i

        return (
          <div key={s.id} className="flex items-center">
            <div className="flex items-center gap-2.5">
              <motion.span
                layout
                transition={{ type: "spring", stiffness: 200, damping: 20 }}
                className={`flex h-6 w-6 items-center justify-center rounded-full text-[10px] font-bold transition-all duration-300 ${
                  isDone
                    ? "bg-stone-900 text-white"
                    : isActive
                      ? "bg-stone-700 text-white ring-2 ring-stone-400/25 ring-offset-2 ring-offset-white"
                      : "border border-stone-300 bg-transparent text-stone-500/40"
                }`}
              >
                {isDone ? (
                  <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                  </svg>
                ) : (
                  i + 1
                )}
              </motion.span>
              <span
                className={`hidden text-[10px] font-semibold uppercase tracking-[0.12em] transition-colors duration-300 md:block ${
                  isDone || isActive ? "text-stone-900" : "text-stone-500/30"
                }`}
              >
                {s.label}
              </span>
            </div>
            {i < WIZARD_STEPS.length - 1 && (
              <motion.div
                className={`mx-3 h-px w-6 transition-colors duration-300 ${
                  isDone ? "bg-stone-900" : "bg-stone-300"
                }`}
                layout
                transition={{ type: "spring", stiffness: 200, damping: 20 }}
              />
            )}
          </div>
        )
      })}
    </nav>
  )
}
