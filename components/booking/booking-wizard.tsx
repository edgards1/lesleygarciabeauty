"use client"

import Link from "next/link"
import { AnimatePresence, motion, useReducedMotion } from "motion/react"
import { BookingProvider, useBookingContext } from "@/components/booking/booking-context"
import { StepIndicator, WIZARD_STEPS } from "@/components/booking/step-indicator"
import { StepPersonalInfo } from "@/components/booking/steps/step-personal-info"
import { StepService } from "@/components/booking/steps/step-service"
import { StepLocation } from "@/components/booking/steps/step-location"
import { StepDateTime } from "@/components/booking/steps/step-datetime"
import { StepPayment } from "@/components/booking/steps/step-payment"
import { StepSuccess } from "@/components/booking/steps/step-success"
import { BookingTicket } from "@/components/booking/booking-ticket"
import { FloatingHelpButton } from "@/components/booking/floating-help-button"
import { BookingToaster } from "@/components/booking/booking-toaster"

const STEPS = [
  StepPersonalInfo,
  StepService,
  StepLocation,
  StepDateTime,
  StepPayment,
  StepSuccess,
]

const EASE = [0.32, 0.72, 0, 1] as const

const stepVariants = {
  enter: (dir: number) => ({ opacity: 0, x: 32 * dir, filter: "blur(4px)" }),
  center: { opacity: 1, x: 0, filter: "blur(0px)" },
  exit: (dir: number) => ({ opacity: 0, x: -32 * dir, filter: "blur(4px)" }),
}

function NoiseOverlay() {
  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 z-50 opacity-[0.012]"
      style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
      }}
    />
  )
}

function AmbientGlow() {
  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 overflow-hidden">
      <div className="absolute -top-40 right-[-10%] h-[28rem] w-[28rem] rounded-full bg-[radial-gradient(circle,rgba(0,0,0,0.03)_0%,transparent_65%)]" />
      <div className="absolute bottom-[-20%] left-[-12%] h-[32rem] w-[32rem] rounded-full bg-[radial-gradient(circle,rgba(0,0,0,0.02)_0%,transparent_65%)]" />
    </div>
  )
}

function WizardContent() {
  const { currentStep, direction } = useBookingContext()
  const StepComponent = STEPS[currentStep]
  const reduce = useReducedMotion()

  const isSuccess = currentStep === STEPS.length - 1
  const withRail = currentStep >= 1 && !isSuccess
  const progress = Math.min((currentStep + 1) / WIZARD_STEPS.length, 1)

  return (
    <div className="relative flex h-dvh flex-col overflow-x-clip bg-white font-sans text-stone-900">
      <NoiseOverlay />
      <AmbientGlow />

      {/* Cabecera — slim */}
      <header className="relative z-40 shrink-0 border-b border-stone-200 bg-white/90 backdrop-blur-2xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-3 sm:px-8 lg:px-12">
          <Link href="/" className="flex items-center gap-2.5">
            <img src="/icons/Logo_LG.svg" alt="Lesley Garcia" className="h-6 w-auto" />
          </Link>
          <div className="flex items-center gap-5">
            {!isSuccess && (
              <div className="hidden sm:block">
                <StepIndicator />
              </div>
            )}
          </div>
        </div>
        {!isSuccess && (
          <div className="h-[1.5px] bg-stone-200">
            <motion.div
              className="h-full origin-left bg-stone-700"
              initial={false}
              animate={{ scaleX: progress }}
              transition={{ duration: 0.5, ease: EASE }}
            />
          </div>
        )}
      </header>

      {/* Indicador móvil */}
      {!isSuccess && (
        <div className="relative z-10 border-b border-stone-200 px-5 py-1.5 sm:hidden">
          <StepIndicator />
        </div>
      )}

      {/* Contenido */}
      <main className="relative z-10 min-h-0 flex-1 overflow-y-auto">
        <div className="mx-auto flex min-h-full w-full max-w-7xl flex-col px-5 py-5 sm:px-8 sm:py-7 lg:px-12">
          <div
            className={`my-auto w-full ${
              withRail
                ? "lg:grid lg:grid-cols-[minmax(0,1fr)_320px] lg:gap-12 xl:grid-cols-[minmax(0,1fr)_340px] xl:gap-16"
                : ""
            }`}
          >
            <div className={withRail ? "min-w-0" : isSuccess ? "mx-auto w-full max-w-2xl" : "mx-auto w-full max-w-xl"}>
              <AnimatePresence mode="wait" custom={direction} initial={false}>
                <motion.div
                  key={currentStep}
                  custom={direction}
                  variants={stepVariants}
                  initial={reduce ? { opacity: 0 } : "enter"}
                  animate="center"
                  exit={reduce ? { opacity: 0 } : "exit"}
                  transition={{ duration: 0.5, ease: EASE }}
                >
                  <StepComponent />
                </motion.div>
              </AnimatePresence>
            </div>

            {withRail && (
              <aside className="hidden lg:block">
                <motion.div
                  initial={reduce ? { opacity: 0 } : { opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, ease: EASE, delay: 0.2 }}
                  className="lg:sticky lg:top-4 flex flex-col"
                >
                  <BookingTicket />
                  <div className="flex flex-col gap-3 mt-3">
                    <span className="px-2 text-center font-sans text-[9px] leading-relaxed tracking-[0.08em] text-stone-500/40">
                      ATENCIÓN PERSONALIZADA
                    </span>
                    <span className="px-2 text-center font-sans text-[9px] leading-relaxed tracking-[0.08em] text-stone-500/40">
                      PRODUCTOS DE ALTA GAMA
                    </span>
                    <span className="px-2 text-center font-sans text-[9px] leading-relaxed tracking-[0.08em] text-stone-500/40">
                      5+ AÑOS DE EXPERIENCIA
                    </span>
                  </div>
                </motion.div>
              </aside>
            )}
          </div>
        </div>
      </main>

      <FloatingHelpButton />
      <BookingToaster />
    </div>
  )
}

export function BookingWizard() {
  return (
    <BookingProvider>
      <WizardContent />
    </BookingProvider>
  )
}
