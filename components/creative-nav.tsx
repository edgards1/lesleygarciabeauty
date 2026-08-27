"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import gsap from "gsap";
import { getLenis } from "@/components/lenis-smooth";
import Logo from "@/public/icons/Logo_LG.svg";

const NAV_ITEMS = [
  { id: "hero", label: "Inicio", href: "#hero" },
  { id: "what", label: "Qué Hacemos", href: "#what" },
  { id: "projects", label: "Proyectos", href: "#projects" },
  { id: "experience", label: "Experiencia", href: "#experience" },
  { id: "testimonials", label: "Testimonios", href: "#testimonials" },
  { id: "news", label: "Novedades & Tips", href: "#news" },
  { id: "contact", label: "Contacto", href: "#contact" },
];

export function CreativeNav() {
  const [isOpen, setIsOpen] = useState(false);
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);
  const navWrapRef = useRef<HTMLDivElement>(null);
  const logoSubtextRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  // Scroll effect on logo text (characters fade and slide out on scroll)
  useEffect(() => {
    let isHidden = false;
    const subtext = logoSubtextRef.current;
    if (!subtext) return;

    const handleScroll = () => {
      const scrollY = window.scrollY;
      if (scrollY >= 60 && !isHidden) {
        isHidden = true;
        gsap.to(subtext, {
          opacity: 0,
          x: -18,
          duration: 0.6,
          ease: "power3.out",
        });
      } else if (scrollY < 60 && isHidden) {
        isHidden = false;
        gsap.to(subtext, {
          opacity: 1,
          x: 0,
          duration: 0.6,
          ease: "power3.out",
        });
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Menu Open / Close Timeline
  useEffect(() => {
    const nav = navWrapRef.current;
    if (!nav) return;

    const bgPanels = nav.querySelectorAll(".bg-panel");
    const menuInner = nav.querySelector(".menu-inner");
    const menuLinks = nav.querySelectorAll(".menu-link-text");
    const fadeTargets = nav.querySelectorAll("[data-menu-fade]");

    const lenis = getLenis();

    if (isOpen) {
      if (lenis) lenis.stop();
      document.body.style.overflow = "hidden";

      gsap.killTweensOf([nav, bgPanels, menuInner, menuLinks, fadeTargets]);

      const tl = gsap.timeline({ defaults: { ease: "power4.inOut" } });

      tl.set(nav, { display: "block" })
        .fromTo(
          bgPanels,
          { yPercent: -101 },
          { yPercent: 0, stagger: 0.1, duration: 0.75 }
        )
        .fromTo(
          menuInner,
          { opacity: 0, y: 30 },
          { opacity: 1, y: 0, duration: 0.6 },
          "-=0.4"
        )
        .fromTo(
          menuLinks,
          { yPercent: 120, opacity: 0 },
          {
            yPercent: 0,
            opacity: 1,
            stagger: 0.05,
            duration: 0.75,
            ease: "power3.out",
          },
          "-=0.3"
        )
        .fromTo(
          fadeTargets,
          { opacity: 0, y: 15 },
          { opacity: 1, y: 0, stagger: 0.04, duration: 0.5 },
          "-=0.4"
        );
    } else {
      if (lenis) lenis.start();
      document.body.style.overflow = "";

      const tl = gsap.timeline({
        defaults: { ease: "power4.inOut" },
        onComplete: () => {
          gsap.set(nav, { display: "none" });
          if (videoRef.current) {
            videoRef.current.pause();
            setIsVideoPlaying(false);
          }
        },
      });

      tl.to(menuLinks, { yPercent: -80, opacity: 0, duration: 0.35, stagger: 0.02 })
        .to(bgPanels, { yPercent: -101, stagger: 0.06, duration: 0.65 }, "-=0.2");
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    setIsOpen(false);

    const el = document.getElementById(id);
    if (!el) return;

    setTimeout(() => {
      const top = el.getBoundingClientRect().top + window.scrollY - 30;
      const lenis = getLenis();
      if (lenis) {
        lenis.scrollTo(top, { duration: 1.3 });
      } else {
        window.scrollTo({ top, behavior: "smooth" });
      }
    }, 450);
  };

  const toggleVideo = () => {
    if (!videoRef.current) return;
    if (videoRef.current.paused) {
      videoRef.current.play();
      setIsVideoPlaying(true);
    } else {
      videoRef.current.pause();
      setIsVideoPlaying(false);
    }
  };

  return (
    <>
      {/* Top Floating Bar */}
      <header className="fixed top-0 left-0 right-0 z-50 px-5 pt-6 sm:px-8 lg:px-12 pointer-events-none">
        <div className="flex items-center justify-between mx-auto max-w-[1700px]">
          {/* Logo brand lockup */}
          <Link
            href="/"
            className="flex items-center gap-3.5 pointer-events-auto group"
            data-cursor="Lesley García"
          >
            <div className="relative h-9 w-9 overflow-hidden rounded-full border border-ink-black/20 bg-white shadow-sm transition-transform duration-500 group-hover:scale-105">
              <img
                src={Logo.src}
                alt="Lesley Garcia"
                className="h-full w-full object-cover"
              />
            </div>
            <div className="flex flex-col text-left">
              <span className="font-display text-[13px] font-medium uppercase tracking-[0.14em] text-ink-black mix-blend-difference invert dark:invert-0">
                Lesley García
              </span>
              <span
                ref={logoSubtextRef}
                className="hidden sm:inline-block font-label text-[10px] uppercase tracking-[0.22em] text-graphite/90"
              >
                Belleza editorial // Contenido UGC
              </span>
            </div>
          </Link>

          {/* Toggle Menu Button */}
          <button
            type="button"
            onClick={() => setIsOpen(!isOpen)}
            aria-expanded={isOpen}
            aria-label={isOpen ? "Cerrar menú" : "Abrir menú"}
            className="pointer-events-auto relative group flex items-center justify-center gap-3 h-12 px-7 rounded-full bg-[#0d0f12] text-[#fffef7] shadow-lg transition-transform duration-300 hover:scale-[1.03] active:scale-95 border border-white/10"
            data-cursor={isOpen ? "Cerrar" : "Explorar"}
          >
            <div className="relative h-4 overflow-hidden w-14 text-center">
              <p
                className={`font-label text-xs uppercase tracking-[0.2em] font-medium transition-transform duration-500 ${
                  isOpen ? "-translate-y-full" : "translate-y-0"
                }`}
              >
                Menú
              </p>
              <p
                className={`font-label text-xs uppercase tracking-[0.2em] font-medium transition-transform duration-500 absolute top-0 left-0 w-full ${
                  isOpen ? "translate-y-0" : "translate-y-full"
                }`}
              >
                Cerrar
              </p>
            </div>

            {/* Rotating cross/plus icon */}
            <span
              className={`inline-block transition-transform duration-500 ease-out ${
                isOpen ? "rotate-[135deg]" : "rotate-0"
              }`}
            >
              <svg
                width="12"
                height="12"
                viewBox="0 0 12 12"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M6 0V12M0 6H12"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                />
              </svg>
            </span>
          </button>
        </div>
      </header>

      {/* Full-Screen Cascading 3-Panel Overlay */}
      <div
        ref={navWrapRef}
        className="fixed inset-0 z-40 hidden overflow-hidden pointer-events-auto"
        aria-hidden={!isOpen}
      >
        {/* Layered cascading panels */}
        <div className="absolute inset-0 flex flex-col pointer-events-none">
          <div className="bg-panel flex-1 bg-[#14171a]" />
          <div className="bg-panel flex-1 bg-[#0f1114]" />
          <div className="bg-panel flex-1 bg-[#090a0c]" />
        </div>

        {/* Inner Menu Content */}
        <div className="menu-inner relative z-10 flex h-full flex-col justify-between px-6 py-28 sm:px-10 sm:py-32 lg:px-20 text-[#fffef7] overflow-y-auto">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-16 items-start my-auto">
            {/* Left Col — Metadata & Quick Details */}
            <div className="lg:col-span-3 space-y-8 hidden md:block">
              <div data-menu-fade className="space-y-2">
                <p className="font-label text-[10px] uppercase tracking-[0.3em] text-white/40">
                  Estudio &amp; Locación
                </p>
                <p className="font-display text-sm tracking-wide text-white/90">
                  Guayaquil, Ecuador
                </p>
                <p className="text-xs text-white/50 leading-relaxed font-body">
                  Atención en estudio privado &amp; servicios a domicilio para bodas y marcas.
                </p>
              </div>

              <div data-menu-fade className="space-y-2 pt-4 border-t border-white/10">
                <p className="font-label text-[10px] uppercase tracking-[0.3em] text-white/40">
                  Contacto Directo
                </p>
                <a
                  href="https://api.whatsapp.com/send?phone=593983366831"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block font-display text-sm text-white/90 underline-link"
                >
                  +593 98 336 6831
                </a>
                <a
                  href="mailto:lesleygarciabeauty@gmail.com"
                  className="block font-display text-xs text-white/60 hover:text-white"
                >
                  lesleygarciabeauty@gmail.com
                </a>
              </div>
            </div>

            {/* Center Col — Monumental Navigation Items */}
            <nav className="lg:col-span-5 flex flex-col gap-2 menu-list group/list">
              {NAV_ITEMS.map((item, idx) => (
                <div key={item.id} className="overflow-hidden">
                  <a
                    href={item.href}
                    onClick={(e) => handleLinkClick(e, item.id)}
                    className="menu-link group flex items-baseline gap-6 py-2 transition-opacity duration-300 hover:!opacity-100 group-hover/list:opacity-40"
                    data-cursor="Ir a sección"
                  >
                    <span className="font-label text-[11px] uppercase tracking-[0.25em] text-white/35 tabular-nums">
                      0{idx + 1}
                    </span>
                    <span className="menu-link-text inline-block font-display text-[clamp(2.2rem,5vw,4.4rem)] font-light leading-[1.0] tracking-[-0.03em] text-white transition-transform duration-500 group-hover:translate-x-3">
                      {item.label}
                    </span>
                  </a>
                </div>
              ))}
            </nav>

            {/* Right Col — Mini Video Reel Player Showcase */}
            <div className="lg:col-span-4 hidden lg:flex flex-col gap-4">
              <p data-menu-fade className="font-label text-[10px] uppercase tracking-[0.3em] text-white/40">
                Showreel Destacado
              </p>
              <div
                data-menu-fade
                className="relative aspect-[16/10] overflow-hidden rounded-xl border border-white/10 bg-white/5 group cursor-pointer"
                onClick={toggleVideo}
                data-cursor={isVideoPlaying ? "Pausar" : "Reproducir"}
              >
                <video
                  ref={videoRef}
                  src="/img/video_ebano_1.MOV"
                  poster="/img/ebano_1.webp"
                  playsInline
                  loop
                  muted
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-black/30 flex items-center justify-center transition-opacity duration-300 group-hover:bg-black/20">
                  <div className="h-12 w-12 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-white border border-white/30 transition-transform duration-300 group-hover:scale-110">
                    {isVideoPlaying ? (
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                        <rect x="6" y="4" width="4" height="16" />
                        <rect x="14" y="4" width="4" height="16" />
                      </svg>
                    ) : (
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" className="translate-x-0.5">
                        <path d="M8 5v14l11-7z" />
                      </svg>
                    )}
                  </div>
                </div>
                <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-[11px] font-label tracking-wider uppercase text-white/80 bg-black/40 backdrop-blur-sm px-3 py-1.5 rounded-md">
                  <span>Piel Ébano &amp; Glow Reel</span>
                  <span>0:32</span>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Bar in Menu */}
          <div data-menu-fade className="pt-8 border-t border-white/10 flex flex-wrap items-center justify-between gap-4 text-xs font-label uppercase tracking-widest text-white/50">
            <div>© {new Date().getFullYear()} Lesley García Beauty</div>
            <div className="flex items-center gap-6">
              <Link href="/politicas#privacidad" className="hover:text-white transition-colors">
                Privacidad
              </Link>
              <Link href="/politicas#terminos" className="hover:text-white transition-colors">
                Términos
              </Link>
              <Link href="/agendar" className="text-white hover:underline">
                Reservar Cita →
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
