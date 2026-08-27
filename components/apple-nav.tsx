"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import gsap from "gsap";
import { FaWhatsapp } from "react-icons/fa";
import { getLenis } from "@/components/lenis-smooth";

import Logo from "@/public/icons/Logo_LG.svg";

const menuItems = [
  { id: "about", label: "Sobre Mí", index: "01" },
  { id: "services", label: "Servicios", index: "02" },
  { id: "portfolio", label: "Portfolio", index: "03" },
  { id: "ugc", label: "UGC Creator", index: "04" },
  { id: "testimonials", label: "Testimonios", index: "05" },
  { id: "contact", label: "Contacto", index: "06" },
];

function scrollToSection(sectionId: string) {
  const el = document.getElementById(sectionId);
  if (!el) return;
  const top = el.getBoundingClientRect().top + window.scrollY - 24;
  const lenis = getLenis();
  if (lenis) {
    lenis.scrollTo(top, { duration: 1.4 });
  } else {
    window.scrollTo({ top, behavior: "smooth" });
  }
}

export function AppleNav() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const overlayRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = "hidden";
      const links = overlayRef.current?.querySelectorAll("[data-menu-link]");
      if (links) {
        gsap.fromTo(
          links,
          { yPercent: 110 },
          { yPercent: 0, duration: 0.9, stagger: 0.06, ease: "power4.out", delay: 0.15 }
        );
      }
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isMenuOpen]);

  const handleNavClick = (sectionId: string) => {
    setIsMenuOpen(false);
    setTimeout(() => scrollToSection(sectionId), 60);
  };

  return (
    <>
      {/* ===== HEADER — eyebrow + logo left, pill Menú right (zero background) ===== */}
      <header className="fixed top-0 left-0 right-0 z-50">
        <div className="flex items-start justify-between px-5 pt-5 sm:px-8 sm:pt-6 lg:px-10">
          {/* Lockup: two-line eyebrow + circular logo mark */}
          <Link href="/" className="flex items-start gap-3 group">
            <img
              src={Logo.src}
              alt="Lesley Garcia"
              className="h-8 w-8 rounded-full object-cover ring-1 ring-ink-black/10 transition-transform duration-500 group-hover:scale-105"
            />
            <span className="hidden sm:block text-[11px] leading-[1.35] uppercase tracking-[0.08em] text-ink-black font-display">
              Maquillaje profesional
              <br />
              <span className="text-graphite">// UGC Creator — Guayaquil</span>
            </span>
          </Link>

          {/* Pill Menu button — the only heavy element on the canvas */}
          <button
            type="button"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-expanded={isMenuOpen}
            aria-label={isMenuOpen ? "Cerrar menú" : "Abrir menú"}
            className="relative z-[70] inline-flex h-11 items-center justify-center rounded-full bg-ink-black px-6 text-sm font-normal text-bone-white transition-transform duration-300 hover:scale-[1.03] active:scale-95"
          >
            {isMenuOpen ? "Cerrar" : "Menú"}
          </button>
        </div>
      </header>

      {/* ===== FULL-SCREEN MENU OVERLAY — cream canvas, giant weight-300 links ===== */}
      <div
        ref={overlayRef}
        className={`fixed inset-0 z-[60] bg-bone-white transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] ${
          isMenuOpen
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        }`}
        aria-hidden={!isMenuOpen}
      >
        <div className="flex h-full flex-col justify-center px-5 sm:px-8 lg:px-10">
          <nav className="flex flex-col gap-1">
            {menuItems.map((item) => (
              <div key={item.id} className="overflow-hidden">
                <button
                  data-menu-link
                  type="button"
                  onClick={() => handleNavClick(item.id)}
                  className="group flex w-full items-baseline gap-5 py-2 text-left"
                >
                  <span className="font-label text-[11px] uppercase tracking-[0.2em] text-ash">
                    {item.index}
                  </span>
                  <span className="font-display text-[clamp(2.2rem,6vw,4.2rem)] font-light leading-[1.05] tracking-[-0.03em] text-ink-black transition-colors duration-300 group-hover:text-graphite">
                    {item.label}
                  </span>
                </button>
              </div>
            ))}
          </nav>

          <div className="mt-14 flex flex-wrap items-center gap-6">
            <Link
              href="/agendar"
              onClick={() => setIsMenuOpen(false)}
              className="inline-flex h-11 items-center justify-center rounded-full bg-ink-black px-7 text-sm text-bone-white transition-transform duration-300 hover:scale-[1.03] active:scale-95"
            >
              Agenda tu cita
            </Link>
            <a
              href="https://api.whatsapp.com/send?phone=593983366831&text=Hola%2C%20quisiera%20una%20consulta"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex h-11 items-center gap-2 rounded-full border border-ash px-7 text-sm text-ink-black transition-colors duration-300 hover:border-ink-black"
            >
              <FaWhatsapp className="h-4 w-4" />
              WhatsApp
            </a>
            <span className="font-label text-[11px] uppercase tracking-[0.2em] text-graphite">
              Guayaquil, Ecuador
            </span>
          </div>
        </div>
      </div>
    </>
  );
}
