"use client"

import { useState, useCallback } from "react"
import { motion, AnimatePresence, useReducedMotion } from "motion/react"
import { useBookingContext } from "@/components/booking/booking-context"
import { SERVICE_CATEGORIES, WHATSAPP_NUMBER, WHATSAPP_MESSAGE } from "@/lib/config/booking.config"
import type { SelectedService } from "@/lib/types/booking.types"
import { FaArrowRight, FaWhatsapp, FaCheck } from "react-icons/fa"
import { cn } from "@/lib/utils"

const RECOMMENDED_IDS: Record<string, string> = {
  novia: "novia-completo",
  social: "social-maquillaje-peinado",
  quinceanera: "quin-makeup-hair",
}

const TIER_LABELS: Record<string, Record<string, string>> = {
  novia: {
    "novia-civil": "Esencial",
    "novia-eclesiastico": "Completo",
    "novia-completo": "Premium",
    "novia-familiar": "Familiar",
    "novia-prueba": "Prueba",
  },
  social: {
    "social-maquillaje": "Maquillaje",
    "social-maquillaje-peinado": "Completo",
  },
  quinceanera: {
    "quin-makeup": "Maquillaje",
    "quin-makeup-hair": "Completo",
    "quin-trial": "Prueba",
    "quin-mom": "Mama y Yo",
  },
}

const CATEGORY_TABS = SERVICE_CATEGORIES.filter((c) => c.id !== "ugc" && c.id !== "automaquillaje")
const WHATSAPP_TABS = SERVICE_CATEGORIES.filter((c) => c.id === "ugc" || c.id === "automaquillaje")

const EASE = [0.32, 0.72, 0, 1] as const

const spring = { type: "spring" as const, stiffness: 300, damping: 25 }

function getSortKey(svc: { id: string; price: number }): number {
  if (svc.id.includes("prueba")) return 99
  if (svc.id.includes("familiar")) return 98
  if (svc.id.includes("completo")) return 1
  if (svc.id.includes("eclesiastico")) return 2
  if (svc.id.includes("civil")) return 3
  if (svc.id.includes("peinado")) return 1
  if (svc.id.includes("mom")) return 2
  return svc.price
}

const sectionVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.07, delayChildren: 0.05 },
  },
}

const cardVariants = {
  hidden: { opacity: 0, y: 30, scale: 0.95 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.5, ease: EASE },
  },
  exit: {
    opacity: 0,
    y: -20,
    scale: 0.95,
    transition: { duration: 0.3, ease: EASE },
  },
}

