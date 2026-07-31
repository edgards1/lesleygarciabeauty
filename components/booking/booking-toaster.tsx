"use client"

import { Toaster as SonnerToaster } from "sonner"

export function BookingToaster() {
  return (
    <SonnerToaster
      position="bottom-center"
      gap={10}
      offset={20}
      toastOptions={{
        style: {
          background: "#1c1917",
          color: "#fafaf9",
          border: "1px solid rgba(255,255,255,0.12)",
          borderRadius: "9999px",
          padding: "12px 20px",
          fontSize: "13px",
          fontWeight: 500,
          lineHeight: 1.4,
          boxShadow: "0 16px 40px -12px rgba(0,0,0,0.35)",
          fontFamily: "var(--font-sans)",
          maxWidth: "min(90vw, 420px)",
        },
        classNames: {
          toast: "!rounded-full",
          error: "text-white",
          title: "!font-sans",
        },
      }}
    />
  )
}
