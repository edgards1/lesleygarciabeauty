"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  FaStar,
  FaInstagram,
  FaFacebook,
  FaWhatsapp,
} from "react-icons/fa";
import { MdPhotoCamera } from "react-icons/md";

import { AppleNav } from "@/components/apple-nav";
import { HeroSection } from "@/components/hero-section";
import { VideoPreview } from "@/components/video-preview";
import { ImagePreview } from "@/components/image-preview";
import { ContactForm } from "@/components/contact-form";
import { FadeIn } from "@/components/animations/fade-in";
import { StaggerContainer } from "@/components/animations/stagger-container";
import { useSmoothScroll } from "@/hooks/use-smooth-scroll";
import aboutPhoto from "@/public/img/ebano_1.jpg";

export default function MakeupArtistPortfolio() {
  const [activeFilter, setActiveFilter] = useState("Todos");

  const portfolioImages = [
    {
      src: "/img/novia_01.JPG",
      alt: "Maquillaje de Novia",
      category: ["Novias", "Evento Especial"],
      type: "image",
      hoverImage: "/img/novia_1.JPG", // Imagen alternativa en hover
    },
    {
      src: "/img/video_ebano_1.mov",
      alt: "Maquillaje de piel ébano",
      category: "Piel Ébano",
      type: "video",
      previewImage: "/img/ebano_1.jpg", // Imagen de preview estático
    },
    {
      src: "/img/social_10.jpg",
      alt: "Maquillaje Social",
      category: ["Social", "Evento Especial"],
      type: "image",
      hoverImage: "/img/social_010.jpg", // Imagen alternativa en hover
    },
    {
      src: "/img/video_social_6.MOV",
      alt: "Maquillaje para evento social",
      category: "Social",
      type: "video",
      previewImage: "/img/social_6.jpg", // Imagen de preview estático
    },
    {
      src: "/img/social_7.jpg",
      alt: "Maquillaje editorial - Look dramático",
      category: ["Editorial", "Piel Ébano"],
      type: "image",
      hoverImage: "/img/social_6.jpg", // Imagen alternativa en hover
    },
    {
      src: "/img/social_3.JPG",
      alt: "Maquillaje Social",
      category: "Social",
      type: "image",
      hoverImage: "/img/social_03.JPG", // Imagen alternativa en hover
    },
  ];

  const portfolioCategories = [
    "Todos",
    "Novias",
    "Piel Ébano",
    "Evento Especial",
    "Social",
  ];

  const filteredImages = activeFilter === "Todos" ? portfolioImages : portfolioImages.filter((media) => {
    if (Array.isArray(media.category)) {
      return media.category.includes(activeFilter);
    }
    return media.category === activeFilter;
  });

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

  const { scrollToSection } = useSmoothScroll();

  return (
    <div className="min-h-screen bg-white dark:bg-stone-900 transition-colors">
      <AppleNav />
      <HeroSection />

      {/* About Section — 100vh */}
      <section
        id="about"
        className="relative min-h-screen overflow-hidden bg-white dark:bg-stone-900 transition-colors flex items-center"
      >
        <div className="container max-w-7xl mx-auto px-5 sm:px-8 w-full">
          <div className="grid lg:grid-cols-[1fr_1fr] gap-10 lg:gap-16 items-stretch">
            {/* Text column — vertically centered */}
            <FadeIn
              delay={0.15}
              className="flex flex-col justify-center py-16 sm:py-20 lg:py-0"
            >
              <div className="space-y-7 max-w-lg">
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

                <p className="text-lg sm:text-xl text-stone-700 dark:text-stone-300 leading-[1.7] font-normal">
                  Maquilladora profesional y creadora de contenido UGC. Trabajo
                  con novias y marcas de belleza que quieren verse auténticas —
                  no filtradas.
                </p>

                <p className="text-sm text-stone-400 dark:text-stone-500 leading-[1.8] max-w-md">
                  Mi especialidad es la piel: entender su textura, su tono, cómo
                  reacciona a la luz. Más de 100 novias atendidas en Ecuador.
                </p>

                {/* Stats */}
                <div className="flex items-center gap-8 pt-4">
                  <div>
                    <p className="text-4xl font-serif font-light tracking-tight text-stone-900 dark:text-stone-100">
                      5<span className="text-2xl text-stone-300 dark:text-stone-600">+</span>
                    </p>
                    <p className="text-[9px] uppercase tracking-[0.2em] text-stone-400 dark:text-stone-500 font-medium mt-1">
                      Años
                    </p>
                  </div>
                  <div className="h-10 w-px bg-stone-200 dark:bg-stone-700" />
                  <div>
                    <p className="text-4xl font-serif font-light tracking-tight text-stone-900 dark:text-stone-100">
                      100<span className="text-2xl text-stone-300 dark:text-stone-600">+</span>
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
            <FadeIn
              delay={0.3}
              className="relative min-h-[50vh] lg:min-h-0"
            >
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
        className="py-24 bg-stone-50 dark:bg-stone-800 relative overflow-hidden"
      >
        <div className="container mx-auto px-4 relative z-10">
          <FadeIn className="max-w-7xl mx-auto mb-16">
            <div className="flex items-center gap-4 mb-6">
              <div className="h-px w-8 bg-stone-300 dark:bg-stone-700" />
              <span className="text-[10px] uppercase tracking-[0.3em] text-stone-400 dark:text-stone-500 font-medium">
                Servicios
              </span>
            </div>
            <h2 className="text-4xl sm:text-5xl font-serif text-stone-900 dark:text-stone-100 leading-[1.1] max-w-lg">
              Lo que hago
              <span className="text-stone-300 dark:text-stone-600">.</span>
            </h2>
          </FadeIn>

          {/* Featured services — 2 large cards */}
          <StaggerContainer className="grid md:grid-cols-2 gap-5 max-w-7xl mx-auto mb-5">
            {/* Novia — featured */}
            <Card className="group bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-700 hover:border-stone-300 dark:hover:border-stone-600 shadow-sm hover:shadow-lg transition-all duration-500 rounded-2xl overflow-hidden">
              <CardContent className="p-8 sm:p-10 flex flex-col h-full">
                <div className="flex items-start justify-between mb-6">
                  <span className="text-[9px] uppercase tracking-[0.25em] text-stone-400 dark:text-stone-500 font-medium bg-stone-100 dark:bg-stone-800 px-3 py-1.5 rounded-full">
                    Novia
                  </span>
                  <FaWhatsapp className="w-4 h-4 text-stone-300 dark:text-stone-600 group-hover:text-green-500 transition-colors duration-300" />
                </div>

                <div className="flex-1">
                  <h3 className="text-2xl sm:text-3xl font-serif text-stone-900 dark:text-stone-100 mb-4 leading-tight">
                    Maquillaje de
                    <br />
                    <span className="italic">novia</span>
                  </h3>
                  <p className="text-sm text-stone-500 dark:text-stone-400 leading-relaxed max-w-sm">
                    Look completo incluyendo sesión de prueba y aplicación el
                    día de la boda. Mezclo técnicas con tu estilo para un
                    resultado que se siente tuyo.
                  </p>
                </div>

                <div className="flex items-end justify-between mt-10 pt-6 border-t border-stone-100 dark:border-stone-800">
                  <div>
                    <p className="text-[10px] uppercase tracking-[0.2em] text-stone-400 dark:text-stone-500 font-medium mb-1">
                      Desde
                    </p>
                    <p className="text-3xl font-serif font-light tracking-tight text-stone-900 dark:text-stone-100">
                      $250
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-[10px] uppercase tracking-[0.2em] text-stone-400 dark:text-stone-500 font-medium mb-1">
                      Duración
                    </p>
                    <p className="text-sm text-stone-700 dark:text-stone-300 font-medium">
                      3–4 horas
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* UGC — featured */}
            <Card className="group bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-700 hover:border-stone-300 dark:hover:border-stone-600 shadow-sm hover:shadow-lg transition-all duration-500 rounded-2xl overflow-hidden">
              <CardContent className="p-8 sm:p-10 flex flex-col h-full">
                <div className="flex items-start justify-between mb-6">
                  <span className="text-[9px] uppercase tracking-[0.25em] text-stone-400 dark:text-stone-500 font-medium bg-stone-100 dark:bg-stone-800 px-3 py-1.5 rounded-full">
                    UGC
                  </span>
                  <FaWhatsapp className="w-4 h-4 text-stone-300 dark:text-stone-600 group-hover:text-green-500 transition-colors duration-300" />
                </div>

                <div className="flex-1">
                  <h3 className="text-2xl sm:text-3xl font-serif text-stone-900 dark:text-stone-100 mb-4 leading-tight">
                    Contenido
                    <br />
                    <span className="italic">UGC</span>
                  </h3>
                  <p className="text-sm text-stone-500 dark:text-stone-400 leading-relaxed max-w-sm">
                    Filmación, edición y publicación de contenido orgánico para
                    marcas. Las publican tal cual — sin
                    productor extra.
                  </p>
                </div>

                <div className="flex items-end justify-between mt-10 pt-6 border-t border-stone-100 dark:border-stone-800">
                  <div>
                    <p className="text-[10px] uppercase tracking-[0.2em] text-stone-400 dark:text-stone-500 font-medium mb-1">
                      Por proyecto
                    </p>
                    <p className="text-sm text-stone-700 dark:text-stone-300 font-medium">
                      Consultar
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-[10px] uppercase tracking-[0.2em] text-stone-400 dark:text-stone-500 font-medium mb-1">
                      Entrega
                    </p>
                    <p className="text-sm text-stone-700 dark:text-stone-300 font-medium">
                      3–5 días
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </StaggerContainer>

          {/* Secondary services — 2 smaller cards */}
          <StaggerContainer className="grid md:grid-cols-2 gap-5 max-w-7xl mx-auto">
            {/* Automaquillaje */}
            <Card className="group bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-700 hover:border-stone-300 dark:hover:border-stone-600 shadow-sm hover:shadow-lg transition-all duration-500 rounded-2xl overflow-hidden">
              <CardContent className="p-7 flex items-center gap-6">
                <div className="flex-1 min-w-0">
                  <h3 className="text-base font-semibold text-stone-900 dark:text-stone-100 mb-1.5">
                    Curso de Automaquillaje
                  </h3>
                  <p className="text-xs text-stone-500 dark:text-stone-400 leading-relaxed mb-4">
                    Sesiones personalizadas uno a uno para que aprendas a
                    maquillarte con confianza.
                  </p>
                  <div className="flex items-center gap-4">
                    <span className="text-sm font-serif text-stone-900 dark:text-stone-100">
                      Desde $120
                    </span>
                    <span className="text-[9px] uppercase tracking-[0.15em] text-stone-400 dark:text-stone-500">
                      8 clases
                    </span>
                  </div>
                </div>
                <div className="w-10 h-10 rounded-full border border-stone-200 dark:border-stone-700 flex items-center justify-center shrink-0 group-hover:bg-stone-900 dark:group-hover:bg-stone-100 group-hover:border-transparent transition-all duration-300">
                  <FaStar className="w-3.5 h-3.5 text-stone-600 dark:text-stone-400 group-hover:text-white dark:group-hover:text-stone-900 transition-colors" />
                </div>
              </CardContent>
            </Card>

            {/* Social */}
            <Card className="group bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-700 hover:border-stone-300 dark:hover:border-stone-600 shadow-sm hover:shadow-lg transition-all duration-500 rounded-2xl overflow-hidden">
              <CardContent className="p-7 flex items-center gap-6">
                <div className="flex-1 min-w-0">
                  <h3 className="text-base font-semibold text-stone-900 dark:text-stone-100 mb-1.5">
                    Maquillaje Social
                  </h3>
                  <p className="text-xs text-stone-500 dark:text-stone-400 leading-relaxed mb-4">
                    Eventos, fiestas y ocasiones especiales. Un look que
                    destaque sin perder naturalidad.
                  </p>
                  <div className="flex items-center gap-4">
                    <span className="text-sm font-serif text-stone-900 dark:text-stone-100">
                      Desde $70
                    </span>
                    <span className="text-[9px] uppercase tracking-[0.15em] text-stone-400 dark:text-stone-500">
                      2–3 horas
                    </span>
                  </div>
                </div>
                <div className="w-10 h-10 rounded-full border border-stone-200 dark:border-stone-700 flex items-center justify-center shrink-0 group-hover:bg-stone-900 dark:group-hover:bg-stone-100 group-hover:border-transparent transition-all duration-300">
                  <MdPhotoCamera className="w-3.5 h-3.5 text-stone-600 dark:text-stone-400 group-hover:text-white dark:group-hover:text-stone-900 transition-colors" />
                </div>
              </CardContent>
            </Card>
          </StaggerContainer>

          {/* Bottom CTA */}
          <FadeIn className="text-center mt-16">
            <p className="text-sm text-stone-500 dark:text-stone-400 mb-6">
              ¿Necesitas algo fuera de catálogo?
            </p>
            <button
              type="button"
              onClick={() => scrollToSection("contact")}
              className="group inline-flex h-12 items-center justify-center border border-stone-900 dark:border-stone-100 px-7 text-[10px] font-medium uppercase tracking-[0.25em] text-stone-900 dark:text-stone-100 transition-all duration-300 hover:bg-stone-900 dark:hover:bg-stone-100 hover:text-white dark:hover:text-stone-900"
            >
              Consulta personalizada
              <span className="ml-3 inline-block h-px w-5 bg-current transition-all duration-300 group-hover:w-7" />
            </button>
          </FadeIn>
        </div>
      </section>

      {/* Portfolio Section */}
      <section
        id="portfolio"
        className="py-20 bg-white dark:bg-stone-900 transition-colors"
      >
        <div className="container mx-auto px-4">
          <FadeIn className="text-center space-y-4 mb-16">
            <h2 className="text-5xl font-serif text-stone-900 dark:text-stone-100">
              Portafolio
            </h2>
            <p className="text-lg text-stone-600 dark:text-stone-400 max-w-2xl mx-auto">
              Explora mi trabajo reciente mostrando varios estilos y técnicas de
              maquillaje en diferentes ocasiones y entornos.
            </p>

            {/* Portfolio filters */}
            <div className="flex flex-wrap justify-center gap-3 mt-8">
              {portfolioCategories.map((category) => (
                <button
                  key={category}
                  onClick={() => setActiveFilter(category)}
                  className={`px-5 py-2.5 rounded-full text-xs font-medium uppercase tracking-wider transition-all duration-300 ${
                    activeFilter === category
                      ? "bg-stone-900 dark:bg-stone-100 text-white dark:text-stone-900 shadow-lg"
                      : "bg-stone-100 dark:bg-stone-800 text-stone-600 dark:text-stone-300 hover:bg-stone-200 dark:hover:bg-stone-700"
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </FadeIn>

          <StaggerContainer className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            {filteredImages.map((media, index) => (
              <div key={index}>
                {media.type === "video" ? (
                  <VideoPreview
                    videoSrc={media.src}
                    previewImage={media.previewImage}
                    alt={media.alt}
                    category={media.category}
                    priority={index < 3}
                  />
                ) : (
                  <ImagePreview
                    src={media.src}
                    hoverImage={media.hoverImage}
                    alt={media.alt}
                    category={media.alt}
                    priority={index < 3}
                  />
                )}
              </div>
            ))}
          </StaggerContainer>

          {/* Portfolio Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 py-12">
            {[
              { number: "500+", label: "Clientes Satisfechas" },
              { number: "8+", label: "Años de Experiencia" },
              { number: "200+", label: "Novias Maquilladas" },
              { number: "50+", label: "Eventos Especiales" },
            ].map((stat, index) => (
              <FadeIn
                key={index}
                delay={0.2 + index * 0.1}
                className="text-center"
              >
                <div className="text-4xl font-serif text-stone-900 dark:text-stone-100 mb-2">
                  {stat.number}
                </div>
                <div className="text-xs text-stone-500 dark:text-stone-400 uppercase tracking-widest font-medium">
                  {stat.label}
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

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

          {/* UGC Content Gallery - Horizontal Scroll */}
          <FadeIn delay={0.2}>
            <div className="relative">
              {/* Fade edges */}
              <div className="absolute left-0 top-0 bottom-0 w-16 bg-gradient-to-r from-[#0a0a0a] to-transparent z-10 pointer-events-none" />
              <div className="absolute right-0 top-0 bottom-0 w-16 bg-gradient-to-l from-[#0a0a0a] to-transparent z-10 pointer-events-none" />

              {/* Scrollable gallery */}
              <div className="flex gap-5 overflow-x-auto pb-6 scrollbar-hide snap-x snap-mandatory -mx-4 px-4 md:mx-0 md:px-0">
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
                    key={index}
                    className="flex-shrink-0 w-[260px] md:w-[300px] snap-center group cursor-pointer"
                  >
                    <div className="relative aspect-[3/4] rounded-xl overflow-hidden mb-4">
                      <img
                        src={item.src}
                        alt={`UGC para ${item.brand}`}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                      {/* Overlay on hover */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                      {/* Type badge */}
                      <div className="absolute top-4 left-4">
                        <span className="bg-white/10 backdrop-blur-md text-white text-[10px] font-medium uppercase tracking-widest px-3 py-1.5 rounded-full border border-white/10">
                          {item.type}
                        </span>
                      </div>

                      {/* Brand label on hover */}
                      <div className="absolute bottom-4 left-4 right-4 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
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
                Marcas que confían enmí
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
        <div className="container mx-auto px-4">
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
              para reservar tu cita y comenzar tu transformación.
            </p>
          </FadeIn>

          {/* FORMULARIO DE CONTACTO */}
          <ContactForm />
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#0a0a0a] text-white pt-16 pb-8">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-start">
            {/* Columna Izquierda - Logo y Frase */}
            <FadeIn className="text-center md:text-left space-y-5">
              <div className="text-3xl font-serif italic">Lesley García</div>
              <p className="text-white/40 text-sm leading-relaxed max-w-sm mx-auto md:mx-0">
                Creando momentos de belleza únicos que resaltan tu esencia
                natural. Cada look es una obra de arte diseñada especialmente
                para ti.
              </p>
            </FadeIn>

            {/* Columna Derecha - Redes Sociales y Botón de Citas */}
            <FadeIn delay={0.2} className="text-center md:text-right space-y-6">
              <div>
                <h4 className="text-[10px] uppercase tracking-[0.25em] text-white/40 mb-5 font-medium">
                  Sígueme
                </h4>
                <div className="flex justify-center md:justify-end space-x-3 mb-6">
                  <Link
                    href="https://www.instagram.com/lesleygarciabeauty"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Button
                      variant="outline"
                      size="icon"
                      className="border-white/15 text-white/60 hover:bg-white hover:text-[#0a0a0a] hover:border-white bg-transparent transition-all duration-300 w-11 h-11 rounded-full"
                    >
                      <FaInstagram className="w-4 h-4" />
                    </Button>
                  </Link>
                  <Button
                    variant="outline"
                    size="icon"
                    className="border-white/15 text-white/60 hover:bg-white hover:text-[#0a0a0a] hover:border-white bg-transparent transition-all duration-300 w-11 h-11 rounded-full"
                  >
                    <FaFacebook className="w-4 h-4" />
                  </Button>
                  <Link
                    href="https://api.whatsapp.com/send?phone=593983366831&text=Hola%2C%20%C2%BFque%20tal%3F.%0AQuisiera%20agendar%20una%20cita%20contigo%E2%99%A5%EF%B8%8F"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Button
                      variant="outline"
                      size="icon"
                      className="border-white/15 text-white/60 hover:bg-white hover:text-[#0a0a0a] hover:border-white bg-transparent transition-all duration-300 w-11 h-11 rounded-full"
                    >
                      <FaWhatsapp className="w-4 h-4" />
                    </Button>
                  </Link>
                </div>
              </div>

              {/* Botón de Agendar Citas */}
              <Link
                href="https://api.whatsapp.com/send?phone=593983366831&text=Hola%2C%20%C2%BFque%20tal%3F.%0AQuisiera%20agendar%20una%20cita%20contigo%E2%99%A5%EF%B8%8F"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button className="px-8 py-3 bg-white text-[#0a0a0a] hover:bg-white/90 font-medium text-xs uppercase tracking-widest rounded-full transition-all duration-300 hover:shadow-lg">
                  <FaWhatsapp className="w-3.5 h-3.5 mr-2" />
                  Agendar Cita
                </Button>
              </Link>

              {/* Enlaces legales */}
              <div className="flex flex-wrap justify-center md:justify-end space-x-5 text-xs pt-4">
                <Link
                  href="#"
                  className="text-white/30 hover:text-white/70 transition-colors"
                >
                  Política de Privacidad
                </Link>
                <Link
                  href="#"
                  className="text-white/30 hover:text-white/70 transition-colors"
                >
                  Términos de Servicio
                </Link>
                <Link
                  href="#"
                  className="text-white/30 hover:text-white/70 transition-colors"
                >
                  Política de Reservas
                </Link>
              </div>
            </FadeIn>
          </div>

          {/* Copyright */}
          <div className="border-t border-white/10 mt-12 pt-8 text-center">
            <p className="text-white/20 text-xs">
              &copy; {new Date().getFullYear()} Lesley García Beauty. Todos los
              derechos reservados.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
