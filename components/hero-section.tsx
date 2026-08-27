"use client";

import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { splitWordsToMasks } from "@/lib/split-text";
import { getLenis } from "@/components/lenis-smooth";

gsap.registerPlugin(ScrollTrigger, useGSAP);

function smoothScrollTo(id: string) {
  const el = document.getElementById(id);
  if (!el) return;
  const top = el.getBoundingClientRect().top + window.scrollY - 24;
  const lenis = getLenis();
  if (lenis) {
    lenis.scrollTo(top, { duration: 1.4 });
  } else {
    window.scrollTo({ top, behavior: "smooth" });
  }
}

export function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const line1Ref = useRef<HTMLSpanElement>(null);
  const line2Ref = useRef<HTMLSpanElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        if (line1Ref.current) {
          const words = splitWordsToMasks(line1Ref.current);
          gsap.fromTo(
            words,
            { yPercent: 120 },
            { yPercent: 0, duration: 1.2, stagger: 0.07, ease: "power4.out", delay: 0.1 }
          );
        }
        if (line2Ref.current) {
          const words = splitWordsToMasks(line2Ref.current);
          gsap.fromTo(
            words,
            { yPercent: 120 },
            { yPercent: 0, duration: 1.2, stagger: 0.07, ease: "power4.out", delay: 0.25 }
          );
        }

        gsap.fromTo(
          "[data-hero-fade]",
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 1, stagger: 0.12, ease: "power3.out", delay: 0.5 }
        );

        if (imageRef.current) {
          gsap.fromTo(
            imageRef.current.querySelector("img"),
            { scale: 1.12 },
            {
              scale: 1,
              ease: "none",
              scrollTrigger: {
                trigger: imageRef.current,
                start: "top bottom",
                end: "bottom top",
                scrub: true,
              },
            }
          );
        }
      });
    },
    { scope: sectionRef }
  );

  return (
    <section ref={sectionRef} id="hero" className="relative w-full bg-bone-white">
      {/* Display block — oversized weight-300 poster headline (~40% viewport) */}
      <div className="px-5 pt-28 pb-10 sm:px-8 sm:pt-36 sm:pb-14 lg:px-10">
        <p
          data-hero-fade
          className="font-label text-xs uppercase tracking-[0.02em] text-graphite"
        >
          Makeup Artist &amp; UGC Creator — Guayaquil, Ecuador
        </p>

        <h1 className="mt-6 font-display font-light leading-[1.0] tracking-[-0.04em] text-ink-black">
          <span
            ref={line1Ref}
            className="block text-[clamp(3.4rem,12vw,10.5rem)]"
          >
            Lesley
          </span>
          <span
            ref={line2Ref}
            className="block text-[clamp(3.4rem,12vw,10.5rem)]"
          >
            García
          </span>
        </h1>

        <div className="mt-10 flex flex-wrap items-end justify-between gap-8">
          <p
            data-hero-fade
            className="max-w-md text-base leading-[1.5] tracking-[-0.018em] text-graphite font-body"
          >
            Maquillaje social, novias y contenido UGC para marcas de belleza
            que buscan imagen impecable y resultados medibles.
          </p>

          <div data-hero-fade className="flex flex-wrap items-center gap-3">
            <Link
              href="/agendar"
              className="inline-flex h-12 items-center justify-center rounded-full bg-ink-black px-8 text-sm text-bone-white transition-transform duration-300 hover:scale-[1.03] active:scale-95"
            >
              Agenda tu cita
            </Link>
            <button
              type="button"
              onClick={() => smoothScrollTo("portfolio")}
              className="inline-flex h-12 items-center justify-center rounded-full border border-ash px-8 text-sm text-ink-black transition-colors duration-300 hover:border-ink-black"
            >
              Ver portfolio
            </button>
          </div>
        </div>
      </div>

      {/* Full-bleed image band — sharp corners, bottom-left meta + statement */}
      <div ref={imageRef} className="relative h-[72vh] w-full overflow-hidden">
        <Image
          src="/img/portada.jpeg"
          alt="Lesley Garcia — Maquilladora profesional y creadora UGC"
          fill
          priority
          fetchPriority="high"
          sizes="100vw"
          className="object-cover object-center"
          quality={88}
        />

        <div className="absolute bottom-8 left-5 sm:left-8 lg:left-10">
          <p className="font-label text-xs uppercase tracking-[0.02em] text-bone-white/90">
            Guayaquil, Ecuador
          </p>
          <p className="mt-3 max-w-md font-display text-[clamp(1.4rem,3vw,2.1rem)] font-light leading-[1.15] tracking-[-0.02em] text-bone-white">
            Belleza que cuenta una historia real.
          </p>
        </div>

        <div className="absolute bottom-8 right-5 hidden items-center gap-3 sm:right-8 sm:flex lg:right-10">
          <span className="font-label text-xs uppercase tracking-[0.02em] text-bone-white/80">
            Scroll
          </span>
          <span className="h-px w-10 bg-bone-white/60" />
        </div>
      </div>
    </section>
  );
}
