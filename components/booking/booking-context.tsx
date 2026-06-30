"use client"

import { createContext, useContext, useState, useCallback, type ReactNode } from "react"
import type {
  PersonalInfo,
  SelectedService,
  ServiceLocation,
  DateTimeSelection,
  PaymentInfo,
  LocationType,
} from "@/lib/types/booking.types"

interface BookingContextValue {
  currentStep: number
  totalSteps: number
  personalInfo: PersonalInfo
  service: SelectedService | null
  location: ServiceLocation | null
  dateTime: DateTimeSelection | null
  payment: PaymentInfo | null
  isSubmitting: boolean
  setPersonalInfo: (data: PersonalInfo) => void
  setService: (data: SelectedService) => void
  setLocation: (data: ServiceLocation) => void
  setDateTime: (data: DateTimeSelection) => void
  setPayment: (data: PaymentInfo) => void
  nextStep: () => void
  prevStep: () => void
  goToStep: (step: number) => void
  setIsSubmitting: (v: boolean) => void
  reset: () => void
}

const BookingContext = createContext<BookingContextValue | null>(null)

const initialState = {
  personalInfo: { name: "", email: "", phone: "" },
  service: null,
  location: null,
  dateTime: null,
  payment: null,
}

export function BookingProvider({ children }: { children: ReactNode }) {
  const [currentStep, setCurrentStep] = useState(0)
  const [personalInfo, setPersonalInfoState] = useState<PersonalInfo>(initialState.personalInfo)
  const [service, setServiceState] = useState<SelectedService | null>(initialState.service)
  const [location, setLocationState] = useState<ServiceLocation | null>(initialState.location)
  const [dateTime, setDateTimeState] = useState<DateTimeSelection | null>(initialState.dateTime)
  const [payment, setPaymentState] = useState<PaymentInfo | null>(initialState.payment)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const totalSteps = 6

  const nextStep = useCallback(() => {
    setCurrentStep((s) => Math.min(s + 1, totalSteps - 1))
  }, [totalSteps])

  const prevStep = useCallback(() => {
    setCurrentStep((s) => Math.max(s - 1, 0))
  }, [])

  const goToStep = useCallback((step: number) => {
    setCurrentStep(Math.max(0, Math.min(step, 5)))
  }, [])

  const reset = useCallback(() => {
    setCurrentStep(0)
    setPersonalInfoState(initialState.personalInfo)
    setServiceState(initialState.service)
    setLocationState(initialState.location)
    setDateTimeState(initialState.dateTime)
    setPaymentState(initialState.payment)
    setIsSubmitting(false)
  }, [])

  return (
    <BookingContext.Provider
      value={{
        currentStep,
        totalSteps,
        personalInfo,
        service,
        location,
        dateTime,
        payment,
        isSubmitting,
        setPersonalInfo: setPersonalInfoState,
        setService: setServiceState,
        setLocation: setLocationState,
        setDateTime: setDateTimeState,
        setPayment: setPaymentState,
        nextStep,
        prevStep,
        goToStep,
        setIsSubmitting,
        reset,
      }}
    >
      {children}
    </BookingContext.Provider>
  )
}

export function useBookingContext() {
  const ctx = useContext(BookingContext)
  if (!ctx) throw new Error("useBookingContext must be used within BookingProvider")
  return ctx
}
