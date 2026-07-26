-- ============================================================
-- Migra los datos de booking.config.ts a las nuevas tablas
-- para el negocio existente "lesleygarciabeauty"
-- Idempotente: se puede ejecutar múltiples veces sin duplicar
-- ============================================================

SET @negocio_id = (SELECT id FROM negocios WHERE slug = 'lesleygarciabeauty' LIMIT 1);

-- ============================================================
-- 1. Actualizar columnas nuevas de negocios
-- ============================================================
UPDATE negocios SET
  slug_agendamiento = COALESCE(slug_agendamiento, 'lesleygarciabeauty'),
  telefono_whatsapp = COALESCE(telefono_whatsapp, '593983366831'),
  politica_cancelacion = COALESCE(politica_cancelacion, 'Las reservas pueden reagendarse con hasta 48 horas de anticipación. En caso de cancelación con menos de 24 horas de anticipación, no se realizará reembolso del depósito.'),
  tiempo_buffer = COALESCE(tiempo_buffer, 15),
  color_primario = COALESCE(color_primario, '#B76E79'),
  color_secundario = COALESCE(color_secundario, '#8B4513')
WHERE id = @negocio_id;

-- ============================================================
-- 2. Categorías de servicios
-- ============================================================
INSERT IGNORE INTO categorias_servicios (id, negocio_id, nombre, slug, orden) VALUES
  (UUID(), @negocio_id, 'Novia', 'novia', 1),
  (UUID(), @negocio_id, 'Maquillaje Social', 'social', 2),
  (UUID(), @negocio_id, 'Quinceañera', 'quinceanera', 3),
  (UUID(), @negocio_id, 'UGC Creator', 'ugc', 4),
  (UUID(), @negocio_id, 'Automaquillaje', 'automaquillaje', 5);

-- ============================================================
-- 3. Servicios por categoría
-- ============================================================

-- Novia
SET @cat_novia = (SELECT id FROM categorias_servicios WHERE negocio_id = @negocio_id AND slug = 'novia' LIMIT 1);

INSERT IGNORE INTO servicios (id, negocio_id, categoria_id, nombre, descripcion, precio_total, duracion_minutos, porcentaje_anticipo, disponible_domicilio, disponible_estudio, incluye, orden, redirige_whatsapp)
SELECT UUID(), @negocio_id, @cat_novia, 'Paquete de Novia Civil', NULL, 150.00, 180, 50, TRUE, TRUE,
  '["Maquillaje y Peinado (3 horas)", "Pestañas personalizadas", "Mascarilla facial", "Asesoría de estilo de novia"]',
  1, FALSE
WHERE NOT EXISTS (SELECT 1 FROM servicios WHERE negocio_id = @negocio_id AND nombre = 'Paquete de Novia Civil');

INSERT IGNORE INTO servicios (id, negocio_id, categoria_id, nombre, descripcion, precio_total, duracion_minutos, porcentaje_anticipo, disponible_domicilio, disponible_estudio, incluye, orden, redirige_whatsapp)
SELECT UUID(), @negocio_id, @cat_novia, 'Paquete de Novia Eclesiástico', NULL, 200.00, 180, 50, TRUE, TRUE,
  '["Maquillaje y Peinado (3 horas)", "Pestañas personalizadas", "Asesoría de estilo de novia", "Mascarilla facial", "Prueba de Novia (1 hora)", "Kit de Retoque"]',
  2, FALSE
WHERE NOT EXISTS (SELECT 1 FROM servicios WHERE negocio_id = @negocio_id AND nombre = 'Paquete de Novia Eclesiástico');

INSERT IGNORE INTO servicios (id, negocio_id, categoria_id, nombre, descripcion, precio_total, duracion_minutos, porcentaje_anticipo, disponible_domicilio, disponible_estudio, incluye, orden, redirige_whatsapp)
SELECT UUID(), @negocio_id, @cat_novia, 'Paquete de Novia Civil o Eclesiástico', NULL, 320.00, 180, 50, TRUE, TRUE,
  '["Maquillaje y Peinado (3 horas)", "Pestañas personalizadas", "Asesoría de estilo de novia", "Maquillaje en escote", "Mascarilla facial y Parches de ojos", "Prueba de maquillaje de dos propuestas (2 horas)", "Kit de retoque"]',
  3, FALSE
WHERE NOT EXISTS (SELECT 1 FROM servicios WHERE negocio_id = @negocio_id AND nombre = 'Paquete de Novia Civil o Eclesiástico');

