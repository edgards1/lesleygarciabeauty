import { DataTypes, Model, type Optional, type Sequelize } from "sequelize";

export interface ScheduleBlockAttributes {
  id: string;
  negocioId: string;
  fechaInicio: string;
  fechaFin: string;
  motivo: string | null;
  horaInicio: string | null;
  horaFin: string | null;
}

export interface ScheduleBlockCreationAttributes
  extends Optional<ScheduleBlockAttributes, "id" | "motivo" | "horaInicio" | "horaFin"> {}

export class ScheduleBlock
  extends Model<ScheduleBlockAttributes, ScheduleBlockCreationAttributes>
  implements ScheduleBlockAttributes
{
  declare id: string;
  declare negocioId: string;
  declare fechaInicio: string;
  declare fechaFin: string;
  declare motivo: string | null;
  declare horaInicio: string | null;
  declare horaFin: string | null;
  declare readonly createdAt: Date;
}

export function initScheduleBlock(sequelize: Sequelize): void {
  ScheduleBlock.init(
    {
      id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true },
      negocioId: { type: DataTypes.UUID, allowNull: false, field: "negocio_id" },
      fechaInicio: { type: DataTypes.DATEONLY, allowNull: false, field: "fecha_inicio" },
      fechaFin: { type: DataTypes.DATEONLY, allowNull: false, field: "fecha_fin" },
      motivo: { type: DataTypes.STRING(255), allowNull: true },
      horaInicio: { type: DataTypes.TIME, allowNull: true, field: "hora_inicio" },
      horaFin: { type: DataTypes.TIME, allowNull: true, field: "hora_fin" },
    },
    {
      sequelize,
      tableName: "bloqueos_agenda",
      createdAt: "creado_en",
      updatedAt: false,
    }
  );
}
