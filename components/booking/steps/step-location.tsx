"use client"

import { useState, useEffect, useRef, useCallback } from "react"
import { createPortal } from "react-dom"
import dynamic from "next/dynamic"
import { motion, AnimatePresence, useReducedMotion } from "motion/react"
import { useBookingContext } from "@/components/booking/booking-context"
import { StepHeader } from "@/components/booking/step-header"
import type { LocationType } from "@/lib/types/booking.types"
import { Button } from "@/components/ui/button"
import { FaArrowLeft, FaArrowRight, FaCheck, FaMapMarkerAlt, FaSearch, FaSpinner, FaTimes } from "react-icons/fa"
import { toast } from "sonner"
import { cn } from "@/lib/utils"

const LocationPicker = dynamic(() => import("@/components/ui/location-picker").then((m) => m.LocationPicker), {
  ssr: false,
})

interface SearchResult {
  lat: string
  lon: string
  display_name: string
}

const EASE = [0.32, 0.72, 0, 1] as const

const LOCATION_OPTIONS: { value: LocationType; label: string; desc: string }[] = [
  { value: "studio", label: "En estudio", desc: "Te atendemos en nuestro espacio" },
  { value: "home", label: "A domicilio", desc: "Vamos a tu casa u hotel" },
  { value: "outOfCity", label: "Fuera de la ciudad", desc: "Disponible con costo adicional" },
]

