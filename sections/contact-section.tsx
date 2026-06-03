"use client";

import { useState } from "react";
import { motion, useReducedMotion } from "motion/react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { contactFormSchema } from "@/lib/validations/contact.validation";
import type { ContactFormInput } from "@/lib/validations/contact.validation";
import { siteConfig } from "@/constants/site";

function FadeUp({
  children,
  delay = 0,
  className,
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      initial={reduce ? false : { opacity: 0, y: 30 }}
      whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.9, delay, ease: [0.16, 1, 0.3, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export function ContactSection() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");

  const form = useForm<ContactFormInput>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: { name: "", email: "", phone: "", service: "", message: "" },
    mode: "onBlur",
  });

  const onSubmit = async (data: ContactFormInput) => {
    setIsSubmitting(true);
    setStatus("idle");
    try {
      const emailResponse = await fetch("/api/send-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!emailResponse.ok) throw new Error("send-failed");
      const whatsappMsg = `NUEVA CONSULTA\n\nNombre: ${data.name}\nEmail: ${data.email}\nTeléfono: ${data.phone || "—"}\nServicio: ${data.service}\n\nMensaje:\n${data.message}`;
      const whatsappNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "593983366831";
      window.open(
        `https://api.whatsapp.com/send?phone=${whatsappNumber}&text=${encodeURIComponent(whatsappMsg)}`,
        "_blank"
      );
      setStatus("success");
      form.reset();
      setTimeout(() => setStatus("idle"), 6000);
    } catch {
      setStatus("error");
      setTimeout(() => setStatus("idle"), 6000);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section
      id="contact"
      className="relative w-full overflow-hidden border-t border-black/10 bg-white py-20 sm:py-28 lg:py-36"
    >
      <div className="mx-auto max-w-[1400px] px-5 sm:px-8 lg:px-12">
        {/* Centered hero CTA */}
        <FadeUp>
          <div className="mx-auto max-w-3xl text-center">
            <div className="mb-8 inline-flex items-center gap-4">
              <span className="h-px w-10 bg-[#0a0a0a]" />
              <span className="text-[10px] font-medium uppercase tracking-[0.3em] text-[#0a0a0a]">
                07 — Contacto
              </span>
              <span className="h-px w-10 bg-[#0a0a0a]" />
            </div>

            <h2 className="font-serif text-5xl font-light leading-[1] tracking-[-0.035em] text-[#0a0a0a] sm:text-7xl lg:text-[5.5rem]">
              Reservemos
              <br />
              <span className="italic">tu fecha</span>
              <span className="font-script ml-3 text-[0.6em] not-italic font-normal text-[#0a0a0a]/65">
                hoy
              </span>
            </h2>

            <p className="mx-auto mt-8 max-w-xl text-balance text-[15px] leading-relaxed text-[#0a0a0a]/70 sm:text-base">
              Cuéntame sobre tu evento, sesión o campaña. Te respondo en menos
              de 24 horas con una propuesta clara, sin compromiso.
            </p>

            <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row sm:gap-4">
              <a
                href={siteConfig.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex h-14 w-full items-center justify-center bg-[#0a0a0a] px-8 text-[11px] font-medium uppercase tracking-[0.25em] text-white transition-colors duration-300 hover:bg-white hover:ring-1 hover:ring-[#0a0a0a] hover:text-[#0a0a0a] sm:w-auto"
              >
                Escríbeme por WhatsApp
                <span className="ml-3 inline-block h-px w-6 bg-current transition-all duration-300 group-hover:w-9" />
              </a>
              <a
                href={`mailto:${siteConfig.email}`}
                className="group inline-flex h-14 w-full items-center justify-center px-2 text-[11px] font-medium uppercase tracking-[0.25em] text-[#0a0a0a] transition-opacity hover:opacity-60 sm:w-auto"
              >
                {siteConfig.email}
                <span className="ml-3 inline-block h-px w-6 bg-current transition-all duration-300 group-hover:w-9" />
              </a>
            </div>
          </div>
        </FadeUp>

        {/* Form + meta split */}
        <div className="mt-20 grid grid-cols-1 gap-12 border-t border-black/10 pt-12 lg:mt-28 lg:grid-cols-12 lg:gap-16">
          <FadeUp delay={0.1} className="lg:col-span-5">
            <p className="text-[10px] font-medium uppercase tracking-[0.3em] text-[#0a0a0a]">
              O llena el formulario
            </p>
            <p className="mt-4 max-w-sm text-[15px] leading-relaxed text-[#0a0a0a]/70 sm:text-base">
              Para propuestas detalladas, novias o paquetes UGC. Te contesto
              personalmente.
            </p>

            <div className="mt-10 space-y-6">
              <div>
                <p className="text-[9px] font-medium uppercase tracking-[0.3em] text-[#0a0a0a]/55">
                  Estudio
                </p>
                <p className="mt-1 font-serif text-lg font-light text-[#0a0a0a]">
                  Guayaquil, Ecuador
                </p>
                <p className="text-sm text-[#0a0a0a]/65">
                  Servicio a domicilio disponible
                </p>
              </div>
              <div>
                <p className="text-[9px] font-medium uppercase tracking-[0.3em] text-[#0a0a0a]/55">
                  Horario
                </p>
                <p className="mt-1 font-serif text-lg font-light text-[#0a0a0a]">
                  Lun — Sáb · 9:00 — 18:00
                </p>
              </div>
              <div>
                <p className="text-[9px] font-medium uppercase tracking-[0.3em] text-[#0a0a0a]/55">
                  Teléfono
                </p>
                <p className="mt-1 font-serif text-lg font-light text-[#0a0a0a]">
                  (+593) 98 336 6831
                </p>
              </div>
            </div>
          </FadeUp>

          <FadeUp delay={0.2} className="lg:col-span-7">
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="space-y-6"
              noValidate
            >
              <input
                type="text"
                name="_company"
                tabIndex={-1}
                autoComplete="off"
                aria-hidden="true"
                className="absolute -left-[9999px] h-0 w-0 opacity-0"
                onChange={() => setStatus("error")}
              />

              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                <Field
                  label="Nombre *"
                  id="name"
                  placeholder="Tu nombre"
                  registration={form.register("name")}
                  error={form.formState.errors.name?.message}
                />
                <Field
                  label="Email *"
                  id="email"
                  type="email"
                  placeholder="tu@email.com"
                  registration={form.register("email")}
                  error={form.formState.errors.email?.message}
                />
              </div>

              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                <Field
                  label="Teléfono"
                  id="phone"
                  type="tel"
                  placeholder="+593 999 999 999"
                  registration={form.register("phone")}
                  error={form.formState.errors.phone?.message}
                />
                <SelectField
                  label="Servicio *"
                  id="service"
                  value={form.watch("service")}
                  onChange={(v) => form.setValue("service", v, { shouldValidate: true })}
                  error={form.formState.errors.service?.message}
                />
              </div>

              <TextareaField
                label="Mensaje *"
                id="message"
                placeholder="Cuéntame sobre tu evento, fecha o tipo de campaña..."
                rows={5}
                registration={form.register("message")}
                error={form.formState.errors.message?.message}
              />

              {status === "success" && (
                <div
                  role="status"
                  aria-live="polite"
                  className="border border-black/15 bg-stone-50 px-4 py-3 text-sm text-[#0a0a0a]"
                >
                  Mensaje enviado. Se abrirá WhatsApp para completar.
                </div>
              )}
              {status === "error" && (
                <div
                  role="alert"
                  aria-live="assertive"
                  className="border border-black/30 bg-stone-100 px-4 py-3 text-sm text-[#0a0a0a]"
                >
                  Algo falló. Intenta de nuevo o escríbeme directo por WhatsApp.
                </div>
              )}

              <div className="flex flex-col items-stretch gap-4 pt-2 sm:flex-row sm:items-center sm:justify-between">
                <p className="text-[10px] uppercase tracking-[0.25em] text-[#0a0a0a]/55">
                  Respuesta en menos de 24 horas
                </p>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="group inline-flex h-12 items-center justify-center bg-[#0a0a0a] px-7 text-[10px] font-medium uppercase tracking-[0.25em] text-white transition-colors duration-300 hover:bg-white hover:ring-1 hover:ring-[#0a0a0a] hover:text-[#0a0a0a] disabled:opacity-50"
                >
                  {isSubmitting ? "Enviando..." : "Enviar Mensaje"}
                  {!isSubmitting && (
                    <span className="ml-3 inline-block h-px w-5 bg-current transition-all duration-300 group-hover:w-8" />
                  )}
                </button>
              </div>
            </form>
          </FadeUp>
        </div>
      </div>
    </section>
  );
}

/* ---------- Field components ---------- */

interface FieldProps {
  label: string;
  id: string;
  type?: string;
  placeholder?: string;
  registration: ReturnType<ReturnType<typeof useForm<ContactFormInput>>["register"]>;
  error?: string;
}

function Field({ label, id, type = "text", placeholder, registration, error }: FieldProps) {
  return (
    <div>
      <label
        htmlFor={id}
        className="block text-[10px] font-medium uppercase tracking-[0.3em] text-[#0a0a0a]/65"
      >
        {label}
      </label>
      <input
        id={id}
        type={type}
        placeholder={placeholder}
        {...registration}
        className="mt-3 block w-full border-0 border-b border-black/20 bg-transparent py-2.5 text-base text-[#0a0a0a] placeholder:text-[#0a0a0a]/35 focus:border-[#0a0a0a] focus:outline-none focus:ring-0"
      />
      {error && <p className="mt-2 text-xs text-[#0a0a0a]">{error}</p>}
    </div>
  );
}

function TextareaField({
  label,
  id,
  placeholder,
  rows = 4,
  registration,
  error,
}: Omit<FieldProps, "type"> & { rows?: number }) {
  return (
    <div>
      <label
        htmlFor={id}
        className="block text-[10px] font-medium uppercase tracking-[0.3em] text-[#0a0a0a]/65"
      >
        {label}
      </label>
      <textarea
        id={id}
        rows={rows}
        placeholder={placeholder}
        {...registration}
        className="mt-3 block w-full resize-none border-0 border-b border-black/20 bg-transparent py-2.5 text-base text-[#0a0a0a] placeholder:text-[#0a0a0a]/35 focus:border-[#0a0a0a] focus:outline-none focus:ring-0"
      />
      {error && <p className="mt-2 text-xs text-[#0a0a0a]">{error}</p>}
    </div>
  );
}

function SelectField({
  label,
  id,
  value,
  onChange,
  error,
}: {
  label: string;
  id: string;
  value: string;
  onChange: (v: string) => void;
  error?: string;
}) {
  const options = [
    "Maquillaje de Novia",
    "Eventos Especiales",
    "Editorial y Moda",
    "Contenido UGC",
    "Otro",
  ];
  return (
    <div>
      <label
        htmlFor={id}
        className="block text-[10px] font-medium uppercase tracking-[0.3em] text-[#0a0a0a]/65"
      >
        {label}
      </label>
      <div className="relative mt-3">
        <select
          id={id}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="block w-full appearance-none border-0 border-b border-black/20 bg-transparent py-2.5 pr-8 text-base text-[#0a0a0a] focus:border-[#0a0a0a] focus:outline-none focus:ring-0"
        >
          <option value="">Selecciona un servicio</option>
          {options.map((o) => (
            <option key={o} value={o}>
              {o}
            </option>
          ))}
        </select>
        <svg
          aria-hidden
          className="pointer-events-none absolute right-1 top-1/2 -translate-y-1/2 text-[#0a0a0a]/55"
          width="14"
          height="14"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="m6 9 6 6 6-6" />
        </svg>
      </div>
      {error && <p className="mt-2 text-xs text-[#0a0a0a]">{error}</p>}
    </div>
  );
}
