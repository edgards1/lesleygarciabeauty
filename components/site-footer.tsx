import Link from "next/link";
import { FaInstagram, FaFacebook, FaWhatsapp } from "react-icons/fa";

const LEGAL_LINKS = [
  { label: "Privacidad", href: "/politicas#privacidad" },
  { label: "Terminos", href: "/politicas#terminos" },
  { label: "Reservas", href: "/politicas#reservas" },
] as const;

const SOCIAL_LINKS = [
  {
    label: "Instagram",
    href: "https://www.instagram.com/lesleygarciabeauty",
    icon: FaInstagram,
  },
  {
    label: "Facebook",
    href: "https://www.facebook.com/lesleygarciabeauty",
    icon: FaFacebook,
  },
  {
    label: "WhatsApp",
    href: "https://api.whatsapp.com/send?phone=593983366831&text=Hola%2C%20%C2%BFque%20tal%3F.%0AQuisiera%20agendar%20una%20cita%20contigo%E2%99%A5%EF%B8%8F",
    icon: FaWhatsapp,
  },
] as const;

export function SiteFooter() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-bone-white text-ink-black border-t border-ink-black/10">
      {/* Quiet wordmark */}
      <div className="mx-auto max-w-[1600px] px-5 sm:px-8 lg:px-12 xl:px-20 py-16 md:py-24">
        <Link href="/" className="inline-block">
          <p className="font-display text-[clamp(2.5rem,8vw,6rem)] font-light leading-none tracking-[-0.04em] text-ink-black transition-colors hover:text-graphite">
            Lesley García
          </p>
        </Link>
        <p className="mt-4 text-sm text-graphite leading-relaxed max-w-md font-body">
          Maquillaje profesional y contenido UGC en Guayaquil. Cada look cuenta una historia.
        </p>
      </div>

      <div className="mx-auto max-w-[1600px] px-5 pb-16 sm:px-8 lg:px-12 xl:px-20">
        {/* Social — outline circles */}
        <div className="flex gap-3 justify-center sm:justify-start">
          {SOCIAL_LINKS.map((social) => (
            <a
              key={social.label}
              href={social.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={social.label}
              className="flex h-10 w-10 items-center justify-center rounded-full border border-ash text-graphite transition-colors duration-300 hover:border-ink-black hover:text-ink-black"
            >
              <social.icon className="h-4 w-4" />
            </a>
          ))}
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-ink-black/10">
        <div className="mx-auto flex max-w-[1600px] flex-col items-center gap-4 px-5 py-6 sm:flex-row sm:justify-between sm:px-8 lg:px-12 xl:px-20">
          <p className="text-xs text-ash font-body">
            &copy; {currentYear} Lesley Garcia Beauty. Todos los derechos
            reservados.
          </p>

          <nav className="flex flex-wrap justify-center gap-4 sm:gap-5">
            {LEGAL_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-xs text-graphite transition-colors duration-300 hover:text-ink-black font-body"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <p className="text-xs text-ash font-body">
            Desarrollado por{" "}
            <a
              href="https://www.linkedin.com/in/edgard-s1/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-graphite transition-colors hover:text-ink-black"
            >
              Edgar Delgado
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
