"use client";

import { useRef } from "react";
import Image from "next/image";
import { FaWhatsapp } from "react-icons/fa";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { splitWordsToMasks } from "@/lib/split-text";

gsap.registerPlugin(ScrollTrigger, useGSAP);

const SERVICES = [
  {
    num: "01",
    title: "Maquillaje de novia",
    accent: "novia",
    featured: true,
    description:
      "Prueba previa para definir el look perfecto y aplicación el día de la boda. Una experiencia completa, de principio a fin.",
    image: "/img/novia_01.webp",
    alt: "Maquillaje de novia",
    href: "https://api.whatsapp.com/send?phone=593983366831&text=Hola%2C%20estoy%20interesada%20en%20el%20servicio%20de%20maquillaje%20de%20novia",
  },
  {
    num: "02",
    title: "Maquillaje social",
    accent: "social",
    description:
      "Fiestas, graduaciones, noches especiales. Un look que destaque en persona y en foto, sin perder naturalidad.",
    image: "/img/social_4.webp",
    alt: "Maquillaje social",
    href: "https://api.whatsapp.com/send?phone=593983366831&text=Hola%2C%20estoy%20interesada%20en%20el%20servicio%20de%20maquillaje%20social",
  },
  {
    num: "03",
    title: "Automaquillaje",
    accent: "automaquillaje",
    description:
      "Sesión uno a uno donde aprendes técnicas para tu rostro, tu estilo y tu presupuesto. Sales con una rutina propia.",
    image: "/img/ebano_1.webp",
    alt: "Clase de automaquillaje",
    href: "https://api.whatsapp.com/send?phone=593983366831&text=Hola%2C%20estoy%20interesada%20en%20el%20curso%20de%20automaquillaje",
  },
  {
    num: "04",
    title: "Contenido UGC",
    accent: "UGC",
    description:
      "Filmación, edición y entrega de contenido orgánico listo para publicar. Sin productor, sin complicaciones.",
    image: "/img/social_010.webp",
    alt: "Contenido UGC para marcas de belleza",
    href: "https://api.whatsapp.com/send?phone=593983366831&text=Hola%2C%20estoy%20interesada%20en%20el%20servicio%20de%20UGC",
  },
];

export function ServicesSection() {
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

        const lastWord = words[words.length - 1];
        if (lastWord) {
          lastWord.style.fontStyle = "italic";
          lastWord.style.color = "#666666";
        }

        gsap.fromTo(
          "[data-service-card]",
          { y: 56, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 1,
            stagger: 0.12,
            ease: "power3.out",
            scrollTrigger: {
              trigger: "[data-services-grid]",
              start: "top 78%",
            },
          }
        );
      });
    },
    { scope: sectionRef }
  );

  return (
    <section
      ref={sectionRef}
      id="services"
      className="relative overflow-hidden bg-bone-white"
    >
      <div className="mx-auto max-w-[1600px] px-5 sm:px-8 lg:px-12 xl:px-20 py-28 md:py-40">
        {/* Header */}
        <div className="mb-16 flex flex-col gap-8 md:mb-24 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="mb-6 font-label text-[10px] uppercase tracking-[0.3em] text-graphite">
              Servicios
            </p>
            <h2
              ref={titleRef}
              className="font-display text-[clamp(2.6rem,5vw,4.6rem)] font-light leading-[0.95] tracking-[-0.03em] text-ink-black max-w-3xl"
            >
              Cuatro maneras de brillar.
            </h2>
          </div>
          <p className="max-w-sm text-sm leading-[1.7] text-graphite md:text-right font-body">
            Del altar al set de filmación: cada servicio con acabado impecable,
            técnica profesional y atención al detalle.
          </p>
        </div>

        {/* Numbered cards 01-04 */}
        <div
          data-services-grid
          className="grid gap-4 md:grid-cols-2"
        >
          {SERVICES.map((service) => (
            <a
              key={service.num}
              data-service-card
              href={service.href}
              target="_blank"
              rel="noopener noreferrer"
              className={`group relative flex flex-col overflow-hidden p-8 transition-colors duration-500 ease-out md:p-10 ${
                service.featured
                  ? "bg-candy-pink"
                  : "border border-ink-black/10 bg-bone-white hover:border-ink-black"
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="font-label text-sm text-ash tabular-nums transition-colors duration-500 group-hover:text-ink-black">
                  {service.num}
                </span>
                <span className="flex h-10 w-10 items-center justify-center rounded-full border border-ink-black/15 text-graphite transition-colors duration-500 group-hover:border-ink-black group-hover:bg-ink-black group-hover:text-bone-white">
                  <FaWhatsapp className="h-4 w-4" />
                </span>
              </div>

              <h3 className="mt-14 font-display text-[clamp(1.7rem,3vw,2.4rem)] font-light tracking-[-0.02em] text-ink-black md:mt-20">
                {service.title}
              </h3>
              <p className="mt-4 max-w-sm text-sm leading-[1.7] text-graphite font-body">
                {service.description}
              </p>

              <div className="mt-10 aspect-[16/10] overflow-hidden bg-ash/20">
                <Image
                  src={service.image}
                  alt={service.alt}
                  width={800}
                  height={500}
                  sizes="(max-width: 768px) 100vw, 45vw"
                  className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.05]"
                />
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
