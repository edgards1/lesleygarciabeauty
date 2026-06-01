"use client"

import React from "react"

interface SectionHeaderProps {
  number?: string
  eyebrow?: string
  title: React.ReactNode
  subtitle?: string
  className?: string
}

export function SectionHeader({ number, eyebrow, title, subtitle, className = "" }: SectionHeaderProps) {
  return (
    <div className={className}>
      <div className="grid lg:grid-cols-[auto_1fr] gap-1 lg:gap-12 items-center">
        {number && (
          <div className="text-6xl sm:text-8xl font-bold text-stone-200 dark:text-stone-800 leading-none">
            {number}
          </div>
        )}

        <div className="space-y-6">
          {eyebrow && (
            <p className="text-xs uppercase tracking-[0.3em] text-stone-500 dark:text-stone-400 font-semibold mb-3">
              {eyebrow}
            </p>
          )}

          <div>
            <h2 className="text-5xl sm:text-7xl font-black text-stone-900 dark:text-stone-100 leading-tight">
              {title}
            </h2>
          </div>

          {subtitle && (
            <p className="text-base text-stone-600 dark:text-stone-400 leading-relaxed max-w-2xl">
              {subtitle}
            </p>
          )}
        </div>
      </div>
    </div>
  )
}
