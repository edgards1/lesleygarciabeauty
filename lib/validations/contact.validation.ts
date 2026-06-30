import { z } from "zod";

export const contactFormSchema = z.object({
  name: z
    .string()
    .min(2, "El nombre debe tener al menos 2 caracteres")
    .max(100, "El nombre no puede exceder 100 caracteres"),
  email: z
    .string()
    .email("Email inválido")
    .max(255, "El email no puede exceder 255 caracteres"),
  phone: z
    .string()
    .min(7, "El teléfono debe tener al menos 7 dígitos")
    .max(20, "El teléfono no puede exceder 20 caracteres")
    .regex(
      /^\+?[\d\s\-()]+$/,
      "Formato de teléfono inválido. Usa solo números, espacios, guiones o paréntesis"
    ),
  service: z
    .string()
    .min(1, "Debes seleccionar un servicio")
    .max(100, "El servicio no puede exceder 100 caracteres"),
  message: z
    .string()
    .min(10, "El mensaje debe tener al menos 10 caracteres")
    .max(1000, "El mensaje no puede exceder 1000 caracteres"),
  eventDate: z
    .date()
    .optional()
    .refine(
      (date) => !date || date >= new Date(new Date().setHours(0, 0, 0, 0)),
      "La fecha del evento no puede ser en el pasado"
    ),
  budget: z.string().optional(),
  contactPreference: z.enum(["email", "whatsapp", "both"], {
    errorMap: () => ({ message: "Selecciona una preferencia de contacto" }),
  }),
  honeypot: z.string().max(0).optional(),
});

export type ContactFormInput = z.infer<typeof contactFormSchema>;
