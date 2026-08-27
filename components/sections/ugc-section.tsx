"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { FadeIn } from "@/components/animations/fade-in";

const BRANDS = [
  "SKINCARE CO",
  "BEAUTE",
  "GLOW LABS",
  "DERMA BEAUTY",
  "PURE COSMETICS",
];

function BrandRowContent() {
  return (
    <>
      {BRANDS.map((brand) => (
        <span key={brand} className="flex items-center gap-12 pr-12">
          <span className="whitespace-nowrap text-base uppercase tracking-[0.35em] text-graphite font-label">
            {brand}
          </span>
          <span className="text-ash select-none">*</span>
        </span>
      ))}
    </>
  );
}

function BrandRow({ direction = 1 }: { direction?: 1 | -1 }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const el = ref.current;
    if (!el) return;
    const tween = gsap.fromTo(
      el,
      { xPercent: direction === 1 ? 0 : -50 },
      {
        xPercent: direction === 1 ? -50 : 0,
        duration: 45,
        ease: "none",
        repeat: -1,
      }
    );
    return () => {
      tween.kill();
    };
  }, [direction]);

  return (
    <div ref={ref} className="flex w-max will-change-transform">
      <BrandRowContent />
      <BrandRowContent />
    </div>
  );
}

const ugcItems = [
  {
    src: "/img/social_1.webp",
    brand: "Skincare Brand",
    type: "Reel",
  },
  {
    src: "/img/social_2.webp",
    brand: "Cosmética",
    type: "Story",
  },
  {
    src: "/img/social_5.webp",
    brand: "Belleza Natural",
    type: "Post",
  },
  {
    src: "/img/social_8.webp",
    brand: "Beauty Brand",
    type: "Reel",
  },
  {
    src: "/img/social_9.webp",
    brand: "Skincare Premium",
    type: "Carrusel",
  },
  {
    src: "/img/social_10.webp",
    brand: "Cosmética Profesional",
    type: "Post",
  },
];

function UgcCard({
  item,
  keyPrefix,
}: {
  item: (typeof ugcItems)[number];
  keyPrefix: string;
}) {
  return (
    <div className="flex-shrink-0 w-[260px] md:w-[300px] group/card cursor-pointer">
      <div className="relative aspect-[3/4] overflow-hidden mb-4">
        <img
          src={item.src}
          alt={`UGC para ${item.brand}`}
          className="w-full h-full object-cover transition-transform duration-700 group-hover/card:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-ink-black/70 via-transparent to-transparent opacity-0 group-hover/card:opacity-100 transition-opacity duration-500" />
        <div className="absolute top-4 left-4">
          <span className="bg-bone-white/90 backdrop-blur-md text-ink-black text-[10px] font-normal uppercase tracking-widest px-3 py-1.5 rounded-full font-label">
            {item.type}
          </span>
        </div>
        <div className="absolute bottom-4 left-4 right-4 translate-y-4 opacity-0 group-hover/card:translate-y-0 group-hover/card:opacity-100 transition-all duration-500">
          <p className="text-xs text-bone-white/70 uppercase tracking-widest mb-1 font-label">
            Colaboración
          </p>
          <p className="text-sm font-normal text-bone-white font-body">
            {item.brand}
          </p>
        </div>
      </div>
    </div>
  );
}

export function UgcSection() {
  return (
    <section
      id="ugc"
      className="py-24 bg-bone-white text-ink-black relative overflow-hidden"
    >
      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header */}
        <FadeIn className="max-w-4xl mx-auto text-center mb-20">
          <div className="flex items-center justify-center gap-4 mb-8">
            <div className="h-px w-12 bg-ash" />
            <span className="text-[10px] font-normal uppercase tracking-[0.35em] text-graphite font-label">
              Colaboraciones con marcas de belleza
            </span>
            <div className="h-px w-12 bg-ash" />
          </div>

          <h2 className="text-5xl md:text-6xl font-display font-light text-ink-black mb-6 leading-[1.05] tracking-[-0.03em]">
            Contenido que
            <br />
            <span className="italic text-graphite">impulsa marcas</span>
          </h2>

          <p className="text-base text-graphite max-w-xl mx-auto leading-relaxed font-body">
            Colaboro con marcas de skincare y cosmética para crear contenido
            digital auténtico que conecta con audiencias y genera resultados
            medibles.
          </p>
        </FadeIn>

        {/* UGC Content Gallery — auto-scrolling marquee */}
        <FadeIn delay={0.2}>
          <div className="relative overflow-hidden">
            {/* Fade edges */}
            <div className="absolute left-0 top-0 bottom-0 w-16 bg-gradient-to-r from-bone-white to-transparent z-10 pointer-events-none" />
            <div className="absolute right-0 top-0 bottom-0 w-16 bg-gradient-to-l from-bone-white to-transparent z-10 pointer-events-none" />

            {/* Marquee track */}
            <div className="flex gap-5 animate-ugc-marquee w-max group-hover:[animation-play-state:paused]">
              {ugcItems.map((item, index) => (
                <UgcCard key={`a-${index}`} item={item} keyPrefix="a" />
              ))}
              {/* Duplicate for seamless loop */}
              {ugcItems.map((item, index) => (
                <UgcCard key={`b-${index}`} item={item} keyPrefix="b" />
              ))}
            </div>
          </div>
        </FadeIn>

        {/* Brand marquee — dual row, counter-rotating */}
        <div className="mt-16 overflow-hidden border-y border-ink-black/10 py-7">
          <p className="mb-6 text-center text-[10px] uppercase tracking-[0.3em] text-graphite font-normal font-label">
            Marcas que confían en mí
          </p>
          <div className="space-y-4">
            <BrandRow direction={1} />
            <BrandRow direction={-1} />
          </div>
        </div>

        {/* CTA */}
        <FadeIn delay={0.6} className="text-center mt-16">
          <a
            href="#contact"
            className="group inline-flex h-12 items-center justify-center rounded-full bg-ink-black px-8 text-sm text-bone-white transition-transform duration-300 hover:scale-[1.03] active:scale-95"
          >
            Trabajemos Juntos
          </a>
        </FadeIn>
      </div>
    </section>
  );
}
