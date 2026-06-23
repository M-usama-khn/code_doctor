CREATE DATABASE IF NOT EXISTS code_doctor;
USE code_doctor;

CREATE TABLE IF NOT EXISTS users (
  id         INT AUTO_INCREMENT PRIMARY KEY,
  full_name  VARCHAR(100) NOT NULL,
  sap_id     VARCHAR(20)  NOT NULL UNIQUE,
  email      VARCHAR(150) NOT NULL UNIQUE,
  password   VARCHAR(255) NOT NULL,
  role       ENUM('Developer', 'Reviewer', 'Administrator') DEFAULT 'Developer',
  avatar     VARCHAR(255) NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
