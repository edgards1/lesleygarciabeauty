import Link from "next/link"
import { auth, signOut } from "@/lib/auth"
import { getDb, initModels, Cita, Business, BUSINESS_SLUG } from "@/lib/database/connection"

// TODO: Cache Components adoption. Refactor this route so this opt-out can be removed.
export const dynamic = "force-dynamic"

export default async function AdminDashboard() {
  const session = await auth()

  const db = getDb()
  initModels(db)

  const business = await Business.findOne({ where: { slug: BUSINESS_SLUG } })

  const totalCitas = await Cita.count({
    where: { negocioId: business?.id },
  })

  const pendientesRevision = await Cita.count({
    where: { negocioId: business?.id, estado: "pendiente_de_revision" },
  })

  const proximasCitas = await Cita.findAll({
    where: { negocioId: business?.id, estado: ["pendiente", "confirmada"] },
    order: [["fecha", "ASC"]],
    limit: 10,
  })

  const statusColors: Record<string, string> = {
    confirmada: "bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400",
    pendiente: "bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-400",
    pendiente_de_revision: "bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-400",
    cancelada: "bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400",
    completada: "bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400",
  }

  return (
    <div className="max-w-4xl mx-auto px-5 py-10">
      <div className="flex items-center justify-between mb-10">
        <h1 className="text-2xl font-serif text-stone-900 dark:text-stone-100">
          Panel de Administración
        </h1>
        <form
          action={async () => {
            "use server"
            await signOut()
          }}
        >
          <button className="text-xs text-stone-400 hover:text-stone-600 dark:hover:text-stone-300 underline">
            Cerrar sesión
          </button>
        </form>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-10">
        <div className="rounded-2xl border border-stone-200 dark:border-stone-700 p-5">
          <p className="text-xs text-stone-400 uppercase tracking-wider mb-1">Total Citas</p>
          <p className="text-3xl font-serif text-stone-900 dark:text-stone-100">{totalCitas}</p>
        </div>
        <Link href="/admin/revision">
          <div className="rounded-2xl border border-stone-200 dark:border-stone-700 p-5 hover:border-purple-400 dark:hover:border-purple-500 transition-colors cursor-pointer relative">
            <p className="text-xs text-stone-400 uppercase tracking-wider mb-1">
              Pendientes de revisión
            </p>
            <p className="text-3xl font-serif text-stone-900 dark:text-stone-100">
              {pendientesRevision}
            </p>
            {pendientesRevision > 0 && (
              <span className="absolute -top-1.5 -right-1.5 w-3 h-3 bg-purple-500 rounded-full animate-pulse" />
            )}
          </div>
        </Link>
        <Link href="/admin/calendar">
          <div className="rounded-2xl border border-stone-200 dark:border-stone-700 p-5 hover:border-stone-400 dark:hover:border-stone-500 transition-colors cursor-pointer">
            <p className="text-xs text-stone-400 uppercase tracking-wider mb-1">
              Google Calendar
            </p>
            <p className="text-sm font-medium text-stone-900 dark:text-stone-100">
              {business?.googleCalendarEmail
                ? "Conectado"
                : "Conectar ahora"}
            </p>
          </div>
        </Link>
      </div>

      <div>
        <h2 className="text-sm font-semibold text-stone-900 dark:text-stone-100 mb-4">
          Próximas citas
        </h2>
        {proximasCitas.length === 0 ? (
          <p className="text-sm text-stone-400">No hay citas próximas</p>
        ) : (
          <div className="space-y-2">
            {proximasCitas.map((cita) => (
              <div
                key={cita.id}
                className="rounded-xl border border-stone-200 dark:border-stone-700 p-4 text-sm"
              >
                <div className="flex items-center justify-between">
                  <span className="font-medium text-stone-900 dark:text-stone-100">
                    {cita.servicioNombre}
                  </span>
                  <span
                    className={`text-[11px] uppercase tracking-wider px-2 py-0.5 rounded-full ${statusColors[cita.estado] || "bg-stone-100 text-stone-600"}`}
                  >
                    {cita.estado === "pendiente_de_revision" ? "Revisión" : cita.estado}
                  </span>
                </div>
                <p className="text-stone-400 text-xs mt-1">
                  {cita.fecha} — {cita.horaInicio}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
