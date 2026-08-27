"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

const ARTICLES = [
  {
    id: 1,
    title: "Guía de Preparación de Piel para Novias",
    tag: "Nupcial // Skincare",
    excerpt:
      "El cronograma ideal de 90 días para que el día de tu boda la base se funda como una segunda piel con brillo de porcelana.",
    image: "/img/novia_1.webp",
    href: "/agendar",
  },
  {
    id: 2,
    title: "Colorimetría y Resplandor en Pieles Ébano",
    tag: "Técnica // Masterclass",
    excerpt:
      "Aprende a identificar subtonos cálidos y neutros para evitar el efecto cenizo y conseguir una luminosidad multidimensional.",
    image: "/img/ebano_02.webp",
    href: "/agendar",
  },
  {
    id: 3,
    title: "El Auge del Contenido UGC para Marcas",
    tag: "UGC // Marketing",
    excerpt:
      "Por qué las marcas de belleza y cuidado facial están sustituyendo los anuncios estáticos por demostraciones orgánicas reales.",
    image: "/img/social_9.jpg",
    href: "/agendar",
  },
  {
    id: 4,
    title: "Automaquillaje: Menos Cobertura, Más Glow",
    tag: "Educación // Tips",
    excerpt:
      "Técnicas clave para construir una rutina de 15 minutos que resalte tus mejores facciones para el día a día y eventos.",
    image: "/img/automaquillaje.JPEG",
    href: "/agendar",
  },
];

export function CreativeNews() {
  const [startIndex, setStartIndex] = useState(0);

  const prev = () => {
    setStartIndex((prev) => Math.max(0, prev - 1));
  };

  const next = () => {
    setStartIndex((prev) => Math.min(ARTICLES.length - 1, prev + 1));
  };

  return (
    <section id="news" className="theme-light relative px-6 py-28 sm:px-10 sm:py-36 lg:px-16 border-b border-black/10">
      <div className="mx-auto max-w-[1700px]">
        {/* Header with Title and Slider Buttons */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-12 sm:mb-16">
          <div className="space-y-4">
            <div className="inline-flex items-center gap-2.5 font-label text-[10px] uppercase tracking-[0.3em] text-graphite">
              <span className="h-1.5 w-1.5 rounded-full bg-black" />
              <span>Novedades &amp; Artículos</span>
            </div>
            <h2 className="font-display text-[clamp(2.2rem,4.5vw,4.2rem)] font-light leading-[1.05] tracking-[-0.035em] text-[#0d0f12]">
              Mantente al día.
            </h2>
          </div>

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={prev}
              disabled={startIndex === 0}
              aria-label="Artículo anterior"
              className="h-12 w-12 rounded-full border border-black/15 flex items-center justify-center text-black transition-colors duration-300 hover:bg-black hover:text-white disabled:opacity-30 disabled:pointer-events-none active:scale-95"
              data-cursor="Anterior"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="m15 18-6-6 6-6" />
              </svg>
            </button>
            <button
              type="button"
              onClick={next}
              disabled={startIndex >= ARTICLES.length - 2}
              aria-label="Siguiente artículo"
              className="h-12 w-12 rounded-full border border-black/15 flex items-center justify-center text-black transition-colors duration-300 hover:bg-black hover:text-white disabled:opacity-30 disabled:pointer-events-none active:scale-95"
              data-cursor="Siguiente"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="m9 18 6-6-6-6" />
              </svg>
            </button>
          </div>
        </div>

        {/* Articles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {ARTICLES.map((article) => (
            <Link
              key={article.id}
              href={article.href}
              className="group flex flex-col space-y-5"
              data-cursor="Leer artículo"
            >
              {/* Image Container with Zoom Physics */}
              <div className="relative aspect-[16/11] w-full overflow-hidden rounded-2xl border border-black/10 bg-black/5">
                <Image
                  src={article.image}
                  alt={article.title}
                  fill
                  sizes="(max-width: 768px) 100vw, 25vw"
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                />
              </div>

              {/* Tag and Content */}
              <div className="space-y-2.5">
                <span className="font-label text-[10px] uppercase tracking-[0.25em] text-graphite">
                  {article.tag}
                </span>
                <h3 className="font-display text-xl font-normal leading-[1.25] tracking-tight text-black group-hover:text-graphite transition-colors">
                  {article.title}
                </h3>
                <p className="text-xs leading-[1.7] font-body text-graphite line-clamp-3">
                  {article.excerpt}
                </p>
              </div>

              <div className="pt-2">
                <span className="underline-link text-xs font-label uppercase tracking-widest text-black">
                  Leer más →
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
