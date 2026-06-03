import type React from "react";
import type { Metadata, Viewport } from "next";
import { GeistSans } from "geist/font/sans";
import { Playfair_Display } from "next/font/google";
import { Caveat } from "next/font/google";
// @ts-ignore: allow importing global CSS without module declarations
import "@/styles/globals.css";
import { ThemeProvider } from "@/components/theme-provider";

const playfair = Playfair_Display({
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
});

const caveat = Caveat({
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
  variable: "--font-caveat",
  display: "swap",
});

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://lesleygarciabeauty.com";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Lesley Garcia | Makeup Artist & UGC",
    template: "%s | Lesley Garcia Beauty",
  },
  description:
    "Maquilladora profesional y creadora UGC para marcas de belleza. Maquillaje premium, contenido para marcas y resultados medibles.",
  applicationName: "Lesley Garcia Beauty",
  keywords: [
    "makeup artist Ecuador",
    "maquilladora profesional",
    "UGC Ecuador",
    "contenido para marcas de belleza",
    "Lesley Garcia",
    "makeup Guayaquil",
    "bridal makeup",
    "skincare UGC",
  ],
  authors: [{ name: "Lesley Garcia", url: SITE_URL }],
  creator: "Lesley Garcia",
  publisher: "Lesley Garcia Beauty",
  category: "beauty",
  alternates: {
    canonical: "/",
    languages: { "es-EC": "/" },
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: [
      { url: "/icons/logo_LG.svg", type: "image/svg+xml" },
      { url: "/icons/favicon-32.svg", type: "image/svg+xml", sizes: "32x32" },
    ],
    apple: [{ url: "/icons/logo_LG.svg", type: "image/svg+xml" }],
  },
  manifest: "/site.webmanifest",
  openGraph: {
    type: "website",
    locale: "es_EC",
    url: SITE_URL,
    siteName: "Lesley Garcia Beauty",
    title: "Lesley Garcia | Makeup Artist & UGC",
    description:
      "Maquillaje profesional y contenido UGC para marcas de belleza, skincare y campañas digitales.",
    images: [
      {
        url: "/img/portada.jpeg",
        width: 1200,
        height: 630,
        alt: "Lesley Garcia Beauty — Maquilladora profesional y creadora UGC",
        type: "image/jpeg",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Lesley Garcia | Makeup Artist & UGC",
    description:
      "Maquillaje profesional y contenido UGC para marcas de belleza, skincare y campañas digitales.",
    images: ["/img/portada.jpeg"],
    creator: "@lesleygarciabeauty",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#FFFFFF" },
    { media: "(prefers-color-scheme: dark)", color: "#0A0A0A" },
  ],
  colorScheme: "light",
};

interface RootLayoutProps {
  children: React.ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="es" suppressHydrationWarning>
      <body
        className={`${GeistSans.variable} ${playfair.variable} ${caveat.variable} font-sans antialiased bg-white text-[#0a0a0a]`}
      >
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-none focus:bg-[#0a0a0a] focus:px-5 focus:py-2.5 focus:text-[10px] focus:font-medium focus:uppercase focus:tracking-[0.25em] focus:text-white"
        >
          Saltar al contenido principal
        </a>
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem
          disableTransitionOnChange={false}
        >
          {children}
        </ThemeProvider>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify([
              {
                "@context": "https://schema.org",
                "@type": "LocalBusiness",
                "@id": `${SITE_URL}#business`,
                name: "Lesley Garcia Beauty",
                url: SITE_URL,
                telephone: "+593983366831",
                email: "contacto@lesleygarciabeauty.com",
                image: `${SITE_URL}/img/portada.jpeg`,
                description:
                  "Maquillaje profesional y contenido UGC para marcas de belleza.",
                priceRange: "$$",
                sameAs: [
                  "https://www.instagram.com/lesleygarciabeauty",
                  "https://www.tiktok.com/@lesleygarciabeauty",
                  "https://www.facebook.com/lesleygarciabeauty",
                ],
                address: {
                  "@type": "PostalAddress",
                  addressLocality: "Guayaquil",
                  addressRegion: "Guayas",
                  addressCountry: "EC",
                },
                areaServed: [
                  { "@type": "Country", name: "Ecuador" },
                  { "@type": "City", name: "Guayaquil" },
                ],
                openingHoursSpecification: [
                  {
                    "@type": "OpeningHoursSpecification",
                    dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
                    opens: "09:00",
                    closes: "18:00",
                  },
                ],
              },
              {
                "@context": "https://schema.org",
                "@type": "WebSite",
                "@id": `${SITE_URL}#website`,
                url: SITE_URL,
                name: "Lesley Garcia Beauty",
                inLanguage: "es-EC",
                publisher: { "@id": `${SITE_URL}#business` },
              },
            ]),
          }}
        />
      </body>
    </html>
  );
}
