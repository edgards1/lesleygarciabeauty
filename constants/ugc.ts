import type { MetricItem } from "@/types/content";

export const ugcMetrics: MetricItem[] = [
  {
    id: "engagement",
    label: "Engagement",
    value: 7.2,
    suffix: "%",
    description: "Promedio en campañas de belleza",
  },
  {
    id: "reach",
    label: "Alcance",
    value: 480,
    unit: "k",
    description: "Vistas organicas por mes",
  },
  {
    id: "views",
    label: "Visualizaciones",
    value: 2.1,
    unit: "M",
    description: "Reproducciones acumuladas",
  },
  {
    id: "conversion",
    label: "Conversion",
    value: 4.3,
    suffix: "%",
    description: "Tasa promedio en UGC",
  },
];

export const ugcChartData = [
  { name: "Ene", engagement: 5.4, conversions: 2.8 },
  { name: "Feb", engagement: 6.2, conversions: 3.1 },
  { name: "Mar", engagement: 6.8, conversions: 3.6 },
  { name: "Abr", engagement: 7.4, conversions: 4.0 },
  { name: "May", engagement: 7.1, conversions: 4.2 },
  { name: "Jun", engagement: 7.8, conversions: 4.5 },
];
