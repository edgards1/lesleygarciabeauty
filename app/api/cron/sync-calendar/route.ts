import { NextResponse } from "next/server";
import { getDb, initModels, Cita, Client, Business, BUSINESS_SLUG } from "@/lib/database/connection";
import { createCalendarEvent } from "@/lib/services/calendar.service";

const LOCATION_LABELS: Record<string, string> = {
  studio: "En estudio",
  home: "A domicilio",
  outOfCity: "Fuera de la ciudad",
};

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const secret = searchParams.get("secret");

    if (secret !== process.env.CRON_SECRET) {
      return NextResponse.json({ error: "No autorizado" }, { status: 401 });
    }

    const db = getDb();
    initModels(db);

    const business = await Business.findOne({ where: { slug: BUSINESS_SLUG } });
    if (!business) {
      return NextResponse.json({ error: "Negocio no encontrado" }, { status: 404 });
    }

    const pendientes = await Cita.findAll({
      where: { cargaCalendar: false, estado: "pendiente" },
    });

    const results: { id: string; status: string }[] = [];

    for (const cita of pendientes) {
      try {
        const client = await Client.findByPk(cita.clienteId);
        if (!client) {
          results.push({ id: cita.id, status: "sin_cliente" });
          continue;
        }

        const locationLabel = LOCATION_LABELS[cita.tipoUbicacion] ?? "En estudio";
        const addressStr = cita.direccion
          ? `${cita.direccion}${cita.referencia ? ` (${cita.referencia})` : ""}`
          : "";

        const eventId = await createCalendarEvent(
          {
            summary: `🎨 ${cita.servicioNombre} — ${client.name}`,
            description: [
              `Cliente: ${client.name}`,
              `Email: ${client.email}`,
              `Teléfono: ${client.phone}`,
              `Servicio: ${cita.servicioNombre} ($${cita.servicioPrecio})`,
              `Ubicación: ${locationLabel}${addressStr ? ` - ${addressStr}` : ""}`,
              `Monto pagado: $${cita.montoPagado} (${cita.porcentaje}%)`,
              `Código de seguimiento: ${cita.codigoSeguimiento}`,
              ``,
              `Comprobante: ${cita.comprobanteArchivo}`,
            ].join("\n"),
            date: cita.fecha,
            startTime: cita.horaInicio,
            endTime: cita.horaFin,
          },
          cita.negocioId
        );

        if (eventId) {
          await cita.update({
            eventoGoogleId: eventId,
            estado: "confirmada",
            cargaCalendar: true,
          });
          results.push({ id: cita.id, status: "sincronizada" });
        } else {
          results.push({ id: cita.id, status: "sin_calendario" });
        }
      } catch (error) {
        console.error(`Error sincronizando cita ${cita.id}:`, error);
        results.push({ id: cita.id, status: "error" });
      }
    }

    return NextResponse.json({
      sincronizadas: results.filter((r) => r.status === "sincronizada").length,
      pendientes: results.filter((r) => r.status !== "sincronizada").length,
      detalle: results,
    });
  } catch (error) {
    console.error("Error en sync-calendar:", error);
    return NextResponse.json(
      { error: "Error al sincronizar calendario" },
      { status: 500 }
    );
  }
}
