"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
interface Cliente {
  id: string
  name: string
  email: string
  phone: string
}

interface CitaPendiente {
  id: string
  servicioNombre: string
  servicioPrecio: number
  servicioCategoria: string
  fecha: string
  horaInicio: string
  horaFin: string
  montoPagado: number
  porcentaje: number
  codigoSeguimiento: string
  comprobanteArchivo: string
  tipoUbicacion: string
  direccion: string | null
  referencia: string | null
  estado: string
  creadoEn: string
  cliente: Cliente | null
}

function getDriveEmbedUrl(link: string): string {
  const match = link.match(/\/d\/([a-zA-Z0-9_-]+)/)
  if (match) {
    return `https://drive.google.com/uc?export=view&id=${match[1]}`
  }
  return link
}

const LOCATION_LABELS: Record<string, string> = {
  studio: "En estudio",
  home: "A domicilio",
  outOfCity: "Fuera de la ciudad",
}

export default function RevisionPage() {
  const router = useRouter()
  const [citas, setCitas] = useState<CitaPendiente[]>([])
  const [loading, setLoading] = useState(true)
  const [actionLoading, setActionLoading] = useState<string | null>(null)
  const [approvedLink, setApprovedLink] = useState<string | null>(null)

  useEffect(() => {
    if (approvedLink) {
      const timer = setTimeout(() => setApprovedLink(null), 15000)
      return () => clearTimeout(timer)
    }
  }, [approvedLink])

  useEffect(() => {
    fetch("/api/admin/pending-reviews")
      .then((res) => {
        if (res.status === 401) {
          router.push("/admin/login")
          return null
        }
        return res.json()
      })
      .then((data) => {
        if (data) setCitas(data.citas)
      })
      .catch(console.error)
      .finally(() => setLoading(false))
  }, [router])

  async function handleAction(citaId: string, action: "approve" | "reject") {
    setActionLoading(citaId)
    try {
      const res = await fetch("/api/admin/review-booking", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ citaId, action }),
      })
      const data = await res.json()
      if (data.success) {
        setCitas((prev) => prev.filter((c) => c.id !== citaId))
        if (data.whatsappLink) {
          setApprovedLink(data.whatsappLink)
        }
      } else {
        alert(data.error || "Error al procesar")
      }
    } catch {
      alert("Error de red")
    } finally {
      setActionLoading(null)
    }
  }

  if (loading) {
    return (
      <div className="max-w-4xl mx-auto px-5 py-10">
        <p className="text-stone-500">Cargando...</p>
      </div>
    )
  }

  return (
    <div className="max-w-4xl mx-auto px-5 py-10">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-2xl font-serif text-stone-900 dark:text-stone-100">
          Revisión de Comprobantes
        </h1>
        <button
          onClick={() => router.push("/admin")}
          className="text-xs text-stone-400 hover:text-stone-600 underline"
        >
          Volver al panel
        </button>
      </div>

      {approvedLink && (
        <div className="rounded-2xl border border-green-200 dark:border-green-700 bg-green-50 dark:bg-green-900/20 p-5 mb-6">
          <p className="text-sm font-medium text-green-800 dark:text-green-300 mb-2">
            ✅ Cita aprobada — enviá la confirmación por WhatsApp
          </p>
          <p className="text-xs text-green-600 dark:text-green-400 mb-3">
            El correo de confirmación ya fue enviado al cliente. Abrí WhatsApp para notificarle manualmente:
          </p>
          <a
            href={approvedLink}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-xl bg-green-600 hover:bg-green-700 text-white text-sm font-medium px-5 py-2.5 transition-colors"
          >
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
            Abrir WhatsApp
          </a>
        </div>
      )}

      {citas.length === 0 ? (
        <div className="rounded-2xl border border-stone-200 dark:border-stone-700 p-8 text-center">
          <p className="text-stone-400 text-sm">
            No hay comprobantes pendientes de revisión
          </p>
        </div>
      ) : (
        <div className="space-y-6">
          {citas.map((cita) => (
            <div
              key={cita.id}
              className="rounded-2xl border border-stone-200 dark:border-stone-700 overflow-hidden"
            >
              <div className="grid grid-cols-1 md:grid-cols-2">
                <div className="p-5 space-y-3">
                  <div>
                    <span className="text-xs text-stone-400 uppercase tracking-wider">Cliente</span>
                    <p className="font-medium text-stone-900 dark:text-stone-100">
                      {cita.cliente?.name || "Sin nombre"}
                    </p>
                    <p className="text-xs text-stone-500">{cita.cliente?.email}</p>
                    <p className="text-xs text-stone-500">{cita.cliente?.phone}</p>
                  </div>

                  <div>
                    <span className="text-xs text-stone-400 uppercase tracking-wider">Servicio</span>
                    <p className="text-sm font-medium text-stone-900 dark:text-stone-100">
                      {cita.servicioNombre}
                    </p>
                    <p className="text-xs text-stone-500">
                      ${cita.servicioPrecio} — {cita.servicioCategoria}
                    </p>
                  </div>

                  <div>
                    <span className="text-xs text-stone-400 uppercase tracking-wider">Fecha y hora</span>
                    <p className="text-sm text-stone-900 dark:text-stone-100">
                      {cita.fecha} — {cita.horaInicio} a {cita.horaFin}
                    </p>
                  </div>

                  <div>
                    <span className="text-xs text-stone-400 uppercase tracking-wider">Pago</span>
                    <p className="text-sm text-stone-900 dark:text-stone-100">
                      ${cita.montoPagado} ({cita.porcentaje}%)
                    </p>
                    <p className="text-xs text-stone-500">
                      Código: {cita.codigoSeguimiento}
                    </p>
                  </div>

                  <div>
                    <span className="text-xs text-stone-400 uppercase tracking-wider">Ubicación</span>
                    <p className="text-sm text-stone-900 dark:text-stone-100">
                      {LOCATION_LABELS[cita.tipoUbicacion] || cita.tipoUbicacion}
                    </p>
                    {cita.direccion && (
                      <p className="text-xs text-stone-500">{cita.direccion}{cita.referencia ? ` (${cita.referencia})` : ""}</p>
                    )}
                  </div>

                  <div className="flex gap-3 pt-2">
                    <button
                      onClick={() => handleAction(cita.id, "approve")}
                      disabled={actionLoading === cita.id}
                      className="flex-1 rounded-xl bg-green-600 hover:bg-green-700 disabled:opacity-50 text-white text-sm font-medium py-2.5 transition-colors"
                    >
                      {actionLoading === cita.id ? "Procesando..." : "✓ Aprobar"}
                    </button>
                    <button
                      onClick={() => handleAction(cita.id, "reject")}
                      disabled={actionLoading === cita.id}
                      className="flex-1 rounded-xl bg-red-500 hover:bg-red-600 disabled:opacity-50 text-white text-sm font-medium py-2.5 transition-colors"
                    >
                      {actionLoading === cita.id ? "Procesando..." : "✕ Rechazar"}
                    </button>
                  </div>
                </div>

                <div className="bg-stone-50 dark:bg-stone-900/50 p-5 flex items-center justify-center min-h-[300px]">
                  {cita.comprobanteArchivo.startsWith("http") ? (
                    <img
                      src={getDriveEmbedUrl(cita.comprobanteArchivo)}
                      alt="Comprobante de pago"
                      className="max-w-full max-h-[300px] object-contain rounded-xl"
                    />
                  ) : (
                    <p className="text-xs text-stone-400 text-center">
                      {cita.comprobanteArchivo}
                    </p>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
