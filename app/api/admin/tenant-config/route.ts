import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { getDb, initModels, BUSINESS_SLUG, Business } from "@/lib/database/connection";

export const dynamic = "force-dynamic";

async function getBusiness() {
  const db = getDb();
  initModels(db);
  return Business.findOne({ where: { slug: BUSINESS_SLUG } });
}

export async function GET() {
  const session = await auth();
  if (!session) return NextResponse.json({ error: "No autorizado" }, { status: 401 });

  const b = await getBusiness();
  if (!b) return NextResponse.json({ error: "Negocio no encontrado" }, { status: 404 });

  return NextResponse.json({
    nombre: b.name,
    slug: b.slug,
    slugAgendamiento: b.slugAgendamiento,
    telefonoWhatsapp: b.telefonoWhatsapp,
    politicaCancelacion: b.politicaCancelacion,
    tiempoBuffer: b.tiempoBuffer,
    colorPrimario: b.colorPrimario,
    colorSecundario: b.colorSecundario,
    logoUrl: b.logoUrl,
    googleCalendarEmail: b.googleCalendarEmail,
  });
}

export async function PUT(request: Request) {
  const session = await auth();
  if (!session) return NextResponse.json({ error: "No autorizado" }, { status: 401 });

  const b = await getBusiness();
  if (!b) return NextResponse.json({ error: "Negocio no encontrado" }, { status: 404 });

  const body = await request.json();
  await b.update({
    name: body.nombre,
    slugAgendamiento: body.slugAgendamiento,
    telefonoWhatsapp: body.telefonoWhatsapp,
    politicaCancelacion: body.politicaCancelacion,
    tiempoBuffer: body.tiempoBuffer,
    colorPrimario: body.colorPrimario,
    colorSecundario: body.colorSecundario,
    logoUrl: body.logoUrl,
  } as any);

  return NextResponse.json({ success: true });
}
