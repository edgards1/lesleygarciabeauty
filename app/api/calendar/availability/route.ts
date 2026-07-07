import { NextResponse } from "next/server";
import { TIME_SLOTS } from "@/lib/config/booking.config";
import {
  getBusySlots,
  isSlotBusy,
} from "@/lib/services/calendar.service";
import { getDb, initModels, Business, BUSINESS_SLUG } from "@/lib/database/connection";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const date = searchParams.get("date");
    const slug = searchParams.get("slug") || BUSINESS_SLUG;

    if (!date) {
      return NextResponse.json(
        { error: "El parámetro 'date' es requerido (YYYY-MM-DD)" },
        { status: 400 }
      );
    }

    const db = getDb();
    initModels(db);

    const business = await Business.findOne({ where: { slug } });
    const businessId = business?.id;

    const busySlots = await getBusySlots(date, businessId);

    const slots = (TIME_SLOTS as readonly string[]).map((time) => ({
      time,
      available: !isSlotBusy(time, busySlots),
    }));

    return NextResponse.json({ date, slots });
  } catch (error) {
    console.error("Error en availability:", error);
    return NextResponse.json(
      { error: "Error al consultar disponibilidad" },
      { status: 500 }
    );
  }
}
