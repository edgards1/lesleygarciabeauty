"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
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
    label: "Sobre Mi",
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

const SPRING = "cubic-bezier(0.16, 1, 0.3, 1)";
const SPRING_SNAPPY = "cubic-bezier(0.34, 1.56, 0.64, 1)";

export function AppleNav() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("about");
  const [showNavbar, setShowNavbar] = useState(false);
  const [hoveredLink, setHoveredLink] = useState<string | null>(null);

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

    window.addEventListener("scroll", handleScroll, { passive: true });
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
      {/* ===== DESKTOP NAV (>=1024px) ===== */}
      <nav
        className={`hidden lg:block fixed top-0 left-0 right-0 z-50 transition-all duration-700 ${
          showNavbar
            ? "translate-y-0 opacity-100"
            : "-translate-y-full opacity-0 pointer-events-none"
        }`}
        style={{ transitionTimingFunction: SPRING }}
      >
        <div className="mx-auto max-w-[1400px] px-5 sm:px-8 lg:px-12">
          <div
            className={`mt-4 flex items-center justify-between px-6 py-3 rounded-2xl transition-all duration-700 ${
              isScrolled
                ? "bg-white/80 backdrop-blur-xl shadow-[0_2px_20px_-4px_rgba(0,0,0,0.08)]"
                : "bg-white/40 backdrop-blur-md"
            }`}
            style={{ transitionTimingFunction: SPRING }}
          >
            {/* Logo */}
            <Link href="/" className="flex items-center gap-2.5 group/logo">
              <img
                src={Logo.src}
                alt="Lesley Garcia"
                className="h-8 w-auto transition-transform duration-500 ease-out group-hover/logo:scale-110 group-active/logo:scale-95"
              />
            </Link>

            {/* Nav Links */}
            <div className="flex items-center gap-1">
              {menuItems.map((item) => {
                const isActive = activeSection === item.id;
                const isHovered = hoveredLink === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => handleNavClick(item.id)}
                    onMouseEnter={() => setHoveredLink(item.id)}
                    onMouseLeave={() => setHoveredLink(null)}
                    className={`relative px-4 py-2 text-[11px] font-medium uppercase tracking-[0.18em] transition-colors duration-300 select-none ${
                      isActive
                        ? "text-[#0a0a0a]"
                        : "text-[#0a0a0a]/45 hover:text-[#0a0a0a]/80"
                    }`}
                  >
                    <span className="relative z-10">{item.label}</span>
                    {/* Active underline -- slides in from left */}
                    <span
                      className={`absolute bottom-1 left-4 right-4 h-px bg-[#0a0a0a] transition-all duration-500 origin-left ${
                        isActive
                          ? "scale-x-100 opacity-100"
                          : "scale-x-0 opacity-0"
                      }`}
                      style={{ transitionTimingFunction: SPRING }}
                    />
                    {/* Hover background pill */}
                    <span
                      className={`absolute inset-0 rounded-lg transition-all duration-300 ${
                        isHovered && !isActive
                          ? "bg-[#0a0a0a]/[0.04] scale-100 opacity-100"
                          : "scale-95 opacity-0"
                      }`}
                      style={{ transitionTimingFunction: SPRING }}
                    />
                  </button>
                );
              })}
            </div>

            {/* CTA */}
            <Link
              href="https://api.whatsapp.com/send?phone=593983366831&text=Hola%2C%20%C2%BFque%20tal%3F.%0AQuisiera%20agendar%20una%20cita%20contigo%E2%99%A5%EF%B8%8F"
              target="_blank"
              rel="noopener noreferrer"
            >
              <span className="inline-flex h-9 items-center justify-center bg-[#0a0a0a] px-5 text-white text-[10px] font-medium uppercase tracking-[0.2em] rounded-full hover:bg-[#0a0a0a]/80 transition-colors duration-300">
                <span className="flex items-center gap-2">
                  Agendar
                  <FaWhatsapp className="w-3.5 h-3.5 text-stone-400" />
                </span>
              </span>
            </Link>
          </div>
        </div>
      </nav>

      {/* ===== MOBILE HAMBURGER BUTTON ===== */}
      <div className="fixed top-5 right-5 z-[60] lg:hidden">
        <button
          onClick={toggleMobileMenu}
          className={`relative w-12 h-12 flex items-center justify-center rounded-full transition-all duration-500 active:scale-90 ${
            isScrolled || showNavbar
              ? "bg-white/90 backdrop-blur-xl shadow-lg"
              : "bg-white/70 backdrop-blur-md shadow-md"
          }`}
          style={{ transitionTimingFunction: SPRING }}
          aria-label="Toggle menu"
        >
          {/* Ripple ring on press */}
          <span className="absolute inset-0 rounded-full ring-2 ring-[#0a0a0a]/10 scale-100 opacity-0 active:scale-125 active:opacity-100 transition-all duration-300 pointer-events-none" />
          {/* Morphing icon: Menu <-> X */}
          <span className="relative flex items-center justify-center w-5 h-5">
            <Menu
              className={`absolute inset-0 w-5 h-5 transition-all duration-400 ${
                isMobileMenuOpen
                  ? "rotate-90 scale-0 opacity-0"
                  : "rotate-0 scale-100 opacity-100"
              }`}
              style={{ transitionTimingFunction: SPRING_SNAPPY }}
            />
            <X
              className={`absolute inset-0 w-5 h-5 transition-all duration-400 ${
                isMobileMenuOpen
                  ? "rotate-0 scale-100 opacity-100"
                  : "-rotate-90 scale-0 opacity-0"
              }`}
              style={{ transitionTimingFunction: SPRING_SNAPPY }}
            />
          </span>
        </button>
      </div>

      {/* ===== MOBILE OVERLAY ===== */}
      <div
        className={`fixed inset-0 bg-black/40 backdrop-blur-sm z-40 transition-all duration-500 lg:hidden ${
          isMobileMenuOpen
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        }`}
        style={{ transitionTimingFunction: SPRING }}
        onClick={toggleMobileMenu}
      />

      {/* ===== MOBILE SLIDE PANEL ===== */}
      <div
        className={`fixed inset-y-0 right-0 w-full sm:w-[340px] bg-white z-40 transform transition-all duration-600 lg:hidden ${
          isMobileMenuOpen
            ? "translate-x-0 opacity-100"
            : "translate-x-full opacity-0 pointer-events-none"
        }`}
        style={{ transitionTimingFunction: SPRING }}
      >
        <div className="relative h-full flex flex-col">
          {/* Header */}
          <div className="px-7 pt-7 pb-5 flex-shrink-0">
            <div className="flex items-center justify-between">
              <img
                src={Logo.src}
                alt="Lesley Garcia"
                className="h-9 w-auto transition-transform duration-500"
              />
              <button
                onClick={toggleMobileMenu}
                className="w-9 h-9 flex items-center justify-center rounded-full hover:bg-stone-100 transition-all duration-300 active:scale-90"
                style={{ transitionTimingFunction: SPRING }}
                aria-label="Close menu"
              >
                <X className="w-4 h-4 text-[#0a0a0a]" />
              </button>
            </div>
          </div>

          {/* Menu Items -- fill entire screen */}
          <nav className="flex-1 flex flex-col">
            {menuItems.map((item, index) => {
              const Icon = item.icon;
              const isActive = activeSection === item.id;

              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`flex-1 group flex items-center gap-4 px-7 transition-all duration-300 ${
                    isActive
                      ? "bg-[#0a0a0a] text-white"
                      : "text-[#0a0a0a]/70 hover:bg-stone-50 hover:text-[#0a0a0a]"
                  }`}
                  style={{
                    transitionTimingFunction: SPRING,
                    animation: isMobileMenuOpen
                      ? `slideInRight 0.5s ${SPRING} ${index * 60}ms both`
                      : "none",
                  }}
                >
                  <Icon
                    className={`w-5 h-5 flex-shrink-0 transition-all duration-300 ${
                      isActive
                        ? "text-white"
                        : "text-[#0a0a0a]/25 group-hover:text-[#0a0a0a]/45"
                    }`}
                  />
                  <div className="flex-1 text-left">
                    <span className="text-base font-medium block">
                      {item.label}
                    </span>
                    <span
                      className={`text-xs transition-all duration-300 block overflow-hidden ${
                        isActive
                          ? "text-white/50 mt-0.5 max-h-5 opacity-100"
                          : "text-[#0a0a0a]/25 max-h-0 opacity-0 group-hover:text-[#0a0a0a]/35 group-hover:max-h-5 group-hover:mt-0.5"
                      }`}
                    >
                      {item.description}
                    </span>
                  </div>
                  {isActive && (
                    <span className="w-1.5 h-1.5 rounded-full bg-white/60 shrink-0" />
                  )}
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
              <span className="flex w-full h-12 items-center justify-center bg-[#0a0a0a] text-white text-xs font-medium uppercase tracking-[0.2em] rounded-xl hover:bg-[#0a0a0a]/85 transition-colors duration-300">
                <FaWhatsapp className="w-4 h-4 mr-2.5" />
                Agendar Cita
              </span>
            </Link>
          </div>
        </div>
      </div>

      <style jsx global>{`
        @keyframes slideInRight {
          from {
            opacity: 0;
            transform: translateX(20px) scale(0.96);
          }
          to {
            opacity: 1;
            transform: translateX(0) scale(1);
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
