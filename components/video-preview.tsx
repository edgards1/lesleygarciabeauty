"use client"

import { useState, useRef } from "react"
import Image from "next/image"

interface VideoPreviewProps {
  videoSrc: string
  previewImage?: string
  alt: string
  className?: string
  category: string | string[]
}

export function VideoPreview({ 
  videoSrc, 
  previewImage, 
  alt, 
  className = "", 
  category 
}: VideoPreviewProps) {
  const [isHovered, setIsHovered] = useState(false)
  const videoRef = useRef<HTMLVideoElement>(null)

  const handleMouseEnter = async () => {
    setIsHovered(true)
    if (videoRef.current) {
      try {
        videoRef.current.currentTime = 0
        await videoRef.current.play()
      } catch (error) {
        console.log("Video autoplay prevented:", error)
      }
    }
  }

  const handleMouseLeave = () => {
    setIsHovered(false)
    if (videoRef.current) {
      videoRef.current.pause()
      videoRef.current.currentTime = 0
    }
  }

  return (
    <div
      className={`group relative aspect-[3/4] rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 bg-transparent ${className}`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* Imagen de preview estático (equivalente a imagen principal) */}
      {previewImage && (
        <Image
          src={previewImage}
          alt={alt}
          fill
          className={`absolute inset-0 object-cover group-hover:scale-110 transition-all duration-700 ${
            isHovered ? 'opacity-0' : 'opacity-100'
          }`}
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
      )}

      {/* Video (equivalente a imagen de hover) */}
      <video
        ref={videoRef}
        src={videoSrc}
        className={`absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-all duration-700 ${
          isHovered ? 'opacity-100' : 'opacity-0'
        }`}
        muted
        loop
        playsInline
        preload="metadata"
      />

      {/* Placeholder cuando no hay imagen de preview */}
      {!previewImage && (
        <div className="absolute inset-0 bg-gradient-to-br from-stone-200 to-stone-300 flex items-center justify-center">
          <div className={`bg-white/90 rounded-full p-6 shadow-lg transition-all duration-300 ${
            isHovered ? 'scale-75 opacity-50' : 'scale-100 opacity-100'
          }`}>
            <div className="w-8 h-8 border-l-4 border-l-stone-800 border-r-4 border-r-transparent border-t-4 border-t-transparent border-b-4 border-b-transparent rounded-full" 
                 style={{ 
                   borderLeftColor: '#8B6F1B',
                   transform: 'translateX(2px)'
                 }}>
            </div>
          </div>
        </div>
      )}
      
      {/* Video Play Overlay - Solo visible cuando no se está reproduciendo */}
      <div className={`absolute inset-0 flex items-center justify-center pointer-events-none transition-all duration-300 ${
        isHovered ? 'opacity-0' : 'opacity-100'
      }`}>
      </div>
      
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
