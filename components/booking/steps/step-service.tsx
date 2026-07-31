"use client"

import { useState, useCallback } from "react"
import { motion, AnimatePresence, useReducedMotion } from "motion/react"
import { useBookingContext } from "@/components/booking/booking-context"
import { StepHeader } from "@/components/booking/step-header"
import { Button } from "@/components/ui/button"
import { SERVICE_CATEGORIES, WHATSAPP_NUMBER, WHATSAPP_MESSAGE } from "@/lib/config/booking.config"
import type { SelectedService } from "@/lib/types/booking.types"
import { FaArrowLeft, FaArrowRight, FaWhatsapp, FaCheck } from "react-icons/fa"
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
    "quin-mom": "Mamá & Yo",
  },
}

const CATEGORY_TABS = SERVICE_CATEGORIES.filter((c) => c.id !== "ugc" && c.id !== "automaquillaje")
const WHATSAPP_TABS = SERVICE_CATEGORIES.filter((c) => c.id === "ugc" || c.id === "automaquillaje")

const DIFFERENTIATORS = [
  { title: "Productos Pro", desc: "Alta pigmentación y acabado profesional." },
  { title: "Toda Piel", desc: "Del porcelana al ébano." },
  { title: "Larga Duración", desc: "Resiste lágrimas, abrazos y fotos." },
]

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

const EASE = [0.32, 0.72, 0, 1] as const

const cardVariants = {
  hidden: { opacity: 0, y: 16, filter: "blur(4px)" },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.5, ease: EASE, delay: i * 0.06 },
  }),
}

function IncludesList({ items, limit }: { items: string[]; limit: number }) {
  return (
    <ul className="space-y-2">
      {items.slice(0, limit).map((item, j) => (
        <li key={j} className="flex items-start gap-2.5 font-sans text-[11px] leading-relaxed text-stone-500/90">
          <span className="mt-0.5 flex h-3.5 w-3.5 shrink-0 items-center justify-center rounded-full bg-stone-900 text-white">
            <FaCheck className="h-1.5 w-1.5" />
          </span>
          {item}
        </li>
      ))}
    </ul>
  )
}

function ServiceCTA({ selected }: { selected: boolean }) {
  return (
    <span
      className={cn(
        "group/btn mt-5 inline-flex w-full items-center justify-between gap-3 rounded-full px-5 py-3 font-sans text-[11px] font-bold uppercase tracking-[0.12em] transition-all duration-500",
        selected ? "bg-stone-900 text-white" : "bg-stone-900 text-white hover:bg-stone-700"
      )}
    >
      <span>{selected ? "Seleccionado" : "Elegir paquete"}</span>
      <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-white/10 transition-transform duration-500 group-hover/btn:translate-x-0.5">
        <FaArrowRight className="h-2.5 w-2.5" />
      </span>
    </span>
  )
}

