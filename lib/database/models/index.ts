import type { Sequelize } from "sequelize";
import { initBusiness, Business } from "./Business";
import { initClient, Client } from "./Client";
import { initUser, User } from "./User";
import { initAppointment, Appointment } from "./Appointment";
import type { CitaEstado } from "./Appointment";
import { initServiceCategory, ServiceCategory } from "./ServiceCategory";
import { initService, Service } from "./Service";
import { initWorkingHour, WorkingHour } from "./WorkingHour";
import { initPaymentMethod, PaymentMethod } from "./PaymentMethod";
import { initScheduleBlock, ScheduleBlock } from "./ScheduleBlock";

// ── Exportaciones nuevas ──
export {
  Business,
  Client,
  User,
  Appointment,
  ServiceCategory,
  Service,
  WorkingHour,
  PaymentMethod,
  ScheduleBlock,
};

// ── Alias de compatibilidad hacia atrás ──
// El código existente importa Cita, Usuario (nombres en español)
const Cita = Appointment;
const Usuario = User;
export { Cita, Usuario };
export type { CitaEstado };

export type {
  AppointmentAttributes as CitaAttributes,
  AppointmentCreationAttributes as CitaCreationAttributes,
} from "./Appointment";
export type {
  UserAttributes as UsuarioAttributes,
  UserCreationAttributes as UsuarioCreationAttributes,
} from "./User";

export function initModels(sequelize: Sequelize): void {
  initBusiness(sequelize);
  initClient(sequelize);
  initUser(sequelize);
  initAppointment(sequelize);
  initServiceCategory(sequelize);
  initService(sequelize);
  initWorkingHour(sequelize);
  initPaymentMethod(sequelize);
  initScheduleBlock(sequelize);

  // ── Asociaciones ──

  // Business → *
  Business.hasMany(Client, { foreignKey: "negocio_id", sourceKey: "id" });
  Business.hasMany(User, { foreignKey: "negocio_id", sourceKey: "id" });
  Business.hasMany(Appointment, { foreignKey: "negocio_id", sourceKey: "id" });
  Business.hasMany(ServiceCategory, { foreignKey: "negocio_id", sourceKey: "id" });
  Business.hasMany(Service, { foreignKey: "negocio_id", sourceKey: "id" });
  Business.hasMany(WorkingHour, { foreignKey: "negocio_id", sourceKey: "id" });
  Business.hasMany(PaymentMethod, { foreignKey: "negocio_id", sourceKey: "id" });
  Business.hasMany(ScheduleBlock, { foreignKey: "negocio_id", sourceKey: "id" });

  // * → Business
  Client.belongsTo(Business, { foreignKey: "negocio_id", targetKey: "id" });
  User.belongsTo(Business, { foreignKey: "negocio_id", targetKey: "id" });
  Appointment.belongsTo(Business, { foreignKey: "negocio_id", targetKey: "id" });
  ServiceCategory.belongsTo(Business, { foreignKey: "negocio_id", targetKey: "id" });
  Service.belongsTo(Business, { foreignKey: "negocio_id", targetKey: "id" });
  WorkingHour.belongsTo(Business, { foreignKey: "negocio_id", targetKey: "id" });
  PaymentMethod.belongsTo(Business, { foreignKey: "negocio_id", targetKey: "id" });
  ScheduleBlock.belongsTo(Business, { foreignKey: "negocio_id", targetKey: "id" });

  // ServiceCategory → Service
  ServiceCategory.hasMany(Service, { foreignKey: "categoria_id", sourceKey: "id" });
  Service.belongsTo(ServiceCategory, { foreignKey: "categoria_id", targetKey: "id" });

  // Client → Appointment
  Client.hasMany(Appointment, { foreignKey: "cliente_id", sourceKey: "id" });
  Appointment.belongsTo(Client, { foreignKey: "cliente_id", targetKey: "id" });
}

export type {
  BusinessAttributes,
  BusinessCreationAttributes,
} from "./Business";
export type {
  ClientAttributes,
  ClientCreationAttributes,
} from "./Client";
export type {
  UserAttributes,
  UserCreationAttributes,
} from "./User";
export type {
  AppointmentAttributes,
  AppointmentCreationAttributes,
} from "./Appointment";
export type {
  ServiceCategoryAttributes,
  ServiceCategoryCreationAttributes,
} from "./ServiceCategory";
export type {
  ServiceAttributes,
  ServiceCreationAttributes,
} from "./Service";
export type {
  WorkingHourAttributes,
  WorkingHourCreationAttributes,
} from "./WorkingHour";
export type {
  PaymentMethodAttributes,
  PaymentMethodCreationAttributes,
} from "./PaymentMethod";
export type {
  ScheduleBlockAttributes,
  ScheduleBlockCreationAttributes,
} from "./ScheduleBlock";
