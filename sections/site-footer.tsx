import Link from "next/link";
import { siteConfig } from "@/constants/site";
import { Button } from "@/components/ui/button";
import { FiInstagram, FiFacebook, FiPhone } from "react-icons/fi";

export function SiteFooter() {
  return (
    <footer className="bg-[#353C44] text-white">
      <div className="mx-auto w-full max-w-6xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid gap-10 md:grid-cols-[1.2fr_0.8fr]">
          <div className="space-y-4">
            <p className="text-xl font-serif">Lesley Garcia</p>
            <p className="text-sm text-white/70 max-w-md">
              Maquillaje profesional y contenido UGC para marcas que buscan
              elegancia, confianza y resultados.
            </p>
            <p className="text-xs text-white/50">
              (c) {new Date().getFullYear()} Lesley Garcia Beauty. Todos los derechos reservados.
            </p>
          </div>

          <div className="space-y-4">
            <p className="text-sm uppercase tracking-[0.2em] text-white/60">
              Redes sociales
            </p>
            <div className="flex items-center gap-3">
              <Link href={siteConfig.instagram} target="_blank" rel="noopener noreferrer">
                <Button size="icon" variant="outline" className="border-white/30 text-white">
                  <FiInstagram className="h-5 w-5" />
                </Button>
              </Link>
              <Link href={siteConfig.facebook} target="_blank" rel="noopener noreferrer">
                <Button size="icon" variant="outline" className="border-white/30 text-white">
                  <FiFacebook className="h-5 w-5" />
                </Button>
              </Link>
              <Link href={siteConfig.whatsapp} target="_blank" rel="noopener noreferrer">
                <Button size="icon" variant="outline" className="border-white/30 text-white">
                  <FiPhone className="h-5 w-5" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
