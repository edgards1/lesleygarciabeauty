"use client";

import { useRef } from "react";
import Link from "next/link";
import { FaWhatsapp } from "react-icons/fa";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { splitWordsToMasks } from "@/lib/split-text";

gsap.registerPlugin(ScrollTrigger, useGSAP);

export function CtaFinal() {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const badgeRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const words = splitWordsToMasks(titleRef.current!);
        gsap.fromTo(
          words,
          { yPercent: 120, rotate: 2 },
          {
            yPercent: 0,
            rotate: 0,
            duration: 1.2,
            stagger: 0.06,
            ease: "power4.out",
            scrollTrigger: { trigger: titleRef.current, start: "top 82%" },
          }
        );

        if (badgeRef.current) {
          gsap.to(badgeRef.current, {
            rotation: 360,
            duration: 20,
            ease: "none",
            repeat: -1,
          });
        }

        const magnet = gsap.utils.toArray<HTMLElement>(".magnetic-wrap", sectionRef.current)[0];
        if (magnet) {
          const xTo = gsap.quickTo(magnet, "x", { duration: 0.4, ease: "power3" });
          const yTo = gsap.quickTo(magnet, "y", { duration: 0.4, ease: "power3" });
          const onMove = (e: MouseEvent) => {
            const r = magnet.getBoundingClientRect();
            xTo((e.clientX - (r.left + r.width / 2)) * 0.35);
            yTo((e.clientY - (r.top + r.height / 2)) * 0.35);
          };
          const onLeave = () => {
            xTo(0);
            yTo(0);
          };
          magnet.addEventListener("mousemove", onMove);
          magnet.addEventListener("mouseleave", onLeave);
          return () => {
            magnet.removeEventListener("mousemove", onMove);
            magnet.removeEventListener("mouseleave", onLeave);
          };
        }
      });
    },
    { scope: sectionRef }
  );

  return (
    <section
      ref={sectionRef}
      id="cta"
      className="relative overflow-hidden bg-navy-ink"
    >
      {/* Faint giant outline text behind — layered depth */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-1/2 -translate-y-1/2 text-center"
      >
        <span className="whitespace-nowrap text-[clamp(4rem,18vw,18rem)] font-light uppercase tracking-[-0.03em] leading-none text-stroke-bone-faint select-none font-display">
          Agenda tu cita
        </span>
      </div>

      <div className="relative mx-auto max-w-[1600px] px-5 py-40 text-center md:py-56 md:px-8">
        {/* Rotating circular badge */}
        <div
          ref={badgeRef}
          className="absolute right-8 top-14 z-10 hidden h-36 w-36 md:block lg:right-20 lg:top-24"
          aria-hidden="true"
        >
          <div className="relative h-full w-full">
            <svg viewBox="0 0 120 120" className="h-full w-full">
              <defs>
                <path
                  id="badge-circle"
                  d="M60,60 m-48,0 a48,48 0 1,1 96,0 a48,48 0 1,1 -96,0"
                />
              </defs>
              <text className="fill-bone-white/50 text-[9.5px] uppercase tracking-[0.18em]">
                <textPath href="#badge-circle">
                  Agenda tu cita * Agenda tu cita *
                </textPath>
              </text>
            </svg>
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="flex h-12 w-12 items-center justify-center rounded-full border border-bone-white/20 text-bone-white/80">
                <FaWhatsapp className="h-5 w-5" />
              </span>
            </div>
          </div>
        </div>

        <p className="mb-8 font-label text-[10px] uppercase tracking-[0.3em] text-bone-white/50">
          Un paso más
        </p>

        <h2
          ref={titleRef}
          className="font-display font-light italic text-[clamp(3rem,9vw,8.5rem)] leading-[1.02] tracking-[-0.02em] text-bone-white max-w-5xl mx-auto text-balance"
        >
          Lista para brillar?
        </h2>

        <div className="mt-14 flex flex-wrap items-center justify-center gap-5">
          <div className="magnetic-wrap">
            <Link
              href="/agendar"
              className="group inline-flex h-14 items-center justify-center rounded-full bg-bone-white px-10 text-sm text-navy-ink transition-transform duration-300 hover:scale-[1.03] active:scale-95"
            >
              Agenda tu Cita
            </Link>
          </div>
          <Link
            href="https://api.whatsapp.com/send?phone=593983366831&text=Hola%2C%20quisiera%20una%20consulta"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex h-12 items-center justify-center rounded-full border border-bone-white/25 px-8 text-sm text-bone-white transition-colors duration-300 hover:border-bone-white"
          >
            Escríbeme
          </Link>
        </div>
      </div>
    </section>
  );
}