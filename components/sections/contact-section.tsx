import { FaWhatsapp } from "react-icons/fa";
import { FadeIn } from "@/components/animations/fade-in";
import { ContactForm } from "@/components/contact-form";

export function ContactSection() {
  return (
    <section
      id="contact"
      className="bg-[#0a0a0a] text-white relative overflow-hidden"
    >
      {/* Subtle grain texture overlay */}
      <div
        aria-hidden
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
        }}
      />

      <div className="mx-auto max-w-[1600px] px-5 sm:px-8 lg:px-12 xl:px-20 relative z-10">
        {/* Top — Editorial header */}
        <div className="grid lg:grid-cols-[1fr_1fr] gap-16 lg:gap-24 pt-20 sm:pt-28">
          {/* Left — Brand statement */}
          <FadeIn>
            <div className="flex items-center gap-4 mb-8">
              <div className="h-px w-12 bg-white/20" />
              <span className="text-[10px] font-medium uppercase tracking-[0.35em] text-white/50">
                Contacto
              </span>
            </div>

            <h2 className="text-[clamp(3rem,8vw,6rem)] font-serif leading-[0.95] tracking-[-0.02em] text-white mb-8">
              <span className="italic text-white/40">Trabajemos</span>
              <br />
              juntos
            </h2>

            <p className="text-base sm:text-lg text-white/50 leading-[1.7] max-w-md mb-12">
              Estoy aquí para ayudarte a crear el look perfecto para tu boda, evento especial o para tu marca. Completa el formulario y me pondré en contacto contigo lo antes posible.
            </p>

            {/* Trust metrics — editorial style */}
            <div className="space-y-0 divide-y divide-white/10 max-w-md">
              <div className="flex items-center justify-between py-5">
                <p className="text-sm text-white/60">Tiempo de respuesta</p>
                <p className="text-sm font-medium text-white">24 horas</p>
              </div>
              <div className="flex items-center justify-between py-5">
                <p className="text-sm text-white/60">Presupuesto</p>
                <p className="text-sm font-medium text-white">Sin compromiso</p>
              </div>
              <div className="flex items-center justify-between py-5">
                <p className="text-sm text-white/60">Cobertura</p>
                <p className="text-sm font-medium text-white">Guayaquil y alrededores</p>
              </div>
              <div className="flex items-center justify-between py-5">
                <p className="text-sm text-white/60">Experiencia</p>
                <p className="text-sm font-medium text-white">5+ años, 40+ novias</p>
              </div>
            </div>
          </FadeIn>

          {/* Right — Form */}
          <FadeIn delay={0.15}>
            <ContactForm />
          </FadeIn>
        </div>

        {/* Bottom — WhatsApp direct CTA */}
        <FadeIn delay={0.3}>
          <div className="border-t border-white/10 mt-20 sm:mt-28 py-12 sm:py-16">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
              <div>
                <p className="text-sm text-white/40 mb-1"> Prefieres escribir directo? </p>
                <p className="text-xs text-white/25">Respuesta lo antes posible</p>
              </div>
              <a
                href="https://api.whatsapp.com/send?phone=593983366831&text=Hola%2C%20%C2%BFque%20tal%3F.%0AQuisiera%20agendar%20una%20cita%20contigo%E2%99%A5%EF%B8%8F"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-3 border border-white/20 px-8 py-3.5 text-[11px] font-medium uppercase tracking-[0.2em] text-white transition-all duration-300 hover:bg-white hover:text-[#0a0a0a] hover:border-white"
              >
                <FaWhatsapp className="h-4 w-4" />
                Abrir WhatsApp
              </a>
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
