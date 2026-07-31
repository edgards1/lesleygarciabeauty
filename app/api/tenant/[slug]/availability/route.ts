import { NextResponse } from "next/server";
import { calculateAvailability } from "@/lib/engine/availability.engine";
import { findByAgendamientoSlug } from "@/lib/database/repositories/tenant.repository";
import { getServiceById } from "@/lib/database/repositories/service.repository";
import {
  getWorkingHours,
  getScheduleBlocks,
  getExistingAppointments,
} from "@/lib/database/repositories/schedule.repository";
import { getBusySlots } from "@/lib/services/calendar.service";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params;
    const { searchParams } = new URL(request.url);
    const date = searchParams.get("date");
    const serviceId = searchParams.get("serviceId");

    if (!date) {
      return NextResponse.json(
        { error: "Parámetro 'date' requerido (YYYY-MM-DD)" },
        { status: 400 }
      );
    }

    if (!serviceId) {
      return NextResponse.json(
        { error: "Parámetro 'serviceId' requerido" },
        { status: 400 }
      );
    }

    const tenant = await findByAgendamientoSlug(slug);
    if (!tenant) {
      return NextResponse.json({ error: "Negocio no encontrado" }, { status: 404 });
    }

    const service = await getServiceById(serviceId);
    if (!service) {
      return NextResponse.json({ error: "Servicio no encontrado" }, { status: 404 });
    }

    const [workingHours, blocks, appointments, busySlots] = await Promise.all([
      getWorkingHours(tenant.id),
      getScheduleBlocks(tenant.id, date),
      getExistingAppointments(tenant.id, date),
      getBusySlots(date, tenant.id),
    ]);

    const googleBusy = busySlots.map((b) => ({
      start: new Date(b.start),
      end: new Date(b.end),
    }));

    const slots = calculateAvailability({
      date,
      serviceDurationMinutes: service.duracion_minutos,
      workingHours: workingHours.map((h) => ({
        diaSemana: h.dia_semana,
        horaApertura: h.hora_apertura,
        horaCierre: h.hora_cierre,
      })),
      existingAppointments: appointments,
      googleBusySlots: googleBusy,
      scheduleBlocks: blocks,
      bufferMinutes: tenant.tiempo_buffer ?? 15,
    });

    return NextResponse.json({
      date,
      serviceId,
      serviceDuration: service.duracion_minutos,
      slots,
    });
  } catch (error) {
    console.error("Error en tenant/availability:", error);
    return NextResponse.json(
      { error: "Error al consultar disponibilidad" },
      { status: 500 }
    );
  }
}
