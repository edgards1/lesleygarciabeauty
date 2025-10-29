"use client"

import { useState } from "react"
import Image from "next/image"
import { FaWhatsapp } from "react-icons/fa"

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

  // Determinar la categoría principal para mostrar
  const primaryCategory = Array.isArray(category) ? category[0] : category
  const hasMultipleCategories = Array.isArray(category) && category.length > 1

  // Enlace de WhatsApp para cotización
  const whatsappLink = "https://wa.me/593983366831?text=Hola%2C%20%C2%BFqu%C3%A9%20tal%3F%0AQuisiera%20cotizar%20este%20look%20de%20maquillaje%20%E2%99%A5%EF%B8%8F"

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
          isHovered && hoverImage ? "opacity-0" : "opacity-100"
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
            isHovered ? "opacity-100" : "opacity-0"
          }`}
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
      )}

      {/* Overlay de fondo para mejor legibilidad */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500" />

      {/* Badge de categoría principal - esquina superior izquierda */}
      <div className="absolute top-4 left-4 transform -translate-y-2 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-300 delay-100">
        <span
          className="px-3 py-1.5 text-white text-sm font-medium rounded-full backdrop-blur-md bg-black/40 border border-white/20 shadow-lg"
        >
          {primaryCategory}
        </span>
      </div>

      {/* Indicador de múltiples categorías (opcional) */}
      {hasMultipleCategories && (
        <div className="absolute top-4 right-4 transform translate-y-2 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-300 delay-150">
          <span className="px-2 py-1 text-white/80 text-xs font-medium rounded-full backdrop-blur-md bg-black/30 border border-white/10">
            +{category.length - 1}
          </span>
        </div>
      )}

      {/* Overlay informativo principal - esquina inferior */}
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
            {/* Ícono de WhatsApp */}
            <div className="ml-3 opacity-70 group-hover:opacity-100 group-hover/link:text-green-400 transition-all duration-300">
              <FaWhatsapp className="w-5 h-5 text-green-500" />
            </div>
          </div>
        </a>
      </div>

      {/* Hover effect border */}
      <div
        className="absolute inset-0 ring-2 ring-opacity-0 group-hover:ring-opacity-100 transition-all duration-500 rounded-2xl"
        style={{ "--tw-ring-color": "#ECCAB7" } as React.CSSProperties}
      ></div>
    </div>
  );
}
