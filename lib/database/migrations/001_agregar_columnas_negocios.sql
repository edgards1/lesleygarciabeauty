-- Agrega campos de configuración multitenant a la tabla existente
-- NOTA: Si alguna columna ya existe, el error "Duplicate column" es ignorado por migrate.ts
ALTER TABLE negocios
  ADD COLUMN telefono_whatsapp VARCHAR(20) DEFAULT '593983366831' AFTER google_calendar_email,
  ADD COLUMN politica_cancelacion TEXT AFTER telefono_whatsapp,
  ADD COLUMN tiempo_buffer INT DEFAULT 15 AFTER politica_cancelacion,
  ADD COLUMN logo_url VARCHAR(500) AFTER tiempo_buffer,
  ADD COLUMN color_primario VARCHAR(7) DEFAULT '#B76E79' AFTER logo_url,
  ADD COLUMN color_secundario VARCHAR(7) DEFAULT '#8B4513' AFTER color_primario,
  ADD COLUMN slug_agendamiento VARCHAR(100) UNIQUE AFTER slug,
  ADD COLUMN dominio_personalizado VARCHAR(255) UNIQUE AFTER slug_agendamiento;
