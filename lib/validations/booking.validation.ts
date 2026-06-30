import { z } from "zod";
import { TIME_SLOTS } from "@/lib/config/booking.config";

export const personalInfoSchema = z.object({
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
});

export const serviceSchema = z.object({
  serviceId: z.string().min(1, "Debes seleccionar un servicio"),
});

export const locationSchema = z.object({
  type: z.enum(["studio", "home", "outOfCity"], {
    errorMap: () => ({ message: "Selecciona un tipo de ubicación" }),
  }),
  address: z.string().optional(),
  reference: z.string().optional(),
});

export const dateTimeSchema = z.object({
  date: z.date({ required_error: "Debes seleccionar una fecha" }),
  timeSlot: z
    .string()
    .refine((val) => (TIME_SLOTS as readonly string[]).includes(val), {
      message: "Selecciona un horario disponible",
    }),
});

export const paymentSchema = z.object({
  method: z.enum(["transfer", "applePay", "card"], {
    errorMap: () => ({ message: "Selecciona un método de pago" }),
  }),
  percentage: z.number().refine((val) => val === 50 || val === 100, {
    message: "Selecciona el porcentaje a pagar",
  }),
  receiptBase64: z.string().min(1, "Debes adjuntar el comprobante de pago"),
  receiptFileName: z.string().min(1, "Debes adjuntar el comprobante de pago"),
  acceptedPolicies: z.literal(true, {
    errorMap: () => ({
      message: "Debes aceptar las políticas de reservación",
    }),
  }),
});

export const bookingSchema = z.object({
  personalInfo: personalInfoSchema,
  service: serviceSchema,
  location: locationSchema,
  dateTime: dateTimeSchema,
  payment: paymentSchema,
});

export type PersonalInfoInput = z.infer<typeof personalInfoSchema>;
export type ServiceInput = z.infer<typeof serviceSchema>;
export type LocationInput = z.infer<typeof locationSchema>;
export type DateTimeInput = z.infer<typeof dateTimeSchema>;
export type PaymentInput = z.infer<typeof paymentSchema>;
export type BookingInput = z.infer<typeof bookingSchema>;
