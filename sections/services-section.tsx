import Link from "next/link";
import { Button } from "@/components/ui/button";
import { SectionShell } from "@/components/shared/section-shell";
import { SectionHeading } from "@/components/shared/section-heading";
import { ServiceIcon } from "@/components/shared/service-icon";
import { services } from "@/constants/services";

export function ServicesSection() {
  return (
    <SectionShell id="services" className="bg-white">
      <div className="space-y-10">
        <SectionHeading
          title="Servicios premium"
          subtitle="Propuestas de maquillaje y contenido UGC pensadas para clientes y marcas que buscan calidad, estetica y resultados medibles."
        />

        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {services.map((service) => (
            <div
              key={service.id}
              className="rounded-3xl border border-stone-200 bg-[#F5F5F5] p-6 shadow-[0_20px_40px_rgba(53,60,68,0.08)]"
            >
              <div className="flex items-center justify-between">
                <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#E8D8D0] text-[#353C44]">
                  <ServiceIcon name={service.icon} />
                </span>
                <span className="text-xs uppercase tracking-[0.2em] text-muted-foreground">
                  Premium
                </span>
              </div>
              <h3 className="mt-5 text-xl font-semibold text-foreground">
                {service.title}
              </h3>
              <p className="mt-3 text-sm text-muted-foreground">
                {service.description}
              </p>
              <Button
                asChild
                variant="outline"
                className="mt-6 w-full rounded-full border-[#353C44] text-xs font-semibold uppercase tracking-[0.2em]"
              >
                <Link href="#contact">{service.cta}</Link>
              </Button>
            </div>
          ))}
        </div>
      </div>
    </SectionShell>
  );
}
