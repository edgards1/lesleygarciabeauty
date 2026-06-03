"use client";

import { motion, useReducedMotion } from "motion/react";
import Link from "next/link";
import { services } from "@/constants/services";
import { siteConfig } from "@/constants/site";

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

const ICONS: Record<string, React.ReactNode> = {
  brush: (
    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M9.06 11.9 22 2l-9.94 9.94" />
      <path d="M16 13a4 4 0 0 1 0 6l-4 4-6-6 4-4a4 4 0 0 1 4-2" />
      <circle cx="12" cy="12" r="1" />
    </svg>
  ),
  glow: (
    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 2v4M12 18v4M2 12h4M18 12h4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83" />
      <circle cx="12" cy="12" r="4" />
    </svg>
  ),
  camera: (
    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M14.5 4h-5L7 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3l-2.5-3z" />
      <circle cx="12" cy="13" r="3.5" />
    </svg>
  ),
  ugc: (
    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path d="m10 9 5 3-5 3V9z" />
    </svg>
  ),
  tiktok: (
    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5" />
    </svg>
  ),
  reels: (
    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="6" y="2" width="12" height="20" rx="3" />
      <path d="M12 18h.01" />
    </svg>
  ),
  review: (
    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M7 11V7a5 5 0 0 1 10 0v4" />
      <rect x="5" y="11" width="14" height="10" rx="2" />
      <path d="M12 17v-2" />
    </svg>
  ),
};

export function ServicesSection() {
  return (
    <section
      id="services"
      className="relative w-full overflow-hidden border-t border-black/10 bg-white py-20 sm:py-28 lg:py-36"
    >
      <div className="mx-auto max-w-[1400px] px-5 sm:px-8 lg:px-12">
        {/* Header */}
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-7">
            <FadeUp>
              <div className="mb-8 flex items-center gap-4">
                <span className="h-px w-10 bg-[#0a0a0a]" />
                <span className="text-[10px] font-medium uppercase tracking-[0.3em] text-[#0a0a0a]">
                  02 — Servicios
                </span>
              </div>
            </FadeUp>
            <FadeUp delay={0.1}>
              <h2 className="font-serif text-4xl font-light leading-[1.02] tracking-[-0.035em] text-[#0a0a0a] sm:text-6xl lg:text-7xl">
                Servicios
                <br />
                <span className="italic">para marcas</span>
                <br />y novias
                <span className="font-script ml-3 text-[0.7em] not-italic font-normal text-[#0a0a0a]/70">
                  by Lesley
                </span>
              </h2>
            </FadeUp>
          </div>

          <div className="lg:col-span-5 lg:pt-16">
            <FadeUp delay={0.2}>
              <p className="max-w-md text-[15px] leading-relaxed text-[#0a0a0a]/75 sm:text-base">
                Maquillaje editorial, novias y contenido UGC con foco en
                resultado. Sesiones claras, propuestas a la medida y entregables
                listos para cámara y redes.
              </p>
            </FadeUp>
            <FadeUp delay={0.3}>
              <Link
                href={siteConfig.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                className="group mt-8 inline-flex items-center text-[11px] font-medium uppercase tracking-[0.25em] text-[#0a0a0a] transition-opacity hover:opacity-60"
              >
                Solicitar propuesta
                <span className="ml-3 inline-block h-px w-7 bg-current transition-all duration-500 group-hover:w-12" />
              </Link>
            </FadeUp>
          </div>
        </div>

        {/* Services list */}
        <div className="mt-16 border-t border-black/10 lg:mt-24">
          {services.map((service, i) => (
            <FadeUp key={service.id} delay={i * 0.06}>
              <a
                href={siteConfig.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative grid grid-cols-12 items-center gap-4 border-b border-black/10 py-7 transition-colors duration-500 hover:bg-black/[0.02] sm:py-9"
              >
                <span className="col-span-2 font-script text-2xl text-[#0a0a0a]/30 sm:col-span-1 sm:text-3xl">
                  0{i + 1}
                </span>
                <div className="col-span-10 sm:col-span-7">
                  <h3 className="font-serif text-2xl font-light tracking-tight text-[#0a0a0a] transition-colors duration-300 group-hover:text-[#0a0a0a] sm:text-3xl md:text-4xl">
                    {service.title}
                  </h3>
                  <p className="mt-2 max-w-xl text-sm leading-relaxed text-[#0a0a0a]/60 sm:text-[15px]">
                    {service.description}
                  </p>
                </div>
                <div className="col-span-2 hidden text-[#0a0a0a]/35 transition-colors duration-500 group-hover:text-[#0a0a0a] sm:col-span-3 sm:flex sm:justify-end">
                  <span className="inline-block transition-transform duration-500 ease-out group-hover:scale-110">
                    {ICONS[service.icon]}
                  </span>
                </div>
                <div className="col-span-12 flex items-center justify-end gap-3 sm:col-span-1 sm:justify-end">
                  <span className="text-[10px] font-medium uppercase tracking-[0.25em] text-[#0a0a0a]/55 transition-colors duration-300 group-hover:text-[#0a0a0a]">
                    {service.cta}
                  </span>
                  <span className="inline-block h-px w-7 bg-current transition-all duration-500 group-hover:w-10" />
                </div>
              </a>
            </FadeUp>
          ))}
        </div>
      </div>
    </section>
  );
}
