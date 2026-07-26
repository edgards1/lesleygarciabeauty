import { DataTypes, Model, type Optional, type Sequelize } from "sequelize";

export interface ClientAttributes {
  id: string;
  businessId: string;
  name: string;
  email: string;
  phone: string;
  documentId: string;
}

export interface ClientCreationAttributes extends Optional<ClientAttributes, "id"> {}

export class Client
  extends Model<ClientAttributes, ClientCreationAttributes>
  implements ClientAttributes
{
  declare id: string;
  declare businessId: string;
  declare name: string;
  declare email: string;
  declare phone: string;
  declare documentId: string;
  declare readonly createdAt: Date;
  declare readonly updatedAt: Date;
}

export function initClient(sequelize: Sequelize): void {
  Client.init(
    {
      id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true },
      businessId: { type: DataTypes.UUID, allowNull: false, field: "negocio_id" },
      name: { type: DataTypes.STRING(255), allowNull: false, field: "nombre" },
      email: { type: DataTypes.STRING(255), allowNull: false },
      phone: { type: DataTypes.STRING(50), allowNull: false, field: "telefono" },
      documentId: { type: DataTypes.STRING(13), allowNull: false, field: "documento_id" },
    },
    {
      sequelize,
      tableName: "clientes",
      indexes: [{ fields: ["email"] }],
      createdAt: "creado_en",
      updatedAt: "actualizado_en",
    }
  );
}
