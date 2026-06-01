"use client"

import { useState, useRef, useEffect } from "react"
import Image from "next/image"
import { FaWhatsapp } from "react-icons/fa"

interface VideoPreviewProps {
  videoSrc: string
  previewImage?: string
  alt: string
  className?: string
  category: string | string[]
  priority?: boolean
  showCta?: boolean
}

export function VideoPreview({ 
  videoSrc, 
  previewImage, 
  alt, 
  className = "", 
  category,
  priority = false,
  showCta = true
}: VideoPreviewProps) {
  const [isHovered, setIsHovered] = useState(false)
  const [videoLoaded, setVideoLoaded] = useState(false)
  const videoRef = useRef<HTMLVideoElement>(null)
  const observerRef = useRef<IntersectionObserver | null>(null)

  // Enlace de WhatsApp para cotización
  const whatsappLink = "https://wa.me/593983366831?text=Hola%2C%20quisiera%20cotizar%20este%20look%20de%20maquillaje"

  // Lazy load del video cuando esté en el viewport
  useEffect(() => {
    if (!videoRef.current) return

    // Si tiene prioridad, carga inmediatamente
    if (priority) {
      setVideoLoaded(true)
      videoRef.current.load()
      return
    }

    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && videoRef.current) {
            setVideoLoaded(true)
            videoRef.current.load()
            observerRef.current?.disconnect()
          }
        })
      },
      { rootMargin: "50px" }
    )

    observerRef.current.observe(videoRef.current)

    return () => observerRef.current?.disconnect()
  }, [priority])

  const handleMouseEnter = async () => {
    setIsHovered(true)
    if (videoRef.current && videoLoaded) {
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
      className={`group relative aspect-[3/4] rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 bg-stone-100 dark:bg-stone-800 ${className}`}
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
          priority={priority}
          loading={priority ? undefined : "lazy"}
          quality={85}
          placeholder="blur"
          blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mN8/5+hHgAHggJ/PchI7wAAAABJRU5ErkJggg=="
        />
      )}

      {/* Video (equivalente a imagen de hover) */}
      <video
        ref={videoRef}
        className={`absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-all duration-700 ${
          isHovered ? 'opacity-100' : 'opacity-0'
        }`}
        muted
        loop
        playsInline
        preload="none"
      >
        {videoLoaded && (
          <>
            <source src={videoSrc} type="video/mp4" />
            <source src={videoSrc} type="video/quicktime" />
          </>
        )}
      </video>

      {/* Overlay de fondo para mejor legibilidad */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500" />

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
      {/* <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500" /> */}
      
      {/* Badge de categoría principal - esquina superior izquierda */}
      <div className="absolute top-4 left-4 transform -translate-y-2 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-300 delay-100">
        <span
          className="px-3 py-1.5 text-white text-sm font-medium rounded-full backdrop-blur-md bg-black/40 border border-white/20 shadow-lg"
        >
          {Array.isArray(category) ? category[0] : category}
        </span>
      </div>

      {/* Indicador de múltiples categorías (opcional) */}
      {Array.isArray(category) && category.length > 1 && (
        <div className="absolute top-4 right-4 transform translate-y-2 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-300 delay-150">
          <span className="px-2 py-1 text-white/80 text-xs font-medium rounded-full backdrop-blur-md bg-black/30 border border-white/10">
            +{category.length - 1}
          </span>
        </div>
      )}

      {/* Overlay informativo principal - esquina inferior */}
      {showCta ? (
        <div className="absolute bottom-4 left-4 right-4 transform translate-y-2 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-500 delay-200 z-10">
          <a
            href={whatsappLink}
            target="_blank"
            rel="noopener noreferrer"
            className="block backdrop-blur-md bg-black/40 rounded-xl p-4 border border-white/10 shadow-lg hover:bg-black/50 transition-all duration-300 group/link pointer-events-auto"
          >
            <div className="flex items-center justify-between">
              <div className="flex-1">
                <h3 className="text-white font-semibold text-base leading-tight mb-1 group-hover/link:text-green-300 transition-colors">
                  Cotizar ahora
                </h3>
                <p className="text-white/80 text-sm">
                  Agenda tu cita de maquillaje profesional
                </p>
              </div>
              <div className="ml-3 opacity-70 group-hover:opacity-100 group-hover/link:text-green-400 transition-all duration-300">
                <FaWhatsapp className="w-5 h-5 text-green-500" />
              </div>
            </div>
          </a>
        </div>
      ) : null}

      {/* Hover effect border */}
      <div className="absolute inset-0 ring-2 ring-opacity-0 group-hover:ring-opacity-100 transition-all duration-500 rounded-2xl" 
           style={{'--tw-ring-color': '#ECCAB7'} as React.CSSProperties}>
      </div>
    </div>
  )
}
