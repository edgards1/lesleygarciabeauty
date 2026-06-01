"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  FaStar,
  FaPhone,
  FaEnvelope,
  FaHeart,
  FaInstagram,
  FaFacebook,
  FaAward,
  FaWhatsapp,
  FaWalking,
} from "react-icons/fa";
import { MdPhotoCamera } from "react-icons/md";
import { IoSparklesSharp } from "react-icons/io5";
import { GiLoveLetter } from "react-icons/gi";

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

  const services = [
    {
      title: "Maquillaje de Novia",
      description:
        "Look completo de novia incluyendo sesión de prueba y aplicación el día de la boda",
      price: "Desde $250",
      duration: "3-4 horas",
    },
    {
      title: "Maquillaje Social",
      description: "Perfecto para eventos, fiestas y ocasiones especiales",
      price: "Desde $70",
      duration: "2-3 horas",
    },
    {
      title: "Curso de Automaquillaje",
      description:
        "Tutoriales personalizados uno a uno y entrenamiento en técnicas",
      price: "Desde $120",
      duration: "8 clases",
    },
    {
      title: "Perfeccionamiento",
      description:
        "Sesiones personalizadas para perfeccionar técnicas específicas o aprender nuevos estilos",
      price: "Desde $120",
      duration: "8 clases",
    },
  ];

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

      {/* About Section - Editorial Style */}
      <section
        id="about"
        className="py-24 bg-white dark:bg-stone-900 transition-colors relative overflow-hidden"
      >
        {/* Subtle background glow */}
        <div className="absolute top-1/2 left-0 -translate-y-1/2 w-96 h-96 bg-stone-100 dark:bg-stone-800 rounded-full blur-[100px] opacity-40 pointer-events-none" />

        <div className="container">
          <div className="grid lg:grid-cols-[1fr_1.2fr] gap-16 lg:gap-24 items-center max-w-7xl mx-auto">
            {/* Image Column - Editorial Layout */}
            <FadeIn className="relative mx-auto w-full max-w-md lg:max-w-none">
              <div className="relative aspect-[3/4] sm:aspect-[4/5] z-10">
                {/* Decorative border frame */}
                <div className="absolute -inset-4 border border-stone-200 dark:border-stone-800 rounded-3xl opacity-50 hidden sm:block" />

                {/* Main Image */}
                <div className="relative w-full h-full rounded-2xl overflow-hidden shadow-[0_20px_40px_-15px_rgba(0,0,0,0.1)] dark:shadow-[0_20px_40px_-15px_rgba(0,0,0,0.4)] group">
                  <img
                    src={aboutPhoto.src}
                    alt="Lesley García - Maquilladora Profesional"
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Floating Experience Badge */}
                <div className="absolute -bottom-6 -right-6 lg:-right-8 bg-white/90 dark:bg-stone-950/90 backdrop-blur-md border border-stone-200/50 dark:border-stone-800/50 text-stone-900 dark:text-stone-100 p-6 rounded-2xl shadow-xl z-20 flex flex-col items-center justify-center min-w-[140px] transform hover:-translate-y-2 transition-transform duration-500">
                  <p className="text-4xl font-serif font-light tracking-tighter mb-1">
                    6<span className="text-2xl text-stone-400">+</span>
                  </p>
                  <p className="text-xs uppercase tracking-widest text-stone-500 dark:text-stone-400 font-medium text-center">
                    Años de
                    <br />
                    Experiencia
                  </p>
                </div>
              </div>
            </FadeIn>

            {/* Content Column */}
            <div className="space-y-8 lg:py-8">
              <FadeIn delay={0.2} className="space-y-6">
                <div className="flex items-center gap-4 mb-4">
                  <div className="h-px w-6 bg-stone-300 dark:bg-stone-700" />
                  <h2 className="text-2xl uppercase tracking-[0.2em] text-stone-500 dark:text-stone-400">
                    Conoce mi historia
                  </h2>
                </div>

                <div className="space-y-6 text-stone-600 dark:text-stone-400 text-lg leading-relaxed font-light">
                  <p>
                    Soy{" "}
                    <strong className="font-semibold text-stone-900 dark:text-stone-200">
                      Lesley García
                    </strong>
                    , maquilladora profesional y creadora de contenido UGC. Mi
                    pasión es el arte de la belleza en todas sus facetas: desde
                    preparar la piel perfecta para una novia, hasta comunicar la
                    esencia de una marca a través del lente.
                  </p>

                  <div className="pl-6 border-l-2 border-stone-200 dark:border-stone-700 py-2 my-8 italic text-stone-500 dark:text-stone-400">
                    "Elevando estéticas e impulsando marcas: maquillaje premium
                    y creación de contenido UGC estratégico."
                  </div>

                  <p>
                    Como maquilladora, diseño looks atemporales para bodas,
                    sesiones editoriales y eventos exclusivos. Como creadora
                    UGC, colaboro con marcas de skincare y cosmética para
                    desarrollar contenido digital auténtico, estético y de alta
                    conversión. Mi visión artística garantiza resultados
                    impecables tanto en persona como en pantalla.
                  </p>
                </div>
              </FadeIn>

              {/* Values/Pillars List */}
              <StaggerContainer className="grid sm:grid-cols-3 gap-6 pt-8 mt-8 border-t border-stone-100 dark:border-stone-800">
                <div className="group">
                  <div className="w-10 h-10 mb-4 rounded-full border border-stone-200 dark:border-stone-700 flex items-center justify-center group-hover:bg-stone-900 dark:group-hover:bg-stone-100 group-hover:border-transparent transition-all duration-300">
                    <IoSparklesSharp className="w-4 h-4 text-stone-700 dark:text-stone-300 group-hover:text-white dark:group-hover:text-stone-900 transition-colors" />
                  </div>
                  <h3 className="font-semibold text-stone-900 dark:text-stone-100 mb-2">
                    Visión Artística
                  </h3>
                  <p className="text-sm text-stone-500 dark:text-stone-400 leading-relaxed">
                    Maquillaje social y personalizado para resaltar tu belleza.
                  </p>
                </div>

                <div className="group">
                  <div className="w-10 h-10 mb-4 rounded-full border border-stone-200 dark:border-stone-700 flex items-center justify-center group-hover:bg-stone-900 dark:group-hover:bg-stone-100 group-hover:border-transparent transition-all duration-300">
                    <MdPhotoCamera className="w-4 h-4 text-stone-700 dark:text-stone-300 group-hover:text-white dark:group-hover:text-stone-900 transition-colors" />
                  </div>
                  <h3 className="font-semibold text-stone-900 dark:text-stone-100 mb-2">
                    Contenido UGC
                  </h3>
                  <p className="text-sm text-stone-500 dark:text-stone-400 leading-relaxed">
                    Fotografía y video estético, orgánico y listo para campañas
                    de marca.
                  </p>
                </div>

                <div className="group">
                  <div className="w-10 h-10 mb-4 rounded-full border border-stone-200 dark:border-stone-700 flex items-center justify-center group-hover:bg-stone-900 dark:group-hover:bg-stone-100 group-hover:border-transparent transition-all duration-300">
                    <FaAward className="w-4 h-4 text-stone-700 dark:text-stone-300 group-hover:text-white dark:group-hover:text-stone-900 transition-colors" />
                  </div>
                  <h3 className="font-semibold text-stone-900 dark:text-stone-100 mb-2">
                    Excelencia
                  </h3>
                  <p className="text-sm text-stone-500 dark:text-stone-400 leading-relaxed">
                    Alta gama en productos y atención meticulosa en cada
                    detalle.
                  </p>
                </div>
              </StaggerContainer>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section
        id="services"
        className="py-24 bg-stone-50 dark:bg-stone-800 relative overflow-hidden"
      >
        <div className="container mx-auto px-4 relative z-10">
          <FadeIn className="text-center space-y-6 mb-20">
            <h2 className="text-5xl font-serif text-stone-900 dark:text-stone-100 leading-tight">
              Servicios de Maquillaje
              {/* <span className="block text-3xl font-light mt-2 text-stone-600 dark:text-stone-400">
                Transforma tu look con precisión, estilo y duración para cada
                ocasión
              </span> */}
            </h2>
            <p className="text-xl text-stone-600 max-w-3xl mx-auto leading-relaxed">
              Desde maquillaje de novias hasta producciones y sesiones
              editoriales, ofrezco una gama completa de servicios profesionales
              adaptados a tus necesidades únicas.
            </p>
          </FadeIn>

          <StaggerContainer className="grid md:grid-cols-2 xl:grid-cols-4 gap-6 max-w-7xl mx-auto">
            {services.map((service, index) => (
              <Card
                key={index}
                className="group relative bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-700 hover:border-stone-900 dark:hover:border-stone-100 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1 overflow-visible rounded-2xl"
              >
                {/* Popular Badge for Featured Service */}
                {index === 0 && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 z-10">
                    <div className="bg-stone-900 dark:bg-stone-100 text-white dark:text-stone-900 px-4 py-1.5 rounded-md text-[10px] font-bold tracking-wider shadow-lg uppercase">
                      Popular
                    </div>
                  </div>
                )}

                {/* Service Number Badge */}
                <div className="absolute top-6 right-6 w-10 h-10 rounded-full bg-stone-100 dark:bg-stone-800 flex items-center justify-center group-hover:bg-stone-900 dark:group-hover:bg-stone-100 transition-colors duration-300 z-0">
                  <span className="text-stone-900 dark:text-stone-100 group-hover:text-white dark:group-hover:text-stone-900 text-sm font-bold">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                </div>

                <CardContent className="p-8 space-y-5">
                  {/* Service Icon */}
                  <div className="w-14 h-14 rounded-xl bg-stone-50 dark:bg-stone-800 flex items-center justify-center group-hover:bg-stone-900 dark:group-hover:bg-stone-100 transition-all duration-300">
                    {index === 0 && (
                      <GiLoveLetter className="w-7 h-7 text-stone-900 dark:text-stone-100 group-hover:text-white dark:group-hover:text-stone-900 transition-colors duration-300" />
                    )}
                    {index === 1 && (
                      <MdPhotoCamera className="w-7 h-7 text-stone-900 dark:text-stone-100 group-hover:text-white dark:group-hover:text-stone-900 transition-colors duration-300" />
                    )}
                    {index === 2 && (
                      <FaStar className="w-7 h-7 text-stone-900 dark:text-stone-100 group-hover:text-white dark:group-hover:text-stone-900 transition-colors duration-300" />
                    )}
                    {index === 3 && (
                      <FaStar className="w-7 h-7 text-stone-900 dark:text-stone-100 group-hover:text-white dark:group-hover:text-stone-900 transition-colors duration-300" />
                    )}
                  </div>

                  {/* Service Title */}
                  <div className="min-h-[110px]">
                    <h3 className="text-xl font-semibold text-stone-900 dark:text-stone-100 mb-3 leading-tight">
                      {service.title}
                    </h3>
                    <p className="text-stone-600 dark:text-stone-400 leading-relaxed text-sm">
                      {service.description}
                    </p>
                  </div>

                  {/* Service Details */}
                  <div className="space-y-3 pt-5 border-t border-stone-200 dark:border-stone-700">
                    <div className="flex items-center justify-between py-2">
                      <span className="text-xs uppercase tracking-wider font-medium text-stone-500 dark:text-stone-400">
                        Duración
                      </span>
                      <span className="text-sm text-stone-900 dark:text-stone-100 font-semibold">
                        {service.duration}
                      </span>
                    </div>
                  </div>

                  {/* CTA Button */}
                  <Button
                    onClick={() => scrollToSection("contact")}
                    className="w-full bg-stone-900 hover:bg-stone-800 dark:bg-stone-100 dark:hover:bg-stone-200 text-white dark:text-stone-900 border-0 h-11 rounded-lg font-medium text-sm transition-all duration-300 hover:shadow-lg group"
                  >
                    <span className="flex items-center justify-center gap-2">
                      <span>Reservar Cita</span>
                      <FaWhatsapp className="w-4 h-4 group-hover:scale-110 transition-transform" />
                    </span>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </StaggerContainer>

          {/* Bottom CTA Section */}
          <FadeIn className="text-center mt-20">
            <div className="rounded-2xl p-10 max-w-3xl mx-auto bg-white dark:bg-stone-900 border-2 border-stone-200 dark:border-stone-700 shadow-sm">
              <h3 className="text-2xl font-semibold text-stone-900 dark:text-stone-100 mb-3">
                ¿Necesitas algo diferente?
              </h3>
              <p className="text-stone-600 dark:text-stone-400 mb-8 text-base leading-relaxed max-w-xl mx-auto">
                Cada cliente es único. Ofrezco servicios personalizados
                adaptados a tus necesidades específicas.
              </p>
              <Button
                onClick={() => scrollToSection("contact")}
                variant="outline"
                className="bg-transparent hover:bg-stone-900 dark:hover:bg-stone-100 text-stone-900 dark:text-stone-100 hover:text-white dark:hover:text-stone-900 border-2 border-stone-900 dark:border-stone-100 px-8 py-6 rounded-lg font-medium text-sm transition-all duration-300 hover:shadow-lg"
              >
                Solicitar Consulta Personalizada
              </Button>
            </div>
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
            <h2 className="text-4xl font-serif text-stone-900 dark:text-stone-100">
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
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                    activeFilter === category
                      ? "bg-stone-900 dark:bg-stone-100 text-white dark:text-stone-900 shadow-lg"
                      : "bg-stone-100 dark:bg-stone-800 text-stone-700 dark:text-stone-300 hover:bg-stone-200 dark:hover:bg-stone-700"
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
                <div className="text-3xl font-light text-stone-900 dark:text-stone-100 mb-2">
                  {stat.number}
                </div>
                <div className="text-sm text-stone-600 dark:text-stone-400 uppercase tracking-wider">
                  {stat.label}
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section
        id="testimonials"
        className="py-20 bg-stone-50 dark:bg-stone-800 transition-colors"
      >
        <div className="container mx-auto px-4">
          <FadeIn className="text-center space-y-4 mb-16">
            <h2 className="text-4xl font-serif text-stone-900 dark:text-stone-100">
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
                className="bg-white dark:bg-stone-900 border-stone-200 dark:border-stone-700 hover:shadow-xl hover:scale-105 transition-all duration-300"
              >
                <CardContent className="p-6 space-y-4">
                  <div className="flex justify-center">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <FaStar
                        key={i}
                        className="w-5 h-5 fill-yellow-400 text-yellow-400"
                      />
                    ))}
                  </div>
                  <p className="text-stone-600 dark:text-stone-400 italic text-center leading-relaxed">
                    "{testimonial.content}"
                  </p>
                  <div className="flex items-center justify-center space-x-3 pt-4 border-t border-stone-200 dark:border-stone-700">
                    <div className="relative w-12 h-12 rounded-full overflow-hidden">
                      <Image
                        src={testimonial.image || "/placeholder.svg"}
                        alt={testimonial.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="text-center">
                      <div className="font-semibold text-stone-900 dark:text-stone-100">
                        {testimonial.name}
                      </div>
                      <div className="text-sm text-stone-500 dark:text-stone-500">
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
            <h2 className="text-5xl font-serif text-stone-900 dark:text-stone-100 leading-tight">
              Agenda tu Experiencia
              <span className="block text-3xl font-light mt-2 text-stone-600 dark:text-stone-400 italic">
                Transforma tu belleza hoy
              </span>
            </h2>
            <p className="text-xl text-stone-600 dark:text-stone-400 max-w-3xl mx-auto leading-relaxed">
              Estoy aquí para hacer realidad tu visión de belleza. Contáctame
              para reservar tu cita y comenzar tu transformación.
            </p>
          </FadeIn>

          {/* FORMULARIO DE CONTACTO */}
          <ContactForm />
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-stone-900 dark:bg-stone-950 text-white pt-6 transition-colors">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            {/* Columna Izquierda - Logo y Frase */}
            <FadeIn className="text-center md:text-left space-y-4">
              <div className="text-3xl font-serif">Lesley García</div>
              <p className="text-stone-400 text-lg leading-relaxed max-w-md mx-auto sm:text-center md:mx-0 md:text-left">
                Creando momentos de belleza únicos que resaltan tu esencia
                natural. Cada look es una obra de arte diseñada especialmente
                para ti.
              </p>
              <div className="text-stone-500 text-sm pt-4 hidden md:block">
                © {new Date().getFullYear()} Lesley García Beauty. Todos los
                derechos reservados.
              </div>
            </FadeIn>

            {/* Columna Derecha - Redes Sociales y Botón de Citas */}
            <FadeIn delay={0.2} className="text-center md:text-right space-y-6">
              <div>
                <h4 className="text-lg font-semibold text-white mb-4">
                  Sígueme en Redes Sociales
                </h4>
                <div className="flex justify-center md:justify-end space-x-4 mb-6">
                  <Link
                    href="https://www.instagram.com/lesleygarciabeauty"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Button
                      variant="outline"
                      size="icon"
                      className="border-stone-600 text-stone-300 hover:bg-stone-800 hover:text-white hover:border-stone-500 bg-transparent transition-all duration-300 hover:scale-110 w-12 h-12"
                    >
                      <FaInstagram className="w-5 h-5" />
                    </Button>
                  </Link>
                  <Button
                    variant="outline"
                    size="icon"
                    className="border-stone-600 text-stone-300 hover:bg-stone-800 hover:text-white hover:border-stone-500 bg-transparent transition-all duration-300 hover:scale-110 w-12 h-12"
                  >
                    <FaFacebook className="w-5 h-5" />
                  </Button>
                  <Link
                    href="https://api.whatsapp.com/send?phone=593983366831&text=Hola%2C%20%C2%BFque%20tal%3F.%0AQuisiera%20agendar%20una%20cita%20contigo%E2%99%A5%EF%B8%8F"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Button
                      variant="outline"
                      size="icon"
                      className="border-stone-600 text-stone-300 hover:bg-stone-800 hover:text-white hover:border-stone-500 bg-transparent transition-all duration-300 hover:scale-110 w-12 h-12"
                    >
                      <FaWhatsapp className="w-5 h-5" />
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
                <Button className="w-44 px-8 py-3 bg-white dark:bg-stone-800 text-stone-900 dark:text-white border border-stone-300 dark:border-stone-600 hover:bg-stone-100 dark:hover:bg-stone-700 font-semibold rounded-lg transition-all duration-300 hover:scale-105 hover:shadow-lg">
                  <FaWhatsapp className="w-4 h-4 mr-2" />
                  Agendar Cita
                </Button>
              </Link>

              {/* Enlaces legales */}
              <div className="flex flex-wrap justify-center md:justify-end space-x-4 text-sm md:py-4 sm:py-1">
                <Link
                  href="#"
                  className="text-stone-400 hover:text-white transition-colors"
                >
                  Política de Privacidad
                </Link>
                <Link
                  href="#"
                  className="text-stone-400 hover:text-white transition-colors"
                >
                  Términos de Servicio
                </Link>
                <Link
                  href="#"
                  className="text-stone-400 hover:text-white transition-colors"
                >
                  Política de Reservas
                </Link>
              </div>

              {/* Copyright - mobile: mostrar debajo de los enlaces legales */}
              <div className="block md:hidden text-stone-500 text-sm pb-2 text-center md:text-right">
                © {new Date().getFullYear()} Lesley García Beauty. Todos los
                derechos reservados.
              </div>
            </FadeIn>
          </div>
        </div>
      </footer>
    </div>
  );
}
