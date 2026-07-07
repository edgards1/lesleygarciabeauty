import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { getDb, initModels, Cita, Client, BUSINESS_SLUG, Business } from "@/lib/database/connection";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const session = await auth();
    if (!session?.user?.email) {
      return NextResponse.json({ error: "No autorizado" }, { status: 401 });
    }

    const db = getDb();
    initModels(db);

    const business = await Business.findOne({ where: { slug: BUSINESS_SLUG } });
    if (!business) {
      return NextResponse.json({ error: "Negocio no encontrado" }, { status: 404 });
    }

    const citas = await Cita.findAll({
      where: { negocioId: business.id, estado: "pendiente_de_revision" },
      order: [["fecha", "ASC"]],
    });

    const clientIds = [...new Set(citas.map((c) => c.clienteId))];
    const clients = await Client.findAll({
      where: { id: clientIds },
      attributes: ["id", "name", "email", "phone"],
    });

    const clientMap = new Map(clients.map((c) => [c.id, c]));

    const data = citas.map((cita) => ({
      id: cita.id,
      servicioNombre: cita.servicioNombre,
      servicioPrecio: cita.servicioPrecio,
      servicioCategoria: cita.servicioCategoria,
      fecha: cita.fecha,
      horaInicio: cita.horaInicio,
      horaFin: cita.horaFin,
      montoPagado: cita.montoPagado,
      porcentaje: cita.porcentaje,
      codigoSeguimiento: cita.codigoSeguimiento,
      comprobanteArchivo: cita.comprobanteArchivo,
      tipoUbicacion: cita.tipoUbicacion,
      direccion: cita.direccion,
      referencia: cita.referencia,
      estado: cita.estado,
      creadoEn: cita.createdAt,
      cliente: clientMap.get(cita.clienteId) || null,
    }));

    return NextResponse.json({ citas: data });
  } catch (error) {
    console.error("Error en pending-reviews:", error);
    return NextResponse.json({ error: "Error interno" }, { status: 500 });
  }
}
