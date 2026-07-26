import { getDb, initModels } from "../connection";
import { ServiceCategory, Service } from "../models/index";

export interface ServiceWithIncludes {
  id: string;
  name: string;
  descripcion: string | null;
  precioTotal: number;
  duracionMinutos: number;
  porcentajeAnticipo: number;
  disponibleDomicilio: boolean;
  disponibleEstudio: boolean;
  incluye: string[] | null;
  activo: boolean;
  orden: number;
  redirigeWhatsapp: boolean;
}

export interface CategoryWithServices {
  id: string;
  nombre: string;
  slug: string;
  orden: number;
  servicios: ServiceWithIncludes[];
}

export async function getCategoriesWithServices(
  negocioId: string
): Promise<CategoryWithServices[]> {
  const db = getDb();
  initModels(db);

  const categories = await ServiceCategory.findAll({
    where: { negocioId, activo: true },
    order: [["orden", "ASC"]],
    include: [
      {
        model: Service,
        required: false,
        separate: true,
        order: [["orden", "ASC"]],
      },
    ],
  });

  // Sequelize populates the include via the hasMany association
  return categories.map((cat) => {
    const raw = cat.toJSON() as any;
    return {
      id: raw.id,
      nombre: raw.nombre,
      slug: raw.slug,
      orden: raw.orden,
      servicios: (raw.servicios || []).map((s: any) => ({
        id: s.id,
        name: s.nombre,
        descripcion: s.descripcion,
        precioTotal: parseFloat(s.precio_total),
        duracionMinutos: s.duracion_minutos,
        porcentajeAnticipo: s.porcentaje_anticipo,
        disponibleDomicilio: s.disponible_domicilio,
        disponibleEstudio: s.disponible_estudio,
        incluye: s.incluye ?? null,
        activo: s.activo,
        orden: s.orden,
        redirigeWhatsapp: s.redirige_whatsapp,
      })),
    };
  });
}

export async function getServiceById(serviceId: string) {
  const db = getDb();
  initModels(db);
  return Service.findByPk(serviceId, { raw: true });
}
