"use client"

import { useState, useEffect } from "react"
import { Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { ThemeToggle } from "@/components/theme-toggle"
import { useSmoothScroll } from "@/hooks/use-smooth-scroll"
import { cn } from "@/lib/utils"

export function AppleNav() {
  const [isOpen, setIsOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const { scrollToSection } = useSmoothScroll()

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const handleNavClick = (sectionId: string) => {
    scrollToSection(sectionId)
    setIsOpen(false)
  }

  const navItems = [
    { id: "about", label: "Acerca de" },
    { id: "services", label: "Servicios" },
    { id: "portfolio", label: "Portafolio" },
    { id: "testimonials", label: "Testimonios" },
    { id: "contact", label: "Contacto" },
  ]

  return (
    <>
      <nav
        className={cn(
          "fixed top-0 w-full z-50 transition-all duration-500 ease-out",
          isScrolled
            ? "bg-white/80 dark:bg-stone-900/80 backdrop-blur-xl border-b border-stone-200/50 dark:border-stone-700/50 shadow-lg"
            : "bg-transparent",
        )}
      >
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="text-2xl font-serif text-stone-900 dark:text-stone-100 transition-colors">Lesley García</div>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center space-x-8">
              {navItems.map((item, index) => (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className="relative text-stone-600 dark:text-stone-400 hover:text-stone-900 dark:hover:text-stone-100 transition-all duration-300 group"
                  style={{
                    animationDelay: `${index * 0.1}s`,
                  }}
                >
                  {item.label}
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-stone-900 dark:bg-stone-100 transition-all duration-300 group-hover:w-full" />
                </button>
              ))}
            </div>

            <div className="flex items-center space-x-3">
              <ThemeToggle />
              <Button
                onClick={() => handleNavClick("contact")}
                className="hidden lg:block bg-stone-900 dark:bg-stone-100 hover:bg-stone-800 dark:hover:bg-stone-200 text-white dark:text-stone-900 transition-all duration-300 hover:scale-105"
              >
                Reservar Consulta
              </Button>

              {/* Mobile Menu Button */}
              <Button
                variant="outline"
                size="icon"
                onClick={() => setIsOpen(!isOpen)}
                className="lg:hidden border-stone-300 dark:border-stone-600 text-stone-600 dark:text-stone-400 hover:bg-stone-50 dark:hover:bg-stone-800 bg-transparent dark:bg-transparent transition-all duration-300"
              >
                <div className="relative w-5 h-5">
                  <Menu
                    className={cn(
                      "absolute inset-0 transition-all duration-300",
                      isOpen ? "rotate-90 opacity-0" : "rotate-0 opacity-100",
                    )}
                  />
                  <X
                    className={cn(
                      "absolute inset-0 transition-all duration-300",
                      isOpen ? "rotate-0 opacity-100" : "-rotate-90 opacity-0",
                    )}
                  />
                </div>
              </Button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        <div
          className={cn(
            "lg:hidden absolute top-full left-0 right-0 transition-all duration-500 ease-out",
            isOpen ? "opacity-100 translate-y-0 pointer-events-auto" : "opacity-0 -translate-y-4 pointer-events-none",
          )}
        >
          <div className="bg-white/95 dark:bg-stone-900/95 backdrop-blur-xl border-b border-stone-200/50 dark:border-stone-700/50 shadow-2xl">
            <div className="container mx-auto px-4 py-6">
              <div className="space-y-4">
                {navItems.map((item, index) => (
                  <button
                    key={item.id}
                    onClick={() => handleNavClick(item.id)}
                    className="block w-full text-left text-lg text-stone-600 dark:text-stone-400 hover:text-stone-900 dark:hover:text-stone-100 transition-all duration-300 py-3 px-4 rounded-lg hover:bg-stone-50 dark:hover:bg-stone-800/50"
                    style={{
                      animationDelay: `${index * 0.1}s`,
                      opacity: isOpen ? 1 : 0,
                      transform: isOpen ? "translateX(0)" : "translateX(-20px)",
                      transition: `all 0.4s cubic-bezier(0.4, 0, 0.2, 1) ${index * 0.1}s`,
                    }}
                  >
                    {item.label}
                  </button>
                ))}
                <Button
                  onClick={() => handleNavClick("contact")}
                  className="w-full mt-6 bg-stone-900 dark:bg-stone-100 hover:bg-stone-800 dark:hover:bg-stone-200 text-white dark:text-stone-900 transition-all duration-300"
                  style={{
                    opacity: isOpen ? 1 : 0,
                    transform: isOpen ? "translateY(0)" : "translateY(20px)",
                    transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1) 0.5s",
                  }}
                >
                  Reservar Consulta
                </Button>
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40 lg:hidden transition-opacity duration-300"
          onClick={() => setIsOpen(false)}
        />
      )}
    </>
  )
}
