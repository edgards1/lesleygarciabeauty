import Image from "next/image";
import { FaWhatsapp } from "react-icons/fa";
import { FadeIn } from "@/components/animations/fade-in";

export function ServicesSection() {
  return (
    <section
      id="services"
      className="relative z-10 bg-white dark:bg-stone-900 transition-colors"
    >
      {/* Novia — editorial block */}
      <div className="py-20 sm:py-28 bg-stone-900 dark:bg-stone-950">
        <div className="container mx-auto px-5 sm:px-8">
          <FadeIn>
            <div className="flex items-center gap-4 mb-3">
              <div className="h-px w-8 bg-stone-600" />
              <span className="text-[10px] uppercase tracking-[0.3em] text-stone-500 font-medium">
                Para novias
              </span>
            </div>
          </FadeIn>
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <FadeIn delay={0.1} className="hidden lg:block">
              <div className="relative aspect-[4/3] overflow-hidden">
                <Image
                  src="/img/novia_01.webp"
                  alt="Maquillaje de novia"
                  fill
                  sizes="50vw"
                  className="object-cover"
                  priority
                />
              </div>
            </FadeIn>
            <FadeIn delay={0.2}>
              <div>
                <span className="text-[8rem] sm:text-[10rem] font-serif italic leading-[0.8] text-stone-800 select-none block mb-4">
                  01
                </span>
                <h2 className="font-serif text-[clamp(1.8rem,4vw,3rem)] leading-[1.05] tracking-[-0.02em] text-stone-100 mb-4">
                  Maquillaje
                  <br />
                  <span className="italic text-stone-500">de novia</span>
                </h2>
                <p className="text-base text-stone-400 leading-[1.7] mb-8 max-w-md">
                  Una experiencia completa: prueba previa para perfecto el look,
                  y aplicación el día de tu boda. Mezclamos, probamos y
                  refinamos hasta que te sientas exactamente como imaginaste.
                </p>
                <a
                  href="https://api.whatsapp.com/send?phone=593983366831&text=Hola%2C%20estoy%20interesada%20en%20el%20servicio%20de%20maquillaje%20de%20novia"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2.5 h-12 bg-white dark:bg-stone-100 px-7 text-[10px] font-medium uppercase tracking-[0.25em] text-stone-900 transition-all duration-300 hover:bg-stone-100 dark:hover:bg-stone-200 hover:shadow-lg active:scale-[0.98]"
                >
                  Agendar Sesión de Prueba
                  <FaWhatsapp className="h-3.5 w-3.5 opacity-80" />
                </a>
              </div>
            </FadeIn>
          </div>
        </div>
      </div>

      {/* Productos — cada servicio como un bloque editorial */}
      {/* Social (1ro) — texto a la izquierda, fondo claro */}
      <div className="py-20 sm:py-28 bg-white dark:bg-stone-900">
        <div className="container mx-auto px-5 sm:px-8">
          <FadeIn>
            <div className="flex items-center gap-4 mb-3">
              <div className="h-px w-8 bg-stone-300 dark:bg-stone-600" />
              <span className="text-[10px] uppercase tracking-[0.3em] text-stone-400 dark:text-stone-500 font-medium">
                Para eventos
              </span>
            </div>
          </FadeIn>
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <FadeIn delay={0.1}>
              <div>
                <span className="text-[8rem] sm:text-[10rem] font-serif italic leading-[0.8] text-stone-200 dark:text-stone-800 select-none block mb-4">
                  02
                </span>
                <h3 className="font-serif text-[clamp(1.8rem,4vw,3rem)] leading-[1.05] tracking-[-0.02em] text-stone-900 dark:text-stone-100 mb-4">
                  Maquillaje Social
                </h3>
                <p className="text-base text-stone-500 dark:text-stone-400 leading-[1.7] mb-8 max-w-md">
                  Fiestas, graduaciones, noches especiales. Un look que
                  destaque en persona y en foto, sin perder naturalidad.
                </p>
                <a
                  href="https://api.whatsapp.com/send?phone=593983366831&text=Hola%2C%20estoy%20interesada%20en%20el%20servicio%20de%20maquillaje%20social"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2.5 h-12 bg-stone-900 dark:bg-stone-100 px-7 text-[10px] font-medium uppercase tracking-[0.25em] text-white dark:text-stone-900 transition-all duration-300 hover:bg-stone-800 dark:hover:bg-stone-200 hover:shadow-lg active:scale-[0.98]"
                >
                  Reservar Fecha
                  <FaWhatsapp className="h-3.5 w-3.5 opacity-80" />
                </a>
              </div>
            </FadeIn>
            <FadeIn delay={0.2} className="hidden lg:block">
              <div className="relative aspect-[4/3] overflow-hidden">
                <Image
                  src="/img/social_4.webp"
                  alt="Maquillaje Social"
                  fill
                  sizes="50vw"
                  className="object-cover hover:scale-[1.02] transition-transform duration-500"
                />
              </div>
            </FadeIn>
          </div>
        </div>
      </div>

      {/* Automaquillaje (2do) — imagen a la izquierda, fondo oscuro como Novia */}
      <div className="py-20 sm:py-28 bg-stone-900 dark:bg-stone-950">
        <div className="container mx-auto px-5 sm:px-8">
          <FadeIn>
            <div className="flex items-center gap-4 mb-3">
              <div className="h-px w-8 bg-stone-600" />
              <span className="text-[10px] uppercase tracking-[0.3em] text-stone-500 font-medium">
                Para ti
              </span>
            </div>
          </FadeIn>
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <FadeIn delay={0.1} className="hidden lg:block order-last lg:order-first">
              <div className="relative aspect-[4/3] overflow-hidden">
                <Image
                  src="/img/ebano_1.webp"
                  alt="Automaquillaje"
                  fill
                  sizes="50vw"
                  className="object-cover hover:scale-[1.02] transition-transform duration-500"
                />
              </div>
            </FadeIn>
            <FadeIn delay={0.2}>
              <div className="lg:text-right">
                <span className="text-[8rem] sm:text-[10rem] font-serif italic leading-[0.8] text-stone-800 select-none block mb-4 lg:text-right">
                  03
                </span>
                <h3 className="font-serif text-[clamp(1.8rem,4vw,3rem)] leading-[1.05] tracking-[-0.02em] text-stone-100 mb-4">
                  Automaquillaje
                </h3>
                <p className="text-base text-stone-400 leading-[1.7] mb-8 max-w-md lg:ml-auto">
                  Sesión uno a uno donde aprendes técnicas para tu rostro, tu
                  estilo y tu presupuesto. Sales con práctica y una rutina
                  que puedes repetir cada día.
                </p>
                <a
                  href="https://api.whatsapp.com/send?phone=593983366831&text=Hola%2C%20estoy%20interesada%20en%20el%20curso%20de%20automaquillaje"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2.5 h-12 bg-white dark:bg-stone-100 px-7 text-[10px] font-medium uppercase tracking-[0.25em] text-stone-900 transition-all duration-300 hover:bg-stone-100 dark:hover:bg-stone-200 hover:shadow-lg active:scale-[0.98]"
                >
                  Agendar Clase
                  <FaWhatsapp className="h-3.5 w-3.5 opacity-80" />
                </a>
              </div>
            </FadeIn>
          </div>
        </div>
      </div>

      {/* UGC (3ro) — texto a la izquierda, fondo claro */}
      <div className="py-20 sm:py-28 bg-white dark:bg-stone-900">
        <div className="container mx-auto px-5 sm:px-8">
          <FadeIn>
            <div className="flex items-center gap-4 mb-3">
              <div className="h-px w-8 bg-stone-300 dark:bg-stone-600" />
              <span className="text-[10px] uppercase tracking-[0.3em] text-stone-400 dark:text-stone-500 font-medium">
                Para marcas
              </span>
            </div>
          </FadeIn>
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <FadeIn delay={0.1}>
              <div>
                <span className="text-[8rem] sm:text-[10rem] font-serif italic leading-[0.8] text-stone-200 dark:text-stone-800 select-none block mb-4">
                  04
                </span>
                <h3 className="font-serif text-[clamp(1.8rem,4vw,3rem)] leading-[1.05] tracking-[-0.02em] text-stone-900 dark:text-stone-100 mb-4">
                  Contenido UGC
                </h3>
                <p className="text-base text-stone-500 dark:text-stone-400 leading-[1.7] mb-8 max-w-md">
                  Filmación, edición y entrega de contenido orgánico listo
                  para publicar. Sin productor, sin complicaciones — las
                  marcas lo suben tal cual.
                </p>
                <a
                  href="https://api.whatsapp.com/send?phone=593983366831&text=Hola%2C%20estoy%20interesada%20en%20el%20servicio%20de%20UGC"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2.5 h-12 bg-stone-900 dark:bg-stone-100 px-7 text-[10px] font-medium uppercase tracking-[0.25em] text-white dark:text-stone-900 transition-all duration-300 hover:bg-stone-800 dark:hover:bg-stone-200 hover:shadow-lg active:scale-[0.98]"
                >
                  Solicitar Propuesta
                  <FaWhatsapp className="h-3.5 w-3.5 opacity-80" />
                </a>
              </div>
            </FadeIn>
            <FadeIn delay={0.2} className="hidden lg:block">
              <div className="relative aspect-[4/3] overflow-hidden">
                <Image
                  src="/img/social_010.webp"
                  alt="Contenido UGC"
                  fill
                  sizes="50vw"
                  className="object-cover hover:scale-[1.02] transition-transform duration-500"
                />
              </div>
            </FadeIn>
          </div>
        </div>
      </div>

      {/* Bottom CTA */}
      <div className="border-t border-stone-200 dark:border-stone-700 py-16">
        <div className="container mx-auto px-5 sm:px-8">
          <FadeIn className="text-center">
            <h3 className="text-2xl sm:text-3xl font-serif text-stone-900 dark:text-stone-100 mb-3 tracking-[-0.02em]">
              ¿Necesitas algo <span className="italic">fuera de catálogo</span>?
            </h3>
            <p className="text-sm text-stone-500 dark:text-stone-400 mb-8 max-w-md mx-auto leading-[1.6]">
              Cada cliente es única. Cuéntame lo que necesitas y creo un paquete a tu medida.
            </p>
            <a
              href="https://api.whatsapp.com/send?phone=593983366831&text=Hola%2C%20necesito%20un%20servicio%20personalizado"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2.5 bg-stone-900 dark:bg-stone-100 text-white dark:text-stone-900 px-7 py-3.5 text-[11px] font-medium uppercase tracking-[0.15em] transition-all duration-300 hover:bg-stone-800 dark:hover:bg-stone-200 hover:shadow-lg"
            >
              Consulta personalizada
              <FaWhatsapp className="h-3.5 w-3.5 opacity-80" />
            </a>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}
