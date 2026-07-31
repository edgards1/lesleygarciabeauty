"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";

interface TenantConfig {
  nombre: string;
  slug: string;
  slugAgendamiento: string | null;
  telefonoWhatsapp: string | null;
  politicaCancelacion: string | null;
  tiempoBuffer: number;
  colorPrimario: string;
  colorSecundario: string;
  logoUrl: string | null;
  googleCalendarEmail: string | null;
}

export default function ConfiguracionAdminPage() {
  const [config, setConfig] = useState<TenantConfig | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    fetch("/api/admin/tenant-config")
      .then((r) => r.json())
      .then((d) => {
        setConfig(d);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const save = async () => {
    if (!config) return;
    setSaving(true);
    await fetch("/api/admin/tenant-config", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(config),
    });
    setSaving(false);
    toast.success("Configuración guardada");
  };

  const set = (field: keyof TenantConfig, value: unknown) => {
    if (!config) return;
    setConfig({ ...config, [field]: value });
  };

  if (loading || !config) {
    return <div className="p-10 text-sm text-stone-400">Cargando...</div>;
  }

  return (
    <div className="max-w-2xl mx-auto px-5 py-10">
      <h1 className="text-2xl font-serif text-stone-900 dark:text-stone-100 mb-8">
        Configuración del Negocio
      </h1>

      <div className="space-y-6">
        <div>
          <Label className="text-sm text-stone-600 dark:text-stone-400 mb-1 block">
            Nombre del negocio
          </Label>
          <Input
            value={config.nombre}
            onChange={(e) => set("nombre", e.target.value)}
          />
        </div>

        <div>
          <Label className="text-sm text-stone-600 dark:text-stone-400 mb-1 block">
            Slug de agendamiento (URL pública)
          </Label>
          <Input
            value={config.slugAgendamiento ?? ""}
            onChange={(e) => set("slugAgendamiento", e.target.value || null)}
            placeholder="lesleygarciabeauty"
            className="font-mono text-sm"
          />
          <p className="text-xs text-stone-400 mt-1">
            agendamiento.com/{config.slugAgendamiento || "..."}/agendar
          </p>
        </div>

        <div>
          <Label className="text-sm text-stone-600 dark:text-stone-400 mb-1 block">
            Teléfono WhatsApp
          </Label>
          <Input
            value={config.telefonoWhatsapp ?? ""}
            onChange={(e) => set("telefonoWhatsapp", e.target.value || null)}
            placeholder="593983366831"
          />
        </div>

        <div>
          <Label className="text-sm text-stone-600 dark:text-stone-400 mb-1 block">
            Tiempo buffer (minutos entre citas)
          </Label>
          <Input
            type="number"
            value={config.tiempoBuffer}
            onChange={(e) => set("tiempoBuffer", parseInt(e.target.value) || 0)}
            className="w-24"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label className="text-sm text-stone-600 dark:text-stone-400 mb-1 block">
              Color primario
            </Label>
            <div className="flex items-center gap-2">
              <input
                type="color"
                value={config.colorPrimario}
                onChange={(e) => set("colorPrimario", e.target.value)}
                className="w-10 h-10 rounded cursor-pointer border-0"
              />
              <Input
                value={config.colorPrimario}
                onChange={(e) => set("colorPrimario", e.target.value)}
                className="font-mono text-sm"
              />
            </div>
          </div>

          <div>
            <Label className="text-sm text-stone-600 dark:text-stone-400 mb-1 block">
              Color secundario
            </Label>
            <div className="flex items-center gap-2">
              <input
                type="color"
                value={config.colorSecundario}
                onChange={(e) => set("colorSecundario", e.target.value)}
                className="w-10 h-10 rounded cursor-pointer border-0"
              />
              <Input
                value={config.colorSecundario}
                onChange={(e) => set("colorSecundario", e.target.value)}
                className="font-mono text-sm"
              />
            </div>
          </div>
        </div>

        <div>
          <Label className="text-sm text-stone-600 dark:text-stone-400 mb-1 block">
            URL del logo
          </Label>
          <Input
            value={config.logoUrl ?? ""}
            onChange={(e) => set("logoUrl", e.target.value || null)}
            placeholder="https://..."
          />
        </div>

        <div>
          <Label className="text-sm text-stone-600 dark:text-stone-400 mb-1 block">
            Política de cancelación / reagendamiento
          </Label>
          <Textarea
            value={config.politicaCancelacion ?? ""}
            onChange={(e) => set("politicaCancelacion", e.target.value || null)}
            rows={4}
            className="text-sm"
          />
        </div>

        {config.googleCalendarEmail && (
          <div className="text-sm text-stone-500">
            Google Calendar: {config.googleCalendarEmail}
          </div>
        )}

        <Button onClick={save} disabled={saving} className="w-full">
          {saving ? "Guardando..." : "Guardar configuración"}
        </Button>
      </div>
    </div>
  );
}
