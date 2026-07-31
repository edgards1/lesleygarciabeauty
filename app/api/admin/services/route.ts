import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { getDb, initModels, BUSINESS_SLUG, Business } from "@/lib/database/connection";
import { ServiceCategory, Service } from "@/lib/database/models/index";

export const dynamic = "force-dynamic";

async function getBusiness() {
  const db = getDb();
  initModels(db);
  return Business.findOne({ where: { slug: BUSINESS_SLUG } });
}

export async function GET() {
  const session = await auth();
  if (!session) return NextResponse.json({ error: "No autorizado" }, { status: 401 });

  const business = await getBusiness();
  if (!business) return NextResponse.json({ error: "Negocio no encontrado" }, { status: 404 });

  const categories = await ServiceCategory.findAll({
    where: { negocioId: business.id },
    order: [["orden", "ASC"]],
    include: [{ model: Service, required: false, separate: true, order: [["orden", "ASC"]] }],
  });

  return NextResponse.json({
    categories: categories.map((c) => ({
      ...c.toJSON(),
      servicios: (c as any).Services?.map((s: any) => s.toJSON()) ?? [],
    })),
  });
}

export async function POST(request: Request) {
  const session = await auth();
  if (!session) return NextResponse.json({ error: "No autorizado" }, { status: 401 });

  const business = await getBusiness();
  if (!business) return NextResponse.json({ error: "Negocio no encontrado" }, { status: 404 });

  const db = getDb();
  initModels(db);

  const body = await request.json();
  const { type, data } = body as {
    type: "category" | "service";
    data: Record<string, unknown>;
  };

  if (type === "category") {
    const cat = await ServiceCategory.create({
      ...data,
      negocioId: business.id,
    });
    return NextResponse.json(cat.toJSON());
  }

  if (type === "service") {
    const svc = await Service.create({
      ...data,
      negocioId: business.id,
    });
    return NextResponse.json(svc.toJSON());
  }

  return NextResponse.json({ error: "Tipo inválido" }, { status: 400 });
}

export async function PUT(request: Request) {
  const session = await auth();
  if (!session) return NextResponse.json({ error: "No autorizado" }, { status: 401 });

  const db = getDb();
  initModels(db);

  const body = await request.json();
  const { type, id, data } = body as {
    type: "category" | "service";
    id: string;
    data: Record<string, unknown>;
  };

  if (type === "category") {
    await ServiceCategory.update(data, { where: { id } });
    const updated = await ServiceCategory.findByPk(id);
    return NextResponse.json(updated?.toJSON());
  }

  if (type === "service") {
    await Service.update(data, { where: { id } });
    const updated = await Service.findByPk(id);
    return NextResponse.json(updated?.toJSON());
  }

  return NextResponse.json({ error: "Tipo inválido" }, { status: 400 });
}

export async function DELETE(request: Request) {
  const session = await auth();
  if (!session) return NextResponse.json({ error: "No autorizado" }, { status: 401 });

  const db = getDb();
  initModels(db);

  const { searchParams } = new URL(request.url);
  const type = searchParams.get("type");
  const id = searchParams.get("id");
  if (!id || !type) return NextResponse.json({ error: "Parámetros requeridos" }, { status: 400 });

  if (type === "category") {
    await Service.destroy({ where: { categoriaId: id } });
    await ServiceCategory.destroy({ where: { id } });
    return NextResponse.json({ success: true });
  }

  if (type === "service") {
    await Service.destroy({ where: { id } });
    return NextResponse.json({ success: true });
  }

  return NextResponse.json({ error: "Tipo inválido" }, { status: 400 });
}
