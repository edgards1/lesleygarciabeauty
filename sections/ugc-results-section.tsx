"use client";

import { useEffect, useState } from "react";
import { motion, useInView, useReducedMotion } from "motion/react";
import { useRef } from "react";
import { ugcMetrics, ugcChartData } from "@/constants/ugc";
import type { MetricItem } from "@/types/content";

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

function MetricFigure({ metric, delay }: { metric: MetricItem; delay: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.5 });
  const reduce = useReducedMotion();
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!inView || reduce) {
      setCount(metric.value);
      return;
    }
    const start = performance.now();
    const duration = 1400;
    let raf = 0;
    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / duration);
      const eased = 1 - Math.pow(1 - t, 3);
      setCount(metric.value * eased);
      if (t < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, metric.value, reduce]);

  const display = count < 10 ? count.toFixed(1) : Math.round(count).toString();

  return (
    <FadeUp delay={delay}>
      <div ref={ref} className="border-t border-white/15 pt-6">
        <p className="text-[10px] font-medium uppercase tracking-[0.3em] text-white/55">
          {metric.label}
        </p>
        <p className="mt-3 font-serif text-5xl font-light tracking-tight text-white sm:text-6xl">
          {display}
          <span className="ml-1 text-xl text-white/60 sm:text-2xl">
            {metric.unit ?? metric.suffix ?? ""}
          </span>
        </p>
        <p className="mt-2 text-sm leading-relaxed text-white/55">
          {metric.description}
        </p>
      </div>
    </FadeUp>
  );
}

export function UgcResultsSection() {
  return (
    <section
      id="ugc-results"
      className="relative w-full overflow-hidden border-t border-black/10 bg-[#0a0a0a] py-20 text-white sm:py-28 lg:py-36"
    >
      <div className="mx-auto max-w-[1400px] px-5 sm:px-8 lg:px-12">
        {/* Header */}
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-8">
            <FadeUp>
              <div className="mb-8 flex items-center gap-4">
                <span className="h-px w-10 bg-white/60" />
                <span className="text-[10px] font-medium uppercase tracking-[0.3em] text-white/75">
                  04 — UGC & Resultados
                </span>
              </div>
            </FadeUp>
            <FadeUp delay={0.1}>
              <h2 className="font-serif text-4xl font-light leading-[1.02] tracking-[-0.035em] text-white sm:text-6xl lg:text-7xl">
                Contenido
                <br />
                que <span className="italic">convierte</span>
                <span className="font-script ml-3 text-[0.7em] not-italic font-normal text-white/55">
                  real data
                </span>
              </h2>
            </FadeUp>
          </div>
          <div className="lg:col-span-4 lg:pt-12">
            <FadeUp delay={0.2}>
              <p className="max-w-sm text-[15px] leading-relaxed text-white/65 sm:text-base">
                Métricas reales de campañas de belleza y skincare. Cero
                promesas vacías: datos de engagement, alcance y conversión
                medidos durante los últimos seis meses.
              </p>
            </FadeUp>
          </div>
        </div>

        {/* Metrics */}
        <div className="mt-16 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:mt-20 lg:grid-cols-4">
          {ugcMetrics.map((m, i) => (
            <MetricFigure key={m.id} metric={m} delay={i * 0.1} />
          ))}
        </div>

        {/* Chart: editorial */}
        <FadeUp delay={0.3}>
          <div className="mt-20 border-t border-white/15 pt-12">
            <div className="mb-10 flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-end">
              <div>
                <p className="text-[10px] font-medium uppercase tracking-[0.3em] text-white/55">
                  Engagement vs Conversión
                </p>
                <h3 className="mt-3 font-serif text-2xl font-light tracking-tight text-white sm:text-3xl">
                  Últimos 6 meses
                </h3>
              </div>
              <div className="flex items-center gap-6 text-[10px] font-medium uppercase tracking-[0.25em]">
                <span className="flex items-center gap-2 text-white/80">
                  <span className="h-px w-6 bg-white" />
                  Engagement
                </span>
                <span className="flex items-center gap-2 text-white/45">
                  <span className="h-px w-6 border-t border-dashed border-white/55" />
                  Conversión
                </span>
              </div>
            </div>

            <div className="grid grid-cols-6 items-end gap-2 sm:gap-4">
              {ugcChartData.map((d) => {
                const maxEng = 8;
                const maxConv = 5;
                const eng = (d.engagement / maxEng) * 100;
                const conv = (d.conversions / maxConv) * 100;
                return (
                  <div key={d.name} className="flex flex-col items-center gap-3">
                    <div className="flex h-44 w-full items-end justify-center gap-1 sm:gap-2">
                      <motion.div
                        initial={{ height: 0 }}
                        whileInView={{ height: `${eng}%` }}
                        viewport={{ once: true, amount: 0.5 }}
                        transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
                        className="w-full max-w-[24px] bg-white"
                      />
                      <motion.div
                        initial={{ height: 0 }}
                        whileInView={{ height: `${conv}%` }}
                        viewport={{ once: true, amount: 0.5 }}
                        transition={{ duration: 1.2, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
                        className="w-full max-w-[24px] border border-white/40 bg-transparent"
                      />
                    </div>
                    <p className="text-[9px] font-medium uppercase tracking-[0.25em] text-white/45">
                      {d.name}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </FadeUp>
      </div>
    </section>
  );
}
