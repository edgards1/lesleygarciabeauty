import { SLOT_DURATION_MINUTES } from "@/lib/config/booking.config";
import {
  getCalendarClientForBusiness,
  getCalendarIdForBusiness,
} from "@/lib/services/calendar-oauth.service";

export interface BusySlot {
  start: string;
  end: string;
}

export async function getBusySlots(date: string, businessId?: string): Promise<BusySlot[]> {
  try {
    if (!businessId) return [];

    const calendar = await getCalendarClientForBusiness(businessId);
    const calendarId = await getCalendarIdForBusiness(businessId);

    if (!calendar || !calendarId) return [];

    const timeMin = new Date(`${date}T00:00:00-05:00`);
    const timeMax = new Date(`${date}T23:59:59-05:00`);

    const response = await calendar.freebusy.query({
      requestBody: {
        timeMin: timeMin.toISOString(),
        timeMax: timeMax.toISOString(),
        items: [{ id: calendarId }],
      },
    });

    const busy = response.data.calendars?.[calendarId]?.busy ?? [];
    return busy.map((b) => ({
      start: b.start ?? "",
      end: b.end ?? "",
    }));
  } catch (error) {
    console.error("Error al consultar disponibilidad:", error);
    return [];
  }
}

export async function createCalendarEvent(
  params: {
    summary: string;
    description: string;
    date: string;
    startTime: string;
    endTime: string;
  },
  businessId?: string
): Promise<string | null> {
  try {
    if (!businessId) {
      console.log("Sin OAuth2 conectado — la cita solo se guardó en DB");
      return null;
    }

    const calendar = await getCalendarClientForBusiness(businessId);
    const calendarId = await getCalendarIdForBusiness(businessId);

    if (!calendar || !calendarId) {
      console.log("Sin OAuth2 conectado — la cita solo se guardó en DB");
      return null;
    }

    const startDateTime = `${params.date}T${params.startTime}:00-05:00`;
    const endDateTime = `${params.date}T${params.endTime}:00-05:00`;

    const response = await calendar.events.insert({
      calendarId,
      requestBody: {
        summary: params.summary,
        description: params.description,
        start: { dateTime: startDateTime, timeZone: "America/Guayaquil" },
        end: { dateTime: endDateTime, timeZone: "America/Guayaquil" },
        reminders: { useDefault: true },
      },
    });

    return response.data.id ?? null;
  } catch (error) {
    console.error("Error al crear evento en Google Calendar:", error);
    return null;
  }
}

export function timeToEndTime(startTime: string): string {
  const [hours, minutes] = startTime.split(":").map(Number);
  const totalMinutes = hours * 60 + minutes + SLOT_DURATION_MINUTES;
  const endHours = Math.floor(totalMinutes / 60);
  const endMinutes = totalMinutes % 60;
  return `${String(endHours).padStart(2, "0")}:${String(endMinutes).padStart(2, "0")}`;
}

export function isSlotBusy(slotTime: string, busySlots: BusySlot[]): boolean {
  const slotStart = slotTime;
  const slotEnd = timeToEndTime(slotTime);

  return busySlots.some((busy) => {
    const busyStart = busy.start.substring(11, 16);
    const busyEnd = busy.end.substring(11, 16);
    return slotStart < busyEnd && slotEnd > busyStart;
  });
}
