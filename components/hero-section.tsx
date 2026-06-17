"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { useReducedMotion } from "motion/react";

function smoothScrollTo(id: string) {
  const el = document.getElementById(id);
  if (el) {
    const offset = 80;
    const top = el.getBoundingClientRect().top + window.scrollY - offset;
    window.scrollTo({ top, behavior: "smooth" });
  }
}

export function HeroSection() {
  const [mounted, setMounted] = useState(false);
  const reduce = useReducedMotion();

  useEffect(() => {
    const t = setTimeout(() => setMounted(true), 50);
    return () => clearTimeout(t);
  }, []);

  const fade = (delay: number): React.CSSProperties =>
    reduce
      ? {}
      : {
          opacity: mounted ? 1 : 0,
          transform: mounted ? "translateY(0)" : "translateY(20px)",
          transition: `opacity 1.1s cubic-bezier(0.16, 1, 0.3, 1) ${delay}s, transform 1.1s cubic-bezier(0.16, 1, 0.3, 1) ${delay}s`,
        };

  return (
    <section
      id="hero"
      className="relative w-full overflow-hidden bg-white"
    >
      {/* Top announcement ticker */}
      <div className="relative z-10 border-b border-black/5 bg-white overflow-hidden" style={fade(0.05)}>
        <div className="animate-ticker flex whitespace-nowrap py-2">
          <span className="flex items-center gap-6 pr-6 text-[9px] font-medium uppercase tracking-[0.35em] text-[#0a0a0a]/50">
            <span>Reserva tu fecha de novia 2026</span>
            <span className="text-[#0a0a0a]/20">&middot;</span>
            <span>Disponible para UGC Creator</span>
            <span className="text-[#0a0a0a]/20">&middot;</span>
            <span>Maquillaje Profesional en Guayaquil</span>
            <span className="text-[#0a0a0a]/20">&middot;</span>
          </span>
          <span className="flex items-center gap-6 pr-6 text-[9px] font-medium uppercase tracking-[0.35em] text-[#0a0a0a]/50">
            <span>Reserva tu fecha de novia 2026</span>
            <span className="text-[#0a0a0a]/20">&middot;</span>
            <span>Disponible para UGC Creator</span>
            <span className="text-[#0a0a0a]/20">&middot;</span>
            <span>Maquillaje Profesional en Guayaquil</span>
            <span className="text-[#0a0a0a]/20">&middot;</span>
          </span>
        </div>
      </div>

      {/* Hero — full-bleed image with layered shadow + text overlay */}
      <div className="relative isolate flex min-h-[560px] flex-col justify-center overflow-hidden bg-[#0a0a0a] sm:min-h-[680px] lg:min-h-[820px]">
        {/* Background image */}
        <div className="absolute inset-0">
          <Image
            src="/img/portada.jpeg"
            alt="Lesley Garcia — Maquilladora profesional y creadora UGC en su estudio"
            fill
            priority
            fetchPriority="high"
            sizes="100vw"
            className="object-cover object-center"
            quality={88}
          />
        </div>

        {/* Layered shadow for text readability */}
        <div
          aria-hidden
          className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/55 to-black/15"
        />
        {/* <div
          aria-hidden
          className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/55"
        /> */}
        <div
          aria-hidden
          className="absolute inset-0 bg-[radial-gradient(ellipse_at_28%_55%,transparent_0%,rgba(0,0,0,0.35)_85%)]"
        />

        {/* Content */}
        <div className="relative z-10 mx-auto w-full max-w-[1400px] px-5 sm:px-8 sm:py-20 lg:px-12">
          <div className="max-w-2xl">
            {/* Eyebrow */}
            <div className="mb-6 flex items-center gap-3" style={fade(0.15)}>
              <span className="h-px w-8 bg-white/85" />
              <span className="text-[10px] font-medium uppercase tracking-[0.3em] text-white">
                Makeup Artist &amp; UGC Creator
              </span>
            </div>

            {/* Headline */}
            <h1
              className="font-serif text-white leading-[0.90] tracking-[-0.04em]"
              style={fade(0.3)}
            >
              <span className="block text-[clamp(2.8rem,9vw,7.5rem)]">
                Belleza que
              </span>
              <span className="block text-[clamp(2.8rem,9vw,7.5rem)]">
                cuenta una
              </span>
              <span className="block text-[clamp(2.8rem,9vw,7.5rem)] italic">
                historia
                <span className="ml-4 text-[clamp(1.8rem,8vw,6.5rem)] font-normal text-white/80 align-baseline" style={{ fontFamily: "var(--font-caveat)" }}>
                  real
                </span>
              </span>
            </h1>

            {/* Body */}
            <p
              className="mt-8 max-w-md text-[15px] leading-relaxed text-white/85 sm:text-base"
              style={fade(0.5)}
            >
              Maquillaje social, novias y contenido UGC para marcas de
              belleza que buscan imagen impecable y resultados medibles.
            </p>

            {/* CTAs */}
            <div
              className="mt-10 flex flex-wrap items-center gap-3"
              style={fade(0.7)}
            >
              <button
                type="button"
                onClick={() => smoothScrollTo("contact")}
                className="group inline-flex h-12 items-center justify-center bg-white px-7 text-[10px] font-medium uppercase tracking-[0.25em] text-[#0a0a0a] transition-all duration-300 hover:bg-transparent hover:ring-1 hover:ring-white hover:text-white"
              >
                Reservar Consulta
                <span className="ml-3 inline-block h-px w-5 bg-current transition-all duration-300 group-hover:w-7" />
              </button>
              <button
                type="button"
                onClick={() => smoothScrollTo("portfolio")}
                className="group inline-flex h-12 items-center justify-center px-2 text-[10px] font-medium uppercase tracking-[0.25em] text-white transition-colors duration-300 hover:text-white/70"
              >
                Ver Portfolio
                <span className="ml-3 inline-block h-px w-5 bg-current transition-all duration-300 group-hover:w-7" />
              </button>
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div
          className="absolute bottom-5 right-5 z-10 hidden items-center gap-2 sm:right-8 sm:bottom-8 sm:flex lg:right-12 lg:bottom-12"
          style={fade(1.0)}
        >
          <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-white/70">
            Scroll
          </span>
          <span className="h-px w-8 bg-white/50" />
        </div>
      </div>
    </section>
  );
}
