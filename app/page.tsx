import { SiteHeader } from "@/sections/site-header";
import { HeroSection } from "@/sections/hero-section";
import { AboutSection } from "@/sections/about-section";
import { ServicesSection } from "@/sections/services-section";
import { PortfolioSection } from "@/sections/portfolio-section";
import { UgcResultsSection } from "@/sections/ugc-results-section";
import { TestimonialsSection } from "@/sections/testimonials-section";
import { BrandsSection } from "@/sections/brands-section";
import { SocialProofSection } from "@/sections/social-proof-section";
import { ContactSection } from "@/sections/contact-section";
import { SiteFooter } from "@/sections/site-footer";

export default function MakeupArtistPortfolio() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <SiteHeader />
      <main className="pt-28">
        <div id="hero">
          <HeroSection />
        </div>
        <AboutSection />
        <ServicesSection />
        <PortfolioSection />
        <UgcResultsSection />
        <TestimonialsSection />
        <BrandsSection />
        <SocialProofSection />
        <ContactSection />
      </main>
      <SiteFooter />
    </div>
  );
}
