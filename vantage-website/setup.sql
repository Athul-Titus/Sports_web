-- ═══════════════════════════════════════════════════════════════════════════
-- setup.sql — VantaGe Sports Consultancy
-- Run once to create the database and tables.
-- MySQL 5.7+ / MariaDB 10.3+
-- ═══════════════════════════════════════════════════════════════════════════

CREATE DATABASE IF NOT EXISTS vantage_db
  CHARACTER SET utf8mb4
  COLLATE utf8mb4_unicode_ci;

USE vantage_db;

-- ── Gallery images ──────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS gallery_images (
  id             INT          AUTO_INCREMENT PRIMARY KEY,
  cloudinary_url VARCHAR(500) NOT NULL,
  caption        VARCHAR(255) NULL,
  uploaded_at    TIMESTAMP    DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ── Admins ──────────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS admins (
  id            INT          AUTO_INCREMENT PRIMARY KEY,
  username      VARCHAR(100) NOT NULL UNIQUE,
  password_hash VARCHAR(255) NOT NULL,
  created_at    TIMESTAMP    DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ── Seed first admin (password: change_me_immediately) ──────────────────────
-- Replace the hash below with output of: php -r "echo password_hash('your_password', PASSWORD_DEFAULT);"
INSERT IGNORE INTO admins (username, password_hash)
VALUES ('admin', '$2y$12$exampleHashReplaceThisWithRealOneGeneratedByPhp');

-- ── Index for performance ────────────────────────────────────────────────────
CREATE INDEX IF NOT EXISTS idx_gallery_uploaded ON gallery_images (uploaded_at DESC);
