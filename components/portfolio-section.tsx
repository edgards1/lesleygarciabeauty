"use client"

import { useRef, useEffect, useState, useMemo, useCallback } from "react"
import Image from "next/image"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { useGSAP } from "@gsap/react"

gsap.registerPlugin(ScrollTrigger)

interface PortfolioItem {
  src: string
  alt: string
  category: string[]
  type: "image" | "video"
  hoverImage?: string
  previewImage?: string
  videoSrc?: string
}

const portfolioData: PortfolioItem[] = [
  {
    src: "/img/novia_01.webp",
    alt: "Maquillaje de Novia",
    category: ["Novias", "Evento Especial"],
    type: "image",
    hoverImage: "/img/novia_1.webp",
  },
  {
    src: "/img/video_ebano_1.mov",
    alt: "Maquillaje de piel ebano",
    category: ["Piel Ebano"],
    type: "video",
    previewImage: "/img/ebano_1.webp",
    videoSrc: "/img/video_ebano_1.mov",
  },
  {
    src: "/img/social_4.webp",
    alt: "Maquillaje Social",
    category: ["Social", "Evento Especial"],
    type: "image",
    hoverImage: "/img/social_04.webp",
  },
  {
    src: "/img/novia_02.webp",
    alt: "Maquillaje editorial",
    category: ["Novias"],
    type: "image",
    hoverImage: "/img/novia_2.webp",
  },
  {
    src: "/img/video_novia_glam.MOV",
    alt: "Maquillaje para evento social",
    category: ["Novias"],
    type: "video",
    previewImage: "/img/social_6.webp",
    videoSrc: "/img/video_novia_glam.MOV",
  },
  {
    src: "/img/social_3.webp",
    alt: "Maquillaje Social",
    category: ["Social"],
    type: "image",
    hoverImage: "/img/social_03.jpg",
  },
]

function PortfolioCard({
  item,
  index,
  variant = "horizontal",
}: {
  item: PortfolioItem
  index: number
  variant?: "horizontal" | "grid"
}) {
  const [isHovered, setIsHovered] = useState(false)
  const [videoLoaded, setVideoLoaded] = useState(false)
  const videoRef = useRef<HTMLVideoElement>(null)

  const primaryCategory = item.category[0]

  useEffect(() => {
    if (!videoRef.current || item.type !== "video") return

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting && videoRef.current) {
          setVideoLoaded(true)
          videoRef.current.load()
          observer.disconnect()
        }
      },
      { rootMargin: "200px" }
    )

    observer.observe(videoRef.current)
    return () => observer.disconnect()
  }, [item.type])

  const handleVideoEnter = useCallback(async () => {
    setIsHovered(true)
    if (videoRef.current && videoLoaded) {
      try {
        videoRef.current.currentTime = 0
        await videoRef.current.play()
      } catch {}
    }
  }, [videoLoaded])

  const handleVideoLeave = useCallback(() => {
    setIsHovered(false)
    if (videoRef.current) {
      videoRef.current.pause()
      videoRef.current.currentTime = 0
    }
  }, [])

  const sizeClass =
    variant === "horizontal"
      ? "flex-shrink-0 w-[280px] sm:w-[320px] md:w-[380px] lg:w-[420px]"
      : ""

  return (
    <div
      className={`group relative rounded-2xl overflow-hidden cursor-pointer ${sizeClass}`}
      onMouseEnter={item.type === "video" ? handleVideoEnter : undefined}
      onMouseLeave={item.type === "video" ? handleVideoLeave : undefined}
    >
      <div className="relative aspect-[4/5] overflow-hidden bg-stone-900">
        {/* Image */}
        {item.type === "image" && (
          <>
            <Image
              src={item.src}
              alt={item.alt}
              fill
              sizes={
                variant === "horizontal"
                  ? "420px"
                  : "(max-width: 640px) 50vw, 25vw"
              }
              priority={index < 2}
              quality={80}
              className="absolute inset-0 object-cover transition-transform duration-700 ease-out group-hover:scale-105"
            />
            {item.hoverImage && (
              <Image
                src={item.hoverImage}
                alt={item.alt}
                fill
                sizes={
                  variant === "horizontal"
                    ? "420px"
                    : "(max-width: 640px) 50vw, 25vw"
                }
                quality={80}
                className={`absolute inset-0 object-cover transition-opacity duration-700 ease-out group-hover:scale-105 opacity-0 group-hover:opacity-100${item.hoverImage === "/img/novia_2.webp" || item.hoverImage === "/img/social_04.webp" ? " group-hover:object-[center_30%]" : ""}`}
              />
            )}
          </>
        )}

        {/* Video */}
        {item.type === "video" && (
          <>
            {item.previewImage && (
              <Image
                src={item.previewImage}
                alt={item.alt}
                fill
                sizes={
                  variant === "horizontal"
                    ? "420px"
                    : "(max-width: 640px) 50vw, 25vw"
                }
                priority={index < 2}
                quality={80}
                className={`absolute inset-0 object-cover transition-opacity duration-700 ease-out group-hover:scale-105 ${
                  isHovered ? "opacity-0" : "opacity-100"
                }`}
              />
            )}
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
              {videoLoaded && item.videoSrc && (
                <>
                  <source src={item.videoSrc} type="video/mp4" />
                  <source src={item.videoSrc} type="video/quicktime" />
                </>
              )}
            </video>
          </>
        )}

        {/* Hover overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

        {/* Play indicator */}
        {item.type === "video" && (
          <div
            className={`absolute inset-0 flex items-center justify-center transition-[opacity,transform] duration-500 ${
              isHovered ? "opacity-0 scale-90" : "opacity-100 scale-100"
            }`}
          >
            <div className="w-14 h-14 rounded-full bg-white/10 backdrop-blur-md ring-1 ring-white/25 flex items-center justify-center">
              <svg
                className="w-4 h-4 text-white ml-0.5"
                viewBox="0 0 12 14"
                fill="currentColor"
              >
                <path d="M0 0L12 7L0 14V0Z" />
              </svg>
            </div>
          </div>
        )}

        {/* Category */}
        <div className="absolute bottom-4 left-4 z-10 opacity-0 group-hover:opacity-100 transition-[opacity,transform] duration-500 translate-y-2 group-hover:translate-y-0">
          <span className="inline-flex items-center px-3 py-1.5 rounded-full bg-white/15 backdrop-blur-md text-[9px] font-medium uppercase tracking-[0.18em] text-white ring-1 ring-white/20">
            {primaryCategory}
          </span>
        </div>

        {/* Index */}
        <div className="absolute top-4 right-4 z-10">
          <span className="text-[10px] font-medium text-white/40 tabular-nums">
            {String(index + 1).padStart(2, "0")}
          </span>
        </div>
      </div>
    </div>
  )
}

