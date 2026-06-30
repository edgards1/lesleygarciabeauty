"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";
import { SiteFooter } from "@/components/site-footer";

const SECTIONS = [
  { id: "privacidad", label: "Privacidad" },
  { id: "terminos", label: "Términos" },
  { id: "reservas", label: "Reservas" },
] as const;

export default function PoliticasPage() {
  const [activeSection, setActiveSection] = useState("privacidad");
  const sectionRefs = useRef<Map<string, HTMLElement>>(new Map());
  const isClickScrolling = useRef(false);

  /* ---------- IntersectionObserver to track scroll position ---------- */
  useEffect(() => {
    const visible = new Map<string, IntersectionObserverEntry>();
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) visible.set(entry.target.id, entry);
          else visible.delete(entry.target.id);
        }
        // pick the section closest to the top of the viewport
        const sorted = Array.from(visible.values()).sort(
          (a, b) => a.boundingClientRect.top - b.boundingClientRect.top,
        );
        if (sorted.length > 0) {
          setActiveSection(sorted[0].target.id);
        }
      },
      { rootMargin: "-40% 0px -55% 0px", threshold: [0, 0.25, 0.5, 0.75, 1] },
    );

    for (const { id } of SECTIONS) {
      const el = document.getElementById(id);
      if (el) {
        sectionRefs.current.set(id, el);
        observer.observe(el);
      }
    }

    return () => observer.disconnect();
  }, []);

  /* ---------- Handle initial hash on mount ---------- */
  useEffect(() => {
    const hash = window.location.hash.replace("#", "");
    if (hash && SECTIONS.some((s) => s.id === hash)) {
      setActiveSection(hash);
      // slight delay to ensure element is painted
      requestAnimationFrame(() => {
        const el = document.getElementById(hash);
        if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
      });
    }
  }, []);

  /* ---------- Click handler: update hash + scroll ---------- */
  const handleClick = useCallback(
    (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
      e.preventDefault();
      setActiveSection(id);
      window.history.replaceState(null, "", `#${id}`);
      const el = sectionRefs.current.get(id) ?? document.getElementById(id);
      if (el) {
        isClickScrolling.current = true;
        el.scrollIntoView({ behavior: "smooth", block: "start" });
        // release lock after scroll settles
        setTimeout(() => {
          isClickScrolling.current = false;
        }, 800);
      }
    },
    [],
  );

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="border-b border-stone-100 bg-white">
        <div className="mx-auto max-w-[1400px] px-5 py-5 sm:px-8 lg:px-12">
          <div className="flex items-center justify-between">
            <Link href="/" className="inline-block">
              <span className="font-serif text-xl italic tracking-tight text-stone-900 transition-colors hover:text-stone-600">
                Lesley García
              </span>
            </Link>

            <Link
              href="/"
              className="group inline-flex h-10 items-center justify-center px-5 text-[10px] font-medium uppercase tracking-[0.25em] text-stone-500 transition-colors duration-300 hover:text-stone-900"
            >
              Volver al Inicio
              <span className="ml-2 inline-block h-px w-4 bg-current transition-all duration-300 group-hover:w-6" />
            </Link>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="bg-stone-50 py-6 sm:py-6 lg:py-6">
        <div className="mx-auto max-w-[1400px] px-5 sm:px-8 lg:px-12">
          <div className="max-w-2xl">
            <div className="mb-6 flex items-center gap-4">
              <div className="h-px w-8 bg-stone-300" />
              <span className="text-[10px] font-medium uppercase tracking-[0.3em] text-stone-400">
                Documentación Legal
              </span>
            </div>
            <h1 className="font-serif text-4xl leading-[1.05] tracking-[-0.02em] text-stone-900 sm:text-5xl lg:text-6xl">
              Políticas &amp;
              <br />
              <span className="italic text-stone-400">Términos</span>
            </h1>
            <p className="mt-6 max-w-lg text-base leading-relaxed text-stone-600">
              En Lesley García Beauty, te informamos sobre el uso de nuestros
              servicios, protección de datos y condiciones de reserva.
            </p>
          </div>
        </div>
      </section>

      {/* Navigation tabs */}
      <div className="sticky top-0 z-10 border-b border-stone-100 bg-white/95 backdrop-blur-sm">
        <div className="mx-auto max-w-[1400px] px-5 sm:px-8 lg:px-12">
          <nav
            className="flex gap-1 overflow-x-auto py-1"
            aria-label="Secciones"
          >
            {SECTIONS.map((section) => (
              <a
                key={section.id}
                href={`#${section.id}`}
                onClick={(e) => handleClick(e, section.id)}
                className={`whitespace-nowrap px-4 py-3 text-[11px] font-medium uppercase tracking-[0.2em] transition-colors duration-300 ${
                  activeSection === section.id
                    ? "text-stone-900 border-b-2 border-stone-900"
                    : "text-stone-400 hover:text-stone-600"
                }`}
              >
                {section.label}
              </a>
            ))}
          </nav>
        </div>
      </div>

      {/* Content */}
      <main className="mx-auto max-w-[1400px] px-5 py-8 sm:px-8 sm:py-8 lg:px-12 lg:py-3 mb-8">
        <div className="grid grid-cols-1 gap-16 lg:grid-cols-[1fr_280px] lg:gap-20">
          {/* Main content */}
          <div className="space-y-20">
            {/* PRIVACIDAD */}
            <section id="privacidad" className="scroll-mt-20">
              <div className="mb-8">
                <div className="mb-4 flex items-center gap-3">
                  <span className="font-mono text-[11px] text-stone-300">
                    01
                  </span>
                  <div className="h-px flex-1 bg-stone-100" />
                </div>
                <h2 className="font-serif text-3xl leading-tight tracking-tight text-stone-900 sm:text-4xl">
                  Política de Privacidad
                </h2>
                <p className="mt-2 text-sm text-stone-400">
                  Última actualización: Junio 2026
                </p>
              </div>

              <div className="prose prose-stone max-w-none space-y-8 text-[15px] leading-[1.8] text-stone-600">
                <div>
                  <h3 className="mb-3 text-sm font-semibold uppercase tracking-[0.15em] text-stone-900">
                    1. Información que Recopilamos
                  </h3>
                  <p>
                    Para brindarte nuestros servicios de maquillaje profesional
                    y creación de contenido UGC, podemos recopilar la siguiente
                    información:
                  </p>
                  <ul className="mt-4 space-y-2 pl-5">
                    <li className="text-stone-600">
                      <strong className="text-stone-800">
                        Datos de contacto:
                      </strong>{" "}
                      Nombre, correo electrónico, número de teléfono, dirección,
                      información del servicio solicitado y fecha/hora de la
                      cita, comprobantes de pago cuando aplica.
                    </li>
                    <li className="text-stone-600">
                      <strong className="text-stone-800">
                        Información de eventos:
                      </strong>{" "}
                      Fecha, tipo de evento (maquillaje social, novias,
                      quinciañeras , etc.) y preferencias de servicio.
                    </li>
                    <li className="text-stone-600">
                      <strong className="text-stone-800">Imágenes:</strong>{" "}
                      Fotografías tomadas durante las sesiones, las cuales
                      pueden ser utilizadas con tu consentimiento para fines
                      promocionales.
                    </li>
                    <li className="text-stone-600">
                      <strong className="text-stone-800">Datos de pago:</strong>{" "}
                      Información necesaria para procesar transacciones,
                      manejada de forma segura a través de terceros
                      certificados.
                    </li>
                  </ul>
                </div>

                <div>
                  <h3 className="mb-3 text-sm font-semibold uppercase tracking-[0.15em] text-stone-900">
                    2. Uso de la Información
                  </h3>
                  <p>
                    Utilizamos tu información exclusivamente para los siguientes
                    fines:
                  </p>
                  <ul className="mt-4 space-y-2 pl-5">
                    <li className="text-stone-600">
                      Prestación y gestión de servicios de maquillaje y
                      contenido.
                    </li>
                    <li className="text-stone-600">
                      Enviarte notificaciones relacionadas con tu reserva
                      (WhatsApp/correo electrónico) para confirmaciones,
                      recordatorios y seguimiento post-servicio.
                    </li>
                    <li className="text-stone-600">
                      Envío de ofertas y promociones (solo con tu consentimiento
                      previo).
                    </li>
                    <li className="text-stone-600">
                      Cumplimiento de obligaciones legales y contractuales.
                    </li>
                  </ul>
                  <p className="italic mt-3 font-semibold">
                    No vendemos, alquilamos ni compartimos tu información
                    personal con terceros con fines comerciales.
                  </p>
                </div>

                <div>
                  <h3 className="mb-3 text-sm font-semibold uppercase tracking-[0.15em] text-stone-900">
                    3. Protección de Datos
                  </h3>
                  <p>
                    Tu información se almacena en servidores seguros. Aplicamos
                    medidas técnicas razonables para proteger los datos contra
                    acceso no autorizado, alteración o divulgación.
                  </p>
                </div>

                <div>
                  <h3 className="mb-3 text-sm font-semibold uppercase tracking-[0.15em] text-stone-900">
                    4. Tus Derechos
                  </h3>
                  <p>
                    Tienes derecho a acceder, rectificar, eliminar o portar tus
                    datos personales. También puedes oponerte al tratamiento de
                    tus datos o solicitar la limitación del mismo. Para ejercer
                    estos derechos, contáctanos a través de nuestros canales
                    oficiales.
                  </p>
                </div>

                <div>
                  <h3 className="mb-3 text-sm font-semibold uppercase tracking-[0.15em] text-stone-900">
                    5. Cookies y Tecnologías de Rastreo
                  </h3>
                  <p>
                    Utilizamos cookies y tecnologías similares para mejorar tu
                    experiencia en nuestro sitio web, analizar el tráfico y
                    personalizar el contenido. Puedes configurar tu navegador
                    para rechazar cookies, aunque esto podría afectar la
                    funcionalidad del sitio.
                  </p>
                </div>

                <div>
                  <h3 className="mb-3 text-sm font-semibold uppercase tracking-[0.15em] text-stone-900">
                    6. Contacto
                  </h3>
                  <p>
                    Si tienes preguntas sobre esta política de privacidad o
                    sobre el tratamiento de tus datos, puedes contactarnos a
                    través de nuestro correo electrónico o números de teléfono
                    oficiales.
                  </p>
                </div>
              </div>
            </section>

            {/* TERMINOS */}
            <section id="terminos" className="scroll-mt-20">
              <div className="mb-8">
                <div className="mb-4 flex items-center gap-3">
                  <span className="font-mono text-[11px] text-stone-300">
                    02
                  </span>
                  <div className="h-px flex-1 bg-stone-100" />
                </div>
                <h2 className="font-serif text-3xl leading-tight tracking-tight text-stone-900 sm:text-4xl">
                  Términos de Servicio
                </h2>
                <p className="mt-2 text-sm text-stone-400">
                  Última actualización: Junio 2026
                </p>
              </div>

              <div className="prose prose-stone max-w-none space-y-8 text-[15px] leading-[1.8] text-stone-600">
                <div>
                  <h3 className="mb-3 text-sm font-semibold uppercase tracking-[0.15em] text-stone-900">
                    1. Alcance de los Servicios
                  </h3>
                  <p>
                    Lesley García Beauty ofrece servicios de maquillaje
                    profesional (novia, social, quinciañeras), creación de
                    contenido UGC y cursos de automaquillaje. Los servicios se
                    describen en detalle en nuestra página principal y pueden
                    actualizarse sin previo aviso.
                  </p>
                </div>

                <div>
                  <h3 className="mb-3 text-sm font-semibold uppercase tracking-[0.15em] text-stone-900">
                    2. Propiedad Intelectual
                  </h3>
                  <p>
                    Todo el contenido de este sitio web, incluyendo imágenes,
                    textos, diseños y logotipos, es propiedad de Lesley García
                    Beauty y está protegido por las leyes de propiedad
                    intelectual. Queda prohibida su reproducción total o parcial
                    sin autorización expresa.
                  </p>
                  <p className="mt-4">
                    Las imágenes de las sesiones pueden ser utilizadas por
                    Lesley García Beauty para fines promocionales en redes
                    sociales, sitio web y materiales de marketing, salvo que el
                    cliente solicite expresamente lo contrario por escrito.
                  </p>
                </div>

                <div>
                  <h3 className="mb-3 text-sm font-semibold uppercase tracking-[0.15em] text-stone-900">
                    3. Limitación de Responsabilidad
                  </h3>
                  <p>
                    Lesley García Beauty se compromete a prestar los servicios
                    con la máxima profesionalidad y calidad. Sin embargo, no nos
                    responsabilizamos por:
                  </p>
                  <ul className="mt-4 space-y-2 pl-5">
                    <li className="text-stone-600">
                      Reacciones alérgicas a productos cosméticos (se recomienda
                      realizar una prueba previa).
                    </li>
                    <li className="text-stone-600">
                      Resultados que difieran de las expectativas cuando no se
                      ha realizado una sesión de prueba previa.
                    </li>
                    <li className="text-stone-600">
                      Daños causados por terceros durante o después del
                      servicio.
                    </li>
                  </ul>
                </div>

                <div>
                  <h3 className="mb-3 text-sm font-semibold uppercase tracking-[0.15em] text-stone-900">
                    4. Cancelaciones y Cambios
                  </h3>
                  <p>
                    Los clientes pueden cancelar o reprogramar citas con al
                    menos 48 horas de anticipación sin penalización. Las
                    cancelaciones con menos de 48 horas podrán generar un cargo
                    del 50% del valor del servicio. Consulta nuestra Política de
                    Reservas para más detalles.
                  </p>
                </div>

                <div>
                  <h3 className="mb-3 text-sm font-semibold uppercase tracking-[0.15em] text-stone-900">
                    5. Legislación Aplicable
                  </h3>
                  <p>
                    Estos términos se rigen por las leyes de la República del
                    Ecuador. Cualquier disputa será resuelta ante los tribunales
                    competentes de Guayaquil, Ecuador.
                  </p>
                </div>
              </div>
            </section>

            {/* RESERVAS */}
            <section id="reservas" className="scroll-mt-20">
              <div className="mb-8">
                <div className="mb-4 flex items-center gap-3">
                  <span className="font-mono text-[11px] text-stone-300">
                    03
                  </span>
                  <div className="h-px flex-1 bg-stone-100" />
                </div>
                <h2 className="font-serif text-3xl leading-tight tracking-tight text-stone-900 sm:text-4xl">
                  Política de Reservas
                </h2>
                <p className="mt-2 text-sm text-stone-400">
                  Última actualización: Junio 2026
                </p>
              </div>

              <div className="prose prose-stone max-w-none space-y-8 text-[15px] leading-[1.8] text-stone-600">
                <div>
                  <h3 className="mb-3 text-sm font-semibold uppercase tracking-[0.15em] text-stone-900">
                    1. Proceso de Reserva
                  </h3>
                  <p>
                    Todas las reservas se realizan a través de nuestro canal
                    oficial de WhatsApp o mediante el formulario de contacto en
                    este sitio web. La reserva se confirma únicamente cuando se
                    recibe el pago del anticipo correspondiente.
                  </p>
                </div>

                <div>
                  <h3 className="mb-3 text-sm font-semibold uppercase tracking-[0.15em] text-stone-900">
                    2. Anticipo y Pagos
                  </h3>
                  <ul className="space-y-3 pl-5">
                    <li className="text-stone-600">
                      <strong className="text-stone-800">
                        Anticipo requerido:
                      </strong>{" "}
                      El 50% del valor total del servicio debe ser pagado al
                      momento de confirmar la reserva.
                    </li>
                    <li className="text-stone-600">
                      <strong className="text-stone-800">
                        Saldo restante:
                      </strong>{" "}
                      El 50% restante debe ser abonado el día del servicio,
                      antes de comenzar la atención.
                    </li>
                    <li className="text-stone-600">
                      <strong className="text-stone-800">
                        Métodos de pago:
                      </strong>{" "}
                      Transferencia bancaria o efectivo.
                    </li>
                  </ul>
                </div>

                <div>
                  <h3 className="mb-3 text-sm font-semibold uppercase tracking-[0.15em] text-stone-900">
                    3. Cancelaciones
                  </h3>
                  <p>
                    Las cancelaciones deben notificarse con al menos 48 horas de
                    anticipación. Cancelaciones fuera de ese plazo pueden estar
                    sujetas a retención del depósito, según las políticas
                    vigentes del negocio.
                  </p>
                </div>

                <div>
                  <h3 className="mb-3 text-sm font-semibold uppercase tracking-[0.15em] text-stone-900">
                    4. Reprogramaciones
                  </h3>
                  <p>
                    Las reprogramaciones están sujetas a disponibilidad. Se
                    recomienda solicitar cambios con al menos 48 horas de
                    anticipación. Reprogramaciones solicitadas con menos de 48
                    horas pueden estar sujetas a cargos adicionales o retención
                    del depósito, dependiendo de la disponibilidad y políticas
                    vigentes.
                  </p>
                </div>

                <div>
                  <h3 className="mb-3 text-sm font-semibold uppercase tracking-[0.15em] text-stone-900">
                    5. Servicios de Novia
                  </h3>
                  <p>
                    Para servicios de maquillaje de novia, se requiere una
                    sesión de prueba previa (incluida en el paquete). La sesión
                    de prueba debe agendarse con al menos 30 días de
                    anticipación a la fecha del evento. El pago del anticipo
                    para novias es del 60% del valor total del paquete.
                  </p>
                </div>

                <div>
                  <h3 className="mb-3 text-sm font-semibold uppercase tracking-[0.15em] text-stone-900">
                    6. Contenido UGC
                  </h3>
                  <p>
                    Para proyectos de contenido UGC, se establece un acuerdo
                    específico que detalla el alcance del proyecto, número de
                    piezas de contenido, plazos de entrega y condiciones de uso.
                    El pago se realiza en dos cuotas: 50% al inicio y 50% a la
                    entrega del contenido final.
                  </p>
                </div>

                <div>
                  <h3 className="mb-3 text-sm font-semibold uppercase tracking-[0.15em] text-stone-900">
                    7. Fuerza Mayor
                  </h3>
                  <p>
                    En caso de circunstancias imprevisibles o de fuerza mayor
                    (desastres naturales, emergencias de salud, etc.), ambas
                    partes podrán acordar la reprogramación sin penalización. Se
                    documentará cada caso de forma individual.
                  </p>
                </div>
              </div>
            </section>
            <Link
              href="/"
              className="group inline-flex h-10 items-center justify-center text-[10px] font-medium uppercase tracking-[0.25em] text-stone-500 transition-colors duration-300 hover:text-stone-900"
            >
              <span className="mr-2 inline-block h-px w-4 bg-current transition-all duration-300 group-hover:w-6" />
              Volver al Inicio
            </Link>
          </div>

          {/* Sidebar */}
          <aside className="hidden lg:block">
            <div className="sticky top-24 space-y-8">
              {/* Quick info card */}
              <div className="rounded-2xl border border-stone-100 bg-stone-50 p-6">
                <h4 className="mb-3 text-[10px] font-medium uppercase tracking-[0.25em] text-stone-400">
                  Contacto Directo
                </h4>
                <p className="mb-4 text-sm leading-relaxed text-stone-600">
                  ¿Tienes dudas sobre nuestras políticas? Contáctanos
                  directamente.
                </p>
                <a
                  href="https://api.whatsapp.com/send?phone=593983366831&text=Hola%2C%20tengo%20una%20consulta%20sobre%20las%20pol%C3%ADticas"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex w-full items-center justify-center rounded-full bg-stone-900 px-5 py-3 text-[10px] font-medium uppercase tracking-[0.2em] text-white transition-colors duration-300 hover:bg-stone-800"
                >
                  Consultar por WhatsApp
                </a>
              </div>

              {/* Navigation */}
              <div className="rounded-2xl border border-stone-100 p-6">
                <h4 className="mb-4 text-[10px] font-medium uppercase tracking-[0.25em] text-stone-400">
                  Secciones
                </h4>
                <nav className="flex flex-col gap-2">
                  {SECTIONS.map((section, index) => (
                    <a
                      key={section.id}
                      href={`#${section.id}`}
                      onClick={(e) => handleClick(e, section.id)}
                      className={`flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm transition-colors duration-300 ${
                        activeSection === section.id
                          ? "bg-stone-100 text-stone-900 font-medium"
                          : "text-stone-500 hover:bg-stone-50 hover:text-stone-700"
                      }`}
                    >
                      <span className="font-mono text-[11px] text-stone-300">
                        0{index + 1}
                      </span>
                      {section.label}
                    </a>
                  ))}
                </nav>
              </div>
            </div>
          </aside>
        </div>
      </main>

      {/* Footer */}
      <SiteFooter />
    </div>
  );
}
