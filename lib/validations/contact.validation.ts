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
  company: z
    .string()
    .max(200, "El nombre de la empresa no puede exceder 200 caracteres")
    .optional(),
  service: z
    .string()
    .min(1, "Debes seleccionar un tipo de proyecto"),
  timeline: z
    .string()
    .optional(),
  message: z
    .string()
    .min(10, "El mensaje debe tener al menos 10 caracteres")
    .max(1000, "El mensaje no puede exceder 1000 caracteres"),
  honeypot: z.string().max(0).optional(),
});

export type ContactFormInput = z.infer<typeof contactFormSchema>;
