"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { splitWordsToMasks } from "@/lib/split-text";

gsap.registerPlugin(ScrollTrigger, useGSAP);

export function CreativeWhat() {
  const sectionRef = useRef<HTMLElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const paragraphRef = useRef<HTMLParagraphElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        if (headlineRef.current) {
          const words = splitWordsToMasks(headlineRef.current);
          gsap.fromTo(
            words,
            { yPercent: 120, rotate: 1.2 },
            {
              yPercent: 0,
              rotate: 0,
              duration: 1.1,
              stagger: 0.035,
              ease: "power4.out",
              scrollTrigger: {
                trigger: headlineRef.current,
                start: "top 85%",
              },
            }
          );
        }

        if (paragraphRef.current) {
          gsap.fromTo(
            paragraphRef.current,
            { opacity: 0, y: 30 },
            {
              opacity: 1,
              y: 0,
              duration: 0.9,
              ease: "power3.out",
              scrollTrigger: {
                trigger: paragraphRef.current,
                start: "top 85%",
              },
            }
          );
        }

        if (cardsRef.current) {
          const items = cardsRef.current.children;
          gsap.fromTo(
            items,
            { opacity: 0, y: 40 },
            {
              opacity: 1,
              y: 0,
              duration: 0.8,
              stagger: 0.15,
              ease: "power3.out",
              scrollTrigger: {
                trigger: cardsRef.current,
                start: "top 85%",
              },
            }
          );
        }
      });
    },
    { scope: sectionRef }
  );

  return (
    <section
      ref={sectionRef}
      id="what"
      className="theme-light relative px-6 py-28 sm:px-10 sm:py-36 lg:px-16 border-b border-black/10"
    >
      <div className="mx-auto max-w-[1700px]">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-start">
          {/* Left Column: Eyebrow + Monumental Manifesto */}
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2.5 font-label text-[10px] uppercase tracking-[0.3em] text-graphite">
              <span className="h-1.5 w-1.5 rounded-full bg-black" />
              <span>Qué Hacemos</span>
            </div>

            <h2
              ref={headlineRef}
              className="font-display text-[clamp(2.2rem,4.4vw,4.4rem)] font-light leading-[1.04] tracking-[-0.035em] text-[#0d0f12]"
            >
              Somos artistas del detalle, educadoras y productoras visuales. Diseñamos
              experiencias de belleza y creamos contenido que trasciende el espejo.
            </h2>
          </div>

          {/* Right Column: Narrative + 3 Stat Cards */}
          <div className="lg:col-span-5 space-y-12 lg:pt-8">
            <p
              ref={paragraphRef}
              className="text-base sm:text-lg leading-[1.75] font-body text-graphite"
            >
              Vamos más allá del maquillaje tradicional. Nos dedicamos a escuchar tu historia,
              analizar tus facciones y crear un look a medida para el día de tu boda, tu evento
              social o la campaña de tu marca. El resultado es un acabado impecable, duradero y
              completamente auténtico.
            </p>

            {/* Impact Cards Grid */}
            <div ref={cardsRef} className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-6">
              {/* Stat 1 */}
              <div className="p-6 rounded-xl border border-black/10 bg-white/60 backdrop-blur-sm space-y-3 transition-transform duration-300 hover:-translate-y-1">
                <div className="flex items-center gap-3">
                  <div className="h-8 w-8 rounded-full bg-black/5 flex items-center justify-center text-black">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75">
                      <circle cx="12" cy="12" r="10" />
                      <path d="m4.93 4.93 4.24 4.24M14.83 14.83l4.24 4.24M14.83 9.17l4.24-4.24M4.93 19.07l4.24-4.24" />
                    </svg>
                  </div>
                  <span className="font-display text-3xl font-light tracking-tight text-black">
                    5+
                  </span>
                </div>
                <p className="text-xs font-label uppercase tracking-wider text-graphite leading-relaxed">
                  Años perfeccionando alta cosmética y novias.
                </p>
              </div>

              {/* Stat 2 */}
              <div className="p-6 rounded-xl border border-black/10 bg-white/60 backdrop-blur-sm space-y-3 transition-transform duration-300 hover:-translate-y-1">
                <div className="flex items-center gap-3">
                  <div className="h-8 w-8 rounded-full bg-black/5 flex items-center justify-center text-black">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75">
                      <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
                    </svg>
                  </div>
                  <span className="font-display text-3xl font-light tracking-tight text-black">
                    40+
                  </span>
                </div>
                <p className="text-xs font-label uppercase tracking-wider text-graphite leading-relaxed">
                  Novias radiantes en su gran día soñado.
                </p>
              </div>

              {/* Stat 3 */}
              <div className="p-6 rounded-xl border border-black/10 bg-white/60 backdrop-blur-sm space-y-3 transition-transform duration-300 hover:-translate-y-1">
                <div className="flex items-center gap-3">
                  <div className="h-8 w-8 rounded-full bg-black/5 flex items-center justify-center text-black">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75">
                      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                    </svg>
                  </div>
                  <span className="font-display text-3xl font-light tracking-tight text-black">
                    120+
                  </span>
                </div>
                <p className="text-xs font-label uppercase tracking-wider text-graphite leading-relaxed">
                  Producciones de moda, social y videos UGC.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
