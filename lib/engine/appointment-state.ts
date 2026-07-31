export type CitaEstado =
  | "pendiente"
  | "pendiente_de_revision"
  | "confirmada"
  | "cancelada"
  | "completada";

const TRANSITIONS: Record<CitaEstado, CitaEstado[]> = {
  pendiente: ["pendiente_de_revision", "cancelada"],
  pendiente_de_revision: ["confirmada", "cancelada"],
  confirmada: ["completada", "cancelada"],
  cancelada: [],
  completada: [],
};

export function isValidTransition(from: CitaEstado, to: CitaEstado): boolean {
  return TRANSITIONS[from]?.includes(to) ?? false;
}

export function canCancel(estado: CitaEstado): boolean {
  return estado !== "cancelada" && estado !== "completada";
}

export function canComplete(estado: CitaEstado): boolean {
  return estado === "confirmada";
}

export function activeStates(): CitaEstado[] {
  return ["pendiente", "pendiente_de_revision", "confirmada"];
}
