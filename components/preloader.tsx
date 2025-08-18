"use client"

import { useEffect, useState } from "react"

export default function Preloader() {
  const [hidden, setHidden] = useState(false)

  useEffect(() => {
    // pequeño delay para evitar parpadeos
    const t = setTimeout(() => setHidden(true), 600)
    return () => clearTimeout(t)
  }, [])

  if (hidden) return null

  return (
    <div className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-white dark:bg-stone-900">
      <div className="h-10 w-10 rounded-full border-2 border-stone-300 border-t-stone-900 dark:border-stone-700 dark:border-t-stone-100 animate-spin" />
      <p className="mt-4 text-sm tracking-wide text-stone-600 dark:text-stone-300">Cargando…</p>
    </div>
  )
}