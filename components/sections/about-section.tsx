import Image from "next/image";
import { FadeIn } from "@/components/animations/fade-in";
import aboutPhoto from "@/public/img/portada.png";

export function AboutSection() {
  return (
    <section
      id="about"
      className="relative min-h-screen overflow-hidden bg-white dark:bg-stone-900 transition-colors flex items-center"
    >
      <div className="container mx-auto px-5 sm:px-8 w-full py-16">
        <div className="grid lg:grid-cols-[2fr_1fr] gap-10 lg:gap-16 items-stretch">
          {/* Text column — vertically centered */}
          <FadeIn
            delay={0.15}
            className="flex flex-col justify-center py-16 sm:py-20 lg:py-0"
          >
            <div className="space-y-7 max-w-3xl">
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
                <a
                  href="#services"
                  className="group inline-flex h-12 items-center justify-center bg-stone-900 dark:bg-stone-100 px-7 text-[10px] font-medium uppercase tracking-[0.25em] text-white dark:text-stone-900 transition-all duration-300 hover:bg-stone-800 dark:hover:bg-stone-200 hover:shadow-lg"
                >
                  Ver servicios
                  <span className="ml-3 inline-block h-px w-5 bg-current transition-all duration-300 group-hover:w-7" />
                </a>
              </div>
            </div>
          </FadeIn>

          {/* Portrait — fills the full column height */}
          <FadeIn delay={0.3} className="relative min-h-[50vh] lg:min-h-0">
            <div className="relative h-full w-full rounded-xl overflow-hidden shadow-[0_20px_40px_-15px_rgba(0,0,0,0.12)] dark:shadow-[0_20px_40px_-15px_rgba(0,0,0,0.4)]">
              <Image
                src={aboutPhoto}
                alt="Lesley García — maquilladora profesional"
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 33vw"
                className="object-cover"
              />
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}
