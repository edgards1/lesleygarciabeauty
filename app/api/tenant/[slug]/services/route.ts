import { NextResponse } from "next/server";
import { findByAgendamientoSlug } from "@/lib/database/repositories/tenant.repository";
import { getCategoriesWithServices } from "@/lib/database/repositories/service.repository";

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params;
    const tenant = await findByAgendamientoSlug(slug);

    if (!tenant) {
      return NextResponse.json({ error: "Negocio no encontrado" }, { status: 404 });
    }

    const categories = await getCategoriesWithServices(tenant.id);

    return NextResponse.json({
      slug,
      categories,
    });
  } catch (error) {
    console.error("Error en tenant/services:", error);
    return NextResponse.json(
      { error: "Error al cargar servicios" },
      { status: 500 }
    );
  }
}
