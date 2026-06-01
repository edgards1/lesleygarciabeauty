import React from 'react'
import Image, { type StaticImageData } from 'next/image'

type Props = {
  imageSrc?: string | StaticImageData
}

export function AboutSection({ imageSrc }: Props) {
  const resolvedImage = imageSrc ?? '/img/ebano_1.jpg'

  return (
    <section
      id="about"
      aria-labelledby="about-heading"
      className="relative overflow-hidden bg-white py-24 dark:bg-stone-900"
    >
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute -top-24 right-0 h-80 w-80 rounded-full bg-stone-100/80 blur-3xl dark:bg-stone-800/40" />
        <div className="absolute -bottom-24 left-0 h-80 w-80 rounded-full bg-stone-100/70 blur-3xl dark:bg-stone-800/40" />
      </div>

      <div className="relative mx-auto grid max-w-7xl gap-12 px-4 sm:px-6 lg:grid-cols-[1.1fr_0.9fr] lg:px-8">
        <div className="max-w-2xl">
          <div className="mb-5 inline-flex flex-wrap gap-2">
            <span className="rounded-full border border-stone-200 bg-stone-50 px-3 py-1 text-xs font-medium uppercase tracking-[0.2em] text-stone-600 dark:border-stone-700 dark:bg-stone-800 dark:text-stone-300">
              Maquilladora profesional
            </span>
            <span className="rounded-full border border-stone-200 bg-stone-50 px-3 py-1 text-xs font-medium uppercase tracking-[0.2em] text-stone-600 dark:border-stone-700 dark:bg-stone-800 dark:text-stone-300">
              Creadora UGC
            </span>
          </div>

          <h2 id="about-heading" className="text-4xl font-semibold tracking-tight text-stone-900 dark:text-stone-100 sm:text-5xl">
            About me
          </h2>

          <p className="mt-5 text-lg leading-8 text-stone-600 dark:text-stone-400">
            Soy Lesley García, maquilladora profesional y creadora de contenido UGC enfocada en belleza, skincare y estética visual. Combino técnica, dirección de imagen y narrativa para crear looks que se ven impecables en cámara y conectan con audiencias reales.
          </p>

          <p className="mt-4 text-stone-600 dark:text-stone-400 leading-7">
            Mi trabajo se centra en resaltar la belleza natural, adaptar cada propuesta al tono de piel y convertir cada sesión en contenido versátil para marcas, redes sociales y proyectos editoriales.
          </p>

          <div className="mt-8 grid gap-4 sm:grid-cols-3">
            <div className="rounded-2xl border border-stone-200 bg-white/80 p-4 shadow-sm backdrop-blur dark:border-stone-700 dark:bg-stone-900/60">
              <p className="text-xs uppercase tracking-[0.2em] text-stone-500 dark:text-stone-400">Focus</p>
              <p className="mt-2 text-sm font-medium text-stone-900 dark:text-stone-100">Looks limpios, pulidos y listos para cámara.</p>
            </div>
            <div className="rounded-2xl border border-stone-200 bg-white/80 p-4 shadow-sm backdrop-blur dark:border-stone-700 dark:bg-stone-900/60">
              <p className="text-xs uppercase tracking-[0.2em] text-stone-500 dark:text-stone-400">UGC</p>
              <p className="mt-2 text-sm font-medium text-stone-900 dark:text-stone-100">Contenido auténtico que muestra valor y uso real.</p>
            </div>
            <div className="rounded-2xl border border-stone-200 bg-white/80 p-4 shadow-sm backdrop-blur dark:border-stone-700 dark:bg-stone-900/60">
              <p className="text-xs uppercase tracking-[0.2em] text-stone-500 dark:text-stone-400">Style</p>
              <p className="mt-2 text-sm font-medium text-stone-900 dark:text-stone-100">Estética editorial con enfoque comercial.</p>
            </div>
          </div>

          <div className="mt-8 flex flex-wrap gap-3">
            <a
              href="#contact"
              className="inline-flex items-center rounded-full bg-stone-900 px-5 py-3 text-sm font-medium text-white transition-colors hover:bg-stone-800 dark:bg-stone-100 dark:text-stone-900 dark:hover:bg-stone-200"
            >
              Agendar cita
            </a>
            <a
              href="#portfolio"
              className="inline-flex items-center rounded-full border border-stone-300 px-5 py-3 text-sm font-medium text-stone-700 transition-colors hover:border-stone-400 hover:text-stone-900 dark:border-stone-700 dark:text-stone-300 dark:hover:border-stone-500 dark:hover:text-stone-100"
            >
              Ver portafolio
            </a>
          </div>
        </div>

        <div className="flex items-center justify-center lg:justify-end">
          <div className="relative w-full max-w-md">
            <div className="absolute -inset-4 rounded-[2rem] bg-stone-100/80 blur-2xl dark:bg-stone-800/30" />
            <div className="relative overflow-hidden rounded-[2rem] border border-stone-200 bg-stone-50 shadow-2xl dark:border-stone-700 dark:bg-stone-900">
              <div className="relative aspect-[4/5] w-full">
                <Image
                  src={resolvedImage}
                  alt="Lesley García trabajando como maquilladora profesional y creadora UGC"
                  fill
                  sizes="(max-width: 1024px) 90vw, 480px"
                  className="object-cover"
                  priority
                />
              </div>
              <div className="border-t border-stone-200 p-5 dark:border-stone-700">
                <p className="text-xs uppercase tracking-[0.22em] text-stone-500 dark:text-stone-400">Maquillaje + UGC</p>
                <p className="mt-2 text-sm leading-6 text-stone-600 dark:text-stone-400">
                  Contenido pensado para resaltar belleza, vender con confianza y mantener coherencia visual en cada pieza.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}