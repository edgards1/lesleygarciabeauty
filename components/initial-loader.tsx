"use client"

import { useCallback, useEffect, useState } from "react"
import Image from "next/image"
import { cn } from "@/lib/utils"

interface LoadingState {
  isLoading: boolean
  fadeOut: boolean
  progress: number
  currentWordIndex: number
  isWordVisible: boolean
}

export function InitialLoader() {
  const [state, setState] = useState<LoadingState>({
    isLoading: true,
    fadeOut: false,
    progress: 0,
    currentWordIndex: 0,
    isWordVisible: true
  })

  // Palabras rotativas elegantes
  const rotatingWords = [
    "Elegancia",
    "Belleza", 
    "Perfección",
    "Lesley García"
  ] as const

  // Configuración de timing optimizada
  const TIMING_CONFIG = {
    minLoadTime: 4800,
    progressInterval: 60,
    wordRotationInterval: 1200,
    wordTransitionDuration: 300,
    fadeOutDuration: 800
  } as const

  // Función para calcular progreso natural
  const calculateProgressIncrement = useCallback((currentProgress: number): number => {
    if (currentProgress < 20) return 2.5   // Inicio más lento
    if (currentProgress < 60) return 3     // Medio más rápido  
    if (currentProgress < 85) return 2     // Final más lento
    return 1                               // Muy lento al final
  }, [])

  // Efecto para manejar el progreso
  useEffect(() => {
    const progressTimer = setInterval(() => {
      setState(prev => {
        if (prev.progress >= 100) {
          clearInterval(progressTimer)
          return prev
        }
        
        const increment = calculateProgressIncrement(prev.progress)
        const newProgress = Math.min(prev.progress + increment, 100)
        
        return {
          ...prev,
          progress: newProgress
        }
      })
    }, TIMING_CONFIG.progressInterval)

    return () => clearInterval(progressTimer)
  }, [calculateProgressIncrement, TIMING_CONFIG.progressInterval])

  // Efecto para rotación de palabras
  useEffect(() => {
    const wordTimer = setInterval(() => {
      setState(prev => ({ ...prev, isWordVisible: false }))
      
      setTimeout(() => {
        setState(prev => ({
          ...prev,
          currentWordIndex: (prev.currentWordIndex + 1) % rotatingWords.length,
          isWordVisible: true
        }))
      }, TIMING_CONFIG.wordTransitionDuration)
    }, TIMING_CONFIG.wordRotationInterval)

    return () => clearInterval(wordTimer)
  }, [TIMING_CONFIG.wordRotationInterval, TIMING_CONFIG.wordTransitionDuration])

  // Efecto principal de carga
  useEffect(() => {
    const startTime = Date.now()
    
    const handleLoadComplete = () => {
      const elapsedTime = Date.now() - startTime
      const remainingTime = Math.max(0, TIMING_CONFIG.minLoadTime - elapsedTime)
      
      setTimeout(() => {
        setState(prev => ({ ...prev, fadeOut: true }))
        
        setTimeout(() => {
          setState(prev => ({ ...prev, isLoading: false }))
        }, TIMING_CONFIG.fadeOutDuration)
      }, remainingTime)
    }

    if (document.readyState === 'complete') {
      handleLoadComplete()
    } else {
      const handleLoad = () => handleLoadComplete()
      window.addEventListener('load', handleLoad)
      return () => window.removeEventListener('load', handleLoad)
    }
  }, [TIMING_CONFIG.minLoadTime, TIMING_CONFIG.fadeOutDuration])

  // Destructuring del estado para mejor legibilidad
  const { isLoading, fadeOut, progress, currentWordIndex, isWordVisible } = state

  if (!isLoading) return null

  return (
    <div
      className={cn(
        "fixed inset-0 z-[9999] flex items-center justify-center",
        "bg-gradient-to-br from-white via-stone-50 to-stone-100",
        "dark:from-stone-950 dark:via-stone-900 dark:to-stone-800",
        "transition-all duration-800 ease-out",
        fadeOut && "opacity-0 pointer-events-none scale-105"
      )}
    >
      <div className="flex flex-col items-center justify-center gap-12 text-stone-800 dark:text-stone-200">
        
        {/* Logo Circular Elegante */}
        <div className="relative">
          {/* Anillo exterior con progreso */}
          <div className="relative h-32 w-32">
            {/* Fondo del anillo */}
            <div className="absolute inset-0 rounded-full border-2 border-stone-200 dark:border-stone-700" />
            
            {/* Progreso animado */}
            <svg className="absolute inset-0 h-32 w-32 -rotate-90 transform">
              <circle
                cx="64"
                cy="64" 
                r="62"
                stroke="currentColor"
                strokeWidth="2"
                fill="transparent"
                className="text-amber-400"
                strokeDasharray={`${2 * Math.PI * 62}`}
                strokeDashoffset={`${2 * Math.PI * 62 * (1 - progress / 100)}`}
                style={{
                  transition: 'stroke-dashoffset 0.3s cubic-bezier(0.4, 0, 0.2, 1)'
                }}
              />
            </svg>

            {/* Resplandor suave */}
            <div 
              className="absolute inset-0 rounded-full opacity-20"
              style={{
                background: `conic-gradient(from 0deg, transparent, rgba(251, 191, 36, 0.2), transparent)`,
                transform: `rotate(${progress * 3.6}deg)`,
                transition: 'transform 0.3s ease-out'
              }}
            />
            
            {/* Logo central */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="relative h-16 w-16 rounded-full bg-white dark:bg-stone-800 shadow-lg flex items-center justify-center">
                <Image
                  src="/icons/Logo_LG.svg"
                  alt="LG"
                  width={36}
                  height={36}
                  className="opacity-90"
                  priority
                />
              </div>
            </div>
          </div>

          {/* Puntos orbitales */}
          <div className="absolute inset-0 animate-spin" style={{ animationDuration: '8s' }}>
            <div className="absolute top-0 left-1/2 h-1.5 w-1.5 -translate-x-1/2 rounded-full bg-amber-400 opacity-60" />
            <div className="absolute bottom-0 left-1/2 h-1 w-1 -translate-x-1/2 rounded-full bg-stone-400 opacity-40" />
          </div>
        </div>

        {/* Palabras Rotativas */}
        <div className="text-center">
          <div 
            className={cn(
              "text-3xl font-light tracking-wide transition-all duration-300",
              "bg-gradient-to-r from-stone-900 via-amber-600 to-stone-900 bg-clip-text text-transparent",
              "dark:from-stone-100 dark:via-amber-400 dark:to-stone-100",
              isWordVisible ? "opacity-100 transform-none" : "opacity-0 -translate-y-2"
            )}
            style={{ 
              minHeight: '2.5rem',
              fontFamily: '"Inter", sans-serif'
            }}
          >
            {rotatingWords[currentWordIndex]}
          </div>
          
          {/* Línea decorativa */}
          <div className="mt-4 flex justify-center">
            <div 
              className="h-px bg-gradient-to-r from-transparent via-amber-400 to-transparent transition-all duration-1000"
              style={{ width: `${Math.min(progress, 80)}%` }}
            />
          </div>
        </div>

        {/* Indicador de Progreso Minimalista */}
        <div className="flex flex-col items-center gap-3">
          <div className="text-xs font-medium tracking-[0.15em] uppercase text-stone-500 dark:text-stone-500">
            Preparando experiencia
          </div>
          
          {/* Barra de progreso sutil */}
          <div className="w-48 h-px bg-stone-200 dark:bg-stone-700 rounded-full overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-amber-400 to-amber-500 transition-all duration-300 ease-out"
              style={{ width: `${progress}%` }}
            />
          </div>
          
          {/* Porcentaje */}
          <div className="text-xs text-stone-400 dark:text-stone-600 tabular-nums">
            {progress.toFixed(0)}%
          </div>
        </div>
      </div>
      
      {/* Partículas flotantes sutiles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-amber-400/20 rounded-full animate-pulse"
            style={{
              left: `${20 + i * 15}%`,
              top: `${30 + (i % 3) * 20}%`,
              animationDelay: `${i * 0.8}s`,
              animationDuration: '3s'
            }}
          />
        ))}
      </div>
      
      {/* Texto invisible para screen readers */}
      <span className="sr-only">Cargando página de Lesley García, {progress}% completado</span>
    </div>
  )
}