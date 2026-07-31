import { QueryTypes } from "sequelize";
import { getDb, initModels } from "../connection";
import type { BusyPeriod, BlockPeriod } from "../../engine/availability.engine";

export interface WorkingHourRow {
  id: string;
  dia_semana: number;
  hora_apertura: string;
  hora_cierre: string;
}

export async function getWorkingHours(negocioId: string): Promise<WorkingHourRow[]> {
  const db = getDb();
  initModels(db);
  return db.query<WorkingHourRow>(
    `SELECT id, dia_semana, hora_apertura, hora_cierre
     FROM horarios_atencion
     WHERE negocio_id = :negocioId AND activo = TRUE`,
    { replacements: { negocioId }, type: QueryTypes.SELECT }
  );
}

export async function getScheduleBlocks(
  negocioId: string,
  date: string
): Promise<BlockPeriod[]> {
  const db = getDb();
  initModels(db);

  const rows = await db.query<{
    fecha_inicio: string;
    fecha_fin: string;
    hora_inicio: string | null;
    hora_fin: string | null;
  }>(
    `SELECT fecha_inicio, fecha_fin, hora_inicio, hora_fin
     FROM bloqueos_agenda
     WHERE negocio_id = :negocioId
       AND fecha_inicio <= :date
       AND fecha_fin >= :date`,
    { replacements: { negocioId, date }, type: QueryTypes.SELECT }
  );

  return rows.map((r) => ({
    start: r.hora_inicio
      ? new Date(`${r.fecha_inicio}T${r.hora_inicio}`)
      : new Date(`${r.fecha_inicio}T00:00:00`),
    end: r.hora_fin
      ? new Date(`${r.fecha_fin}T${r.hora_fin}`)
      : new Date(`${r.fecha_fin}T23:59:59`),
  }));
}

export async function getExistingAppointments(
  negocioId: string,
  date: string
): Promise<BusyPeriod[]> {
  const db = getDb();
  initModels(db);

  const rows = await db.query<{
    fecha: string;
    hora_inicio: string;
    hora_fin: string;
  }>(
    `SELECT fecha, hora_inicio, hora_fin
     FROM citas
     WHERE negocio_id = :negocioId
       AND fecha = :date
       AND estado NOT IN ('cancelada')`,
    { replacements: { negocioId, date }, type: QueryTypes.SELECT }
  );

  return rows.map((r) => ({
    start: new Date(`${r.fecha}T${r.hora_inicio}:00`),
    end: new Date(`${r.fecha}T${r.hora_fin}:00`),
  }));
}
