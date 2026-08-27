"use client";

const BRANDS = [
  "MAC COSMETICS",
  "NARS",
  "FENTY BEAUTY",
  "RARE BEAUTY",
  "CHARLOTTE TILBURY",
  "SEPHORA",
  "LAURA MERCIER",
  "ESTÉE LAUDER",
  "DIOR BACKSTAGE",
  "ANASTASIA BEVERLY HILLS",
];

export function CreativeMarquee() {
  return (
    <div className="relative w-full overflow-hidden bg-[#0d0f12] py-8 text-[#fffef7] border-y border-white/10 select-none">
      <div className="flex w-max animate-marquee space-x-12 whitespace-nowrap">
        {[...BRANDS, ...BRANDS].map((brand, idx) => (
          <div key={idx} className="flex items-center gap-12">
            <span className="font-display text-sm sm:text-base font-light tracking-[0.25em] text-white/70 hover:text-white transition-colors">
              {brand}
            </span>
            <span className="h-1.5 w-1.5 rounded-full bg-[#ffd001]" />
          </div>
        ))}
      </div>
    </div>
  );
}
