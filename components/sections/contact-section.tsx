"use client";

import { useRef } from "react";
import { FaWhatsapp } from "react-icons/fa";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { splitWordsToMasks } from "@/lib/split-text";
import { ContactForm } from "@/components/contact-form";

gsap.registerPlugin(ScrollTrigger, useGSAP);

export function ContactSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const leftRef = useRef<HTMLDivElement>(null);
  const trustRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        if (titleRef.current) {
          const words = splitWordsToMasks(titleRef.current);
          gsap.fromTo(
            words,
            { yPercent: 120, rotate: 1.5 },
            { yPercent: 0, rotate: 0, duration: 1.2, stagger: 0.05, ease: "power4.out", scrollTrigger: { trigger: titleRef.current, start: "top 82%" } }
          );
          if (words[0]) {
            words[0].style.fontStyle = "italic";
            words[0].style.color = "#666666";
          }
        }

        if (leftRef.current) {
          const children = gsap.utils.toArray<HTMLElement>(leftRef.current.children);
          gsap.fromTo(
            children,
            { y: 32, opacity: 0 },
            { y: 0, opacity: 1, duration: 0.9, stagger: 0.15, ease: "power3.out", scrollTrigger: { trigger: leftRef.current, start: "top 78%" } }
          );
        }

        if (trustRef.current) {
          const rows = gsap.utils.toArray<HTMLElement>(trustRef.current.children);
          gsap.fromTo(
            rows,
            { y: 20, opacity: 0 },
            { y: 0, opacity: 1, duration: 0.7, stagger: 0.08, ease: "power3.out", scrollTrigger: { trigger: trustRef.current, start: "top 88%" } }
          );
        }

        if (ctaRef.current) {
          gsap.fromTo(
            ctaRef.current,
            { y: 32, opacity: 0 },
            { y: 0, opacity: 1, duration: 0.8, ease: "power3.out", scrollTrigger: { trigger: ctaRef.current, start: "top 85%" } }
          );
        }
      });
    },
    { scope: sectionRef }
  );

  return (
    <section
      ref={sectionRef}
      id="contact"
      className="bg-bone-white text-ink-black relative overflow-hidden"
    >
      <div
        aria-hidden
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
        }}
      />

      <div className="mx-auto max-w-[1600px] px-5 sm:px-8 lg:px-12 xl:px-20 relative z-10">
        <div className="grid lg:grid-cols-[1fr_1fr] gap-16 lg:gap-24 pt-20 sm:pt-28">
          <div>
            <h2
              ref={titleRef}
              className="text-[clamp(3rem,8vw,6rem)] font-display font-light leading-[0.95] tracking-[-0.02em] text-ink-black mb-8"
            >
              Trabajemos juntos
            </h2>

            <div ref={leftRef} className="space-y-0">
              <p className="text-base sm:text-lg text-graphite leading-[1.7] max-w-md mb-12 font-body">
                Estoy aquí para ayudarte a crear el look perfecto para tu boda, evento especial o para tu marca. Completa el formulario y me pondré en contacto contigo lo antes posible.
              </p>

              <div ref={trustRef} className="space-y-0 divide-y divide-ink-black/10 max-w-md">
                <div className="flex items-center justify-between py-5">
                  <p className="text-sm text-graphite font-body">Tiempo de respuesta</p>
                  <p className="text-sm font-normal text-ink-black font-body">24 horas</p>
                </div>
                <div className="flex items-center justify-between py-5">
                  <p className="text-sm text-graphite font-body">Presupuesto</p>
                  <p className="text-sm font-normal text-ink-black font-body">Sin compromiso</p>
                </div>
                <div className="flex items-center justify-between py-5">
                  <p className="text-sm text-graphite font-body">Cobertura</p>
                  <p className="text-sm font-normal text-ink-black font-body">Guayaquil y alrededores</p>
                </div>
                <div className="flex items-center justify-between py-5">
                  <p className="text-sm text-graphite font-body">Experiencia</p>
                  <p className="text-sm font-normal text-ink-black font-body">5+ años, 40+ novias</p>
                </div>
              </div>
            </div>
          </div>

          <div>
            <ContactForm />
          </div>
        </div>

        <div
          ref={ctaRef}
          className="border-t border-ink-black/10 mt-20 sm:mt-28 py-12 sm:py-16"
        >
          <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
            <div>
              <p className="text-sm text-graphite mb-1 font-body"> Prefieres escribir directo? </p>
              <p className="text-xs text-ash font-body">Respuesta lo antes posible</p>
            </div>
            <a
              href="https://api.whatsapp.com/send?phone=593983366831&text=Hola%2C%20%C2%BFque%20tal%3F.%0AQuisiera%20agendar%20una%20cita%20contigo%E2%99%A5%EF%B8%8F"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 rounded-full bg-ink-black px-8 py-3.5 text-sm text-bone-white transition-transform duration-300 hover:scale-[1.03] active:scale-95"
            >
              <FaWhatsapp className="h-4 w-4" />
              Abrir WhatsApp
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
