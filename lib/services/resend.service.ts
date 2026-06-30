import { Resend } from "resend";
import type { ContactFormData, EmailResponse } from "@/lib/types/contact.types";
import { getResendConfig, getDestinationEmail } from "@/lib/config/email.config";
import { generateEmailHTML, generateEmailText } from "@/lib/templates/email.template";

class ResendService {
  private resend: Resend | null = null;

  private getClient(): Resend {
    if (this.resend) {
      return this.resend;
    }

    const config = getResendConfig();
    this.resend = new Resend(config.apiKey);
    return this.resend;
  }

  async sendContactEmail(data: ContactFormData): Promise<EmailResponse> {
    const maxRetries = 1;
    let lastError: string = "";

    for (let attempt = 0; attempt <= maxRetries; attempt++) {
      try {
        const resend = this.getClient();
        const destinationEmail = getDestinationEmail();
        const config = getResendConfig();

        const { error } = await resend.emails.send({
          from: `${config.fromName} <${config.fromEmail}>`,
          to: [destinationEmail],
          replyTo: data.email,
          subject: `Nueva consulta de ${data.name} - ${data.service}`,
          html: generateEmailHTML(data),
          text: generateEmailText(data),
        });

        if (error) {
          lastError = error.message;
          if (attempt < maxRetries) {
            await new Promise((resolve) => setTimeout(resolve, 1000));
            continue;
          }
          return {
            success: false,
            message: "Error al enviar el email",
            error: lastError,
          };
        }

        return {
          success: true,
          message: "Email enviado correctamente",
        };
      } catch (error) {
        lastError = error instanceof Error ? error.message : "Error desconocido";
        if (attempt < maxRetries) {
          await new Promise((resolve) => setTimeout(resolve, 1000));
          continue;
        }
        console.error("Error al enviar email con Resend:", error);
        return {
          success: false,
          message: "Error al enviar el email",
          error: lastError,
        };
      }
    }

    return {
      success: false,
      message: "Error al enviar el email",
      error: lastError,
    };
  }
}

export const emailService = new ResendService();
