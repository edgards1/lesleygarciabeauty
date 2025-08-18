"use client"

import { useState } from "react"
import { HiMenu, HiX } from "react-icons/hi"
import { Button } from "@/components/ui/button"
import { useSmoothScroll } from "@/hooks/use-smooth-scroll"

export function MobileNav() {
  const [isOpen, setIsOpen] = useState(false)
  const { scrollToSection } = useSmoothScroll()

  const handleNavClick = (sectionId: string) => {
    scrollToSection(sectionId)
    setIsOpen(false)
  }

  return (
    <div className="md:hidden">
      <Button
        variant="outline"
        size="icon"
        onClick={() => setIsOpen(!isOpen)}
        className="border-stone-300 dark:border-stone-600 text-stone-600 dark:text-stone-400 hover:bg-stone-50 dark:hover:bg-stone-800 bg-transparent dark:bg-transparent"
      >
        {isOpen ? <HiX className="h-4 w-4" /> : <HiMenu className="h-4 w-4" />}
      </Button>

      {isOpen && (
        <div className="absolute top-full left-0 right-0 bg-white dark:bg-stone-900 border-b border-stone-200 dark:border-stone-700 shadow-lg">
          <div className="container mx-auto px-4 py-4 space-y-4">
            <button
              onClick={() => handleNavClick("about")}
              className="block w-full text-left text-stone-600 dark:text-stone-400 hover:text-stone-900 dark:hover:text-stone-100 transition-colors py-2"
            >
              Acerca de
            </button>
            <button
              onClick={() => handleNavClick("services")}
              className="block w-full text-left text-stone-600 dark:text-stone-400 hover:text-stone-900 dark:hover:text-stone-100 transition-colors py-2"
            >
              Servicios
            </button>
            <button
              onClick={() => handleNavClick("portfolio")}
              className="block w-full text-left text-stone-600 dark:text-stone-400 hover:text-stone-900 dark:hover:text-stone-100 transition-colors py-2"
            >
              Portafolio
            </button>
            <button
              onClick={() => handleNavClick("testimonials")}
              className="block w-full text-left text-stone-600 dark:text-stone-400 hover:text-stone-900 dark:hover:text-stone-100 transition-colors py-2"
            >
              Testimonios
            </button>
            <button
              onClick={() => handleNavClick("contact")}
              className="block w-full text-left text-stone-600 dark:text-stone-400 hover:text-stone-900 dark:hover:text-stone-100 transition-colors py-2"
            >
              Contacto
            </button>
            <Button
              onClick={() => handleNavClick("contact")}
              className="w-full bg-stone-900 dark:bg-stone-100 hover:bg-stone-800 dark:hover:bg-stone-200 text-white dark:text-stone-900 mt-4"
            >
              Reservar Consulta
            </Button>
          </div>
        </div>
      )}
    </div>
  )
}
