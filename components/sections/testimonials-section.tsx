import { FaStar } from "react-icons/fa";
import { Card, CardContent } from "@/components/ui/card";
import { FadeIn } from "@/components/animations/fade-in";
import { StaggerContainer } from "@/components/animations/stagger-container";

const testimonials = [
  {
    name: "Sarah Johnson",
    role: "Novia",
    content:
      "¡Trabajo absolutamente impresionante! Me hizo sentir como una princesa el día de mi boda. El maquillaje duró todo el día y se veía perfecto en cada foto.",
    rating: 5,
  },
  {
    name: "Emma Davis",
    role: "Modelo",
    content:
      "Profesional, talentosa y muy fácil de trabajar. Entiende exactamente qué look funciona mejor para cada sesión y siempre cumple.",
    rating: 5,
  },
  {
    name: "Lisa Chen",
    role: "Ejecutiva Corporativa",
    content:
      "La contrato para todos mis eventos importantes. Tiene un ojo increíble para los detalles y siempre me hace sentir segura y hermosa.",
    rating: 5,
  },
];

export function TestimonialsSection() {
  return (
    <section
      id="testimonials"
      className="py-20 bg-stone-50 dark:bg-stone-800 transition-colors"
    >
      <div className="container mx-auto px-5 sm:px-8">
        <FadeIn className="text-center space-y-4 mb-16">
          <h2 className="text-5xl font-serif text-stone-900 dark:text-stone-100">
            Lo Que Dicen Mis Clientes
          </h2>
          <p className="text-lg text-stone-600 dark:text-stone-400 max-w-2xl mx-auto">
            La satisfacción de mis clientes es mi mayor recompensa. Aquí
            tienes algunas de sus experiencias.
          </p>
        </FadeIn>

        <StaggerContainer className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <Card
              key={index}
              className="bg-white dark:bg-stone-900 border-stone-200 dark:border-stone-700 hover:shadow-xl hover:scale-[1.02] transition-all duration-500 rounded-2xl"
            >
              <CardContent className="p-8 space-y-5">
                <div className="flex justify-center">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <FaStar
                      key={i}
                      className="w-4 h-4 fill-stone-900 dark:fill-stone-100 text-stone-900 dark:text-stone-100"
                    />
                  ))}
                </div>
                <p className="text-stone-600 dark:text-stone-400 italic text-center leading-relaxed font-serif text-lg">
                  &ldquo;{testimonial.content}&rdquo;
                </p>
                <div className="flex items-center justify-center space-x-3 pt-5 border-t border-stone-100 dark:border-stone-800">
                  <div className="text-center">
                    <div className="font-semibold text-stone-900 dark:text-stone-100 text-sm">
                      {testimonial.name}
                    </div>
                    <div className="text-xs text-stone-500 dark:text-stone-500 uppercase tracking-wider mt-0.5">
                      {testimonial.role}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </StaggerContainer>
      </div>
    </section>
  );
}
