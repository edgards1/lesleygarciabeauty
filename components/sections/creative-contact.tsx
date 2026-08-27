"use client";

import { FaWhatsapp } from "react-icons/fa";
import { ContactForm } from "@/components/contact-form";

export function CreativeContact() {
  return (
    <section id="contact" className="theme-light relative px-6 py-28 sm:px-10 sm:py-36 lg:px-16 border-b border-black/10">
      <div className="mx-auto max-w-[1700px]">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-start">
          {/* Left Column: Eyebrow, Giant Header & Guarantees */}
          <div className="lg:col-span-5 space-y-10">
            <div className="space-y-4">
              <div className="inline-flex items-center gap-2.5 font-label text-[10px] uppercase tracking-[0.3em] text-graphite">
                <span className="h-1.5 w-1.5 rounded-full bg-black" />
                <span>Ponte en contacto</span>
              </div>
              <h2 className="font-display text-[clamp(2.4rem,5vw,4.8rem)] font-light leading-[1.0] tracking-[-0.035em] text-[#0d0f12]">
                Escríbenos.
              </h2>
              <p className="text-base leading-[1.75] font-body text-graphite pt-2">
                Si buscas agendar una fecha nupcial, coordinar una sesión social o planificar
                una producción de contenido UGC para tu marca cosmética, nos encantará conocer tu visión.
              </p>
            </div>

            {/* Quick Trust Meta */}
            <div className="space-y-0 divide-y divide-black/10 border-y border-black/10 py-1 font-label text-xs uppercase tracking-wider">
              <div className="flex items-center justify-between py-3.5">
                <span className="text-graphite">Tiempo de respuesta</span>
                <span className="text-black font-medium">Menos de 24 horas</span>
              </div>
              <div className="flex items-center justify-between py-3.5">
                <span className="text-graphite">Presupuesto</span>
                <span className="text-black font-medium">Personalizado y sin compromiso</span>
              </div>
              <div className="flex items-center justify-between py-3.5">
                <span className="text-graphite">Ubicación</span>
                <span className="text-black font-medium">Guayaquil &amp; Viajes</span>
              </div>
              <div className="flex items-center justify-between py-3.5">
                <span className="text-graphite">Experiencia</span>
                <span className="text-black font-medium">5+ Años // 40+ Novias</span>
              </div>
            </div>

            {/* Direct WhatsApp Callout */}
            <div className="p-6 rounded-2xl border border-black/10 bg-white/70 space-y-3">
              <p className="font-label text-[11px] uppercase tracking-[0.2em] text-graphite">
                ¿Prefieres atención inmediata?
              </p>
              <a
                href="https://api.whatsapp.com/send?phone=593983366831&text=Hola%20Lesley%2C%20quisiera%20consultar%20disponibilidad%20para%20una%20fecha"
                target="_blank"
                rel="noopener noreferrer"
                className="btn group relative inline-flex items-center gap-3 px-6 py-3 rounded-full bg-[#0d0f12] text-white text-xs font-label uppercase tracking-widest transition-transform hover:scale-[1.02]"
                data-cursor="WhatsApp"
              >
                <div className="btn__rect bg-[#25D366]" />
                <span className="btn__text flex items-center gap-2">
                  <FaWhatsapp className="h-4 w-4 text-emerald-400" />
                  <span>Escribir por WhatsApp</span>
                </span>
              </a>
            </div>
          </div>

          {/* Right Column: Contact Form */}
          <div className="lg:col-span-7 rounded-3xl border border-black/10 bg-white/80 p-8 sm:p-12 shadow-sm backdrop-blur-md">
            <ContactForm />
          </div>
        </div>
      </div>
    </section>
  );
}
