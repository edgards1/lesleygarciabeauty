"use client"

import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { FaStar, FaPhone, FaEnvelope, FaMapMarkerAlt, FaInstagram, FaFacebook, FaTwitter, FaWhatsapp, FaWalking } from "react-icons/fa"
import { CiMail, CiLocationOn } from "react-icons/ci";
import { FiPhoneCall } from "react-icons/fi";

import { AppleNav } from "@/components/apple-nav"
import { HeroSection } from "@/components/hero-section"
import { FadeIn } from "@/components/animations/fade-in"
import { StaggerContainer } from "@/components/animations/stagger-container"
import { useSmoothScroll } from "@/hooks/use-smooth-scroll"

export default function MakeupArtistPortfolio() {
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
    { src: "/placeholder.svg?height=400&width=300", alt: "Look de maquillaje de novia" },
    { src: "/placeholder.svg?height=400&width=300", alt: "Look de maquillaje de noche" },
    { src: "/placeholder.svg?height=400&width=300", alt: "Look de maquillaje natural" },
    { src: "/placeholder.svg?height=400&width=300", alt: "Look de maquillaje editorial" },
    { src: "/placeholder.svg?height=400&width=300", alt: "Look de maquillaje de fiesta" },
    { src: "/placeholder.svg?height=400&width=300", alt: "Look de maquillaje creativo" },
  ]

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
        className="py-20 bg-stone-50 dark:bg-stone-800 transition-colors"
      >
        <div className="container mx-auto px-4">
          <FadeIn className="text-center space-y-4 mb-16">
            <h2 className="text-4xl font-serif text-stone-900 dark:text-stone-100">
              Servicios
            </h2>
            <p className="text-lg text-stone-600 dark:text-stone-400 max-w-2xl mx-auto">
              Desde maquillaje de novias hasta sesiones editoriales, ofrezco una
              gama completa de servicios profesionales de maquillaje adaptados a
              tus necesidades.
            </p>
          </FadeIn>

          <StaggerContainer className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {services.map((service, index) => (
              <Card
                key={index}
                className="bg-white dark:bg-stone-900 border-stone-200 dark:border-stone-700 hover:shadow-xl hover:scale-105 transition-all duration-300 group"
              >
                <CardContent className="p-6 space-y-4">
                  <h3 className="text-xl font-semibold text-stone-900 dark:text-stone-100 group-hover:text-stone-700 dark:group-hover:text-stone-300 transition-colors">
                    {service.title}
                  </h3>
                  <p className="text-stone-600 dark:text-stone-400">
                    {service.description}
                  </p>
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-stone-500 dark:text-stone-500">
                        Duración:
                      </span>
                      <span className="text-sm font-medium text-stone-700 dark:text-stone-300">
                        {service.duration}
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-stone-500 dark:text-stone-500">
                        Precio:
                      </span>
                      <span className="text-lg font-semibold text-stone-900 dark:text-stone-100">
                        {service.price}
                      </span>
                    </div>
                  </div>
                  <Button
                    onClick={() => scrollToSection("contact")}
                    className="w-full bg-stone-900 dark:bg-stone-100 hover:bg-stone-800 dark:hover:bg-stone-200 text-white dark:text-stone-900 transition-all duration-300 hover:scale-105"
                  >
                    Reservar Ahora
                  </Button>
                </CardContent>
              </Card>
            ))}
          </StaggerContainer>
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
          </FadeIn>

          <StaggerContainer className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {portfolioImages.map((image, index) => (
              <div
                key={index}
                className="group relative aspect-[3/4] rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500"
              >
                <Image
                  src={image.src || "/placeholder.svg"}
                  alt={image.alt}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="absolute bottom-4 left-4 right-4 text-white transform translate-y-4 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-300">
                  <p className="text-sm font-medium">{image.alt}</p>
                </div>
              </div>
            ))}
          </StaggerContainer>

          <FadeIn delay={0.5} className="text-center mt-12">
            <Button
              variant="outline"
              size="lg"
              className="border-stone-300 dark:border-stone-600 text-stone-700 dark:text-stone-300 hover:bg-stone-50 dark:hover:bg-stone-800 bg-transparent dark:bg-transparent transition-all duration-300 hover:scale-105"
            >
              Ver Portafolio Completo
            </Button>
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
                    Lun - Sáb: 9:00 AM - 7:00 PM
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
