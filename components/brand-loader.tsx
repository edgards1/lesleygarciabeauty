"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import { cn } from "@/lib/utils"

interface BrandLoaderProps {
  message?: string
  className?: string
  size?: 'sm' | 'md' | 'lg'
  showProgress?: boolean
}

export function BrandLoader({ 
  message = "Cargando experiencia...", 
  className,
  size = 'md',
  showProgress = false
}: BrandLoaderProps) {
  const [progress, setProgress] = useState(0)

  // Configuración de tamaños
  const sizeConfig = {
    sm: { container: 'h-16 w-16', logo: 32, text: 'text-xs' },
    md: { container: 'h-24 w-24', logo: 48, text: 'text-sm' },
    lg: { container: 'h-32 w-32', logo: 64, text: 'text-base' }
  }

  const config = sizeConfig[size]

  // Animación de progreso sutil si está habilitada
  useEffect(() => {
    if (!showProgress) return

    const timer = setInterval(() => {
      setProgress(prev => {
        const increment = Math.random() * 5 + 2
        return prev >= 95 ? 0 : Math.min(prev + increment, 95)
      })
    }, 300)

    return () => clearInterval(timer)
  }, [showProgress])

  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center gap-6",
        "text-stone-700 dark:text-stone-300",
        className
      )}
      role="status"
      aria-live="polite"
    >
      {/* Container principal */}
      <div className={cn("relative", config.container)}>
        {/* Resplandor sutil exterior */}
        <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-amber-400/20 via-amber-300/10 to-transparent blur-lg animate-pulse" />
        
        {/* Anillo rotatorio principal */}
        <div 
          className="absolute inset-0 animate-spin" 
          style={{ animationDuration: '3s', animationTimingFunction: 'linear' }}
        >
          <div className="absolute inset-0 rounded-full border border-stone-300/40 dark:border-stone-600/40" />
          <div className="absolute inset-0 rounded-full border-t-2 border-t-amber-500 dark:border-t-amber-400 border-transparent" />
        </div>
        
        {/* Anillo interno contra-rotatorio */}
        <div 
          className="absolute inset-2 animate-spin opacity-60" 
          style={{ 
            animationDuration: '4s', 
            animationDirection: 'reverse',
            animationTimingFunction: 'linear'
          }}
        >
          <div className="absolute inset-0 rounded-full border border-dashed border-stone-400/30 dark:border-stone-500/30" />
        </div>
        
        {/* Progreso circular (si está habilitado) */}
        {showProgress && (
          <svg className="absolute inset-0 -rotate-90 transform">
            <circle
              cx="50%"
              cy="50%"
              r="45%"
              stroke="currentColor"
              strokeWidth="1"
              fill="transparent"
              className="text-amber-400/60"
              strokeDasharray={`${2 * Math.PI * (parseInt(config.container.split(' ')[1].replace('w-', '')) * 4 * 0.45)}`}
              strokeDashoffset={`${2 * Math.PI * (parseInt(config.container.split(' ')[1].replace('w-', '')) * 4 * 0.45) * (1 - progress / 100)}`}
              style={{
                transition: 'stroke-dashoffset 0.3s ease-out'
              }}
            />
          </svg>
        )}
        
        {/* Logo central */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="relative bg-white/90 dark:bg-stone-800/90 backdrop-blur-sm rounded-full p-2 shadow-lg">
            <Image
              src="/icons/Logo_LG.svg"
              alt="LG"
              width={config.logo}
              height={config.logo}
              className="opacity-90 drop-shadow-sm"
              priority
            />
          </div>
        </div>

        {/* Puntos orbitales decorativos */}
        <div className="absolute inset-0 animate-pulse" style={{ animationDuration: '2s' }}>
          <div className="absolute top-0 left-1/2 h-1 w-1 -translate-x-1/2 rounded-full bg-amber-400 opacity-80" />
          <div className="absolute bottom-0 left-1/2 h-0.5 w-0.5 -translate-x-1/2 rounded-full bg-stone-400 opacity-60" />
        </div>
      </div>

      {/* Texto del mensaje */}
      <div className="flex flex-col items-center gap-1 animate-pulse">
        <p className={cn(config.text, "tracking-wide font-medium text-center")}>
          {message}
        </p>
        {showProgress && (
          <div className="flex items-center gap-2">
            <div className="w-16 h-px bg-stone-200 dark:bg-stone-700 rounded-full overflow-hidden">
              <div 
                className="h-full bg-gradient-to-r from-amber-400 to-amber-500 transition-all duration-300"
                style={{ width: `${progress}%` }}
              />
            </div>
            <span className="text-xs text-stone-500 dark:text-stone-500 tabular-nums">
              {progress.toFixed(0)}%
            </span>
          </div>
        )}
        <p className="text-xs text-stone-500 dark:text-stone-500 text-center max-w-xs">
          Preparando tu experiencia personalizada
        </p>
      </div>
    </div>
  )
}