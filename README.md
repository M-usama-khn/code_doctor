# Code Doctor

Intelligent static code analysis platform — FYP Project, Riphah International University.

## Tech Stack

- **Frontend:** React 18 + Vite
- **Backend:** Node.js + Express
- **Database:** MySQL (XAMPP)

## Prerequisites

- Node.js 18+
- XAMPP with MySQL running

## Setup

### 1. Database

Import the schema in phpMyAdmin or run:

```bash
mysql -u root < database/schema.sql
```

### 2. Backend

```bash
cd server
cp .env.example .env   # edit if needed (default: root, no password)
npm install
npm run dev
```

API runs at `http://localhost:5000`

### 3. Frontend

```bash
cd client
npm install
npm run dev
```

App runs at `http://localhost:5173`

## Features (Current Phase)

- Full dashboard UI matching the original prototype
- Dark / Light theme toggle
- Upload validation (.py, .js, .java only)
- Login, Sign Up, Profile (MySQL-backed)

## Project Structure

```
code_doctor/
├── client/          React frontend
├── server/          Express API
├── database/        MySQL schema
└── code_doctor.html Original prototype (reference)
```

## Team

- Hassan Tahir (45427) — Project Leader
- Ch Umer Abbas (47074)
- Ch AbdulRehman Akram (47848)
- Supervisor: Dr Muhammad Fawad
