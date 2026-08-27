"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger, useGSAP);

const TEXT = Array.from("AGENDA TU CITA");

function MarqueeRow({ speed = 30, direction = "forward" }: { speed?: number; direction?: "forward" | "reverse" }) {
  const trackRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const mm = gsap.matchMedia();
    mm.add("(prefers-reduced-motion: no-preference)", () => {
      const track = trackRef.current;
      if (!track) return;

      if (direction === "reverse") {
        gsap.fromTo(track, { xPercent: -50 }, { xPercent: 0, duration: speed, ease: "none", repeat: -1 });
      } else {
        gsap.to(track, { xPercent: -50, duration: speed, ease: "none", repeat: -1 });
      }
    });
  }, []);

  return (
    <div ref={trackRef} className="flex w-max will-change-transform">
      {[0, 1].map((copy) => (
        <div key={copy} className="flex items-center pr-8">
          {TEXT.map((char, i) => (
            <span
              key={`${copy}-${i}`}
              className={`cm-char inline-block font-display text-[clamp(3rem,10vw,10rem)] font-light uppercase leading-none tracking-[-0.04em] select-none ${
                char === " " ? "w-[0.3em]" : "text-stroke"
              }`}
            >
              {char === " " ? "\u00A0" : char}
            </span>
          ))}
        </div>
      ))}
    </div>
  );
}

export function CharMarquee() {
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const chars = gsap.utils.toArray<HTMLElement>(".cm-char", sectionRef.current);
        gsap.fromTo(
          chars,
          { yPercent: 110, rotate: 4 },
          {
            yPercent: 0,
            rotate: 0,
            duration: 0.8,
            stagger: { amount: 0.3, from: "random" },
            ease: "power4.out",
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top 78%",
              end: "top 35%",
              scrub: true,
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
      className="relative overflow-hidden bg-bone-white border-b border-ink-black/10 py-24 md:py-40"
    >
      <div className="relative">
<div className="mb-6 overflow-hidden">
              <MarqueeRow speed={35} />
            </div>
            <div className="overflow-hidden">
              <MarqueeRow speed={45} direction="reverse" />
            </div>
      </div>
    </section>
  );
}
