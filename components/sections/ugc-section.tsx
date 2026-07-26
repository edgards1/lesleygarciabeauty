import { FaWhatsapp } from "react-icons/fa";
import { FadeIn } from "@/components/animations/fade-in";

const ugcItems = [
  {
    src: "/img/social_1.webp",
    brand: "Skincare Brand",
    type: "Reel",
  },
  {
    src: "/img/social_2.webp",
    brand: "Cosmética",
    type: "Story",
  },
  {
    src: "/img/social_5.webp",
    brand: "Belleza Natural",
    type: "Post",
  },
  {
    src: "/img/social_8.webp",
    brand: "Beauty Brand",
    type: "Reel",
  },
  {
    src: "/img/social_9.webp",
    brand: "Skincare Premium",
    type: "Carrusel",
  },
  {
    src: "/img/social_10.webp",
    brand: "Cosmética Profesional",
    type: "Post",
  },
];

export function UgcSection() {
  return (
    <section
      id="ugc"
      className="py-24 bg-[#0a0a0a] text-white relative overflow-hidden"
    >
      {/* Subtle grain texture overlay */}
      <div
        aria-hidden
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
        }}
      />

      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header */}
        <FadeIn className="max-w-4xl mx-auto text-center mb-20">
          <div className="flex items-center justify-center gap-4 mb-8">
            <div className="h-px w-12 bg-white/20" />
            <span className="text-[10px] font-medium uppercase tracking-[0.35em] text-white/50">
              UGC Creator &amp; Brand Collaborations
            </span>
            <div className="h-px w-12 bg-white/20" />
          </div>

          <h2 className="text-5xl md:text-6xl font-serif italic text-white mb-6 leading-[1.05]">
            Contenido que
            <br />
            impulsa marcas
          </h2>

          <p className="text-base text-white/50 max-w-xl mx-auto leading-relaxed">
            Colaboro con marcas de skincare y cosmética para crear contenido
            digital auténtico que conecta con audiencias y genera resultados
            medibles.
          </p>
        </FadeIn>

        {/* UGC Content Gallery — auto-scrolling marquee */}
        <FadeIn delay={0.2}>
          <div className="relative overflow-hidden">
            {/* Fade edges */}
            <div className="absolute left-0 top-0 bottom-0 w-16 bg-gradient-to-r from-[#0a0a0a] to-transparent z-10 pointer-events-none" />
            <div className="absolute right-0 top-0 bottom-0 w-16 bg-gradient-to-l from-[#0a0a0a] to-transparent z-10 pointer-events-none" />

            {/* Marquee track */}
            <div className="flex gap-5 animate-ugc-marquee w-max group-hover:[animation-play-state:paused]">
              {ugcItems.map((item, index) => (
                <div
                  key={`a-${index}`}
                  className="flex-shrink-0 w-[260px] md:w-[300px] group/card cursor-pointer"
                >
                  <div className="relative aspect-[3/4] rounded-xl overflow-hidden mb-4">
                    <img
                      src={item.src}
                      alt={`UGC para ${item.brand}`}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover/card:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover/card:opacity-100 transition-opacity duration-500" />
                    <div className="absolute top-4 left-4">
                      <span className="bg-white/10 backdrop-blur-md text-white text-[10px] font-medium uppercase tracking-widest px-3 py-1.5 rounded-full border border-white/10">
                        {item.type}
                      </span>
                    </div>
                    <div className="absolute bottom-4 left-4 right-4 translate-y-4 opacity-0 group-hover/card:translate-y-0 group-hover/card:opacity-100 transition-all duration-500">
                      <p className="text-xs text-white/60 uppercase tracking-widest mb-1">
                        Colaboración
                      </p>
                      <p className="text-sm font-medium text-white">
                        {item.brand}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
              {/* Duplicate for seamless loop */}
              {ugcItems.map((item, index) => (
                <div
                  key={`b-${index}`}
                  className="flex-shrink-0 w-[260px] md:w-[300px] group/card cursor-pointer"
                >
                  <div className="relative aspect-[3/4] rounded-xl overflow-hidden mb-4">
                    <img
                      src={item.src}
                      alt={`UGC para ${item.brand}`}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover/card:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover/card:opacity-100 transition-opacity duration-500" />
                    <div className="absolute top-4 left-4">
                      <span className="bg-white/10 backdrop-blur-md text-white text-[10px] font-medium uppercase tracking-widest px-3 py-1.5 rounded-full border border-white/10">
                        {item.type}
                      </span>
                    </div>
                    <div className="absolute bottom-4 left-4 right-4 translate-y-4 opacity-0 group-hover/card:translate-y-0 group-hover/card:opacity-100 transition-all duration-500">
                      <p className="text-xs text-white/60 uppercase tracking-widest mb-1">
                        Colaboración
                      </p>
                      <p className="text-sm font-medium text-white">
                        {item.brand}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </FadeIn>

        {/* Brand Logos Strip */}
        <FadeIn delay={0.5}>
          <div className="mt-16 text-center">
            <p className="text-[10px] uppercase tracking-[0.3em] text-white/30 mb-8 font-medium">
              Marcas que confían en mí
            </p>
            <div className="flex flex-wrap items-center justify-center gap-x-12 gap-y-6 opacity-30">
              {[
                "SKINCARE CO",
                "BEAUTÉ",
                "GLOW LABS",
                "DERMA BEAUTY",
                "PURE COSMÉTICS",
              ].map((brand, index) => (
                <span
                  key={index}
                  className="text-sm uppercase tracking-[0.2em] font-medium text-white"
                >
                  {brand}
                </span>
              ))}
            </div>
          </div>
        </FadeIn>

        {/* CTA */}
        <FadeIn delay={0.6} className="text-center mt-16">
          <a
            href="#contact"
            className="group inline-flex h-12 items-center justify-center border border-white/20 px-8 text-[10px] font-medium uppercase tracking-[0.25em] text-white transition-all duration-300 hover:bg-white hover:text-[#0a0a0a] hover:border-white"
          >
            Trabajemos Juntos
            <span className="ml-3 inline-block h-px w-5 bg-current transition-all duration-300 group-hover:w-7" />
          </a>
        </FadeIn>
      </div>
    </section>
  );
}
