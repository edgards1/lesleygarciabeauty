CREATE TABLE IF NOT EXISTS categorias_servicios (
  id CHAR(36) NOT NULL PRIMARY KEY,
  negocio_id CHAR(36) NOT NULL,
  nombre VARCHAR(100) NOT NULL,
  slug VARCHAR(50) NOT NULL,
  orden INT DEFAULT 0,
  activo BOOLEAN DEFAULT TRUE,
  creado_en DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  actualizado_en DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  INDEX idx_cat_negocio (negocio_id),
  UNIQUE KEY uq_cat_negocio_slug (negocio_id, slug),
  CONSTRAINT fk_cat_negocio FOREIGN KEY (negocio_id) REFERENCES negocios(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
