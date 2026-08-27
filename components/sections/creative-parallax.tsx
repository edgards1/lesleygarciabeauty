"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const PARALLAX_MEDIA = [
  { type: "image", src: "/img/novia_glam_01.webp", alt: "Novia Glam", speed: 8 },
  { type: "video", src: "/img/video_piel_ebano.MOV", poster: "/img/ebano_2.webp", alt: "Piel Ébano", speed: 12 },
  { type: "image", src: "/img/social_1.jpg", alt: "Social Editorial", speed: 6 },
  { type: "image", src: "/img/novia_2.webp", alt: "Novia en estudio", speed: 10 },
  { type: "video", src: "/img/video_social_6.MOV", poster: "/img/social_3.webp", alt: "Maquillaje Social", speed: 7 },
];

export function CreativeParallax() {
  const sectionRef = useRef<HTMLElement>(null);
  const bannerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const mm = gsap.matchMedia();

    mm.add("(prefers-reduced-motion: no-preference)", () => {
      const wraps = section.querySelectorAll(".parallax-column-wrap");

      wraps.forEach((wrap, index) => {
        const speed = PARALLAX_MEDIA[index]?.speed || 8;
        gsap.to(wrap, {
          yPercent: speed * -12,
          ease: "none",
          scrollTrigger: {
            trigger: section,
            start: "top bottom",
            end: "bottom top",
            scrub: 1.2,
          },
        });
      });

      // Background color transition to cream as we exit
      gsap.to(section, {
        backgroundColor: "#fffef7",
        ease: "none",
        scrollTrigger: {
          trigger: section,
          start: "bottom 130%",
          end: "bottom 95%",
          scrub: true,
        },
      });

      // Banner text scale/reveal
      if (bannerRef.current) {
        gsap.fromTo(
          bannerRef.current,
          { opacity: 0, scale: 0.92, y: 30 },
          {
            opacity: 1,
            scale: 1,
            y: 0,
            duration: 0.9,
            ease: "power3.out",
            scrollTrigger: {
              trigger: bannerRef.current,
              start: "top 80%",
            },
          }
        );
      }
    });

    return () => {
      mm.revert();
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      id="experience"
      className="relative min-h-[90vh] lg:min-h-[110vh] w-full overflow-hidden bg-[#0d0f12] text-[#fffef7] py-24 sm:py-32 flex items-center justify-center transition-colors duration-700"
    >
      {/* Background Multi-Column Parallax Strip */}
      <div className="absolute inset-0 flex items-center justify-between opacity-35 px-4 sm:px-8 gap-3 sm:gap-6 pointer-events-none">
        {PARALLAX_MEDIA.map((item, idx) => (
          <div
            key={idx}
            className={`flex-1 h-[140%] overflow-hidden relative rounded-xl border border-white/10 ${
              idx > 2 ? "hidden sm:block" : ""
            } ${idx > 3 ? "hidden lg:block" : ""}`}
          >
            <div className="parallax-column-wrap absolute inset-0 w-full h-[130%] -top-[15%]">
              {item.type === "video" ? (
                <video
                  src={item.src}
                  poster={item.poster}
                  autoPlay
                  loop
                  muted
                  playsInline
                  className="h-full w-full object-cover grayscale contrast-125"
                />
              ) : (
                <Image
                  src={item.src}
                  alt={item.alt}
                  fill
                  sizes="20vw"
                  className="object-cover grayscale contrast-125"
                />
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Floating Center Banner */}
      <div
        ref={bannerRef}
        className="relative z-10 mx-auto max-w-3xl px-6 text-center"
      >
        <Link
          href="/agendar"
          className="group block p-10 sm:p-14 rounded-3xl border border-white/20 bg-black/65 backdrop-blur-xl shadow-2xl transition-all duration-500 hover:border-white/40 hover:bg-black/80 hover:scale-[1.02]"
          data-cursor="Reservar ahora"
        >
          <div className="inline-flex items-center gap-2.5 font-label text-[11px] uppercase tracking-[0.3em] text-[#ffd001] mb-6">
            <span className="h-1.5 w-1.5 rounded-full bg-[#ffd001] animate-ping" />
            <span>Comienza hoy</span>
          </div>

          <h2 className="font-display text-[clamp(2.4rem,5.5vw,5rem)] font-light leading-[1.02] tracking-[-0.035em] text-white">
            Hagamos realidad tu look soñado.
          </h2>

          <p className="mt-6 text-sm sm:text-base font-body text-white/70 max-w-lg mx-auto leading-relaxed">
            Desde la asesoría personalizada hasta el último toque antes de salir. Reserva tu fecha
            con anticipación para novias y eventos especiales.
          </p>

          <div className="mt-8 inline-flex items-center gap-3 text-xs font-label uppercase tracking-[0.2em] text-[#ffd001] group-hover:text-white transition-colors">
            <span>Iniciar Sesión de Descubrimiento</span>
            <span className="inline-block transition-transform duration-300 group-hover:translate-x-1.5">
              →
            </span>
          </div>
        </Link>
      </div>
    </section>
  );
}
