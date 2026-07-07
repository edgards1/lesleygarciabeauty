import { Sequelize, DataTypes, Model, type Optional } from "sequelize";

function createSequelize(): Sequelize {
  return new Sequelize(
    process.env.DB_NAME || "",
    process.env.DB_USER || "",
    process.env.DB_PASS || "",
    {
      host: process.env.DB_HOST || "localhost",
      port: parseInt(process.env.DB_PORT || "3306", 10),
      dialect: "mysql",
      logging: process.env.NODE_ENV === "development" ? console.log : false,
      pool: { max: 10, min: 0, acquire: 30000, idle: 10000 },
      define: { timestamps: true, underscored: false },
    }
  );
}

let sequelize: Sequelize;

export function getDb(): Sequelize {
  if (!sequelize) {
    sequelize = createSequelize();
  }
  return sequelize;
}

// ============================================================
// Negocio
// ============================================================

export interface BusinessAttributes {
  id: string;
  name: string;
  slug: string;
  timezone: string;
  googleRefreshToken: string | null;
  googleCalendarEmail: string | null;
}

export interface BusinessCreationAttributes extends Optional<BusinessAttributes, "id" | "googleRefreshToken" | "googleCalendarEmail"> {}

export class Business
  extends Model<BusinessAttributes, BusinessCreationAttributes>
  implements BusinessAttributes
{
  declare id: string;
  declare name: string;
  declare slug: string;
  declare timezone: string;
  declare googleRefreshToken: string | null;
  declare googleCalendarEmail: string | null;
  declare readonly createdAt: Date;
  declare readonly updatedAt: Date;
}

// ============================================================
// Cliente
// ============================================================

export interface ClientAttributes {
  id: string;
  businessId: string;
  name: string;
  email: string;
  phone: string;
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
  declare readonly createdAt: Date;
  declare readonly updatedAt: Date;
}

// ============================================================
// Usuario (admin)
// ============================================================

export interface UsuarioAttributes {
  id: string;
  negocioId: string;
  email: string;
  password: string;
  nombre: string;
}

export interface UsuarioCreationAttributes extends Optional<UsuarioAttributes, "id"> {}

export class Usuario
  extends Model<UsuarioAttributes, UsuarioCreationAttributes>
  implements UsuarioAttributes
{
  declare id: string;
  declare negocioId: string;
  declare email: string;
  declare password: string;
  declare nombre: string;
  declare readonly createdAt: Date;
  declare readonly updatedAt: Date;
}

// ============================================================
// Cita
// ============================================================

export type CitaEstado = "pendiente" | "pendiente_de_revision" | "confirmada" | "cancelada" | "completada";

export interface CitaAttributes {
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

export interface CitaCreationAttributes extends Optional<CitaAttributes, "id" | "eventoGoogleId" | "cargaCalendar"> {}

export class Cita
  extends Model<CitaAttributes, CitaCreationAttributes>
  implements CitaAttributes
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

// ============================================================
// Inicializar modelos
// ============================================================

export function initModels(db: Sequelize): void {
  Business.init(
    {
      id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true },
      name: { type: DataTypes.STRING(255), allowNull: false, field: "nombre" },
      slug: { type: DataTypes.STRING(100), allowNull: false, unique: true },
      timezone: { type: DataTypes.STRING(50), allowNull: false, defaultValue: "America/Guayaquil", field: "zona_horaria" },
      googleRefreshToken: { type: DataTypes.TEXT, allowNull: true, field: "google_refresh_token" },
      googleCalendarEmail: { type: DataTypes.STRING(255), allowNull: true, field: "google_calendar_email" },
    },
    {
      sequelize: db,
      tableName: "negocios",
      createdAt: "creado_en",
      updatedAt: "actualizado_en",
    }
  );

  Client.init(
    {
      id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true },
      businessId: { type: DataTypes.UUID, allowNull: false, field: "negocio_id" },
      name: { type: DataTypes.STRING(255), allowNull: false, field: "nombre" },
      email: { type: DataTypes.STRING(255), allowNull: false },
      phone: { type: DataTypes.STRING(50), allowNull: false, field: "telefono" },
    },
    {
      sequelize: db,
      tableName: "clientes",
      indexes: [{ fields: ["email"] }],
      createdAt: "creado_en",
      updatedAt: "actualizado_en",
    }
  );

  Usuario.init(
    {
      id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true },
      negocioId: { type: DataTypes.UUID, allowNull: false, field: "negocio_id" },
      email: { type: DataTypes.STRING(255), allowNull: false, unique: true },
      password: { type: DataTypes.STRING(255), allowNull: false },
      nombre: { type: DataTypes.STRING(255), allowNull: false, field: "nombre" },
    },
    {
      sequelize: db,
      tableName: "usuarios",
      createdAt: "creado_en",
      updatedAt: "actualizado_en",
    }
  );

  Business.hasMany(Usuario, { foreignKey: "negocioId", sourceKey: "id" });
  Usuario.belongsTo(Business, { foreignKey: "negocioId", targetKey: "id" });

  Cita.init(
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
      sequelize: db,
      tableName: "citas",
      indexes: [{ fields: ["fecha"] }, { fields: ["estado"] }],
      createdAt: "creado_en",
      updatedAt: "actualizado_en",
    }
  );

  Business.hasMany(Client, { foreignKey: "businessId", sourceKey: "id" });
  Client.belongsTo(Business, { foreignKey: "businessId", targetKey: "id" });

  Business.hasMany(Cita, { foreignKey: "negocioId", sourceKey: "id" });
  Cita.belongsTo(Business, { foreignKey: "negocioId", targetKey: "id" });

  Client.hasMany(Cita, { foreignKey: "clienteId", sourceKey: "id" });
  Cita.belongsTo(Client, { foreignKey: "clienteId", targetKey: "id" });
}

// ============================================================
// Sincronizar base de datos (desarrollo)
// ============================================================

export async function syncDatabase(): Promise<void> {
  const db = getDb();
  initModels(db);
  await db.sync({ alter: process.env.NODE_ENV === "development" });
}

// ============================================================
// Seed — negocio por defecto
// ============================================================

export const BUSINESS_SLUG = "lesleygarciabeauty";

export async function seedDefaultBusiness(): Promise<Business> {
  const db = getDb();
  initModels(db);

  const [business] = await Business.findOrCreate({
    where: { slug: BUSINESS_SLUG },
    defaults: {
      name: "Lesley García Beauty",
      slug: BUSINESS_SLUG,
      timezone: "America/Guayaquil",
    },
  });

  return business;
}
