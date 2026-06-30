"use client"

import { useState } from "react"
import { useBookingContext } from "@/components/booking/booking-context"
import { SERVICE_CATEGORIES, WHATSAPP_NUMBER, WHATSAPP_MESSAGE } from "@/lib/config/booking.config"
import type { SelectedService } from "@/lib/types/booking.types"
import { Button } from "@/components/ui/button"
import { FaArrowRight, FaWhatsapp } from "react-icons/fa"
import { cn } from "@/lib/utils"

export function StepService() {
  const { service, setService, setLocation, nextStep } = useBookingContext()
  const [selectedId, setSelectedId] = useState<string>(service?.id ?? "")

  function handleSelect(svc: SelectedService) {
    setSelectedId(svc.id)
    setService(svc)
    setLocation({ type: "studio", address: "", reference: "" })
    if (svc.category === "ugc" || svc.category === "automaquillaje") {
      const msg = svc.category === "ugc"
        ? `${WHATSAPP_MESSAGE}UGC`
        : `${WHATSAPP_MESSAGE}automaquillaje`
      window.open(
        `https://api.whatsapp.com/send?phone=${WHATSAPP_NUMBER}&text=${msg}`,
        "_blank"
      )
      return
    }
    nextStep()
  }

  return (
    <div className="max-w-4xl mx-auto">
      <div className="text-center mb-10">
        <h2 className="text-3xl font-serif text-stone-900 dark:text-stone-100 mb-3">
          Elige tu servicio
        </h2>
        <p className="text-sm text-stone-500 dark:text-stone-400">
          Selecciona el paquete que mejor se adapte a tus necesidades
        </p>
      </div>

      <div className="space-y-12">
        {SERVICE_CATEGORIES.filter((c) => c.id !== "ugc" && c.id !== "automaquillaje").map(
          (category) => (
            <div key={category.id}>
              <div className="flex items-center gap-4 mb-6">
                <div className="h-px flex-1 bg-stone-200 dark:bg-stone-700" />
                <span className="text-[10px] uppercase tracking-[0.3em] text-stone-400 font-medium">
                  {category.name}
                </span>
                <div className="h-px flex-1 bg-stone-200 dark:bg-stone-700" />
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                {category.services.map((svc) => {
                  const isSelected = selectedId === svc.id
                  return (
                    <button
                      key={svc.id}
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
                      className={cn(
                        "relative text-left rounded-2xl border p-5 transition-all duration-300 hover:shadow-md",
                        isSelected
                          ? "border-stone-900 dark:border-stone-100 bg-stone-50 dark:bg-stone-800"
                          : "border-stone-200 dark:border-stone-700 bg-white dark:bg-stone-900 hover:border-stone-400 dark:hover:border-stone-500"
                      )}
                    >
                      <div className="flex items-start justify-between mb-3">
                        <h3 className="text-sm font-semibold text-stone-900 dark:text-stone-100 pr-2">
                          {svc.name}
                        </h3>
                        {svc.price > 0 && (
                          <span className="text-lg font-bold text-stone-900 dark:text-stone-100 shrink-0">
                            ${svc.price}
                          </span>
                        )}
                      </div>
                      {svc.description && (
                        <p className="text-xs text-stone-500 dark:text-stone-400 mb-3">
                          {svc.description}
                        </p>
                      )}
                      <ul className="space-y-1">
                        {svc.includes.map((item, i) => (
                          <li
                            key={i}
                            className="text-[11px] text-stone-500 dark:text-stone-400 flex items-start gap-2"
                          >
                            <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-stone-400 dark:bg-stone-500" />
                            {item}
                          </li>
                        ))}
                      </ul>
                      {svc.duration && (
                        <p className="text-[10px] text-stone-400 dark:text-stone-500 mt-3 uppercase tracking-wider">
                          Duración: {svc.duration}
                        </p>
                      )}
                      {!svc.homeService && (
                        <p className="text-[10px] text-amber-600 dark:text-amber-400 mt-1 uppercase tracking-wider">
                          Solo en estudio
                        </p>
                      )}
                    </button>
                  )
                })}
              </div>
            </div>
          )
        )}

        {/* UGC & Automaquillaje — redirect to WhatsApp */}
        <div>
          <div className="flex items-center gap-4 mb-6">
            <div className="h-px flex-1 bg-stone-200 dark:bg-stone-700" />
            <span className="text-[10px] uppercase tracking-[0.3em] text-stone-400 font-medium">
              UGC &amp; Automaquillaje
            </span>
            <div className="h-px flex-1 bg-stone-200 dark:bg-stone-700" />
          </div>
          <div className="grid md:grid-cols-2 gap-4">
            {SERVICE_CATEGORIES.filter(
              (c) => c.id === "ugc" || c.id === "automaquillaje"
            ).map((cat) => (
              <a
                key={cat.id}
                href={`https://api.whatsapp.com/send?phone=${WHATSAPP_NUMBER}&text=${
                  WHATSAPP_MESSAGE}${cat.id === "ugc" ? "UGC" : "automaquillaje"}`
                }
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between rounded-2xl border border-stone-200 dark:border-stone-700 bg-white dark:bg-stone-900 p-5 transition-all duration-300 hover:border-stone-400 dark:hover:border-stone-500 hover:shadow-md group"
              >
                <div>
                  <h3 className="text-sm font-semibold text-stone-900 dark:text-stone-100">
                    {cat.name}
                  </h3>
                  <p className="text-xs text-stone-500 dark:text-stone-400 mt-1">
                    Consulta presupuesto personalizado
                  </p>
                </div>
                <FaWhatsapp className="w-5 h-5 text-green-500 group-hover:scale-110 transition-transform duration-300" />
              </a>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
