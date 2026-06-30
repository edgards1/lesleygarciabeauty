import type { Metadata } from "next"
import { BookingWizard } from "@/components/booking/booking-wizard"

export const metadata: Metadata = {
  title: "Agendar Cita | Lesley García Beauty",
  description: "Agenda tu cita de maquillaje profesional con Lesley García. Maquillaje de novia, social, quinceañera y más.",
}

export default function BookingPage() {
  return <BookingWizard />
}
