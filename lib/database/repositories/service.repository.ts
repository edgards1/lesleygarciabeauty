import { QueryTypes } from "sequelize";
import { getDb, initModels } from "../connection";
import { ServiceCategory } from "../models/index";

export interface ServiceRow {
  id: string;
  nombre: string;
  descripcion: string | null;
  precio_total: number;
  duracion_minutos: number;
  porcentaje_anticipo: number;
  disponible_domicilio: number;
  disponible_estudio: number;
  incluye: string | null;
  orden: number;
  redirige_whatsapp: number;
  categoria_id: string;
}

export interface CategoryRow {
  id: string;
  nombre: string;
  slug: string;
  orden: number;
  servicios: ServiceRow[];
}

export async function getCategoriesWithServices(
  negocioId: string
): Promise<CategoryRow[]> {
  const db = getDb();
  initModels(db);

  const categories = await ServiceCategory.findAll({
    where: { negocioId, activo: true },
    order: [["orden", "ASC"]],
    raw: true,
  });

  const services = await db.query<ServiceRow>(
    `SELECT s.*
     FROM servicios s
     JOIN categorias_servicios c ON s.categoria_id = c.id
     WHERE c.negocio_id = :negocioId
       AND c.activo = TRUE
       AND s.activo = TRUE
     ORDER BY c.orden ASC, s.orden ASC`,
    {
      replacements: { negocioId },
      type: QueryTypes.SELECT,
    }
  );

  return categories.map((cat: any) => ({
    id: cat.id,
    nombre: cat.nombre,
    slug: cat.slug,
    orden: cat.orden,
    servicios: services.filter((s) => s.categoria_id === cat.id),
  }));
}

export async function getServiceById(serviceId: string): Promise<ServiceRow | null> {
  const db = getDb();
  initModels(db);
  const rows = await db.query<ServiceRow>(
    `SELECT * FROM servicios WHERE id = :id AND activo = TRUE`,
    { replacements: { id: serviceId }, type: QueryTypes.SELECT }
  );
  return (rows as ServiceRow[])[0] ?? null;
}
