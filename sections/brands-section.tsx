import { SectionShell } from "@/components/shared/section-shell";
import { SectionHeading } from "@/components/shared/section-heading";
import { BrandMarquee } from "@/components/shared/brand-marquee";
import { brandLogos } from "@/constants/brands";

export function BrandsSection() {
  return (
    <SectionShell id="brands" className="bg-[#F5F5F5]">
      <div className="space-y-10">
        <SectionHeading
          title="Marcas colaboradoras"
          subtitle="Marcas de cosmetica y skincare que han confiado en mi contenido UGC y direccion visual."
          align="center"
        />
        <BrandMarquee brands={brandLogos} />
      </div>
    </SectionShell>
  );
}
