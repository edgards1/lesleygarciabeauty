"use client"

import { useState, useRef, useEffect } from "react"
import Image from "next/image"

interface VideoPreviewProps {
  videoSrc: string
  previewImage?: string
  alt: string
  className?: string
  category: string | string[]
  priority?: boolean
}

const smoothTransition = "all 800ms cubic-bezier(0.32,0.72,0,1)"
const shellTransition = "all 700ms cubic-bezier(0.32,0.72,0,1)"
const pillTransition = "all 500ms cubic-bezier(0.32,0.72,0,1)"

export function VideoPreview({
  videoSrc,
  previewImage,
  alt,
  className = "",
  category,
  priority = false,
}: VideoPreviewProps) {
  const [isHovered, setIsHovered] = useState(false)
  const [videoLoaded, setVideoLoaded] = useState(false)
  const videoRef = useRef<HTMLVideoElement>(null)
  const observerRef = useRef<IntersectionObserver | null>(null)

  const primaryCategory = Array.isArray(category) ? category[0] : category

  useEffect(() => {
    if (!videoRef.current) return

    if (priority) {
      setVideoLoaded(true)
      videoRef.current.load()
      return
    }

    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && videoRef.current) {
            setVideoLoaded(true)
            videoRef.current.load()
            observerRef.current?.disconnect()
          }
        })
      },
      { rootMargin: "200px" }
    )

    observerRef.current.observe(videoRef.current)
    return () => observerRef.current?.disconnect()
  }, [priority])

  const handleMouseEnter = async () => {
    setIsHovered(true)
    if (videoRef.current && videoLoaded) {
      try {
        videoRef.current.currentTime = 0
        await videoRef.current.play()
      } catch {
        // autoplay prevented
      }
    }
  }

  const handleMouseLeave = () => {
    setIsHovered(false)
    if (videoRef.current) {
      videoRef.current.pause()
      videoRef.current.currentTime = 0
    }
  }

  return (
    <div
      className={`group relative p-[3px] rounded-[1.25rem] bg-stone-100/80 dark:bg-stone-800/50 ring-1 ring-stone-200/60 dark:ring-stone-700/40 hover:ring-stone-300 dark:hover:ring-stone-600 ${className}`}
      style={{ transition: shellTransition }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div className="relative aspect-[3/4] rounded-[calc(1.25rem-3px)] overflow-hidden bg-stone-200 dark:bg-stone-800">
        {/* Preview image */}
        {previewImage && (
          <Image
            src={previewImage}
            alt={alt}
            fill
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
            priority={priority}
            quality={80}
            className={`absolute inset-0 object-cover group-hover:scale-[1.04] ${
              isHovered ? "opacity-0" : "opacity-100"
            }`}
            style={{ transition: smoothTransition }}
          />
        )}

        {/* Video */}
        <video
          ref={videoRef}
          className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-500 ${
            isHovered ? "opacity-100" : "opacity-0"
          }`}
          muted
          loop
          playsInline
          preload="none"
        >
          {videoLoaded && (
            <>
              <source src={videoSrc} type="video/mp4" />
              <source src={videoSrc} type="video/quicktime" />
            </>
          )}
        </video>

        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

        {/* Play indicator */}
        <div
          className={`absolute inset-0 flex items-center justify-center ${
            isHovered ? "opacity-0 scale-90" : "opacity-100 scale-100"
          }`}
          style={{ transition: pillTransition }}
        >
          <div className="w-12 h-12 rounded-full bg-white/10 backdrop-blur-md ring-1 ring-white/25 flex items-center justify-center">
            <svg
              className="w-3.5 h-3.5 text-white ml-0.5"
              viewBox="0 0 12 14"
              fill="currentColor"
            >
              <path d="M0 0L12 7L0 14V0Z" />
            </svg>
          </div>
        </div>

        {/* Category pill */}
        <div
          className="absolute bottom-3 left-3 z-10 opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0"
          style={{ transition: pillTransition }}
        >
          <span className="inline-flex items-center px-2.5 py-1 rounded-full bg-white/15 backdrop-blur-md text-[9px] font-medium uppercase tracking-[0.18em] text-white ring-1 ring-white/20">
            {primaryCategory}
          </span>
        </div>
      </div>
    </div>
  )
}
