"use client"

import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Input } from "@/components/ui/input"
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
import { FaArrowRight } from "react-icons/fa"

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

  return (
    <div className="max-w-lg mx-auto">
      <div className="text-center mb-10">
        <h2 className="text-3xl font-serif text-stone-900 dark:text-stone-100 mb-3">
          Tus datos
        </h2>
        <p className="text-sm text-stone-500 dark:text-stone-400">
          Para empezar, cuéntanos quién eres
        </p>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-[11px] font-medium uppercase tracking-widest text-stone-500 dark:text-stone-400">
                  Nombre completo
                </FormLabel>
                <FormControl>
                  <Input
                    placeholder="Tu nombre completo"
                    {...field}
                    className="bg-white dark:bg-stone-900/80 border-stone-200 dark:border-stone-700 focus:border-stone-900 dark:focus:border-stone-100 h-12 rounded-xl text-sm transition-all duration-300"
                  />
                </FormControl>
                <FormMessage className="text-xs text-red-500 dark:text-red-400 mt-1" />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-[11px] font-medium uppercase tracking-widest text-stone-500 dark:text-stone-400">
                  Email
                </FormLabel>
                <FormControl>
                  <Input
                    type="email"
                    placeholder="tu@email.com"
                    {...field}
                    className="bg-white dark:bg-stone-900/80 border-stone-200 dark:border-stone-700 focus:border-stone-900 dark:focus:border-stone-100 h-12 rounded-xl text-sm transition-all duration-300"
                  />
                </FormControl>
                <FormMessage className="text-xs text-red-500 dark:text-red-400 mt-1" />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="phone"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-[11px] font-medium uppercase tracking-widest text-stone-500 dark:text-stone-400">
                  Teléfono
                </FormLabel>
                <FormControl>
                  <Input
                    type="tel"
                    placeholder="+593 999 999 999"
                    {...field}
                    className="bg-white dark:bg-stone-900/80 border-stone-200 dark:border-stone-700 focus:border-stone-900 dark:focus:border-stone-100 h-12 rounded-xl text-sm transition-all duration-300"
                  />
                </FormControl>
                <FormMessage className="text-xs text-red-500 dark:text-red-400 mt-1" />
              </FormItem>
            )}
          />

          <Button
            type="submit"
            className="w-full bg-stone-900 hover:bg-stone-800 dark:bg-stone-100 dark:hover:bg-stone-200 text-white dark:text-stone-900 h-12 rounded-xl font-medium text-sm transition-all duration-300 hover:shadow-lg mt-4 group"
          >
            <span className="flex items-center justify-center gap-2">
              Continuar
              <FaArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform duration-300" />
            </span>
          </Button>
        </form>
      </Form>
    </div>
  )
}