export function StepService() {
  const { service, setService, setLocation, nextStep } = useBookingContext()
  const [activeTab, setActiveTab] = useState("novia")
  const [selectedId, setSelectedId] = useState<string>(service?.id ?? "")
  const reduce = useReducedMotion()

  const activeCategory = CATEGORY_TABS.find((c) => c.id === activeTab)

  const handleSelect = useCallback(
    (svc: SelectedService) => {
      setSelectedId(svc.id)
      setService(svc)
      setLocation({ type: "studio", address: "", reference: "" })
      nextStep()
    },
    [setService, setLocation, nextStep]
  )

  function handleWhatsApp(catId: string) {
    window.open(
      `https://api.whatsapp.com/send?phone=${WHATSAPP_NUMBER}&text=${WHATSAPP_MESSAGE}${catId === "ugc" ? "UGC" : "automaquillaje"}`,
      "_blank"
    )
  }

  const anim = !reduce

  return (
    <div className="max-w-5xl mx-auto">
      <motion.div
        initial={anim ? { opacity: 0, y: 20 } : undefined}
        animate={anim ? { opacity: 1, y: 0 } : undefined}
        transition={{ duration: 0.6, ease: EASE }}
        className="text-center mb-10"
      >
        <span className="inline-block rounded-full px-3 py-1 text-[10px] uppercase tracking-[0.2em] font-medium text-stone-400 bg-stone-100 dark:bg-stone-800 dark:text-stone-500 mb-4">
          Servicios
        </span>
        <h2 className="text-4xl md:text-5xl font-serif text-stone-900 dark:text-stone-100 mb-3 tracking-tight">
          Elegi tu experiencia
        </h2>
        <p className="text-sm text-stone-500 dark:text-stone-400 max-w-md mx-auto">
          Selecciona el plan que mas se adapte a vos. Todos incluyen atencion profesional personalizada.
        </p>
      </motion.div>

      {/* Category Tabs */}
      <div className="flex flex-wrap justify-center gap-2 mb-12">
        {CATEGORY_TABS.map((cat) => (
          <motion.button
            key={cat.id}
            type="button"
            onClick={() => setActiveTab(cat.id)}
            whileHover={anim ? { scale: 1.03 } : undefined}
            whileTap={anim ? { scale: 0.97 } : undefined}
            transition={spring}
            className={cn(
              "relative rounded-full px-5 py-2.5 text-sm font-medium transition-colors duration-500 ease-[cubic-bezier(0.32,0.72,0,1)]",
              activeTab === cat.id
                ? "bg-stone-900 dark:bg-stone-100 text-white dark:text-stone-900 shadow-lg shadow-stone-900/10"
                : "bg-stone-100 dark:bg-stone-800 text-stone-600 dark:text-stone-400 hover:bg-stone-200 dark:hover:bg-stone-700"
            )}
          >
            {cat.name}
          </motion.button>
        ))}
        {WHATSAPP_TABS.map((cat) => (
          <motion.button
            key={cat.id}
            type="button"
            onClick={() => handleWhatsApp(cat.id)}
            whileHover={anim ? { scale: 1.03 } : undefined}
            whileTap={anim ? { scale: 0.97 } : undefined}
            transition={spring}
            className="relative rounded-full px-5 py-2.5 text-sm font-medium bg-emerald-50 dark:bg-emerald-950/30 text-emerald-700 dark:text-emerald-400 hover:bg-emerald-100 dark:hover:bg-emerald-950/50 transition-colors duration-500"
          >
            <span className="flex items-center gap-2">
              <FaWhatsapp className="w-3.5 h-3.5" />
              {cat.name}
            </span>
          </motion.button>
        ))}
      </div>

      {/* Service Cards */}
      <AnimatePresence mode="wait">
        {activeCategory && (
          <motion.div
            key={activeCategory.id}
            variants={sectionVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            <div
              className={cn(
                "grid gap-5",
                activeCategory.services.length <= 2 && "md:grid-cols-2 lg:grid-cols-2 max-w-2xl mx-auto",
                activeCategory.services.length === 3 && "md:grid-cols-3",
                activeCategory.services.length >= 4 && "md:grid-cols-2 lg:grid-cols-4"
              )}
            >
              {[...activeCategory.services]
                .sort((a, b) => getSortKey(a) - getSortKey(b))
                .map((svc) => {
                  const isSelected = selectedId === svc.id
                  const isRecommended = svc.id === RECOMMENDED_IDS[activeCategory.id]
                  const isTrial = svc.id.includes("prueba")
                  const tierLabel = TIER_LABELS[activeCategory.id]?.[svc.id]

                  return (
                    <motion.button
                      key={svc.id}
                      variants={cardVariants}
                      layout
                      type="button"
                      onClick={() =>
                        handleSelect({
                          id: svc.id,
                          name: svc.name,
                          price: svc.price,
                          category: svc.category,
                          includes: svc.includes,
                          homeService: svc.homeService,
                        })
                      }
                      whileHover={
                        anim
                          ? {
                              y: -8,
                              scale: 1.03,
                              boxShadow: "0 24px 48px -12px rgba(0,0,0,0.15)",
                            }
                          : undefined
                      }
                      whileTap={anim ? { scale: 0.97 } : undefined}
                      transition={spring}
                      className={cn(
                        "relative text-left border flex flex-col will-change-transform",
                        "rounded-[20px]",
                        isRecommended
                          ? "border-amber-200 dark:border-amber-700 bg-gradient-to-b from-amber-50/50 to-white dark:from-amber-950/10 dark:to-stone-900 shadow-lg shadow-amber-900/5 dark:shadow-amber-900/10 scale-[1.02] md:scale-105 z-10"
                          : isSelected
                            ? "border-stone-900 dark:border-stone-100 bg-stone-50 dark:bg-stone-800 shadow-xl"
                            : "border-stone-200 dark:border-stone-700 bg-white dark:bg-stone-900 hover:border-stone-300 dark:hover:border-stone-600"
                      )}
                    >
                      {/* Tier badge */}
                      {tierLabel && (
                        <div
                          className={cn(
                            "px-3 py-1.5 text-[10px] font-semibold uppercase tracking-[0.15em] border-b rounded-t-[20px]",
                            isRecommended
                              ? "bg-amber-50 dark:bg-amber-950/30 text-amber-700 dark:text-amber-400 border-amber-100 dark:border-amber-800/50"
                              : isSelected
                                ? "bg-stone-100 dark:bg-stone-700 text-stone-600 dark:text-stone-300 border-stone-200 dark:border-stone-600"
                                : "bg-stone-50 dark:bg-stone-800 text-stone-500 dark:text-stone-400 border-stone-100 dark:border-stone-700"
                          )}
                        >
                          {tierLabel}
                        </div>
                      )}

                      {/* Recommended badge */}
                      {isRecommended && (
                        <span className="absolute -top-3 right-4 z-20 rounded-full bg-amber-500 text-white text-[9px] font-bold uppercase tracking-wider px-3 py-1 shadow-lg">
                          Recomendado
                        </span>
                      )}

                      {/* Content */}
                      <div className="p-5 flex flex-col flex-1">
                        {/* Price hero */}
                        <div className="mb-4 text-center">
                          <p
                            className={cn(
                              "text-[28px] font-bold tracking-tight transition-colors duration-500",
                              isRecommended
                                ? "text-amber-900 dark:text-amber-200"
                                : "text-stone-900 dark:text-stone-100"
                            )}
                          >
                            ${svc.price}
                          </p>
                          {svc.duration && (
                            <p className="text-[10px] uppercase tracking-wider text-stone-400 dark:text-stone-500 mt-0.5">
                              {svc.duration} de sesion
                            </p>
                          )}
                        </div>

                        {/* Service name */}
                        <h4
                          className={cn(
                            "text-sm font-semibold text-center mb-3 transition-colors duration-500",
                            "text-stone-900 dark:text-stone-100"
                          )}
                        >
                          {svc.name.replace(/^Paquete de /i, "").replace(/^Paquete /i, "")}
                        </h4>

                        {/* What's included */}
                        <div className="flex-1">
                          <p className="text-[10px] uppercase tracking-wider text-stone-400 dark:text-stone-500 mb-2 font-medium">
                            Incluye
                          </p>
                          <ul className="space-y-2">
                            {svc.includes.map((item, i) => (
                              <li
                                key={i}
                                className="text-[11px] text-stone-600 dark:text-stone-400 flex items-start gap-2.5 leading-relaxed"
                              >
                                <span
                                  className={cn(
                                    "mt-0.5 w-3.5 h-3.5 shrink-0 rounded-full flex items-center justify-center",
                                    isRecommended
                                      ? "bg-amber-100 dark:bg-amber-900/40 text-amber-600 dark:text-amber-400"
                                      : "bg-stone-100 dark:bg-stone-700 text-stone-500 dark:text-stone-400"
                                  )}
                                >
                                  <FaCheck className="w-2 h-2" />
                                </span>
                                {item}
                              </li>
                            ))}
                          </ul>
                        </div>

                        {/* Location note */}
                        <div className="mt-4">
                          {!svc.homeService && (
                            <p className="text-[10px] text-amber-600 dark:text-amber-400 uppercase tracking-wider font-medium">
                              Solo en estudio
                            </p>
                          )}
                        </div>

                        {/* CTA */}
                        <div className="mt-auto pt-4">
                          <motion.span
                            whileHover={anim ? { scale: 1.03 } : undefined}
                            whileTap={anim ? { scale: 0.96 } : undefined}
                            transition={spring}
                            className={cn(
                              "flex items-center justify-center gap-2 text-xs font-medium rounded-full w-full py-2.5 transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)]",
                              isSelected
                                ? "bg-stone-900 dark:bg-stone-100 text-white dark:text-stone-900"
                                : isRecommended
                                  ? "bg-amber-500 hover:bg-amber-600 text-white shadow-md"
                                  : "bg-stone-900 hover:bg-stone-800 dark:bg-stone-100 dark:hover:bg-stone-200 text-white dark:text-stone-900"
                            )}
                          >
                            {isSelected ? "Seleccionado" : "Elegir plan"}
                            {!isSelected && (
                              <span className="inline-flex w-5 h-5 rounded-full bg-white/20 items-center justify-center">
                                <FaArrowRight className="w-2.5 h-2.5" />
                              </span>
                            )}
                          </motion.span>
                        </div>
                      </div>
                    </motion.button>
                  )
                })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* WhatsApp content */}
      <AnimatePresence>
        {activeTab === "ugc" && (
          <motion.div
            initial={anim ? { opacity: 0, y: 20 } : undefined}
            animate={anim ? { opacity: 1, y: 0 } : undefined}
            exit={anim ? { opacity: 0, y: -20 } : undefined}
            transition={{ duration: 0.4, ease: EASE }}
            className="mt-8 text-center p-10 rounded-2xl bg-gradient-to-br from-emerald-50 to-stone-50 dark:from-emerald-950/20 dark:to-stone-900 border border-emerald-100 dark:border-emerald-900/30"
          >
            <p className="text-stone-600 dark:text-stone-400 text-sm mb-4">
              Servicios personalizados. Consulta presupuesto por WhatsApp.
            </p>
            <a
              href={`https://api.whatsapp.com/send?phone=${WHATSAPP_NUMBER}&text=${WHATSAPP_MESSAGE}personalizado`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full bg-emerald-500 hover:bg-emerald-600 text-white text-sm font-medium px-6 py-3 transition-all duration-500 shadow-lg shadow-emerald-500/20"
            >
              <FaWhatsapp className="w-4 h-4" />
              Consultar por WhatsApp
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
