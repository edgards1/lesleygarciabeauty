"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const PROJECTS = [
  {
    number: "01",
    title: "Novia Alta Costura",
    subtitle: "Look nupcial de acabado luminoso y larga duración",
    image: "/img/novia_01.webp",
    tags: ["Novias", "Guayaquil", "Piel Porcelana", "Boda"],
    description:
      "Diseño de look nupcial personalizado con prueba previa y preparación intensiva de piel. Acabado impecable de 16 horas resistente a lágrimas y climas cálidos.",
    href: "/agendar",
  },
  {
    number: "02",
    title: "Piel Ébano Glow",
    subtitle: "Colorimetría y luminosidad en pieles morenas y negras",
    image: "/img/ebano_1.webp",
    video: "/img/video_ebano_1.MOV",
    tags: ["Piel Ébano", "Colorimetría", "Glow Terciopelo", "Editorial"],
    description:
      "Técnica insignia especializada en neutralizar subtonos fríos o cenizos para revelar un resplandor dorado y aterciopelado con máxima fidelidad de color.",
    href: "/agendar",
  },
  {
    number: "03",
    title: "Social Glam Red Carpet",
    subtitle: "Maquillaje de impacto para galas y alfombra roja",
    image: "/img/social_4.webp",
    tags: ["Social", "Gala", "Fotografía HD", "Smokey Eyes"],
    description:
      "Estructura de mirada profunda, contornos precisos y labios esculpidos. Creado especialmente para lucir impecable tanto ante flashes de cámara como en persona.",
    href: "/agendar",
  },
  {
    number: "04",
    title: "Campaña UGC Beauty",
    subtitle: "Producción audiovisual para marcas cosméticas",
    image: "/img/social_010.webp",
    tags: ["UGC Creator", "Marcas Cosméticas", "Filmación 4K", "Viral Hook"],
    description:
      "Creación, filmación y edición de piezas audiovisuales orgánicas de alta retención para marcas de belleza y cuidado facial que buscan credibilidad y ventas.",
    href: "/agendar",
  },
];

