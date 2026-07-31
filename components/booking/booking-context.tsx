"use client"

import { createContext, useContext, useState, useRef, useEffect, useCallback, type ReactNode } from "react"
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
  direction: number
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
  personalInfo: { name: "", email: "", phone: "", documentId: "" },
  service: null,
  location: null,
  dateTime: null,
  payment: null,
}

export function BookingProvider({ children }: { children: ReactNode }) {
  const [currentStep, setCurrentStep] = useState(0)
  const [direction, setDirection] = useState(1)
  const [personalInfo, setPersonalInfoState] = useState<PersonalInfo>(initialState.personalInfo)
  const [service, setServiceState] = useState<SelectedService | null>(initialState.service)
  const [location, setLocationState] = useState<ServiceLocation | null>(initialState.location)
  const [dateTime, setDateTimeState] = useState<DateTimeSelection | null>(initialState.dateTime)
  const [payment, setPaymentState] = useState<PaymentInfo | null>(initialState.payment)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const currentStepRef = useRef(currentStep)
  useEffect(() => {
    currentStepRef.current = currentStep
  }, [currentStep])

  const totalSteps = 6

  const nextStep = useCallback(() => {
    setDirection(1)
    setCurrentStep((s) => Math.min(s + 1, totalSteps - 1))
  }, [totalSteps])

  const prevStep = useCallback(() => {
    setDirection(-1)
    setCurrentStep((s) => Math.max(s - 1, 0))
  }, [])

  const goToStep = useCallback((step: number) => {
    const target = Math.max(0, Math.min(step, 5))
    setDirection(target >= currentStepRef.current ? 1 : -1)
    setCurrentStep(target)
  }, [])

  const reset = useCallback(() => {
    setDirection(-1)
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
        direction,
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
