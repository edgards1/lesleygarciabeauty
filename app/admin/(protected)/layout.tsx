import { auth } from "@/lib/auth"
import { redirect } from "next/navigation"
import Link from "next/link"

const NAV_LINKS = [
  { href: "/admin", label: "Dashboard" },
  { href: "/admin/servicios", label: "Servicios" },
  { href: "/admin/horarios", label: "Horarios" },
  { href: "/admin/configuracion", label: "Configuración" },
  { href: "/admin/revision", label: "Revisión" },
  { href: "/admin/calendar", label: "Calendar" },
]

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const session = await auth()

  if (!session) {
    redirect("/admin/login")
  }

  return (
    <div className="min-h-screen bg-white dark:bg-stone-950">
      <nav className="border-b border-stone-200 dark:border-stone-800 bg-stone-50 dark:bg-stone-900">
        <div className="max-w-4xl mx-auto px-5 flex items-center gap-1 overflow-x-auto py-2">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-xs text-stone-600 dark:text-stone-400 hover:text-stone-900 dark:hover:text-stone-100 px-3 py-1.5 rounded-md hover:bg-stone-200 dark:hover:bg-stone-800 transition-colors whitespace-nowrap"
            >
              {link.label}
            </Link>
          ))}
        </div>
      </nav>
      {children}
    </div>
  )
}
