"use client"

import { motion } from "motion/react"

interface StepHeaderProps {
  eyebrow?: string
  title: string
  description?: string
}

const EASE = [0.32, 0.72, 0, 1] as const

export function StepHeader({ eyebrow, title, description }: StepHeaderProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16, filter: "blur(4px)" }}
      animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      transition={{ duration: 0.7, ease: EASE }}
      className="mb-14 max-w-2xl"
    >
      {eyebrow && (
        <span className="mb-4 inline-block rounded-full bg-[#2D1B13]/5 px-4 py-1.5 font-sans text-[10px] font-bold uppercase tracking-[0.18em] text-[#C4956A]">
          {eyebrow}
        </span>
      )}
      <h2 className="font-serif text-[clamp(2rem,5vw,3.5rem)] font-semibold leading-[1.08] tracking-[-0.02em] text-[#2D1B13]">
        {title}
      </h2>
      {description && (
        <p className="mt-4 max-w-lg text-sm leading-relaxed text-[#6B5B50]/80">
          {description}
        </p>
      )}
    </motion.div>
  )
}
