import { Playfair_Display, Plus_Jakarta_Sans } from "next/font/google"
import type React from "react"

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
})

const jakarta = Plus_Jakarta_Sans({
  weight: ["400", "500", "600", "700", "800"],
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
})

export default function BookingLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className={`${playfair.variable} ${jakarta.variable}`}>
      {children}
    </div>
  )
}
