"use client";

import { useMemo, useState } from "react";
import { SectionShell } from "@/components/shared/section-shell";
import { SectionHeading } from "@/components/shared/section-heading";
import { LightboxDialog } from "@/components/shared/lightbox-dialog";
import { portfolioCategories, portfolioItems } from "@/constants/portfolio";
import { portfolioStats } from "@/constants/portfolio-stats";
import type { PortfolioItem, PortfolioCategory } from "@/types/content";
import { ImagePreview } from "@/components/image-preview";
import { VideoPreview } from "@/components/video-preview";

export function PortfolioSection() {
  const [activeCategory, setActiveCategory] = useState<
    PortfolioCategory | "All"
  >("All");
  const [selectedItem, setSelectedItem] = useState<PortfolioItem | null>(null);

  const filteredItems = useMemo(() => {
    if (activeCategory === "All") return portfolioItems;
    return portfolioItems.filter((item) => item.categories.includes(activeCategory));
  }, [activeCategory]);

  return (
    <SectionShell id="portfolio" className="bg-[#F5F5F5]">
      <div className="space-y-10">
        <SectionHeading
          title="Portafolio visual"
          subtitle="Una muestra curada de maquillaje profesional, campañas UGC y contenido beauty para redes sociales."
        />

        <div className="flex flex-wrap gap-3">
          <FilterButton
            label="Todos"
            isActive={activeCategory === "All"}
            onClick={() => setActiveCategory("All")}
          />
          {portfolioCategories.map((category) => (
            <FilterButton
              key={category}
              label={category}
              isActive={activeCategory === category}
              onClick={() => setActiveCategory(category)}
            />
          ))}
        </div>

        <div className="columns-1 gap-6 space-y-6 md:columns-2 xl:columns-3">
          {filteredItems.map((item, index) => (
            <button
              key={item.id}
              type="button"
              onClick={() => setSelectedItem(item)}
              className="w-full break-inside-avoid text-left"
            >
              {item.type === "video" ? (
                <VideoPreview
                  videoSrc={item.src}
                  previewImage={item.previewImage}
                  alt={item.alt}
                  category={item.categories}
                  priority={index < 3}
                  showCta={false}
                />
              ) : (
                <ImagePreview
                  src={item.src}
                  hoverImage={item.hoverImage}
                  alt={item.alt}
                  category={item.categories}
                  priority={index < 3}
                  showCta={false}
                />
              )}
            </button>
          ))}
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {portfolioStats.map((stat) => (
            <div
              key={stat.label}
              className="rounded-2xl border border-stone-200 bg-white p-4"
            >
              <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">
                {stat.label}
              </p>
              <p className="mt-2 text-xl font-semibold text-foreground">
                {stat.value}
              </p>
            </div>
          ))}
        </div>
      </div>

      {selectedItem ? (
        <LightboxDialog
          isOpen={Boolean(selectedItem)}
          onOpenChange={(open) => setSelectedItem(open ? selectedItem : null)}
          title={selectedItem.alt}
          type={selectedItem.type}
          src={selectedItem.type === "image" ? selectedItem.src : selectedItem.src}
        />
      ) : null}
    </SectionShell>
  );
}

interface FilterButtonProps {
  label: string;
  isActive: boolean;
  onClick: () => void;
}

function FilterButton({ label, isActive, onClick }: FilterButtonProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`rounded-full border px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] transition-colors ${
        isActive
          ? "border-[#353C44] bg-[#353C44] text-white"
          : "border-stone-200 bg-white text-[#353C44]"
      }`}
    >
      {label}
    </button>
  );
}
