import { NextResponse } from "next/server";
import { emailService } from "@/lib/services/resend.service";
import { contactFormSchema } from "@/lib/validations/contact.validation";
import { ZodError } from "zod";

const rateLimitMap = new Map<string, { count: number; resetAt: number }>();
const RATE_LIMIT_MAX = 3;
const RATE_LIMIT_WINDOW = 60 * 60 * 1000;

function getRateLimitKey(request: Request): string {
  const forwarded = request.headers.get("x-forwarded-for");
  if (forwarded) {
    return forwarded.split(",")[0].trim();
  }
  return "unknown";
}

function checkRateLimit(key: string): { allowed: boolean; retryAfter?: number } {
  const now = Date.now();
  const entry = rateLimitMap.get(key);

  if (!entry || now > entry.resetAt) {
    rateLimitMap.set(key, { count: 1, resetAt: now + RATE_LIMIT_WINDOW });
    return { allowed: true };
  }

  if (entry.count >= RATE_LIMIT_MAX) {
    const retryAfter = Math.ceil((entry.resetAt - now) / 1000);
    return { allowed: false, retryAfter };
  }

  entry.count++;
  return { allowed: true };
}

export async function POST(request: Request) {
  try {
    const rateLimitKey = getRateLimitKey(request);
    const { allowed, retryAfter } = checkRateLimit(rateLimitKey);

    if (!allowed) {
      return NextResponse.json(
        {
          error: "Demasiadas solicitudes. Intenta de nuevo en unos minutos.",
          retryAfter,
        },
        { status: 429 }
      );
    }

    const body = await request.json();

    if (body.honeypot) {
      return NextResponse.json(
        { success: true, message: "Mensaje enviado correctamente" },
        { status: 200 }
      );
    }

    const validatedData = contactFormSchema.parse(body);

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
        message: result.message,
      },
      { status: 200 }
    );
  } catch (error) {
    if (error instanceof ZodError) {
      return NextResponse.json(
        {
          error: "Datos inválidos",
          details: error.errors.map((e) => ({
            field: e.path.join("."),
            message: e.message,
          })),
        },
        { status: 400 }
      );
    }

    console.error("Error en API send-email:", error);
    return NextResponse.json(
      {
        error: "Error al procesar la solicitud",
        details: error instanceof Error ? error.message : "Error desconocido",
      },
      { status: 500 }
    );
  }
}
