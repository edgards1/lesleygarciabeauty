import type { ContactFormData } from "@/lib/types/contact.types";

const formatDate = (date: Date): string => {
  return new Intl.DateTimeFormat("es-EC", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(date);
};

export const generateEmailHTML = (data: ContactFormData): string => {
  const eventDateSection = data.eventDate
    ? `<p style="margin: 10px 0;"><strong>Fecha del Evento:</strong> ${formatDate(data.eventDate)}</p>`
    : "";

  const budgetSection = data.budget
    ? `<p style="margin: 10px 0;"><strong>Presupuesto Estimado:</strong> ${data.budget}</p>`
    : "";

  const preferenceLabel =
    data.contactPreference === "whatsapp"
      ? "WhatsApp"
      : data.contactPreference === "email"
        ? "Email"
        : "Email y WhatsApp";

  return `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e0e0e0; border-radius: 10px;">
      <h2 style="color: #292524; border-bottom: 2px solid #292524; padding-bottom: 10px;">
        Nueva Consulta de Cliente
      </h2>
      
      <div style="margin: 20px 0;">
        <p style="margin: 10px 0;"><strong>Nombre del Cliente:</strong> ${data.name}</p>
        <p style="margin: 10px 0;"><strong>Email:</strong> ${data.email}</p>
        <p style="margin: 10px 0;"><strong>Teléfono:</strong> ${data.phone}</p>
        <p style="margin: 10px 0;"><strong>Servicio de Interés:</strong> ${data.service}</p>
        ${eventDateSection}
        ${budgetSection}
        <p style="margin: 10px 0;"><strong>Preferencia de Contacto:</strong> ${preferenceLabel}</p>
      </div>
      
      <div style="background-color: #f5f5f4; padding: 15px; border-radius: 5px; margin: 20px 0;">
        <p style="margin: 0;"><strong>Mensaje:</strong></p>
        <p style="margin: 10px 0; white-space: pre-wrap;">${data.message}</p>
      </div>
      
      <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #e0e0e0; color: #78716c; font-size: 12px;">
        <p>Este mensaje fue enviado desde el formulario de contacto de tu sitio web.</p>
      </div>
    </div>
  `;
};

export const generateEmailText = (data: ContactFormData): string => {
  const eventDateLine = data.eventDate
    ? `FECHA DEL EVENTO: ${formatDate(data.eventDate)}`
    : "";

  const budgetLine = data.budget
    ? `PRESUPUESTO ESTIMADO: ${data.budget}`
    : "";

  const preferenceLabel =
    data.contactPreference === "whatsapp"
      ? "WhatsApp"
      : data.contactPreference === "email"
        ? "Email"
        : "Email y WhatsApp";

  return `
NUEVA CONSULTA DE CLIENTE

NOMBRE CLIENTE: ${data.name}
EMAIL: ${data.email}
TELÉFONO: ${data.phone}
SERVICIO INTERÉS: ${data.service}
${eventDateLine}
${budgetLine}
PREFERENCIA DE CONTACTO: ${preferenceLabel}

MENSAJE:
${data.message}
  `.trim();
};
