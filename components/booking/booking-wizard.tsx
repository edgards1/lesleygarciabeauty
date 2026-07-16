"use client"

import { BookingProvider, useBookingContext } from "@/components/booking/booking-context"
import { StepIndicator } from "@/components/booking/step-indicator"
import { StepPersonalInfo } from "@/components/booking/steps/step-personal-info"
import { StepService } from "@/components/booking/steps/step-service"
import { StepLocation } from "@/components/booking/steps/step-location"
import { StepDateTime } from "@/components/booking/steps/step-datetime"
import { StepPayment } from "@/components/booking/steps/step-payment"
import { StepSuccess } from "@/components/booking/steps/step-success"
import { FadeIn } from "@/components/animations/fade-in"

const STEPS = [
  StepPersonalInfo,
  StepService,
  StepLocation,
  StepDateTime,
  StepPayment,
  StepSuccess,
]

function WizardContent() {
  const { currentStep } = useBookingContext()
  const StepComponent = STEPS[currentStep]

  return (
    <div className="min-h-screen bg-white dark:bg-stone-900 transition-colors">
      {/* Header */}
      <div className="border-b border-stone-200 dark:border-stone-700">
        <div className="container mx-auto px-5 sm:px-8 py-6">
            <a href="/" className="flex items-center justify-center mb-4">
              <img
                src="/icons/Logo_LG.svg"
                className="h-10 w-auto me-3"
              />
              <p className="text-xl font-serif text-stone-900 dark:text-stone-100 tracking-tight">Lesley García</p>
            </a>
          {currentStep < 5 && <StepIndicator />}
        </div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-5 sm:px-8 py-12 sm:py-16">
        <FadeIn key={currentStep}>
          <StepComponent />
        </FadeIn>
      </div>
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
