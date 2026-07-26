import { DataTypes, Model, type Optional, type Sequelize } from "sequelize";

export interface PaymentMethodAttributes {
  id: string;
  negocioId: string;
  tipo: "transferencia" | "payphone" | "stripe";
  banco: string | null;
  tipoCuenta: string | null;
  numeroCuenta: string | null;
  titular: string | null;
  emailCuenta: string | null;
  documentoId: string | null;
  activo: boolean;
}

export interface PaymentMethodCreationAttributes
  extends Optional<PaymentMethodAttributes, "id" | "banco" | "tipoCuenta" | "numeroCuenta" | "titular" | "emailCuenta" | "documentoId" | "activo"> {}

export class PaymentMethod
  extends Model<PaymentMethodAttributes, PaymentMethodCreationAttributes>
  implements PaymentMethodAttributes
{
  declare id: string;
  declare negocioId: string;
  declare tipo: "transferencia" | "payphone" | "stripe";
  declare banco: string | null;
  declare tipoCuenta: string | null;
  declare numeroCuenta: string | null;
  declare titular: string | null;
  declare emailCuenta: string | null;
  declare documentoId: string | null;
  declare activo: boolean;
  declare readonly createdAt: Date;
  declare readonly updatedAt: Date;
}

export function initPaymentMethod(sequelize: Sequelize): void {
  PaymentMethod.init(
    {
      id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true },
      negocioId: { type: DataTypes.UUID, allowNull: false, field: "negocio_id" },
      tipo: {
        type: DataTypes.ENUM("transferencia", "payphone", "stripe"),
        allowNull: false,
        defaultValue: "transferencia",
      },
      banco: { type: DataTypes.STRING(100), allowNull: true },
      tipoCuenta: { type: DataTypes.STRING(50), allowNull: true, field: "tipo_cuenta" },
      numeroCuenta: { type: DataTypes.STRING(50), allowNull: true, field: "numero_cuenta" },
      titular: { type: DataTypes.STRING(255), allowNull: true },
      emailCuenta: { type: DataTypes.STRING(255), allowNull: true, field: "email_cuenta" },
      documentoId: { type: DataTypes.STRING(20), allowNull: true, field: "documento_id" },
      activo: { type: DataTypes.BOOLEAN, defaultValue: true },
    },
    {
      sequelize,
      tableName: "metodos_pago",
      createdAt: "creado_en",
      updatedAt: "actualizado_en",
    }
  );
}