INSERT IGNORE INTO servicios (id, negocio_id, categoria_id, nombre, descripcion, precio_total, duracion_minutos, porcentaje_anticipo, disponible_domicilio, disponible_estudio, incluye, orden, redirige_whatsapp)
SELECT UUID(), @negocio_id, @cat_novia, 'Paquete Familiar Civil o Eclesiástico', NULL, 300.00, 240, 50, TRUE, TRUE,
  '["Maquillaje y peinado mamá", "Maquillaje y peinado suegra", "Maquillaje y peinado dama 1", "Maquillaje y peinado dama 2"]',
  4, FALSE
WHERE NOT EXISTS (SELECT 1 FROM servicios WHERE negocio_id = @negocio_id AND nombre = 'Paquete Familiar Civil o Eclesiástico');

INSERT IGNORE INTO servicios (id, negocio_id, categoria_id, nombre, descripcion, precio_total, duracion_minutos, porcentaje_anticipo, disponible_domicilio, disponible_estudio, incluye, orden, redirige_whatsapp)
SELECT UUID(), @negocio_id, @cat_novia, 'Prueba de Novia', 'Todos los maquillajes de novia tienen domicilio disponible, menos las pruebas.', 100.00, 60, 100, FALSE, TRUE,
  '["Sesión de prueba de maquillaje"]',
  5, FALSE
WHERE NOT EXISTS (SELECT 1 FROM servicios WHERE negocio_id = @negocio_id AND nombre = 'Prueba de Novia');

-- Maquillaje Social
SET @cat_social = (SELECT id FROM categorias_servicios WHERE negocio_id = @negocio_id AND slug = 'social' LIMIT 1);

INSERT IGNORE INTO servicios (id, negocio_id, categoria_id, nombre, descripcion, precio_total, duracion_minutos, porcentaje_anticipo, disponible_domicilio, disponible_estudio, incluye, orden, redirige_whatsapp)
SELECT UUID(), @negocio_id, @cat_social, 'Maquillaje Social', NULL, 50.00, 60, 50, TRUE, TRUE,
  '["Maquillaje profesional"]',
  1, FALSE
WHERE NOT EXISTS (SELECT 1 FROM servicios WHERE negocio_id = @negocio_id AND nombre = 'Maquillaje Social');

INSERT IGNORE INTO servicios (id, negocio_id, categoria_id, nombre, descripcion, precio_total, duracion_minutos, porcentaje_anticipo, disponible_domicilio, disponible_estudio, incluye, orden, redirige_whatsapp)
SELECT UUID(), @negocio_id, @cat_social, 'Maquillaje Social + Peinado', NULL, 80.00, 90, 50, TRUE, TRUE,
  '["Maquillaje profesional", "Peinado"]',
  2, FALSE
WHERE NOT EXISTS (SELECT 1 FROM servicios WHERE negocio_id = @negocio_id AND nombre = 'Maquillaje Social + Peinado');

-- Quinceañera
SET @cat_quin = (SELECT id FROM categorias_servicios WHERE negocio_id = @negocio_id AND slug = 'quinceanera' LIMIT 1);

INSERT IGNORE INTO servicios (id, negocio_id, categoria_id, nombre, descripcion, precio_total, duracion_minutos, porcentaje_anticipo, disponible_domicilio, disponible_estudio, incluye, orden, redirige_whatsapp)
SELECT UUID(), @negocio_id, @cat_quin, 'Maquillaje de Quinceañera', NULL, 60.00, 60, 50, TRUE, TRUE,
  '["Maquillaje profesional para quinceañera"]',
  1, FALSE
WHERE NOT EXISTS (SELECT 1 FROM servicios WHERE negocio_id = @negocio_id AND nombre = 'Maquillaje de Quinceañera');

INSERT IGNORE INTO servicios (id, negocio_id, categoria_id, nombre, descripcion, precio_total, duracion_minutos, porcentaje_anticipo, disponible_domicilio, disponible_estudio, incluye, orden, redirige_whatsapp)
SELECT UUID(), @negocio_id, @cat_quin, 'Maquillaje + Peinado Quinceañera', NULL, 100.00, 90, 50, TRUE, TRUE,
  '["Maquillaje profesional", "Peinado"]',
  2, FALSE
WHERE NOT EXISTS (SELECT 1 FROM servicios WHERE negocio_id = @negocio_id AND nombre = 'Maquillaje + Peinado Quinceañera');

INSERT IGNORE INTO servicios (id, negocio_id, categoria_id, nombre, descripcion, precio_total, duracion_minutos, porcentaje_anticipo, disponible_domicilio, disponible_estudio, incluye, orden, redirige_whatsapp)
SELECT UUID(), @negocio_id, @cat_quin, 'Prueba de Quinceañera', NULL, 90.00, 60, 100, FALSE, TRUE,
  '["Sesión de prueba de maquillaje"]',
  3, FALSE
