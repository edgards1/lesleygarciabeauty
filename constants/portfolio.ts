import type { PortfolioItem, PortfolioCategory } from "@/types/content";

export const portfolioCategories: PortfolioCategory[] = [
  "Makeup",
  "UGC",
  "Skincare",
  "Beauty Brands",
];

export const portfolioItems: PortfolioItem[] = [
  {
    id: "portfolio-bridal-01",
    type: "image",
    src: "/img/novia_01.JPG",
    hoverImage: "/img/novia_1.jpg",
    alt: "Maquillaje de novia con acabado luminoso",
    categories: ["Makeup", "Beauty Brands"],
  },
  {
    id: "portfolio-ugc-01",
    type: "video",
    src: "/img/video_novia_1.mov",
    previewImage: "/img/social_10.jpg",
    alt: "UGC maquillaje para campaña digital",
    categories: ["UGC", "Beauty Brands"],
  },
  {
    id: "portfolio-editorial-01",
    type: "image",
    src: "/img/social_7.jpg",
    hoverImage: "/img/social_6.jpg",
    alt: "Makeup editorial con mirada intensa",
    categories: ["Makeup"],
  },
  {
    id: "portfolio-ugc-02",
    type: "video",
    src: "/img/video_social_6.MOV",
    previewImage: "/img/social_6.jpg",
    alt: "Contenido UGC para maquillaje social",
    categories: ["UGC"],
  },
  {
    id: "portfolio-skincare-01",
    type: "image",
    src: "/img/social_5.jpg",
    hoverImage: "/img/social_3.JPG",
    alt: "Skincare look con piel luminosa",
    categories: ["Skincare"],
  },
  {
    id: "portfolio-beauty-01",
    type: "image",
    src: "/img/social_3.JPG",
    hoverImage: "/img/social_010.jpg",
    alt: "Look beauty para marca de cosmetica",
    categories: ["Beauty Brands", "Makeup"],
  },
  {
    id: "portfolio-ugc-03",
    type: "video",
    src: "/img/video_piel_ebano.MOV",
    previewImage: "/img/ebano_1.jpg",
    alt: "UGC con enfoque en tonos de piel",
    categories: ["UGC", "Skincare"],
  },
  {
    id: "portfolio-editorial-02",
    type: "image",
    src: "/img/social_1.jpg",
    hoverImage: "/img/social_2.jpg",
    alt: "Look editorial para contenido premium",
    categories: ["Makeup"],
  },
];
