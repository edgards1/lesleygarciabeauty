"use client";

import { useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { portfolioItems, portfolioCategories } from "@/constants/portfolio";
import type { PortfolioCategory } from "@/types/content";
import { LightboxDialog } from "@/components/shared/lightbox-dialog";

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

type Selected = { src: string; title: string; type: "image" | "video" } | null;

export function PortfolioSection() {
  const [filter, setFilter] = useState<PortfolioCategory | "All">("All");
  const [selected, setSelected] = useState<Selected>(null);

  const filtered =
    filter === "All"
      ? portfolioItems
      : portfolioItems.filter((i) => i.categories.includes(filter));

  return (
    <section
      id="portfolio"
      className="relative w-full overflow-hidden border-t border-black/10 bg-white py-20 sm:py-28 lg:py-36"
    >
      <div className="mx-auto max-w-[1400px] px-5 sm:px-8 lg:px-12">
        {/* Header */}
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-8">
            <FadeUp>
              <div className="mb-8 flex items-center gap-4">
                <span className="h-px w-10 bg-[#0a0a0a]" />
                <span className="text-[10px] font-medium uppercase tracking-[0.3em] text-[#0a0a0a]">
                  03 — Portfolio
                </span>
              </div>
            </FadeUp>
            <FadeUp delay={0.1}>
              <h2 className="font-serif text-4xl font-light leading-[1.02] tracking-[-0.035em] text-[#0a0a0a] sm:text-6xl lg:text-7xl xl:text-[5.5rem]">
                Trabajos
                <br />
                <span className="italic">seleccionados</span>
              </h2>
            </FadeUp>
          </div>
        </div>

        {/* Filter chips */}
        <FadeUp delay={0.2}>
          <div
            role="tablist"
            aria-label="Filtro de portfolio"
            className="mt-12 flex flex-wrap items-center gap-x-1 gap-y-2 border-b border-black/10 pb-4 lg:mt-16"
          >
            <button
              role="tab"
              aria-selected={filter === "All"}
              onClick={() => setFilter("All")}
              className={`group relative px-4 py-2 text-[10px] font-medium uppercase tracking-[0.25em] transition-colors ${
                filter === "All"
                  ? "text-[#0a0a0a]"
                  : "text-[#0a0a0a]/45 hover:text-[#0a0a0a]"
              }`}
            >
              Todos
              <span className="ml-1.5 font-script text-base text-[#0a0a0a]/40">
                {portfolioItems.length}
              </span>
              {filter === "All" && (
                <motion.span
                  layoutId="filter-underline"
                  className="absolute bottom-0 left-2 right-2 h-px bg-[#0a0a0a]"
                />
              )}
            </button>
            {portfolioCategories.map((cat) => {
              const count = portfolioItems.filter((i) => i.categories.includes(cat)).length;
              const isActive = filter === cat;
              return (
                <button
                  key={cat}
                  role="tab"
                  aria-selected={isActive}
                  onClick={() => setFilter(cat)}
                  className={`group relative px-4 py-2 text-[10px] font-medium uppercase tracking-[0.25em] transition-colors ${
                    isActive
                      ? "text-[#0a0a0a]"
                      : "text-[#0a0a0a]/45 hover:text-[#0a0a0a]"
                  }`}
                >
                  {cat}
                  <span className="ml-1.5 font-script text-base text-[#0a0a0a]/40">
                    {count}
                  </span>
                  {isActive && (
                    <motion.span
                      layoutId="filter-underline"
                      className="absolute bottom-0 left-2 right-2 h-px bg-[#0a0a0a]"
                    />
                  )}
                </button>
              );
            })}
          </div>
        </FadeUp>

        {/* Editorial grid */}
        <motion.div
          layout
          className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5 lg:grid-cols-4 lg:gap-6"
        >
          <AnimatePresence mode="popLayout">
            {filtered.map((item, i) => {
              const aspect = "aspect-[3/4]";
              return (
                <motion.button
                  key={item.id}
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 20 }}
                  transition={{ duration: 0.6, delay: i * 0.04, ease: [0.16, 1, 0.3, 1] }}
                  onClick={() =>
                    setSelected({
                      src: item.type === "video" ? (item.previewImage ?? item.src) : item.src,
                      title: item.alt,
                      type: "image",
                    })
                  }
                  className={`group relative overflow-hidden bg-stone-100 ${aspect}`}
                  aria-label={item.alt}
                >
                  <Image
                    src={item.type === "video" ? (item.previewImage ?? item.src) : item.src}
                    alt={item.alt}
                    fill
                    sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
                    className="object-cover transition-transform duration-[1500ms] ease-out group-hover:scale-[1.04]"
                    quality={85}
                  />
                  {item.type === "video" && (
                    <span className="absolute left-3 top-3 inline-flex items-center gap-1.5 bg-white/90 px-2.5 py-1 text-[9px] font-medium uppercase tracking-[0.25em] text-[#0a0a0a]">
                      <span className="h-1.5 w-1.5 rounded-full bg-[#0a0a0a]" />
                      Video
                    </span>
                  )}
                  <div className="absolute inset-0 flex flex-col justify-end bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100">
                    <div className="p-5 sm:p-7">
                      <p className="text-[9px] font-medium uppercase tracking-[0.3em] text-white/80">
                        {item.categories.join(" · ")}
                      </p>
                      <p className="mt-2 font-serif text-xl font-light italic text-white sm:text-2xl">
                        {item.alt}
                      </p>
                    </div>
                  </div>
                </motion.button>
              );
            })}
          </AnimatePresence>
        </motion.div>

        <FadeUp delay={0.2}>
          <div className="mt-14 flex flex-col items-center justify-between gap-4 border-t border-black/10 pt-8 sm:flex-row">
            <p className="text-[10px] font-medium uppercase tracking-[0.3em] text-[#0a0a0a]/55">
              {filtered.length} {filtered.length === 1 ? "trabajo" : "trabajos"} en esta categoría
            </p>
            <a
              href="#contact"
              className="group inline-flex items-center text-[11px] font-medium uppercase tracking-[0.25em] text-[#0a0a0a] transition-opacity hover:opacity-60"
            >
              Ver más en conversación
              <span className="ml-3 inline-block h-px w-7 bg-current transition-all duration-500 group-hover:w-12" />
            </a>
          </div>
        </FadeUp>
      </div>

      <LightboxDialog
        isOpen={Boolean(selected)}
        onOpenChange={(open) => !open && setSelected(null)}
        src={selected?.src ?? ""}
        title={selected?.title ?? ""}
        type={selected?.type ?? "image"}
      />
    </section>
  );
}
