"use client";

import { useState } from "react";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
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
import { FaWhatsapp, FaEnvelope, FaArrowRight } from "react-icons/fa";
import { CiMail, CiLocationOn } from "react-icons/ci";
import { FadeIn } from "@/components/animations/fade-in";
import { StaggerContainer } from "@/components/animations/stagger-container";
import { contactFormSchema } from "@/lib/validations/contact.validation";
import type { ContactFormInput } from "@/lib/validations/contact.validation";

export function ContactForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<
    "idle" | "success" | "error"
  >("idle");

  const form = useForm<ContactFormInput>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      service: "",
      message: "",
    },
    mode: "onBlur",
  });

  const onSubmit = async (data: ContactFormInput) => {
    setIsSubmitting(true);
    setSubmitStatus("idle");

    try {
      const emailResponse = await fetch("/api/send-email", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const result = await emailResponse.json();

      if (!emailResponse.ok) {
        throw new Error(result.error || "Error al enviar el email");
      }

      const whatsappData = {
        nombre: data.name,
        email: data.email,
        telefono: data.phone || "No proporcionado",
        servicio: data.service,
        mensaje: data.message,
      };

      const whatsappMessage = `
*NUEVA CONSULTA DE CLIENTE*

*NOMBRE CLIENTE:* ${whatsappData.nombre}
*EMAIL:* ${whatsappData.email}
*TELÉFONO:* ${whatsappData.telefono}
*SERVICIO INTERÉS:* ${whatsappData.servicio}

*MENSAJE:*
${whatsappData.mensaje}

---
_Enviado desde el formulario web_
      `.trim();

      const whatsappNumber =
        process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "593983366831";
      const whatsappUrl = `https://api.whatsapp.com/send?phone=${whatsappNumber}&text=${encodeURIComponent(whatsappMessage)}`;

      window.open(whatsappUrl, "_blank");

      setSubmitStatus("success");
      form.reset();
      setTimeout(() => setSubmitStatus("idle"), 5000);
    } catch (error) {
      console.error("Error al enviar el formulario:", error);
      setSubmitStatus("error");
      setTimeout(() => setSubmitStatus("idle"), 5000);
    } finally {
      setIsSubmitting(false);
    }
  };

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
                        Teléfono
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

              <FormField
                control={form.control}
                name="message"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-[11px] font-medium uppercase tracking-widest text-stone-500 dark:text-stone-400">
                      Cuéntame sobre tu evento
                    </FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Fecha del evento, tipo de look que buscas, inspiración..."
                        rows={4}
                        {...field}
                        className="bg-white dark:bg-stone-900/80 border-stone-200 dark:border-stone-700 focus:border-stone-900 dark:focus:border-stone-100 rounded-xl resize-none text-sm transition-all duration-300 focus:shadow-[0_0_0_3px_rgba(0,0,0,0.05)] dark:focus:shadow-[0_0_0_3px_rgba(255,255,255,0.05)]"
                      />
                    </FormControl>
                    <FormMessage className="text-xs text-red-500 dark:text-red-400 mt-1" />
                  </FormItem>
                )}
              />

              {submitStatus === "success" && (
                <div className="bg-stone-900 dark:bg-stone-100 text-white dark:text-stone-900 rounded-xl p-4 text-sm flex items-center gap-3">
                  <span className="text-lg">&#10003;</span>
                  <span>
                    Mensaje enviado. Se abrirá WhatsApp para completar el envío.
                  </span>
                </div>
              )}

              {submitStatus === "error" && (
                <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-xl p-4 text-red-700 dark:text-red-300 text-sm flex items-center gap-3">
                  <span className="text-lg">&#10007;</span>
                  <span>
                    Error al enviar. Intenta nuevamente o escríbeme por WhatsApp.
                  </span>
                </div>
              )}

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
