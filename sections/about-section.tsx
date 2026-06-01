import Image from "next/image";
import { SectionShell } from "@/components/shared/section-shell";
import { SectionHeading } from "@/components/shared/section-heading";
import { aboutContent } from "@/constants/about";

export function AboutSection() {
  return (
    <SectionShell id="about" className="bg-[#F5F5F5]">
      <div className="grid items-center gap-12 lg:grid-cols-[1.1fr_0.9fr]">
        <div>
          <SectionHeading
            eyebrow={aboutContent.eyebrow}
            title={aboutContent.title}
            subtitle={aboutContent.description[0]}
          />
          <p className="mt-5 text-sm sm:text-base text-muted-foreground max-w-2xl">
            {aboutContent.description[1]}
          </p>

          <div className="mt-8 grid gap-4 sm:grid-cols-3">
            {aboutContent.stats.map((item) => (
              <div
                key={item.label}
                className="rounded-2xl border border-stone-200 bg-white px-4 py-5"
              >
                <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">
                  {item.label}
                </p>
                <p className="mt-2 text-lg font-semibold text-foreground">
                  {item.value}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-8 grid gap-6 sm:grid-cols-2">
            <div className="rounded-2xl border border-stone-200 bg-white p-5">
              <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">
                Especialidades
              </p>
              <ul className="mt-4 space-y-2 text-sm text-foreground">
                {aboutContent.specialties.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
            <div className="rounded-2xl border border-stone-200 bg-white p-5">
              <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">
                Certificaciones
              </p>
              <ul className="mt-4 space-y-2 text-sm text-foreground">
                {aboutContent.certifications.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <div className="relative">
          <div className="absolute -inset-6 rounded-[32px] bg-[#E8D8D0] blur-2xl" />
          <div className="relative overflow-hidden rounded-[32px] border border-stone-200 bg-white">
            <div className="relative aspect-[4/5] w-full">
              <Image
                src={aboutContent.image}
                alt="Lesley Garcia trabajando como maquilladora profesional"
                fill
                sizes="(max-width: 1024px) 100vw, 40vw"
                className="object-cover"
                priority
              />
            </div>
          </div>
        </div>
      </div>
    </SectionShell>
  );
}
