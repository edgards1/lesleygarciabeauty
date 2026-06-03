"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "motion/react";
import { aboutContent } from "@/constants/about";

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

export function AboutSection() {
  return (
    <section
      id="about"
      className="relative w-full overflow-hidden border-t border-black/10 bg-white py-20 sm:py-28 lg:py-36"
    >
      <div className="mx-auto max-w-[1400px] px-5 sm:px-8 lg:px-12">
        {/* Section eyebrow */}
        <FadeUp>
          <div className="mb-10 flex items-center gap-4 sm:mb-16">
            <span className="h-px w-10 bg-[#0a0a0a]" />
            <span className="text-[10px] font-medium uppercase tracking-[0.3em] text-[#0a0a0a]">
              01 — Sobre Mí
            </span>
          </div>
        </FadeUp>

        <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-16">
          {/* Headline column */}
          <div className="lg:col-span-7 xl:col-span-8">
            <FadeUp delay={0.1}>
              <h2 className="font-serif text-4xl font-light leading-[1.02] tracking-[-0.035em] text-[#0a0a0a] sm:text-6xl lg:text-7xl xl:text-[5.5rem]">
                Soy
                <span className="font-script text-[1em] font-normal italic text-[#0a0a0a]/80">
                  {" "}Lesley
                </span>
                <br />
                maquilladora
                <br />
                <span className="italic">profesional</span> y creadora
                <br />
                UGC.
              </h2>
            </FadeUp>
          </div>

          {/* Body column */}
          <div className="lg:col-span-5 lg:pt-6 xl:col-span-4">
            <FadeUp delay={0.25}>
              <div className="space-y-5 text-[15px] leading-relaxed text-[#0a0a0a]/75 sm:text-base">
                {aboutContent.description.map((p, i) => (
                  <p key={i}>{p}</p>
                ))}
              </div>
            </FadeUp>

            <FadeUp delay={0.4}>
              <a
                href="#contact"
                className="group mt-8 inline-flex items-center text-[11px] font-medium uppercase tracking-[0.25em] text-[#0a0a0a] transition-opacity hover:opacity-60"
              >
                Trabajemos juntos
                <span className="ml-3 inline-block h-px w-7 bg-current transition-all duration-500 group-hover:w-12" />
              </a>
            </FadeUp>
          </div>
        </div>

        {/* Image + specialities split */}
        <div className="mt-16 grid grid-cols-1 gap-10 lg:mt-24 lg:grid-cols-12 lg:gap-12">
          <FadeUp delay={0.1} className="lg:col-span-7">
            <div className="relative aspect-[4/3] w-full overflow-hidden bg-stone-100 lg:aspect-[5/4]">
              <Image
                src={aboutContent.image}
                alt="Lesley Garcia — Retrato"
                fill
                sizes="(min-width: 1024px) 58vw, 100vw"
                className="object-cover"
                quality={88}
              />
            </div>
            <p className="mt-3 text-[10px] uppercase tracking-[0.25em] text-[#0a0a0a]/50">
              Guayaquil, Ecuador — Servicio a domicilio y estudio
            </p>
          </FadeUp>

          <div className="lg:col-span-5 lg:pt-2">
            <FadeUp delay={0.2}>
              <p className="text-[10px] font-medium uppercase tracking-[0.3em] text-[#0a0a0a]">
                Especialidades
              </p>
            </FadeUp>
            <ul className="mt-6 divide-y divide-black/10 border-y border-black/10">
              {aboutContent.specialties.map((s, i) => (
                <FadeUp key={s} delay={0.25 + i * 0.08}>
                  <li className="flex items-center justify-between py-5">
                    <span className="font-serif text-xl font-light tracking-tight text-[#0a0a0a] sm:text-2xl">
                      {s}
                    </span>
                    <span className="font-script text-xl text-[#0a0a0a]/40 sm:text-2xl">
                      0{i + 1}
                    </span>
                  </li>
                </FadeUp>
              ))}
            </ul>

            {/* Stats inline */}
            <FadeUp delay={0.55}>
              <div className="mt-10 grid grid-cols-3 gap-4">
                {aboutContent.stats.map((s) => (
                  <div key={s.label} className="border-l border-black/15 pl-3">
                    <p className="font-serif text-2xl font-light tracking-tight text-[#0a0a0a] sm:text-3xl">
                      {s.value}
                    </p>
                    <p className="mt-1 text-[9px] font-medium uppercase tracking-[0.25em] text-[#0a0a0a]/55">
                      {s.label}
                    </p>
                  </div>
                ))}
              </div>
            </FadeUp>
          </div>
        </div>
      </div>
    </section>
  );
}
