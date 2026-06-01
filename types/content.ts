export type PortfolioCategory = "Makeup" | "UGC" | "Skincare" | "Beauty Brands";

export type PortfolioItemType = "image" | "video";

export interface PortfolioItem {
  id: string;
  type: PortfolioItemType;
  src: string;
  alt: string;
  categories: PortfolioCategory[];
  previewImage?: string;
  hoverImage?: string;
}

export interface ServiceItem {
  id: string;
  title: string;
  description: string;
  cta: string;
  icon: "brush" | "glow" | "camera" | "ugc" | "tiktok" | "reels" | "review";
}

export interface MetricItem {
  id: string;
  label: string;
  value: number;
  unit?: string;
  suffix?: string;
  description: string;
}

export interface TestimonialItem {
  id: string;
  name: string;
  role: string;
  company?: string;
  quote: string;
  rating: number;
  image: string;
}

export interface BrandItem {
  id: string;
  name: string;
  logo: string;
}

export interface SocialPost {
  id: string;
  platform: "Instagram" | "TikTok";
  title: string;
  image: string;
  metric: string;
  href: string;
}
