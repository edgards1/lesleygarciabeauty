import type { ContactFormData } from "@/lib/types/contact.types";

const timelineLabels: Record<string, string> = {
  "this-week": "Esta semana",
  "this-month": "Este mes",
  "next-month": "Próximo mes",
  "2-3-months": "En 2-3 meses",
  "no-date": "Sin fecha definida",
};

export const generateEmailHTML = (data: ContactFormData): string => {
  const companySection = data.company
    ? `<p style="margin: 10px 0;"><strong>Empresa / Marca:</strong> ${data.company}</p>`
    : "";

  const timelineSection = data.timeline
    ? `<p style="margin: 10px 0;"><strong>Plazo estimado:</strong> ${timelineLabels[data.timeline] || data.timeline}</p>`
    : "";

  return `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e0e0e0; border-radius: 10px;">
      <h2 style="color: #292524; border-bottom: 2px solid #292524; padding-bottom: 10px;">
        Nueva Solicitud de Cotización
      </h2>
      
      <div style="margin: 20px 0;">
        <p style="margin: 10px 0;"><strong>Nombre:</strong> ${data.name}</p>
        ${companySection}
        <p style="margin: 10px 0;"><strong>Email:</strong> ${data.email}</p>
        <p style="margin: 10px 0;"><strong>Teléfono:</strong> ${data.phone}</p>
        <p style="margin: 10px 0;"><strong>Tipo de Proyecto:</strong> ${data.service}</p>
        ${timelineSection}
      </div>
      
      <div style="background-color: #f5f5f4; padding: 15px; border-radius: 5px; margin: 20px 0;">
        <p style="margin: 0;"><strong>Detalles del Proyecto:</strong></p>
        <p style="margin: 10px 0; white-space: pre-wrap;">${data.message}</p>
      </div>
      
      <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #e0e0e0; color: #78716c; font-size: 12px;">
        <p>Enviado desde el formulario de contacto del sitio web.</p>
      </div>
    </div>
  `;
};

export const generateEmailText = (data: ContactFormData): string => {
  const companyLine = data.company
    ? `EMPRESA / MARCA: ${data.company}`
    : "";

  const timelineLine = data.timeline
    ? `PLAZO ESTIMADO: ${timelineLabels[data.timeline] || data.timeline}`
    : "";

  return `
SOLICITUD DE COTIZACIÓN

NOMBRE: ${data.name}
${companyLine}
EMAIL: ${data.email}
TELÉFONO: ${data.phone}
TIPO DE PROYECTO: ${data.service}
${timelineLine}

DETALLES DEL PROYECTO:
${data.message}
  `.trim();
};