export function StepService() {
  const { service, personalInfo, setService, setLocation, prevStep, goToStep, nextStep } = useBookingContext()
  const [activeTab, setActiveTab] = useState("novia")
  const [selectedId, setSelectedId] = useState<string>(service?.id ?? "")
  const reduce = useReducedMotion()

  const activeCategory = CATEGORY_TABS.find((c) => c.id === activeTab)
  const firstName = personalInfo.name.trim().split(/\s+/)[0] || ""

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

  return (
    <div>
      <StepHeader
        index={1}
        eyebrow="Servicios"
        title={
          <>
            Elige tu <span className="font-normal italic text-stone-500">experiencia</span>
          </>
        }
        description="Cada paquete está diseñado para que te sientas segura y radiante. Sin prisas, sin estrés."
      />

      {/* Volver a tus datos */}
      <div className="mb-6 flex flex-wrap items-center justify-between gap-3 border-b border-stone-200 pb-4">
        <Button
          type="button"
          variant="outline"
          onClick={prevStep}
          className="group h-10 rounded-full border-stone-300 bg-transparent px-4 font-sans text-[11px] font-semibold uppercase tracking-[0.1em] text-stone-900 transition-all duration-500 hover:bg-stone-50"
        >
          <span className="flex items-center gap-2">
            <FaArrowLeft className="h-3 w-3 transition-transform duration-300 group-hover:-translate-x-0.5" />
            Mis datos
          </span>
        </Button>

        <button
          type="button"
          onClick={() => goToStep(0)}
          className="group flex items-center gap-2 rounded-full px-2 py-1 text-right font-sans text-[11px] text-stone-500/70 transition-colors hover:text-stone-900"
        >
          <span className="hidden sm:inline">
            {firstName ? (
              <>
                Hola, <span className="font-semibold text-stone-900">{firstName}</span>
              </>
            ) : (
              "Aún no nos presentamos"
            )}
          </span>
          <span className="font-semibold uppercase tracking-[0.1em] underline underline-offset-4 decoration-stone-400 decoration-dotted">
            Cambiar datos
          </span>
        </button>
      </div>

      <div className="mb-7 grid grid-cols-1 gap-y-3 border-y border-stone-200 py-3.5 sm:grid-cols-3 sm:gap-y-0 sm:divide-x sm:divide-stone-200">
        {DIFFERENTIATORS.map((d) => (
          <div key={d.title} className="sm:px-5 sm:first:pl-0 sm:last:pr-0">
            <p className="font-sans text-[9px] font-bold uppercase tracking-[0.2em] text-stone-900">
              {d.title}
            </p>
            <p className="mt-1 font-sans text-[10px] leading-relaxed text-stone-500/60">
              {d.desc}
            </p>
          </div>
        ))}
      </div>

      <div className="mb-6 flex flex-wrap gap-1.5">
        {CATEGORY_TABS.map((cat) => {
          const isActive = activeTab === cat.id
          return (
            <button
              key={cat.id}
              type="button"
              onClick={() => setActiveTab(cat.id)}
              className={`relative rounded-full px-4 py-2 font-sans text-[9px] font-bold uppercase tracking-[0.15em] transition-colors duration-300 ${
                isActive ? "text-white" : "text-stone-500/60 hover:text-stone-900"
              }`}
            >
              {isActive && (
                <motion.span
                  layoutId="service-tab-pill"
                  transition={{ type: "spring", stiffness: 350, damping: 32 }}
                  className="absolute inset-0 rounded-full bg-stone-900"
                />
              )}
              {!isActive && (
                <span className="absolute inset-0 rounded-full ring-1 ring-stone-300 transition-colors duration-300 hover:ring-stone-400" />
              )}
              <span className="relative z-10">{cat.name}</span>
            </button>
          )
        })}
      </div>

      <AnimatePresence mode="wait">
        {activeCategory && (
          <motion.div
            key={activeCategory.id}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
          >
            <motion.div
              className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:[&>*:first-child]:col-span-2"
              variants={reduce ? undefined : { hidden: {}, visible: {} }}
              initial="hidden"
              animate="visible"
            >
              {[...activeCategory.services]
                .sort((a, b) => {
                  const aRec = a.id === RECOMMENDED_IDS[activeCategory.id] ? -1 : 0
                  const bRec = b.id === RECOMMENDED_IDS[activeCategory.id] ? -1 : 0
                  return aRec - bRec || getSortKey(a) - getSortKey(b)
                })
                .map((svc, i) => {
                  const isRecommended = svc.id === RECOMMENDED_IDS[activeCategory.id]
                  const tierLabel = TIER_LABELS[activeCategory.id]?.[svc.id]

                  return (
                    <motion.div
                      key={svc.id}
                      variants={cardVariants}
                      custom={i}
                      layout
                      className={cn(
                        "rounded-[1.5rem] p-[1.5px] transition-all duration-500",
                        isRecommended
                          ? "bg-gradient-to-br from-stone-400/70 via-stone-300/40 to-stone-400/70 shadow-lg shadow-stone-900/5"
                          : "bg-stone-200 hover:bg-stone-300/80 hover:shadow-lg hover:shadow-stone-900/5"
                      )}
                    >
                      <motion.button
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
                        className="relative flex h-full w-full flex-col rounded-[calc(1.5rem-1.5px)] bg-white p-5 text-left transition-all duration-500 sm:p-6"
                        whileTap={{ scale: 0.98 }}
                      >
                        <span className="mb-4 flex items-start justify-between gap-3">
                          <span className="flex flex-col items-start gap-2">
                            {isRecommended && (
                              <span className="inline-block w-fit rounded-full bg-stone-900 px-2.5 py-1 font-sans text-[8px] font-bold uppercase tracking-[0.15em] text-white">
                                Recomendado
                              </span>
                            )}
                            {tierLabel && (
                              <span className="font-sans text-[9px] font-semibold uppercase tracking-[0.12em] text-stone-500">
                                {tierLabel}
                              </span>
                            )}
                          </span>
                          {svc.duration && (
                            <span className="shrink-0 rounded-full bg-stone-100 px-2.5 py-1 font-sans text-[9px] font-semibold tracking-[0.08em] text-stone-500">
                              {svc.duration}
                            </span>
                          )}
                        </span>

                        <span className="font-serif text-[2rem] font-semibold leading-none tracking-[-0.03em] text-stone-900 sm:text-[2.25rem]">
                          ${svc.price}
                        </span>

                        <h4 className="mb-2 mt-2.5 font-sans text-[13px] font-bold uppercase tracking-[0.02em] text-stone-900">
                          {svc.name.replace(/^Paquete de /i, "").replace(/^Paquete /i, "")}
                        </h4>

                        <span
                          className={cn(
                            "mb-4 inline-flex w-fit items-center gap-1.5 font-sans text-[9px] font-bold uppercase tracking-[0.12em]",
                            svc.homeService ? "text-stone-500" : "text-stone-400"
                          )}
                        >
                          <span
                            className={cn(
                              "h-1.5 w-1.5 rounded-full",
                              svc.homeService ? "bg-stone-900" : "bg-stone-400"
                            )}
                          />
                          {svc.homeService ? "Estudio y a domicilio" : "Solo en estudio"}
                        </span>

                        {isRecommended ? (
                          <div className="flex flex-1 flex-col gap-5 sm:grid sm:grid-cols-2 sm:gap-8">
                            <div className="sm:block">
                              <p className="mb-2 font-sans text-[8px] font-bold uppercase tracking-[0.15em] text-stone-500/40">
                                Incluye
                              </p>
                              <IncludesList items={svc.includes} limit={7} />
                            </div>
                            <div className="flex flex-col justify-end sm:col-start-2 sm:row-start-1">
                              <ServiceCTA selected={selectedId === svc.id} />
                            </div>
                          </div>
                        ) : (
                          <>
                            <div className="mb-2 border-t border-stone-200 pt-3">
                              <p className="mb-2 font-sans text-[8px] font-bold uppercase tracking-[0.15em] text-stone-500/40">
                                Incluye
                              </p>
                              <IncludesList items={svc.includes} limit={4} />
                            </div>
                            <div className="mt-auto">
                              <ServiceCTA selected={selectedId === svc.id} />
                            </div>
                          </>
                        )}
                      </motion.button>
                    </motion.div>
                  )
                })}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-2 border-t border-stone-200 pt-5">
        <p className="font-sans text-[10px] font-medium text-stone-500/50">
          ¿Buscas UGC o automaquillaje?
        </p>
        {WHATSAPP_TABS.map((cat) => (
          <button
            key={cat.id}
            type="button"
            onClick={() => handleWhatsApp(cat.id)}
            className="group inline-flex items-center gap-1.5 rounded-full bg-[#25D366] px-4 py-2 font-sans text-[9px] font-bold uppercase tracking-[0.12em] text-white transition-all duration-500 hover:bg-[#1EBE5D] active:scale-[0.98]"
          >
            <FaWhatsapp className="h-3 w-3 text-white" />
            {cat.name}
          </button>
        ))}
      </div>
    </div>
  )
}
