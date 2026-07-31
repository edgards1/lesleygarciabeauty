import { getDb, initModels } from "../connection";
import { Appointment } from "../models/index";
import type { CitaEstado } from "../models/Appointment";

export interface CreateAppointmentInput {
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
}

export async function createAppointment(
  input: CreateAppointmentInput
): Promise<Appointment> {
  const db = getDb();
  initModels(db);
  return Appointment.create({
    ...input,
    negocioId: input.negocioId,
    clienteId: input.clienteId,
    fecha: input.fecha,
    horaInicio: input.horaInicio,
    horaFin: input.horaFin,
    eventoGoogleId: null,
    cargaCalendar: false,
  });
}

export async function findByBusinessAndDate(
  negocioId: string,
  date: string
) {
  const db = getDb();
  initModels(db);
  return Appointment.findAll({
    where: { negocioId, fecha: date },
    order: [["horaInicio", "ASC"]],
  });
}

export async function findByEstado(
  negocioId: string,
  estado: CitaEstado,
  limit = 50
) {
  const db = getDb();
  initModels(db);
  return Appointment.findAll({
    where: { negocioId, estado },
    order: [["fecha", "DESC"]],
    limit,
  });
}
