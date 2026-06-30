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

export function PoliciesModal({ open, onOpenChange }: PoliciesModalProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-xl font-serif">
            Políticas de Reservación
          </DialogTitle>
          <DialogDescription>
            Términos y condiciones para la reserva de servicios
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6 text-sm text-stone-600 dark:text-stone-400 leading-relaxed">
          <section>
            <h3 className="font-semibold text-stone-900 dark:text-stone-100 mb-2">
              1. Reserva y Confirmación
            </h3>
            <p>
              Para confirmar tu reserva, es necesario realizar el pago del anticipo del 50%
              del valor total del servicio. El saldo restante se cancela el día del servicio.
              Si eliges el pago del 100%, tu reserva queda completamente confirmada.
            </p>
          </section>

          <section>
            <h3 className="font-semibold text-stone-900 dark:text-stone-100 mb-2">
              2. Métodos de Pago
            </h3>
            <p>
              Aceptamos transferencias bancarias a las cuentas indicadas. El comprobante de
              pago debe ser enviado como parte del proceso de reserva para su validación.
              Apple Pay y Tarjeta de Crédito estarán disponibles próximamente.
            </p>
          </section>

          <section>
            <h3 className="font-semibold text-stone-900 dark:text-stone-100 mb-2">
              3. Reagendamiento
            </h3>
            <p>
              Las reservas pueden reagendarse con hasta 48 horas de anticipación sin costo
              adicional. Para reagendar, debes notificarlo vía WhatsApp al número oficial.
              Pasado este tiempo, puede aplicar un recargo.
            </p>
          </section>

          <section>
            <h3 className="font-semibold text-stone-900 dark:text-stone-100 mb-2">
              4. Cancelaciones y Reembolsos
            </h3>
            <p>
              Las cancelaciones deben notificarse con al menos 48 horas de anticipación. Cancelaciones fuera de ese plazo pueden estar sujetas a retención del depósito, según las políticas vigentes del negocio.
            </p>
          </section>

          <section>
            <h3 className="font-semibold text-stone-900 dark:text-stone-100 mb-2">
              5. Servicio a Domicilio
            </h3>
            <p>
              El servicio a domicilio está disponible para la mayoría de servicios. Las
              pruebas de novia y pruebas de quinceañera se realizan únicamente en estudio.
              Para servicios fuera de la ciudad, consulta disponibilidad y tarifas adicionales.
            </p>
          </section>

          <section>
            <h3 className="font-semibold text-stone-900 dark:text-stone-100 mb-2">
              6. Higiene y Seguridad
            </h3>
            <p>
              Todos los implementos son desinfectados y esterilizados después de cada uso.
              Se utilizan productos hipoalergénicos de alta calidad. Si tienes alguna
              condición sensible en tu piel, por favor notifícalo con anticipación.
            </p>
          </section>

          <section>
            <h3 className="font-semibold text-stone-900 dark:text-stone-100 mb-2">
              7. Contacto
            </h3>
            <p>
              Para cualquier consulta sobre estas políticas, contáctanos vía WhatsApp al
              0983366831 o al correo valencia.fiorella_1999@hotmail.com.
            </p>
          </section>
        </div>
      </DialogContent>
    </Dialog>
  )
}
