export interface Slot {
  time: string;
  available: boolean;
}

export interface WorkingHourLike {
  diaSemana: number;
  horaApertura: string;
  horaCierre: string;
}

export interface BusyPeriod {
  start: Date;
  end: Date;
}

export interface BlockPeriod {
  start: Date;
  end: Date;
}

function parseTime(timeStr: string): [number, number] {
  const parts = timeStr.split("T").pop() ?? timeStr;
  const [h, m] = parts.split(":").map(Number);
  return [h, m];
}

function overlap(startA: Date, endA: Date, startB: Date, endB: Date): boolean {
  return startA < endB && endA > startB;
}

export interface AvailabilityInput {
  date: string;
  serviceDurationMinutes: number;
  workingHours: WorkingHourLike[];
  existingAppointments: BusyPeriod[];
  googleBusySlots: BusyPeriod[];
  scheduleBlocks: BlockPeriod[];
  bufferMinutes: number;
}

export function calculateAvailability(input: AvailabilityInput): Slot[] {
  const dayOfWeek = new Date(input.date + "T00:00:00").getDay();
  const dayHours = input.workingHours.find((h) => h.diaSemana === dayOfWeek);
  if (!dayHours) return [];

  const [openH, openM] = parseTime(dayHours.horaApertura);
  const [closeH, closeM] = parseTime(dayHours.horaCierre);

  const openMinutes = openH * 60 + openM;
  const closeMinutes = closeH * 60 + closeM;
  const totalSlot = input.serviceDurationMinutes + input.bufferMinutes;
  if (totalSlot <= 0 || closeMinutes <= openMinutes) return [];

  const interval = 30;
  const steps = Math.floor((closeMinutes - openMinutes - totalSlot) / interval) + 1;
  const slots: Slot[] = [];

  for (let i = 0; i < steps; i++) {
    const startM = openMinutes + i * interval;
    const endM = startM + totalSlot;

    const time = `${String(Math.floor(startM / 60)).padStart(2, "0")}:${String(startM % 60).padStart(2, "0")}`;
    const endTime = `${String(Math.floor(endM / 60)).padStart(2, "0")}:${String(endM % 60).padStart(2, "0")}`;

    const slotStart = new Date(`${input.date}T${time}:00`);
    const slotEnd = new Date(`${input.date}T${endTime}:00`);

    const busy = [
      ...input.existingAppointments,
      ...input.googleBusySlots,
      ...input.scheduleBlocks,
    ].some((b) => overlap(slotStart, slotEnd, b.start, b.end));

    slots.push({ time, available: !busy });
  }

  return slots;
}
