CREATE TABLE IF NOT EXISTS bloqueos_agenda (
  id CHAR(36) NOT NULL PRIMARY KEY,
  negocio_id CHAR(36) NOT NULL,
  fecha_inicio DATE NOT NULL,
  fecha_fin DATE NOT NULL,
  motivo VARCHAR(255),
  hora_inicio TIME NULL COMMENT 'NULL = bloqueo todo el día',
  hora_fin TIME NULL,
  creado_en DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  INDEX idx_bloq_negocio (negocio_id),
  CONSTRAINT fk_bloq_negocio FOREIGN KEY (negocio_id) REFERENCES negocios(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