function StatCounter({
  number,
  label,
  delay,
}: {
  number: string
  label: string
  delay: number
}) {
  const ref = useRef<HTMLDivElement>(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    if (!ref.current) return

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting) {
          setTimeout(() => setIsVisible(true), delay)
          observer.disconnect()
        }
      },
      { rootMargin: "100px" }
    )

    observer.observe(ref.current)
    return () => observer.disconnect()
  }, [delay])

  useEffect(() => {
    if (!isVisible || !ref.current) return

    const numEl = ref.current.querySelector(".stat-number")
    if (!numEl) return

    const numericPart = parseInt(number.replace(/[^0-9]/g, ""))
    const suffix = number.replace(/[0-9]/g, "")
    const obj = { val: 0 }

    gsap.to(obj, {
      val: numericPart,
      duration: 1.5,
      ease: "power2.out",
      onUpdate: () => {
        numEl.textContent = Math.round(obj.val) + suffix
      },
    })
  }, [isVisible, number])

  return (
    <div
      ref={ref}
      className={`text-center transition-[opacity,transform] duration-700 ease-out ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
      }`}
    >
      <div className="text-3xl font-serif text-stone-900 dark:text-stone-100 mb-1">
        <span className="stat-number">0</span>
      </div>
      <div className="text-[10px] text-stone-500 dark:text-stone-400 uppercase tracking-[0.2em] font-medium">
        {label}
      </div>
    </div>
  )
}

