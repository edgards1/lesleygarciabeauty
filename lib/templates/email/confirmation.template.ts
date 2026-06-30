import { BANK_ACCOUNTS, RESCHEDULE_POLICY } from "@/lib/config/booking.config";

interface ConfirmationEmailData {
  name: string;
  email: string;
  phone: string;
  service: string;
  servicePrice: number;
  location: string;
  address: string;
  date: string;
  timeSlot: string;
  amountPaid: number;
  percentage: number;
  trackingCode: string;
}

const formatDate = (date: string): string => {
  return new Intl.DateTimeFormat("es-EC", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(new Date(date));
};

export function generateConfirmationHTML(data: ConfirmationEmailData): string {
  const bankRows = BANK_ACCOUNTS.map(
    (b) => `
      <tr>
        <td style="padding: 8px 12px; border: 1px solid #e0e0e0; font-size: 13px;">
          <strong>${b.bank}</strong><br/>
          ${b.type}: ${b.number}<br/>
          Titular: ${b.holder}<br/>
          Cédula: ${b.id}
        </td>
      </tr>
    `
  ).join("");

  return `
    <div style="font-family: 'Helvetica Neue', Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 24px; border: 1px solid #e0e0e0; border-radius: 12px;">
      <div style="text-align: center; margin-bottom: 24px;">
        <h1 style="font-size: 22px; color: #292524; margin: 0 0 4px; font-weight: 700;">
          ✅ ¡Reserva Confirmada!
        </h1>
        <p style="color: #78716c; font-size: 14px; margin: 0;">
          Hola ${data.name}, tu reserva ha sido recibida exitosamente.
        </p>
      </div>

      <div style="background-color: #f5f5f4; border-radius: 8px; padding: 20px; margin: 20px 0;">
        <table style="width: 100%; border-collapse: collapse; font-size: 13px;">
          <tr>
            <td style="padding: 6px 0; color: #78716c; width: 120px;">Servicio</td>
            <td style="padding: 6px 0; font-weight: 600; color: #292524;">${data.service}</td>
          </tr>
          <tr>
            <td style="padding: 6px 0; color: #78716c;">Valor</td>
            <td style="padding: 6px 0; font-weight: 600; color: #292524;">$${data.servicePrice}</td>
          </tr>
          <tr>
            <td style="padding: 6px 0; color: #78716c;">Monto pagado</td>
            <td style="padding: 6px 0; font-weight: 600; color: #292524;">$${data.amountPaid} (${data.percentage}%)</td>
          </tr>
          <tr>
            <td style="padding: 6px 0; color: #78716c;">Ubicación</td>
            <td style="padding: 6px 0; font-weight: 600; color: #292524;">${data.location}${data.address ? ` — ${data.address}` : ""}</td>
          </tr>
          <tr>
            <td style="padding: 6px 0; color: #78716c;">Fecha</td>
            <td style="padding: 6px 0; font-weight: 600; color: #292524;">${formatDate(data.date)}</td>
          </tr>
          <tr>
            <td style="padding: 6px 0; color: #78716c;">Horario</td>
            <td style="padding: 6px 0; font-weight: 600; color: #292524;">${data.timeSlot}</td>
          </tr>
          <tr>
            <td style="padding: 6px 0; color: #78716c;">Código</td>
            <td style="padding: 6px 0; font-weight: 700; color: #292524; font-family: monospace; letter-spacing: 1px;">${data.trackingCode}</td>
          </tr>
        </table>
      </div>

      <div style="background-color: #f9f9f8; border-radius: 8px; padding: 16px; margin: 16px 0; border: 1px solid #e0e0e0;">
        <p style="font-size: 12px; color: #78716c; margin: 0 0 8px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.5px;">
          Datos Bancarios
        </p>
        <table style="width: 100%; border-collapse: collapse; font-size: 13px;">
          ${bankRows}
        </table>
      </div>

      <div style="background-color: #fefce8; border-radius: 8px; padding: 16px; margin: 16px 0; border: 1px solid #eab308;">
        <p style="font-size: 12px; color: #a16207; margin: 0; line-height: 1.6;">
          <strong>📋 Política de reagendamiento:</strong><br/>
          ${RESCHEDULE_POLICY}
        </p>
      </div>

      <div style="margin-top: 24px; padding-top: 16px; border-top: 1px solid #e0e0e0; text-align: center;">
        <p style="font-size: 12px; color: #78716c; margin: 0 0 4px;">
          ¿Tienes preguntas? Escríbenos por WhatsApp
        </p>
        <p style="font-size: 12px; color: #78716c; margin: 0;">
          <a href="https://api.whatsapp.com/send?phone=593983366831" style="color: #292524; text-decoration: underline;">
            (+593) 983366831
          </a>
        </p>
      </div>
    </div>
  `;
}

export function generateConfirmationText(data: ConfirmationEmailData): string {
  return `
✅ RESERVA CONFIRMADA

Hola ${data.name}, tu reserva ha sido recibida exitosamente.

SERVICIO: ${data.service}
VALOR: $${data.servicePrice}
MONTO PAGADO: $${data.amountPaid} (${data.percentage}%)
UBICACIÓN: ${data.location}${data.address ? ` - ${data.address}` : ""}
FECHA: ${formatDate(data.date)}
HORARIO: ${data.timeSlot}
CÓDIGO DE SEGUIMIENTO: ${data.trackingCode}

DATOS BANCARIOS:
${BANK_ACCOUNTS.map((b) => `${b.bank} - ${b.type}: ${b.number} - Titular: ${b.holder} - Cédula: ${b.id}`).join("\n")}

POLÍTICA DE REAGENDAMIENTO:
${RESCHEDULE_POLICY}

¿Tienes preguntas? Escríbenos por WhatsApp: (+593) 983366831
  `.trim();
}
