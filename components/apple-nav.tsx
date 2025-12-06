"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { FaWhatsapp } from "react-icons/fa"
import { 
  FiHome, 
  FiUser, 
  FiBriefcase, 
  FiImage, 
  FiStar, 
  FiPhone 
} from "react-icons/fi"

import Logo from "@/public/icons/Logo_LG.svg"

export function AppleNav() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [activeSection, setActiveSection] = useState("home")
  const [hasShownMenuOnAbout, setHasShownMenuOnAbout] = useState(false)
  const [showNavbar, setShowNavbar] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)

      // Detectar sección activa
      const sections = ["about", "services", "portfolio", "testimonials", "contact"]
      const scrollPosition = window.scrollY + 100

      // Verificar si llegamos a la sección "about"
      const aboutElement = document.getElementById("about")
      if (aboutElement) {
        const aboutTop = aboutElement.offsetTop
        setShowNavbar(window.scrollY >= aboutTop - 100)
      }

      for (const section of sections) {
        const element = document.getElementById(section)
        if (element) {
          const { offsetTop, offsetHeight } = element
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section)            
            break
          }
        }
      }
    }

    window.addEventListener("scroll", handleScroll)
    handleScroll() // Llamada inicial
    return () => window.removeEventListener("scroll", handleScroll)
  }, [hasShownMenuOnAbout, isMobileMenuOpen])

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen)
    // Prevenir scroll cuando el menú está abierto
    if (!isMobileMenuOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }
  }

  const handleNavClick = (sectionId: string) => {
    setIsMobileMenuOpen(false)
    document.body.style.overflow = 'unset'
    
    const element = document.getElementById(sectionId)
    if (element) {
      const offset = 80
      const bodyRect = document.body.getBoundingClientRect().top
      const elementRect = element.getBoundingClientRect().top
      const elementPosition = elementRect - bodyRect
      const offsetPosition = elementPosition - offset

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      })
    }
  }

  const menuItems = [
    { id: "about", label: "Sobre Mí", icon: FiUser, description: "Conoce mi historia" },
    { id: "services", label: "Servicios", icon: FiBriefcase, description: "Maquillaje profesional" },
    { id: "portfolio", label: "Portfolio", icon: FiImage, description: "Mis trabajos" },
    { id: "testimonials", label: "Testimonios", icon: FiStar, description: "Lo que dicen mis clientes" },
    { id: "contact", label: "Contacto", icon: FiPhone, description: "Agenda tu cita" },
  ]

  return (
    <>
      {/* Botón de menú hamburguesa - Siempre visible */}
      <div className="fixed top-6 right-6 z-[60]">
        <Button
          variant="ghost"
          size="icon"
          onClick={toggleMobileMenu}
          className={`relative overflow-hidden text-stone-900 dark:text-white transition-all duration-500 group ${
            isScrolled || showNavbar
              ? "bg-white/90 dark:bg-stone-900/90 backdrop-blur-xl shadow-2xl hover:shadow-[#ECCAB7]/20"
              : "bg-white/70 dark:bg-stone-900/70 backdrop-blur-md shadow-xl"
          } rounded-full w-14 h-14 hover:scale-110 hover:rotate-90`}
          aria-label="Toggle menu"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-[#ECCAB7]/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          {isMobileMenuOpen ? (
            <X className="h-6 w-6 relative z-10 transition-transform duration-300 group-hover:rotate-90" />
          ) : (
            <Menu className="h-6 w-6 relative z-10 transition-transform duration-300" />
          )}
        </Button>
      </div>

      {/* <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          showNavbar && !isMobileMenuOpen
            ? "translate-y-0 opacity-100"
            : "-translate-y-full opacity-0"
        } ${
          isScrolled
            ? "bg-white/80 dark:bg-stone-900/80 backdrop-blur-xl shadow-lg"
            : "bg-transparent"
        }`}
      >
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-20">
            <Link
              href="#home"
              onClick={() => handleNavClick("home")}
              className="text-2xl font-serif font-bold text-stone-900 dark:text-white hover:text-[#ECCAB7] dark:hover:text-[#ECCAB7] transition-colors duration-300"
            >
              Lesley García
            </Link>
          </div>
        </div>
      </nav> */}

      {/* Overlay */}
      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 transition-opacity duration-300"
          onClick={toggleMobileMenu}
        />
      )}

      {/* Menú desplegable profesional */}
      <div
        className={`fixed top-0 right-0 h-screen w-full sm:w-[420px] bg-gradient-to-br from-white via-white to-stone-50 dark:from-stone-900 dark:via-stone-900 dark:to-stone-800 shadow-2xl z-40 transform transition-all duration-700 ease-out overflow-y-auto ${
          isMobileMenuOpen ? "translate-x-0 opacity-100" : "translate-x-full opacity-0"
        }`}
      >
        <div className="relative h-full flex flex-col">
          {/* Decoración superior */}
          <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-[#ECCAB7]/10 to-transparent rounded-bl-full" />
          <div className="absolute top-20 right-10 w-20 h-20 bg-gradient-to-br from-[#D4A574]/10 to-transparent rounded-full blur-2xl" />
          
          <div className="relative p-8 space-y-6 flex-1">
            {/* Header del menú mejorado */}
            <div className="pb-3 border-b border-stone-200/60 dark:border-stone-700/60">
              <div className="flex items-start justify-between">
                <div>
                <img 
                  src={Logo.src} 
                  alt="Lesley García" 
                  className="w-16 h-16 object-cover"
                />
                  <p className="text-sm text-stone-600 dark:text-stone-400 leading-relaxed mt-4">
                    Descubre todo lo que tengo para ti
                  </p>
                </div>
              </div>
            </div>

          {/* Items del menú */}
          <nav className="space-y-2 flex-1">
            {menuItems.map((item, index) => {
              const Icon = item.icon
              const isActive = activeSection === item.id
              
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`w-full group relative flex items-center gap-4 p-5 rounded-2xl transition-all duration-500 overflow-hidden ${
                    isActive
                      ? "bg-gradient-to-r from-[#ECCAB7]/20 via-[#ECCAB7]/10 to-transparent dark:from-[#ECCAB7]/10 dark:via-[#ECCAB7]/5 shadow-lg shadow-[#ECCAB7]/10 scale-[1.02]"
                      : "hover:bg-white/80 dark:hover:bg-stone-800/80 hover:shadow-lg hover:scale-[1.02] backdrop-blur-sm"
                  }`}
                  style={{
                    animationDelay: `${index * 80}ms`,
                    animation: isMobileMenuOpen ? "slideInRight 0.6s cubic-bezier(0.34, 1.56, 0.64, 1) forwards" : "none"
                  }}
                >
                  {/* Fondo decorativo */}
                  <div className={`absolute inset-0 bg-gradient-to-r from-[#ECCAB7]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 ${isActive ? "opacity-100" : ""}`} />
                  
                  {/* Icono con contenedor mejorado */}
                  <div className={`relative flex items-center justify-center w-12 h-12 rounded-xl transition-all duration-500 ${
                    isActive 
                      ? "bg-gradient-to-br from-[#ECCAB7] to-[#D4A574] text-white shadow-lg" 
                      : "bg-stone-100 dark:bg-stone-800 text-stone-400 dark:text-stone-500 group-hover:bg-[#ECCAB7]/10 group-hover:text-[#ECCAB7] group-hover:scale-110"
                  }`}>
                    <Icon className="w-5 h-5 relative z-10" />
                  </div>
                  
                  <div className="flex-1 text-left relative z-10">
                    <div className={`font-semibold text-base mb-0.5 transition-colors duration-300 ${
                      isActive
                        ? "text-[#ECCAB7] dark:text-[#D4A574]"
                        : "text-stone-900 dark:text-white group-hover:text-[#ECCAB7]"
                    }`}>
                      {item.label}
                    </div>
                    <div className="text-xs text-stone-500 dark:text-stone-400">
                      {item.description}
                    </div>
                  </div>

                  {/* Indicador de activo mejorado */}
                  <div className={`relative transition-all duration-500 ${isActive ? "opacity-100 scale-100" : "opacity-0 scale-50"}`}>
                    <div className="relative">
                      <div className="w-3 h-3 rounded-full bg-[#ECCAB7] animate-pulse" />
                      <div className="absolute inset-0 w-3 h-3 rounded-full bg-[#ECCAB7] animate-ping" />
                    </div>
                  </div>
                  
                  {/* Flecha para hover */}
                  <div className={`absolute right-5 transition-all duration-500 ${isActive ? "opacity-0" : "opacity-0 group-hover:opacity-100 translate-x-2 group-hover:translate-x-0"}`}>
                    <svg className="w-5 h-5 text-[#ECCAB7]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </button>
              )
            })}
          </nav>

          {/* CTA y contacto */}
          <div className="pt-6 space-y-5 border-t border-stone-200/60 dark:border-stone-700/60 mt-auto">
            {/* Botón CTA principal mejorado */}
            <Link
              href="https://api.whatsapp.com/send?phone=593983366831&text=Hola%2C%20%C2%BFque%20tal%3F.%0AQuisiera%20agendar%20una%20cita%20contigo%E2%99%A5%EF%B8%8F"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setIsMobileMenuOpen(false)}
              className="block w-full group"
            >
              <Button
                className="relative w-full py-7 text-base font-bold bg-gradient-to-r from-[#ECCAB7] via-[#D4A574] to-[#ECCAB7] hover:from-[#D4A574] hover:via-[#ECCAB7] hover:to-[#D4A574] text-white shadow-2xl hover:shadow-[#ECCAB7]/50 transition-all duration-700 hover:scale-[1.03] rounded-2xl overflow-hidden"
              >
                <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
                <span className="relative flex items-center justify-center gap-3">
                  <FaWhatsapp className="w-6 h-6 animate-bounce" />
                  <span>Reservar Consulta Premium</span>
                  <svg className="w-5 h-5 transform group-hover:translate-x-1 transition-transform duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </span>
              </Button>
            </Link>

            {/* Info de contacto mejorada */}
            <div className="relative bg-gradient-to-br from-stone-50 to-stone-100/50 dark:from-stone-800 dark:to-stone-800/50 rounded-2xl p-5 space-y-3 backdrop-blur-sm border border-stone-200/50 dark:border-stone-700/50">
              <div className="absolute top-0 right-0 w-20 h-20 bg-[#ECCAB7]/5 rounded-full blur-2xl" />
              
              <div className="flex items-center gap-3 relative z-10">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#ECCAB7]/20 to-[#D4A574]/10 flex items-center justify-center">
                  <FiPhone className="w-5 h-5 text-[#ECCAB7]" />
                </div>
                <div>
                  <p className="text-xs text-stone-500 dark:text-stone-400 mb-0.5">Llámame o escríbeme</p>
                  <p className="text-sm font-semibold text-stone-700 dark:text-stone-300">(+593) 983366831</p>
                </div>
              </div>
              
              <div className="flex items-center gap-2 text-xs text-stone-600 dark:text-stone-400 pl-13 relative z-10">
                <span className="inline-block w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                <span>Lun - Sáb: 9:00 AM - 5:00 PM</span>
              </div>
            </div>
          </div>
        </div>
        </div>
      </div>

      <style jsx global>{`
        @keyframes slideInRight {
          from {
            opacity: 0;
            transform: translateX(30px) scale(0.95);
          }
          to {
            opacity: 1;
            transform: translateX(0) scale(1);
          }
        }
        
        @keyframes float {
          0%, 100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-5px);
          }
        }
      `}</style>
    </>
  )
}
