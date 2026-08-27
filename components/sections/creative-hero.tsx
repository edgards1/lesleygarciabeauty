"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import gsap from "gsap";
import { getLenis } from "@/components/lenis-smooth";

export function CreativeHero() {
  const heroTopRef = useRef<HTMLDivElement>(null);
  const heroSvgRef = useRef<SVGSVGElement>(null);
  const heroTextRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const tl = gsap.timeline({ defaults: { ease: "power3.out" }, delay: 0.4 });

    if (heroTopRef.current) {
      tl.fromTo(
        heroTopRef.current,
        { clipPath: "inset(0% 0% 100% 0%)" },
        { clipPath: "inset(0% 0% 0% 0%)", duration: 1.1, ease: "power4.inOut" }
      );
    }

    if (heroSvgRef.current) {
      tl.fromTo(
        heroSvgRef.current,
        { opacity: 0, scale: 0.96 },
        { opacity: 1, scale: 1, duration: 1.2, ease: "power3.out" },
        "-=0.5"
      );
    }

    if (heroTextRef.current) {
      const children = heroTextRef.current.children;
      tl.fromTo(
        children,
        { opacity: 0, y: 24 },
        { opacity: 1, y: 0, stagger: 0.12, duration: 0.8 },
        "-=0.6"
      );
    }

    return () => {
      tl.kill();
    };
  }, []);

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (!el) return;
    const top = el.getBoundingClientRect().top + window.scrollY - 20;
    const lenis = getLenis();
    if (lenis) {
      lenis.scrollTo(top, { duration: 1.3 });
    } else {
      window.scrollTo({ top, behavior: "smooth" });
    }
  };

  return (
    <section id="hero" className="relative w-full overflow-hidden bg-[#fffef7]">
      {/* Top Block: Hero Visual with Giant SVG Typography */}
      <div
        ref={heroTopRef}
        className="relative h-[72vh] min-h-[520px] w-full overflow-hidden bg-[#0d0f12] text-[#fffef7] will-change-[clip-path]"
      >
        {/* Background Video Reel */}
        <div className="absolute inset-0 z-0">
          <video
            src="/img/video_novia_1.mov"
            poster="/img/portada.jpeg"
            autoPlay
            loop
            muted
            playsInline
            className="h-full w-full object-cover object-center opacity-45 scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0d0f12] via-black/30 to-black/50" />
        </div>

        {/* Giant Monolithic Vector Typography (Creative Giants signature) */}
        <div className="relative z-10 flex h-full flex-col justify-between px-6 py-10 sm:px-10 sm:py-12 lg:px-16">
          <div className="flex items-center justify-between pt-16 sm:pt-20">
            <span className="font-label text-[10px] uppercase tracking-[0.3em] text-white/70">
              Est. 2019 — Guayaquil
            </span>
            <span className="font-label text-[10px] uppercase tracking-[0.3em] text-white/70">
              Pro Makeup &amp; UGC
            </span>
          </div>

          {/* Monumental Headline SVG */}
          <div className="my-auto py-6 flex items-center justify-center w-full">
            <svg
              ref={heroSvgRef}
              viewBox="0 0 1200 240"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="w-full max-h-[38vh] text-[#fffef7] select-none"
            >
              <text
                x="50%"
                y="50%"
                dominantBaseline="central"
                textAnchor="middle"
                fill="currentColor"
                className="font-display font-light uppercase tracking-[-0.04em]"
                fontSize="155"
              >
                LESLEY GARCÍA
              </text>
            </svg>
          </div>

          {/* Bottom actions row */}
          <div className="flex flex-wrap items-center justify-between gap-6 pb-2">
            <div className="flex items-center gap-3">
              <Link
                href="/agendar"
                className="btn group relative inline-flex items-center justify-center px-8 py-3.5 rounded-full bg-[#fffef7] text-[#0d0f12] text-xs font-label uppercase tracking-[0.16em] transition-transform duration-300 hover:scale-[1.03]"
                data-cursor="Reservar"
              >
                <div className="btn__rect bg-[#ffd001]" />
                <span className="btn__text">Agenda tu cita</span>
              </Link>

              <button
                type="button"
                onClick={() => scrollToSection("projects")}
                className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full border border-white/25 text-white text-xs font-label uppercase tracking-[0.16em] transition-colors duration-300 hover:border-white hover:bg-white/10"
                data-cursor="Ver proyectos"
              >
                Ver Portafolio
                <svg
                  width="10"
                  height="10"
                  viewBox="0 0 12 12"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="translate-y-px"
                >
                  <path
                    d="M1 11L11 1M11 1H3M11 1V9"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>
            </div>

            <div className="hidden sm:flex items-center gap-3 font-label text-[11px] uppercase tracking-[0.25em] text-white/60">
              <span>Scroll para descubrir</span>
              <span className="inline-block h-px w-8 bg-white/40 animate-pulse" />
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Block: theme-dark Statement Banner with pulsating dot */}
      <div className="theme-dark border-t border-white/10 px-6 py-12 sm:px-10 sm:py-16 lg:px-16">
        <div
          ref={heroTextRef}
          className="mx-auto max-w-[1700px] flex flex-col md:flex-row md:items-end justify-between gap-8"
        >
          <div className="max-w-3xl space-y-4">
            {/* Eyebrow with pulsating dot */}
            <div className="inline-flex items-center gap-2.5 font-label text-[10px] uppercase tracking-[0.28em] text-white/70">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
              </span>
              <span>Guayaquil, Ecuador // Alta Cosmética &amp; Producción</span>
            </div>

            <h1 className="font-display text-[clamp(1.9rem,4vw,3.6rem)] font-light leading-[1.08] tracking-[-0.03em] text-[#fffef7]">
              Maquillaje profesional, producción visual y el arte de la belleza real.
            </h1>
          </div>

          <div className="max-w-xs space-y-2 text-xs font-body leading-relaxed text-white/60">
            <p>
              Especializada en novias, pieles ébano y sesiones editoriales. Creamos looks
              duraderos que elevan tu confianza sin perder tu esencia.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
