"use client";

import { useState } from "react";
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
import { contactFormSchema } from "@/lib/validations/contact.validation";
import type { ContactFormInput } from "@/lib/validations/contact.validation";
import { toast } from "@/components/ui/use-toast";
import { cn } from "@/lib/utils";

const MAX_MESSAGE_LENGTH = 1000;

const serviceOptions = [
  { value: "Campana UGC", label: "Campaña UGC" },
  { value: "Corporativo Produccion", label: "Maquillaje Corporativo" },
  { value: "Editorial Moda", label: "Editorial y Moda" },
  { value: "Evento Social", label: "Maquillaje Social / Eventos" },
  { value: "Clases Automaquillaje", label: "Clases de Automaquillaje" },
  { value: "Otro", label: "Otro" },
];

const timelineOptions = [
  { value: "this-week", label: "Esta semana" },
  { value: "this-month", label: "Este mes" },
  { value: "next-month", label: "Próximo mes" },
  { value: "2-3-months", label: "En 2-3 meses" },
  { value: "no-date", label: "Sin fecha definida" },
];

export function ContactForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<ContactFormInput>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      company: "",
      service: "",
      timeline: "",
      message: "",
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
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (!response.ok) {
        if (response.status === 429) {
          throw new Error("Has enviado demasiados mensajes. Espera unos minutos e intenta de nuevo.");
        }
        throw new Error(result.error || "Error al enviar el mensaje");
      }

      toast({
        title: "Solicitud enviada",
        description: "Te responderé en menos de 24 horas con una propuesta personalizada.",
      });

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

  return (
    <div className="bg-white/[0.03] border border-white/10 p-8 md:p-10 lg:p-12">
      {/* Honeypot */}
      <div
        className="absolute -left-[9999px] opacity-0 h-0 w-0 overflow-hidden"
        aria-hidden="true"
      >
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <FormField
              control={form.control}
              name="honeypot"
              render={({ field }) => (
                <Input tabIndex={-1} autoComplete="off" {...field} />
              )}
            />
          </form>
        </Form>
      </div>

      {/* Form header */}
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <div className="space-y-4">
            <div className="grid md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-[11px] font-medium uppercase tracking-widest text-white/40">
                      Nombre completo *
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Tu nombre"
                        {...field}
                        className="bg-transparent border-0 border-b border-white/15 focus:border-white/50 h-11 rounded-none px-0 text-sm text-white placeholder:text-white/25 transition-colors duration-300 focus-visible:ring-0 focus-visible:ring-offset-0"
                      />
                    </FormControl>
                    <FormMessage className="text-xs text-red-400 mt-1" />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="company"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-[11px] font-medium uppercase tracking-widest text-white/40">
                      Empresa / Marca
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Opcional"
                        {...field}
                        className="bg-transparent border-0 border-b border-white/15 focus:border-white/50 h-11 rounded-none px-0 text-sm text-white placeholder:text-white/25 transition-colors duration-300 focus-visible:ring-0 focus-visible:ring-offset-0"
                      />
                    </FormControl>
                    <FormMessage className="text-xs text-red-400 mt-1" />
                  </FormItem>
                )}
              />
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-[11px] font-medium uppercase tracking-widest text-white/40">
                      Email *
                    </FormLabel>
                    <FormControl>
                      <Input
                        type="email"
                        placeholder="tu@email.com"
                        {...field}
                        className="bg-transparent border-0 border-b border-white/15 focus:border-white/50 h-11 rounded-none px-0 text-sm text-white placeholder:text-white/25 transition-colors duration-300 focus-visible:ring-0 focus-visible:ring-offset-0"
                      />
                    </FormControl>
                    <FormMessage className="text-xs text-red-400 mt-1" />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="phone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-[11px] font-medium uppercase tracking-widest text-white/40">
                      Telefono *
                    </FormLabel>
                    <FormControl>
                      <Input
                        type="tel"
                        placeholder="+593 999 999 999"
                        {...field}
                        className="bg-transparent border-0 border-b border-white/15 focus:border-white/50 h-11 rounded-none px-0 text-sm text-white placeholder:text-white/25 transition-colors duration-300 focus-visible:ring-0 focus-visible:ring-offset-0"
                      />
                    </FormControl>
                    <FormMessage className="text-xs text-red-400 mt-1" />
                  </FormItem>
                )}
              />
            </div>
          </div>

          {/* El proyecto */}
          <div className="pt-4">
            <div className="space-y-4">
              <FormField
                control={form.control}
                name="service"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-[11px] font-medium uppercase tracking-widest text-white/40">
                      Tipo de proyecto *
                    </FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger className="bg-transparent border-0 border-b border-white/15 focus:border-white/50 h-11 rounded-none px-0 text-sm text-white transition-colors duration-300 focus-visible:ring-0 focus-visible:ring-offset-0">
                          <SelectValue placeholder="Selecciona el tipo de proyecto" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent className="rounded-none border-white/15 bg-[#0a0a0a] text-white">
                        {serviceOptions.map((option) => (
                          <SelectItem
                            key={option.value}
                            value={option.value}
                            className="text-sm focus:bg-white/10 focus:text-white"
                          >
                            {option.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage className="text-xs text-red-400 mt-1" />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="timeline"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-[11px] font-medium uppercase tracking-widest text-white/40">
                      Plazo estimado
                    </FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger className="bg-transparent border-0 border-b border-white/15 focus:border-white/50 h-11 rounded-none px-0 text-sm text-white transition-colors duration-300 focus-visible:ring-0 focus-visible:ring-offset-0">
                          <SelectValue placeholder="Cuando necesitas el proyecto?" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent className="rounded-none border-white/15 bg-[#0a0a0a] text-white">
                        {timelineOptions.map((option) => (
                          <SelectItem
                            key={option.value}
                            value={option.value}
                            className="text-sm focus:bg-white/10 focus:text-white"
                          >
                            {option.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage className="text-xs text-red-400 mt-1" />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="message"
                render={({ field }) => (
                  <FormItem>
                    <div className="flex items-center justify-between">
                      <FormLabel className="text-[11px] font-medium uppercase tracking-widest text-white/40">
                        Detalles del proyecto *
                      </FormLabel>
                      <span
                        className={cn(
                          "text-[10px] tabular-nums",
                          messageValue.length > MAX_MESSAGE_LENGTH * 0.9
                            ? "text-red-400"
                            : "text-white/30",
                        )}
                      >
                        {messageValue.length}/{MAX_MESSAGE_LENGTH}
                      </span>
                    </div>
                    <FormControl>
                      <Textarea
                        placeholder="Describe tu proyecto: alcance, requisitos, cantidad de talento, locacion, etc."
                        rows={4}
                        maxLength={MAX_MESSAGE_LENGTH}
                        {...field}
                        className="bg-transparent border-0 border-b border-white/15 focus:border-white/50 rounded-none resize-none text-sm text-white placeholder:text-white/25 transition-colors duration-300 px-0 focus-visible:ring-0 focus-visible:ring-offset-0"
                      />
                    </FormControl>
                    <FormMessage className="text-xs text-red-400 mt-1" />
                  </FormItem>
                )}
              />
            </div>
          </div>

          {/* Submit */}
          <div className="pt-4">
            <Button
              type="submit"
              disabled={isSubmitting || !form.formState.isValid}
              className="w-full bg-white hover:bg-white/90 text-[#0a0a0a] h-12 rounded-none font-medium text-[11px] tracking-[0.2em] uppercase transition-all duration-300 disabled:opacity-40 disabled:cursor-not-allowed group"
            >
              {isSubmitting ? (
                <span className="flex items-center justify-center gap-2">
                  <div className="w-4 h-4 border-2 border-[#0a0a0a] border-t-transparent rounded-full animate-spin" />
                  Enviando...
                </span>
              ) : (
                <span className="flex items-center justify-center gap-3">
                  Recibir Propuesta
                  <span className="h-px w-5 bg-[#0a0a0a] transition-all duration-300 group-hover:w-8" />
                </span>
              )}
            </Button>
          </div>
        </form>
      </Form>

      {/* Mobile contact info */}
      <div className="lg:hidden mt-10 space-y-0 divide-y divide-white/10 border-t border-white/10 pt-8">
        <div className="py-4 first:pt-0">
          <p className="text-[9px] uppercase tracking-[0.3em] text-white/30 font-medium mb-1">
            WhatsApp
          </p>
          <p className="text-white/70 text-sm">(+593) 983366831</p>
        </div>
        <div className="py-4">
          <p className="text-[9px] uppercase tracking-[0.3em] text-white/30 font-medium mb-1">
            Email
          </p>
          <p className="text-white/70 text-sm break-all">
            lesleygarciabeauty@gmail.com
          </p>
        </div>
        <div className="py-4">
          <p className="text-[9px] uppercase tracking-[0.3em] text-white/30 font-medium mb-1">
            Ubicacion
          </p>
          <p className="text-white/70 text-sm">Guayaquil, Ecuador</p>
        </div>
      </div>
    </div>
  );
}