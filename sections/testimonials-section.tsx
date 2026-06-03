"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, useReducedMotion, AnimatePresence } from "motion/react";
import { testimonials } from "@/constants/testimonials";

function FadeUp({
  children,
  delay = 0,
  className,
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      initial={reduce ? false : { opacity: 0, y: 30 }}
      whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.9, delay, ease: [0.16, 1, 0.3, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export function TestimonialsSection() {
  const [index, setIndex] = useState(0);
  const t = testimonials[index];
  const reduce = useReducedMotion();

  return (
    <section
      id="testimonials"
      className="relative w-full overflow-hidden border-t border-black/10 bg-white py-20 sm:py-28 lg:py-36"
    >
      <div className="mx-auto max-w-[1400px] px-5 sm:px-8 lg:px-12">
        <FadeUp>
          <div className="mb-12 flex items-center gap-4 lg:mb-16">
            <span className="h-px w-10 bg-[#0a0a0a]" />
            <span className="text-[10px] font-medium uppercase tracking-[0.3em] text-[#0a0a0a]">
              05 — Testimonios
            </span>
          </div>
        </FadeUp>

        <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-7">
            <FadeUp delay={0.1}>
              <h2 className="font-serif text-4xl font-light leading-[1.02] tracking-[-0.035em] text-[#0a0a0a] sm:text-6xl lg:text-7xl xl:text-[5.5rem]">
                Lo que dicen
                <br />
                mis <span className="italic">clientas</span>
              </h2>
            </FadeUp>
          </div>

          <div className="lg:col-span-5 lg:pt-12">
            <FadeUp delay={0.2}>
              <p className="max-w-md text-[15px] leading-relaxed text-[#0a0a0a]/70 sm:text-base">
                Novias, creadoras y marcas que han confiado en mi trabajo.
                Cada testimonio es una historia real de confianza, estética
                y resultados.
              </p>
            </FadeUp>
          </div>
        </div>

        {/* Featured quote */}
        <div className="mt-16 grid grid-cols-1 gap-10 border-t border-black/10 pt-12 lg:mt-24 lg:grid-cols-12 lg:gap-12">
          <div className="lg:col-span-5">
            <FadeUp delay={0.1}>
              <div className="relative aspect-[4/5] w-full overflow-hidden bg-stone-100">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={t.id}
                    initial={reduce ? false : { opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                    className="absolute inset-0"
                  >
                    <Image
                      src={t.image}
                      alt={t.name}
                      fill
                      sizes="(min-width: 1024px) 40vw, 100vw"
                      className="object-cover grayscale"
                      quality={85}
                    />
                  </motion.div>
                </AnimatePresence>
              </div>
            </FadeUp>
          </div>

          <div className="relative flex flex-col lg:col-span-7">
            <AnimatePresence mode="wait">
              <motion.div
                key={t.id}
                initial={reduce ? false : { opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                className="flex-1"
              >
                <span className="font-serif text-6xl font-light leading-none text-[#0a0a0a]/20">
                  &ldquo;
                </span>
                <blockquote className="mt-2 font-serif text-2xl font-light leading-[1.15] tracking-tight text-[#0a0a0a] sm:text-3xl lg:text-4xl xl:text-5xl">
                  {t.quote}
                </blockquote>
                <div className="mt-10 border-t border-black/10 pt-6">
                  <p className="font-serif text-xl font-light tracking-tight text-[#0a0a0a]">
                    {t.name}
                  </p>
                  <p className="mt-1 text-[10px] font-medium uppercase tracking-[0.3em] text-[#0a0a0a]/55">
                    {t.role}
                    {t.company ? ` · ${t.company}` : ""}
                  </p>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Pagination */}
            <div className="mt-12 flex items-center justify-between gap-4 border-t border-black/10 pt-6">
              <span className="text-[10px] font-medium uppercase tracking-[0.3em] text-[#0a0a0a]/55">
                {String(index + 1).padStart(2, "0")}{" "}
                <span className="text-[#0a0a0a]/30">
                  / {String(testimonials.length).padStart(2, "0")}
                </span>
              </span>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  aria-label="Testimonio anterior"
                  onClick={() =>
                    setIndex((i) =>
                      i === 0 ? testimonials.length - 1 : i - 1
                    )
                  }
                  className="inline-flex h-10 w-10 items-center justify-center border border-black/15 transition-colors hover:border-[#0a0a0a] hover:bg-[#0a0a0a] hover:text-white"
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="m15 18-6-6 6-6" />
                  </svg>
                </button>
                <button
                  type="button"
                  aria-label="Siguiente testimonio"
                  onClick={() =>
                    setIndex((i) =>
                      i === testimonials.length - 1 ? 0 : i + 1
                    )
                  }
                  className="inline-flex h-10 w-10 items-center justify-center border border-black/15 transition-colors hover:border-[#0a0a0a] hover:bg-[#0a0a0a] hover:text-white"
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="m9 18 6-6-6-6" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
