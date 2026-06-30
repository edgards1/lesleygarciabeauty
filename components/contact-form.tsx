"use client";

import { useState } from "react";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { format } from "date-fns";
import { es } from "date-fns/locale";
import { FaWhatsapp, FaArrowRight, FaCalendarAlt } from "react-icons/fa";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { CiMail, CiLocationOn } from "react-icons/ci";
import { FadeIn } from "@/components/animations/fade-in";
import { StaggerContainer } from "@/components/animations/stagger-container";
import { contactFormSchema } from "@/lib/validations/contact.validation";
import type { ContactFormInput } from "@/lib/validations/contact.validation";
import { toast } from "@/components/ui/use-toast";
import { cn } from "@/lib/utils";

const MAX_MESSAGE_LENGTH = 1000;

const budgetOptions = [
  { value: "under-100", label: "Menos de $100" },
  { value: "100-200", label: "$100 - $200" },
  { value: "200-400", label: "$200 - $400" },
  { value: "400-600", label: "$400 - $600" },
  { value: "over-600", label: "Más de $600" },
];

export function ContactForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [calendarOpen, setCalendarOpen] = useState(false);

  const form = useForm<ContactFormInput>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      service: "",
      message: "",
      eventDate: undefined,
      budget: "",
      contactPreference: "both",
      honeypot: "",
    },
    mode: "onBlur",
  });

  const messageValue = form.watch("message") || "";

  const onSubmit = async (data: ContactFormInput) => {
    setIsSubmitting(true);

    try {
      const response = await fetch("/api/send-email", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (!response.ok) {
        if (response.status === 429) {
          throw new Error(
            "Has enviado demasiados mensajes. Espera unos minutos e intenta de nuevo."
          );
        }
        throw new Error(result.error || "Error al enviar el mensaje");
      }

      toast({
        title: "Mensaje enviado",
        description: "Te responderé en menos de 24 horas. ¡Gracias!",
      });

      if (data.contactPreference === "whatsapp" || data.contactPreference === "both") {
        const whatsappMessage = buildWhatsAppMessage(data);
        const whatsappNumber =
          process.env.WHATSAPP_NUMBER || "593983366831";
        const whatsappUrl = `https://api.whatsapp.com/send?phone=${whatsappNumber}&text=${encodeURIComponent(whatsappMessage)}`;
        window.open(whatsappUrl, "_blank");
      }

      form.reset();
    } catch (error) {
      console.error("Error al enviar el formulario:", error);
      toast({
        title: "Error al enviar",
        description:
          error instanceof Error
            ? error.message
            : "Intenta nuevamente o escríbeme por WhatsApp.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  function buildWhatsAppMessage(data: ContactFormInput): string {
    const lines = [
      "*NUEVA CONSULTA DE CLIENTE*",
      "",
      `*NOMBRE CLIENTE:* ${data.name}`,
      `*EMAIL:* ${data.email}`,
      `*TELÉFONO:* ${data.phone}`,
      `*SERVICIO INTERÉS:* ${data.service}`,
    ];

    if (data.eventDate) {
      lines.push(`*FECHA DEL EVENTO:* ${format(data.eventDate, "dd 'de' MMMM 'de' yyyy", { locale: es })}`);
    }

    if (data.budget) {
      const budgetLabel = budgetOptions.find((b) => b.value === data.budget)?.label || data.budget;
      lines.push(`*PRESUPUESTO:* ${budgetLabel}`);
    }

    lines.push("", `*MENSAJE:*`, data.message, "", "---", "_Enviado desde el formulario web_");

    return lines.join("\n");
  }

  return (
    <div className="grid lg:grid-cols-[1.1fr_0.9fr] gap-16 max-w-6xl mx-auto">
      {/* Contact Form */}
      <FadeIn delay={0.3}>
        <div className="bg-stone-50 dark:bg-stone-800/50 rounded-3xl p-8 md:p-10 border border-stone-200/60 dark:border-stone-700/60">
          <div className="mb-10">
            <h3 className="text-2xl font-serif text-stone-900 dark:text-stone-100 mb-3">
              Envíame un mensaje
            </h3>
            <p className="text-sm text-stone-500 dark:text-stone-400 leading-relaxed">
              Completa el formulario y te responderé en menos de 24 horas
            </p>
          </div>

          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="space-y-5"
            >
              {/* Honeypot - invisible to humans */}
              <div className="absolute -left-[9999px] opacity-0 h-0 w-0 overflow-hidden" aria-hidden="true">
                <FormField
                  control={form.control}
                  name="honeypot"
                  render={({ field }) => (
                    <Input
                      tabIndex={-1}
                      autoComplete="off"
                      {...field}
                    />
                  )}
                />
              </div>

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
                        className="bg-white dark:bg-stone-900/80 border-stone-200 dark:border-stone-700 focus:border-stone-900 dark:focus:border-stone-100 h-12 rounded-xl text-sm transition-all duration-300 focus:shadow-[0_0_0_3px_rgba(0,0,0,0.05)] dark:focus:shadow-[0_0_0_3px_rgba(255,255,255,0.05)]"
                      />
                    </FormControl>
                    <FormMessage className="text-xs text-red-500 dark:text-red-400 mt-1" />
                  </FormItem>
                )}
              />

              <div className="grid md:grid-cols-2 gap-4">
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
                          className="bg-white dark:bg-stone-900/80 border-stone-200 dark:border-stone-700 focus:border-stone-900 dark:focus:border-stone-100 h-12 rounded-xl text-sm transition-all duration-300 focus:shadow-[0_0_0_3px_rgba(0,0,0,0.05)] dark:focus:shadow-[0_0_0_3px_rgba(255,255,255,0.05)]"
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
                        Teléfono *
                      </FormLabel>
                      <FormControl>
                        <Input
                          type="tel"
                          placeholder="+593 999 999 999"
                          {...field}
                          className="bg-white dark:bg-stone-900/80 border-stone-200 dark:border-stone-700 focus:border-stone-900 dark:focus:border-stone-100 h-12 rounded-xl text-sm transition-all duration-300 focus:shadow-[0_0_0_3px_rgba(0,0,0,0.05)] dark:focus:shadow-[0_0_0_3px_rgba(255,255,255,0.05)]"
                        />
                      </FormControl>
                      <FormMessage className="text-xs text-red-500 dark:text-red-400 mt-1" />
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name="service"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-[11px] font-medium uppercase tracking-widest text-stone-500 dark:text-stone-400">
                      Servicio de interés
                    </FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger className="bg-white dark:bg-stone-900/80 border-stone-200 dark:border-stone-700 focus:border-stone-900 dark:focus:border-stone-100 h-12 rounded-xl text-sm transition-all duration-300 focus:shadow-[0_0_0_3px_rgba(0,0,0,0.05)] dark:focus:shadow-[0_0_0_3px_rgba(255,255,255,0.05)]">
                          <SelectValue placeholder="Selecciona un servicio" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent className="rounded-xl border-stone-200 dark:border-stone-700">
                        <SelectItem value="Maquillaje de Novia" className="text-sm">
                          Maquillaje de Novia
                        </SelectItem>
                        <SelectItem value="Eventos Especiales" className="text-sm">
                          Eventos Especiales
                        </SelectItem>
                        <SelectItem value="Editorial y Moda" className="text-sm">
                          Editorial y Moda
                        </SelectItem>
                        <SelectItem value="Clases de AutoMaquillaje" className="text-sm">
                          Clases de Automaquillaje
                        </SelectItem>
                        <SelectItem value="UGC Creator" className="text-sm">
                          UGC Creator
                        </SelectItem>
                        <SelectItem value="Otro servicio" className="text-sm">
                          Otro servicio
                        </SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage className="text-xs text-red-500 dark:text-red-400 mt-1" />
                  </FormItem>
                )}
              />

              <div className="grid md:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="eventDate"
                  render={({ field }) => (
                    <FormItem className="flex flex-col">
                      <FormLabel className="text-[11px] font-medium uppercase tracking-widest text-stone-500 dark:text-stone-400">
                        Fecha del evento
                      </FormLabel>
                      <Popover open={calendarOpen} onOpenChange={setCalendarOpen}>
                        <PopoverTrigger asChild>
                          <FormControl>
                            <Button
                              variant="outline"
                              className={cn(
                                "w-full h-12 rounded-xl text-sm font-normal justify-start text-left bg-white dark:bg-stone-900/80 border-stone-200 dark:border-stone-700 focus:border-stone-900 dark:focus:border-stone-100 transition-all duration-300",
                                !field.value && "text-stone-400 dark:text-stone-500"
                              )}
                            >
                              <FaCalendarAlt className="mr-2 h-4 w-4 shrink-0" />
                              {field.value
                                ? format(field.value, "dd 'de' MMMM 'de' yyyy", {
                                    locale: es,
                                  })
                                : "Selecciona una fecha"}
                            </Button>
                          </FormControl>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                          <Calendar
                            mode="single"
                            selected={field.value}
                            onSelect={(date) => {
                              field.onChange(date);
                              setCalendarOpen(false);
                            }}
                            disabled={(date) =>
                              date < new Date(new Date().setHours(0, 0, 0, 0))
                            }
                            initialFocus
                          />
                        </PopoverContent>
                      </Popover>
                      <FormMessage className="text-xs text-red-500 dark:text-red-400 mt-1" />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="budget"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-[11px] font-medium uppercase tracking-widest text-stone-500 dark:text-stone-400">
                        Presupuesto estimado
                      </FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger className="bg-white dark:bg-stone-900/80 border-stone-200 dark:border-stone-700 focus:border-stone-900 dark:focus:border-stone-100 h-12 rounded-xl text-sm transition-all duration-300 focus:shadow-[0_0_0_3px_rgba(0,0,0,0.05)] dark:focus:shadow-[0_0_0_3px_rgba(255,255,255,0.05)]">
                            <SelectValue placeholder="Selecciona un rango" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent className="rounded-xl border-stone-200 dark:border-stone-700">
                          {budgetOptions.map((option) => (
                            <SelectItem
                              key={option.value}
                              value={option.value}
                              className="text-sm"
                            >
                              {option.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage className="text-xs text-red-500 dark:text-red-400 mt-1" />
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name="contactPreference"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-[11px] font-medium uppercase tracking-widest text-stone-500 dark:text-stone-400">
                      ¿Cómo prefieres que te contacte?
                    </FormLabel>
                    <FormControl>
                      <div className="flex gap-3">
                        {[
                          { value: "email", label: "Email", icon: CiMail },
                          { value: "whatsapp", label: "WhatsApp", icon: FaWhatsapp },
                          { value: "both", label: "Ambos", icon: FaArrowRight },
                        ].map((option) => (
                          <button
                            key={option.value}
                            type="button"
                            onClick={() => field.onChange(option.value)}
                            className={cn(
                              "flex-1 flex items-center justify-center gap-2 h-12 rounded-xl text-sm font-medium border transition-all duration-300",
                              field.value === option.value
                                ? "bg-stone-900 dark:bg-stone-100 text-white dark:text-stone-900 border-stone-900 dark:border-stone-100"
                                : "bg-white dark:bg-stone-900/80 text-stone-600 dark:text-stone-400 border-stone-200 dark:border-stone-700 hover:border-stone-400 dark:hover:border-stone-500"
                            )}
                          >
                            <option.icon className="w-4 h-4" />
                            {option.label}
                          </button>
                        ))}
                      </div>
                    </FormControl>
                    <FormMessage className="text-xs text-red-500 dark:text-red-400 mt-1" />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="message"
                render={({ field }) => (
                  <FormItem>
                    <div className="flex items-center justify-between">
                      <FormLabel className="text-[11px] font-medium uppercase tracking-widest text-stone-500 dark:text-stone-400">
                        Cuéntame sobre tu evento
                      </FormLabel>
                      <span
                        className={cn(
                          "text-[10px] tabular-nums",
                          messageValue.length > MAX_MESSAGE_LENGTH * 0.9
                            ? "text-red-500 dark:text-red-400"
                            : "text-stone-400 dark:text-stone-500"
                        )}
                      >
                        {messageValue.length}/{MAX_MESSAGE_LENGTH}
                      </span>
                    </div>
                    <FormControl>
                      <Textarea
                        placeholder="Fecha del evento, tipo de look que buscas, inspiración..."
                        rows={4}
                        maxLength={MAX_MESSAGE_LENGTH}
                        {...field}
                        className="bg-white dark:bg-stone-900/80 border-stone-200 dark:border-stone-700 focus:border-stone-900 dark:focus:border-stone-100 rounded-xl resize-none text-sm transition-all duration-300 focus:shadow-[0_0_0_3px_rgba(0,0,0,0.05)] dark:focus:shadow-[0_0_0_3px_rgba(255,255,255,0.05)]"
                      />
                    </FormControl>
                    <FormMessage className="text-xs text-red-500 dark:text-red-400 mt-1" />
                  </FormItem>
                )}
              />

              <Button
                type="submit"
                disabled={isSubmitting || !form.formState.isValid}
                className="w-full bg-stone-900 hover:bg-stone-800 dark:bg-stone-100 dark:hover:bg-stone-200 text-white dark:text-stone-900 h-12 rounded-xl font-medium text-sm transition-all duration-300 hover:shadow-lg disabled:opacity-40 disabled:cursor-not-allowed group mt-2"
              >
                {isSubmitting ? (
                  <span className="flex items-center justify-center gap-2">
                    <div className="w-4 h-4 border-2 border-white dark:border-stone-900 border-t-transparent rounded-full animate-spin" />
                    Enviando...
                  </span>
                ) : (
                  <span className="flex items-center justify-center gap-2">
                    Enviar Mensaje
                    <FaArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform duration-300" />
                  </span>
                )}
              </Button>
            </form>
          </Form>
        </div>
      </FadeIn>

      {/* Contact Methods */}
      <div className="space-y-5">
        <StaggerContainer className="space-y-4">
          {/* WhatsApp */}
          <Link
            href="https://api.whatsapp.com/send?phone=593983366831&text=Hola%2C%20%C2%BFque%20tal%3F.%0AQuisiera%20agendar%20una%20cita%20contigo%E2%99%A5%EF%B8%8F"
            target="_blank"
            rel="noopener noreferrer"
            className="block group"
          >
            <div className="bg-stone-50 dark:bg-stone-800/50 rounded-2xl p-7 hover:bg-white dark:hover:bg-stone-800 border border-transparent hover:border-stone-200 dark:hover:border-stone-700 transition-all duration-500 hover:-translate-y-1 hover:shadow-xl cursor-pointer">
              <div className="flex items-start gap-5">
                <div className="w-14 h-14 bg-stone-900 dark:bg-stone-100 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:scale-105 transition-transform duration-300">
                  <FaWhatsapp className="w-6 h-6 text-white dark:text-stone-900" />
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="font-semibold text-stone-900 dark:text-stone-100 mb-1 text-sm">
                    WhatsApp
                  </h4>
                  <p className="text-stone-600 dark:text-stone-400 text-sm mb-2">
                    (+593) 983366831
                  </p>
                  <div className="flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                    <span className="text-[10px] text-stone-500 dark:text-stone-500 uppercase tracking-wider">
                      Lun - Sáb: 9:00 AM - 6:00 PM
                    </span>
                  </div>
                </div>
                <FaArrowRight className="w-4 h-4 text-stone-300 dark:text-stone-600 group-hover:text-stone-900 dark:group-hover:text-stone-100 group-hover:translate-x-1 transition-all duration-300 mt-1 flex-shrink-0" />
              </div>
            </div>
          </Link>

          {/* Email */}
          <Link
            href="mailto:lesleygarciabeauty@gmail.com"
            className="block group"
          >
            <div className="bg-stone-50 dark:bg-stone-800/50 rounded-2xl p-7 hover:bg-white dark:hover:bg-stone-800 border border-transparent hover:border-stone-200 dark:hover:border-stone-700 transition-all duration-500 hover:-translate-y-1 hover:shadow-xl cursor-pointer">
              <div className="flex items-start gap-5">
                <div className="w-14 h-14 bg-stone-900 dark:bg-stone-100 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:scale-105 transition-transform duration-300">
                  <CiMail className="w-6 h-6 text-white dark:text-stone-900" />
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="font-semibold text-stone-900 dark:text-stone-100 mb-1 text-sm">
                    Email
                  </h4>
                  <p className="text-stone-600 dark:text-stone-400 text-sm mb-2 truncate">
                    lesleygarciabeauty@gmail.com
                  </p>
                  <span className="text-[10px] text-stone-500 dark:text-stone-500 uppercase tracking-wider">
                    Respuesta en 24 horas
                  </span>
                </div>
                <FaArrowRight className="w-4 h-4 text-stone-300 dark:text-stone-600 group-hover:text-stone-900 dark:group-hover:text-stone-100 group-hover:translate-x-1 transition-all duration-300 mt-1 flex-shrink-0" />
              </div>
            </div>
          </Link>

          {/* Ubicación */}
          <div className="bg-stone-50 dark:bg-stone-800/50 rounded-2xl p-7">
            <div className="flex items-start gap-5">
              <div className="w-14 h-14 bg-stone-900 dark:bg-stone-100 rounded-xl flex items-center justify-center flex-shrink-0">
                <CiLocationOn className="w-6 h-6 text-white dark:text-stone-900" />
              </div>
              <div className="flex-1 min-w-0">
                <h4 className="font-semibold text-stone-900 dark:text-stone-100 mb-1 text-sm">
                  Ubicación
                </h4>
                <p className="text-stone-600 dark:text-stone-400 text-sm mb-2">
                  Guayaquil, Ecuador
                </p>
                <span className="text-[10px] text-stone-500 dark:text-stone-500 uppercase tracking-wider">
                  Servicio a domicilio disponible
                </span>
              </div>
            </div>
          </div>
        </StaggerContainer>

        {/* Disponibility note */}
        <FadeIn delay={0.5}>
          <div className="bg-stone-900 dark:bg-stone-100 text-white dark:text-stone-900 rounded-2xl p-7 text-center">
            <p className="text-[10px] uppercase tracking-[0.25em] text-white/50 dark:text-stone-500 mb-3 font-medium">
              Disponibilidad
            </p>
            <p className="text-sm font-medium leading-relaxed">
              Temporada de bodas 2026 — Agenda con anticipación
            </p>
          </div>
        </FadeIn>
      </div>
    </div>
  );
}
