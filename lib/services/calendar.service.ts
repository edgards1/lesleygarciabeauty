import { SLOT_DURATION_MINUTES } from "@/lib/config/booking.config";
import type { calendar_v3 } from "googleapis";

async function getGoogle() {
  const mod = await import("googleapis");
  return mod.google;
}

interface CalendarConfig {
  serviceAccountEmail: string;
  privateKey: string;
  calendarId: string;
}

function getConfig(): CalendarConfig {
  const serviceAccountEmail = process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL;
  const privateKey = process.env.GOOGLE_PRIVATE_KEY;
  const calendarId = process.env.GOOGLE_CALENDAR_ID;

  if (!serviceAccountEmail || !privateKey || !calendarId) {
    throw new Error(
      "Faltan variables de entorno de Google Calendar. Revisa GOOGLE_SERVICE_ACCOUNT_EMAIL, GOOGLE_PRIVATE_KEY y GOOGLE_CALENDAR_ID"
    );
  }

  return {
    serviceAccountEmail,
    privateKey: privateKey.replace(/\\n/g, "\n"),
    calendarId,
  };
}

async function getAuthClient(config: CalendarConfig) {
  const google = await getGoogle();
  const auth = new google.auth.JWT({
    email: config.serviceAccountEmail,
    key: config.privateKey,
    scopes: ["https://www.googleapis.com/auth/calendar"],
  });
  return auth;
}

async function getCalendarClient(): Promise<calendar_v3.Calendar> {
  const config = getConfig();
  const auth = await getAuthClient(config);
  const google = await getGoogle();
  return google.calendar({ version: "v3", auth });
}

export interface BusySlot {
  start: string;
  end: string;
}

export async function getBusySlots(date: string): Promise<BusySlot[]> {
  try {
    const calendar = await getCalendarClient();
    const config = getConfig();

    const timeMin = new Date(`${date}T00:00:00-05:00`);
    const timeMax = new Date(`${date}T23:59:59-05:00`);

    const response = await calendar.freebusy.query({
      requestBody: {
        timeMin: timeMin.toISOString(),
        timeMax: timeMax.toISOString(),
        items: [{ id: config.calendarId }],
      },
    });

    const busy = response.data.calendars?.[config.calendarId]?.busy ?? [];
    return busy.map((b) => ({
      start: b.start ?? "",
      end: b.end ?? "",
    }));
  } catch (error) {
    console.error("Error al consultar disponibilidad:", error);
    return [];
  }
}

export async function createCalendarEvent(params: {
  summary: string;
  description: string;
  date: string;
  startTime: string;
  endTime: string;
}): Promise<string | null> {
  try {
    const calendar = await getCalendarClient();
    const config = getConfig();

    const startDateTime = `${params.date}T${params.startTime}:00-05:00`;
    const endDateTime = `${params.date}T${params.endTime}:00-05:00`;

    const response = await calendar.events.insert({
      calendarId: config.calendarId,
      requestBody: {
        summary: params.summary,
        description: params.description,
        start: {
          dateTime: startDateTime,
          timeZone: "America/Guayaquil",
        },
        end: {
          dateTime: endDateTime,
          timeZone: "America/Guayaquil",
        },
        reminders: {
          useDefault: true,
        },
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
