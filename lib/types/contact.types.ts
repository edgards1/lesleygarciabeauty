export interface ContactFormData {
  name: string;
  email: string;
  phone: string;
  service: string;
  message: string;
  eventDate?: Date;
  budget?: string;
  contactPreference: "email" | "whatsapp" | "both";
  honeypot?: string;
}

export interface EmailResponse {
  success: boolean;
  message: string;
  error?: string;
}
