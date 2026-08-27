"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

export function CreativeCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const badgeRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Disable on touch devices
    if (window.matchMedia("(hover: none) and (pointer: coarse)").matches) {
      return;
    }

    const dot = dotRef.current;
    const badge = badgeRef.current;
    if (!dot || !badge) return;

    // High performance quickTo setters
    const xDotTo = gsap.quickTo(dot, "x", { duration: 0.15, ease: "power3.out" });
    const yDotTo = gsap.quickTo(dot, "y", { duration: 0.15, ease: "power3.out" });

    const xBadgeTo = gsap.quickTo(badge, "x", { duration: 0.35, ease: "power3.out" });
    const yBadgeTo = gsap.quickTo(badge, "y", { duration: 0.35, ease: "power3.out" });

    let currentTarget: HTMLElement | null = null;
    let badgeText = "";

    const onMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e;

      // Update dot
      xDotTo(clientX);
      yDotTo(clientY);

      // Edge detection for badge offset
      const badgeWidth = badge.offsetWidth || 120;
      const isRightEdge = clientX + badgeWidth + 24 > window.innerWidth;
      const isBottomEdge = clientY + 50 > window.innerHeight;

      const offsetX = isRightEdge ? -badgeWidth - 14 : 16;
      const offsetY = isBottomEdge ? -40 : 16;

      xBadgeTo(clientX + offsetX);
      yBadgeTo(clientY + offsetY);

      // Check current target under cursor for data-cursor attribute
      const el = (e.target as HTMLElement)?.closest("[data-cursor]") as HTMLElement | null;
      if (el && el !== currentTarget) {
        currentTarget = el;
        const text = el.getAttribute("data-cursor") || "";
        if (text !== badgeText) {
          badgeText = text;
          badge.textContent = text;
        }
        gsap.to(badge, { opacity: 1, scale: 1, duration: 0.25, ease: "power2.out" });
      } else if (!el && currentTarget) {
        currentTarget = null;
        gsap.to(badge, { opacity: 0, scale: 0.85, duration: 0.2, ease: "power2.in" });
      }
    };

    window.addEventListener("mousemove", onMouseMove);

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
    };
  }, []);

  return (
    <>
      <div ref={dotRef} className="cursor-dot pointer-events-none" />
      <div ref={badgeRef} className="cursor-badge pointer-events-none" />
    </>
  );
}
