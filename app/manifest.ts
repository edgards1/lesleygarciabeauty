import type { MetadataRoute } from "next";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://lesleygarciabeauty.com";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Lesley Garcia Beauty",
    short_name: "LG Beauty",
    description:
      "Maquilladora profesional y creadora UGC para marcas de belleza.",
    start_url: "/",
    scope: "/",
    display: "standalone",
    orientation: "portrait",
    background_color: "#FDFBF7",
    theme_color: "#1a1a1a",
    lang: "es-EC",
    icons: [
      {
        src: "/icons/logo_LG.svg",
        sizes: "any",
        type: "image/svg+xml",
        purpose: "any",
      },
      {
        src: "/icons/favicon-32.svg",
        sizes: "32x32",
        type: "image/svg+xml",
        purpose: "any",
      },
    ],
    categories: ["beauty", "lifestyle", "business"],
  };
}
