"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { FaStar } from "react-icons/fa"
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
    <section className="relative pt-24 pb-20 bg-gradient-to-br from-stone-50 via-stone-100 to-stone-200 dark:from-stone-900 dark:via-stone-800 dark:to-stone-700 transition-colors overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-[0.02] dark:opacity-[0.05]">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,_rgba(0,0,0,0.3)_1px,_transparent_0)] bg-[size:32px_32px]"></div>
      </div>
      
      <div className="container mx-auto px-4 relative">
        <div className="grid lg:grid-cols-2 gap-16 items-center min-h-[80vh]">
          <div className="space-y-8 lg:pr-8">
            {/* Badge */}
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
                className="border-stone-400/50 dark:border-stone-500/50 text-stone-700 dark:text-stone-300 backdrop-blur-sm bg-white/50 dark:bg-stone-800/50 px-4 py-2 text-sm font-medium tracking-wide"
              >
                ✨ Maquilladora Profesional Certificada
              </Badge>
            </div>

            {/* Main Heading */}
            <div className="space-y-6">
              <h1
                className="text-5xl lg:text-7xl xl:text-8xl font-light text-stone-900 dark:text-stone-100 leading-[0.9] tracking-tight"
                style={{
                  opacity: isLoaded ? 1 : 0,
                  transform: isLoaded ? "translateY(0)" : "translateY(40px)",
                  transition: "all 1s cubic-bezier(0.4, 0, 0.2, 1) 0.4s",
                }}
              >
                <span className="block font-serif italic text-stone-600 dark:text-stone-400 text-2xl lg:text-3xl mb-4 tracking-wider">
                  Lesley García
                </span>
                <span className="block">Belleza que</span>
                <span className="relative block bg-gradient-to-r from-stone-900 via-stone-700 to-stone-900 dark:from-stone-100 dark:via-stone-300 dark:to-stone-100 bg-clip-text text-transparent">
                  Trasciende
                  <div
                    className="absolute -bottom-1 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-stone-400 to-transparent transform scale-x-0 origin-center transition-transform duration-1500 delay-1200"
                    style={{ transform: isLoaded ? "scaleX(1)" : "scaleX(0)" }}
                  />
                </span>
              </h1>

              <p
                className="text-lg lg:text-xl text-stone-600 dark:text-stone-400 leading-relaxed max-w-lg font-light"
                style={{
                  opacity: isLoaded ? 1 : 0,
                  transform: isLoaded ? "translateY(0)" : "translateY(20px)",
                  transition: "all 0.8s cubic-bezier(0.4, 0, 0.2, 1) 0.8s",
                }}
              >
                Especialista en maquillaje de alta gama para novias, eventos y sesiones editoriales. 
                <span className="block mt-2 text-stone-500 dark:text-stone-500 text-base italic">
                  "Cada rostro cuenta una historia única, mi arte la realza"
                </span>
              </p>
            </div>

            {/* Action Buttons */}
            <div
              className="flex flex-col sm:flex-row gap-4 pt-4"
              style={{
                opacity: isLoaded ? 1 : 0,
                transform: isLoaded ? "translateY(0)" : "translateY(20px)",
                transition: "all 0.8s cubic-bezier(0.4, 0, 0.2, 1) 1s",
              }}
            >
              <Button
                size="lg"
                onClick={() => scrollToSection("portfolio")}
                className="bg-stone-900 dark:bg-stone-100 hover:bg-stone-800 dark:hover:bg-stone-200 text-white dark:text-stone-900 transition-all duration-500 hover:scale-105 hover:shadow-2xl border-0 px-8 py-4 text-base font-medium tracking-wide"
              >
                Explorar Portafolio
              </Button>
              <Button
                size="lg"
                variant="outline"
                onClick={() => scrollToSection("contact")}
                className="border-stone-300 dark:border-stone-600 text-stone-700 dark:text-stone-300 hover:bg-stone-100 dark:hover:bg-stone-800 bg-white/80 dark:bg-stone-900/80 backdrop-blur-sm transition-all duration-500 hover:scale-105 px-8 py-4 text-base font-medium tracking-wide"
              >
                Reservar Consulta
              </Button>
            </div>

            {/* Stats */}
            <div
              className="flex items-center gap-8 pt-8"
              style={{
                opacity: isLoaded ? 1 : 0,
                transform: isLoaded ? "translateY(0)" : "translateY(20px)",
                transition: "all 0.8s cubic-bezier(0.4, 0, 0.2, 1) 1.2s",
              }}
            >
              <div className="text-center">
                <div className="text-3xl font-light text-stone-900 dark:text-stone-100">8+</div>
                <div className="text-sm text-stone-500 dark:text-stone-500 uppercase tracking-widest">Años</div>
              </div>
              <div className="w-px h-12 bg-stone-300 dark:bg-stone-600"></div>
              <div className="text-center">
                <div className="text-3xl font-light text-stone-900 dark:text-stone-100">500+</div>
                <div className="text-sm text-stone-500 dark:text-stone-500 uppercase tracking-widest">Clientes</div>
              </div>
              <div className="w-px h-12 bg-stone-300 dark:bg-stone-600"></div>
              <div className="flex items-center gap-2">
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <FaStar
                      key={i}
                      className="w-4 h-4 fill-amber-400 text-amber-400 transition-all duration-300"
                      style={{
                        transform: isLoaded ? "scale(1)" : "scale(0)",
                        transition: `all 0.3s cubic-bezier(0.4, 0, 0.2, 1) ${1.4 + i * 0.1}s`,
                      }}
                    />
                  ))}
                </div>
                <span className="text-sm text-stone-600 dark:text-stone-400 ml-2">5.0</span>
              </div>
            </div>
          </div>

          {/* Image Section */}
          <div className="relative lg:pl-8">
            <div
              className="relative"
              style={{
                opacity: isLoaded ? 1 : 0,
                transform: isLoaded ? "translateX(0) rotate(0deg)" : "translateX(60px) rotate(3deg)",
                transition: "all 1.2s cubic-bezier(0.4, 0, 0.2, 1) 0.6s",
              }}
            >
              {/* Main Image Container */}
              <div className="aspect-[3/4] relative rounded-3xl overflow-hidden shadow-2xl bg-stone-100 dark:bg-stone-800">
                {!imageLoaded && (
                  <div className="absolute inset-0 flex items-center justify-center bg-stone-100 dark:bg-stone-800">
                    <LoadingSpinner size="lg" />
                  </div>
                )}
                <Image
                  src="/placeholder.svg?height=700&width=525"
                  alt="Lesley García - Maquilladora Profesional"
                  fill
                  className="object-cover transition-all duration-700"
                  style={{ 
                    opacity: imageLoaded ? 1 : 0,
                    transform: imageLoaded ? "scale(1)" : "scale(1.1)"
                  }}
                  onLoad={() => setImageLoaded(true)}
                />
                
                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent"></div>
              </div>

              {/* Floating Elements */}
              <div
                className="absolute -top-6 -right-6 w-24 h-24 bg-white/90 dark:bg-stone-800/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-xl border border-stone-200/50 dark:border-stone-700/50"
                style={{
                  opacity: isLoaded ? 1 : 0,
                  transform: isLoaded ? "translateY(0) scale(1)" : "translateY(-20px) scale(0.8)",
                  transition: "all 1s cubic-bezier(0.4, 0, 0.2, 1) 1.4s",
                }}
              >
                <div className="text-center">
                  <div className="text-lg font-light text-stone-900 dark:text-stone-100">8+</div>
                  <div className="text-xs text-stone-500 dark:text-stone-500 uppercase tracking-wider">Años</div>
                </div>
              </div>

              <div
                className="absolute -bottom-8 -left-8 bg-white/95 dark:bg-stone-800/95 backdrop-blur-lg p-6 rounded-2xl shadow-2xl border border-stone-200/50 dark:border-stone-700/50 max-w-xs"
                style={{
                  opacity: isLoaded ? 1 : 0,
                  transform: isLoaded ? "translateY(0) scale(1)" : "translateY(30px) scale(0.9)",
                  transition: "all 1s cubic-bezier(0.4, 0, 0.2, 1) 1.6s",
                }}
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-stone-900 dark:text-stone-100">Valoración</span>
                    <div className="flex">
                      {[...Array(5)].map((_, i) => (
                        <FaStar
                          key={i}
                          className="w-3 h-3 fill-amber-400 text-amber-400 transition-all duration-300"
                          style={{
                            transform: isLoaded ? "scale(1)" : "scale(0)",
                            transition: `all 0.3s cubic-bezier(0.4, 0, 0.2, 1) ${1.8 + i * 0.1}s`,
                          }}
                        />
                      ))}
                    </div>
                  </div>
                  <p className="text-xs text-stone-600 dark:text-stone-400 leading-relaxed">
                    "Profesional excepcional con un ojo artístico increíble"
                  </p>
                  <div className="text-xs text-stone-500 dark:text-stone-500">
                    — Cliente verificada
                  </div>
                </div>
              </div>

              {/* Decorative Elements */}
              <div
                className="absolute top-12 -left-4 w-2 h-2 bg-amber-400 rounded-full opacity-60"
                style={{
                  opacity: isLoaded ? 0.6 : 0,
                  transition: "opacity 1s cubic-bezier(0.4, 0, 0.2, 1) 2s",
                }}
              ></div>
              <div
                className="absolute bottom-20 -right-2 w-1 h-1 bg-stone-400 rounded-full opacity-40"
                style={{
                  opacity: isLoaded ? 0.4 : 0,
                  transition: "opacity 1s cubic-bezier(0.4, 0, 0.2, 1) 2.2s",
                }}
              ></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
