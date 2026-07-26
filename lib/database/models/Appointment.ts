import { DataTypes, Model, type Optional, type Sequelize } from "sequelize";

export type CitaEstado = "pendiente" | "pendiente_de_revision" | "confirmada" | "cancelada" | "completada";

export interface AppointmentAttributes {
  id: string;
  negocioId: string;
  clienteId: string;
  servicioNombre: string;
  servicioPrecio: number;
  servicioCategoria: string;
  servicioDuracion: string;
  tipoUbicacion: string;
  direccion: string | null;
  referencia: string | null;
  latitud: number | null;
  longitud: number | null;
  fecha: string;
  horaInicio: string;
  horaFin: string;
  montoPagado: number;
  porcentaje: number;
  codigoSeguimiento: string;
  comprobanteArchivo: string;
  estado: CitaEstado;
  eventoGoogleId: string | null;
  cargaCalendar: boolean;
}

export interface AppointmentCreationAttributes
  extends Optional<AppointmentAttributes, "id" | "eventoGoogleId" | "cargaCalendar"> {}

export class Appointment
  extends Model<AppointmentAttributes, AppointmentCreationAttributes>
  implements AppointmentAttributes
{
  declare id: string;
  declare negocioId: string;
  declare clienteId: string;
  declare servicioNombre: string;
  declare servicioPrecio: number;
  declare servicioCategoria: string;
  declare servicioDuracion: string;
  declare tipoUbicacion: string;
  declare direccion: string | null;
  declare referencia: string | null;
  declare latitud: number | null;
  declare longitud: number | null;
  declare fecha: string;
  declare horaInicio: string;
  declare horaFin: string;
  declare montoPagado: number;
  declare porcentaje: number;
  declare codigoSeguimiento: string;
  declare comprobanteArchivo: string;
  declare estado: CitaEstado;
  declare eventoGoogleId: string | null;
  declare cargaCalendar: boolean;
  declare readonly createdAt: Date;
  declare readonly updatedAt: Date;
}

export function initAppointment(sequelize: Sequelize): void {
  Appointment.init(
    {
      id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true },
      negocioId: { type: DataTypes.UUID, allowNull: false, field: "negocio_id" },
      clienteId: { type: DataTypes.UUID, allowNull: false, field: "cliente_id" },
      servicioNombre: { type: DataTypes.STRING(255), allowNull: false, field: "servicio_nombre" },
      servicioPrecio: { type: DataTypes.DECIMAL(10, 2), allowNull: false, field: "servicio_precio" },
      servicioCategoria: { type: DataTypes.STRING(50), allowNull: false, field: "servicio_categoria" },
      servicioDuracion: { type: DataTypes.STRING(20), allowNull: false, field: "servicio_duracion" },
      tipoUbicacion: { type: DataTypes.STRING(20), allowNull: false, defaultValue: "studio", field: "tipo_ubicacion" },
      direccion: { type: DataTypes.TEXT, allowNull: true },
      referencia: { type: DataTypes.STRING(255), allowNull: true },
      latitud: { type: DataTypes.DECIMAL(10, 7), allowNull: true },
      longitud: { type: DataTypes.DECIMAL(10, 7), allowNull: true },
      fecha: { type: DataTypes.DATEONLY, allowNull: false },
      horaInicio: { type: DataTypes.STRING(5), allowNull: false, field: "hora_inicio" },
      horaFin: { type: DataTypes.STRING(5), allowNull: false, field: "hora_fin" },
      montoPagado: { type: DataTypes.DECIMAL(10, 2), allowNull: false, field: "monto_pagado" },
      porcentaje: { type: DataTypes.INTEGER, allowNull: false },
      codigoSeguimiento: { type: DataTypes.STRING(255), allowNull: false, field: "codigo_seguimiento" },
      comprobanteArchivo: { type: DataTypes.STRING(255), allowNull: false, field: "comprobante_archivo" },
      estado: {
        type: DataTypes.ENUM("pendiente", "pendiente_de_revision", "confirmada", "cancelada", "completada"),
        defaultValue: "pendiente",
      },
      eventoGoogleId: { type: DataTypes.STRING(255), allowNull: true, field: "evento_google_id" },
      cargaCalendar: { type: DataTypes.BOOLEAN, allowNull: false, defaultValue: false, field: "carga_calendar" },
    },
    {
      sequelize,
      tableName: "citas",
      indexes: [{ fields: ["fecha"] }, { fields: ["estado"] }],
      createdAt: "creado_en",
      updatedAt: "actualizado_en",
    }
  );
}
