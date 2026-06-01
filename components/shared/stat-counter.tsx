"use client";

import { useEffect, useRef } from "react";
import { animate, useMotionValue, useReducedMotion } from "motion/react";

interface StatCounterProps {
  value: number;
  suffix?: string;
  unit?: string;
  className?: string;
}

export function StatCounter({ value, suffix, unit, className }: StatCounterProps) {
  const reduce = useReducedMotion();
  const motionValue = useMotionValue(0);
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (!ref.current) return;

    if (reduce) {
      ref.current.textContent = `${formatValue(value, unit)}${suffix ?? ""}`;
      return;
    }

    const controls = animate(motionValue, value, {
      duration: 1.2,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (latest) => {
        if (!ref.current) return;
        ref.current.textContent = `${formatValue(latest, unit)}${suffix ?? ""}`;
      },
    });

    return () => controls.stop();
  }, [motionValue, reduce, suffix, unit, value]);

  return <span ref={ref} className={className} />;
}

function formatValue(value: number, unit?: string) {
  const rounded = unit ? Math.round(value * 10) / 10 : Math.round(value);
  const formatted = rounded.toLocaleString("es-EC", {
    minimumFractionDigits: unit || value % 1 !== 0 ? 1 : 0,
    maximumFractionDigits: unit || value % 1 !== 0 ? 1 : 0,
  });

  return unit ? `${formatted}${unit}` : formatted;
}
