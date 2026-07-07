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

const categories = [
  "Todos",
  "Novias",
  "Piel Ebano",
  "Social",
]

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
    category: ["Social"],
    type: "image",
    hoverImage: "/img/social_04.webp",
  },
  {
    src: "/img/novia_2.webp",
    alt: "Maquillaje de Novia",
    category: ["Novias"],
    type: "image",
    hoverImage: "/img/novia_02.webp",
  },
  {
    src: "/img/novia_glam_01.webp",
    alt: "Maquillaje de Novia Glam",
    category: ["Novias"],
    type: "image",
    hoverImage: "/img/novia_glam_1.webp"
  },
  {
    src: "/img/social_3.webp",
    alt: "Maquillaje Social",
    category: ["Social"],
    type: "image",
    hoverImage: "/img/social_03.jpg",
  },
  {
    src: "/img/ebano_2.webp",
    alt: "Maquillaje de Piel Ebano",
    category: ["Piel Ebano"],
    type: "image",
    hoverImage: "/img/ebano_02.webp",
  }
]

/* ------------------------------------------------------------------ */
/*  PortfolioCard                                                      */
/* ------------------------------------------------------------------ */
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
      { rootMargin: "400px" }
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
      ? "snap-center flex-shrink-0 w-[280px] sm:w-[320px] md:w-[380px] lg:w-[420px]"
      : ""

  return (
    <div
      className={`group relative ${sizeClass}`}
      onMouseEnter={item.type === "video" ? handleVideoEnter : undefined}
      onMouseLeave={item.type === "video" ? handleVideoLeave : undefined}
    >
      {/* Outer shell — Double-Bezel */}
      <div className="p-[3px] rounded-[1.25rem] bg-black/[0.04] dark:bg-white/[0.06] ring-1 ring-black/[0.04] dark:ring-white/[0.06] transition-all duration-[700ms] ease-[cubic-bezier(0.32,0.72,0,1)] group-hover:ring-black/[0.10] dark:group-hover:ring-white/[0.14] group-hover:shadow-[0_8px_32px_-8px_rgba(0,0,0,0.12)] dark:group-hover:shadow-[0_8px_32px_-8px_rgba(0,0,0,0.4)]">
        {/* Inner core */}
        <div className="relative aspect-[3/4] rounded-[calc(1.25rem-3px)] overflow-hidden bg-stone-900 cursor-pointer">
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
                className="absolute inset-0 object-cover transition-transform duration-[700ms] ease-[cubic-bezier(0.32,0.72,0,1)] group-hover:scale-[1.04]"
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
                  className="absolute inset-0 object-cover transition-all duration-[700ms] ease-[cubic-bezier(0.32,0.72,0,1)] opacity-0 group-hover:opacity-100 group-hover:scale-[1.04]"
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
                  className={`absolute inset-0 object-cover transition-all duration-[700ms] ease-[cubic-bezier(0.32,0.72,0,1)] group-hover:scale-[1.04] ${
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

          {/* Hover gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/[0.02] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-[500ms] ease-[cubic-bezier(0.32,0.72,0,1)]" />

          {/* Play indicator */}
          {item.type === "video" && (
            <div
              className={`absolute inset-0 flex items-center justify-center transition-[opacity,transform] duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] ${
                isHovered ? "opacity-0 scale-[0.92]" : "opacity-100 scale-100"
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

          {/* Bottom info bar — visible on hover */}
          <div className="absolute bottom-0 left-0 right-0 p-4 z-10 opacity-0 group-hover:opacity-100 transition-[opacity,transform] duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] translate-y-2 group-hover:translate-y-0">
            <div className="flex items-end justify-between gap-3">
              <div className="min-w-0">
                <p className="text-[10px] uppercase tracking-[0.18em] text-white/60 mb-1 truncate">
                  {primaryCategory}
                </p>
                <p className="text-sm font-medium text-white truncate leading-tight">
                  {item.alt}
                </p>
              </div>
              <span className="text-[10px] font-medium text-white/30 tabular-nums flex-shrink-0">
                {String(index + 1).padStart(2, "0")}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

/* ------------------------------------------------------------------ */
/*  StatCounter                                                        */
/* ------------------------------------------------------------------ */
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
      className={`text-center transition-[opacity,transform] duration-[700ms] ease-[cubic-bezier(0.32,0.72,0,1)] ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
      }`}
    >
      <div className="text-4xl md:text-5xl font-serif text-stone-900 dark:text-stone-100 mb-2 tracking-tight">
        <span className="stat-number">0</span>
      </div>
      <div className="text-[9px] text-stone-400 dark:text-stone-500 uppercase tracking-[0.25em] font-medium">
        {label}
      </div>
    </div>
  )
}

