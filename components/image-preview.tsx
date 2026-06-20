"use client"

import { useState } from "react"
import Image from "next/image"

interface ImagePreviewProps {
  src: string
  hoverImage?: string
  alt: string
  className?: string
  category: string | string[]
  priority?: boolean
}

const smoothTransition = "all 800ms cubic-bezier(0.32,0.72,0,1)"
const shellTransition = "all 700ms cubic-bezier(0.32,0.72,0,1)"

export function ImagePreview({
  src,
  hoverImage,
  alt,
  className = "",
  category,
  priority = false,
}: ImagePreviewProps) {
  const [hoverLoaded, setHoverLoaded] = useState(false)
  const primaryCategory = Array.isArray(category) ? category[0] : category

  return (
    <div
      className={`group relative p-[3px] rounded-[1.25rem] bg-stone-100/80 dark:bg-stone-800/50 ring-1 ring-stone-200/60 dark:ring-stone-700/40 hover:ring-stone-300 dark:hover:ring-stone-600 ${className}`}
      style={{ transition: shellTransition }}
    >
      <div className="relative aspect-[3/4] rounded-[calc(1.25rem-3px)] overflow-hidden bg-stone-200 dark:bg-stone-800">
        {/* Main image */}
        <Image
          src={src || "/placeholder.svg"}
          alt={alt}
          fill
          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
          priority={priority}
          quality={80}
          className={`absolute inset-0 object-cover group-hover:scale-[1.04] ${
            hoverImage && hoverLoaded ? "opacity-0" : "opacity-100"
          }`}
          style={{ transition: smoothTransition }}
        />

        {/* Hover image */}
        {hoverImage && (
          <Image
            src={hoverImage}
            alt={alt}
            fill
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
            quality={80}
            className={`absolute inset-0 object-cover group-hover:scale-[1.04] ${
              hoverLoaded ? "opacity-100" : "opacity-0"
            }`}
            style={{ transition: smoothTransition }}
            onLoad={() => setHoverLoaded(true)}
          />
        )}

        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

        {/* Category pill */}
        <div
          className="absolute bottom-3 left-3 z-10 opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0"
          style={{ transition: "all 500ms cubic-bezier(0.32,0.72,0,1)" }}
        >
          <span className="inline-flex items-center px-2.5 py-1 rounded-full bg-white/15 backdrop-blur-md text-[9px] font-medium uppercase tracking-[0.18em] text-white ring-1 ring-white/20">
            {primaryCategory}
          </span>
        </div>
      </div>
    </div>
  )
}
