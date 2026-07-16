"use client"

import { useEffect, useRef } from "react"
import { MapContainer, TileLayer, Marker, useMapEvents, useMap } from "react-leaflet"
import L from "leaflet"
import "leaflet/dist/leaflet.css"

interface Position {
  lat: number
  lng: number
}

interface LocationPickerProps {
  position: Position | null
  onPositionChange: (pos: Position, address: string) => void
}

const markerIcon = new L.DivIcon({
  className: "",
  html: `<div style="width:32px;height:32px;background:#1c1917;border:3px solid white;border-radius:50%;box-shadow:0 4px 12px rgba(0,0,0,0.3);transform:translate(-50%,-50%)"></div>`,
  iconSize: [32, 32],
  iconAnchor: [16, 16],
})

function MapController({ position }: { position: Position | null }) {
  const map = useMap()
  const initialized = useRef(false)

  useEffect(() => {
    if (position && !initialized.current) {
      map.setView([position.lat, position.lng], 16, { animate: true })
      initialized.current = true
    }
  }, [position, map])

  return null
}

function MapClickHandler({
  onPositionChange,
}: {
  onPositionChange: (pos: Position, address: string) => void
}) {
  useMapEvents({
    async click(e) {
      const { lat, lng } = e.latlng
      const res = await fetch(
        `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}&addressdetails=1&accept-language=es`,
        { headers: { "User-Agent": "LesleyGarciaBeauty/1.0" } }
      )
      if (res.ok) {
        const data = await res.json()
        const addr = data.address || {}
        const parts: string[] = []
        if (addr.house_number && addr.road) parts.push(`${addr.road} ${addr.house_number}`)
        else if (addr.road) parts.push(addr.road)
        else if (addr.hamlet || addr.village || addr.town || addr.city) parts.push(addr.hamlet || addr.village || addr.town || addr.city)
        if (addr.suburb && !parts.some((p) => p.includes(addr.suburb))) parts.push(addr.suburb)
        if (addr.city || addr.town || addr.village) {
          const city = addr.city || addr.town || addr.village
          if (!parts.some((p) => p.includes(city))) parts.push(city)
        }
        onPositionChange({ lat, lng }, parts.length > 0 ? parts.join(", ") : `${lat.toFixed(6)}, ${lng.toFixed(6)}`)
      } else {
        onPositionChange({ lat, lng }, `${lat.toFixed(6)}, ${lng.toFixed(6)}`)
      }
    },
  })
  return null
}

function DraggableMarker({
  position,
  onPositionChange,
}: {
  position: Position
  onPositionChange: (pos: Position, address: string) => void
}) {
  const markerRef = useRef<L.Marker>(null)

  return (
    <Marker
      ref={markerRef}
      position={[position.lat, position.lng]}
      icon={markerIcon}
      draggable={true}
      eventHandlers={{
        async dragend(e) {
          const marker = e.target
          const latlng = marker.getLatLng()
          const { lat, lng } = latlng
          const res = await fetch(
            `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}&addressdetails=1&accept-language=es`,
            { headers: { "User-Agent": "LesleyGarciaBeauty/1.0" } }
          )
          if (res.ok) {
            const data = await res.json()
            const addr = data.address || {}
            const parts: string[] = []
            if (addr.house_number && addr.road) parts.push(`${addr.road} ${addr.house_number}`)
            else if (addr.road) parts.push(addr.road)
            else if (addr.hamlet || addr.village || addr.town || addr.city) parts.push(addr.hamlet || addr.village || addr.town || addr.city)
            if (addr.suburb && !parts.some((p) => p.includes(addr.suburb))) parts.push(addr.suburb)
            if (addr.city || addr.town || addr.village) {
              const city = addr.city || addr.town || addr.village
              if (!parts.some((p) => p.includes(city))) parts.push(city)
            }
            onPositionChange({ lat, lng }, parts.length > 0 ? parts.join(", ") : `${lat.toFixed(6)}, ${lng.toFixed(6)}`)
          } else {
            onPositionChange({ lat, lng }, `${lat.toFixed(6)}, ${lng.toFixed(6)}`)
          }
        },
      }}
    />
  )
}

export function LocationPicker({ position, onPositionChange }: LocationPickerProps) {
  return (
    <div className="w-full h-64 rounded-xl overflow-hidden border border-stone-200 dark:border-stone-700">
      <MapContainer
        center={[-2.206, -79.897]}
        zoom={13}
        className="w-full h-full"
        zoomControl={true}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <MapController position={position} />
        <MapClickHandler onPositionChange={onPositionChange} />
        {position && (
          <DraggableMarker position={position} onPositionChange={onPositionChange} />
        )}
      </MapContainer>
    </div>
  )
}
