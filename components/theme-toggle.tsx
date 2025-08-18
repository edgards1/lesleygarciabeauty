"use client"

import { PiMoonStarsThin, PiSunDim } from "react-icons/pi"
import { useTheme } from "next-themes"
import { useEffect, useState } from "react"

export function ThemeToggle() {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return null
  }

  const isDark = theme === "dark"

  return (
    <div className="flex items-center gap-2">
      <label className="relative inline-flex items-center cursor-pointer">
        <input
          type="checkbox"
          checked={isDark}
          onChange={() => setTheme(isDark ? "light" : "dark")}
          className="sr-only"
        />
        <div 
          className={`
            relative w-14 h-8 rounded-full transition-all duration-300 ease-in-out
            ${isDark 
              ? 'bg-stone-700 border-stone-600' 
              : 'bg-stone-200 border-stone-300'
            }
            border-2 shadow-inner
          `}
        >
          <div 
            className={`
              absolute top-0.5 left-0.5 w-6 h-6 rounded-full transition-all duration-300 ease-in-out
              flex items-center justify-center shadow-md
              ${isDark 
                ? 'translate-x-6 bg-stone-800 text-stone-100' 
                : 'translate-x-0 bg-white text-stone-600'
              }
            `}
          >
            {isDark ? (
              <PiMoonStarsThin className="w-4 h-4" />
            ) : (
              <PiSunDim className="w-4 h-4" />
            )}
          </div>
        </div>
        <span className="sr-only">Alternar tema</span>
      </label>
    </div>
  )
}
