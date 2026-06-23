-- Run once if users table already exists without avatar column
USE code_doctor;

ALTER TABLE users
  ADD COLUMN IF NOT EXISTS avatar VARCHAR(255) NULL AFTER role;
