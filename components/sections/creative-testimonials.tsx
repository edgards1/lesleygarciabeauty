"use client";

import { useState, useRef } from "react";

const TESTIMONIALS = [
  {
    id: 1,
    quote:
      "Me hizo sentir como una reina el día de mi boda. El maquillaje duró intacto más de 16 horas bajo el clima de Guayaquil y se veía radiante y natural en cada toma de video y foto.",
    author: "Sarah Johnson",
    role: "Novia — Samborondón",
    textColor: "#8a0467",
    bgColor: "#fce7f3",
  },
  {
    id: 2,
    quote:
      "Profesional, perfeccionista y con una sensibilidad única para entender el subtono exacto de cada piel. Es mi maquilladora de confianza para todas mis sesiones editoriales.",
    author: "Emma Davis",
    role: "Modelo & Creadora de Moda",
    textColor: "#065f46",
    bgColor: "#d1fae5",
  },
  {
    id: 3,
    quote:
      "Trabajar con Lesley en nuestras campañas UGC fue un antes y un después. No solo entrega un acabado impecable sino videos orgánicos con ganchos que conectaron de inmediato con nuestra audiencia.",
    author: "Lisa Chen",
    role: "Directora de Marca Cosmética",
    textColor: "#bfdbfe",
    bgColor: "#101731",
  },
];

export function CreativeTestimonials() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const prev = () => {
    setCurrentIndex((prev) => (prev === 0 ? TESTIMONIALS.length - 1 : prev - 1));
  };

  const next = () => {
    setCurrentIndex((prev) => (prev === TESTIMONIALS.length - 1 ? 0 : prev + 1));
  };

  return (
    <section id="testimonials" className="theme-light relative px-6 py-28 sm:px-10 sm:py-36 lg:px-16 overflow-hidden border-b border-black/10">
      <div className="mx-auto max-w-[1700px]">
        {/* Header with Eyebrow and Navigation Buttons */}
        <div className="flex items-center justify-between gap-6 mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2.5 font-label text-[10px] uppercase tracking-[0.3em] text-graphite">
            <span className="h-1.5 w-1.5 rounded-full bg-black" />
            <span>Testimonios // Clientes &amp; Novias</span>
          </div>

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={prev}
              aria-label="Testimonio anterior"
              className="h-12 w-12 rounded-full border border-black/15 flex items-center justify-center text-black transition-colors duration-300 hover:bg-black hover:text-white active:scale-95"
              data-cursor="Anterior"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="m15 18-6-6 6-6" />
              </svg>
            </button>
            <button
              type="button"
              onClick={next}
              aria-label="Siguiente testimonio"
              className="h-12 w-12 rounded-full border border-black/15 flex items-center justify-center text-black transition-colors duration-300 hover:bg-black hover:text-white active:scale-95"
              data-cursor="Siguiente"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="m9 18 6-6-6-6" />
              </svg>
            </button>
          </div>
        </div>

        {/* Tonal Cards Grid / Carousel */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {TESTIMONIALS.map((t, idx) => (
            <div
              key={t.id}
              style={{
                color: t.textColor,
                backgroundColor: t.bgColor,
              }}
              className={`flex flex-col justify-between p-8 sm:p-12 rounded-3xl min-h-[380px] transition-all duration-500 hover:-translate-y-1.5 shadow-sm ${
                idx === currentIndex ? "ring-2 ring-black/20" : ""
              }`}
            >
              <div className="space-y-8">
                <div className="flex items-center justify-between">
                  <span className="font-label text-xs uppercase tracking-[0.25em] opacity-70">
                    0{idx + 1}
                  </span>
                  {/* Sculptural Quote Icon */}
                  <svg
                    width="44"
                    height="32"
                    viewBox="0 0 65 49"
                    fill="currentColor"
                    className="opacity-60"
                  >
                    <path d="M24.54 49H0V27.92C0 24.12.44 20.57 1.33 17.28c1.03-3.42 2.5-6.4 4.42-8.93C7.81 5.82 10.39 3.8 13.49 2.28 16.58.76 20.19 0 24.32 0v9.5c-2.51 0-4.57.57-6.19 1.7-1.62 1.02-2.95 2.41-3.98 4.18-1.03 1.78-1.77 3.8-2.21 6.08-.3 2.15-.45 4.3-.45 6.46h13.05V49ZM65 49H40.46V27.92c0-3.8.44-7.35 1.33-10.64 1.03-3.42 2.5-6.4 4.42-8.93C48.27 5.82 50.85 3.8 53.95 2.28 57.04.76 60.65 0 64.78 0v9.5c-2.51 0-4.57.57-6.19 1.7-1.62 1.02-2.95 2.41-3.98 4.18-1.03 1.78-1.77 3.8-2.21 6.08-.3 2.15-.44 4.3-.44 6.46H65V49Z" />
                  </svg>
                </div>

                <blockquote className="font-display text-[clamp(1.4rem,2.2vw,2rem)] font-light leading-[1.25] tracking-[-0.02em]">
                  &ldquo;{t.quote}&rdquo;
                </blockquote>
              </div>

              <div className="pt-8 border-t border-current/15 mt-8 flex flex-col">
                <span className="font-display text-base font-medium tracking-wide">
                  {t.author}
                </span>
                <span className="font-label text-xs uppercase tracking-wider opacity-75 mt-1">
                  {t.role}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
