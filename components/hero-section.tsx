"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Star } from "lucide-react"
import { useSmoothScroll } from "@/hooks/use-smooth-scroll"
import { LoadingSpinner } from "@/components/loading-spinner"

export function HeroSection() {
  const [isLoaded, setIsLoaded] = useState(false)
  const [imageLoaded, setImageLoaded] = useState(false)
  const { scrollToSection } = useSmoothScroll()

  useEffect(() => {
    const timer = setTimeout(() => setIsLoaded(true), 100)
    return () => clearTimeout(timer)
  }, [])

  return (
    <section className="pt-20 pb-16 bg-gradient-to-br from-stone-50 to-stone-100 dark:from-stone-800 dark:to-stone-900 transition-colors overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <div className="space-y-4">
              <div
                className="inline-block"
                style={{
                  opacity: isLoaded ? 1 : 0,
                  transform: isLoaded ? "translateY(0)" : "translateY(20px)",
                  transition: "all 0.8s cubic-bezier(0.4, 0, 0.2, 1) 0.2s",
                }}
              >
                <Badge
                  variant="outline"
                  className="border-stone-300 dark:border-stone-600 text-stone-600 dark:text-stone-400 backdrop-blur-sm"
                >
                  Maquilladora Profesional
                </Badge>
              </div>

              <h1
                className="text-5xl lg:text-6xl font-serif text-stone-900 dark:text-stone-100 leading-tight"
                style={{
                  opacity: isLoaded ? 1 : 0,
                  transform: isLoaded ? "translateY(0)" : "translateY(30px)",
                  transition: "all 0.8s cubic-bezier(0.4, 0, 0.2, 1) 0.4s",
                }}
              >
                Realzando Tu{" "}
                <span className="relative">
                  Belleza Natural
                  <div
                    className="absolute -bottom-2 left-0 w-full h-1 bg-gradient-to-r from-stone-400 to-stone-600 dark:from-stone-500 dark:to-stone-300 transform scale-x-0 origin-left transition-transform duration-1000 delay-1000"
                    style={{ transform: isLoaded ? "scaleX(1)" : "scaleX(0)" }}
                  />
                </span>
              </h1>

              <p
                className="text-xl text-stone-600 dark:text-stone-400 leading-relaxed"
                style={{
                  opacity: isLoaded ? 1 : 0,
                  transform: isLoaded ? "translateY(0)" : "translateY(20px)",
                  transition: "all 0.8s cubic-bezier(0.4, 0, 0.2, 1) 0.6s",
                }}
              >
                Con más de 8 años de experiencia en maquillaje de novias, editorial y eventos especiales, creo looks
                impresionantes que te hacen sentir segura y hermosa.
              </p>
            </div>

            <div
              className="flex flex-col sm:flex-row gap-4"
              style={{
                opacity: isLoaded ? 1 : 0,
                transform: isLoaded ? "translateY(0)" : "translateY(20px)",
                transition: "all 0.8s cubic-bezier(0.4, 0, 0.2, 1) 0.8s",
              }}
            >
              <Button
                size="lg"
                onClick={() => scrollToSection("portfolio")}
                className="bg-stone-900 dark:bg-stone-100 hover:bg-stone-800 dark:hover:bg-stone-200 text-white dark:text-stone-900 transition-all duration-300 hover:scale-105 hover:shadow-lg"
              >
                Ver Portafolio
              </Button>
              <Button
                size="lg"
                variant="outline"
                onClick={() => scrollToSection("contact")}
                className="border-stone-300 dark:border-stone-600 text-stone-700 dark:text-stone-300 hover:bg-stone-50 dark:hover:bg-stone-800 bg-transparent dark:bg-transparent transition-all duration-300 hover:scale-105"
              >
                Reservar Consulta
              </Button>
            </div>
          </div>

          <div className="relative">
            <div
              className="aspect-[3/4] relative rounded-2xl overflow-hidden shadow-2xl"
              style={{
                opacity: isLoaded ? 1 : 0,
                transform: isLoaded ? "translateX(0) rotate(0deg)" : "translateX(50px) rotate(5deg)",
                transition: "all 1s cubic-bezier(0.4, 0, 0.2, 1) 0.5s",
              }}
            >
              {!imageLoaded && (
                <div className="absolute inset-0 flex items-center justify-center bg-stone-100 dark:bg-stone-800">
                  <LoadingSpinner size="lg" />
                </div>
              )}
              <Image
                src="/placeholder.svg?height=600&width=450"
                alt="Lesley García - Maquilladora Profesional"
                fill
                className="object-cover transition-opacity duration-500"
                style={{ opacity: imageLoaded ? 1 : 0 }}
                onLoad={() => setImageLoaded(true)}
              />
            </div>

            <div
              className="absolute -bottom-6 -left-6 bg-white/90 dark:bg-stone-800/90 backdrop-blur-sm p-6 rounded-xl shadow-lg border border-stone-200/50 dark:border-stone-700/50"
              style={{
                opacity: isLoaded ? 1 : 0,
                transform: isLoaded ? "translateY(0) scale(1)" : "translateY(20px) scale(0.9)",
                transition: "all 0.8s cubic-bezier(0.4, 0, 0.2, 1) 1.2s",
              }}
            >
              <div className="flex items-center space-x-2">
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className="w-4 h-4 fill-yellow-400 text-yellow-400 transition-all duration-300"
                      style={{
                        transform: isLoaded ? "scale(1)" : "scale(0)",
                        transition: `all 0.3s cubic-bezier(0.4, 0, 0.2, 1) ${1.4 + i * 0.1}s`,
                      }}
                    />
                  ))}
                </div>
                <span className="text-sm text-stone-600 dark:text-stone-400">200+ Clientes Felices</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
