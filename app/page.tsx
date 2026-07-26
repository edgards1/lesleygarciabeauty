import { AppleNav } from "@/components/apple-nav";
import { HeroSection } from "@/components/hero-section";
import { PortfolioSection } from "@/components/portfolio-section";
import { SiteFooter } from "@/components/site-footer";
import { TickerBanner } from "@/components/sections/ticker-banner";
import { AboutSection } from "@/components/sections/about-section";
import { ServicesSection } from "@/components/sections/services-section";
import { UgcSection } from "@/components/sections/ugc-section";
import { TestimonialsSection } from "@/components/sections/testimonials-section";
import { ContactSection } from "@/components/sections/contact-section";

export default function MakeupArtistPortfolio() {
  return (
    <div className="min-h-screen bg-white dark:bg-stone-900 transition-colors">
      <AppleNav />
      <TickerBanner />
      <HeroSection />
      <AboutSection />
      <ServicesSection />
      <PortfolioSection />
      <UgcSection />
      <TestimonialsSection />
      <ContactSection />
      <SiteFooter />
    </div>
  );
}
