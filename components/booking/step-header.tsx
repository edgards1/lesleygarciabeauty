"use client"

import type { ReactNode } from "react"
import { motion, useReducedMotion } from "motion/react"

interface StepHeaderProps {
  index?: number
  eyebrow?: string
  title: ReactNode
  description?: string
}

const EASE = [0.32, 0.72, 0, 1] as const

export function StepHeader({ index, eyebrow, title, description }: StepHeaderProps) {
  const reduce = useReducedMotion()
  const numeral = typeof index === "number" ? String(index + 1).padStart(2, "0") : null

  return (
    <div className="relative mb-7 max-w-2xl sm:mb-9">
      {numeral && (
        <motion.span
          aria-hidden
          initial={reduce ? { opacity: 0 } : { opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: EASE, delay: 0.1 }}
          className="pointer-events-none absolute -top-6 right-0 select-none font-serif text-[4.5rem] italic leading-none text-stone-500/15 sm:-top-8 sm:text-[6.5rem]"
        >
          {numeral}
        </motion.span>
      )}

      {eyebrow && (
        <motion.div
          initial={reduce ? { opacity: 0 } : { opacity: 0, x: -8 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, ease: EASE }}
          className="mb-4 flex items-center gap-3"
        >
          <motion.span
            initial={reduce ? false : { scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 0.9, ease: EASE, delay: 0.08 }}
            className="h-px w-8 origin-left bg-stone-500"
          />
          <span className="font-sans text-[10px] font-bold uppercase tracking-[0.3em] text-stone-500">
            {`${eyebrow}`}
          </span>
        </motion.div>
      )}

      <motion.h2
        initial={reduce ? { opacity: 0 } : { opacity: 0, y: 16, filter: "blur(5px)" }}
        animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
        transition={{ duration: 0.7, ease: EASE, delay: 0.06 }}
        className="font-serif text-[clamp(1.9rem,4vw,3.25rem)] font-semibold leading-[1.05] tracking-[-0.02em] text-stone-900"
      >
        {title}
      </motion.h2>

      {description && (
        <motion.p
          initial={reduce ? { opacity: 0 } : { opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: EASE, delay: 0.16 }}
          className="mt-3 max-w-lg font-sans text-sm leading-relaxed text-stone-500/80"
        >
          {description}
        </motion.p>
      )}
    </div>
  )
}
