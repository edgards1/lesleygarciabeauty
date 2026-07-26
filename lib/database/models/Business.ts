import { DataTypes, Model, type Optional, type Sequelize } from "sequelize";

export interface BusinessAttributes {
  id: string;
  name: string;
  slug: string;
  slugAgendamiento: string | null;
  dominioPersonalizado: string | null;
  timezone: string;
  googleRefreshToken: string | null;
  googleCalendarEmail: string | null;
  telefonoWhatsapp: string | null;
  politicaCancelacion: string | null;
  tiempoBuffer: number;
  logoUrl: string | null;
  colorPrimario: string;
  colorSecundario: string;
}

export interface BusinessCreationAttributes
  extends Optional<BusinessAttributes, "id" | "slugAgendamiento" | "dominioPersonalizado" | "googleRefreshToken" | "googleCalendarEmail" | "telefonoWhatsapp" | "politicaCancelacion" | "tiempoBuffer" | "logoUrl" | "colorPrimario" | "colorSecundario"> {}

export class Business
  extends Model<BusinessAttributes, BusinessCreationAttributes>
  implements BusinessAttributes
{
  declare id: string;
  declare name: string;
  declare slug: string;
  declare slugAgendamiento: string | null;
  declare dominioPersonalizado: string | null;
  declare timezone: string;
  declare googleRefreshToken: string | null;
  declare googleCalendarEmail: string | null;
  declare telefonoWhatsapp: string | null;
  declare politicaCancelacion: string | null;
  declare tiempoBuffer: number;
  declare logoUrl: string | null;
  declare colorPrimario: string;
  declare colorSecundario: string;
  declare readonly createdAt: Date;
  declare readonly updatedAt: Date;
}

export function initBusiness(sequelize: Sequelize): void {
  Business.init(
    {
      id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true },
      name: { type: DataTypes.STRING(255), allowNull: false, field: "nombre" },
      slug: { type: DataTypes.STRING(100), allowNull: false, unique: true },
      slugAgendamiento: { type: DataTypes.STRING(100), allowNull: true, unique: true, field: "slug_agendamiento" },
      dominioPersonalizado: { type: DataTypes.STRING(255), allowNull: true, unique: true, field: "dominio_personalizado" },
      timezone: { type: DataTypes.STRING(50), allowNull: false, defaultValue: "America/Guayaquil", field: "zona_horaria" },
      googleRefreshToken: { type: DataTypes.TEXT, allowNull: true, field: "google_refresh_token" },
      googleCalendarEmail: { type: DataTypes.STRING(255), allowNull: true, field: "google_calendar_email" },
      telefonoWhatsapp: { type: DataTypes.STRING(20), allowNull: true, field: "telefono_whatsapp" },
      politicaCancelacion: { type: DataTypes.TEXT, allowNull: true, field: "politica_cancelacion" },
      tiempoBuffer: { type: DataTypes.INTEGER, allowNull: false, defaultValue: 15, field: "tiempo_buffer" },
      logoUrl: { type: DataTypes.STRING(500), allowNull: true, field: "logo_url" },
      colorPrimario: { type: DataTypes.STRING(7), allowNull: false, defaultValue: "#B76E79", field: "color_primario" },
      colorSecundario: { type: DataTypes.STRING(7), allowNull: false, defaultValue: "#8B4513", field: "color_secundario" },
    },
    {
      sequelize,
      tableName: "negocios",
      createdAt: "creado_en",
      updatedAt: "actualizado_en",
    }
  );
}
