import { NextResponse } from "next/server";
import { Resend } from "resend";
import {
  createCalendarEvent,
  timeToEndTime,
} from "@/lib/services/calendar.service";
import {
  generateConfirmationHTML,
  generateConfirmationText,
} from "@/lib/templates/email/confirmation.template";
import { BANK_ACCOUNTS } from "@/lib/config/booking.config";

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

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const {
      name,
      email,
      phone,
      service,
      servicePrice,
      locationType,
      address,
      reference,
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

    const endTime = timeToEndTime(timeSlot);
    const locationLabel = LOCATION_LABELS[locationType ?? "studio"] ?? "En estudio";
    const addressStr = address ? `${address}${reference ? ` (${reference})` : ""}` : "";

    let eventId: string | null = null;
    try {
      eventId = await createCalendarEvent({
        summary: `🎨 ${service} — ${name}`,
        description: [
          `Cliente: ${name}`,
          `Email: ${email}`,
          `Teléfono: ${phone}`,
          `Servicio: ${service} ($${servicePrice})`,
          `Ubicación: ${locationLabel}${addressStr ? ` - ${addressStr}` : ""}`,
          `Monto pagado: $${amountPaid} (${percentage}%)`,
          `Código de seguimiento: ${trackingCode}`,
          ``,
          `Comprobante adjunto: ${receiptFileName}`,
        ].join("\n"),
        date,
        startTime: timeSlot,
        endTime,
      });
    } catch (calError) {
      console.error("Error al crear evento en Calendar:", calError);
    }

    // Send confirmation email to client
    try {
      const resend = getResendClient();
      const emailFrom = process.env.EMAIL_FROM;
      const emailFromName = process.env.EMAIL_FROM_NAME || "Lesley García Beauty";

      await resend.emails.send({
        from: `${emailFromName} <${emailFrom}>`,
        to: [email],
        subject: "✅ Reserva confirmada — Lesley García Beauty",
        html: generateConfirmationHTML({
          name,
          email,
          phone,
          service,
          servicePrice,
          location: locationLabel,
          address: addressStr,
          date,
          timeSlot,
          amountPaid,
          percentage,
          trackingCode,
        }),
        text: generateConfirmationText({
          name,
          email,
          phone,
          service,
          servicePrice,
          location: locationLabel,
          address: addressStr,
          date,
          timeSlot,
          amountPaid,
          percentage,
          trackingCode,
        }),
      });
    } catch (emailError) {
      console.error("Error al enviar email al cliente:", emailError);
    }

    // Send notification to admin with receipt
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
          <p><strong>Evento Calendar ID:</strong> ${eventId ?? "No se pudo crear"}</p>
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
      eventId,
      message: "Reserva confirmada exitosamente",
    });
  } catch (error) {
    console.error("Error en confirm booking:", error);
    return NextResponse.json(
      { error: "Error al procesar la reserva" },
      { status: 500 }
    );
  }
}
