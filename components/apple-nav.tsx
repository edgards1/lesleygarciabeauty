"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { FaWhatsapp } from "react-icons/fa";
import {
  FiUser,
  FiBriefcase,
  FiImage,
  FiStar,
  FiPhone,
} from "react-icons/fi";

import Logo from "@/public/icons/Logo_LG.svg";

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
    id: "ugc",
    label: "UGC Creator",
    icon: FiImage,
    description: "Colaboraciones con marcas",
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

export function AppleNav() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("about");
  const [showNavbar, setShowNavbar] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);

      const scrollPosition = window.scrollY + 100;

      const aboutElement = document.getElementById("about");
      if (aboutElement) {
        const aboutTop = aboutElement.offsetTop;
        setShowNavbar(window.scrollY >= aboutTop - 100);
      }

      const sections = [
        "about",
        "services",
        "portfolio",
        "ugc",
        "testimonials",
        "contact",
      ];
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
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
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

  return (
    <>
      {/* ===== DESKTOP NAV (≥1024px) ===== */}
      <nav
        className={`hidden lg:block fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          showNavbar
            ? "translate-y-0 opacity-100"
            : "-translate-y-full opacity-0 pointer-events-none"
        }`}
      >
        <div className="mx-auto max-w-[1400px] px-5 sm:px-8 lg:px-12">
          <div
            className={`mt-4 flex items-center justify-between px-6 py-3 rounded-2xl transition-all duration-500 ${
              isScrolled
                ? "bg-white/80 backdrop-blur-xl shadow-[0_1px_3px_rgba(0,0,0,0.06)]"
                : "bg-white/60 backdrop-blur-md"
            }`}
          >
            {/* Logo */}
            <Link href="/" className="flex items-center gap-2.5 group">
              <img
                src={Logo.src}
                alt="Lesley García"
                className="h-8 w-auto transition-transform duration-300 group-hover:scale-105"
              />
            </Link>

            {/* Nav Links */}
            <div className="flex items-center gap-1">
              {menuItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`relative px-4 py-2 text-[11px] font-medium uppercase tracking-[0.18em] transition-colors duration-300 ${
                    activeSection === item.id
                      ? "text-[#0a0a0a] nav-link-active"
                      : "text-[#0a0a0a]/50 hover:text-[#0a0a0a]/80"
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </div>

            {/* CTA */}
            <Link
              href="https://api.whatsapp.com/send?phone=593983366831&text=Hola%2C%20%C2%BFque%20tal%3F.%0AQuisiera%20agendar%20una%20cita%20contigo%E2%99%A5%EF%B8%8F"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button className="h-9 px-5 bg-[#0a0a0a] hover:bg-[#0a0a0a]/80 text-white text-[10px] font-medium uppercase tracking-[0.2em] rounded-full transition-all duration-300 hover:shadow-md group">
                Reservar
                <span className="ml-2 inline-block h-px w-3 bg-current transition-all duration-300 group-hover:w-5" />
              </Button>
            </Link>
          </div>
        </div>
      </nav>

      {/* ===== MOBILE HAMBURGER BUTTON ===== */}
      <div className="fixed top-5 right-5 z-[60] lg:hidden">
        <Button
          variant="ghost"
          size="icon"
          onClick={toggleMobileMenu}
          className={`relative overflow-hidden text-[#0a0a0a] transition-all duration-300 rounded-full w-12 h-12 ${
            isScrolled || showNavbar
              ? "bg-white/90 backdrop-blur-xl shadow-lg"
              : "bg-white/70 backdrop-blur-md shadow-md"
          } hover:scale-105`}
          aria-label="Toggle menu"
        >
          {isMobileMenuOpen ? (
            <X className="h-5 w-5 relative z-10" />
          ) : (
            <Menu className="h-5 w-5 relative z-10" />
          )}
        </Button>
      </div>

      {/* ===== MOBILE OVERLAY ===== */}
      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40 transition-opacity duration-300 lg:hidden"
          onClick={toggleMobileMenu}
        />
      )}

      {/* ===== MOBILE SLIDE PANEL ===== */}
      <div
        className={`fixed inset-y-0 right-0 w-full sm:w-[340px] bg-white z-40 transform transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] lg:hidden ${
          isMobileMenuOpen
            ? "translate-x-0 opacity-100"
            : "translate-x-full opacity-0 pointer-events-none"
        }`}
      >
        <div className="relative h-full flex flex-col">
          {/* Header */}
          <div className="px-7 pt-7 pb-5 flex-shrink-0">
            <div className="flex items-center justify-between">
              <img
                src={Logo.src}
                alt="Lesley García"
                className="h-9 w-auto"
              />
              <button
                onClick={toggleMobileMenu}
                className="w-9 h-9 flex items-center justify-center rounded-full hover:bg-stone-100 transition-colors"
                aria-label="Close menu"
              >
                <X className="w-4 h-4 text-[#0a0a0a]" />
              </button>
            </div>
          </div>

          {/* Menu Items */}
          <nav className="flex-1 overflow-y-auto px-7 py-2 space-y-0.5">
            {menuItems.map((item, index) => {
              const Icon = item.icon;
              const isActive = activeSection === item.id;

              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`w-full group flex items-center gap-4 px-4 py-3.5 rounded-xl transition-all duration-300 ${
                    isActive
                      ? "bg-[#0a0a0a] text-white"
                      : "text-[#0a0a0a]/70 hover:bg-stone-50 hover:text-[#0a0a0a]"
                  }`}
                  style={{
                    animation: isMobileMenuOpen
                      ? `slideInRight 0.4s cubic-bezier(0.16, 1, 0.3, 1) ${index * 50}ms both`
                      : "none",
                  }}
                >
                  <Icon
                    className={`w-4 h-4 flex-shrink-0 ${
                      isActive
                        ? "text-white"
                        : "text-[#0a0a0a]/30 group-hover:text-[#0a0a0a]/50"
                    }`}
                  />
                  <span className="text-sm font-medium">{item.label}</span>
                </button>
              );
            })}
          </nav>

          {/* Bottom CTA */}
          <div className="px-7 pb-7 pt-4 flex-shrink-0">
            <Link
              href="https://api.whatsapp.com/send?phone=593983366831&text=Hola%2C%20%C2%BFque%20tal%3F.%0AQuisiera%20agendar%20una%20cita%20contigo%E2%99%A5%EF%B8%8F"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setIsMobileMenuOpen(false)}
              className="block"
            >
              <Button className="w-full h-12 bg-[#0a0a0a] hover:bg-[#0a0a0a]/85 text-white text-xs font-medium uppercase tracking-[0.2em] rounded-xl transition-all duration-300 group">
                <FaWhatsapp className="w-4 h-4 mr-2.5" />
                Reservar Consulta
                <span className="ml-2 inline-block h-px w-3 bg-current transition-all duration-300 group-hover:w-5" />
              </Button>
            </Link>
          </div>
        </div>
      </div>

      <style jsx global>{`
        @keyframes slideInRight {
          from {
            opacity: 0;
            transform: translateX(16px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        nav::-webkit-scrollbar {
          width: 4px;
        }
        nav::-webkit-scrollbar-track {
          background: transparent;
        }
        nav::-webkit-scrollbar-thumb {
          background: #d6d3d1;
          border-radius: 10px;
        }
      `}</style>
    </>
  );
}
