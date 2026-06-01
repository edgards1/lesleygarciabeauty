"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { FaWhatsapp } from "react-icons/fa";
import {
  FiHome,
  FiUser,
  FiBriefcase,
  FiImage,
  FiStar,
  FiPhone,
} from "react-icons/fi";

import Logo from "@/public/icons/Logo_LG.svg";

export function AppleNav() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const [hasShownMenuOnAbout, setHasShownMenuOnAbout] = useState(false);
  const [showNavbar, setShowNavbar] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);

      // Detectar sección activa
      const sections = [
        "about",
        "services",
        "portfolio",
        "testimonials",
        "contact",
      ];
      const scrollPosition = window.scrollY + 100;

      // Verificar si llegamos a la sección "about"
      const aboutElement = document.getElementById("about");
      if (aboutElement) {
        const aboutTop = aboutElement.offsetTop;
        setShowNavbar(window.scrollY >= aboutTop - 100);
      }

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const { offsetTop, offsetHeight } = element;
          if (
            scrollPosition >= offsetTop &&
            scrollPosition < offsetTop + offsetHeight
          ) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll(); // Llamada inicial
    return () => window.removeEventListener("scroll", handleScroll);
  }, [hasShownMenuOnAbout, isMobileMenuOpen]);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
    // Prevenir scroll cuando el menú está abierto
    if (!isMobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
  };

  const handleNavClick = (sectionId: string) => {
    setIsMobileMenuOpen(false);
    document.body.style.overflow = "unset";

    const element = document.getElementById(sectionId);
    if (element) {
      const offset = 80;
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    }
  };

  const menuItems = [
    {
      id: "about",
      label: "Sobre Mí",
      icon: FiUser,
      description: "Conoce mi historia",
    },
    {
      id: "services",
      label: "Servicios",
      icon: FiBriefcase,
      description: "Maquillaje profesional",
    },
    {
      id: "portfolio",
      label: "Portfolio",
      icon: FiImage,
      description: "Mis trabajos",
    },
    {
      id: "testimonials",
      label: "Testimonios",
      icon: FiStar,
      description: "Lo que dicen mis clientes",
    },
    {
      id: "contact",
      label: "Contacto",
      icon: FiPhone,
      description: "Agenda tu cita",
    },
  ];

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
              ? "bg-white/90 dark:bg-stone-900/90 backdrop-blur-xl shadow-2xl hover:shadow-stone-400/20"
              : "bg-white/70 dark:bg-stone-900/70 backdrop-blur-md shadow-xl"
          } rounded-full w-14 h-14 hover:scale-110 hover:rotate-90`}
          aria-label="Toggle menu"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-stone-300/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          {isMobileMenuOpen ? (
            <X className="h-6 w-6 relative z-10 transition-transform duration-300 group-hover:rotate-90" />
          ) : (
            <Menu className="h-6 w-6 relative z-10 transition-transform duration-300" />
          )}
        </Button>
      </div>

      {/* Overlay */}
      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 transition-opacity duration-300"
          onClick={toggleMobileMenu}
        />
      )}

      {/* Menú desplegable profesional */}
      <div
        className={`fixed inset-0 sm:inset-y-0 sm:left-auto sm:right-0 w-full sm:w-[420px] bg-white dark:bg-stone-950 shadow-2xl z-40 transform transition-all duration-700 ease-out ${
          isMobileMenuOpen
            ? "translate-x-0 opacity-100"
            : "translate-x-full opacity-0"
        }`}
      >
        <div className="relative h-full flex flex-col overflow-hidden">
          {/* Decoración superior */}
          <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-stone-300/10 to-transparent rounded-bl-full pointer-events-none" />
          <div className="absolute top-20 right-10 w-20 h-20 bg-gradient-to-br from-stone-400/10 to-transparent rounded-full blur-2xl pointer-events-none" />

          {/* Header del menú - Fixed top */}
          <div className="relative p-8 pb-4 flex-shrink-0">
            <div className="flex items-start justify-between border-b border-stone-200/60 dark:border-stone-700/60 pb-4">
              <div>
                <img
                  src={Logo.src}
                  alt="Lesley García"
                  className="w-12 h-12 object-cover mb-3"
                />
                <p className="text-sm text-stone-600 dark:text-stone-400 leading-relaxed">
                  Descubre todo lo que tengo para ti
                </p>
              </div>
            </div>
          </div>

          {/* Items del menú - Scrollable */}
          <nav className="relative px-8 py-4 flex-1 overflow-y-auto space-y-2">
            {menuItems.map((item, index) => {
              const Icon = item.icon;
              const isActive = activeSection === item.id;

              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`w-full group relative flex items-center gap-4 p-5 rounded-2xl transition-all duration-500 overflow-hidden ${
                    isActive
                      ? "bg-stone-800 dark:bg-stone-100/10 shadow-lg shadow-stone-800/20 scale-[1.02]"
                      : "hover:bg-stone-100/60 dark:hover:bg-stone-800/80 hover:shadow-lg hover:scale-[1.02] backdrop-blur-sm"
                  }`}
                  style={{
                    animationDelay: `${index * 80}ms`,
                    animation: isMobileMenuOpen
                      ? "slideInRight 0.6s cubic-bezier(0.34, 1.56, 0.64, 1) forwards"
                      : "none",
                  }}
                >
                  {/* Fondo decorativo */}
                  <div
                    className={`absolute inset-0 bg-stone-900/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 ${isActive ? "opacity-100" : ""}`}
                  />

                  {/* Icono con contenedor mejorado */}
                  <div
                    className={`relative flex items-center justify-center w-12 h-12 rounded-xl transition-all duration-500 ${
                      isActive
                        ? "bg-stone-900 dark:bg-stone-100 text-white dark:text-stone-900 shadow-lg"
                        : "bg-stone-100 dark:bg-stone-800 text-stone-500 dark:text-stone-400 group-hover:bg-stone-200 group-hover:text-stone-900 dark:group-hover:text-white group-hover:scale-110"
                    }`}
                  >
                    <Icon className="w-5 h-5 relative z-10" />
                  </div>

                  <div className="flex-1 text-left relative z-10">
                    <div
                      className={`font-semibold text-base mb-0.5 transition-colors duration-300 ${
                        isActive
                          ? "text-white dark:text-stone-100"
                          : "text-stone-900 dark:text-white group-hover:text-stone-950 dark:group-hover:text-white"
                      }`}
                    >
                      {item.label}
                    </div>
                    <div className="text-xs text-stone-500 dark:text-stone-400">
                      {item.description}
                    </div>
                  </div>

                  {/* Indicador de activo mejorado */}
                  <div
                    className={`relative transition-all duration-500 ${isActive ? "opacity-100 scale-100" : "opacity-0 scale-50"}`}
                  >
                    <div className="relative">
                      <div className="w-3 h-3 rounded-full bg-white dark:bg-stone-200 animate-pulse" />
                      <div className="absolute inset-0 w-3 h-3 rounded-full bg-white dark:bg-stone-200 animate-ping" />
                    </div>
                  </div>

                  {/* Flecha para hover */}
                  <div
                    className={`absolute right-5 transition-all duration-500 ${isActive ? "opacity-0" : "opacity-0 group-hover:opacity-100 translate-x-2 group-hover:translate-x-0"}`}
                  >
                    <svg
                      className="w-5 h-5 text-stone-900 dark:text-white"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 5l7 7-7 7"
                      />
                    </svg>
                  </div>
                </button>
              );
            })}
          </nav>

          {/* CTA y contacto - Fixed bottom */}
          <div className="relative p-8 pt-4 space-y-4 border-t border-stone-200/60 dark:border-stone-700/60 flex-shrink-0 bg-white dark:bg-stone-950">
            {/* Botón CTA principal mejorado */}
            <Link
              href="https://api.whatsapp.com/send?phone=593983366831&text=Hola%2C%20%C2%BFque%20tal%3F.%0AQuisiera%20agendar%20una%20cita%20contigo%E2%99%A5%EF%B8%8F"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setIsMobileMenuOpen(false)}
              className="block w-full group"
            >
              <Button className="relative w-full py-6 text-base font-bold bg-stone-900 hover:bg-stone-800 dark:bg-stone-100 dark:hover:bg-stone-200 text-white dark:text-stone-900 shadow-2xl hover:shadow-stone-900/50 transition-all duration-700 hover:scale-[1.03] rounded-2xl overflow-hidden">
                <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
                <span className="relative flex items-center justify-center gap-3">
                  <FaWhatsapp className="w-5 h-5" />
                  <span className="text-sm sm:text-base">
                    Reservar Consulta
                  </span>
                  <svg
                    className="w-4 h-4 transform group-hover:translate-x-1 transition-transform duration-300"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2.5}
                      d="M13 7l5 5m0 0l-5 5m5-5H6"
                    />
                  </svg>
                </span>
              </Button>
            </Link>

            {/* Info de contacto mejorada */}
            <div className="relative bg-stone-100 dark:bg-stone-800 rounded-2xl p-4 space-y-2 backdrop-blur-sm border border-stone-300/50 dark:border-stone-700/50">
              <div className="absolute top-0 right-0 w-16 h-16 bg-stone-400/5 rounded-full blur-2xl" />

              <div className="flex items-center gap-3 relative z-10">
                <div className="w-9 h-9 rounded-xl bg-stone-900 dark:bg-stone-100 flex items-center justify-center flex-shrink-0">
                  <FiPhone className="w-4 h-4 text-white dark:text-stone-900" />
                </div>
                <div className="min-w-0">
                  <p className="text-xs text-stone-500 dark:text-stone-400">
                    Llámame o escríbeme
                  </p>
                  <p className="text-sm font-semibold text-stone-700 dark:text-stone-300">
                    (+593) 983366831
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2 text-xs text-stone-600 dark:text-stone-400 relative z-10">
                <span className="inline-block w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse flex-shrink-0" />
                <span>Lun - Sáb: 9:00 AM - 5:00 PM</span>
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
          0%,
          100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-5px);
          }
        }

        /* Scrollbar personalizado para el menú */
        nav::-webkit-scrollbar {
          width: 6px;
        }

        nav::-webkit-scrollbar-track {
          background: transparent;
        }

        nav::-webkit-scrollbar-thumb {
          background: #44403c;
          border-radius: 10px;
        }

        nav::-webkit-scrollbar-thumb:hover {
          background: #292524;
        }
      `}</style>
    </>
  );
}
