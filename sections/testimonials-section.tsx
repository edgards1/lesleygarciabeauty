"use client";

import Image from "next/image";
import { SectionShell } from "@/components/shared/section-shell";
import { SectionHeading } from "@/components/shared/section-heading";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { testimonials } from "@/constants/testimonials";

export function TestimonialsSection() {
  return (
    <SectionShell id="testimonials" className="bg-white">
      <div className="space-y-10">
        <SectionHeading
          title="Testimonios reales"
          subtitle="Historias de clientas y marcas que confiaron en mi trabajo para eventos y campanas de belleza."
          align="center"
        />

        <Carousel opts={{ loop: true }} className="max-w-4xl mx-auto">
          <CarouselContent>
            {testimonials.map((item) => (
              <CarouselItem key={item.id} className="md:basis-1/2">
                <div className="h-full rounded-3xl border border-stone-200 bg-[#F5F5F5] p-6">
                  <div className="flex items-center gap-4">
                    <div className="relative h-12 w-12 overflow-hidden rounded-full">
                      <Image
                        src={item.image}
                        alt={item.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-foreground">
                        {item.name}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {item.role}
                        {item.company ? `, ${item.company}` : ""}
                      </p>
                    </div>
                  </div>

                  <p className="mt-5 text-sm text-foreground">
                    {item.quote}
                  </p>
                  <p className="mt-4 text-xs uppercase tracking-[0.2em] text-muted-foreground">
                    {"★".repeat(item.rating)}
                  </p>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="-left-6" />
          <CarouselNext className="-right-6" />
        </Carousel>
      </div>
    </SectionShell>
  );
}
