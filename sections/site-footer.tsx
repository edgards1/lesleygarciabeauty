"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useMotionValue, useReducedMotion, useSpring, useTransform } from "motion/react";
import {
  ArrowUpRight,
  Check,
  Instagram,
  Loader2,
  Mail,
  MapPin,
  MessageCircle,
  Phone,
  SendHorizontal,
  Sparkles,
} from "lucide-react";
import { siteConfig } from "@/constants/site";

/* -------------------------------------------------------------------------- */
/*  Editorial data                                                            */
/* -------------------------------------------------------------------------- */

const NAV = [
  {
    title: "Servicios",
    index: "01",
    links: [
      { label: "Maquillaje de novia", href: "#services" },
      { label: "Eventos sociales", href: "#services" },
      { label: "Editorial & moda", href: "#services" },
      { label: "Contenido UGC", href: "#services" },
    ],
  },
  {
    title: "Estudio",
    index: "02",
    links: [
      { label: "Sobre mí", href: "#about" },
      { label: "Portafolio", href: "#portfolio" },
      { label: "Testimonios", href: "#testimonials" },
      { label: "Marcas", href: "#brands" },
    ],
  },
  {
    title: "Recursos",
    index: "03",
    links: [
      { label: "Resultados UGC", href: "#ugc-results" },
      { label: "Redes sociales", href: "#social" },
      { label: "Preguntas frecuentes", href: "#contact" },
      { label: "Reservar consulta", href: "#contact" },
    ],
  },
];

const SOCIAL = [
  { label: "Instagram", handle: "@lesleygarciabeauty", href: siteConfig.instagram, icon: Instagram },
  { label: "TikTok", handle: "@lesleygarciabeauty", href: siteConfig.tiktok, icon: MessageCircle },
  { label: "Facebook", handle: "Lesley Garcia Beauty", href: siteConfig.facebook, icon: Sparkles },
  { label: "WhatsApp", handle: "Respuesta < 24h", href: siteConfig.whatsapp, icon: SendHorizontal },
] as const;

/* -------------------------------------------------------------------------- */
/*  Client sub-components (isolated for perpetual motion & state)             */
/* -------------------------------------------------------------------------- */