/* ------------------------------------------------------------------ */
/*  FilterBar                                                          */
/* ------------------------------------------------------------------ */
function FilterBar({
  activeFilter,
  onSelect,
  className = "",
}: {
  activeFilter: string
  onSelect: (cat: string) => void
  className?: string
}) {
  return (
    <div className={`flex flex-wrap gap-2 ${className}`}>
      {categories.map((cat) => (
        <button
          key={cat}
          onClick={() => onSelect(cat)}
          className={`px-3.5 py-1.5 rounded-full text-[10px] font-medium uppercase tracking-[0.18em] transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] ${
            activeFilter === cat
              ? "bg-stone-900 dark:bg-stone-100 text-white dark:text-stone-900"
              : "bg-transparent text-stone-400 dark:text-stone-500 ring-1 ring-stone-200 dark:ring-stone-700 hover:ring-stone-400 dark:hover:ring-stone-500 hover:text-stone-600 dark:hover:text-stone-300"
          }`}
        >
          {cat}
        </button>
      ))}
    </div>
  )
}

/* ------------------------------------------------------------------ */
/*  PortfolioSection                                                   */
/* ------------------------------------------------------------------ */
export function PortfolioSection() {
  const [activeFilter, setActiveFilter] = useState("Todos")
  const sectionRef = useRef<HTMLElement>(null)
  const desktopHeadingRef = useRef<HTMLDivElement>(null)
  const mobileHeadingRef = useRef<HTMLDivElement>(null)
  const trackRef = useRef<HTMLDivElement>(null)
  const wrapRef = useRef<HTMLDivElement>(null)
  const galleryContainerRef = useRef<HTMLDivElement>(null)
  const progressBarRef = useRef<HTMLDivElement>(null)
  const mobileProgressRef = useRef<HTMLDivElement>(null)
  const currentNumRef = useRef<HTMLSpanElement>(null)
  const mobileNumRef = useRef<HTMLSpanElement>(null)
  const refreshTimer = useRef<ReturnType<typeof setTimeout>>(undefined)
  const totalItems = portfolioData.length

  const isFiltered = activeFilter !== "Todos"

  const filteredImages = useMemo(() => {
    if (activeFilter === "Todos") return portfolioData
    return portfolioData.filter((item) =>
      item.category.includes(activeFilter)
    )
  }, [activeFilter])

  /* ---- Heading word reveal ---- */
  useEffect(() => {
    const targets = [
      desktopHeadingRef.current,
      mobileHeadingRef.current,
    ].filter(Boolean) as HTMLDivElement[]

    const cleanups: (() => void)[] = []

    targets.forEach((el) => {
      const words = el.querySelectorAll(".hero-word")
      gsap.set(words, { opacity: 0, y: 40 })

      const observer = new IntersectionObserver(
        (entries) => {
          if (entries[0]?.isIntersecting) {
            gsap.to(words, {
              opacity: 1,
              y: 0,
              duration: 1,
              stagger: 0.08,
              ease: "power3.out",
            })
            observer.disconnect()
          }
        },
        { rootMargin: "100px" }
      )
      observer.observe(el)
      cleanups.push(() => observer.disconnect())
    })

    return () => cleanups.forEach((fn) => fn())
  }, [])

  /* ---- GSAP horizontal scroll (desktop) ---- */
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
          onUpdate: (self) => {
            const p = self.progress

            /* Progress bar */
            if (progressBarRef.current) {
              progressBarRef.current.style.transform = `scaleX(${p})`
            }

            /* Counter — direct DOM update, no React state */
            const idx = Math.min(Math.round(p * (totalItems - 1)), totalItems - 1)
            const display = String(idx + 1).padStart(2, "0")
            if (currentNumRef.current) {
              currentNumRef.current.textContent = display
            }
          },
        },
      })

      return () => tween.kill()
    },
    { scope: sectionRef, dependencies: [isFiltered] }
  )

  /* ---- Mobile scroll — sync counter via scroll event ---- */
  useEffect(() => {
    const container = galleryContainerRef.current
    if (!container) return

    const handleScroll = () => {
      if (window.innerWidth >= 1024) return

      const cards = container.querySelectorAll("[data-card]")
      if (!cards.length) return

      const center = container.scrollLeft + container.offsetWidth / 2
      let closest = 0
      let minDist = Infinity

      cards.forEach((card, i) => {
        const el = card as HTMLElement
        const cardCenter = el.offsetLeft + el.offsetWidth / 2
        const dist = Math.abs(center - cardCenter)
        if (dist < minDist) {
          minDist = dist
          closest = i
        }
      })

      const display = String(closest + 1).padStart(2, "0")
      if (mobileNumRef.current) {
        mobileNumRef.current.textContent = display
      }
      if (mobileProgressRef.current) {
        const p = (closest + 1) / totalItems
        mobileProgressRef.current.style.transform = `scaleX(${p})`
      }
    }

    container.addEventListener("scroll", handleScroll, { passive: true })
    return () => container.removeEventListener("scroll", handleScroll)
  }, [isFiltered])

  /* ---- Debounced ScrollTrigger refresh ---- */
  useEffect(() => {
    clearTimeout(refreshTimer.current)
    refreshTimer.current = setTimeout(() => ScrollTrigger.refresh(), 300)
    return () => clearTimeout(refreshTimer.current)
  }, [activeFilter])

  /* ---- Cleanup ---- */
  useEffect(() => {
    return () => {
      clearTimeout(refreshTimer.current)
      ScrollTrigger.getAll().forEach((t) => t.kill())
    }
  }, [])

  /* ---- Shared heading content ---- */
  const headingContent = (isMobile: boolean) => (
    <>
      <div className={`flex items-center gap-3 ${isMobile ? "justify-center" : ""}`}>
        <span className="h-px w-8 bg-stone-300 dark:bg-stone-700" />
        <span className="text-[10px] font-medium uppercase tracking-[0.25em] text-stone-400 dark:text-stone-500">
          Portafolio
        </span>
        {!isMobile && (
          <span className="h-px w-8 bg-stone-300 dark:bg-stone-700" />
        )}
      </div>

      {isMobile ? (
        <h2 className="text-4xl md:text-5xl font-serif text-stone-900 dark:text-stone-100 leading-[1.05] tracking-[-0.02em]">
          <span className="hero-word inline-block mr-3">Trabajo</span>
          <span className="hero-word inline-block mr-3">que</span>
          <span className="hero-word inline-block">habla</span>
          <br />
          <span className="hero-word inline-block mr-3 italic">por</span>
          <span className="hero-word inline-block mr-3 italic">sí</span>
          <span className="hero-word inline-block italic">solo</span>
        </h2>
      ) : (
        <h2 className="text-[clamp(2.5rem,4vw,3.5rem)] font-serif text-stone-900 dark:text-stone-100 leading-[1.05] tracking-[-0.02em]">
          <span className="hero-word block">Trabajo</span>
          <span className="hero-word block italic text-stone-400 dark:text-stone-500">
            que habla
          </span>
          <span className="hero-word block">por sí</span>
          <span className="hero-word block italic text-stone-400 dark:text-stone-500">
            solo
          </span>
        </h2>
      )}

      <p className={`text-sm text-stone-500 dark:text-stone-400 leading-relaxed ${isMobile ? "max-w-sm mx-auto" : "max-w-[260px]"}`}>
        Maquillaje profesional y personalizado para novias, piel ebano, eventos especiales y ocasiones sociales. Cada proyecto es una obra de arte única que refleja la belleza individual de cada cliente.
      </p>

      <FilterBar
        activeFilter={activeFilter}
        onSelect={setActiveFilter}
        className={isMobile ? "justify-center" : ""}
      />
    </>
  )

  return (
    <section
      ref={sectionRef}
      id="portfolio"
      className="bg-white dark:bg-stone-900 transition-colors"
    >
      {/* ============================================================ */}
      {/*  HORIZONTAL SCROLL VIEW — always mounted, hidden when filtered */}
      {/* ============================================================ */}
      <div
        ref={wrapRef}
        className={`overflow-x-clip will-change-transform ${
          isFiltered ? "hidden" : ""
        }`}
      >
        <div className="flex">
          {/* ---- Desktop sidebar ---- */}
          <div
            ref={desktopHeadingRef}
            className="hidden lg:flex flex-col justify-center w-[320px] xl:w-[380px] flex-shrink-0 sticky top-0 h-screen px-10 xl:px-14"
          >
            <div className="space-y-8">
              {headingContent(false)}

              {/* Progress bar + counter */}
              <div className="flex items-center gap-3 pt-2">
                <span
                  ref={currentNumRef}
                  className="text-[10px] font-medium text-stone-900 dark:text-stone-100 tabular-nums w-5"
                >
                  01
                </span>
                <div className="h-px flex-1 bg-stone-200 dark:bg-stone-700 relative overflow-hidden rounded-full">
                  <div
                    ref={progressBarRef}
                    className="absolute inset-0 bg-stone-900 dark:bg-stone-100 origin-left will-change-transform"
                  />
                </div>
                <span className="text-[10px] font-medium text-stone-400 dark:text-stone-500 tabular-nums w-5 text-right">
                  {String(totalItems).padStart(2, "0")}
                </span>
              </div>
            </div>
          </div>

          {/* ---- Right side — gallery ---- */}
          <div className="flex-1 min-w-0">
            {/* Mobile heading */}
            <div
              ref={mobileHeadingRef}
              className="lg:hidden px-4 md:px-8 pt-16 pb-6"
            >
              <div className="text-center space-y-5">
                {headingContent(true)}
              </div>
            </div>

            {/* Mobile progress bar + counter */}
            <div className="lg:hidden px-4 md:px-8 pb-4">
              <div className="flex items-center gap-3">
                <span
                  ref={mobileNumRef}
                  className="text-[10px] font-medium text-stone-900 dark:text-stone-100 tabular-nums w-5"
                >
                  01
                </span>
                <div className="h-px flex-1 bg-stone-200 dark:bg-stone-700 relative overflow-hidden rounded-full">
                  <div
                    ref={mobileProgressRef}
                    className="absolute inset-0 bg-stone-900 dark:bg-stone-100 origin-left will-change-transform transition-transform duration-150 ease-out"
                  />
                </div>
                <span className="text-[10px] font-medium text-stone-400 dark:text-stone-500 tabular-nums w-5 text-right">
                  {String(totalItems).padStart(2, "0")}
                </span>
              </div>
            </div>

            {/* Gallery container */}
            <div
              ref={galleryContainerRef}
              className="relative px-4 md:px-8 lg:px-12 py-4 lg:py-0 lg:h-screen lg:flex lg:items-center overflow-x-auto overflow-y-hidden snap-x snap-mandatory scrollbar-hide"
            >
              {/* Edge fade — left */}
              <div className="absolute left-0 top-0 bottom-0 w-6 md:w-10 bg-gradient-to-r from-white dark:from-stone-900 to-transparent z-10 pointer-events-none" />
              {/* Edge fade — right */}
              <div className="absolute right-0 top-0 bottom-0 w-6 md:w-10 bg-gradient-to-l from-white dark:from-stone-900 to-transparent z-10 pointer-events-none" />

              <div
                ref={trackRef}
                className="flex gap-5 md:gap-6 lg:gap-8 will-change-transform"
              >
                {/* Left spacer */}
                <div className="flex-shrink-0 w-0 lg:w-4" aria-hidden="true" />

                {portfolioData.map((item, i) => (
                  <div key={item.src} data-card>
                    <PortfolioCard item={item} index={i} />
                  </div>
                ))}

                {/* Right trailing spacer — must be wide enough for last card to scroll fully into view */}
                <div className="flex-shrink-0 w-16 md:w-40 lg:w-[28vw]" aria-hidden="true" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ============================================================ */}
      {/*  FILTERED GRID VIEW — always mounted, hidden when not filtered */}
      {/* ============================================================ */}
      <div className={`${isFiltered ? "" : "hidden"} py-32 md:py-40`}>
        <div className="container mx-auto px-4 md:px-8">
          <div className="text-center space-y-5 mb-20 md:mb-28">
            <div className="flex items-center justify-center gap-3">
              <span className="h-px w-8 bg-stone-300 dark:bg-stone-700" />
              <span className="text-[10px] font-medium uppercase tracking-[0.25em] text-stone-400 dark:text-stone-500">
                Portafolio
              </span>
              <span className="h-px w-8 bg-stone-300 dark:bg-stone-700" />
            </div>

            <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif text-stone-900 dark:text-stone-100 leading-[1.05] tracking-[-0.02em]">
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

            <FilterBar
              activeFilter={activeFilter}
              onSelect={setActiveFilter}
              className="justify-center"
            />
          </div>

          <div className="portfolio-filtered-grid mb-20 md:mb-28">
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
      </div>

      {/* ============================================================ */}
      {/*  STATS                                                        */}
      {/* ============================================================ */}
      <div className="py-24 md:py-32 border-t border-stone-100 dark:border-stone-800">
        <div className="container mx-auto px-4 md:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8">
            <StatCounter number="500+" label="Clientes Satisfechas" delay={0} />
            <StatCounter number="5+" label="Anos de Experiencia" delay={100} />
            <StatCounter number="40+" label="Novias Maquilladas" delay={200} />
          </div>
        </div>
      </div>
    </section>
  )
}
