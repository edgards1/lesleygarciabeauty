"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { useSmoothScroll } from "@/hooks/use-smooth-scroll";

export function HeroSection() {
  const [isLoaded, setIsLoaded] = useState(false);
  const { scrollToSection } = useSmoothScroll();

  useEffect(() => {
    const timer = setTimeout(() => setIsLoaded(true), 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <section className="relative min-h-[100dvh] overflow-hidden">
      {/* ── Full-bleed image background ── */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/img/portada.jpeg"
          alt="Lesley García - Maquilladora Profesional"
          fill
          className="object-cover"
          priority
          quality={100}
        />

        {/* Cinematic gradient overlays */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/30 to-transparent" />
      </div>

      {/* ── Decorative vertical line accent ── */}
      <div
        className="absolute left-6 sm:left-8 lg:left-12 xl:left-20 top-0 bottom-0 z-10 w-px"
        style={{
          opacity: isLoaded ? 1 : 0,
          transition: "opacity 2s ease-out 1.6s",
        }}
      >
        <div className="h-full w-full bg-gradient-to-b from-transparent via-white/8 to-transparent" />
      </div>

      {/* ── Content overlay ── */}
      <div className="relative z-10 min-h-screen flex flex-col justify-center items-center">
        <div className="container mx-auto px-6 sm:px-8 lg:px-12 xl:px-20">
          <div className="max-w-3xl">
            {/* Subtle category line */}
            <div
              className="flex items-center gap-4 mb-8"
              style={{
                opacity: isLoaded ? 1 : 0,
                transform: isLoaded ? "translateY(0)" : "translateY(16px)",
                transition: "all 1s cubic-bezier(0.16, 1, 0.3, 1) 0.3s",
              }}
            >
              <span className="text-[11px] font-sans font-medium text-white/60 uppercase tracking-[0.35em]">
                Arte más allá de la belleza
              </span>
            </div>

            {/* Main heading — Cormorant Garamond for editorial elegance */}
            <h1
              className="font-serif font-light text-white leading-[0.92] mb-8"
              style={{
                opacity: isLoaded ? 1 : 0,
                transform: isLoaded ? "translateY(0)" : "translateY(50px)",
                transition: "all 1.4s cubic-bezier(0.16, 1, 0.3, 1) 0.5s",
              }}
            >
              <span className="block text-[clamp(1rem,10vw,6rem)] tracking-[-0.03em]">
                CADA ROSTRO CUENTA UNA HISTORIA
              </span>
            </h1>

            {/* CTAs */}
            <div
              className="flex flex-col sm:flex-row gap-4"
              style={{
                opacity: isLoaded ? 1 : 0,
                transform: isLoaded ? "translateY(0)" : "translateY(24px)",
                transition: "all 1s cubic-bezier(0.16, 1, 0.3, 1) 0.9s",
              }}
            >
              <button
                onClick={() => scrollToSection("portfolio")}
                className="group relative px-10 py-4 bg-white text-black font-sans font-medium text-xs uppercase tracking-[0.25em] overflow-hidden transition-all duration-500 hover:bg-white/90 hover:shadow-[0_8px_32px_rgba(255,255,255,0.15)]"
              >
                {/* Shimmer sweep effect */}
                <span className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent via-black/5 to-transparent" />
                <span className="relative z-10">Explorar Portfolio</span>
              </button>

              <button
                onClick={() => scrollToSection("contact")}
                className="px-10 py-4 border border-white/25 text-white font-sans font-medium text-xs uppercase tracking-[0.25em] hover:border-white/60 hover:bg-white/5 transition-all duration-500 backdrop-blur-sm"
              >
                Agendar Cita
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* ── Bottom bar with stats + scroll ── */}
      <div
        className="absolute bottom-6 left-0 right-0 z-20"
        style={{
          opacity: isLoaded ? 1 : 0,
          transition: "opacity 1s ease-out 1s",
        }}
      >
        <div className="container mx-auto px-6 sm:px-8 lg:px-12 xl:px-20">
          <div className="flex items-end justify-between py-2">
            {/* Scroll indicator */}
            <div className="flex items-center gap-2 ml-auto">
              <span className="font-sans text-white/35 uppercase tracking-[0.3em]">
                Scroll
              </span>
              <div className="w-px h-8 bg-white/10 relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-1/2 bg-white/50 animate-scroll-line" />
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes scroll-line {
          0% {
            transform: translateY(-100%);
          }
          100% {
            transform: translateY(200%);
          }
        }
        .animate-scroll-line {
          animation: scroll-line 1.8s cubic-bezier(0.65, 0, 0.35, 1) infinite;
        }
      `}</style>
    </section>
  );
}