export function StepLocation() {
  const { service, location, setLocation, prevStep, nextStep } = useBookingContext()
  const [type, setType] = useState<LocationType>(location?.type ?? "studio")
  const [address, setAddress] = useState(location?.address ?? "")
  const [reference, setReference] = useState(location?.reference ?? "")
  const [lat, setLat] = useState<number | undefined>(location?.lat)
  const [lng, setLng] = useState<number | undefined>(location?.lng)
  const reduce = useReducedMotion()

  const [searchResults, setSearchResults] = useState<SearchResult[]>([])
  const [searching, setSearching] = useState(false)
  const [showResults, setShowResults] = useState(false)
  const [dropdownStyle, setDropdownStyle] = useState<React.CSSProperties>({})
  const debounceRef = useRef<ReturnType<typeof setTimeout> | undefined>(undefined)
  const inputRef = useRef<HTMLInputElement>(null)
  const dropdownRef = useRef<HTMLUListElement>(null)

  useEffect(() => {
    if (location) {
      setType(location.type)
      setAddress(location.address ?? "")
      setReference(location.reference ?? "")
      setLat(location.lat)
      setLng(location.lng)
    }
  }, [location])

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (dropdownRef.current?.contains(e.target as Node)) return
      if (inputRef.current && !inputRef.current.parentElement?.contains(e.target as Node)) {
        setShowResults(false)
      }
    }
    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  const doSearch = useCallback(async (q: string) => {
    if (q.trim().length < 3) {
      setSearchResults([])
      setShowResults(false)
      return
    }
    setSearching(true)
    try {
      const res = await fetch(
        `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(q)}&limit=5&addressdetails=1&accept-language=es`,
        { headers: { "User-Agent": "LesleyGarciaBeauty/1.0" } }
      )
      if (res.ok) {
        const data: SearchResult[] = await res.json()
        setSearchResults(data)
        setShowResults(data.length > 0)
      }
    } catch {
    } finally {
      setSearching(false)
    }
  }, [])

  function updateDropdownPos() {
    if (inputRef.current) {
      const rect = inputRef.current.getBoundingClientRect()
      setDropdownStyle({
        position: "fixed",
        top: `${rect.bottom + 6}px`,
        left: `${rect.left}px`,
        width: `${rect.width}px`,
        zIndex: 99999,
      })
    }
  }

  function handleAddressInput(value: string) {
    setAddress(value)
    if (debounceRef.current) clearTimeout(debounceRef.current)
    debounceRef.current = setTimeout(() => { doSearch(value); updateDropdownPos() }, 350)
  }

  async function handleSelectResult(r: SearchResult) {
    const newLat = parseFloat(r.lat)
    const newLng = parseFloat(r.lon)
    setLat(newLat)
    setLng(newLng)
    setAddress(r.display_name)
    setShowResults(false)
  }

  function handlePositionChange(pos: { lat: number; lng: number }, displayName: string) {
    setLat(pos.lat)
    setLng(pos.lng)
    setAddress(displayName)
  }

  function handleContinue() {
    if (!service) return
    if (type === "studio") {
      setLocation({ type: "studio", address: "", reference: "" })
      nextStep()
      return
    }
    if (type === "home" && !service.homeService) {
      toast.error("Este servicio no está disponible a domicilio. Selecciona otra ubicación o elige otro servicio.")
      return
    }
    if (!address.trim()) {
      toast.error("Por favor selecciona la ubicación en el mapa o ingresa la dirección")
      return
    }
    setLocation({ type, address: address.trim(), reference: reference.trim(), lat, lng })
    nextStep()
  }

  const canHaveHome = service?.homeService ?? true
  const needsAddress = type === "home" || type === "outOfCity"

  return (
    <div>
      <StepHeader
        index={2}
        eyebrow="Ubicación"
        title={
          <>
            ¿Dónde te <span className="font-normal italic text-stone-500">atendemos</span>?
          </>
        }
        description={
          service?.name
            ? `${service.name.replace(/^Paquete de /i, "").replace(/^Paquete /i, "")} — elige la modalidad que prefieras.`
            : "Elige la modalidad que prefieras."
        }
      />

      <div className="mb-6 grid gap-2 sm:grid-cols-3">
        {LOCATION_OPTIONS.map((opt) => {
          const disabled = opt.value === "home" && !canHaveHome
          const isActive = type === opt.value
          return (
            <div
              key={opt.value}
              className={cn(
                "rounded-[1.25rem] p-1 transition-all duration-500",
                isActive
                  ? "bg-stone-900/8 ring-1 ring-stone-900/20"
                  : "bg-stone-100 ring-1 ring-stone-200",
                !isActive && !disabled && "hover:bg-stone-200",
                disabled && "opacity-40"
              )}
            >
              <button
                type="button"
                disabled={disabled}
                onClick={() => { setType(opt.value) }}
                className="flex h-full w-full flex-col rounded-[calc(1.25rem-0.25rem)] bg-white p-4 text-left transition-all duration-500 disabled:cursor-not-allowed"
              >
                <span className="mb-3 flex items-center justify-between">
                  <span
                    className={cn(
                      "flex h-8 w-8 items-center justify-center rounded-full transition-colors duration-500",
                      isActive ? "bg-stone-900 text-white" : "bg-stone-100 text-stone-500/60"
                    )}
                  >
                    <FaMapMarkerAlt className="h-3.5 w-3.5" />
                  </span>
                  {isActive && (
                    <span className="flex h-5 w-5 items-center justify-center rounded-full bg-stone-700 text-white">
                      <FaCheck className="h-2.5 w-2.5" />
                    </span>
                  )}
                </span>
                <span className="font-sans text-[13px] font-bold text-stone-900">{opt.label}</span>
                <span className="mt-0.5 font-sans text-[10px] leading-relaxed text-stone-500/60">
                  {opt.desc}
                </span>
                {disabled && (
                  <span className="mt-2 font-sans text-[9px] font-bold uppercase tracking-[0.12em] text-stone-500">
                    Solo en estudio
                  </span>
                )}
              </button>
            </div>
          )
        })}
      </div>

      <AnimatePresence initial={false}>
        {needsAddress && (
          <motion.div
            key="address-fields"
            initial={reduce ? { opacity: 0 } : { opacity: 0, y: 16, filter: "blur(4px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            exit={reduce ? { opacity: 0 } : { opacity: 0, y: -12, filter: "blur(4px)" }}
            transition={{ duration: 0.5, ease: EASE }}
            className="mb-6 space-y-4"
          >
            <div>
              <label className="mb-2 block font-sans text-[10px] font-bold uppercase tracking-[0.15em] text-stone-500">
                Dirección completa
              </label>
              <div className="relative">
                <FaSearch className="pointer-events-none absolute left-5 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-stone-500/40" />
                <input
                  ref={inputRef}
                  type="text"
                  value={address}
                  onChange={(e) => handleAddressInput(e.target.value)}
                  onFocus={() => { if (searchResults.length > 0) { updateDropdownPos(); setShowResults(true) } }}
                  placeholder="Busca una dirección o haz clic en el mapa..."
                  className="h-12 w-full rounded-full border border-stone-300 bg-white pl-11 pr-11 font-sans text-sm text-stone-900 transition-all placeholder:text-stone-400/60 hover:border-stone-400 focus:border-stone-500 focus:outline-none focus:ring-2 focus:ring-stone-500/10"
                />
                {searching ? (
                  <FaSpinner className="absolute right-5 top-1/2 h-3.5 w-3.5 -translate-y-1/2 animate-spin text-stone-500" />
                ) : address ? (
                  <button
                    type="button"
                    onClick={() => { setAddress(""); setSearchResults([]); setShowResults(false) }}
                    className="absolute right-5 top-1/2 -translate-y-1/2 text-stone-500/40 transition-colors hover:text-stone-900"
                  >
                    <FaTimes className="h-3 w-3" />
                  </button>
                ) : null}
              </div>
            </div>

            {showResults && typeof window === "object" && createPortal(
              <ul
                ref={dropdownRef}
                style={dropdownStyle}
                className="overflow-hidden rounded-[1.25rem] border border-stone-200 bg-white shadow-xl shadow-black/[0.06]"
              >
                {searchResults.map((r, i) => (
                  <li
                    key={i}
                    role="button"
                    tabIndex={0}
                    onClick={() => handleSelectResult(r)}
                    onKeyDown={(e) => { if (e.key === "Enter") handleSelectResult(r) }}
                    className="cursor-pointer border-b border-stone-100 px-5 py-3.5 text-xs leading-relaxed text-stone-900/80 transition-colors last:border-0 hover:bg-stone-50"
                  >
                    <p className="line-clamp-2">{r.display_name}</p>
                  </li>
                ))}
              </ul>,
              document.body
            )}

            <div className="rounded-[1.5rem] bg-stone-100 p-1.5 ring-1 ring-stone-200">
              <div className="overflow-hidden rounded-[calc(1.5rem-0.25rem)]">
                <LocationPicker
                  position={lat && lng ? { lat, lng } : null}
                  onPositionChange={handlePositionChange}
                />
              </div>
            </div>

            {lat && lng && (
              <p className="text-center font-sans text-[10px] tracking-[0.08em] text-stone-500/40">
                {lat.toFixed(6)}, {lng.toFixed(6)}
              </p>
            )}

            <div>
              <label className="mb-2 block font-sans text-[10px] font-bold uppercase tracking-[0.15em] text-stone-500">
                Referencia
              </label>
              <input
                value={reference}
                onChange={(e) => setReference(e.target.value)}
                placeholder="Ej: cerca del parque, edificio azul..."
                className="h-12 w-full rounded-full border border-stone-300 bg-white px-5 font-sans text-sm text-stone-900 transition-all placeholder:text-stone-400/60 hover:border-stone-400 focus:border-stone-500 focus:outline-none focus:ring-2 focus:ring-stone-500/10"
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="flex gap-3">
        <Button
          type="button"
          variant="outline"
          onClick={prevStep}
          className="group h-12 flex-1 rounded-full border-stone-300 bg-transparent font-sans text-sm font-semibold text-stone-900 transition-all duration-700 ease-[cubic-bezier(0.32,0.72,0,1)] hover:bg-stone-50"
        >
          <span className="flex items-center justify-center gap-2">
            <FaArrowLeft className="h-3.5 w-3.5 transition-transform duration-300 group-hover:-translate-x-0.5" />
            Atrás
          </span>
        </Button>
        <Button
          type="button"
          onClick={handleContinue}
          className="group h-12 flex-1 rounded-full bg-stone-900 font-sans text-sm font-semibold text-white transition-all duration-700 ease-[cubic-bezier(0.32,0.72,0,1)] hover:bg-stone-700 active:scale-[0.98]"
        >
          <span className="flex items-center justify-center gap-2">
            Continuar
            <span className="flex h-6 w-6 items-center justify-center rounded-full bg-white/10 transition-transform duration-700 ease-[cubic-bezier(0.32,0.72,0,1)] group-hover:translate-x-0.5">
              <FaArrowRight className="h-3 w-3" />
            </span>
          </span>
        </Button>
      </div>
    </div>
  )
}
