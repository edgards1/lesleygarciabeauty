import { getDb, initModels, Business, BUSINESS_SLUG } from "@/lib/database/connection"
import { auth } from "@/lib/auth"
import { redirect } from "next/navigation"

// TODO: Cache Components adoption. Refactor this route so this opt-out can be removed.
export const dynamic = "force-dynamic"

export default async function AdminCalendarPage() {
  const session = await auth()
  if (!session) redirect("/admin/login")

  const db = getDb()
  initModels(db)

  const business = await Business.findOne({ where: { slug: BUSINESS_SLUG } })

  return (
    <div className="max-w-2xl mx-auto px-5 py-10">
      <a
        href="/admin"
        className="text-xs text-stone-400 hover:text-stone-600 dark:hover:text-stone-300 mb-6 inline-block"
      >
        ← Volver al panel
      </a>

      <h1 className="text-2xl font-serif text-stone-900 dark:text-stone-100 mb-8">
        Google Calendar
      </h1>

      <div className="rounded-2xl border border-stone-200 dark:border-stone-700 p-6">
        {business?.googleRefreshToken ? (
          <div>
            <div className="flex items-center gap-2 mb-4">
              <span className="w-2 h-2 rounded-full bg-green-500" />
              <p className="text-sm text-stone-900 dark:text-stone-100 font-medium">
                Conectado{business.googleCalendarEmail ? ` como ${business.googleCalendarEmail}` : ""}
              </p>
            </div>
            <p className="text-xs text-stone-400 mb-6">
              El calendario se conectó al iniciar sesión con Google.
              Las citas se sincronizan automáticamente.
            </p>
            <form
              action={async () => {
                "use server"
                const db = getDb()
                initModels(db)
                await Business.update(
                  { googleRefreshToken: null, googleCalendarEmail: null },
                  { where: { slug: BUSINESS_SLUG } }
                )
                redirect("/admin/calendar")
              }}
            >
              <button className="h-11 px-5 rounded-xl border border-red-200 dark:border-red-700 text-red-600 dark:text-red-400 text-sm hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors">
                Desconectar calendario
              </button>
            </form>
          </div>
        ) : (
          <div>
            <div className="flex items-center gap-2 mb-4">
              <span className="w-2 h-2 rounded-full bg-stone-300" />
              <p className="text-sm text-stone-900 dark:text-stone-100 font-medium">
                No conectado
              </p>
            </div>
            <p className="text-xs text-stone-400">
              Inicia sesión con Google para conectar el calendario automáticamente.
            </p>
          </div>
        )}
      </div>
    </div>
  )
}