function NewsletterForm() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const reduce = useReducedMotion();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setStatus("loading");
    setErrorMsg("");
    await new Promise((r) => setTimeout(r, 900));
    const valid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    if (!valid) {
      setStatus("error");
      setErrorMsg("Ingresa un email válido.");
      return;
    }
    setStatus("success");
    setEmail("");
    setTimeout(() => setStatus("idle"), 5200);
  };

  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-3">
      <div className="flex items-center gap-2">
        <span className="text-[9px] font-medium uppercase tracking-[0.3em] text-[#0a0a0a]/45">
          Newsletter
        </span>
        <span className="h-px flex-1 bg-[#0a0a0a]/15" />
        <span className="font-mono text-[9px] tracking-[0.15em] text-[#0a0a0a]/45">
          02 — Notas
        </span>
      </div>

      <p className="text-[13px] leading-relaxed text-[#0a0a0a]/70">
        Detrás de cámaras, fechas disponibles y nuevas campañas. Sin spam,
        solo lo que vale la pena.
      </p>

      <div
        className={`group relative flex items-center border-b transition-colors duration-500 ${
          status === "error" ? "border-[#0a0a0a]" : "border-[#0a0a0a]/25"
        } focus-within:border-[#0a0a0a]`}
      >
        <Mail
          aria-hidden
          className="mr-3 h-4 w-4 shrink-0 text-[#0a0a0a]/55 transition-colors duration-300 group-focus-within:text-[#0a0a0a]"
          strokeWidth={1.5}
        />
        <input
          ref={inputRef}
          type="email"
          required
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
            if (status === "error") setStatus("idle");
          }}
          placeholder="tu@email.com"
          aria-label="Tu correo electrónico"
          disabled={status === "loading" || status === "success"}
          className="flex-1 bg-transparent py-3 text-[15px] text-[#0a0a0a] placeholder:text-[#0a0a0a]/35 focus:outline-none disabled:opacity-50"
        />
        <motion.button
          type="submit"
          aria-label="Suscribirme al newsletter"
          disabled={status === "loading" || status === "success"}
          whileTap={reduce ? undefined : { scale: 0.96, y: 1 }}
          transition={{ type: "spring", stiffness: 380, damping: 22 }}
          className="ml-2 inline-flex h-9 w-9 items-center justify-center bg-[#0a0a0a] text-white transition-opacity duration-300 hover:opacity-80 disabled:opacity-40"
        >
          {status === "loading" ? (
            <Loader2 className="h-4 w-4 animate-spin" strokeWidth={1.5} />
          ) : status === "success" ? (
            <Check className="h-4 w-4" strokeWidth={2} />
          ) : (
            <ArrowUpRight className="h-4 w-4" strokeWidth={1.5} />
          )}
        </motion.button>
      </div>

      <div className="min-h-[18px]" aria-live="polite" role="status">
        {status === "success" && (
          <motion.p
            initial={reduce ? false : { opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-[11px] uppercase tracking-[0.2em] text-[#0a0a0a]"
          >
            · Suscrito, gracias.
          </motion.p>
        )}
        {status === "error" && (
          <p className="text-[11px] uppercase tracking-[0.2em] text-[#0a0a0a]/75">
            · {errorMsg}
          </p>
        )}
        {status === "idle" && (
          <p className="text-[10px] uppercase tracking-[0.25em] text-[#0a0a0a]/40">
            Una edición al mes · Quito, Ecuador
          </p>
        )}
      </div>
    </form>
  );
}

function MagneticCTA() {
  const ref = useRef<HTMLAnchorElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 220, damping: 18, mass: 0.4 });
  const sy = useSpring(y, { stiffness: 220, damping: 18, mass: 0.4 });
  const reduce = useReducedMotion();

  const handleMove = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (reduce) return;
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const mx = e.clientX - (r.left + r.width / 2);
    const my = e.clientY - (r.top + r.height / 2);
    x.set(mx * 0.22);
    y.set(my * 0.22);
  };

  const reset = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.a
      ref={ref}
      href={siteConfig.whatsapp}
      target="_blank"
      rel="noopener noreferrer"
      onMouseMove={handleMove}
      onMouseLeave={reset}
      onBlur={reset}
      style={{ x: sx, y: sy }}
      whileTap={reduce ? undefined : { scale: 0.985 }}
      transition={{ type: "spring", stiffness: 200, damping: 20 }}
      className="group relative inline-flex h-14 items-center gap-3 overflow-hidden bg-[#0a0a0a] px-7 text-[11px] font-medium uppercase tracking-[0.25em] text-white"
    >
      <span
        aria-hidden
        className="pointer-events-none absolute inset-0 -translate-x-full bg-white transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-0"
      />
      <span className="relative z-10 transition-colors duration-500 group-hover:text-[#0a0a0a]">
        Reservar Consulta
      </span>
      <span className="relative z-10 flex h-5 w-5 items-center justify-center transition-colors duration-500 group-hover:text-[#0a0a0a]">
        <ArrowUpRight className="h-4 w-4" strokeWidth={1.5} />
      </span>
    </motion.a>
  );
}

function BackToTop() {
  const [visible, setVisible] = useState(false);
  const reduce = useReducedMotion();

  useEffect(() => {
    const sentinel = document.createElement("div");
    sentinel.style.cssText =
      "position:absolute;bottom:80vh;left:0;width:1px;height:1px;pointer-events:none;";
    document.body.appendChild(sentinel);
    const obs = new IntersectionObserver(
      ([entry]) => setVisible(!entry.isIntersecting),
      { threshold: 0 }
    );
    obs.observe(sentinel);
    return () => {
      obs.disconnect();
      sentinel.remove();
    };
  }, []);

  const go = () => {
    window.scrollTo({ top: 0, behavior: reduce ? "auto" : "smooth" });
  };

  return (
    <motion.button
      type="button"
      onClick={go}
      aria-label="Volver arriba"
      animate={
        reduce
          ? { opacity: 1 }
          : { opacity: visible ? 1 : 0, y: visible ? 0 : 8 }
      }
      transition={{ type: "spring", stiffness: 180, damping: 22 }}
      whileHover={reduce ? undefined : { y: -2 }}
      whileTap={reduce ? undefined : { y: 0, scale: 0.97 }}
      className="group inline-flex items-center gap-2 text-[10px] font-medium uppercase tracking-[0.3em] text-[#0a0a0a]/65 transition-colors hover:text-[#0a0a0a] disabled:pointer-events-none"
      style={{ pointerEvents: visible ? "auto" : "none" }}
      disabled={!visible}
    >
      Volver arriba
      <span className="flex h-7 w-7 items-center justify-center border border-[#0a0a0a]/30 transition-colors duration-300 group-hover:border-[#0a0a0a]">
        <ArrowUpRight
          className="h-3.5 w-3.5 -rotate-45"
          strokeWidth={1.5}
        />
      </span>
    </motion.button>
  );
}

