import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { getDb, initModels, BUSINESS_SLUG, Business } from "@/lib/database/connection";
import { WorkingHour } from "@/lib/database/models/index";

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

  const hours = await WorkingHour.findAll({
    where: { negocioId: business.id },
    order: [["diaSemana", "ASC"]],
  });

  const days = ["Domingo", "Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado"];
  const result = days.map((name, i) => {
    const found = hours.find((h) => h.diaSemana === i);
    return found
      ? {
          id: found.id,
          diaSemana: found.diaSemana,
          nombre: name,
          horaApertura: found.horaApertura,
          horaCierre: found.horaCierre,
          activo: found.activo,
        }
      : {
          diaSemana: i,
          nombre: name,
          horaApertura: null,
          horaCierre: null,
          activo: false,
        };
  });

  return NextResponse.json({ hours: result });
}

export async function PUT(request: Request) {
  const session = await auth();
  if (!session) return NextResponse.json({ error: "No autorizado" }, { status: 401 });

  const business = await getBusiness();
  if (!business) return NextResponse.json({ error: "Negocio no encontrado" }, { status: 404 });

  const db = getDb();
  initModels(db);

  const body = await request.json();
  const { diaSemana, horaApertura, horaCierre, activo } = body as {
    diaSemana: number;
    horaApertura: string | null;
    horaCierre: string | null;
    activo: boolean;
  };

  if (!activo || !horaApertura || !horaCierre) {
    await WorkingHour.destroy({
      where: { negocioId: business.id, diaSemana },
    });
    return NextResponse.json({ success: true });
  }

  const [row] = await WorkingHour.findOrCreate({
    where: { negocioId: business.id, diaSemana },
    defaults: { negocioId: business.id, diaSemana, horaApertura, horaCierre, activo },
  });

  if (!row.isNewRecord) {
    await row.update({ horaApertura, horaCierre, activo });
  }

  return NextResponse.json({ success: true });
}
