import { NextResponse } from "next/server"
import { getCalendarAuthUrl } from "@/lib/services/calendar-oauth.service"
import { getDb, initModels, Business, BUSINESS_SLUG } from "@/lib/database/connection"

export async function GET() {
  try {
    const db = getDb()
    initModels(db)

    const [business] = await Business.findOrCreate({
      where: { slug: BUSINESS_SLUG },
      defaults: {
        name: "Lesley García Beauty",
        slug: BUSINESS_SLUG,
        timezone: "America/Guayaquil",
      },
    })

    const url = getCalendarAuthUrl(business.id)
    return NextResponse.redirect(url)
  } catch (error) {
    console.error("Error al iniciar conexión con Google Calendar:", error)
    return NextResponse.json(
      { error: "Error al conectar con Google Calendar" },
      { status: 500 }
    )
  }
}
