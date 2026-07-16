import { NextResponse } from "next/server";
import { Resend } from "resend";
import {
  createCalendarEvent,
  timeToEndTime,
} from "@/lib/services/calendar.service";
import { uploadReceiptToDrive } from "@/lib/services/drive.service";
import { BANK_ACCOUNTS } from "@/lib/config/booking.config";
import {
  getDb,
  initModels,
  Business,
  Client,
  Cita,
  BUSINESS_SLUG,
} from "@/lib/database/connection";

function getResendClient(): Resend {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) throw new Error("Falta RESEND_API_KEY");
  return new Resend(apiKey);
}

const LOCATION_LABELS: Record<string, string> = {
  studio: "En estudio",
  home: "A domicilio",
  outOfCity: "Fuera de la ciudad",
};

function getServiceDuration(serviceCategory: string): string {
  const durations: Record<string, string> = {
    novia: "3h",
    social: "1h",
    quinceanera: "1h",
    ugc: "Variable",
    automaquillaje: "2h",
  };
  return durations[serviceCategory] || "1h";
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const {
      name,
      email,
      phone,
      documentId,
      service,
      servicePrice,
      serviceCategory,
      locationType,
      address,
      reference,
      lat,
      lng,
      date,
      timeSlot,
      amountPaid,
      percentage,
      trackingCode,
      receiptBase64,
      receiptFileName,
    } = body;

    if (
      !name || !email || !phone || !service || !date || !timeSlot ||
      !trackingCode || !receiptBase64 || !receiptFileName
    ) {
      return NextResponse.json(
        { error: "Faltan campos requeridos" },
        { status: 400 }
      );
    }

    const db = getDb();
    initModels(db);

    // 1. Asegurar que el negocio existe
    const [business] = await Business.findOrCreate({
      where: { slug: BUSINESS_SLUG },
      defaults: {
        name: "Lesley García Beauty",
        slug: BUSINESS_SLUG,
        timezone: "America/Guayaquil",
      },
    });

    // 2. Crear o recuperar cliente
    const [client] = await Client.findOrCreate({
      where: { email, businessId: business.id },
      defaults: { businessId: business.id, name, email, phone, documentId },
    });

    // 3. Actualizar datos si cambiaron
    if (client.name !== name || client.phone !== phone || client.documentId !== documentId) {
      await client.update({ name, phone, documentId });
    }

    // 4. Calcular datos derivados
    const endTime = timeToEndTime(timeSlot);
    const locationLabel = LOCATION_LABELS[locationType ?? "studio"] ?? "En estudio";
    const addressStr = address ? `${address}${reference ? ` (${reference})` : ""}` : "";
    const category = serviceCategory || "social";
    const duration = getServiceDuration(category);

    // 5. Subir comprobante a Google Drive
    let comprobanteArchivo = receiptFileName
    const driveResult = await uploadReceiptToDrive(
      business.id,
      receiptBase64 as string,
      receiptFileName
    )
    if (driveResult) {
      comprobanteArchivo = driveResult.webViewLink
    }

    // 6. Persistir la cita en DB
    const cita = await Cita.create({
      negocioId: business.id,
      clienteId: client.id,
      servicioNombre: service,
      servicioPrecio: Number(servicePrice),
      servicioCategoria: category,
      servicioDuracion: duration,
      tipoUbicacion: locationType ?? "studio",
      direccion: address ?? null,
      referencia: reference ?? null,
      latitud: lat != null ? Number(lat) : null,
      longitud: lng != null ? Number(lng) : null,
      fecha: date,
      horaInicio: timeSlot,
      horaFin: endTime,
      montoPagado: Number(amountPaid),
      porcentaje: Number(percentage),
      codigoSeguimiento: trackingCode,
      comprobanteArchivo,
      estado: "pendiente_de_revision",
      cargaCalendar: false,
    });

    // Calendar se crea solo cuando admin aprueba el comprobante

    // 8. Enviar notificación al admin con comprobante
    try {
      const resend = getResendClient();
      const emailFrom = process.env.EMAIL_FROM;
      const emailFromName = process.env.EMAIL_FROM_NAME || "Lesley García Beauty";
      const adminEmail = process.env.ADMIN_EMAIL || process.env.EMAIL_TO;

      if (adminEmail) {
        const bankList = BANK_ACCOUNTS.map(
          (b) => `${b.bank} (${b.type}: ${b.number})`
        ).join(", ");

        const adminHtml = `
          <h2>🔔 Nueva Reserva — ${service}</h2>
          <p><strong>Cliente:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Teléfono:</strong> ${phone}</p>
          <p><strong>Servicio:</strong> ${service} ($${servicePrice})</p>
          <p><strong>Ubicación:</strong> ${locationLabel}${addressStr ? ` - ${addressStr}` : ""}</p>
          <p><strong>Fecha:</strong> ${date}</p>
          <p><strong>Horario:</strong> ${timeSlot}</p>
          <p><strong>Monto pagado:</strong> $${amountPaid} (${percentage}%)</p>
          <p><strong>Código de seguimiento:</strong> ${trackingCode}</p>
          <p><strong>Bancos:</strong> ${bankList}</p>
          <p><strong>ID Cita:</strong> ${cita.id}</p>
          <p><strong>Comprobante:</strong> <a href="${comprobanteArchivo}">Ver en Google Drive</a></p>
          <p><strong>Estado:</strong> Pendiente de revisión</p>
        `;

        await resend.emails.send({
          from: `${emailFromName} <${emailFrom}>`,
          to: [adminEmail],
          subject: `🔔 Nueva reserva — ${service} — ${name}`,
          html: adminHtml,
          attachments: [
            {
              filename: receiptFileName,
              content: receiptBase64 as string,
              contentType: `image/${receiptFileName.split(".").pop()}`,
            },
          ],
        });
      }
    } catch (adminError) {
      console.error("Error al enviar notificación al admin:", adminError);
    }

    return NextResponse.json({
      success: true,
      appointmentId: cita.id,
      estado: "pendiente_de_revision",
      message: "Reserva registrada — pendiente de revisión de comprobante",
    });
  } catch (error) {
    console.error("Error en confirm booking:", error);
    return NextResponse.json(
      { error: "Error al procesar la reserva" },
      { status: 500 }
    );
  }
}
