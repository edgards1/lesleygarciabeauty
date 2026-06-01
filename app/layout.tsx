import type React from "react";
import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
// @ts-ignore: allow importing global CSS without module declarations
import "@/styles/globals.css";
import { ThemeProvider } from "@/components/theme-provider";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const playfair = Playfair_Display({
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
  variable: "--font-playfair",
});

export const metadata: Metadata = {
  title: "Lesley Garcia | Makeup Artist y UGC",
  // metadataBase: new URL("https://lesleygarciabeauty.com"),
  metadataBase: new URL("https://localhost:3000"),
  icons: {
    icon: [{ url: "/icons/logo_LG.svg", type: "image/svg+xml" }],
  },
  description:
    "Maquilladora profesional y creadora UGC. Belleza premium, contenido para marcas y resultados medibles.",
  openGraph: {
    title: "Lesley Garcia | Makeup Artist y UGC",
    description:
      "Maquillaje profesional y contenido UGC para marcas de belleza, skincare y campañas digitales.",
    url: "https://localhost:3000",
    siteName: "Lesley Garcia Beauty",
    locale: "es-EC",
    type: "website",
    images: [
      {
        url: "/img/portada.jpeg",
        width: 1200,
        height: 630,
        alt: "Lesley Garcia Beauty",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Lesley Garcia | Makeup Artist y UGC",
    description:
      "Maquillaje profesional y contenido UGC para marcas de belleza, skincare y campañas digitales.",
    images: ["/img/portada.jpeg"],
  },
};

interface RootLayoutProps {
  children: React.ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="es" suppressHydrationWarning>
      <body
        className={`${inter.variable} ${playfair.variable} font-sans antialiased`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem
          disableTransitionOnChange={false}
        >
          {children}
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
              __html: JSON.stringify({
                "@context": "https://schema.org",
                "@type": "LocalBusiness",
                name: "Lesley Garcia Beauty",
                url: "https://localhost:3000",
                telephone: "+593983366831",
                image: "https://localhost:3000/img/portada.jpeg",
                description:
                  "Maquillaje profesional y contenido UGC para marcas de belleza.",
                sameAs: [
                  "https://www.instagram.com/lesleygarciabeauty",
                  "https://www.tiktok.com/@lesleygarciabeauty",
                  "https://www.facebook.com/lesleygarciabeauty",
                ],
                address: {
                  "@type": "PostalAddress",
                  addressLocality: "Quito",
                  addressCountry: "EC",
                },
                areaServed: "EC",
              }),
            }}
          />
        </ThemeProvider>
      </body>
    </html>
  );
}
