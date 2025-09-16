"use client"

import { useState, useEffect } from "react"
import { HiMenu, HiX } from "react-icons/hi"
import { Button } from "@/components/ui/button"
import { useSmoothScroll } from "@/hooks/use-smooth-scroll"
import { cn } from "@/lib/utils"
import Image from "next/image"

export function AppleNav() {
  const [isOpen, setIsOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const [activeSection, setActiveSection] = useState("hero")
  const [scrollProgress, setScrollProgress] = useState(0)
  const { scrollToSection } = useSmoothScroll()

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY
      const windowHeight = window.innerHeight
      const documentHeight = document.documentElement.scrollHeight

      // Scroll state
      setIsScrolled(scrollY > 50)
      
      // Scroll progress (0-1)
      const progress = scrollY / (documentHeight - windowHeight)
      setScrollProgress(Math.min(progress, 1))

      // Active section detection
      const sections = ["hero", "about", "services", "portfolio", "testimonials", "contact"]
      let currentSection = "hero"

      for (const section of sections) {
        const element = document.getElementById(section)
        if (element) {
          const rect = element.getBoundingClientRect()
          const elementTop = rect.top + scrollY
          const elementHeight = rect.height
          
          if (scrollY >= elementTop - windowHeight / 3 && 
              scrollY < elementTop + elementHeight - windowHeight / 3) {
            currentSection = section
          }
        }
      }
      
      setActiveSection(currentSection)
    }

    window.addEventListener("scroll", handleScroll, { passive: true })
    handleScroll() // Initial call
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const handleNavClick = (sectionId: string) => {
    scrollToSection(sectionId)
    setIsOpen(false)
  }

  const navItems = [
    { id: "about", label: "Acerca de", icon: "✨" },
    { id: "services", label: "Servicios", icon: "💄" },
    { id: "portfolio", label: "Portafolio", icon: "📸" },
    { id: "testimonials", label: "Testimonios", icon: "💬" },
    { id: "contact", label: "Contacto", icon: "📞" },
  ]

  return (
    <>
      {/* Progress bar */}
      <div className="fixed top-0 left-0 right-0 z-[60] h-1">
        <div 
          className="h-full bg-gradient-to-r from-amber-400 via-amber-500 to-amber-600 transition-all duration-300 ease-out"
          style={{ 
            width: `${scrollProgress * 100}%`,
            opacity: isScrolled ? 0.8 : 0 
          }}
        />
      </div>

      <nav
        className={cn(
          "fixed top-0 w-full z-50 transition-all duration-700 ease-out",
          isScrolled
            ? "bg-white/85 backdrop-blur-2xl border-b border-stone-200/60 shadow-xl shadow-stone-900/5"
            : "bg-transparent",
        )}
        style={{
          backdropFilter: isScrolled ? 'blur(20px) saturate(180%)' : 'none',
        }}
      >
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            
            {/* Logo mejorado */}
            <div 
              className="flex items-center gap-3 group cursor-pointer"
              onClick={() => handleNavClick("hero")}
            >
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-tr from-amber-400/20 to-transparent rounded-full blur-lg group-hover:blur-xl transition-all duration-500" />
                <div className="relative bg-white p-2 rounded-full shadow-lg group-hover:shadow-xl transition-all duration-500 group-hover:scale-105">
                  <Image 
                    src="/icons/Logo_LG.svg" 
                    alt="Lesley García" 
                    width={32} 
                    height={32}
                    className="transition-transform duration-500 group-hover:rotate-12"
                  />
                </div>
              </div>
              
              <div className="hidden sm:block">
                <div className="text-lg font-light text-stone-800 tracking-wide">
                  Lesley García
                </div>
                <div className="text-xs text-stone-500 tracking-wider uppercase">
                  Makeup Artist
                </div>
              </div>
            </div>

            {/* Desktop Navigation mejorada */}
            <div className="hidden lg:flex items-center space-x-1">
              {navItems.map((item, index) => {
                const isActive = activeSection === item.id
                return (
                  <button
                    key={item.id}
                    onClick={() => handleNavClick(item.id)}
                    className={cn(
                      "relative px-4 py-2 text-sm font-medium transition-all duration-500 group rounded-full",
                      "hover:bg-stone-100/50",
                      isActive 
                        ? "text-amber-600" 
                        : "text-stone-600 hover:text-stone-900"
                    )}
                    style={{
                      animationDelay: `${index * 0.1}s`,
                    }}
                  >
                    <span className="relative z-10 flex items-center gap-2">
                      <span className="hidden xl:inline text-xs">{item.icon}</span>
                      {item.label}
                    </span>
                    
                    {/* Active indicator */}
                    <div 
                      className={cn(
                        "absolute inset-0 bg-gradient-to-r from-amber-100 to-amber-50 rounded-full transition-all duration-500",
                        isActive ? "opacity-100 scale-100" : "opacity-0 scale-95"
                      )}
                    />
                    
                    {/* Hover effect */}
                    <div className="absolute inset-0 bg-stone-50 rounded-full transition-all duration-300 opacity-0 group-hover:opacity-100 scale-95 group-hover:scale-100" />
                    
                    {/* Bottom indicator */}
                    <div 
                      className={cn(
                        "absolute bottom-0 left-1/2 transform -translate-x-1/2 w-0 h-0.5 bg-gradient-to-r from-amber-400 to-amber-600 transition-all duration-300",
                        isActive ? "w-6" : "group-hover:w-4"
                      )}
                    />
                  </button>
                )
              })}
            </div>

            {/* Action buttons */}
            <div className="flex items-center space-x-3">              
              <Button
                onClick={() => handleNavClick("contact")}
                className={cn(
                  "hidden lg:flex items-center gap-2 px-6 py-2.5 rounded-full transition-all duration-500",
                  "bg-gradient-to-r from-stone-900 to-stone-800",
                  "hover:from-stone-800 hover:to-stone-700",
                  "text-white font-medium text-sm",
                  "shadow-lg hover:shadow-xl hover:shadow-stone-900/25",
                  "transform hover:scale-105 hover:-translate-y-0.5"
                )}
              >
                <span className="text-xs">✨</span>
                Reservar Consulta
              </Button>

              {/* Mobile Menu Button mejorado */}
              <Button
                variant="outline"
                size="icon"
                onClick={() => setIsOpen(!isOpen)}
                className={cn(
                  "lg:hidden relative overflow-hidden rounded-full",
                  "border-stone-300/50",
                  "bg-white/50 backdrop-blur-sm",
                  "hover:bg-white",
                  "transition-all duration-300 hover:scale-105",
                  "shadow-lg hover:shadow-xl"
                )}
              >
                <div className="relative w-5 h-5">
                  <HiMenu
                    className={cn(
                      "absolute inset-0 transition-all duration-500 ease-out",
                      isOpen ? "rotate-180 opacity-0 scale-50" : "rotate-0 opacity-100 scale-100",
                    )}
                  />
                  <HiX
                    className={cn(
                      "absolute inset-0 transition-all duration-500 ease-out",
                      isOpen ? "rotate-0 opacity-100 scale-100" : "-rotate-180 opacity-0 scale-50",
                    )}
                  />
                </div>
                
                {/* Ripple effect */}
                <div className={cn(
                  "absolute inset-0 bg-gradient-to-r from-amber-400/20 to-amber-600/20 rounded-full transition-all duration-300",
                  isOpen ? "scale-100 opacity-100" : "scale-0 opacity-0"
                )} />
              </Button>
            </div>
          </div>
        </div>

        {/* Mobile Menu mejorado */}
        <div
          className={cn(
            "lg:hidden absolute top-full left-0 right-0 transition-all duration-700 ease-out overflow-hidden",
            isOpen ? "opacity-100 translate-y-0 pointer-events-auto max-h-screen" : "opacity-0 -translate-y-8 pointer-events-none max-h-0",
          )}
        >
          <div className="bg-white/95 backdrop-blur-2xl border-b border-stone-200/60 shadow-2xl">
            <div className="container mx-auto px-6 py-8">
              
              {/* Mobile brand info */}
              <div className={cn(
                "text-center mb-8 transition-all duration-500",
                isOpen ? "opacity-100 transform-none" : "opacity-0 translate-y-4"
              )}>
                <div className="text-lg font-light text-stone-800 mb-1">
                  Lesley García
                </div>
                <div className="text-sm text-stone-500 tracking-wider">
                  Professional Makeup Artist
                </div>
                <div className="w-16 h-px bg-gradient-to-r from-transparent via-amber-400 to-transparent mx-auto mt-3" />
              </div>

              {/* Navigation items con iconos */}
              <div className="space-y-2 mb-8">
                {navItems.map((item, index) => {
                  const isActive = activeSection === item.id
                  return (
                    <button
                      key={item.id}
                      onClick={() => handleNavClick(item.id)}
                      className={cn(
                        "flex items-center gap-4 w-full text-left p-4 rounded-2xl transition-all duration-500 group",
                        "hover:bg-stone-50",
                        isActive 
                          ? "bg-gradient-to-r from-amber-50 to-amber-25 text-amber-700" 
                          : "text-stone-600"
                      )}
                      style={{
                        animationDelay: `${index * 0.1}s`,
                        opacity: isOpen ? 1 : 0,
                        transform: isOpen ? "translateX(0)" : "translateX(-30px)",
                        transition: `all 0.6s cubic-bezier(0.4, 0, 0.2, 1) ${index * 0.1 + 0.2}s`,
                      }}
                    >
                      <div className={cn(
                        "flex items-center justify-center w-10 h-10 rounded-full transition-all duration-300",
                        isActive 
                          ? "bg-amber-100" 
                          : "bg-stone-100 group-hover:bg-stone-200"
                      )}>
                        <span className="text-lg">{item.icon}</span>
                      </div>
                      
                      <div className="flex-1">
                        <div className="font-medium">{item.label}</div>
                        <div className="text-xs text-stone-500 mt-0.5">
                          {item.id === "about" && "Conoce mi historia"}
                          {item.id === "services" && "Servicios premium"}
                          {item.id === "portfolio" && "Mi mejor trabajo"}
                          {item.id === "testimonials" && "Lo que dicen"}
                          {item.id === "contact" && "Hablemos"}
                        </div>
                      </div>

                      {/* Active indicator */}
                      <div className={cn(
                        "w-2 h-2 rounded-full bg-amber-400 transition-all duration-300",
                        isActive ? "opacity-100 scale-100" : "opacity-0 scale-50"
                      )} />
                    </button>
                  )
                })}
              </div>

              {/* CTA Button */}
              <Button
                onClick={() => handleNavClick("contact")}
                className={cn(
                  "w-full py-4 rounded-2xl transition-all duration-500 group overflow-hidden relative",
                  "bg-gradient-to-r from-stone-900 to-stone-800",
                  "hover:from-stone-800 hover:to-stone-700",
                  "text-white font-medium",
                  "shadow-xl hover:shadow-2xl transform hover:scale-[1.02]"
                )}
                style={{
                  opacity: isOpen ? 1 : 0,
                  transform: isOpen ? "translateY(0)" : "translateY(20px)",
                  transition: "all 0.7s cubic-bezier(0.4, 0, 0.2, 1) 0.8s",
                }}
              >
                <span className="relative z-10 flex items-center justify-center gap-3">
                  <span className="text-lg">✨</span>
                  Reservar Consulta Premium
                  <span className="text-sm">→</span>
                </span>
                
                {/* Button shine effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
              </Button>

              {/* Contact info */}
              <div className={cn(
                "text-center mt-6 space-y-2 transition-all duration-500",
                isOpen ? "opacity-100 transform-none" : "opacity-0 translate-y-4"
              )}>
                <div className="text-xs text-stone-500">
                  🕒 Lun - Sáb, 9:00 AM - 7:00 PM
                </div>
                <div className="text-xs text-stone-500">
                  📍 Disponible para eventos y domicilio
                </div>
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Overlay mejorado */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-gradient-to-b from-black/20 via-black/10 to-black/30 backdrop-blur-sm z-40 lg:hidden transition-all duration-500"
          onClick={() => setIsOpen(false)}
          style={{
            backdropFilter: 'blur(8px) saturate(120%)',
          }}
        />
      )}
    </>
  )
}
