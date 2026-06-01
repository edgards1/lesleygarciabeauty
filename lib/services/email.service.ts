import nodemailer from "nodemailer";
import type { Transporter } from "nodemailer";
import type { ContactFormData, EmailResponse } from "@/lib/types/contact.types";
import { getEmailConfig, getDestinationEmail } from "@/lib/config/email.config";
import { generateEmailHTML, generateEmailText } from "@/lib/templates/email.template";

class EmailService {
  private transporter: Transporter | null = null;

  private getTransporter(): Transporter {
    if (this.transporter) {
      return this.transporter;
    }

    const config = getEmailConfig();
    
    this.transporter = nodemailer.createTransport({
      host: config.host,
      port: config.port,
      secure: config.secure,
      auth: config.auth,
    });

    return this.transporter;
  }

  async sendContactEmail(data: ContactFormData): Promise<EmailResponse> {
    try {
      const transporter = this.getTransporter();
      const destinationEmail = getDestinationEmail();
      const senderEmail = getEmailConfig().auth.user;

      const mailOptions = {
        from: `"Formulario Web - Lesley García Beauty" <${senderEmail}>`,
        to: destinationEmail,
        replyTo: data.email,
        subject: `Nueva consulta de ${data.name} - ${data.service}`,
        html: generateEmailHTML(data),
        text: generateEmailText(data),
      };

      await transporter.sendMail(mailOptions);

      return {
        success: true,
        message: "Email enviado correctamente",
      };
    } catch (error) {
      console.error("Error al enviar email:", error);
      
      return {
        success: false,
        message: "Error al enviar el email",
        error: error instanceof Error ? error.message : "Error desconocido",
      };
    }
  }

  async verifyConnection(): Promise<boolean> {
    try {
      const transporter = this.getTransporter();
      await transporter.verify();
      return true;
    } catch (error) {
      console.error("Error al verificar conexión SMTP:", error);
      return false;
    }
  }
}

export const emailService = new EmailService();
