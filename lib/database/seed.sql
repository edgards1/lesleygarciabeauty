-- ============================================================
-- SQL para crear la base de datos y tablas del MVP
-- Ejecutar en MySQL Workbench, phpMyAdmin o CLI:
--   mysql -u root -p < seed.sql
--
-- Todos los nombres de tablas y campos están en español.
-- ============================================================

CREATE DATABASE IF NOT EXISTS lesleygarciabeauty
  CHARACTER SET utf8mb4
  COLLATE utf8mb4_unicode_ci;

USE lesleygarciabeauty;

-- Limpiar tablas existentes (orden inverso de dependencias)
DROP TABLE IF EXISTS citas;
DROP TABLE IF EXISTS clientes;
DROP TABLE IF EXISTS usuarios;
DROP TABLE IF EXISTS negocios;

-- ============================================================
-- 1. negocios
-- ============================================================

CREATE TABLE negocios (
  id CHAR(36) NOT NULL PRIMARY KEY,
  nombre VARCHAR(255) NOT NULL,
  slug VARCHAR(100) NOT NULL UNIQUE,
  zona_horaria VARCHAR(50) NOT NULL DEFAULT 'America/Guayaquil',
  google_refresh_token TEXT NULL,
  google_calendar_email VARCHAR(255) NULL,
  creado_en DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  actualizado_en DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ============================================================
-- 2. clientes
-- ============================================================

CREATE TABLE clientes (
  id CHAR(36) NOT NULL PRIMARY KEY,
  negocio_id CHAR(36) NOT NULL,
  nombre VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  telefono VARCHAR(50) NOT NULL,
  creado_en DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  actualizado_en DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  INDEX idx_clientes_email (email),
  INDEX idx_clientes_negocio (negocio_id),
  CONSTRAINT fk_clientes_negocio FOREIGN KEY (negocio_id) REFERENCES negocios(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ============================================================
-- 3. usuarios (admin login)
-- ============================================================

CREATE TABLE usuarios (
  id CHAR(36) NOT NULL PRIMARY KEY,
  negocio_id CHAR(36) NOT NULL,
  email VARCHAR(255) NOT NULL UNIQUE,
  password VARCHAR(255) NOT NULL,
  nombre VARCHAR(255) NOT NULL,
  creado_en DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  actualizado_en DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  INDEX idx_usuarios_email (email),
  INDEX idx_usuarios_negocio (negocio_id),
  CONSTRAINT fk_usuarios_negocio FOREIGN KEY (negocio_id) REFERENCES negocios(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ============================================================
-- 4. citas
-- ============================================================

CREATE TABLE citas (
  id CHAR(36) NOT NULL PRIMARY KEY,
  negocio_id CHAR(36) NOT NULL,
  cliente_id CHAR(36) NOT NULL,
  servicio_nombre VARCHAR(255) NOT NULL,
  servicio_precio DECIMAL(10,2) NOT NULL,
  servicio_categoria VARCHAR(50) NOT NULL,
  servicio_duracion VARCHAR(20) NOT NULL,
  tipo_ubicacion VARCHAR(20) NOT NULL DEFAULT 'studio',
  direccion TEXT NULL,
  referencia VARCHAR(255) NULL,
  latitud DECIMAL(10,7) NULL,
  longitud DECIMAL(10,7) NULL,
  fecha DATE NOT NULL,
  hora_inicio VARCHAR(5) NOT NULL,
  hora_fin VARCHAR(5) NOT NULL,
  monto_pagado DECIMAL(10,2) NOT NULL,
  porcentaje INT NOT NULL,
  codigo_seguimiento VARCHAR(255) NOT NULL,
  comprobante_archivo VARCHAR(255) NOT NULL,
  estado ENUM('pendiente','pendiente_de_revision','confirmada','cancelada','completada') NOT NULL DEFAULT 'pendiente',
  evento_google_id VARCHAR(255) NULL,
  carga_calendar BOOLEAN NOT NULL DEFAULT FALSE,
  creado_en DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  actualizado_en DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  INDEX idx_citas_fecha (fecha),
  INDEX idx_citas_estado (estado),
  INDEX idx_citas_negocio (negocio_id),
  INDEX idx_citas_cliente (cliente_id),
  CONSTRAINT fk_citas_negocio FOREIGN KEY (negocio_id) REFERENCES negocios(id) ON DELETE CASCADE,
  CONSTRAINT fk_citas_cliente FOREIGN KEY (cliente_id) REFERENCES clientes(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ============================================================
-- 5. Seed — negocio por defecto
-- ============================================================

INSERT INTO negocios (id, nombre, slug, zona_horaria)
VALUES (
  UUID(),
  'Lesley García Beauty',
  'lesleygarciabeauty',
  'America/Guayaquil'
);

-- ============================================================
-- 6. Seed — admin por defecto
--    email: lesleygarciabeauty@gmail.com / password: Negrita.30
-- NOTA: Si cambias la contraseña, regenerá el hash con:
--   node -e "const bcrypt = require('bcryptjs'); console.log(bcrypt.hashSync('nueva-pass', 12));"
-- ============================================================

INSERT INTO usuarios (id, negocio_id, email, password, nombre)
SELECT
  UUID(),
  id,
  'lesleygarciabeauty@gmail.com',
  '$2b$12$Tvo4fQBJPj5LIc7O2pZvH.5VV/d6V2M7VU0MojHs.eAFgCVaA9Jla',
  'Lesley García'
FROM negocios
WHERE slug = 'lesleygarciabeauty';
