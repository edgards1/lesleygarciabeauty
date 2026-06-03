import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Página no encontrada",
  description: "El enlace que buscaste ya no existe o se ha movido.",
  robots: { index: false, follow: false },
};

export default function NotFound() {
  return (
    <div className="relative flex min-h-[100dvh] w-full items-center justify-center overflow-hidden bg-[#FDFBF7] px-6">
      <div className="absolute inset-0 -z-10 opacity-[0.04] [background-image:radial-gradient(#1a1a1a_1px,transparent_1px)] [background-size:24px_24px]" />

      <div className="relative mx-auto w-full max-w-xl text-center">
        <span className="inline-block text-[10px] font-medium uppercase tracking-[0.3em] text-stone-500">
          404 — Página no encontrada
        </span>

        <h1 className="mt-4 font-serif text-7xl font-light leading-[0.95] tracking-tight text-[#1a1a1a] md:text-8xl">
          404
        </h1>

        <p className="mt-6 font-serif text-2xl font-light italic text-[#1a1a1a] md:text-3xl">
          Esta página se borró como
          <br className="hidden sm:block" /> un look de pasarela.
        </p>

        <p className="mx-auto mt-6 max-w-md text-balance text-base leading-relaxed text-stone-600">
          El enlace que buscaste ya no existe, se movió a otra sección, o
          simplemente nunca estuvo aquí. Te llevamos de vuelta al inicio.
        </p>

        <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <Link
            href="/"
            className="group relative inline-flex h-12 items-center justify-center overflow-hidden rounded-full bg-[#1a1a1a] px-7 text-[11px] font-medium uppercase tracking-[0.2em] text-white transition-transform duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] hover:scale-[1.02] active:scale-[0.98]"
          >
            <span className="relative z-10">Volver al inicio</span>
            <span
              aria-hidden
              className="absolute right-1.5 top-1/2 z-0 inline-flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full bg-white/10 transition-transform duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] group-hover:translate-x-0.5"
            >
              <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M5 12h14" />
                <path d="m13 5 7 7-7 7" />
              </svg>
            </span>
          </Link>

          <Link
            href="/#contact"
            className="inline-flex h-12 items-center justify-center rounded-full border border-stone-300 px-7 text-[11px] font-medium uppercase tracking-[0.2em] text-[#1a1a1a] transition-colors hover:border-[#1a1a1a]"
          >
            Ir a contacto
          </Link>
        </div>

        <p className="mt-16 text-[10px] uppercase tracking-[0.25em] text-stone-400">
          Lesley Garcia Beauty
        </p>
      </div>
    </div>
  );
}
