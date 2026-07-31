"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";

interface Dia {
  diaSemana: number;
  nombre: string;
  horaApertura: string | null;
  horaCierre: string | null;
  activo: boolean;
}

export default function HorariosAdminPage() {
  const [days, setDays] = useState<Dia[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    fetch("/api/admin/working-hours")
      .then((r) => r.json())
      .then((d) => {
        setDays(d.hours || []);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const saveDay = async (day: Dia) => {
    setSaving(true);
    await fetch("/api/admin/working-hours", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        diaSemana: day.diaSemana,
        horaApertura: day.horaApertura,
        horaCierre: day.horaCierre,
        activo: day.activo,
      }),
    });
    setSaving(false);
    toast.success(`${day.nombre} actualizado`);
  };

  const updateDay = (i: number, field: keyof Dia, value: unknown) => {
    setDays((prev) => {
      const next = [...prev];
      next[i] = { ...next[i], [field]: value };
      return next;
    });
  };

  if (loading) {
    return <div className="p-10 text-sm text-stone-400">Cargando...</div>;
  }

  return (
    <div className="max-w-2xl mx-auto px-5 py-10">
      <h1 className="text-2xl font-serif text-stone-900 dark:text-stone-100 mb-8">
        Horarios de Atención
      </h1>

      <div className="space-y-4">
        {days.map((day, i) => (
          <div
            key={day.diaSemana}
            className="rounded-xl border border-stone-200 dark:border-stone-700 p-4 flex items-center gap-4"
          >
            <Label className="flex items-center gap-2 cursor-pointer whitespace-nowrap min-w-[100px]">
              <Checkbox
                checked={day.activo}
                onCheckedChange={(v) => updateDay(i, "activo", !!v)}
              />
              <span className="text-sm font-medium text-stone-700 dark:text-stone-300">
                {day.nombre}
              </span>
            </Label>

            {day.activo && (
              <div className="flex items-center gap-2 flex-1">
                <Input
                  type="time"
                  value={day.horaApertura ?? ""}
                  onChange={(e) => updateDay(i, "horaApertura", e.target.value)}
                  className="w-32 text-sm h-9"
                  placeholder="Apertura"
                />
                <span className="text-stone-400 text-sm">—</span>
                <Input
                  type="time"
                  value={day.horaCierre ?? ""}
                  onChange={(e) => updateDay(i, "horaCierre", e.target.value)}
                  className="w-32 text-sm h-9"
                  placeholder="Cierre"
                />
              </div>
            )}

            <Button
              size="sm"
              variant="outline"
              disabled={saving}
              onClick={() => saveDay(day)}
              className="h-8 text-xs"
            >
              Guardar
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
}
