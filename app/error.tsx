"use client";

import { useEffect } from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    if (typeof console !== "undefined") {
      console.error("Error boundary caught:", error);
    }
  }, [error]);

  return (
    <div
      className="relative flex min-h-[100dvh] w-full items-center justify-center overflow-hidden bg-[#FDFBF7] px-6"
      role="alert"
      aria-live="assertive"
    >
      <div className="absolute inset-0 -z-10 opacity-[0.04] [background-image:radial-gradient(#1a1a1a_1px,transparent_1px)] [background-size:24px_24px]" />

      <div className="relative mx-auto w-full max-w-xl text-center">
        <span className="inline-block text-[10px] font-medium uppercase tracking-[0.3em] text-stone-500">
          Algo no salió como esperábamos
        </span>

        <h1 className="mt-4 font-serif text-6xl font-light leading-[0.95] tracking-tight text-[#1a1a1a] md:text-7xl">
          Error
          <span className="block font-sans text-sm font-normal text-stone-500">
            inesperado
          </span>
        </h1>

        <p className="mx-auto mt-6 max-w-md text-balance text-base leading-relaxed text-stone-600">
          Detectamos un detalle técnico al cargar esta vista. Tu sesión está
          intacta y el resto del sitio funciona con normalidad.
        </p>

        {error.digest ? (
          <p className="mt-4 text-[10px] uppercase tracking-[0.25em] text-stone-400">
            Código: {error.digest}
          </p>
        ) : null}

        <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <button
            type="button"
            onClick={reset}
            className="group relative inline-flex h-12 items-center justify-center overflow-hidden rounded-full bg-[#1a1a1a] px-7 text-[11px] font-medium uppercase tracking-[0.2em] text-white transition-transform duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] hover:scale-[1.02] active:scale-[0.98]"
          >
            <span className="relative z-10">Intentar de nuevo</span>
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
          </button>

          <a
            href="/"
            className="inline-flex h-12 items-center justify-center rounded-full border border-stone-300 px-7 text-[11px] font-medium uppercase tracking-[0.2em] text-[#1a1a1a] transition-colors hover:border-[#1a1a1a]"
          >
            Volver al inicio
          </a>
        </div>
      </div>
    </div>
  );
}
