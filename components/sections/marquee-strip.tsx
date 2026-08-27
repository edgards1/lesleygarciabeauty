"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

const WORDS = ["Novias", "UGC Creator", "Maquillaje Social", "Automaquillaje"];

function Row({ className = "" }: { className?: string }) {
  return (
    <div className={`flex items-center gap-10 pr-10 shrink-0 ${className}`}>
      {WORDS.map((word) => (
        <span key={word} className="flex items-center gap-10">
          <span className="whitespace-nowrap text-[clamp(3.5rem,9vw,8rem)] font-light uppercase tracking-[-0.03em] leading-none text-stroke select-none font-display">
            {word}
          </span>
          <span className="text-[clamp(1.5rem,3vw,2.5rem)] text-ash leading-none select-none">
            *
          </span>
        </span>
      ))}
    </div>
  );
}

export function MarqueeStrip() {
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const track = trackRef.current;
    if (!track) return;
    const tween = gsap.to(track, {
      xPercent: -50,
      duration: 30,
      ease: "none",
      repeat: -1,
    });
    return () => {
      tween.kill();
    };
  }, []);

  return (
    <div className="relative z-10 overflow-hidden border-y border-ink-black/10 bg-bone-white py-8 md:py-10">
      <div
        ref={trackRef}
        className="flex w-max will-change-transform"
        aria-hidden="true"
      >
        <Row />
        <Row />
      </div>
    </div>
  );
}
