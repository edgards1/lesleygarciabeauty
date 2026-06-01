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
import { FaWhatsapp, FaEnvelope } from "react-icons/fa";
import { CiMail, CiLocationOn } from "react-icons/ci";
import { FiPhoneCall } from "react-icons/fi";
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
    mode: "onBlur", // Valida cuando el usuario sale del campo
  });

  const onSubmit = async (data: ContactFormInput) => {
    setIsSubmitting(true);
    setSubmitStatus("idle");

    try {
      // Enviar email mediante API
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

      // Preparar datos para WhatsApp
      const whatsappData = {
        nombre: data.name,
        email: data.email,
        telefono: data.phone || "No proporcionado",
        servicio: data.service,
        mensaje: data.message,
      };

      // Formatear mensaje para WhatsApp
      const whatsappMessage = `
🌟 *NUEVA CONSULTA DE CLIENTE* 🌟

📋 *NOMBRE CLIENTE:* ${whatsappData.nombre}
📧 *EMAIL:* ${whatsappData.email}
📱 *TELÉFONO:* ${whatsappData.telefono}
💄 *SERVICIO INTERÉS:* ${whatsappData.servicio}

💬 *MENSAJE:*
${whatsappData.mensaje}

---
_Enviado desde el formulario web_
      `.trim();

      // Enviar a WhatsApp (abre WhatsApp con el mensaje pre-formateado)
      const whatsappNumber =
        process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "593983366831";
      const whatsappUrl = `https://api.whatsapp.com/send?phone=${whatsappNumber}&text=${encodeURIComponent(whatsappMessage)}`;

      // Abrir WhatsApp en una nueva pestaña
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
    <div className="grid lg:grid-cols-2 gap-12 max-w-7xl mx-auto">
      {/* Contact Form */}
      <FadeIn delay={0.3}>
        <div className="bg-stone-50 dark:bg-stone-800 rounded-3xl p-8 md:p-10 border border-stone-200 dark:border-stone-700">
          <div className="mb-8">
            <h3 className="text-2xl font-bold text-stone-900 dark:text-stone-100 mb-2">
              Envíame un mensaje
            </h3>
            <p className="text-stone-600 dark:text-stone-400">
              Completa el formulario y te responderé a la brevedad
            </p>
          </div>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm font-medium text-stone-900 dark:text-stone-100">
                      Nombre completo *
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Tu nombre completo"
                        {...field}
                        className="bg-white dark:bg-stone-900 border-stone-300 dark:border-stone-600 focus:border-stone-900 dark:focus:border-stone-100 h-12 rounded-xl"
                      />
                    </FormControl>
                    <FormMessage className="text-xs text-red-600 dark:text-red-400" />
                  </FormItem>
                )}
              />

              <div className="grid md:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-sm font-medium text-stone-900 dark:text-stone-100">
                        Email *
                      </FormLabel>
                      <FormControl>
                        <Input
                          type="email"
                          placeholder="tu@email.com"
                          {...field}
                          className="bg-white dark:bg-stone-900 border-stone-300 dark:border-stone-600 focus:border-stone-900 dark:focus:border-stone-100 h-12 rounded-xl"
                        />
                      </FormControl>
                      <FormMessage className="text-xs text-red-600 dark:text-red-400" />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="phone"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-sm font-medium text-stone-900 dark:text-stone-100">
                        Teléfono
                      </FormLabel>
                      <FormControl>
                        <Input
                          type="tel"
                          placeholder="+593 999 999 999"
                          {...field}
                          className="bg-white dark:bg-stone-900 border-stone-300 dark:border-stone-600 focus:border-stone-900 dark:focus:border-stone-100 h-12 rounded-xl"
                        />
                      </FormControl>
                      <FormMessage className="text-xs text-red-600 dark:text-red-400" />
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name="service"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm font-medium text-stone-900 dark:text-stone-100">
                      Servicio de interés *
                    </FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger className="bg-white dark:bg-stone-900 border-stone-300 dark:border-stone-600 focus:border-stone-900 dark:focus:border-stone-100 h-12 rounded-xl">
                          <SelectValue placeholder="Selecciona un servicio" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="Maquillaje de Novia">
                          Maquillaje de Novia
                        </SelectItem>
                        <SelectItem value="Eventos Especiales">
                          Eventos Especiales
                        </SelectItem>
                        <SelectItem value="Editorial y Moda">
                          Editorial y Moda
                        </SelectItem>
                        <SelectItem value="Clases de AutoMaquillaje">
                          Clases de Automaquillaje
                        </SelectItem>
                        <SelectItem value="Otro servicio">
                          Otro servicio
                        </SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage className="text-xs text-red-600 dark:text-red-400" />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="message"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm font-medium text-stone-900 dark:text-stone-100">
                      Mensaje *
                    </FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Cuéntame sobre tu evento o necesidades..."
                        rows={5}
                        {...field}
                        className="bg-white dark:bg-stone-900 border-stone-300 dark:border-stone-600 focus:border-stone-900 dark:focus:border-stone-100 rounded-xl resize-none"
                      />
                    </FormControl>
                    <FormMessage className="text-xs text-red-600 dark:text-red-400" />
                  </FormItem>
                )}
              />

              {submitStatus === "success" && (
                <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-xl p-4 text-green-800 dark:text-green-200 text-sm flex items-start gap-2">
                  <span className="text-lg">✓</span>
                  <span>
                    ¡Mensaje enviado con éxito! Se ha enviado el email y se
                    abrirá WhatsApp para completar el envío.
                  </span>
                </div>
              )}

              {submitStatus === "error" && (
                <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-xl p-4 text-red-800 dark:text-red-200 text-sm flex items-start gap-2">
                  <span className="text-lg">✗</span>
                  <span>
                    Hubo un error al enviar el mensaje. Por favor intenta
                    nuevamente o contáctanos directamente por WhatsApp.
                  </span>
                </div>
              )}

              <Button
                type="submit"
                disabled={isSubmitting || !form.formState.isValid}
                className="w-full bg-stone-900 hover:bg-stone-800 dark:bg-stone-100 dark:hover:bg-stone-200 text-white dark:text-stone-900 h-12 rounded-xl font-semibold transition-all duration-300 hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? (
                  <span className="flex items-center justify-center gap-2">
                    <div className="w-4 h-4 border-2 border-white dark:border-stone-900 border-t-transparent rounded-full animate-spin" />
                    Enviando...
                  </span>
                ) : (
                  <span className="flex items-center justify-center gap-2">
                    <FaEnvelope className="w-4 h-4" />
                    Enviar Mensaje
                  </span>
                )}
              </Button>
            </form>
          </Form>
        </div>
      </FadeIn>

      {/* Contact Methods */}
      <div className="space-y-5">
        {/* WhatsApp y Ubicación - Grid de 2 columnas */}
        <StaggerContainer className="grid md:grid-cols-2 gap-7">
          <Link
            href="https://api.whatsapp.com/send?phone=593983366831&text=Hola%2C%20%C2%BFque%20tal%3F.%0AQuisiera%20agendar%20una%20cita%20contigo%E2%99%A5%EF%B8%8F"
            target="_blank"
            rel="noopener noreferrer"
            className="block group"
          >
            <div className="bg-stone-50 dark:bg-stone-800 rounded-2xl p-8 hover:bg-white dark:hover:bg-stone-900 border border-transparent hover:border-stone-900 dark:hover:border-stone-100 transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl cursor-pointer h-full">
              <div className="flex flex-col items-center text-center space-y-4">
                <div className="relative">
                  <div className="w-20 h-20 bg-white dark:bg-stone-700 rounded-2xl flex items-center justify-center group-hover:bg-stone-900 dark:group-hover:bg-stone-100 transition-all duration-300 shadow-lg group-hover:shadow-2xl group-hover:rotate-6">
                    <FaWhatsapp className="w-9 h-9 text-green-500 group-hover:text-white dark:group-hover:text-stone-900 transition-colors duration-300" />
                  </div>
                  <div className="absolute -top-1 -right-1 w-4 h-4 bg-green-500 rounded-full animate-pulse" />
                </div>
                <div>
                  <h4 className="font-bold text-lg text-stone-900 dark:text-stone-100 mb-1">
                    WhatsApp
                  </h4>
                  <p className="text-stone-600 dark:text-stone-400 font-medium mb-1">
                    (+593) 983366831
                  </p>
                  <p className="text-xs text-stone-500 dark:text-stone-500 uppercase tracking-wide">
                    Lun - Sáb: 9:00 AM - 6:00 PM
                  </p>
                </div>
              </div>
            </div>
          </Link>

          <div className="group bg-stone-50 dark:bg-stone-800 rounded-2xl p-8 hover:bg-white dark:hover:bg-stone-900 border border-transparent hover:border-stone-900 dark:hover:border-stone-100 transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl">
            <div className="flex flex-col items-center text-center space-y-4">
              <div className="w-20 h-20 bg-white dark:bg-stone-700 rounded-2xl flex items-center justify-center group-hover:bg-stone-900 dark:group-hover:bg-stone-100 transition-all duration-300 shadow-lg group-hover:shadow-2xl group-hover:rotate-6">
                <CiLocationOn className="w-9 h-9 text-stone-600 dark:text-stone-400 group-hover:text-white dark:group-hover:text-stone-900 transition-colors duration-300" />
              </div>
              <div>
                <h4 className="font-bold text-lg text-stone-900 dark:text-stone-100 mb-1">
                  Ubicación
                </h4>
                <p className="text-stone-600 dark:text-stone-400 font-medium mb-1">
                  Guayaquil - Ecuador
                </p>
                <p className="text-xs text-stone-500 dark:text-stone-500 uppercase tracking-wide">
                  Servicio a domicilio disponible
                </p>
              </div>
            </div>
          </div>
        </StaggerContainer>

        {/* Email - Ancho completo independiente */}
        <Link
          href="mailto:lesleygarciabeauty@gmail.com"
          className="block group"
        >
          <div className="bg-stone-50 dark:bg-stone-800 rounded-2xl p-8 hover:bg-white dark:hover:bg-stone-900 border border-transparent hover:border-stone-900 dark:hover:border-stone-100 transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl cursor-pointer">
            <div className="flex flex-col items-center text-center space-y-4">
              <div className="w-20 h-20 bg-white dark:bg-stone-700 rounded-2xl flex items-center justify-center group-hover:bg-stone-900 dark:group-hover:bg-stone-100 transition-all duration-300 shadow-lg group-hover:shadow-2xl group-hover:rotate-6">
                <CiMail className="w-9 h-9 text-stone-600 dark:text-stone-400 group-hover:text-white dark:group-hover:text-stone-900 transition-colors duration-300" />
              </div>
              <div>
                <h4 className="font-bold text-lg text-stone-900 dark:text-stone-100 mb-1">
                  Email
                </h4>
                <p className="text-stone-600 dark:text-stone-400 font-medium mb-1 text-sm break-all">
                  lesleygarciabeauty@gmail.com
                </p>
                <p className="text-xs text-stone-500 dark:text-stone-500 uppercase tracking-wide">
                  Respuesta en 24 horas
                </p>
              </div>
            </div>
          </div>
        </Link>
      </div>
    </div>
  );
}
