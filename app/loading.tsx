import { BrandLoader } from "@/components/brand-loader"

export default function Loading() {
  return (
    <div 
      className="fixed inset-0 z-[9998] flex items-center justify-center bg-white/80 dark:bg-stone-950/80 backdrop-blur-sm transition-colors"
      role="presentation"
      aria-hidden="true"
    >
      <BrandLoader 
        message="Navegando..." 
        size="md"
        showProgress={true}
      />
      
      {/* Texto invisible para screen readers */}
      <span className="sr-only">Cargando nueva página</span>
    </div>
  )
}