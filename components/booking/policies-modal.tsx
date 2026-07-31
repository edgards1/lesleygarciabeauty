"use client"

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog"

interface PoliciesModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

const SECTIONS: { title: string; body: string }[] = [
  {
    title: "Reserva y Confirmación",
    body: "Para confirmar tu reserva, es necesario realizar el pago del anticipo del 50% del valor total del servicio. El saldo restante se cancela el día del servicio. Si eliges el pago del 100%, tu reserva queda completamente confirmada.",
  },
  {
    title: "Métodos de Pago",
    body: "Aceptamos transferencias bancarias a las cuentas indicadas. El comprobante de pago debe ser enviado como parte del proceso de reserva para su validación. Apple Pay y Tarjeta de Crédito estarán disponibles próximamente.",
  },
  {
    title: "Reagendamiento",
    body: "Las reservas pueden reagendarse con hasta 48 horas de anticipación sin costo adicional. Para reagendar, debes notificarlo vía WhatsApp al número oficial. Pasado este tiempo, puede aplicar un recargo.",
  },
  {
    title: "Cancelaciones y Reembolsos",
    body: "Las cancelaciones deben notificarse con al menos 48 horas de anticipación. Pueden estar sujetas a retención del depósito, según las políticas vigentes del negocio.",
  },
  {
    title: "Servicio a Domicilio",
    body: "El servicio a domicilio está disponible para la mayoría de servicios. Las pruebas de novia y pruebas de quinceañera se realizan únicamente en estudio. Para servicios fuera de la ciudad, consulta disponibilidad y tarifas adicionales.",
  },
  {
    title: "Higiene y Seguridad",
    body: "Todos los implementos son desinfectados y esterilizados después de cada uso. Se utilizan productos hipoalergénicos de alta calidad. Si tienes alguna condición sensible en tu piel, por favor notifícalo con anticipación.",
  },
  {
    title: "Contacto",
    body: "Para cualquier consulta sobre estas políticas, contáctanos vía WhatsApp al 0983366831 o al correo valencia.fiorella_1999@hotmail.com.",
  },
]

export function PoliciesModal({ open, onOpenChange }: PoliciesModalProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[80vh] max-w-2xl overflow-y-auto rounded-[1.5rem] border-stone-200 bg-white">
        <DialogHeader>
          <DialogTitle className="font-serif text-2xl font-semibold tracking-[-0.02em] text-stone-900">
            Políticas de Reservación
          </DialogTitle>
          <DialogDescription className="font-sans text-sm text-stone-500/70">
            Términos y condiciones para la reserva de servicios
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-0 divide-y divide-stone-200 font-sans text-sm leading-relaxed text-stone-500">
          {SECTIONS.map((s, i) => (
            <section key={s.title} className="py-5 first:pt-2 last:pb-0">
              <h3 className="mb-2 flex items-baseline gap-3 font-sans text-[13px] font-bold text-stone-900">
                <span className="font-serif text-sm italic text-stone-500">
                  {String(i + 1).padStart(2, "0")}
                </span>
                {s.title}
              </h3>
              <p>{s.body}</p>
            </section>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  )
}
