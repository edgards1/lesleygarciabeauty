"use client";

import Link from "next/link";
import { FaInstagram, FaFacebook, FaWhatsapp } from "react-icons/fa";
import Logo from "@/public/icons/Logo_LG.svg";

const FOOTER_NAV = [
  { label: "Inicio", href: "#hero" },
  { label: "Qué Hacemos", href: "#what" },
  { label: "Proyectos", href: "#projects" },
  { label: "Experiencia", href: "#experience" },
  { label: "Testimonios", href: "#testimonials" },
  { label: "Novedades", href: "#news" },
  { label: "Contacto", href: "#contact" },
];

export function CreativeFooter() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="theme-dark relative w-full overflow-hidden bg-[#0d0f12] text-[#fffef7] pt-20 sm:pt-28">
      <div className="mx-auto max-w-[1700px] px-6 sm:px-10 lg:px-16">
        {/* 4-Column Upper Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-16 pb-20 border-b border-white/10">
          {/* Col 1: Brand Mark & Bio (lg: 4 cols) */}
          <div className="lg:col-span-4 space-y-6">
            <div className="flex items-center gap-3.5">
              <div className="relative h-10 w-10 overflow-hidden rounded-full border border-white/20 bg-white">
                <img
                  src={Logo.src}
                  alt="Lesley Garcia"
                  className="h-full w-full object-cover"
                />
              </div>
              <div className="flex flex-col">
                <span className="font-display text-sm font-medium uppercase tracking-[0.14em] text-white">
                  Lesley García
                </span>
                <span className="font-label text-[10px] uppercase tracking-[0.22em] text-white/50">
                  Estudio de Belleza &amp; Producción UGC
                </span>
              </div>
            </div>

            <p className="text-xs font-body leading-relaxed text-white/60 max-w-sm">
              Fundado con la misión de resaltar la autenticidad y elegancia de cada rostro.
              Especialistas en novias, pieles ébano y contenido audiovisual para la industria de la cosmética.
            </p>

            <div className="pt-2">
              <span className="font-label text-[10px] uppercase tracking-[0.25em] text-white/40">
                Guayaquil, Ecuador
              </span>
            </div>
          </div>

          {/* Col 2: Direct Contact & Social Links (lg: 3 cols) */}
          <div className="lg:col-span-3 space-y-6">
            <p className="font-label text-[10px] uppercase tracking-[0.3em] text-white/40">
              Canales Directos
            </p>

            <div className="space-y-3 font-display text-sm">
              <a
                href="https://api.whatsapp.com/send?phone=593983366831"
                target="_blank"
                rel="noopener noreferrer"
                className="block underline-link text-white/90"
                data-cursor="WhatsApp"
              >
                +593 98 336 6831
              </a>
              <a
                href="mailto:lesleygarciabeauty@gmail.com"
                className="block text-white/70 hover:text-white transition-colors"
                data-cursor="Email"
              >
                lesleygarciabeauty@gmail.com
              </a>
            </div>

            <div className="pt-4">
              <p className="font-label text-[10px] uppercase tracking-[0.3em] text-white/40 mb-3">
                Síguenos
              </p>
              <div className="flex items-center gap-3">
                <a
                  href="https://www.instagram.com/lesleygarciabeauty"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Instagram"
                  className="h-10 w-10 rounded-full border border-white/15 flex items-center justify-center text-white/80 transition-colors hover:border-white hover:bg-white hover:text-black"
                  data-cursor="Instagram"
                >
                  <FaInstagram className="h-4 w-4" />
                </a>
                <a
                  href="https://www.facebook.com/lesleygarciabeauty"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Facebook"
                  className="h-10 w-10 rounded-full border border-white/15 flex items-center justify-center text-white/80 transition-colors hover:border-white hover:bg-white hover:text-black"
                  data-cursor="Facebook"
                >
                  <FaFacebook className="h-4 w-4" />
                </a>
                <a
                  href="https://api.whatsapp.com/send?phone=593983366831"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="WhatsApp"
                  className="h-10 w-10 rounded-full border border-white/15 flex items-center justify-center text-white/80 transition-colors hover:border-white hover:bg-white hover:text-black"
                  data-cursor="WhatsApp"
                >
                  <FaWhatsapp className="h-4 w-4" />
                </a>
              </div>
            </div>
          </div>

          {/* Col 3: Animated Navigation Links (lg: 3 cols) */}
          <div className="lg:col-span-3 space-y-3">
            <p className="font-label text-[10px] uppercase tracking-[0.3em] text-white/40 mb-4">
              Mapa del Sitio
            </p>
            <ul className="space-y-2">
              {FOOTER_NAV.map((nav) => (
                <li key={nav.href}>
                  <a
                    href={nav.href}
                    className="btn group relative inline-flex items-center justify-between w-full px-5 py-2.5 rounded-full border border-white/10 bg-white/5 text-xs font-label uppercase tracking-widest text-white/80 transition-colors hover:text-black"
                    data-cursor="Navegar"
                  >
                    <div className="btn__rect bg-[#ffd001]" />
                    <span className="btn__text">{nav.label}</span>
                    <span className="btn__text opacity-60">→</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 4: Quick Action & Legal (lg: 2 cols) */}
          <div className="lg:col-span-2 space-y-6">
            <p className="font-label text-[10px] uppercase tracking-[0.3em] text-white/40">
              ¿Lista para tu cita?
            </p>
            <p className="text-xs font-body leading-relaxed text-white/60">
              Agenda con anticipación para asegurar disponibilidad en fines de semana y fechas nupciales.
            </p>
            <Link
              href="/agendar"
              className="inline-flex items-center justify-center w-full py-3 rounded-full bg-[#ffd001] text-black font-label text-xs uppercase tracking-widest font-medium transition-transform hover:scale-[1.03]"
              data-cursor="Reservar"
            >
              Agendar ahora
            </Link>

            <div className="pt-6 text-[10px] font-label uppercase tracking-widest text-white/35 space-y-1">
              <div>© {currentYear} Lesley García</div>
              <div>Todos los derechos reservados</div>
            </div>
          </div>
        </div>

        {/* Bottom Giant Monumental Typography Wordmark */}
        <div className="relative pt-12 pb-8 flex items-center justify-center select-none overflow-hidden">
          <svg
            viewBox="0 0 1400 180"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="w-full text-white/15 opacity-40 hover:opacity-60 transition-opacity duration-700 pointer-events-none"
          >
            <text
              x="50%"
              y="50%"
              dominantBaseline="central"
              textAnchor="middle"
              fill="currentColor"
              className="font-display font-light tracking-[-0.04em] uppercase"
              fontSize="145"
            >
              LESLEY GARCÍA
            </text>
          </svg>
          <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-[#0d0f12] to-transparent pointer-events-none" />
        </div>
      </div>
    </footer>
  );
}
