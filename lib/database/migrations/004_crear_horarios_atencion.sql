CREATE TABLE IF NOT EXISTS horarios_atencion (
  id CHAR(36) NOT NULL PRIMARY KEY,
  negocio_id CHAR(36) NOT NULL,
  dia_semana TINYINT NOT NULL COMMENT '0=Domingo, 1=Lunes ... 6=Sábado',
  hora_apertura TIME NOT NULL,
  hora_cierre TIME NOT NULL,
  activo BOOLEAN DEFAULT TRUE,
  creado_en DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  actualizado_en DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  INDEX idx_hor_negocio (negocio_id),
  CONSTRAINT fk_hor_negocio FOREIGN KEY (negocio_id) REFERENCES negocios(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
