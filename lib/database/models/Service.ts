import { DataTypes, Model, type Optional, type Sequelize } from "sequelize";

export interface ServiceAttributes {
  id: string;
  negocioId: string;
  categoriaId: string;
  nombre: string;
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

export interface ServiceCreationAttributes
  extends Optional<ServiceAttributes, "id" | "descripcion" | "porcentajeAnticipo" | "disponibleDomicilio" | "disponibleEstudio" | "incluye" | "activo" | "orden" | "redirigeWhatsapp"> {}

export class Service
  extends Model<ServiceAttributes, ServiceCreationAttributes>
  implements ServiceAttributes
{
  declare id: string;
  declare negocioId: string;
  declare categoriaId: string;
  declare nombre: string;
  declare descripcion: string | null;
  declare precioTotal: number;
  declare duracionMinutos: number;
  declare porcentajeAnticipo: number;
  declare disponibleDomicilio: boolean;
  declare disponibleEstudio: boolean;
  declare incluye: string[] | null;
  declare activo: boolean;
  declare orden: number;
  declare redirigeWhatsapp: boolean;
  declare readonly createdAt: Date;
  declare readonly updatedAt: Date;
}

export function initService(sequelize: Sequelize): void {
  Service.init(
    {
      id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true },
      negocioId: { type: DataTypes.UUID, allowNull: false, field: "negocio_id" },
      categoriaId: { type: DataTypes.UUID, allowNull: false, field: "categoria_id" },
      nombre: { type: DataTypes.STRING(255), allowNull: false },
      descripcion: { type: DataTypes.TEXT, allowNull: true },
      precioTotal: { type: DataTypes.DECIMAL(10, 2), allowNull: false, field: "precio_total" },
      duracionMinutos: { type: DataTypes.INTEGER, allowNull: false, field: "duracion_minutos" },
      porcentajeAnticipo: { type: DataTypes.INTEGER, defaultValue: 50, field: "porcentaje_anticipo" },
      disponibleDomicilio: { type: DataTypes.BOOLEAN, defaultValue: false, field: "disponible_domicilio" },
      disponibleEstudio: { type: DataTypes.BOOLEAN, defaultValue: true, field: "disponible_estudio" },
      incluye: { type: DataTypes.JSON, allowNull: true },
      activo: { type: DataTypes.BOOLEAN, defaultValue: true },
      orden: { type: DataTypes.INTEGER, defaultValue: 0 },
      redirigeWhatsapp: { type: DataTypes.BOOLEAN, defaultValue: false, field: "redirige_whatsapp" },
    },
    {
      sequelize,
      tableName: "servicios",
      createdAt: "creado_en",
      updatedAt: "actualizado_en",
    }
  );
}