export function CreativeProjectsScroll() {
  const containerRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const progressBarRef = useRef<HTMLDivElement>(null);
  const [currentNumber, setCurrentNumber] = useState(1);

  useEffect(() => {
    const container = containerRef.current;
    const track = trackRef.current;
    const progressBar = progressBarRef.current;
    if (!container || !track) return;

    const mm = gsap.matchMedia();

    // Desktop: Pinned horizontal scroll
    mm.add("(min-width: 991px)", () => {
      const getScrollWidth = () => track.scrollWidth - window.innerWidth;
      let scrollWidth = getScrollWidth();

      const horizontalTween = gsap.to(track, {
        x: () => -scrollWidth,
        ease: "none",
        scrollTrigger: {
          trigger: container,
          start: "top top",
          end: () => `+=${scrollWidth}`,
          pin: true,
          scrub: 1.15,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      });

      // Progress bar tween
      if (progressBar) {
        gsap.to(progressBar, {
          width: "100%",
          ease: "none",
          scrollTrigger: {
            trigger: container,
            start: "top top",
            end: () => `+=${scrollWidth}`,
            scrub: 0.8,
          },
        });
      }

      // Track current slide number and parallax depth for items
      const items = track.querySelectorAll(".project-panel");
      items.forEach((item, idx) => {
        ScrollTrigger.create({
          trigger: item,
          containerAnimation: horizontalTween,
          start: "left 50%",
          end: "right 50%",
          onEnter: () => setCurrentNumber(idx + 1),
          onEnterBack: () => setCurrentNumber(idx + 1),
        });

        // Parallax for text, image, and meta
        const leftCol = item.querySelector(".parallax-left");
        const middleCol = item.querySelector(".parallax-middle");
        const rightCol = item.querySelector(".parallax-right");

        if (leftCol) {
          gsap.to(leftCol, {
            xPercent: -15,
            ease: "none",
            scrollTrigger: {
              containerAnimation: horizontalTween,
              trigger: item,
              start: "left right",
              end: "right left",
              scrub: 2,
            },
          });
        }

        if (middleCol) {
          gsap.to(middleCol, {
            xPercent: -35,
            ease: "none",
            scrollTrigger: {
              containerAnimation: horizontalTween,
              trigger: item,
              start: "left right",
              end: "right left",
              scrub: 2,
            },
          });
        }

        if (rightCol) {
          gsap.to(rightCol, {
            xPercent: -55,
            ease: "none",
            scrollTrigger: {
              containerAnimation: horizontalTween,
              trigger: item,
              start: "left right",
              end: "right left",
              scrub: 2,
            },
          });
        }
      });

      return () => {
        horizontalTween.kill();
      };
    });

    return () => {
      mm.revert();
    };
  }, []);

  return (
    <section
      ref={containerRef}
      id="projects"
      className="theme-dark relative w-full overflow-hidden bg-[#0d0f12] text-[#fffef7]"
    >
      {/* Horizontal Track Wrapper */}
      <div
        ref={trackRef}
        className="flex w-full min-h-screen lg:h-screen lg:w-max flex-col lg:flex-row will-change-transform"
      >
        {PROJECTS.map((project, idx) => (
          <div
            key={project.number}
            className="project-panel flex w-full lg:w-[100vw] h-auto lg:h-full flex-col justify-center px-6 py-20 sm:px-12 sm:py-24 lg:px-20 border-b lg:border-b-0 lg:border-r border-white/10"
          >
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center max-w-[1700px] mx-auto w-full my-auto">
              {/* Left Column: Number Eyebrow & Giant Headline */}
              <div className="parallax-left lg:col-span-4 space-y-4">
                <div className="inline-flex items-center gap-2.5 font-label text-[10px] uppercase tracking-[0.3em] text-white/50">
                  <span className="h-1.5 w-1.5 rounded-full bg-[#ffd001]" />
                  <span>Proyecto {project.number}</span>
                </div>
                <h3 className="font-display text-[clamp(2.2rem,4.5vw,4.6rem)] font-light leading-[1.0] tracking-[-0.035em] text-white">
                  {project.title}
                </h3>
                <p className="font-label text-xs uppercase tracking-widest text-white/60">
                  {project.subtitle}
                </p>
              </div>

              {/* Middle Column: Large Interactive Media Card */}
              <div className="parallax-middle lg:col-span-5">
                <Link
                  href={project.href}
                  className="group relative block aspect-[4/5] sm:aspect-[16/11] lg:aspect-[4/3] w-full overflow-hidden rounded-2xl border border-white/15 bg-white/5 shadow-2xl"
                  data-cursor="Ver proyecto"
                >
                  <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    sizes="(max-width: 1024px) 100vw, 45vw"
                    className="object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <div className="absolute bottom-6 left-6 right-6 flex items-center justify-between opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <span className="font-label text-xs uppercase tracking-[0.2em] text-white">
                      Explorar detalles
                    </span>
                    <span className="h-8 w-8 rounded-full bg-white text-black flex items-center justify-center">
                      <svg width="10" height="10" viewBox="0 0 12 12" fill="none">
                        <path
                          d="M1 11L11 1M11 1H3M11 1V9"
                          stroke="currentColor"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                        />
                      </svg>
                    </span>
                  </div>
                </Link>
              </div>

              {/* Right Column: Tags & Narrative Excerpt */}
              <div className="parallax-right lg:col-span-3 space-y-6">
                <div className="flex flex-wrap gap-2">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-3.5 py-1 rounded-full border border-white/15 bg-white/5 text-[11px] font-label uppercase tracking-wider text-white/80"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <p className="text-sm sm:text-base leading-[1.75] font-body text-white/70">
                  {project.description}
                </p>
                <div className="pt-2">
                  <Link
                    href="/agendar"
                    className="underline-link text-xs font-label uppercase tracking-[0.2em] text-[#ffd001]"
                    data-cursor="Reservar"
                  >
                    Agendar este servicio →
                  </Link>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Floating Bottom Bar: Progress Bar & Pagination Counter (Desktop Only) */}
      <div className="hidden lg:block absolute bottom-8 left-0 right-0 z-20 px-12 lg:px-16 pointer-events-none">
        <div className="mx-auto max-w-[1700px] flex items-center justify-between gap-8 pointer-events-auto">
          {/* Progress Bar Line */}
          <div className="flex-1 max-w-md h-0.5 bg-white/20 rounded-full overflow-hidden">
            <div
              ref={progressBarRef}
              className="h-full w-0 bg-[#ffd001] transition-all ease-linear"
            />
          </div>

          {/* Pagination Counter and All Projects Link */}
          <div className="flex items-center gap-8 text-xs font-label uppercase tracking-[0.2em] text-white/80">
            <div className="tabular-nums">
              [ <span className="text-[#ffd001] font-medium">{currentNumber}</span> / {PROJECTS.length} ]
            </div>
            <Link
              href="/agendar"
              className="flex items-center gap-2 text-white hover:text-[#ffd001] transition-colors"
              data-cursor="Ver todo"
            >
              <span>Ver portafolio completo</span>
              <svg width="10" height="10" viewBox="0 0 12 12" fill="none">
                <path
                  d="M1 11L11 1M11 1H3M11 1V9"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                />
              </svg>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
