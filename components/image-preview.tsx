"use client"

import { useState } from "react"
import Image from "next/image"

interface ImagePreviewProps {
  src: string
  hoverImage?: string
  alt: string
  className?: string
  category: string | string[]
}

export function ImagePreview({ 
  src, 
  hoverImage, 
  alt, 
  className = "", 
  category 
}: ImagePreviewProps) {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <div
      className={`group relative aspect-[3/4] rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 bg-transparent ${className}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Imagen principal */}
      <Image
        src={src || "/placeholder.svg"}
        alt={alt}
        fill
        className={`absolute inset-0 object-cover group-hover:scale-110 transition-all duration-700 ${
          isHovered && hoverImage ? 'opacity-0' : 'opacity-100'
        }`}
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
      />

      {/* Imagen de hover (si existe) */}
      {hoverImage && (
        <Image
          src={hoverImage}
          alt={`${alt}`}
          fill
          className={`absolute inset-0 object-cover group-hover:scale-110 transition-all duration-700 ${
            isHovered ? 'opacity-100' : 'opacity-0'
          }`}
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
      )}
      
      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500" />
      
      {/* Category badge */}
      <div className="absolute top-4 left-4 transform -translate-y-4 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-300">
        <div className="flex flex-wrap gap-1">
          {Array.isArray(category) ? 
            <>
              {category.slice(0, 2).map((cat, index) => (
                <span key={index} className="px-2 py-1 text-stone-900 text-xs font-medium rounded-full backdrop-blur-sm"
                      style={{backgroundColor: '#ECCAB7'}}>
                  {cat}
                </span>
              ))}
              {category.length > 2 && (
                <span className="px-2 py-1 text-stone-700 text-xs font-medium rounded-full backdrop-blur-sm bg-white/70">
                  +{category.length - 2}
                </span>
              )}
            </>
            :
            <span className="px-3 py-1 text-stone-900 text-xs font-medium rounded-full backdrop-blur-sm"
                  style={{backgroundColor: '#ECCAB7'}}>
              {category}
            </span>
          }
        </div>
      </div>

      {/* Content overlay */}
      <div className="absolute bottom-0 left-0 right-0 p-6 text-white transform translate-y-4 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-500">
        <h3 className="text-lg font-medium">{alt}</h3>
      </div>

      {/* Hover effect border */}
      <div className="absolute inset-0 ring-2 ring-opacity-0 group-hover:ring-opacity-100 transition-all duration-500 rounded-2xl" 
           style={{'--tw-ring-color': '#ECCAB7'} as React.CSSProperties}>
      </div>
    </div>
  )
}
