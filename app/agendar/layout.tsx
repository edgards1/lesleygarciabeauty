import { Inter } from "next/font/google"
import type React from "react"

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
})

export default function BookingLayout({ children }: { children: React.ReactNode }) {
  return <div className={inter.variable}>{children}</div>
}