function BigWordmark() {
  const reduce = useReducedMotion();
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rx = useTransform(y, [-40, 40], [-1.2, 1.2]);
  const ry = useTransform(x, [-60, 60], [-1.5, 1.5]);

  const onMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (reduce) return;
    const el = e.currentTarget;
    const r = el.getBoundingClientRect();
    x.set(e.clientX - (r.left + r.width / 2));
    y.set(e.clientY - (r.top + r.height / 2));
  };

  return (
    <div
      onMouseMove={onMove}
      className="relative cursor-default select-none py-10 sm:py-14"
    >
      <motion.p
        style={reduce ? undefined : { rotateX: rx, rotateY: ry, transformStyle: "preserve-3d" }}
        transition={{ type: "spring", stiffness: 140, damping: 18 }}
        className="text-center font-serif text-[clamp(2.5rem,13vw,9.5rem)] font-light leading-[0.85] tracking-[-0.055em] text-[#0a0a0a]"
      >
        lesley garcia
        <span className="ml-3 inline-block font-script text-[0.32em] align-baseline font-normal not-italic text-[#0a0a0a]/55">
          beauty
        </span>
      </motion.p>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/*  Static helpers                                                            */
/* -------------------------------------------------------------------------- */

function smoothScrollTo(id: string) {
  if (typeof window === "undefined") return;
  const el = document.getElementById(id.replace("#", ""));
  if (el) {
    const top = el.getBoundingClientRect().top + window.scrollY - 80;
    window.scrollTo({ top, behavior: "smooth" });
  }
}

function handleAnchor(e: React.MouseEvent<HTMLAnchorElement>, href: string) {
  if (href.startsWith("#")) {
    e.preventDefault();
    smoothScrollTo(href);
  }
}

/* -------------------------------------------------------------------------- */
/*  Footer                                                                    */
/* -------------------------------------------------------------------------- */

export function SiteFooter() {
  return (
    <footer
      id="footer"
      className="relative overflow-hidden bg-[#fafaf9] text-[#0a0a0a]"
    >
      {/* Subtle grain (fixed, GPU-friendly) */}
      <div
        aria-hidden
        className="pointer-events-none fixed inset-0 z-[60] opacity-[0.04] mix-blend-multiply"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='160' height='160'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/><feColorMatrix values='0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.6 0'/></filter><rect width='100%' height='100%' filter='url(%23n)'/></svg>\")",
        }}
      />

      <FooterCTA />
      <FooterLinks />
      <SocialPills />
      <BigWordmark />
      <BottomBar />
    </footer>
  );
}

/* -------------------------------------------------------------------------- */
/*  CTA — asymmetric editorial                                                */
/* -------------------------------------------------------------------------- */