WHERE NOT EXISTS (SELECT 1 FROM servicios WHERE negocio_id = @negocio_id AND nombre = 'Prueba de Quinceañera');

INSERT IGNORE INTO servicios (id, negocio_id, categoria_id, nombre, descripcion, precio_total, duracion_minutos, porcentaje_anticipo, disponible_domicilio, disponible_estudio, incluye, orden, redirige_whatsapp)
SELECT UUID(), @negocio_id, @cat_quin, 'Quinceañera & Mamá', NULL, 110.00, 120, 50, TRUE, TRUE,
  '["Maquillaje para quinceañera", "Maquillaje para mamá"]',
  4, FALSE
WHERE NOT EXISTS (SELECT 1 FROM servicios WHERE negocio_id = @negocio_id AND nombre = 'Quinceañera & Mamá');

-- UGC Creator
SET @cat_ugc = (SELECT id FROM categorias_servicios WHERE negocio_id = @negocio_id AND slug = 'ugc' LIMIT 1);

INSERT IGNORE INTO servicios (id, negocio_id, categoria_id, nombre, descripcion, precio_total, duracion_minutos, porcentaje_anticipo, disponible_domicilio, disponible_estudio, incluye, orden, redirige_whatsapp)
SELECT UUID(), @negocio_id, @cat_ugc, 'Contenido UGC', 'Contenido para marcas. Consulta presupuesto personalizado.', 0.00, 60, 0, TRUE, TRUE,
  '["Filmación y edición de contenido orgánico"]',
  1, TRUE
WHERE NOT EXISTS (SELECT 1 FROM servicios WHERE negocio_id = @negocio_id AND nombre = 'Contenido UGC');

-- Automaquillaje
SET @cat_auto = (SELECT id FROM categorias_servicios WHERE negocio_id = @negocio_id AND slug = 'automaquillaje' LIMIT 1);

INSERT IGNORE INTO servicios (id, negocio_id, categoria_id, nombre, descripcion, precio_total, duracion_minutos, porcentaje_anticipo, disponible_domicilio, disponible_estudio, incluye, orden, redirige_whatsapp)
SELECT UUID(), @negocio_id, @cat_auto, 'Clase de Automaquillaje', 'Aprende técnicas profesionales adaptadas a ti. Consulta precios.', 0.00, 120, 0, FALSE, TRUE,
  '["Sesión uno a uno", "Técnicas para tu rostro y estilo"]',
  1, TRUE
WHERE NOT EXISTS (SELECT 1 FROM servicios WHERE negocio_id = @negocio_id AND nombre = 'Clase de Automaquillaje');

-- ============================================================
-- 4. Horarios de atención (LUN-SÁB 07:00-18:30)
-- ============================================================
INSERT IGNORE INTO horarios_atencion (id, negocio_id, dia_semana, hora_apertura, hora_cierre, activo)
SELECT UUID(), @negocio_id, dia, '07:00', '18:30', TRUE
FROM (
  SELECT 1 AS dia UNION SELECT 2 UNION SELECT 3 UNION SELECT 4 UNION SELECT 5 UNION SELECT 6
) AS dias
WHERE NOT EXISTS (
  SELECT 1 FROM horarios_atencion
  WHERE negocio_id = @negocio_id AND dia_semana = dias.dia
);

-- ============================================================
-- 5. Métodos de pago (cuentas bancarias de Lesley)
-- ============================================================
INSERT IGNORE INTO metodos_pago (id, negocio_id, tipo, banco, tipo_cuenta, numero_cuenta, titular, email_cuenta, documento_id, activo)
SELECT UUID(), @negocio_id, 'transferencia', 'Banco Pichincha', 'Cuenta de Ahorros', '2210686371',
  'Lesley Fiorella Valencia Garcia', 'valencia.fiorella_1999@hotmail.com', '0924001829', TRUE
WHERE NOT EXISTS (
  SELECT 1 FROM metodos_pago WHERE negocio_id = @negocio_id AND banco = 'Banco Pichincha'
);

INSERT IGNORE INTO metodos_pago (id, negocio_id, tipo, banco, tipo_cuenta, numero_cuenta, titular, email_cuenta, documento_id, activo)
SELECT UUID(), @negocio_id, 'transferencia', 'Banco Produbanco', 'Cuenta de Ahorros', '20003285853',
  'Lesley Fiorella Valencia Garcia', 'valencia.fiorella_1999@hotmail.com', '0924001829', TRUE
WHERE NOT EXISTS (
  SELECT 1 FROM metodos_pago WHERE negocio_id = @negocio_id AND banco = 'Banco Produbanco'
);
