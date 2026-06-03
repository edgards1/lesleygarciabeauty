"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { siteConfig } from "@/constants/site";

const LEFT_LINKS = [
  { href: "#about", label: "Sobre mí" },
  { href: "#services", label: "Servicios" },
  { href: "#portfolio", label: "Portfolio" },
];

const RIGHT_LINKS = [
  { href: "#ugc-results", label: "UGC" },
  { href: "#testimonials", label: "Testimonios" },
  { href: "#contact", label: "Contacto" },
];

function handleNav(e: React.MouseEvent<HTMLAnchorElement>, id: string) {
  if (id.startsWith("#")) {
    e.preventDefault();
    const el = document.getElementById(id.slice(1));
    if (el) {
      const offset = 80;
      const top = el.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top, behavior: "smooth" });
    }
  }
}

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [heroVisible, setHeroVisible] = useState(true);
  const [activeSection, setActiveSection] = useState<string>("");
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const sentinel = document.createElement("div");
    sentinel.style.cssText =
      "position:absolute;top:24px;left:0;width:1px;height:1px;pointer-events:none;";
    sentinel.setAttribute("data-nav-sentinel", "");
    document.body.prepend(sentinel);

    const scrollObs = new IntersectionObserver(
      ([entry]) => setScrolled(!entry.isIntersecting),
      { rootMargin: "24px 0px 0px 0px", threshold: 0 }
    );
    scrollObs.observe(sentinel);

    // Show navbar only after the user has scrolled past the hero.
    const heroEl = document.getElementById("hero");
    const heroObs = heroEl
      ? new IntersectionObserver(
          ([entry]) => setHeroVisible(entry.isIntersecting),
          { rootMargin: "-80px 0px 0px 0px", threshold: 0 }
        )
      : null;
    if (heroEl && heroObs) heroObs.observe(heroEl);

    const sections = ["about", "services", "portfolio", "ugc-results", "testimonials", "contact"];
    const visible = new Map<string, IntersectionObserverEntry>();
    const sectionObs = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) visible.set(entry.target.id, entry);
          else visible.delete(entry.target.id);
        }
        const top = sections
          .map((id) => visible.get(id))
          .filter((e): e is IntersectionObserverEntry => Boolean(e))
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)[0];
        setActiveSection(top ? top.target.id : "");
      },
      { rootMargin: "-30% 0px -50% 0px", threshold: [0, 0.25, 0.5, 0.75, 1] }
    );
    sections.forEach((id) => {
      const el = document.getElementById(id);
      if (el) sectionObs.observe(el);
    });

    void reduced;

    return () => {
      scrollObs.disconnect();
      heroObs?.disconnect();
      sectionObs.disconnect();
      sentinel.remove();
    };
  }, []);

  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  return (
    <>
      <header
        aria-hidden={heroVisible}
        className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ease-out ${
          heroVisible
            ? "-translate-y-full opacity-0 pointer-events-none"
            : "translate-y-0 opacity-100"
        } ${
          scrolled
            ? "bg-white/95 backdrop-blur-md border-b border-black/[0.06]"
            : "bg-white border-b border-transparent"
        }`}
      >
        <nav
          aria-label="Navegación principal"
          className="relative mx-auto grid h-16 max-w-[1400px] grid-cols-[1fr_auto_1fr] items-center px-5 sm:h-[72px] sm:px-8 lg:px-12"
        >
          {/* Left links */}
          <ul className="hidden items-center gap-7 md:flex">
            {LEFT_LINKS.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  onClick={(e) => handleNav(e, link.href)}
                  className={`group relative text-[11px] font-medium uppercase tracking-[0.18em] transition-colors duration-300 ${
                    activeSection === link.href.slice(1)
                      ? "text-[#0a0a0a]"
                      : "text-[#0a0a0a]/65 hover:text-[#0a0a0a]"
                  }`}
                >
                  {link.label}
                  <span
                    className={`absolute -bottom-1 left-0 h-px w-full origin-left scale-x-0 bg-[#0a0a0a] transition-transform duration-500 ease-out group-hover:scale-x-100 ${
                      activeSection === link.href.slice(1) ? "scale-x-100" : ""
                    }`}
                  />
                </a>
              </li>
            ))}
          </ul>

          {/* Centered logo */}
          <Link
            href="#hero"
            onClick={(e) => handleNav(e, "#hero")}
            aria-label="Lesley Garcia Beauty — Inicio"
            className="flex items-center justify-center"
          >
            <span className="font-serif text-[15px] font-medium tracking-[0.18em] uppercase text-[#0a0a0a] sm:text-[16px]">
              Lesley Garcia
            </span>
          </Link>

          {/* Right links + book CTA */}
          <ul className="hidden items-center justify-end gap-7 md:flex">
            {RIGHT_LINKS.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  onClick={(e) => handleNav(e, link.href)}
                  className={`group relative text-[11px] font-medium uppercase tracking-[0.18em] transition-colors duration-300 ${
                    activeSection === link.href.slice(1)
                      ? "text-[#0a0a0a]"
                      : "text-[#0a0a0a]/65 hover:text-[#0a0a0a]"
                  }`}
                >
                  {link.label}
                  <span
                    className={`absolute -bottom-1 left-0 h-px w-full origin-left scale-x-0 bg-[#0a0a0a] transition-transform duration-500 ease-out group-hover:scale-x-100 ${
                      activeSection === link.href.slice(1) ? "scale-x-100" : ""
                    }`}
                  />
                </a>
              </li>
            ))}
            <li>
              <a
                href={siteConfig.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex h-9 items-center bg-[#0a0a0a] px-4 text-[10px] font-medium uppercase tracking-[0.2em] text-white transition-colors duration-300 hover:bg-white hover:text-[#0a0a0a] hover:ring-1 hover:ring-[#0a0a0a]"
              >
                Reservar
              </a>
            </li>
          </ul>

          {/* Mobile hamburger */}
          <button
            type="button"
            aria-label={mobileOpen ? "Cerrar menú" : "Abrir menú"}
            aria-expanded={mobileOpen}
            onClick={() => setMobileOpen((v) => !v)}
            className="absolute right-5 top-1/2 -translate-y-1/2 flex h-10 w-10 items-center justify-center md:hidden"
          >
            <span className="relative block h-3 w-6">
              <span
                className={`absolute left-0 top-0 h-px w-6 bg-[#0a0a0a] transition-all duration-300 ${
                  mobileOpen ? "rotate-45 top-1.5" : ""
                }`}
              />
              <span
                className={`absolute left-0 bottom-0 h-px w-6 bg-[#0a0a0a] transition-all duration-300 ${
                  mobileOpen ? "-rotate-45 -bottom-0" : ""
                }`}
              />
            </span>
          </button>
        </nav>
      </header>

      {/* Mobile full-screen menu */}
      <div
        className={`fixed inset-0 z-40 md:hidden transition-opacity duration-500 ${
          mobileOpen
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        }`}
      >
        <div
          className="absolute inset-0 bg-white"
          aria-hidden
          onClick={() => setMobileOpen(false)}
        />
        <nav
          aria-label="Menú móvil"
          className="relative flex h-full flex-col px-8 pb-12 pt-28"
        >
          <ul className="space-y-5">
            {[...LEFT_LINKS, ...RIGHT_LINKS].map((link, i) => (
              <li
                key={link.href}
                className="border-b border-black/10 pb-4"
                style={{
                  opacity: mobileOpen ? 1 : 0,
                  transform: mobileOpen ? "translateY(0)" : "translateY(20px)",
                  transition: `all 0.6s cubic-bezier(0.16, 1, 0.3, 1) ${
                    mobileOpen ? 0.1 + i * 0.05 : 0
                  }s`,
                }}
              >
                <a
                  href={link.href}
                  onClick={(e) => {
                    handleNav(e, link.href);
                    setMobileOpen(false);
                  }}
                  className="block font-serif text-3xl font-light tracking-tight text-[#0a0a0a]"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>

          <div className="mt-auto space-y-3 pt-12">
            <a
              href={siteConfig.whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              className="block w-full bg-[#0a0a0a] py-4 text-center text-[11px] font-medium uppercase tracking-[0.25em] text-white"
            >
              Reservar Consulta
            </a>
            <p className="text-center text-[11px] uppercase tracking-[0.2em] text-[#0a0a0a]/50">
              Lun — Sáb · 9:00 — 18:00
            </p>
          </div>
        </nav>
      </div>
    </>
  );
}
