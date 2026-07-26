import { DataTypes, Model, type Optional, type Sequelize } from "sequelize";

export interface WorkingHourAttributes {
  id: string;
  negocioId: string;
  diaSemana: number;
  horaApertura: string;
  horaCierre: string;
  activo: boolean;
}

export interface WorkingHourCreationAttributes
  extends Optional<WorkingHourAttributes, "id" | "activo"> {}

export class WorkingHour
  extends Model<WorkingHourAttributes, WorkingHourCreationAttributes>
  implements WorkingHourAttributes
{
  declare id: string;
  declare negocioId: string;
  declare diaSemana: number;
  declare horaApertura: string;
  declare horaCierre: string;
  declare activo: boolean;
  declare readonly createdAt: Date;
  declare readonly updatedAt: Date;
}

export function initWorkingHour(sequelize: Sequelize): void {
  WorkingHour.init(
    {
      id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true },
      negocioId: { type: DataTypes.UUID, allowNull: false, field: "negocio_id" },
      diaSemana: { type: DataTypes.TINYINT, allowNull: false, field: "dia_semana" },
      horaApertura: { type: DataTypes.TIME, allowNull: false, field: "hora_apertura" },
      horaCierre: { type: DataTypes.TIME, allowNull: false, field: "hora_cierre" },
      activo: { type: DataTypes.BOOLEAN, defaultValue: true },
    },
    {
      sequelize,
      tableName: "horarios_atencion",
      createdAt: "creado_en",
      updatedAt: "actualizado_en",
    }
  );
}
