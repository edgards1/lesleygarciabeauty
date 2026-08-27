"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

export function PageCurtain() {
  const wrapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const wrap = wrapRef.current;
    if (!wrap) return;

    const cols = wrap.querySelectorAll(".transition_column");

    const tl = gsap.timeline({
      defaults: { ease: "power4.inOut" },
    });

    tl.to(cols, {
      yPercent: -100,
      duration: 0.95,
      stagger: 0.06,
      delay: 0.35,
    }).set(wrap, { display: "none" });

    return () => {
      tl.kill();
    };
  }, []);

  return (
    <div ref={wrapRef} className="transition_wrap">
      <div className="transition_column" />
      <div className="transition_column" />
      <div className="transition_column" />
      <div className="transition_column" />
      <div className="transition_column" />
      <div className="transition_column" />
    </div>
  );
}
