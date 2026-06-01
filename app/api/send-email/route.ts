// Solo controlador HTTP para enviar emails desde el formulario de contacto
import { NextResponse } from "next/server";
import { emailService } from "@/lib/services/email.service";
import { contactFormSchema } from "@/lib/validations/contact.validation";
import { ZodError } from "zod";

export async function POST(request: Request) {
  try {
    const body = await request.json();

    // Validar datos con Zod
    const validatedData = contactFormSchema.parse(body);

    // Enviar email usando el servicio
    const result = await emailService.sendContactEmail(validatedData);

    if (!result.success) {
      return NextResponse.json(
        { error: result.message, details: result.error },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { 
        success: true,
        message: result.message 
      },
      { status: 200 }
    );
  } catch (error) {
    if (error instanceof ZodError) { // Validación
      return NextResponse.json(
        { 
          error: "Datos inválidos", 
          details: error.errors.map(e => ({
            field: e.path.join("."),
            message: e.message
          }))
        },
        { status: 400 }
      );
    }

    // Manejo de errores generales
    console.error("Error en API send-email:", error);
    return NextResponse.json(
      { 
        error: "Error al procesar la solicitud",
        details: error instanceof Error ? error.message : "Error desconocido"
      },
      { status: 500 }
    );
  }
}
