import { Navbar } from "@/components/navbar";
import { HeroSection } from "@/components/hero-section";
import { AboutSection } from "@/sections/about-section";
import { ServicesSection } from "@/sections/services-section";
import { PortfolioSection } from "@/sections/portfolio-section";
import { UgcResultsSection } from "@/sections/ugc-results-section";
import { TestimonialsSection } from "@/sections/testimonials-section";
import { SocialProofSection } from "@/sections/social-proof-section";
import { BrandsSection } from "@/sections/brands-section";
import { ContactSection } from "@/sections/contact-section";
import { SiteFooter } from "@/sections/site-footer";

export default function MakeupArtistPortfolio() {
  return (
    <>
      <Navbar />
      <main id="main" className="relative z-0 bg-white">
        <HeroSection />
        <AboutSection />
        <ServicesSection />
        <PortfolioSection />
        <UgcResultsSection />
        <TestimonialsSection />
        <SocialProofSection />
        <BrandsSection />
        <ContactSection />
      </main>
      <SiteFooter />
    </>
  );
}
