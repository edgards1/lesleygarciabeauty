import type { EmailConfig } from "@/lib/types/contact.types";

export const getEmailConfig = (): EmailConfig => {
  const host = process.env.SMTP_HOST;
  const port = process.env.SMTP_PORT;
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS;

  if (!host || !port || !user || !pass) {
    throw new Error(
      "Faltan variables de entorno SMTP. Verificar archivo .env.local"
    );
  }

  return {
    host,
    port: parseInt(port),
    secure: parseInt(port) === 465,
    auth: {
      user,
      pass,
    },
  };
};

export const getDestinationEmail = (): string => {
  const email = process.env.EMAIL_TO;
  
  if (!email) {
    throw new Error(
      "Falta la variable EMAIL_TO en el archivo .env.local"
    );
  }

  return email;
};
