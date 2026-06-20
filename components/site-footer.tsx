"use client";

import Link from "next/link";
import { FaInstagram, FaFacebook, FaWhatsapp } from "react-icons/fa";

const LEGAL_LINKS = [
  { label: "Política de Privacidad", href: "/politicas#privacidad" },
  {label: "Términos de Servicio", href: "/politicas#terminos" },
  { label: "Política de Reservas", href: "/politicas#reservas" },
] as const;

export function SiteFooter() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#0a0a0a] text-white">
      {/* Main footer content */}
      <div className="mx-auto max-w-[1400px] px-5 py-16 sm:px-8 sm:py-20 lg:px-12">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-[1fr_auto] md:items-center ">
          {/* Brand column */}
          <div className="flex justify-center flex-col md:items-start items-center lg:col-span-1">
            <Link href="/" className="inline-block">
              <p className="font-serif text-2xl italic tracking-tight text-white transition-colors hover:text-white/80">
                Lesley García
              </p>
            </Link>
            <p className="mt-4 max-w-xs text-sm text-white/40 leading-relaxed">
              Creando momentos de belleza únicos que resaltan tu esencia natural.
              Cada look es una obra de arte diseñada especialmente para ti.
            </p>
          </div>

          {/* Contact & Social column */}
          <div className="text-center sm:text-center lg:col-span-1">
            <h4 className="mb-5 text-[10px] font-medium uppercase tracking-[0.25em] text-white/40">
              Conectemos
            </h4>
            <div className="mb-6 flex justify-center gap-3">
              <a
                href="https://www.instagram.com/lesleygarciabeauty"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="flex h-11 w-11 items-center justify-center rounded-full border border-white/15 text-white/60 transition-all duration-300 hover:border-white hover:bg-white hover:text-[#0a0a0a]"
              >
                <FaInstagram className="h-4 w-4" />
              </a>
              <a
                href="https://www.facebook.com/lesleygarciabeauty"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
                className="flex h-11 w-11 items-center justify-center rounded-full border border-white/15 text-white/60 transition-all duration-300 hover:border-white hover:bg-white hover:text-[#0a0a0a]"
              >
                <FaFacebook className="h-4 w-4" />
              </a>
              <a
                href="https://api.whatsapp.com/send?phone=593983366831&text=Hola%2C%20%C2%BFque%20tal%3F.%0AQuisiera%20agendar%20una%20cita%20contigo%E2%99%A5%EF%B8%8F"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="WhatsApp"
                className="flex h-11 w-11 items-center justify-center rounded-full border border-white/15 text-white/60 transition-all duration-300 hover:border-white hover:bg-white hover:text-[#0a0a0a]"
              >
                <FaWhatsapp className="h-4 w-4" />
              </a>
            </div>

            {/* CTA Button */}
            <a
              href="https://api.whatsapp.com/send?phone=593983366831&text=Hola%2C%20%C2%BFque%20tal%3F.%0AQuisiera%20agendar%20una%20cita%20contigo%E2%99%A5%EF%B8%8F"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 text-[10px] font-medium uppercase tracking-[0.2em] text-[#0a0a0a] transition-all duration-300 hover:bg-white/90 hover:shadow-lg"
            >
              <FaWhatsapp className="h-3.5 w-3.5" />
              Agendar Cita
            </a>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/10">
        <div className="mx-auto flex max-w-[1400px] flex-col items-center gap-4 px-5 py-6 sm:flex-row sm:justify-between sm:px-8 lg:px-12">
          <p className="text-xs text-white/20">
            &copy; {currentYear} Lesley García Beauty. Todos los derechos
            reservados.
          </p>

          {/* Legal links */}
          <nav className="flex flex-wrap justify-center gap-4 sm:gap-5">
            {LEGAL_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-xs text-white/30 transition-colors duration-300 hover:text-white/70"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <p className="text-xs text-white/20">
            Desarrollado por{" "}
            <a
              href="https://www.linkedin.com/in/edgard-s1/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white/40 transition-colors hover:text-white"
            >
              Edgar Delgado
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
