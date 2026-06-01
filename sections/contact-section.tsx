import { SectionShell } from "@/components/shared/section-shell";
import { SectionHeading } from "@/components/shared/section-heading";
import { ContactForm } from "@/components/contact-form";

export function ContactSection() {
  return (
    <SectionShell id="contact" className="bg-[#F5F5F5]">
      <div className="space-y-10">
        <SectionHeading
          title="Agenda tu experiencia"
          subtitle="Cuantame sobre tu evento o campana y armemos una propuesta clara en menos de 24 horas."
          align="center"
        />
        <ContactForm />
      </div>
    </SectionShell>
  );
}
