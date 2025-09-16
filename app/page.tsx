"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { FaStar, FaPhone, FaEnvelope, FaMapMarkerAlt, FaInstagram, FaFacebook, FaTwitter, FaWhatsapp, FaWalking } from "react-icons/fa"
import { CiMail, CiLocationOn } from "react-icons/ci";
import { FiPhoneCall } from "react-icons/fi";

import { AppleNav } from "@/components/apple-nav"
import { HeroSection } from "@/components/hero-section"
import { VideoPreview } from "@/components/video-preview"
import { ImagePreview } from "@/components/image-preview"
import { FadeIn } from "@/components/animations/fade-in"
import { StaggerContainer } from "@/components/animations/stagger-container"
import { useSmoothScroll } from "@/hooks/use-smooth-scroll"

export default function MakeupArtistPortfolio() {
  const [activeFilter, setActiveFilter] = useState("Todos")

  const services = [
    {
      title: "Maquillaje de Novia",
      description: "Look completo de novia incluyendo sesión de prueba y aplicación el día de la boda",
      price: "Desde $350",
      duration: "3-4 horas",
    },
    {
      title: "Eventos Especiales",
      description: "Maquillaje perfecto para galas, fiestas, sesiones fotográficas y ocasiones especiales",
      price: "Desde $150",
      duration: "1-2 horas",
    },
    {
      title: "Editorial y Moda",
      description: "Looks de alta moda para revistas, campañas y proyectos creativos",
      price: "Desde $200",
      duration: "2-3 horas",
    },
    {
      title: "Clases de Maquillaje",
      description: "Tutoriales personalizados uno a uno y entrenamiento en técnicas",
      price: "Desde $120",
      duration: "1.5 horas",
    },
  ]

  const portfolioImages = [
    { 
      src: "/img/novia_01.JPG", 
      alt: "Maquillaje de Novia",
      category: ["Novias", "Evento Especial"],
      type: "image",
      hoverImage: "/img/novia_1.JPG" // Imagen alternativa en hover
    },
    { 
      src: "/img/video_ebano_1.mov", 
      alt: "Maquillaje de piel ébano",
      category: "Piel Ébano",
      type: "video",
      previewImage: "/img/ebano_1.jpg" // Imagen de preview estático
    },
    { 
      src: "/img/social_10.jpg", 
      alt: "Maquillaje Social",
      category: ["Social", "Evento Especial"],
      type: "image",
      hoverImage: "/img/social_010.jpg" // Imagen alternativa en hover
    },
    { 
      src: "/img/video_social_6.MOV", 
      alt: "Maquillaje para evento social",
      category: "Social",
      type: "video",
      previewImage: "/img/social_6.jpg" // Imagen de preview estático
    },
    { 
      src: "/img/social_7.jpg", 
      alt: "Maquillaje editorial - Look dramático",
      category: ["Editorial", "Piel Ébano"],
      type: "image",
      hoverImage: "/img/social_6.jpg" // Imagen alternativa en hover
    },
    { 
      src: "/img/social_3.JPG", 
      alt: "Maquillaje Social",
      category: "Social",
      type: "image",
      hoverImage: "/img/social_03.JPG" // Imagen alternativa en hover
    },
  ]

  const portfolioCategories = ["Todos", "Novias", "Piel Ébano", "Evento Especial", "Social"]

  const filteredImages = activeFilter === "Todos" 
    ? portfolioImages 
    : portfolioImages.filter(media => {
        // Si la categoría es un array, verificar si incluye el filtro activo
        if (Array.isArray(media.category)) {
          return media.category.includes(activeFilter)
        }
        // Si es string, comparar directamente
        return media.category === activeFilter
      })

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
  ]

  const { scrollToSection } = useSmoothScroll()

  return (
    <div className="min-h-screen bg-white dark:bg-stone-900 transition-colors">
      <AppleNav />
      <HeroSection />

      {/* About Section */}
      <section
        id="about"
        className="py-20 bg-white dark:bg-stone-900 transition-colors"
      >
        <div className="container mx-auto px-4">
          <FadeIn className="max-w-3xl mx-auto text-center space-y-6">
            <h2 className="text-4xl font-serif text-stone-900 dark:text-stone-100">
              Acerca de Lesley
            </h2>
            <p className="text-lg text-stone-600 dark:text-stone-400 leading-relaxed">
              Soy una maquilladora apasionada, especializada en crear looks
              atemporales y elegantes para los momentos más importantes de la
              vida. Mi enfoque combina técnicas clásicas con tendencias modernas
              para realzar tu belleza natural.
            </p>
            <p className="text-lg text-stone-600 dark:text-stone-400 leading-relaxed">
              Entrenada en la prestigiosa Academia de Maquillaje Alejandra
              Torres y con certificaciones de las principales marcas de belleza,
              aporto tanto arte como profesionalismo a cada experiencia con el
              cliente. Ya sea el día de tu boda, un evento especial o una sesión
              fotográfica, me dedico a hacer que te veas y te sientas
              absolutamente radiante.
            </p>
          </FadeIn>
        </div>
      </section>

      {/* Services Section */}
      <section
        id="services"
        className="py-24 bg-gradient-to-br from-stone-50 via-white to-stone-100 relative overflow-hidden"
        style={{
          background: `linear-gradient(135deg, #fafaf9 0%, #ffffff 50%, #EFC88B20 100%)`
        }}
      >
        {/* Background Decorative Elements */}
        <div className="absolute inset-0 opacity-4">
          <div className="absolute top-20 left-10 w-32 h-32 rounded-full blur-3xl" style={{backgroundColor: '#EFC88B'}}></div>
          <div className="absolute bottom-20 right-10 w-40 h-40 bg-stone-300 rounded-full blur-3xl"></div>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full blur-3xl" style={{backgroundColor: '#EFC88B40'}}></div>
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <FadeIn className="text-center space-y-6 mb-20">
            <div className="inline-flex items-center px-4 py-2 text-stone-700 rounded-full text-sm font-medium mb-4" 
                 style={{backgroundColor: '#EFC88B40'}}>
              <FaStar className="w-4 h-4 mr-2" style={{color: '#8B6F1B'}} />
              Servicios Profesionales
            </div>
            <h2 className="text-5xl font-serif text-stone-900 leading-tight">
              Servicios de Belleza
              <span className="block text-3xl font-light mt-2" style={{color: '#8B6F1B'}}>
                Realizando sueños de belleza
              </span>
            </h2>
            <p className="text-xl text-stone-600 max-w-3xl mx-auto leading-relaxed">
              Desde maquillaje de novias hasta sesiones editoriales, ofrezco una 
              gama completa de servicios profesionales adaptados a tus necesidades únicas.
            </p>
          </FadeIn>

          <StaggerContainer className="grid md:grid-cols-2 xl:grid-cols-4 gap-8 max-w-7xl mx-auto">
            {services.map((service, index) => (
              <Card
                key={index}
                className="group relative bg-white/80 backdrop-blur-sm border-0 shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 overflow-hidden"
              >
                {/* Service Number Badge */}
                <div className="absolute top-4 right-4 w-8 h-8 rounded-full flex items-center justify-center" 
                     style={{background: `linear-gradient(135deg, #EFC88B, #D4A574)`}}>
                  <span className="text-white text-sm font-bold">
                    {String(index + 1).padStart(2, '0')}
                  </span>
                </div>

                {/* Decorative Top Border */}
                <div className="h-1 transition-all duration-300" 
                     style={{background: `linear-gradient(90deg, #EFC88B, #D4A574, #8B6F1B)`}}></div>

                <CardContent className="p-8 space-y-6">
                  {/* Service Icon */}
                  <div className="w-16 h-16 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300"
                       style={{background: `linear-gradient(135deg, #EFC88B30, #F5F5F4)`}}>
                    {index === 0 && <FaStar className="w-8 h-8" style={{color: '#8B6F1B'}} />}
                    {index === 1 && <FaWalking className="w-8 h-8" style={{color: '#8B6F1B'}} />}
                    {index === 2 && <FaStar className="w-8 h-8" style={{color: '#8B6F1B'}} />}
                    {index === 3 && <FaStar className="w-8 h-8" style={{color: '#8B6F1B'}} />}
                  </div>

                  {/* Service Title */}
                  <div>
                    <h3 className="text-2xl font-serif text-stone-900 mb-3 transition-colors duration-300" 
                        style={{color: index === 0 ? '#8B6F1B' : undefined}}>
                      {service.title}
                    </h3>
                    <p className="text-stone-600 leading-relaxed text-base">
                      {service.description}
                    </p>
                  </div>

                  {/* Service Details */}
                  <div className="space-y-4 pt-4 border-t border-stone-200">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <div className="w-2 h-2 rounded-full" style={{backgroundColor: '#EFC88B'}}></div>
                        <span className="text-sm font-medium text-stone-700">
                          Duración
                        </span>
                      </div>
                      <span className="text-sm text-stone-900 font-semibold bg-stone-100 px-3 py-1 rounded-full">
                        {service.duration}
                      </span>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <div className="w-2 h-2 rounded-full" style={{backgroundColor: '#EFC88B'}}></div>
                        <span className="text-sm font-medium text-stone-700">
                          Inversión
                        </span>
                      </div>
                      <span className="text-xl font-bold text-white px-4 py-2 rounded-full" 
                            style={{backgroundColor: '#8B6F1B', background: `linear-gradient(135deg, #8B6F1B, #EFC88B)`}}>
                        {service.price}
                      </span>
                    </div>
                  </div>

                  {/* CTA Button */}
                  <Button
                    onClick={() => scrollToSection("contact")}
                    className="w-full bg-gradient-to-r from-stone-800 to-stone-900 hover:from-stone-900 hover:to-black text-white border-0 h-12 rounded-xl font-semibold text-base transition-all duration-300 hover:shadow-lg hover:scale-[1.02]"
                    style={{
                      background: `linear-gradient(135deg, #8B6F1B, #6B5416)`,
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.background = `linear-gradient(135deg, #EFC88B, #D4A574)`
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.background = `linear-gradient(135deg, #8B6F1B, #6B5416)`
                    }}
                  >
                    <span className="flex items-center justify-center space-x-2">
                      <span>Reservar Cita</span>
                      <FaWhatsapp className="w-4 h-4 ml-2 group-hover:scale-110 transition-transform" />
                    </span>
                  </Button>

                  {/* Popular Badge for Featured Service */}
                  {index === 0 && (
                    <div className="absolute -top-2 left-6">
                      <div className="text-white px-4 py-1 rounded-full text-xs font-bold shadow-lg" 
                           style={{background: `linear-gradient(135deg, #8B6F1B, #EFC88B)`}}>
                        MÁS POPULAR
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </StaggerContainer>

          {/* Bottom CTA Section */}
          <FadeIn className="text-center mt-16">
            <div className="rounded-3xl p-8 max-w-4xl mx-auto border border-stone-200"
                 style={{background: `linear-gradient(135deg, #EFC88B20, #F5F5F4)`}}>
              <h3 className="text-2xl font-serif text-stone-900 mb-4">
                ¿No encuentras el servicio que buscas?
              </h3>
              <p className="text-stone-600 mb-6 text-lg">
                Ofrezco servicios personalizados adaptados a tus necesidades específicas.
              </p>
              <Button
                onClick={() => scrollToSection("contact")}
                variant="outline"
                className="bg-white hover:bg-stone-50 text-stone-900 border-stone-300 hover:border-stone-400 px-8 py-3 rounded-xl font-semibold transition-all duration-300 hover:shadow-md"
                style={{
                  borderColor: '#EFC88B',
                  color: '#8B6F1B'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = '#EFC88B20'
                  e.currentTarget.style.borderColor = '#8B6F1B'
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = 'white'
                  e.currentTarget.style.borderColor = '#EFC88B'
                }}
              >
                Consulta Personalizada
              </Button>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Portfolio Section */}
      <section
        id="portfolio"
        className="py-20 bg-white transition-colors"
      >
        <div className="container mx-auto px-4">
          <FadeIn className="text-center space-y-4 mb-16">
            <h2 className="text-4xl font-serif text-stone-900">
              Portafolio
            </h2>
            <p className="text-lg text-stone-600 max-w-2xl mx-auto">
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
                      ? "bg-stone-900 text-white shadow-lg"
                      : "bg-stone-100 text-stone-700 hover:bg-stone-200"
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
                  />
                ) : (
                  <ImagePreview
                    src={media.src}
                    hoverImage={media.hoverImage}
                    alt={media.alt}
                    category={media.alt}
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
              { number: "50+", label: "Eventos Especiales" }
            ].map((stat, index) => (
              <FadeIn key={index} delay={0.2 + index * 0.1} className="text-center">
                <div className="text-3xl font-light text-stone-900 mb-2">{stat.number}</div>
                <div className="text-sm text-stone-600 uppercase tracking-wider">{stat.label}</div>
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
            <h2 className="text-4xl lg:text-5xl font-serif text-stone-900 dark:text-stone-100">
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
        className="py-20 bg-white dark:bg-stone-900 transition-colors"
      >
        <div className="container mx-auto px-4">
          <FadeIn className="text-center space-y-4 mb-16">
            <h2 className="text-4xl lg:text-5xl font-serif text-stone-900 dark:text-stone-100">
              Reserva tu Cita
            </h2>
            <p className="text-lg text-stone-600 dark:text-stone-400 max-w-2xl mx-auto">
              Reserva tu sesión de maquillaje de forma fácil y rápida.
              Selecciona la fecha y hora que mejor te convenga.
            </p>
          </FadeIn>

          {/* Booking System */}
          {/* <div className="mb-16">
            <BookingSystem />
          </div> */}

          {/* Alternative Contact Methods */}
          <FadeIn delay={0.5}>
            <div className="bg-stone-50 dark:bg-stone-800 rounded-2xl p-8">
              <div className="text-center mb-8">
                <h3 className="text-2xl font-semibold text-stone-900 dark:text-stone-100 mb-2">
                  ¿Prefieres contactarme directamente?
                </h3>
                <p className="text-stone-600 dark:text-stone-400">
                  También puedes comunicarte conmigo a través de estos medios
                </p>
              </div>

              <div className="grid md:grid-cols-3 gap-8">
                <div className="text-center group">
                  <div className="w-16 h-16 bg-white dark:bg-stone-700 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                    <FiPhoneCall className="w-8 h-8 text-stone-600 dark:text-stone-400" />
                  </div>
                  <h4 className="font-semibold text-stone-900 dark:text-stone-100 mb-2">
                    Teléfono
                  </h4>
                  <p className="text-stone-600 dark:text-stone-400">
                    (+593) 983366831
                  </p>
                  <p className="text-sm text-stone-500 dark:text-stone-500 mt-1">
                    Lun - Sáb: 9:00 AM - 5:00 PM
                  </p>
                </div>

                <div className="text-center group">
                  <div className="w-16 h-16 bg-white dark:bg-stone-700 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                    <CiMail className="w-8 h-8 text-stone-600 dark:text-stone-400" />
                  </div>
                  <h4 className="font-semibold text-stone-900 dark:text-stone-100 mb-2">
                    Email
                  </h4>
                  <p className="text-stone-600 dark:text-stone-400">
                    valencia.fiorella_1999@hotmail.com
                  </p>
                  <p className="text-sm text-stone-500 dark:text-stone-500 mt-1">
                    Respuesta en 24 horas
                  </p>
                </div>

                <div className="text-center group">
                  <div className="w-16 h-16 bg-white dark:bg-stone-700 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                    <CiLocationOn className="w-8 h-8 text-stone-600 dark:text-stone-400" />
                  </div>
                  <h4 className="font-semibold text-stone-900 dark:text-stone-100 mb-2">
                    Ubicación
                  </h4>
                  <p className="text-stone-600 dark:text-stone-400">
                    Guayaquil - Ecuador
                  </p>
                  <p className="text-sm text-stone-500 dark:text-stone-500 mt-1">
                    Servicio a domicilio disponible
                  </p>
                </div>
              </div>

              <div className="text-center mt-8">
                <h4 className="text-lg font-semibold text-stone-900 dark:text-stone-100 mb-4">
                  Sígueme en Redes Sociales
                </h4>
                <div className="flex justify-center space-x-4">
                  <Link
                    href="https://www.instagram.com/lesleygarciabeauty"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Button
                      variant="outline"
                      size="icon"
                      className="border-stone-300 dark:border-stone-600 text-stone-600 dark:text-stone-400 hover:bg-stone-100 dark:hover:bg-stone-700 bg-white dark:bg-stone-800 transition-all duration-300 hover:scale-110 shadow-lg w-14 h-14"
                    >
                      <FaInstagram className="w-6 h-6" />
                    </Button>
                  </Link>
                  <Button
                    variant="outline"
                    size="icon"
                    className="border-stone-300 dark:border-stone-600 text-stone-600 dark:text-stone-400 hover:bg-stone-100 dark:hover:bg-stone-700 bg-white dark:bg-stone-800 transition-all duration-300 hover:scale-110 shadow-lg w-14 h-14"
                  >
                    <FaFacebook className="w-6 h-6" />
                  </Button>
                  <Link
                    href="https://api.whatsapp.com/send?phone=593983366831&text=Hola%2C%20%C2%BFque%20tal%3F.%0AQuisiera%20agendar%20una%20cita%20contigo%E2%99%A5%EF%B8%8F"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Button
                      variant="outline"
                      size="icon"
                      className="border-stone-300 dark:border-stone-600 text-stone-600 dark:text-stone-400 hover:bg-stone-100 dark:hover:bg-stone-700 bg-white dark:bg-stone-800 transition-all duration-300 hover:scale-110 shadow-lg w-14 h-14"
                    >
                      <FaWhatsapp className="w-6 h-6" />
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-stone-900 dark:bg-stone-950 text-white py-6 transition-colors">
        <div className="container mx-auto px-4">
          <FadeIn className="text-center space-y-4">
            <div className="text-2xl font-serif">Lesley García</div>
            <span className="text-stone-400 pt-5">
              Maquilladora Profesional
            </span>
            <div className="flex justify-center space-x-6">
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
            <div className="text-stone-400 text-sm">
              © 2024 Lesley García. Todos los derechos reservados.
            </div>
          </FadeIn>
        </div>
      </footer>
    </div>
  );
}