function FooterCTA() {
  const reduce = useReducedMotion();
  const fade = (delay: number): React.CSSProperties =>
    reduce
      ? {}
      : {
          opacity: 0,
          transform: "translateY(24px)",
          animation: `footerReveal 0.9s cubic-bezier(0.16, 1, 0.3, 1) ${delay}s forwards`,
        };

  return (
    <>
      <style>{`
        @keyframes footerReveal {
          to { opacity: 1; transform: translateY(0); }
        }
        @media (prefers-reduced-motion: reduce) {
          [data-footer-reveal] { opacity: 1 !important; transform: none !important; animation: none !important; }
        }
      `}</style>
      <div className="relative border-t border-[#0a0a0a]/10">
        <div className="mx-auto max-w-[1400px] px-5 py-20 sm:px-8 sm:py-28 lg:px-12 lg:py-32">
          {/* Eyebrow row */}
          <div
            data-footer-reveal
            style={fade(0)}
            className="mb-10 flex items-center justify-between sm:mb-16"
          >
            <div className="flex items-center gap-4">
              <span className="h-px w-10 bg-[#0a0a0a]" />
              <span className="text-[10px] font-medium uppercase tracking-[0.3em] text-[#0a0a0a]">
                08 — Hablemos
              </span>
            </div>
            <span className="hidden font-mono text-[10px] tracking-[0.2em] text-[#0a0a0a]/45 sm:inline">
              EST. 2018 · QUITO EC
            </span>
          </div>

          {/* Asymmetric 7/5 grid */}
          <div className="grid grid-cols-1 gap-14 lg:grid-cols-12 lg:gap-12">
            {/* Left — editorial headline */}
            <div className="lg:col-span-7">
              <h2
                data-footer-reveal
                style={fade(0.1)}
                className="font-serif text-[clamp(2.5rem,6.5vw,5.75rem)] font-light leading-[0.95] tracking-[-0.045em] text-[#0a0a0a]"
              >
                ¿Lista para
                <br />
                tu próxima
                <br />
                <span className="italic">campaña</span>
                <span className="ml-3 font-script text-[0.4em] not-italic font-normal text-[#0a0a0a]/65 align-baseline">
                  o evento
                </span>
                ?
              </h2>

              <p
                data-footer-reveal
                style={fade(0.2)}
                className="mt-8 max-w-md text-[15px] leading-relaxed text-[#0a0a0a]/70 sm:text-base"
              >
                Agenda una llamada de descubrimiento, sin compromiso. Hablamos
                de fechas, referencias y objetivos. Te respondo en menos de 24
                horas con una propuesta clara.
              </p>

              <div data-footer-reveal style={fade(0.3)} className="mt-10">
                <MagneticCTA />
                <p className="mt-4 text-[10px] uppercase tracking-[0.25em] text-[#0a0a0a]/45">
                  · También por{" "}
                  <a
                    href={`mailto:${siteConfig.email}`}
                    className="underline-offset-4 transition-opacity hover:opacity-60 hover:underline"
                  >
                    {siteConfig.email}
                  </a>
                </p>
              </div>
            </div>

            {/* Right — newsletter card */}
            <div className="lg:col-span-5 lg:pt-2">
              <div
                data-footer-reveal
                style={fade(0.25)}
                className="relative border border-[#0a0a0a]/15 bg-white/70 p-6 backdrop-blur-sm sm:p-8"
              >
                {/* Inner refraction */}
                <div
                  aria-hidden
                  className="pointer-events-none absolute inset-0 shadow-[inset_0_1px_0_rgba(255,255,255,0.6)]"
                />
                <NewsletterForm />
              </div>

              {/* Contact chips */}
              <ul
                data-footer-reveal
                style={fade(0.4)}
                className="mt-6 grid grid-cols-1 gap-px bg-[#0a0a0a]/10 sm:grid-cols-3"
              >
                <ContactChip
                  icon={Phone}
                  label="Teléfono"
                  value="+593 98 336 6831"
                  href={`tel:${siteConfig.phone}`}
                />
                <ContactChip
                  icon={MapPin}
                  label="Estudio"
                  value="Quito · EC"
                  href="#contact"
                  onClick={(e) => handleAnchor(e, "#contact")}
                />
                <ContactChip
                  icon={MessageCircle}
                  label="WhatsApp"
                  value="Directo"
                  href={siteConfig.whatsapp}
                  external
                />
              </ul>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

function ContactChip({
  icon: Icon,
  label,
  value,
  href,
  external,
  onClick,
}: {
  icon: React.ComponentType<{ className?: string; strokeWidth?: number }>;
  label: string;
  value: string;
  href: string;
  external?: boolean;
  onClick?: (e: React.MouseEvent<HTMLAnchorElement>) => void;
}) {
  return (
    <li>
      <a
        href={href}
        target={external ? "_blank" : undefined}
        rel={external ? "noopener noreferrer" : undefined}
        onClick={onClick}
        className="group flex h-full flex-col gap-1.5 bg-white p-4 transition-colors duration-300 hover:bg-[#0a0a0a] hover:text-white"
      >
        <div className="flex items-center gap-2 text-[#0a0a0a]/55 transition-colors duration-300 group-hover:text-white/70">
          <Icon className="h-3.5 w-3.5" strokeWidth={1.5} />
          <span className="text-[9px] font-medium uppercase tracking-[0.3em]">
            {label}
          </span>
        </div>
        <span className="font-serif text-base font-light tracking-tight">
          {value}
        </span>
      </a>
    </li>
  );
}

/* -------------------------------------------------------------------------- */
/*  Links grid — 5 / 2 / 2 / 3 asymmetric                                      */
/* -------------------------------------------------------------------------- */

function FooterLinks() {
  return (
    <div className="border-t border-[#0a0a0a]/10">
      <div className="mx-auto max-w-[1400px] px-5 py-16 sm:px-8 sm:py-20 lg:px-12">
        <div className="grid grid-cols-2 gap-10 sm:gap-12 lg:grid-cols-12 lg:gap-10">
          {/* Contact column (largest) */}
          <div className="col-span-2 lg:col-span-5">
            <SectionLabel index="01" title="Contacto" />
            <div className="mt-6 space-y-5">
              <div>
                <p className="text-[10px] font-medium uppercase tracking-[0.3em] text-[#0a0a0a]/45">
                  Estudio
                </p>
                <p className="mt-1 font-serif text-lg font-light tracking-tight text-[#0a0a0a]">
                  Quito, Ecuador
                </p>
                <p className="text-[13px] text-[#0a0a0a]/60">
                  Servicio a domicilio · Norte y Valle de los Chillos
                </p>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-[10px] font-medium uppercase tracking-[0.3em] text-[#0a0a0a]/45">
                    Horario
                  </p>
                  <p className="mt-1 font-serif text-base font-light tracking-tight text-[#0a0a0a]">
                    Lun — Sáb
                  </p>
                  <p className="font-mono text-[12px] text-[#0a0a0a]/65">
                    09:00 — 18:00
                  </p>
                </div>
                <div>
                  <p className="text-[10px] font-medium uppercase tracking-[0.3em] text-[#0a0a0a]/45">
                    Respuesta
                  </p>
                  <p className="mt-1 font-serif text-base font-light tracking-tight text-[#0a0a0a]">
                    &lt; 24h
                  </p>
                  <p className="font-mono text-[12px] text-[#0a0a0a]/65">
                    Lun — Sáb
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Nav columns */}
          {NAV.map((col) => (
            <div key={col.title} className="col-span-1 sm:col-span-1 lg:col-span-2">
              <SectionLabel index={col.index} title={col.title} />
              <ul className="mt-6 space-y-2.5">
                {col.links.map((l) => (
                  <li key={l.label}>
                    <a
                      href={l.href}
                      onClick={(e) => handleAnchor(e, l.href)}
                      className="group inline-flex items-center text-[13px] text-[#0a0a0a]/70 transition-colors duration-300 hover:text-[#0a0a0a]"
                    >
                      <span className="relative">
                        {l.label}
                        <span className="absolute -bottom-0.5 left-0 h-px w-0 bg-[#0a0a0a] transition-all duration-500 ease-out group-hover:w-full" />
                      </span>
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* Studio column */}
          <div className="col-span-2 sm:col-span-1 lg:col-span-1">
            <SectionLabel index="04" title="Idioma" />
            <ul className="mt-6 space-y-2.5">
              <li>
                <span className="inline-flex items-center gap-2 text-[13px] text-[#0a0a0a]">
                  <span className="h-1 w-1 rounded-full bg-[#0a0a0a]" />
                  Español — EC
                </span>
              </li>
              <li>
                <span className="text-[13px] text-[#0a0a0a]/40">English — EN</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

function SectionLabel({ index, title }: { index: string; title: string }) {
  return (
    <div className="flex items-baseline gap-3 border-b border-[#0a0a0a]/15 pb-3">
      <span className="font-mono text-[10px] tracking-[0.15em] text-[#0a0a0a]/40">
        {index}
      </span>
      <span className="text-[10px] font-medium uppercase tracking-[0.3em] text-[#0a0a0a]">
        {title}
      </span>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/*  Social pills — horizontal row                                             */
/* -------------------------------------------------------------------------- */

function SocialPills() {
  const reduce = useReducedMotion();
  return (
    <div className="border-t border-[#0a0a0a]/10">
      <div className="mx-auto max-w-[1400px] px-5 py-12 sm:px-8 sm:py-16 lg:px-12">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-[10px] font-medium uppercase tracking-[0.3em] text-[#0a0a0a]/55">
              Conecta
            </p>
            <p className="mt-2 font-serif text-2xl font-light tracking-tight text-[#0a0a0a] sm:text-3xl">
              Tras cámara y últimas
              <span className="ml-2 italic">campañas</span>
            </p>
          </div>
          <p className="font-mono text-[10px] tracking-[0.2em] text-[#0a0a0a]/45 sm:text-right">
            4 PLATAFORMAS · 1 ESTUDIO
          </p>
        </div>

        <ul className="mt-8 grid grid-cols-1 gap-px bg-[#0a0a0a]/10 sm:grid-cols-2 lg:grid-cols-4">
          {SOCIAL.map((s) => (
            <li key={s.label}>
              <motion.a
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`${s.label} — ${s.handle}`}
                whileHover={reduce ? undefined : { y: -2 }}
                whileTap={reduce ? undefined : { y: 0, scale: 0.99 }}
                transition={{ type: "spring", stiffness: 260, damping: 22 }}
                className="group relative flex h-full items-center justify-between gap-3 bg-white px-5 py-5 transition-colors duration-500 hover:bg-[#0a0a0a] hover:text-white"
              >
                <span
                  aria-hidden
                  className="pointer-events-none absolute inset-0 shadow-[inset_0_1px_0_rgba(255,255,255,0.6)]"
                />
                <span className="relative z-10 flex items-center gap-3">
                  <s.icon className="h-4 w-4" strokeWidth={1.5} />
                  <span className="flex flex-col">
                    <span className="text-[10px] font-medium uppercase tracking-[0.25em]">
                      {s.label}
                    </span>
                    <span className="font-serif text-[15px] font-light tracking-tight">
                      {s.handle}
                    </span>
                  </span>
                </span>
                <ArrowUpRight
                  className="relative z-10 h-4 w-4 -rotate-0 transition-transform duration-500 group-hover:-rotate-0 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                  strokeWidth={1.5}
                />
              </motion.a>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/*  Bottom bar                                                                */
/* -------------------------------------------------------------------------- */

function BottomBar() {
  return (
    <div className="relative border-t border-[#0a0a0a]/10 bg-white">
      <div className="mx-auto flex max-w-[1400px] flex-col items-start justify-between gap-5 px-5 py-7 sm:flex-row sm:items-center sm:px-8 sm:py-8 lg:px-12">
        <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:gap-4">
          <p className="text-[10px] uppercase tracking-[0.25em] text-[#0a0a0a]/55">
            © {new Date().getFullYear()} Lesley Garcia Beauty
          </p>
          <span className="hidden h-3 w-px bg-[#0a0a0a]/20 sm:inline-block" />
          <p className="text-[10px] uppercase tracking-[0.25em] text-[#0a0a0a]/45">
            Todos los derechos reservados
          </p>
        </div>

        <div className="flex flex-col items-start gap-4 sm:flex-row sm:items-center sm:gap-6">
          <LegalLinks />
          <AvailabilityBadge />
          <BackToTop />
        </div>
      </div>
    </div>
  );
}

function LegalLinks() {
  const links = [
    { label: "Privacidad", href: "#" },
    { label: "Términos", href: "#" },
    { label: "Cookies", href: "#" },
  ];
  return (
    <ul className="flex items-center gap-4">
      {links.map((l, i) => (
        <li key={l.label} className="flex items-center gap-4">
          {i > 0 && (
            <span className="h-2.5 w-px bg-[#0a0a0a]/15" aria-hidden />
          )}
          <a
            href={l.href}
            className="text-[10px] uppercase tracking-[0.25em] text-[#0a0a0a]/55 transition-colors hover:text-[#0a0a0a]"
          >
            {l.label}
          </a>
        </li>
      ))}
    </ul>
  );
}

function AvailabilityBadge() {
  return (
    <div className="inline-flex items-center gap-2 border border-[#0a0a0a]/15 bg-white px-3 py-1.5">
      <span className="relative flex h-2 w-2">
        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#0a0a0a]/30" />
        <span className="relative inline-flex h-2 w-2 rounded-full bg-[#0a0a0a]" />
      </span>
      <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-[#0a0a0a]/75">
        Disponible · 2026
      </span>
    </div>
  );
}
