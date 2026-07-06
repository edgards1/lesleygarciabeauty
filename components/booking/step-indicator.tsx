"use client"

import { useBookingContext } from "@/components/booking/booking-context"
import { cn } from "@/lib/utils"

const STEPS = [
  { num: 1, label: "Datos personales" },
  { num: 2, label: "Servicio" },
  { num: 3, label: "Ubicación" },
  { num: 4, label: "Fecha y hora" },
  { num: 5, label: "Pago" },
  { num: 6, label: "Confirmación" },
]

export function StepIndicator() {
  const { currentStep } = useBookingContext()

  return (
    <div className="w-full overflow-x-auto scrollbar-hide">
      <div className="flex items-center justify-center gap-0 min-w-max px-1 py-4">
        {STEPS.map((step, i) => {
          const isActive = currentStep === i
          const isCompleted = currentStep > i
          const isLast = i === STEPS.length - 1

          return (
            <div key={step.num} className="flex items-center">
              <div className="flex items-center gap-2">
                <div
                  className={cn(
                    "flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-xs font-semibold transition-all duration-300",
                    isActive &&
                      "bg-stone-900 text-white dark:bg-stone-100 dark:text-stone-900",
                    isCompleted &&
                      "bg-stone-900 text-white dark:bg-stone-100 dark:text-stone-900",
                    !isActive &&
                      !isCompleted &&
                      "bg-stone-100 text-stone-400 dark:bg-stone-800 dark:text-stone-500"
                  )}
                >
                  {isCompleted ? (
                    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  ) : (
                    step.num
                  )}
                </div>
                <span
                  className={cn(
                    "hidden sm:block text-[11px] font-medium uppercase tracking-wider transition-colors duration-300",
                    isActive && "text-stone-900 dark:text-stone-100",
                    isCompleted && "text-stone-500 dark:text-stone-400",
                    !isActive && !isCompleted && "text-stone-300 dark:text-stone-600"
                  )}
                >
                  {step.label}
                </span>
              </div>
              {!isLast && (
                <div
                  className={cn(
                    "mx-3 h-px w-8 sm:w-12 transition-colors duration-300",
                    isCompleted
                      ? "bg-stone-900 dark:bg-stone-100"
                      : "bg-stone-200 dark:bg-stone-700"
                  )}
                />
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}
