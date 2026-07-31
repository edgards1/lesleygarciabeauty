"use client"

import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { personalInfoSchema, type PersonalInfoInput } from "@/lib/validations/booking.validation"
import { useBookingContext } from "@/components/booking/booking-context"
import { StepHeader } from "@/components/booking/step-header"
import { FaArrowRight } from "react-icons/fa"
import { toast } from "sonner"

const inputClass =
  "h-12 w-full rounded-full border border-stone-300 bg-white px-5 font-sans text-sm text-stone-900 transition-all placeholder:text-stone-400/60 hover:border-stone-400 focus:border-stone-500 focus:outline-none focus:ring-2 focus:ring-stone-500/10"

const labelClass =
  "font-sans text-[10px] font-bold uppercase tracking-[0.15em] text-stone-500"

export function StepPersonalInfo() {
  const { personalInfo, setPersonalInfo, nextStep } = useBookingContext()

  const form = useForm<PersonalInfoInput>({
    resolver: zodResolver(personalInfoSchema),
    defaultValues: personalInfo,
    mode: "onBlur",
  })

  function onSubmit(data: PersonalInfoInput) {
    setPersonalInfo(data)
    nextStep()
  }

  function onInvalid() {
    const result = personalInfoSchema.safeParse(form.getValues())
    const first = result.success ? null : result.error.issues[0]
    toast.error(first?.message ?? "Revisa los campos del formulario")
  }

  return (
    <div>
      <StepHeader
        index={0}
        eyebrow="Tus datos"
        title={
          <>
            ¿Quién <span className="font-normal italic text-stone-500">eres</span>?
          </>
        }
        description="Para empezar, cuéntanos quién eres. Solo usaremos tus datos para confirmar tu cita y contactarte."
      />

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit, onInvalid)} className="space-y-4">
          <FormField
            control={form.control}
            name="documentId"
            render={({ field }) => (
              <FormItem>
                <FormLabel className={labelClass}>Cédula / RUC</FormLabel>
                <FormControl>
                  <input placeholder="0999201411" {...field} className={inputClass} />
                </FormControl>
                <FormMessage className="mt-1 font-sans text-xs text-stone-500" />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel className={labelClass}>Nombre completo / Razón social *</FormLabel>
                <FormControl>
                  <input placeholder="Tu nombre completo" {...field} className={inputClass} />
                </FormControl>
                <FormMessage className="mt-1 font-sans text-xs text-stone-500" />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel className={labelClass}>Email</FormLabel>
                <FormControl>
                  <input
                    type="email"
                    placeholder="tu@email.com"
                    {...field}
                    className={inputClass}
                  />
                </FormControl>
                <FormMessage className="mt-1 font-sans text-xs text-stone-500" />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="phone"
            render={({ field }) => (
              <FormItem>
                <FormLabel className={labelClass}>WhatsApp / Teléfono celular</FormLabel>
                <FormControl>
                  <input
                    type="tel"
                    placeholder="+593 999 999 999"
                    {...field}
                    className={inputClass}
                  />
                </FormControl>
                <FormMessage className="mt-1 font-sans text-xs text-stone-500" />
              </FormItem>
            )}
          />

          <Button
            type="submit"
            className="group mt-4 flex h-12 w-full items-center justify-center rounded-full bg-stone-900 font-sans text-sm font-semibold text-white transition-all duration-500 hover:bg-stone-700 active:scale-[0.98]"
          >
            <span className="flex items-center justify-center gap-2">
              Continuar
              <span className="flex h-6 w-6 items-center justify-center rounded-full bg-white/10 transition-transform duration-500 group-hover:translate-x-0.5">
                <FaArrowRight className="h-3 w-3" />
              </span>
            </span>
          </Button>

          <p className="pt-1 text-center font-sans text-[11px] leading-relaxed text-stone-500/40">
            Sin spam. Solo te escribimos sobre tu cita.
          </p>
        </form>
      </Form>
    </div>
  )
}
