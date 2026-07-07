import { NextResponse } from "next/server"
import { handleCalendarCallback } from "@/lib/services/calendar-oauth.service"

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const code = searchParams.get("code")
    const state = searchParams.get("state")

    if (!code || !state) {
      return NextResponse.json(
        { error: "Faltan parámetros code o state" },
        { status: 400 }
      )
    }

    await handleCalendarCallback(code, state)

    return NextResponse.redirect(new URL("/admin/calendar?success=true", request.url))
  } catch (error) {
    console.error("Error en callback de Google Calendar:", error)
    const url = new URL("/admin/calendar?error=true", request.url)
    return NextResponse.redirect(url)
  }
}
