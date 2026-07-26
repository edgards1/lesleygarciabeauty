import { DataTypes, Model, type Optional, type Sequelize } from "sequelize";

export interface ServiceCategoryAttributes {
  id: string;
  negocioId: string;
  nombre: string;
  slug: string;
  orden: number;
  activo: boolean;
}

export interface ServiceCategoryCreationAttributes
  extends Optional<ServiceCategoryAttributes, "id" | "orden" | "activo"> {}

export class ServiceCategory
  extends Model<ServiceCategoryAttributes, ServiceCategoryCreationAttributes>
  implements ServiceCategoryAttributes
{
  declare id: string;
  declare negocioId: string;
  declare nombre: string;
  declare slug: string;
  declare orden: number;
  declare activo: boolean;
  declare readonly createdAt: Date;
  declare readonly updatedAt: Date;
}

export function initServiceCategory(sequelize: Sequelize): void {
  ServiceCategory.init(
    {
      id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true },
      negocioId: { type: DataTypes.UUID, allowNull: false, field: "negocio_id" },
      nombre: { type: DataTypes.STRING(100), allowNull: false },
      slug: { type: DataTypes.STRING(50), allowNull: false },
      orden: { type: DataTypes.INTEGER, defaultValue: 0 },
      activo: { type: DataTypes.BOOLEAN, defaultValue: true },
    },
    {
      sequelize,
      tableName: "categorias_servicios",
      createdAt: "creado_en",
      updatedAt: "actualizado_en",
      indexes: [{ unique: true, fields: ["negocio_id", "slug"] }],
    }
  );
}
