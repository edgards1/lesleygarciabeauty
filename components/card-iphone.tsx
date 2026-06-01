"use client"

import { useState, useRef, useEffect } from "react";
import Image from "next/image";

interface CardIphoneProps {
  src: string;
  alt: string;
  label: string;
  videoSrc?: string;
  priority?: boolean;
}

export function CardIphoneComponent({ 
  src, 
  alt, 
  label,
  videoSrc,
  priority = false 
}: CardIphoneProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [videoLoaded, setVideoLoaded] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const observerRef = useRef<IntersectionObserver | null>(null);

  // Lazy load del video cuando esté en el viewport
  useEffect(() => {
    if (!videoRef.current || !videoSrc) return;

    // Si tiene prioridad, carga inmediatamente
    if (priority) {
      setVideoLoaded(true);
      videoRef.current.load();
      return;
    }

    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && videoRef.current) {
            setVideoLoaded(true);
            videoRef.current.load();
            observerRef.current?.disconnect();
          }
        });
      },
      { rootMargin: "50px" }
    );

    observerRef.current.observe(videoRef.current);

    return () => observerRef.current?.disconnect();
  }, [videoSrc, priority]);

  const handleMouseEnter = async () => {
    setIsHovered(true);
    if (videoRef.current && videoLoaded) {
      try {
        videoRef.current.currentTime = 0;
        await videoRef.current.play();
      } catch (error) {
        console.log("Video autoplay prevented:", error);
      }
    }
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    if (videoRef.current) {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
    }
  };

  return (
    <div 
      className="group relative mx-auto w-full max-w-[240px] sm:max-w-[250px] lg:max-w-none"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div className="relative aspect-[9/16] rounded-[2.6rem] bg-stone-950 p-2.5 shadow-[0_18px_45px_-18px_rgba(0,0,0,0.45)] transition-transform duration-300 group-hover:-translate-y-2">
        <div className="relative h-full w-full overflow-hidden rounded-[2.1rem] bg-white ring-1 ring-black/10">
          {/* Imagen estática */}
          <Image
            src={src}
            alt={alt}
            fill
            sizes="(max-width: 640px) 80vw, (max-width: 1024px) 40vw, 22vw"
            className={`object-cover object-center transition-all duration-500 group-hover:scale-105 ${
              videoSrc && isHovered ? 'opacity-0' : 'opacity-100'
            }`}
            priority={priority}
            quality={85}
            placeholder="blur"
            blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mN8/5+hHgAHggJ/PchI7wAAAABJRU5ErkJggg=="
          />

          {/* Video (si existe) */}
          {videoSrc && (
            <video
              ref={videoRef}
              className={`absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-all duration-500 ${
                isHovered ? 'opacity-100' : 'opacity-0'
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
          )}

          {/* Overlay de fondo mejorado en hover */}
          <div className={`absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent transition-all duration-500 ${
            isHovered ? 'opacity-100' : 'opacity-80'
          }`} />

          {/* Label overlay */}
          <div className="absolute inset-x-0 bottom-0 p-4 text-left">
            <p className="text-[10px] uppercase tracking-[0.25em] text-white/75 mb-1">
              UGC / Makeup
            </p>
            <p className="text-sm font-semibold text-white leading-tight">
              {label}
            </p>
          </div>
        </div>

        {/* iPhone notch */}
        <div className="pointer-events-none absolute left-1/2 top-0 h-6 w-40 -translate-x-1/2 rounded-b-3xl bg-stone-950" />
      </div>
    </div>
  );
}