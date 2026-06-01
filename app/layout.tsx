import type React from "react";
import type { Metadata } from "next";
import { Jost, Cormorant_Garamond } from "next/font/google";
// @ts-ignore: allow importing global CSS without module declarations
import "@/styles/globals.css";
import { ThemeProvider } from "@/components/theme-provider";

const jost = Jost({ subsets: ["latin"], variable: "--font-jost" });
const cormorant = Cormorant_Garamond({
  weight: ["300", "400", "500", "600", "700"],
  subsets: ["latin"],
  variable: "--font-cormorant",
});

export const metadata: Metadata = {
  title: "Lesley García | Maquilladora Profesional",
  icons: {
    icon: [{ url: "/icons/logo_LG.svg", type: "image/svg+xml" }],
  },
  description:
    "Maquilladora profesional. Especializada en novias, pieles negras y sesiones editoriales.",
};

interface RootLayoutProps {
  children: React.ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="es" suppressHydrationWarning>
      <body
        className={`${jost.variable} ${cormorant.variable} font-sans antialiased`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem
          disableTransitionOnChange={false}
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
