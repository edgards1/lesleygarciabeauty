import type { BrandItem } from "@/types/content";

interface BrandMarqueeProps {
  brands: BrandItem[];
}

export function BrandMarquee({ brands }: BrandMarqueeProps) {
  return (
    <div className="relative overflow-hidden">
      <div className="flex gap-10 animate-brand-marquee">
        {[...brands, ...brands].map((brand, index) => (
          <div
            key={`${brand.id}-${index}`}
            className="flex items-center justify-center rounded-full bg-white/70 px-6 py-3 shadow-sm"
          >
            <img
              src={brand.logo}
              alt={brand.name}
              loading="lazy"
              className="h-6 w-auto opacity-70"
            />
          </div>
        ))}
      </div>
    </div>
  );
}
