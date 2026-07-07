"use client";

import Link from "next/link";
import { FaInstagram, FaFacebook, FaWhatsapp } from "react-icons/fa";

const LEGAL_LINKS = [
  { label: "Privacidad", href: "/politicas#privacidad" },
  { label: "Terminos", href: "/politicas#terminos" },
  { label: "Reservas", href: "/politicas#reservas" },
] as const;

export function SiteFooter() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#0a0a0a] text-white">
      <div className="mx-auto max-w-[1600px] px-5 py-16 sm:px-8 sm:py-20 lg:px-12 xl:px-20">
        {/* Main: brand left, social right */}
        <div className="flex flex-col gap-10 md:flex-row md:items-center md:justify-between">
          {/* Brand */}
          <div className="max-w-sm">
            <Link href="/" className="inline-block">
              <p className="font-serif text-2xl italic tracking-tight text-white transition-colors hover:text-white/80">
                Lesley Garcia
              </p>
            </Link>
            <p className="mt-3 text-sm text-white/40 leading-relaxed">
              Maquillaje profesional y contenido UGC en Guayaquil.
            </p>
            <p className="mt-2 text-xs text-white/25">
              Guayaquil, Ecuador
            </p>
          </div>

          {/* Social */}
          <div className="flex gap-3">
            <a
              href="https://www.instagram.com/lesleygarciabeauty"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              className="flex h-10 w-10 items-center justify-center rounded-md border border-white/15 text-white/60 transition-all duration-300 hover:border-white hover:bg-white hover:text-[#0a0a0a]"
            >
              <FaInstagram className="h-4 w-4" />
            </a>
            <a
              href="https://www.facebook.com/lesleygarciabeauty"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Facebook"
              className="flex h-10 w-10 items-center justify-center rounded-md border border-white/15 text-white/60 transition-all duration-300 hover:border-white hover:bg-white hover:text-[#0a0a0a]"
            >
              <FaFacebook className="h-4 w-4" />
            </a>
            <a
              href="https://api.whatsapp.com/send?phone=593983366831&text=Hola%2C%20%C2%BFque%20tal%3F.%0AQuisiera%20agendar%20una%20cita%20contigo%E2%99%A5%EF%B8%8F"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="WhatsApp"
              className="flex h-10 w-10 items-center justify-center rounded-md border border-white/15 text-white/60 transition-all duration-300 hover:border-white hover:bg-white hover:text-[#0a0a0a]"
            >
              <FaWhatsapp className="h-4 w-4" />
            </a>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/10">
        <div className="mx-auto flex max-w-[1600px] flex-col items-center gap-4 px-5 py-6 sm:flex-row sm:justify-between sm:px-8 lg:px-12 xl:px-20">
          <p className="text-xs text-white/20">
            &copy; {currentYear} Lesley Garcia Beauty. Todos los derechos
            reservados.
          </p>

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
