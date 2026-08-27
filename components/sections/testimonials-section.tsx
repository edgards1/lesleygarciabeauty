"use client";

import { useState, useCallback, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

const testimonials = [
  {
    name: "Sarah Johnson",
    role: "Novia",
    content:
      "Me hizo sentir como una princesa el dia de mi boda. El maquillaje duro todo el dia y se veia perfecto en cada foto.",
    portrait: "/img/novia_2.webp",
  },
  {
    name: "Emma Davis",
    role: "Modelo",
    content:
      "Profesional, talentosa y muy facil de trabajar. Entiende exactamente que look funciona mejor para cada sesion y siempre cumple.",
    portrait: "/img/social_3.webp",
  },
  {
    name: "Lisa Chen",
    role: "Ejecutiva",
    content:
      "La contrato para todos mis eventos importantes. Tiene un ojo increible para los detalles y siempre me hace sentir segura.",
    portrait: "/img/ebano_2.webp",
  },
];

export function TestimonialsSection() {
  const [active, setActive] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const go = useCallback(
    (dir: 1 | -1) => {
      setActive((prev) => (prev + dir + testimonials.length) % testimonials.length);
    },
    []
  );

  useEffect(() => {
    if (isPaused) return;
    const t = setInterval(() => go(1), 6000);
    return () => clearInterval(t);
  }, [go, isPaused]);

  const current = testimonials[active];

  return (
    <section
      id="testimonials"
      className="overflow-hidden bg-bone-white transition-colors"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <div className="container mx-auto px-5 sm:px-8 py-28 md:py-40">
        <div className="grid items-center gap-16 lg:grid-cols-[1fr_1.4fr] lg:gap-24">
          {/* Left — overlapping portraits + controls */}
          <div className="order-2 lg:order-1">
            <div className="relative h-24">
              {testimonials.map((t, i) => {
                const pos = (i - active + testimonials.length) % testimonials.length;
                return (
                  <button
                    key={t.name}
                    type="button"
                    onClick={() => setActive(i)}
                    aria-label={`Ver testimonio de ${t.name}`}
                    className={`absolute left-0 top-0 h-24 w-24 overflow-hidden rounded-full ring-4 ring-bone-white transition-transform duration-700 ease-[cubic-bezier(0.32,0.72,0,1)] ${
                      pos === 0
                        ? "z-30 cursor-default"
                        : "z-0 cursor-pointer hover:z-20"
                    }`}
                    style={{
                      transform: `translateX(${pos * 72}px) scale(${pos === 0 ? 1 : 0.9})`,
                    }}
                  >
                    <img
                      src={t.portrait}
                      alt={t.name}
                      className="h-full w-full object-cover"
                    />
                    <span
                      className={`absolute inset-0 bg-black/40 transition-opacity duration-500 ${
                        pos === 0 ? "opacity-0" : "opacity-100"
                      }`}
                    />
                  </button>
                );
              })}
            </div>

            {/* Counter + arrows */}
            <div className="mt-12 flex items-center gap-6">
              <span className="font-label text-[10px] uppercase tracking-[0.25em] text-graphite tabular-nums">
                {String(active + 1).padStart(2, "0")} /{" "}
                {String(testimonials.length).padStart(2, "0")}
              </span>
              <span className="h-px w-16 bg-ash" />
              <div className="flex gap-3">
                <button
                  type="button"
                  onClick={() => go(-1)}
                  aria-label="Testimonio anterior"
                  className="flex h-11 w-11 items-center justify-center rounded-full border border-ash text-ink-black transition-colors duration-300 hover:border-ink-black active:scale-95"
                >
                  <ChevronLeft className="h-4 w-4" />
                </button>
                <button
                  type="button"
                  onClick={() => go(1)}
                  aria-label="Siguiente testimonio"
                  className="flex h-11 w-11 items-center justify-center rounded-full border border-ash text-ink-black transition-colors duration-300 hover:border-ink-black active:scale-95"
                >
                  <ChevronRight className="h-4 w-4" />
                </button>
              </div>
            </div>
            </div>

          {/* Right — minimalist typography quote */}
          <div className="order-1 lg:order-2">
            <h2 className="font-display font-light text-[clamp(1.6rem,3vw,2.4rem)] leading-[1.15] tracking-[-0.02em] text-ink-black mb-12 max-w-xl">
              Palabras que
              <span className="italic text-graphite">
                {" "}
                quedan
              </span>
            </h2>

            <div key={active} className="animate-fade-in-up">
              <blockquote className="font-display font-light text-[clamp(1.6rem,3vw,2.6rem)] leading-[1.25] tracking-[-0.01em] text-ink-black max-w-2xl">
                <span className="text-ash">
                  &ldquo;
                </span>
                {current.content}
                <span className="text-ash">
                  &rdquo;
                </span>
              </blockquote>
              <div className="mt-10 flex items-center gap-4">
                <span className="h-px w-10 bg-ash" />
                <div>
                  <p className="text-sm font-normal text-ink-black font-body">
                    {current.name}
                  </p>
                  <p className="text-[10px] uppercase tracking-[0.25em] text-graphite mt-1 font-label">
                    {current.role}
                  </p>
                </div>
              </div>
</div>
          </div>
        </div>
      </div>
    </section>
  );
}