export function PortfolioSection() {
  const [activeFilter, setActiveFilter] = useState("Todos")
  const sectionRef = useRef<HTMLElement>(null)
  const headingRef = useRef<HTMLDivElement>(null)
  const trackRef = useRef<HTMLDivElement>(null)
  const wrapRef = useRef<HTMLDivElement>(null)
  const refreshTimer = useRef<ReturnType<typeof setTimeout>>(undefined)

  const isFiltered = activeFilter !== "Todos"

  const filteredImages = useMemo(() => {
    if (activeFilter === "Todos") return portfolioData
    return portfolioData.filter((item) =>
      item.category.includes(activeFilter)
    )
  }, [activeFilter])

  // Heading word reveal — runs once on mount
  useEffect(() => {
    const el = headingRef.current
    if (!el) return

    const words = el.querySelectorAll(".hero-word")
    gsap.set(words, { opacity: 0, y: 30 })

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting) {
          gsap.to(words, {
            opacity: 1,
            y: 0,
            duration: 0.8,
            stagger: 0.1,
            ease: "power3.out",
          })
          observer.disconnect()
        }
      },
      { rootMargin: "100px" }
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  // GSAP horizontal scroll — desktop only
  useGSAP(
    () => {
      if (isFiltered || !trackRef.current || !wrapRef.current || window.innerWidth < 1024) return

      const track = trackRef.current
      const wrap = wrapRef.current

      const totalScroll = track.scrollWidth - wrap.offsetWidth
      if (totalScroll <= 0) return

      const tween = gsap.to(track, {
        x: -totalScroll,
        ease: "none",
        scrollTrigger: {
          trigger: wrap,
          start: "top top",
          end: () => `+=${totalScroll}`,
          pin: true,
          pinSpacing: true,
          anticipatePin: 1,
          scrub: 1,
          invalidateOnRefresh: true,
        },
      })

      return () => tween.kill()
    },
    { scope: sectionRef, dependencies: [isFiltered] }
  )

  // Debounced ScrollTrigger refresh on filter change
  useEffect(() => {
    clearTimeout(refreshTimer.current)
    refreshTimer.current = setTimeout(() => ScrollTrigger.refresh(), 300)
    return () => clearTimeout(refreshTimer.current)
  }, [activeFilter])

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      clearTimeout(refreshTimer.current)
      ScrollTrigger.getAll().forEach((t) => t.kill())
    }
  }, [])

  const heading = (
    <div
      ref={headingRef}
      className="bg-white dark:bg-stone-900 pt-12 pb-8 md:pt-12 md:pb-12"
    >
      <div className="container mx-auto px-4 md:px-8">
        <div className="text-center space-y-5">
          <div className="flex items-center justify-center gap-3">
            <span className="h-px w-8 bg-stone-300 dark:bg-stone-700" />
            <span className="text-[10px] font-medium uppercase tracking-[0.25em] text-stone-400 dark:text-stone-500">
              Portafolio
            </span>
            <span className="h-px w-8 bg-stone-300 dark:bg-stone-700" />
          </div>

          <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif text-stone-900 dark:text-stone-100 leading-[1.05] tracking-tight">
            <span className="hero-word inline-block mr-3 md:mr-4 lg:mr-5">
              Trabajo
            </span>
            <span className="hero-word inline-block mr-3 md:mr-4 lg:mr-5">
              que
            </span>
            <span className="hero-word inline-block">habla</span>
            <br />
            <span className="hero-word inline-block mr-3 md:mr-4 lg:mr-5 italic">
              por
            </span>
            <span className="hero-word inline-block mr-3 md:mr-4 lg:mr-5 italic">
              sí
            </span>
            <span className="hero-word inline-block italic">solo</span>
          </h2>
        </div>
      </div>
    </div>
  )

  return (
    <section
      ref={sectionRef}
      id="portfolio"
      className="py-6 md:py-6 bg-white dark:bg-stone-900 transition-colors"
    >
      {heading}

      {/* ---- HORIZONTAL SCROLL VIEW ---- */}
      {!isFiltered && (
        <div ref={wrapRef} className="overflow-x-clip will-change-transform">
          <div
            ref={trackRef}
            className="flex gap-5 md:gap-6 pl-4 md:pl-8 lg:pl-[max(2rem,calc((100vw-80rem)/2+2rem))] pr-8 py-4"
          >
            {portfolioData.map((item, i) => (
              <PortfolioCard key={item.src} item={item} index={i} />
            ))}
            <div className="flex-shrink-0 w-[30vw] md:w-[20vw]" aria-hidden="true" />
          </div>
        </div>
      )}

      {/* ---- FILTERED GRID VIEW ---- */}
      {isFiltered && (
        <div className="container mx-auto px-4 md:px-8">
          <div className="portfolio-filtered-grid mb-16 md:mb-20">
            {filteredImages.map((item, i) => (
              <PortfolioCard
                key={`${item.src}-${activeFilter}`}
                item={item}
                index={i}
                variant="grid"
              />
            ))}
          </div>
        </div>
      )}

      {/* ---- STATS ---- */}
      <div className="container mx-auto px-4 md:px-8 pb-12 md:pb-20">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-16 border-t border-stone-100 dark:border-stone-800">
          <StatCounter number="500+" label="Clientes Satisfechas" delay={0} />
          <StatCounter number="5+" label="Anos de Experiencia" delay={100} />
          <StatCounter number="40+" label="Novias Maquilladas" delay={200} />
        </div>
      </div>
    </section>
  )
}
