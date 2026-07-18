"use client"

import { useState, useEffect, useRef, useCallback } from "react"
import { createPortal } from "react-dom"
import dynamic from "next/dynamic"
import { useBookingContext } from "@/components/booking/booking-context"
import type { LocationType } from "@/lib/types/booking.types"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { FaArrowLeft, FaArrowRight, FaMapMarkerAlt, FaSearch, FaSpinner, FaTimes } from "react-icons/fa"
import { cn } from "@/lib/utils"

const LocationPicker = dynamic(() => import("@/components/ui/location-picker").then((m) => m.LocationPicker), {
  ssr: false,
})

interface SearchResult {
  lat: string
  lon: string
  display_name: string
}

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
  const [lat, setLat] = useState<number | undefined>(location?.lat)
  const [lng, setLng] = useState<number | undefined>(location?.lng)
  const [error, setError] = useState<string | null>(null)

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
      // silent
    } finally {
      setSearching(false)
    }
  }, [])

  function updateDropdownPos() {
    if (inputRef.current) {
      const rect = inputRef.current.getBoundingClientRect()
      setDropdownStyle({
        position: "fixed",
        top: `${rect.bottom + 4}px`,
        left: `${rect.left}px`,
        width: `${rect.width}px`,
        zIndex: 99999,
      })
    }
  }

  function handleAddressInput(value: string) {
    setAddress(value)
    setError(null)
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
    setError(null)
  }

  function handlePositionChange(pos: { lat: number; lng: number }, displayName: string) {
    setLat(pos.lat)
    setLng(pos.lng)
    setAddress(displayName)
    setError(null)
  }

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
      setError("Por favor selecciona la ubicación en el mapa o ingresa la dirección")
      return
    }

    setLocation({ type, address: address.trim(), reference: reference.trim(), lat, lng })
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
          {/* Address field with autocomplete */}
          <div>
            <Label className="text-[11px] font-medium uppercase tracking-widest text-stone-500 dark:text-stone-400 mb-1.5 block">
              Dirección completa
            </Label>
            <div className="relative">
              <FaSearch className="absolute left-3.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-stone-400 pointer-events-none" />
              <input
                ref={inputRef}
                type="text"
                value={address}
                onChange={(e) => handleAddressInput(e.target.value)}
                onFocus={() => { if (searchResults.length > 0) { updateDropdownPos(); setShowResults(true) } }}
                placeholder="Busca una dirección o haz clic en el mapa..."
                className="w-full h-12 pl-10 pr-9 text-sm rounded-xl border border-stone-200 dark:border-stone-700 bg-white dark:bg-stone-900/80 text-stone-900 dark:text-stone-100 placeholder:text-stone-400 dark:placeholder:text-stone-500 focus:outline-none focus:ring-2 focus:ring-stone-900/10 dark:focus:ring-stone-100/10 focus:border-stone-400 dark:focus:border-stone-500 transition-all"
              />
              {searching ? (
                <FaSpinner className="absolute right-3.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-stone-400 animate-spin" />
              ) : address ? (
                <button
                  type="button"
                  onClick={() => { setAddress(""); setSearchResults([]); setShowResults(false) }}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-600 dark:hover:text-stone-300"
                >
                  <FaTimes className="w-3 h-3" />
                </button>
              ) : null}
            </div>
          </div>

          {/* Dropdown via portal (above map) */}
          {showResults && typeof window === "object" && createPortal(
            <ul ref={dropdownRef} style={dropdownStyle} className="bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-700 rounded-xl shadow-xl max-h-60 overflow-y-auto">
              {searchResults.map((r, i) => (
                <li
                  key={i}
                  role="button"
                  tabIndex={0}
                  onClick={() => handleSelectResult(r)}
                  onKeyDown={(e) => { if (e.key === "Enter") handleSelectResult(r) }}
                  className="px-4 py-3 text-xs text-stone-700 dark:text-stone-300 cursor-pointer hover:bg-stone-100 dark:hover:bg-stone-800 border-b border-stone-100 dark:border-stone-800 last:border-0 transition-colors"
                >
                  <p className="line-clamp-2">{r.display_name}</p>
                </li>
              ))}
            </ul>,
            document.body
          )}

          {/* Map */}
          <LocationPicker
            position={lat && lng ? { lat, lng } : null}
            onPositionChange={handlePositionChange}
          />

          {/* Coordinates */}
          {lat && lng && (
            <p className="text-[11px] text-stone-400 dark:text-stone-500 text-center">
              Coordenadas: {lat.toFixed(6)}, {lng.toFixed(6)}
            </p>
          )}

          {/* Reference */}
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
