interface ResendConfig {
  apiKey: string;
  fromEmail: string;
  fromName: string;
}

export const getResendConfig = (): ResendConfig => {
  const apiKey = process.env.RESEND_API_KEY;
  const fromEmail = process.env.EMAIL_FROM;
  const fromName = process.env.EMAIL_FROM_NAME || "Formulario Web - Lesley García Beauty";

  if (!apiKey) {
    throw new Error(
      "Falta la variable RESEND_API_KEY en el archivo .env.local"
    );
  }

  if (!fromEmail) {
    throw new Error(
      "Falta la variable EMAIL_FROM en el archivo .env.local"
    );
  }

  return { apiKey, fromEmail, fromName };
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
