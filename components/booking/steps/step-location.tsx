"use client"

import { useState, useEffect } from "react"
import { useBookingContext } from "@/components/booking/booking-context"
import type { LocationType } from "@/lib/types/booking.types"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { FaArrowLeft, FaArrowRight, FaMapMarkerAlt } from "react-icons/fa"
import { cn } from "@/lib/utils"

const LOCATION_OPTIONS: { value: LocationType; label: string; desc: string }[] = [
  { value: "studio", label: "En estudio", desc: "Te atenderemos en nuestro espacio" },
  { value: "home", label: "A domicilio", desc: "Vamos a tu casa u hotel" },
  { value: "outOfCity", label: "Fuera de la ciudad", desc: "Disponible con costo adicional" },
]

export function StepLocation() {
  const { service, location, setLocation, prevStep, nextStep } = useBookingContext()
  const [type, setType] = useState<LocationType>(location?.type ?? "studio")
  const [address, setAddress] = useState(location?.address ?? "")
  const [reference, setReference] = useState(location?.reference ?? "")
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (location) {
      setType(location.type)
      setAddress(location.address ?? "")
      setReference(location.reference ?? "")
    }
  }, [location])

  function handleContinue() {
    if (!service) return

    if (type === "studio") {
      setLocation({ type: "studio", address: "", reference: "" })
      nextStep()
      return
    }

    if (type === "home" && !service.homeService) {
      setError("Este servicio no está disponible a domicilio. Selecciona otra ubicación o elige otro servicio.")
      return
    }

    if (!address.trim()) {
      setError("Por favor ingresa la dirección completa")
      return
    }

    setLocation({ type, address: address.trim(), reference: reference.trim() })
    nextStep()
  }

  const canHaveHome = service?.homeService ?? true

  return (
    <div className="max-w-lg mx-auto">
      <div className="text-center mb-10">
        <h2 className="text-3xl font-serif text-stone-900 dark:text-stone-100 mb-3">
          ¿Dónde te atiendes?
        </h2>
        <p className="text-sm text-stone-500 dark:text-stone-400">
          {service?.name && (
            <span className="text-stone-700 dark:text-stone-300 font-medium">{service.name}</span>
          )}
          &nbsp;— Elige la modalidad
        </p>
      </div>

      <div className="space-y-3 mb-8">
        {LOCATION_OPTIONS.map((opt) => {
          const disabled = opt.value === "home" && !canHaveHome
          return (
            <button
              key={opt.value}
              type="button"
              disabled={disabled}
              onClick={() => { setType(opt.value); setError(null) }}
              className={cn(
                "w-full text-left rounded-2xl border p-5 transition-all duration-300",
                type === opt.value
                  ? "border-stone-900 dark:border-stone-100 bg-stone-50 dark:bg-stone-800"
                  : "border-stone-200 dark:border-stone-700 bg-white dark:bg-stone-900 hover:border-stone-400 dark:hover:border-stone-500",
                disabled && "opacity-40 cursor-not-allowed"
              )}
            >
              <div className="flex items-center gap-3">
                <FaMapMarkerAlt
                  className={cn(
                    "w-4 h-4",
                    type === opt.value
                      ? "text-stone-900 dark:text-stone-100"
                      : "text-stone-400"
                  )}
                />
                <div>
                  <p className="text-sm font-medium text-stone-900 dark:text-stone-100">
                    {opt.label}
                  </p>
                  <p className="text-xs text-stone-500 dark:text-stone-400">
                    {opt.desc}
                  </p>
                </div>
              </div>
            </button>
          )
        })}
      </div>

      {(type === "home" || type === "outOfCity") && (
        <div className="space-y-4 mb-8">
          <p className="text-xs text-stone-400 dark:text-stone-500 flex items-center gap-2">
            <FaMapMarkerAlt className="w-3 h-3" />
            Selecciona la ubicación en el mapa o escribe la dirección
          </p>
          <div className="w-full h-48 bg-stone-100 dark:bg-stone-800 rounded-xl flex items-center justify-center border border-stone-200 dark:border-stone-700">
            <p className="text-xs text-stone-400 dark:text-stone-500">
              Mapa — Requiere API key de Google Maps
            </p>
          </div>
          <div>
            <Label className="text-[11px] font-medium uppercase tracking-widest text-stone-500 dark:text-stone-400">
              Dirección completa
            </Label>
            <Input
              value={address}
              onChange={(e) => { setAddress(e.target.value); setError(null) }}
              placeholder="Calle, número, ciudad, sector..."
              className="bg-white dark:bg-stone-900/80 border-stone-200 dark:border-stone-700 h-12 rounded-xl text-sm mt-1.5"
            />
          </div>
          <div>
            <Label className="text-[11px] font-medium uppercase tracking-widest text-stone-500 dark:text-stone-400">
              Referencia
            </Label>
            <Input
              value={reference}
              onChange={(e) => setReference(e.target.value)}
              placeholder="Ej: cerca del parque, edificio azul..."
              className="bg-white dark:bg-stone-900/80 border-stone-200 dark:border-stone-700 h-12 rounded-xl text-sm mt-1.5"
            />
          </div>
        </div>
      )}

      {error && (
        <p className="text-xs text-red-500 dark:text-red-400 mb-4 text-center">{error}</p>
      )}

      <div className="flex gap-3">
        <Button
          type="button"
          variant="outline"
          onClick={prevStep}
          className="flex-1 h-12 rounded-xl text-sm border-stone-200 dark:border-stone-700"
        >
          <FaArrowLeft className="w-3.5 h-3.5 mr-2" />
          Atrás
        </Button>
        <Button
          type="button"
          onClick={handleContinue}
          className="flex-1 bg-stone-900 hover:bg-stone-800 dark:bg-stone-100 dark:hover:bg-stone-200 text-white dark:text-stone-900 h-12 rounded-xl text-sm group"
        >
          <span className="flex items-center justify-center gap-2">
            Continuar
            <FaArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform duration-300" />
          </span>
        </Button>
      </div>
    </div>
  )
}
