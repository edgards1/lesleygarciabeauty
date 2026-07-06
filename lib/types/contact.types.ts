export interface ContactFormData {
  name: string;
  email: string;
  phone: string;
  company?: string;
  service: string;
  timeline?: string;
  message: string;
  honeypot?: string;
}

export interface EmailResponse {
  success: boolean;
  message: string;
  error?: string;
}
