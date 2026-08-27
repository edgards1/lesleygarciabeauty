"use client";

import { useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { splitWordsToMasks } from "@/lib/split-text";

gsap.registerPlugin(ScrollTrigger, useGSAP);

const GALLERY = [
  { src: "/img/ebano_1.webp", alt: "Piel ebano — textura y glow", offset: "self-end", speed: -10 },
  { src: "/img/novia_1.webp", alt: "Maquillaje de novia en estudio", offset: "self-start", speed: 8 },
  { src: "/img/social_9.jpg", alt: "Sesion social editorial", offset: "self-end", speed: -6 },
];

const STATS = [
  { value: 5, suffix: "+", label: "Años de experiencia" },
  { value: 40, suffix: "+", label: "Novias maquilladas" },
  { value: 120, suffix: "+", label: "Looks creados" },
];

function Stat({ value, suffix, label }: { value: number; suffix: string; label: string }) {
  const numRef = useRef<HTMLSpanElement>(null);

  useGSAP(() => {
    const el = numRef.current;
    if (!el) return;
    const obj = { val: 0 };
    gsap.to(obj, {
      val: value,
      duration: 1.8,
      ease: "power3.out",
      snap: { val: 1 },
      scrollTrigger: {
        trigger: el,
        start: "top 90%",
        once: true,
      },
      onUpdate: () => {
        el.textContent = String(Math.round(obj.val)) + suffix;
      },
    });
  }, []);

  return (
    <div className="border-t border-ink-black/15 pt-6">
      <p className="font-display text-5xl md:text-6xl font-light tracking-[-0.03em] text-ink-black tabular-nums">
        <span ref={numRef}>0{suffix}</span>
      </p>
      <p className="mt-2 text-[10px] uppercase tracking-[0.25em] text-graphite font-label">
        {label}
      </p>
    </div>
  );
}

export function AboutSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const words = splitWordsToMasks(titleRef.current!);

        gsap.fromTo(
          words,
          { yPercent: 120, rotate: 1.5 },
          {
            yPercent: 0,
            rotate: 0,
            duration: 1.2,
            stagger: 0.045,
            ease: "power4.out",
            scrollTrigger: { trigger: titleRef.current, start: "top 82%" },
          },
        );

        const italics = words.slice(-3);
        italics.forEach((w) => {
          w.style.fontStyle = "italic";
          w.style.color = "#666666";
        });

        gsap.utils
          .toArray<HTMLElement>("[data-parallax]", sectionRef.current)
          .forEach((img) => {
            const speed = Number(img.dataset.speed ?? 8);
            gsap.fromTo(
              img,
              { yPercent: -speed },
              {
                yPercent: speed,
                ease: "none",
                scrollTrigger: {
                  trigger: img.closest("[data-figure]"),
                  start: "top bottom",
                  end: "bottom top",
                  scrub: true,
                },
              }
            );
          });
      });
    },
    { scope: sectionRef }
  );

  return (
    <section
      ref={sectionRef}
      id="about"
      className="relative overflow-hidden bg-bone-white"
    >
      <div className="mx-auto max-w-[1600px] px-5 sm:px-8 lg:px-12 xl:px-20">
        <div className="grid gap-16 py-28 md:py-40 lg:grid-cols-2 lg:gap-24">
          {/* Left — pinned editorial column */}
          <div className="lg:sticky lg:top-0 lg:flex lg:h-screen lg:items-center">
            <div>
              <p className="mb-6 font-label text-[10px] uppercase tracking-[0.3em] text-graphite">
                De qué se trata todo esto
              </p>

              <h2
                ref={titleRef}
                className="font-display text-[clamp(2.6rem,5vw,4.6rem)] font-light leading-[0.95] tracking-[-0.03em] text-ink-black max-w-xl"
              >
                La artista detrás del pincel.
              </h2>

              <p className="mt-8 max-w-md text-[15px] leading-[1.8] text-graphite font-body">
                Soy maquilladora profesional especializada en pieles ébano.
                Cada look nace de un proceso: escuchar, observar tu piel y
                construir un maquillaje que te represente — del altar a la
                pasarela, con acabado impecable y de larga duración.
              </p>
              <p className="mt-5 max-w-md text-[15px] leading-[1.8] text-graphite font-body">
                También enseño automaquillaje y creo contenido UGC para marcas
                de belleza que quieren conectar con audiencias reales.
              </p>

              <div className="mt-14 grid grid-cols-3 gap-8">
                {STATS.map((stat) => (
                  <Stat key={stat.label} {...stat} />
                ))}
              </div>
            </div>
          </div>

          {/* Right — parallax gallery */}
          <div className="flex flex-col gap-12 md:gap-16">
            {GALLERY.map((item, index) => (
              <figure
                key={item.src}
                data-figure
                className={`relative w-[88%] md:w-[78%] ${item.offset}`}
                style={{ marginTop: index === 0 ? undefined : "-4rem" }}
              >
                <div className="relative aspect-[3/4] overflow-hidden bg-ash/20">
                  <div
                    data-parallax
                    data-speed={item.speed}
                    className="absolute -inset-y-[12%] inset-x-0 will-change-transform"
                  >
                    <Image
                      src={item.src}
                      alt={item.alt}
                      fill
                      sizes="(max-width: 1024px) 90vw, 40vw"
                      className="object-cover"
                    />
                  </div>
                  <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-ink-black/40 to-transparent" />
                  <figcaption className="absolute bottom-5 left-5 font-label text-[10px] uppercase tracking-[0.25em] text-bone-white">
                    {String(index + 1).padStart(2, "0")} — {item.alt}
                  </figcaption>
                </div>
              </figure>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
