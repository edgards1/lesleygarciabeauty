import type React from "react"
import type { Metadata } from "next"
import { Inter, Playfair_Display } from "next/font/google"
import "../styles/globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { InitialLoader } from "@/components/initial-loader"

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" })
const playfair = Playfair_Display({ subsets: ["latin"], variable: "--font-playfair" })

export const metadata: Metadata = {
  title: "Lesley García | Maquilladora Profesional",
  icons: {
    icon: [
      { url: "/icons/logo_LG.svg", type: "image/svg+xml" }
    ],
  },
  description:
    "Maquilladora profesional. Especializada en novias, pieles negras y sesiones editoriales."
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es" suppressHydrationWarning>
      <body className={`${inter.variable} ${playfair.variable} font-sans antialiased`}>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem disableTransitionOnChange={false}>
          <InitialLoader />
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}
