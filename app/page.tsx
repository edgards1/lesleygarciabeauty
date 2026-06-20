"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  FaStar,
  FaWhatsapp,
} from "react-icons/fa";
import { MdPhotoCamera } from "react-icons/md";

import { AppleNav } from "@/components/apple-nav";
import { HeroSection } from "@/components/hero-section";
import { ContactForm } from "@/components/contact-form";
import { PortfolioSection } from "@/components/portfolio-section";
import { SiteFooter } from "@/components/site-footer";
import { FadeIn } from "@/components/animations/fade-in";
import { StaggerContainer } from "@/components/animations/stagger-container";
import { useSmoothScroll } from "@/hooks/use-smooth-scroll";
import aboutPhoto from "@/public/img/ebano_1.jpg";

export default function MakeupArtistPortfolio() {
  const { scrollToSection } = useSmoothScroll();

  const testimonials = [
    {
      name: "Sarah Johnson",
      role: "Novia",
      content:
        "¡Trabajo absolutamente impresionante! Me hizo sentir como una princesa el día de mi boda. El maquillaje duró todo el día y se veía perfecto en cada foto.",
      rating: 5,
      image: "/placeholder.svg?height=60&width=60",
    },
    {
      name: "Emma Davis",
      role: "Modelo",
      content:
        "Profesional, talentosa y muy fácil de trabajar. Entiende exactamente qué look funciona mejor para cada sesión y siempre cumple.",
      rating: 5,
      image: "/placeholder.svg?height=60&width=60",
    },
    {
      name: "Lisa Chen",
      role: "Ejecutiva Corporativa",
      content:
        "La contrato para todos mis eventos importantes. Tiene un ojo increíble para los detalles y siempre me hace sentir segura y hermosa.",
      rating: 5,
      image: "/placeholder.svg?height=60&width=60",
    },
  ];

  return (
    <div className="min-h-screen bg-white dark:bg-stone-900 transition-colors">
      <AppleNav />

      {/* Announcement ticker — infinite seamless loop */}
      <div className="relative z-10 border-b border-black/5 bg-white overflow-hidden">
        <div className="flex whitespace-nowrap py-2 animate-ticker">
          {/* Group 1 */}
          <div className="flex items-center gap-6 pr-6 shrink-0 text-[9px] font-medium uppercase tracking-[0.35em] text-[#0a0a0a]/50">
            <span>Agenda tu fecha de novia 2026</span>
            <span className="text-[#0a0a0a]/20">&middot;</span>
            <span>Disponible para UGC Creator</span>
            <span className="text-[#0a0a0a]/20">&middot;</span>
            <span>Maquillaje Profesional en Guayaquil</span>
            <span className="text-[#0a0a0a]/20">&middot;</span>
          </div>
          {/* Group 2 */}
          <div className="flex items-center gap-6 pr-6 shrink-0 text-[9px] font-medium uppercase tracking-[0.35em] text-[#0a0a0a]/50">
            <span>Agenda tu fecha de novia 2026</span>
            <span className="text-[#0a0a0a]/20">&middot;</span>
            <span>Disponible para UGC Creator</span>
            <span className="text-[#0a0a0a]/20">&middot;</span>
            <span>Maquillaje Profesional en Guayaquil</span>
            <span className="text-[#0a0a0a]/20">&middot;</span>
          </div>
          {/* Group 3 */}
          <div className="flex items-center gap-6 pr-6 shrink-0 text-[9px] font-medium uppercase tracking-[0.35em] text-[#0a0a0a]/50">
            <span>Agenda tu fecha de novia 2026</span>
            <span className="text-[#0a0a0a]/20">&middot;</span>
            <span>Disponible para UGC Creator</span>
            <span className="text-[#0a0a0a]/20">&middot;</span>
            <span>Maquillaje Profesional en Guayaquil</span>
            <span className="text-[#0a0a0a]/20">&middot;</span>
          </div>
        </div>
      </div>

      <HeroSection />

      {/* About Section — 100vh */}
      <section
        id="about"
        className="relative min-h-screen overflow-hidden bg-white dark:bg-stone-900 transition-colors flex items-center"
      >
        <div className="container mx-auto px-5 sm:px-8 w-full pt-16">
          <div className="grid lg:grid-cols-[1fr_1fr] gap-10 lg:gap-16 items-stretch">
            {/* Text column — vertically centered */}
            <FadeIn
              delay={0.15}
              className="flex flex-col justify-center py-16 sm:py-20 lg:py-0"
            >
              <div className="space-y-7 max-w-xl">
                <div className="flex items-center gap-4">
                  <div className="h-px w-8 bg-stone-300 dark:bg-stone-700" />
                  <span className="text-[10px] uppercase tracking-[0.3em] text-stone-400 dark:text-stone-500 font-medium">
                    Sobre mí
                  </span>
                </div>

                <h2 className="font-serif text-[clamp(2.2rem,5vw,3.8rem)] leading-[1.05] tracking-[-0.02em] text-stone-900 dark:text-stone-100">
                  Lesley
                  <br />
                  <span className="italic text-stone-400 dark:text-stone-500">
                    García
                  </span>
                </h2>

                <p className="text-sm sm:text-base text-stone-700 dark:text-stone-300 font-normal leading-relaxed">
                  Soy maquilladora profesional especializada en pieles ébano,
                  dedicada a crear looks que realzan la belleza natural de cada
                  mujer. Ofrezco maquillaje para bodas, quinceañeras y eventos
                  especiales con un acabado impecable y de larga duración.
                  Además, imparto cursos personalizados para quienes desean
                  aprender o perfeccionar técnicas profesionales de maquillaje
                  con un enfoque inclusivo y adaptado a cada tipo de piel.
                </p>
                <p className="text-sm sm:text-base text-stone-700 dark:text-stone-300 font-normal leading-relaxed">
                  Además, imparto cursos personalizados para quienes desean
                  aprender o perfeccionar técnicas profesionales de maquillaje
                  con un enfoque inclusivo y adaptado a cada tipo de piel.
                </p>

                {/* Stats */}
                <div className="flex items-center gap-8 pt-4">
                  <div>
                    <p className="text-4xl font-serif font-light tracking-tight text-stone-900 dark:text-stone-100">
                      5
                      <span className="text-2xl text-stone-300 dark:text-stone-600">
                        +
                      </span>
                    </p>
                    <p className="text-[9px] uppercase tracking-[0.2em] text-stone-400 dark:text-stone-500 font-medium mt-1">
                      Años
                    </p>
                  </div>
                  <div className="h-10 w-px bg-stone-200 dark:bg-stone-700" />
                  <div>
                    <p className="text-4xl font-serif font-light tracking-tight text-stone-900 dark:text-stone-100">
                      40
                      <span className="text-2xl text-stone-300 dark:text-stone-600">
                        +
                      </span>
                    </p>
                    <p className="text-[9px] uppercase tracking-[0.2em] text-stone-400 dark:text-stone-500 font-medium mt-1">
                      Novias
                    </p>
                  </div>
                </div>

                {/* CTA button */}
                <div className="pt-4">
                  <button
                    type="button"
                    onClick={() => scrollToSection("services")}
                    className="group inline-flex h-12 items-center justify-center bg-stone-900 dark:bg-stone-100 px-7 text-[10px] font-medium uppercase tracking-[0.25em] text-white dark:text-stone-900 transition-all duration-300 hover:bg-stone-800 dark:hover:bg-stone-200 hover:shadow-lg"
                  >
                    Ver servicios
                    <span className="ml-3 inline-block h-px w-5 bg-current transition-all duration-300 group-hover:w-7" />
                  </button>
                </div>
              </div>
            </FadeIn>

            {/* Portrait — fills the full column height */}
            <FadeIn delay={0.3} className="relative min-h-[50vh] lg:min-h-0">
              <div className="relative h-full w-full rounded-xl overflow-hidden shadow-[0_20px_40px_-15px_rgba(0,0,0,0.12)] dark:shadow-[0_20px_40px_-15px_rgba(0,0,0,0.4)]">
                <img
                  src={aboutPhoto.src}
                  alt="Lesley García — maquilladora profesional"
                  className="absolute inset-0 w-full h-full object-cover"
                />
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section
        id="services"
        className="py-24 sm:py-32 bg-white dark:bg-stone-900 transition-colors"
      >
        <div className="container mx-auto px-5 sm:px-8">
          {/* Header — matches About section pattern */}
          <FadeIn className="mb-16 sm:mb-20">
            <div className="flex items-center gap-4 mb-6">
              <div className="h-px w-8 bg-stone-300 dark:bg-stone-700" />
              <span className="text-[10px] uppercase tracking-[0.3em] text-stone-400 dark:text-stone-500 font-medium">
                Servicios
              </span>
            </div>
            <h2 className="font-serif text-[clamp(2.2rem,5vw,3.8rem)] leading-[1.05] tracking-[-0.02em] text-stone-900 dark:text-stone-100 max-w-lg">
              Lo que hago
              <span className="text-stone-300 dark:text-stone-600">.</span>
            </h2>
            <p className="mt-6 max-w-md text-base leading-[1.6] text-stone-500 dark:text-stone-400">
              Maquillaje profesional y contenido UGC para novias y marcas de
              belleza.
            </p>
          </FadeIn>

          {/* Service cards — uniform 2×2 grid */}
          <StaggerContainer className="grid sm:grid-cols-2 gap-5 mb-20">
            {/* Novia */}
            <div className="group p-7 sm:p-8 bg-stone-50 dark:bg-stone-800/50 border border-stone-200 dark:border-stone-700 rounded-lg transition-all duration-300 hover:border-stone-300 dark:hover:border-stone-600 cursor-pointer">
              <h3 className="text-xl sm:text-2xl font-serif text-stone-900 dark:text-stone-100 mb-3 leading-tight">
                Maquillaje de novia
              </h3>
              <p className="text-sm text-stone-500 dark:text-stone-400 leading-[1.6] mb-6">
                Look completo con sesión de prueba y aplicación el día de la
                boda. Técnicas adaptadas a tu estilo.
              </p>
              <div className="flex items-center gap-3 text-xs text-stone-400 dark:text-stone-500 mb-6">
                <span>Desde $250</span>
                <span className="w-1 h-1 rounded-full bg-stone-300 dark:bg-stone-600" />
                <span>3–4 horas</span>
                <span className="w-1 h-1 rounded-full bg-stone-300 dark:bg-stone-600" />
                <span>Incluye prueba</span>
              </div>
              <a
                href="https://api.whatsapp.com/send?phone=593983366831&text=Hola%2C%20estoy%20interesada%20en%20el%20servicio%20de%20maquillaje%20de%20novia"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex w-full items-center justify-center gap-2.5 bg-stone-900 dark:bg-stone-100 text-white dark:text-stone-900 px-5 py-3 rounded-md text-[11px] font-medium uppercase tracking-[0.15em] transition-all duration-200 hover:bg-stone-800 dark:hover:bg-stone-200"
              >
                Agendar Sesión de Prueba
                <FaWhatsapp className="h-3.5 w-3.5 opacity-80" />
              </a>
            </div>

            {/* UGC */}
            <div className="group p-7 sm:p-8 bg-stone-50 dark:bg-stone-800/50 border border-stone-200 dark:border-stone-700 rounded-lg transition-all duration-300 hover:border-stone-300 dark:hover:border-stone-600 cursor-pointer">
              <h3 className="text-xl sm:text-2xl font-serif text-stone-900 dark:text-stone-100 mb-3 leading-tight">
                Contenido UGC
              </h3>
              <p className="text-sm text-stone-500 dark:text-stone-400 leading-[1.6] mb-6">
                Filmación, edición y publicación de contenido orgánico para
                marcas. Publican tal cual — sin productor extra.
              </p>
              <div className="flex items-center gap-3 text-xs text-stone-400 dark:text-stone-500 mb-6">
                <span>Consultar</span>
                <span className="w-1 h-1 rounded-full bg-stone-300 dark:bg-stone-600" />
                <span>Entrega 3–5 días</span>
                <span className="w-1 h-1 rounded-full bg-stone-300 dark:bg-stone-600" />
                <span>3 piezas incluidas</span>
              </div>
              <a
                href="https://api.whatsapp.com/send?phone=593983366831&text=Hola%2C%20estoy%20interesada%20en%20el%20servicio%20de%20UGC"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex w-full items-center justify-center gap-2.5 bg-stone-900 dark:bg-stone-100 text-white dark:text-stone-900 px-5 py-3 rounded-md text-[11px] font-medium uppercase tracking-[0.15em] transition-all duration-200 hover:bg-stone-800 dark:hover:bg-stone-200"
              >
                Solicitar Propuesta
                <FaWhatsapp className="h-3.5 w-3.5 opacity-80" />
              </a>
            </div>

            {/* Automaquillaje */}
            <div className="group p-7 sm:p-8 bg-stone-50 dark:bg-stone-800/50 border border-stone-200 dark:border-stone-700 rounded-lg transition-all duration-300 hover:border-stone-300 dark:hover:border-stone-600 cursor-pointer">
              <h3 className="text-xl sm:text-2xl font-serif text-stone-900 dark:text-stone-100 mb-3 leading-tight">
                Automaquillaje
              </h3>
              <p className="text-sm text-stone-500 dark:text-stone-400 leading-[1.6] mb-6">
                Sesiones personalizadas uno a uno para que aprendas a
                maquillarte con confianza.
              </p>
              <div className="flex items-center gap-3 text-xs text-stone-400 dark:text-stone-500 mb-6">
                <span>Desde $120</span>
                <span className="w-1 h-1 rounded-full bg-stone-300 dark:bg-stone-600" />
                <span>8 sesiones</span>
              </div>
              <a
                href="https://api.whatsapp.com/send?phone=593983366831&text=Hola%2C%20estoy%20interesada%20en%20el%20curso%20de%20automaquillaje"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex w-full items-center justify-center gap-2.5 bg-stone-900 dark:bg-stone-100 text-white dark:text-stone-900 px-5 py-3 rounded-md text-[11px] font-medium uppercase tracking-[0.15em] transition-all duration-200 hover:bg-stone-800 dark:hover:bg-stone-200"
              >
                Agendar Clase
                <FaWhatsapp className="h-3.5 w-3.5 opacity-80" />
              </a>
            </div>

            {/* Social */}
            <div className="group p-7 sm:p-8 bg-stone-50 dark:bg-stone-800/50 border border-stone-200 dark:border-stone-700 rounded-lg transition-all duration-300 hover:border-stone-300 dark:hover:border-stone-600 cursor-pointer">
              <h3 className="text-xl sm:text-2xl font-serif text-stone-900 dark:text-stone-100 mb-3 leading-tight">
                Maquillaje Social
              </h3>
              <p className="text-sm text-stone-500 dark:text-stone-400 leading-[1.6] mb-6">
                Eventos, fiestas y ocasiones especiales. Un look que destaque
                sin perder naturalidad.
              </p>
              <div className="flex items-center gap-3 text-xs text-stone-400 dark:text-stone-500 mb-6">
                <span>Desde $70</span>
                <span className="w-1 h-1 rounded-full bg-stone-300 dark:bg-stone-600" />
                <span>2–3 horas</span>
              </div>
              <a
                href="https://api.whatsapp.com/send?phone=593983366831&text=Hola%2C%20estoy%20interesada%20en%20el%20servicio%20de%20maquillaje%20social"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex w-full items-center justify-center gap-2.5 bg-stone-900 dark:bg-stone-100 text-white dark:text-stone-900 px-5 py-3 rounded-md text-[11px] font-medium uppercase tracking-[0.15em] transition-all duration-200 hover:bg-stone-800 dark:hover:bg-stone-200"
              >
                Reservar Fecha
                <FaWhatsapp className="h-3.5 w-3.5 opacity-80" />
              </a>
            </div>
          </StaggerContainer>

          {/* Bottom CTA — no card wrapper */}
          <FadeIn className="text-center">
            <h3 className="text-2xl sm:text-3xl font-serif text-stone-900 dark:text-stone-100 mb-3 tracking-[-0.02em]">
              ¿Necesitas algo <span className="italic">fuera de catálogo</span>?
            </h3>
            <p className="text-sm text-stone-500 dark:text-stone-400 mb-8 max-w-md mx-auto leading-[1.6]">
              Cada cliente es única. Cuéntame lo que necesitas y creo un paquete
              a tu medida.
            </p>
            <a
              href="https://api.whatsapp.com/send?phone=593983366831&text=Hola%2C%20necesito%20un%20servicio%20personalizado"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2.5 bg-stone-900 dark:bg-stone-100 text-white dark:text-stone-900 px-7 py-3.5 rounded-md text-[11px] font-medium uppercase tracking-[0.15em] transition-all duration-200 hover:bg-stone-800 dark:hover:bg-stone-200"
            >
              Consulta personalizada
              <FaWhatsapp className="h-3.5 w-3.5 opacity-80" />
            </a>
          </FadeIn>
        </div>
      </section>

      {/* Portfolio Section */}
      <PortfolioSection />

      {/* UGC Creator Section */}
      <section
        id="ugc"
        className="py-24 bg-[#0a0a0a] text-white relative overflow-hidden"
      >
        {/* Subtle grain texture overlay */}
        <div
          aria-hidden
          className="absolute inset-0 opacity-[0.03] pointer-events-none"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
          }}
        />

        <div className="container mx-auto px-4 relative z-10">
          {/* Section Header */}
          <FadeIn className="max-w-4xl mx-auto text-center mb-20">
            <div className="flex items-center justify-center gap-4 mb-8">
              <div className="h-px w-12 bg-white/20" />
              <span className="text-[10px] font-medium uppercase tracking-[0.35em] text-white/50">
                UGC Creator &amp; Brand Collaborations
              </span>
              <div className="h-px w-12 bg-white/20" />
            </div>

            <h2 className="text-5xl md:text-6xl font-serif italic text-white mb-6 leading-[1.05]">
              Contenido que
              <br />
              impulsa marcas
            </h2>

            <p className="text-base text-white/50 max-w-xl mx-auto leading-relaxed">
              Colaboro con marcas de skincare y cosmética para crear contenido
              digital auténtico que conecta con audiencias y genera resultados
              medibles.
            </p>
          </FadeIn>

          {/* UGC Content Gallery — auto-scrolling marquee */}
          <FadeIn delay={0.2}>
            <div className="relative overflow-hidden">
              {/* Fade edges */}
              <div className="absolute left-0 top-0 bottom-0 w-16 bg-gradient-to-r from-[#0a0a0a] to-transparent z-10 pointer-events-none" />
              <div className="absolute right-0 top-0 bottom-0 w-16 bg-gradient-to-l from-[#0a0a0a] to-transparent z-10 pointer-events-none" />

              {/* Marquee track */}
              <div className="flex gap-5 animate-ugc-marquee w-max group-hover:[animation-play-state:paused]">
                {[
                  {
                    src: "/img/social_1.jpg",
                    brand: "Skincare Brand",
                    type: "Reel",
                  },
                  {
                    src: "/img/social_2.jpg",
                    brand: "Cosmética",
                    type: "Story",
                  },
                  {
                    src: "/img/social_5.jpg",
                    brand: "Belleza Natural",
                    type: "Post",
                  },
                  {
                    src: "/img/social_8.jpg",
                    brand: "Beauty Brand",
                    type: "Reel",
                  },
                  {
                    src: "/img/social_9.jpg",
                    brand: "Skincare Premium",
                    type: "Carrusel",
                  },
                  {
                    src: "/img/social_10.jpg",
                    brand: "Cosmética Profesional",
                    type: "Post",
                  },
                ].map((item, index) => (
                  <div
                    key={`a-${index}`}
                    className="flex-shrink-0 w-[260px] md:w-[300px] group/card cursor-pointer"
                  >
                    <div className="relative aspect-[3/4] rounded-xl overflow-hidden mb-4">
                      <img
                        src={item.src}
                        alt={`UGC para ${item.brand}`}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover/card:scale-105"
                      />
                      {/* Overlay on hover */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover/card:opacity-100 transition-opacity duration-500" />

                      {/* Type badge */}
                      <div className="absolute top-4 left-4">
                        <span className="bg-white/10 backdrop-blur-md text-white text-[10px] font-medium uppercase tracking-widest px-3 py-1.5 rounded-full border border-white/10">
                          {item.type}
                        </span>
                      </div>

                      {/* Brand label on hover */}
                      <div className="absolute bottom-4 left-4 right-4 translate-y-4 opacity-0 group-hover/card:translate-y-0 group-hover/card:opacity-100 transition-all duration-500">
                        <p className="text-xs text-white/60 uppercase tracking-widest mb-1">
                          Colaboración
                        </p>
                        <p className="text-sm font-medium text-white">
                          {item.brand}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
                {/* Duplicate for seamless loop */}
                {[
                  {
                    src: "/img/social_1.jpg",
                    brand: "Skincare Brand",
                    type: "Reel",
                  },
                  {
                    src: "/img/social_2.jpg",
                    brand: "Cosmética",
                    type: "Story",
                  },
                  {
                    src: "/img/social_5.jpg",
                    brand: "Belleza Natural",
                    type: "Post",
                  },
                  {
                    src: "/img/social_8.jpg",
                    brand: "Beauty Brand",
                    type: "Reel",
                  },
                  {
                    src: "/img/social_9.jpg",
                    brand: "Skincare Premium",
                    type: "Carrusel",
                  },
                  {
                    src: "/img/social_10.jpg",
                    brand: "Cosmética Profesional",
                    type: "Post",
                  },
                ].map((item, index) => (
                  <div
                    key={`b-${index}`}
                    className="flex-shrink-0 w-[260px] md:w-[300px] group/card cursor-pointer"
                  >
                    <div className="relative aspect-[3/4] rounded-xl overflow-hidden mb-4">
                      <img
                        src={item.src}
                        alt={`UGC para ${item.brand}`}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover/card:scale-105"
                      />
                      {/* Overlay on hover */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover/card:opacity-100 transition-opacity duration-500" />

                      {/* Type badge */}
                      <div className="absolute top-4 left-4">
                        <span className="bg-white/10 backdrop-blur-md text-white text-[10px] font-medium uppercase tracking-widest px-3 py-1.5 rounded-full border border-white/10">
                          {item.type}
                        </span>
                      </div>

                      {/* Brand label on hover */}
                      <div className="absolute bottom-4 left-4 right-4 translate-y-4 opacity-0 group-hover/card:translate-y-0 group-hover/card:opacity-100 transition-all duration-500">
                        <p className="text-xs text-white/60 uppercase tracking-widest mb-1">
                          Colaboración
                        </p>
                        <p className="text-sm font-medium text-white">
                          {item.brand}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </FadeIn>

          {/* Metrics Strip */}
          <FadeIn delay={0.4}>
            <div className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-8 border-t border-white/10 pt-12">
              {[
                { number: "50+", label: "Campañas UGC" },
                { number: "2.1M", label: "Views Acumulados" },
                { number: "30+", label: "Marcas Colaboradoras" },
                { number: "4.8%", label: "Engagement Promedio" },
              ].map((metric, index) => (
                <div key={index} className="text-center">
                  <p className="text-3xl md:text-4xl font-serif text-white mb-2">
                    {metric.number}
                  </p>
                  <p className="text-[10px] uppercase tracking-[0.25em] text-white/40 font-medium">
                    {metric.label}
                  </p>
                </div>
              ))}
            </div>
          </FadeIn>

          {/* Brand Logos Strip */}
          <FadeIn delay={0.5}>
            <div className="mt-16 text-center">
              <p className="text-[10px] uppercase tracking-[0.3em] text-white/30 mb-8 font-medium">
                Marcas que confían en mí
              </p>
              <div className="flex flex-wrap items-center justify-center gap-x-12 gap-y-6 opacity-30">
                {[
                  "SKINCARE CO",
                  "BEAUTÉ",
                  "GLOW LABS",
                  "DERMA BEAUTY",
                  "PURE COSMÉTICS",
                ].map((brand, index) => (
                  <span
                    key={index}
                    className="text-sm uppercase tracking-[0.2em] font-medium text-white"
                  >
                    {brand}
                  </span>
                ))}
              </div>
            </div>
          </FadeIn>

          {/* CTA */}
          <FadeIn delay={0.6} className="text-center mt-16">
            <button
              type="button"
              onClick={() => scrollToSection("contact")}
              className="group inline-flex h-12 items-center justify-center border border-white/20 px-8 text-[10px] font-medium uppercase tracking-[0.25em] text-white transition-all duration-300 hover:bg-white hover:text-[#0a0a0a] hover:border-white"
            >
              Trabajemos Juntos
              <span className="ml-3 inline-block h-px w-5 bg-current transition-all duration-300 group-hover:w-7" />
            </button>
          </FadeIn>
        </div>
      </section>

      {/* Testimonials Section */}
      <section
        id="testimonials"
        className="py-20 bg-stone-50 dark:bg-stone-800 transition-colors"
      >
        <div className="container mx-auto">
          <FadeIn className="text-center space-y-4 mb-16">
            <h2 className="text-5xl font-serif text-stone-900 dark:text-stone-100">
              Lo Que Dicen Mis Clientes
            </h2>
            <p className="text-lg text-stone-600 dark:text-stone-400 max-w-2xl mx-auto">
              La satisfacción de mis clientes es mi mayor recompensa. Aquí
              tienes algunas de sus experiencias.
            </p>
          </FadeIn>

          <StaggerContainer className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card
                key={index}
                className="bg-white dark:bg-stone-900 border-stone-200 dark:border-stone-700 hover:shadow-xl hover:scale-[1.02] transition-all duration-500 rounded-2xl"
              >
                <CardContent className="p-8 space-y-5">
                  <div className="flex justify-center">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <FaStar
                        key={i}
                        className="w-4 h-4 fill-stone-900 dark:fill-stone-100 text-stone-900 dark:text-stone-100"
                      />
                    ))}
                  </div>
                  <p className="text-stone-600 dark:text-stone-400 italic text-center leading-relaxed font-serif text-lg">
                    &ldquo;{testimonial.content}&rdquo;
                  </p>
                  <div className="flex items-center justify-center space-x-3 pt-5 border-t border-stone-100 dark:border-stone-800">
                    <div className="text-center">
                      <div className="font-semibold text-stone-900 dark:text-stone-100 text-sm">
                        {testimonial.name}
                      </div>
                      <div className="text-xs text-stone-500 dark:text-stone-500 uppercase tracking-wider mt-0.5">
                        {testimonial.role}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* Contact Section */}
      <section
        id="contact"
        className="py-20 bg-white dark:bg-stone-900 transition-colors relative overflow-hidden"
      >
        {/* Background decoration */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-24 -right-24 w-96 h-96 bg-stone-100 dark:bg-stone-800 rounded-full blur-3xl opacity-30" />
          <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-stone-100 dark:bg-stone-800 rounded-full blur-3xl opacity-30" />
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <FadeIn className="text-center space-y-6 mb-20">
            <h2 className="text-5xl md:text-6xl font-serif text-stone-900 dark:text-stone-100 leading-tight">
              Agenda tu Experiencia
            </h2>
            <p className="text-lg text-stone-600 dark:text-stone-400 max-w-2xl mx-auto leading-relaxed">
              Estoy aquí para hacer realidad tu visión de belleza. Contáctame
              para agendar tu cita y comenzar tu transformación.
            </p>
          </FadeIn>

          {/* FORMULARIO DE CONTACTO */}
          <FadeIn delay={0.2}>
            <ContactForm />
          </FadeIn>
        </div>
      </section>

      {/* Footer */}
      <SiteFooter />
    </div>
  );
}
