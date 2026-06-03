"use client";

import { brandLogos } from "@/constants/brands";

export function BrandsSection() {
  return (
    <section
      id="brands"
      className="relative w-full overflow-hidden border-t border-black/10 bg-white py-14 sm:py-20"
    >
      <div className="mx-auto max-w-[1400px] px-5 sm:px-8 lg:px-12">
        <p className="text-center text-[10px] font-medium uppercase tracking-[0.3em] text-[#0a0a0a]/55">
          Marcas que han confiado
        </p>
      </div>

      <div className="relative mt-10 overflow-hidden">
        <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-24 bg-gradient-to-r from-white to-transparent" />
        <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-24 bg-gradient-to-l from-white to-transparent" />
        <div className="flex items-center gap-14 animate-brand-marquee sm:gap-20">
          {[...brandLogos, ...brandLogos, ...brandLogos].map((brand, index) => (
            <div
              key={`${brand.id}-${index}`}
              className="flex h-10 flex-shrink-0 items-center justify-center grayscale opacity-50"
            >
              <img
                src={brand.logo}
                alt={brand.name}
                loading="lazy"
                className="h-6 w-auto"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
