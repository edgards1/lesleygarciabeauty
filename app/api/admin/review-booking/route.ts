import { NextResponse } from "next/server";
import { Resend } from "resend";
import { auth } from "@/lib/auth";
import { getDb, initModels, Cita, Client, Business } from "@/lib/database/connection";
import { createCalendarEvent } from "@/lib/services/calendar.service";
import {
  generateConfirmationHTML,
  generateConfirmationText,
} from "@/lib/templates/email/confirmation.template";

const LOCATION_LABELS: Record<string, string> = {
  studio: "En estudio",
  home: "A domicilio",
  outOfCity: "Fuera de la ciudad",
};

function getResendClient(): Resend {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) throw new Error("Falta RESEND_API_KEY");
  return new Resend(apiKey);
}

export async function POST(request: Request) {
  try {
    const session = await auth();
    if (!session?.user?.email) {
      return NextResponse.json({ error: "No autorizado" }, { status: 401 });
    }

    const body = await request.json();
    const { citaId, action } = body;

    if (!citaId || !action || !["approve", "reject"].includes(action)) {
      return NextResponse.json({ error: "Faltan campos requeridos" }, { status: 400 });
    }

    const db = getDb();
    initModels(db);

    const cita = await Cita.findByPk(citaId);
    if (!cita) {
      return NextResponse.json({ error: "Cita no encontrada" }, { status: 404 });
    }

    if (cita.estado !== "pendiente_de_revision") {
      return NextResponse.json(
        { error: `La cita está en estado "${cita.estado}", no puede revisarse` },
        { status: 400 }
      );
    }

    if (action === "reject") {
      await cita.update({ estado: "cancelada" });
      return NextResponse.json({
        success: true,
        action: "rejected",
        estado: "cancelada",
        message: "Cita cancelada — comprobante rechazado",
      });
    }

    // Approve: set to pendiente + attempt Calendar sync
    const client = await Client.findByPk(cita.clienteId);
    if (!client) {
      return NextResponse.json({ error: "Cliente no encontrado" }, { status: 404 });
    }

    const locationLabel = LOCATION_LABELS[cita.tipoUbicacion] ?? "En estudio";
    const addressStr = cita.direccion
      ? `${cita.direccion}${cita.referencia ? ` (${cita.referencia})` : ""}`
      : "";

    let eventId: string | null = null;
    try {
      eventId = await createCalendarEvent(
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
    } catch (calError) {
      console.error(`Error al crear evento en Calendar para cita ${cita.id}:`, calError);
    }

    if (eventId) {
      await cita.update({
        eventoGoogleId: eventId,
        estado: "confirmada",
        cargaCalendar: true,
      });

      // Enviar email de confirmación al cliente
      let emailSent = false;
      try {
        const resend = getResendClient();
        const emailFrom = process.env.EMAIL_FROM;
        const emailFromName = process.env.EMAIL_FROM_NAME || "Lesley García Beauty";

        await resend.emails.send({
          from: `${emailFromName} <${emailFrom}>`,
          to: [client.email],
          subject: "✅ Reserva confirmada — Lesley García Beauty",
          html: generateConfirmationHTML({
            name: client.name,
            email: client.email,
            phone: client.phone,
            service: cita.servicioNombre,
            servicePrice: cita.servicioPrecio,
            location: locationLabel,
            address: addressStr,
            date: cita.fecha,
            timeSlot: cita.horaInicio,
            amountPaid: cita.montoPagado,
            percentage: cita.porcentaje,
            trackingCode: cita.codigoSeguimiento,
          }),
          text: generateConfirmationText({
            name: client.name,
            email: client.email,
            phone: client.phone,
            service: cita.servicioNombre,
            servicePrice: cita.servicioPrecio,
            location: locationLabel,
            address: addressStr,
            date: cita.fecha,
            timeSlot: cita.horaInicio,
            amountPaid: cita.montoPagado,
            percentage: cita.porcentaje,
            trackingCode: cita.codigoSeguimiento,
          }),
        });
        emailSent = true;
      } catch (emailError) {
        console.error("Error al enviar email de confirmación:", emailError);
      }

      // Generar link de WhatsApp para que el admin envíe manualmente
      const wsNumber = process.env.WS_NUMBER || "593983366831";
      const whatsappMsg = encodeURIComponent(
        `✅ *Reserva Confirmada* - Lesley García Beauty\n\n` +
        `Hola ${client.name}, tu reserva ha sido confirmada.\n\n` +
        `*Servicio:* ${cita.servicioNombre}\n` +
        `*Fecha:* ${cita.fecha}\n` +
        `*Horario:* ${cita.horaInicio}\n` +
        `*Monto pagado:* $${cita.montoPagado} (${cita.porcentaje}%)\n` +
        `*Código:* ${cita.codigoSeguimiento}\n\n` +
        `¡Te esperamos!`
      );
      const whatsappLink = `https://api.whatsapp.com/send?phone=${wsNumber}&text=${whatsappMsg}`;

      return NextResponse.json({
        success: true,
        action: "approved",
        estado: "confirmada",
        eventoGoogleId: eventId,
        emailSent,
        whatsappLink,
        message: "Cita aprobada y sincronizada con Google Calendar",
      });
    }

    await cita.update({ estado: "pendiente" });
    return NextResponse.json({
      success: true,
      action: "approved",
      estado: "pendiente",
      message: "Cita aprobada — pendiente de sincronización con Calendar",
    });
  } catch (error) {
    console.error("Error en review-booking:", error);
    return NextResponse.json({ error: "Error interno" }, { status: 500 });
  }
}
