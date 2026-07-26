import { DataTypes, Model, type Optional, type Sequelize } from "sequelize";

export interface UserAttributes {
  id: string;
  negocioId: string;
  email: string;
  password: string;
  nombre: string;
}

export interface UserCreationAttributes extends Optional<UserAttributes, "id"> {}

export class User
  extends Model<UserAttributes, UserCreationAttributes>
  implements UserAttributes
{
  declare id: string;
  declare negocioId: string;
  declare email: string;
  declare password: string;
  declare nombre: string;
  declare readonly createdAt: Date;
  declare readonly updatedAt: Date;
}

export function initUser(sequelize: Sequelize): void {
  User.init(
    {
      id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true },
      negocioId: { type: DataTypes.UUID, allowNull: false, field: "negocio_id" },
      email: { type: DataTypes.STRING(255), allowNull: false, unique: true },
      password: { type: DataTypes.STRING(255), allowNull: false },
      nombre: { type: DataTypes.STRING(255), allowNull: false, field: "nombre" },
    },
    {
      sequelize,
      tableName: "usuarios",
      createdAt: "creado_en",
      updatedAt: "actualizado_en",
    }
  );
}
