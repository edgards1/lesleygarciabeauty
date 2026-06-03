import { BrandLoader } from "@/components/brand-loader";

export default function Loading() {
  return (
    <div
      className="fixed inset-0 z-[200] flex items-center justify-center bg-[#FDFBF7]/95 backdrop-blur-sm"
      role="status"
      aria-live="polite"
    >
      <BrandLoader message="Cargando" size="md" />
      <span className="sr-only">Cargando contenido, por favor espera</span>
    </div>
  );
}
