"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { toast } from "sonner";

interface ServicioItem {
  id: string;
  nombre: string;
  descripcion: string | null;
  precio_total: number;
  duracion_minutos: number;
  porcentaje_anticipo: number;
  disponible_domicilio: boolean;
  disponible_estudio: boolean;
  incluye: string[];
  orden: number;
  redirige_whatsapp: boolean;
  activo: boolean;
}

interface CategoriaItem {
  id: string;
  nombre: string;
  slug: string;
  orden: number;
  activo: boolean;
  servicios: ServicioItem[];
}

export default function ServiciosAdminPage() {
  const [categories, setCategories] = useState<CategoriaItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [tab, setTab] = useState(0);

  useEffect(() => {
    fetch("/api/admin/services")
      .then((r) => r.json())
      .then((d) => {
        setCategories(d.categories || []);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const refresh = () => {
    fetch("/api/admin/services")
      .then((r) => r.json())
      .then((d) => setCategories(d.categories || []));
  };

  if (loading) {
    return <div className="p-10 text-sm text-stone-400">Cargando...</div>;
  }

  return (
    <div className="max-w-4xl mx-auto px-5 py-10">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-2xl font-serif text-stone-900 dark:text-stone-100">
          Servicios
        </h1>
        <Button
          variant="outline"
          size="sm"
          onClick={async () => {
            const nombre = prompt("Nombre de la nueva categoría:");
            if (!nombre) return;
            await fetch("/api/admin/services", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                type: "category",
                data: { nombre, slug: nombre.toLowerCase().replace(/\s+/g, "-"), orden: categories.length },
              }),
            });
            refresh();
            toast.success("Categoría creada");
          }}
        >
          + Categoría
        </Button>
      </div>

      {categories.length === 0 ? (
        <p className="text-sm text-stone-400">No hay servicios configurados.</p>
      ) : (
        <>
          <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
            {categories.map((cat, i) => (
              <button
                key={cat.id}
                onClick={() => setTab(i)}
                className={`px-4 py-2 text-sm rounded-full whitespace-nowrap transition-colors ${
                  tab === i
                    ? "bg-stone-900 text-white dark:bg-white dark:text-stone-900"
                    : "bg-stone-100 text-stone-600 dark:bg-stone-800 dark:text-stone-400"
                }`}
              >
                {cat.nombre}
              </button>
            ))}
          </div>

          {categories[tab] && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-medium text-stone-800 dark:text-stone-200">
                  {categories[tab].nombre}
                </h2>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={async () => {
                    const nombre = prompt("Nombre del servicio:");
                    if (!nombre) return;
                    const precio = prompt("Precio ($):");
                    const duracion = prompt("Duración (minutos):");
                    if (!precio || !duracion) return;
                    await fetch("/api/admin/services", {
                      method: "POST",
                      headers: { "Content-Type": "application/json" },
                      body: JSON.stringify({
                        type: "service",
                        data: {
                          nombre,
                          categoriaId: categories[tab].id,
                          precioTotal: parseFloat(precio),
                          duracionMinutos: parseInt(duracion),
                          incluye: [],
                          orden: categories[tab].servicios.length,
                        },
                      }),
                    });
                    refresh();
                    toast.success("Servicio creado");
                  }}
                >
                  + Servicio
                </Button>
              </div>

              {categories[tab].servicios.length === 0 ? (
                <p className="text-sm text-stone-400">No hay servicios en esta categoría.</p>
              ) : (
                categories[tab].servicios.map((s) => (
                  <div
                    key={s.id}
                    className="rounded-xl border border-stone-200 dark:border-stone-700 p-4"
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-1">
                          <h3 className="font-medium text-stone-900 dark:text-stone-100">
                            {s.nombre}
                          </h3>
                          {!s.activo && (
                            <span className="text-[10px] uppercase bg-red-100 text-red-600 px-2 py-0.5 rounded-full">
                              Inactivo
                            </span>
                          )}
                        </div>
                        <p className="text-sm text-stone-400">
                          ${Number(s.precio_total).toFixed(2)} — {s.duracion_minutos} min — Anticipo {s.porcentaje_anticipo}%
                        </p>
                        {s.descripcion && (
                          <p className="text-xs text-stone-500 mt-1">{s.descripcion}</p>
                        )}
                        <div className="flex gap-3 mt-2 text-xs text-stone-400">
                          <span>{s.disponible_estudio ? "Estudio ✓" : "Estudio ✗"}</span>
                          <span>{s.disponible_domicilio ? "Domicilio ✓" : "Domicilio ✗"}</span>
                          {s.redirige_whatsapp && <span>WhatsApp ℹ</span>}
                        </div>
                      </div>
                      <div className="flex gap-1">
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-7 text-xs"
                          onClick={async () => {
                            const precio = prompt("Precio ($):", String(s.precio_total));
                            if (precio === null) return;
                            const duracion = prompt("Duración (min):", String(s.duracion_minutos));
                            if (duracion === null) return;
                            const anticipo = prompt("Anticipo (%):", String(s.porcentaje_anticipo));
                            if (anticipo === null) return;
                            await fetch("/api/admin/services", {
                              method: "PUT",
                              headers: { "Content-Type": "application/json" },
                              body: JSON.stringify({
                                type: "service",
                                id: s.id,
                                data: {
                                  precio_total: parseFloat(precio),
                                  duracion_minutos: parseInt(duracion),
                                  porcentaje_anticipo: parseInt(anticipo),
                                },
                              }),
                            });
                            refresh();
                            toast.success("Servicio actualizado");
                          }}
                        >
                          Editar
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-7 text-xs text-red-500"
                          onClick={async () => {
                            if (!confirm("¿Eliminar este servicio?")) return;
                            await fetch(
                              `/api/admin/services?type=service&id=${encodeURIComponent(s.id)}`,
                              { method: "DELETE" }
                            );
                            refresh();
                            toast.success("Servicio eliminado");
                          }}
                        >
                          Eliminar
                        </Button>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          )}
        </>
      )}
    </div>
  );
}
