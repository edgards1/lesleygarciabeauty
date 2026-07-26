CREATE TABLE IF NOT EXISTS metodos_pago (
  id CHAR(36) NOT NULL PRIMARY KEY,
  negocio_id CHAR(36) NOT NULL,
  tipo ENUM('transferencia','payphone','stripe') NOT NULL DEFAULT 'transferencia',
  banco VARCHAR(100),
  tipo_cuenta VARCHAR(50),
  numero_cuenta VARCHAR(50),
  titular VARCHAR(255),
  email_cuenta VARCHAR(255),
  documento_id VARCHAR(20),
  activo BOOLEAN DEFAULT TRUE,
  creado_en DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  actualizado_en DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  INDEX idx_met_negocio (negocio_id),
  CONSTRAINT fk_met_negocio FOREIGN KEY (negocio_id) REFERENCES negocios(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
