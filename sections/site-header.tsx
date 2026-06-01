"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "motion/react";
import { FiMenu, FiX, FiArrowUpRight } from "react-icons/fi";
import { navigationItems } from "@/constants/navigation";
import { siteConfig } from "@/constants/site";
import { useSmoothScroll } from "@/hooks/use-smooth-scroll";
import { useSectionObserver } from "@/hooks/use-section-observer";
import { Button } from "@/components/ui/button";

export function SiteHeader() {
  const [menuOpen, setMenuOpen] = useState(false);
  const activeId = useSectionObserver(navigationItems.map((item) => item.id));
  const { scrollToSection } = useSmoothScroll();

  return (
    <header className="fixed top-5 left-0 right-0 z-50">
      <div className="mx-auto flex w-full max-w-6xl items-center justify-between rounded-full border border-white/40 bg-white/80 px-5 py-3 shadow-[0_20px_50px_rgba(53,60,68,0.12)] backdrop-blur-xl">
        <Link href="#hero" className="text-sm font-semibold text-foreground">
          Lesley Garcia
        </Link>

        <nav className="hidden items-center gap-6 text-sm text-muted-foreground lg:flex">
          {navigationItems.slice(0, 5).map((item) => (
            <button
              key={item.id}
              onClick={() => scrollToSection(item.id)}
              className={`transition-colors ${
                activeId === item.id
                  ? "text-foreground"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {item.label}
            </button>
          ))}
        </nav>

        <div className="hidden items-center gap-3 lg:flex">
          <Link
            href={siteConfig.whatsapp}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-muted-foreground hover:text-foreground"
          >
            Agendar
          </Link>
          <Button
            onClick={() => scrollToSection("contact")}
            className="rounded-full bg-primary px-5 text-xs font-semibold uppercase tracking-[0.2em] text-primary-foreground"
          >
            Contacto
          </Button>
        </div>

        <button
          type="button"
          aria-label="Abrir menu"
          onClick={() => setMenuOpen(true)}
          className="flex h-10 w-10 items-center justify-center rounded-full border border-stone-200 bg-white text-foreground shadow-sm lg:hidden"
        >
          <FiMenu />
        </button>
      </div>

      <AnimatePresence>
        {menuOpen ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm"
          >
            <motion.div
              initial={{ y: 60, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 60, opacity: 0 }}
              className="absolute bottom-0 left-0 right-0 rounded-t-3xl bg-white p-6"
            >
              <div className="flex items-center justify-between">
                <p className="text-sm font-semibold text-foreground">Menu</p>
                <button
                  type="button"
                  aria-label="Cerrar menu"
                  onClick={() => setMenuOpen(false)}
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-stone-200"
                >
                  <FiX />
                </button>
              </div>

              <div className="mt-6 space-y-3">
                {navigationItems.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => {
                      scrollToSection(item.id);
                      setMenuOpen(false);
                    }}
                    className="flex w-full items-center justify-between rounded-2xl border border-stone-200 bg-stone-50 px-4 py-3 text-left"
                  >
                    <span className="text-sm font-medium text-foreground">
                      {item.label}
                    </span>
                    <FiArrowUpRight className="text-muted-foreground" />
                  </button>
                ))}
              </div>
            </motion.div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </header>
  );
}
