import { LenisSmooth } from "@/components/lenis-smooth";
import { PageCurtain } from "@/components/page-curtain";
import { CreativeCursor } from "@/components/creative-cursor";
import { CreativeNav } from "@/components/creative-nav";
import { CreativeHero } from "@/components/sections/creative-hero";
import { CreativeWhat } from "@/components/sections/creative-what";
import { CreativeProjectsScroll } from "@/components/sections/creative-projects-scroll";
import { CreativeParallax } from "@/components/sections/creative-parallax";
import { CreativeTestimonials } from "@/components/sections/creative-testimonials";
import { CreativeMarquee } from "@/components/sections/creative-marquee";
import { CreativeNews } from "@/components/sections/creative-news";
import { CreativeContact } from "@/components/sections/creative-contact";
import { CreativeFooter } from "@/components/sections/creative-footer";

export default function LesleyGarciaBeautyHome() {
  return (
    <div className="min-h-screen bg-[#fffef7] text-[#0d0f12] font-display selection:bg-[#ffd001] selection:text-black">
      <LenisSmooth>
        <PageCurtain />
        <CreativeCursor />
        <CreativeNav />
        <main className="w-full max-w-full overflow-x-hidden">
          <CreativeHero />
          <CreativeWhat />
          <CreativeProjectsScroll />
          <CreativeParallax />
          <CreativeTestimonials />
          <CreativeMarquee />
          <CreativeNews />
          <CreativeContact />
        </main>
        <CreativeFooter />
      </LenisSmooth>
    </div>
  );
}
