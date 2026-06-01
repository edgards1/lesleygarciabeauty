"use client";

import { Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { SectionShell } from "@/components/shared/section-shell";
import { SectionHeading } from "@/components/shared/section-heading";
import { StatCounter } from "@/components/shared/stat-counter";
import { ugcChartData, ugcMetrics } from "@/constants/ugc";

export function UgcResultsSection() {
  return (
    <SectionShell id="ugc-results" className="bg-white">
      <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr]">
        <div className="space-y-8">
          <SectionHeading
            eyebrow="Resultados UGC"
            title="Metricas que demuestran impacto"
            subtitle="Datos reales de campanas de belleza, optimizados para conversion y recordacion de marca."
          />

          <div className="grid gap-4 sm:grid-cols-2">
            {ugcMetrics.map((metric) => (
              <div
                key={metric.id}
                className="rounded-2xl border border-stone-200 bg-[#F5F5F5] p-5"
              >
                <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">
                  {metric.label}
                </p>
                <p className="mt-3 text-2xl font-semibold text-foreground">
                  <StatCounter
                    value={metric.value}
                    unit={metric.unit}
                    suffix={metric.suffix}
                  />
                </p>
                <p className="mt-2 text-xs text-muted-foreground">
                  {metric.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-3xl border border-stone-200 bg-[#F5F5F5] p-6">
          <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">
            Engagement y conversion
          </p>
          <div className="mt-6 h-[280px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={ugcChartData} margin={{ left: -12, right: 12 }}>
                <XAxis dataKey="name" tickLine={false} axisLine={false} />
                <YAxis tickLine={false} axisLine={false} />
                <Tooltip
                  contentStyle={{
                    borderRadius: 12,
                    border: "none",
                    background: "#FFFFFF",
                    boxShadow: "0 12px 24px rgba(53,60,68,0.12)",
                  }}
                />
                <Line
                  type="monotone"
                  dataKey="engagement"
                  stroke="#353C44"
                  strokeWidth={2.5}
                  dot={{ r: 3 }}
                />
                <Line
                  type="monotone"
                  dataKey="conversions"
                  stroke="#D9B8A8"
                  strokeWidth={2.5}
                  dot={{ r: 3 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </SectionShell>
  );
}
