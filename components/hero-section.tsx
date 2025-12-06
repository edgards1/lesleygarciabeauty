"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { FaStar } from "react-icons/fa"
import { useSmoothScroll } from "@/hooks/use-smooth-scroll"
import { LoadingSpinner } from "@/components/loading-spinner"
import Portada  from "@/public/img/ebano_1.jpg"

export function HeroSection() {
  const [isLoaded, setIsLoaded] = useState(false)
  const [imageLoaded, setImageLoaded] = useState(false)
  const { scrollToSection } = useSmoothScroll()

  useEffect(() => {
    const timer = setTimeout(() => setIsLoaded(true), 100)
    return () => clearTimeout(timer)
  }, [])

  return (
    <section className="relative min-h-screen flex items-center justify-center bg-white dark:bg-stone-900 transition-colors overflow-hidden">
      {/* Minimalist background pattern */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-transparent via-stone-50/30 to-stone-100/50 dark:from-transparent dark:via-stone-800/30 dark:to-stone-700/50" />
        <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-stone-100/20 dark:bg-stone-800/20 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 left-1/4 w-64 h-64 bg-stone-200/30 dark:bg-stone-700/30 rounded-full blur-3xl" />
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-12 gap-16 items-center">
            {/* Content - Takes 7 columns */}
            <div className="lg:col-span-7 space-y-12">
              {/* Badge */}
              <div
                className="inline-block"
                style={{
                  opacity: isLoaded ? 1 : 0,
                  transform: isLoaded ? "translateY(0)" : "translateY(30px)",
                  transition: "all 1.2s cubic-bezier(0.4, 0, 0.2, 1) 0.3s",
                }}
              >
                {/* <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-stone-200/60 dark:border-stone-700/60 bg-white/60 dark:bg-stone-800/60 backdrop-blur-sm">
                  <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                  <span className="text-sm font-medium text-stone-700 dark:text-stone-300 tracking-wide">
                    Disponible para reservas
                  </span>
                </div> */}
              </div>

              {/* Main heading - More dramatic */}
              <div className="space-y-8">
                <div
                  style={{
                    opacity: isLoaded ? 1 : 0,
                    transform: isLoaded ? "translateY(0)" : "translateY(50px)",
                    transition: "all 1.4s cubic-bezier(0.4, 0, 0.2, 1) 0.5s",
                  }}
                >
                  <h1 className="text-6xl lg:text-8xl xl:text-9xl font-extralight text-stone-900 dark:text-stone-100 leading-[0.85] tracking-tighter">
                    {/* <span className="block font-serif italic text-stone-500 dark:text-stone-400 text-lg lg:text-xl mb-6 tracking-[0.2em] uppercase">
                      Lesley García
                    </span> */}
                    <span className="block">Belleza</span>
                    <span className="block relative">
                      <span className="bg-gradient-to-r from-stone-900 via-stone-600 to-stone-900 dark:from-stone-100 dark:via-stone-400 dark:to-stone-100 bg-clip-text text-transparent">
                        Atemporal
                      </span>
                      <div
                        className="absolute -bottom-2 left-0 h-px bg-gradient-to-r from-transparent via-stone-400 dark:via-stone-500 to-transparent"
                        style={{
                          width: isLoaded ? "100%" : "0%",
                          transition: "width 2s cubic-bezier(0.4, 0, 0.2, 1) 2s",
                        }}
                      />
                    </span>
                  </h1>
                </div>

                <p
                  className="text-xl lg:text-2xl text-stone-600 dark:text-stone-400 leading-relaxed max-w-2xl font-light"
                  style={{
                    opacity: isLoaded ? 1 : 0,
                    transform: isLoaded ? "translateY(0)" : "translateY(30px)",
                    transition: "all 1.2s cubic-bezier(0.4, 0, 0.2, 1) 1.2s",
                  }}
                >
                  Cada rostro es único y merece un maquillaje que refleje su esencia y personalidad.
                  {/* <span className="block mt-4 text-lg text-stone-500 dark:text-stone-500 italic">
                    Cada rostro es una obra de arte esperando ser revelada.
                  </span> */}
                </p>
              </div>

              {/* CTA Buttons - More sophisticated */}
              <div
                className="flex flex-col sm:flex-row gap-6"
                style={{
                  opacity: isLoaded ? 1 : 0,
                  transform: isLoaded ? "translateY(0)" : "translateY(30px)",
                  transition: "all 1.2s cubic-bezier(0.4, 0, 0.2, 1) 1.8s",
                }}
              >
                <button
                  onClick={() => scrollToSection("portfolio")}
                  className="group relative px-8 py-4 bg-stone-900 dark:bg-stone-100 text-white dark:text-stone-900 rounded-none font-medium tracking-wide transition-all duration-700 hover:bg-stone-800 dark:hover:bg-stone-200 hover:scale-105 hover:shadow-2xl"
                >
                  <span className="relative z-10">Explorar Portfolio</span>
                  <div className="absolute inset-0 bg-gradient-to-r from-stone-800 to-stone-900 dark:from-stone-200 dark:to-stone-100 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                </button>
                
                <button
                  onClick={() => scrollToSection("contact")}
                  className="group px-8 py-4 border border-stone-300 dark:border-stone-600 text-stone-700 dark:text-stone-300 rounded-none font-medium tracking-wide transition-all duration-500 hover:border-stone-900 dark:hover:border-stone-100 hover:text-stone-900 dark:hover:text-stone-100"
                >
                  <span className="relative">
                    Agendar Cita
                    <div className="absolute bottom-0 left-0 w-0 h-px bg-stone-900 dark:bg-stone-100 group-hover:w-full transition-all duration-500" />
                  </span>
                </button>
              </div>
            </div>

            {/* Image Section - Takes 5 columns */}
            <div className="lg:col-span-5 relative">
              <div
                className="relative"
                style={{
                  opacity: isLoaded ? 1 : 0,
                  transform: isLoaded ? "translateY(0) scale(1)" : "translateY(40px) scale(0.95)",
                  transition: "all 1.8s cubic-bezier(0.4, 0, 0.2, 1) 0.8s",
                }}
              >
                {/* Main Image */}
                <div className="aspect-[3/4] relative overflow-hidden bg-stone-50 dark:bg-stone-800">
                  {!imageLoaded && (
                    <div className="absolute inset-0 flex items-center justify-center bg-stone-100 dark:bg-stone-800">
                      <div className="w-8 h-8 border-2 border-stone-300 border-t-stone-900 dark:border-stone-600 dark:border-t-stone-100 rounded-full animate-spin" />
                    </div>
                  )}
                  <Image
                    src={Portada.src}
                    alt="Lesley García - Maquilladora Profesional"
                    fill
                    className="object-cover transition-all duration-1000"
                    style={{ 
                      opacity: imageLoaded ? 1 : 0,
                      transform: imageLoaded ? "scale(1)" : "scale(1.05)",
                      filter: imageLoaded ? "grayscale(0%)" : "grayscale(100%)"
                    }}
                    onLoad={() => setImageLoaded(true)}
                    priority
                  />
                  
                  {/* Subtle overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex flex-col items-center gap-2"
        style={{
          opacity: isLoaded ? 1 : 0,
          transition: "opacity 1.2s cubic-bezier(0.4, 0, 0.2, 1) 3.5s",
        }}
      >
        <span className="text-xs text-stone-500 dark:text-stone-500 uppercase tracking-[0.2em]">Explorar</span>
        <div className="w-px h-8 bg-stone-300 dark:bg-stone-600 animate-pulse" />
      </div>
    </section>
  )
}
