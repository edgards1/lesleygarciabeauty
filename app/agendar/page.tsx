import type { Metadata } from "next"
import { BookingWizard } from "@/components/booking/booking-wizard"

export const metadata: Metadata = {
  title: "Agendamiento de Citas - Lesley García",
  description: "Agenda tu cita de maquillaje profesional con Lesley García. Maquillaje de novia, social, quinceañera y más.",
}

export default function BookingPage() {
  return <BookingWizard />
}
