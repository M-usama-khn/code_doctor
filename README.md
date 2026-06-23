# Code Doctor

Intelligent static code analysis platform — FYP Project, Riphah International University.

**Repository:** https://github.com/M-usama-khn/code_doctor

## Tech Stack

- **Frontend:** React + Vite (`client/`)
- **Backend:** Node.js + Express (`server/`)
- **Database:** MySQL via XAMPP

---

## Prerequisites (install on your PC)

| Software | Purpose | Download |
|----------|---------|----------|
| **Node.js** (v18+) | Run frontend & backend | https://nodejs.org |
| **XAMPP** | MySQL database | https://www.apachefriends.org |
| **Git** | Clone the repo | https://git-scm.com |

---

## Setup Guide (for new team members)

### Step 1 — Clone the project

```bash
git clone https://github.com/M-usama-khn/code_doctor.git
cd code_doctor
```

### Step 2 — Start XAMPP MySQL

1. Open **XAMPP Control Panel**
2. Click **Start** next to **MySQL** (Apache is optional for this app)

### Step 3 — Create the database

**Option A — phpMyAdmin (recommended)**

1. Open http://localhost/phpmyadmin/index.php
2. Click **Import** tab
3. Choose file: `database/schema.sql`
4. Click **Go**

This creates the `code_doctor` database and the `users` table.

**Option B — MySQL command line (Windows)**

```powershell
C:\xampp\mysql\bin\mysql.exe -u root -e "source D:/path/to/code_doctor/database/schema.sql"
```

> **Already have the database?** If you set up before the profile photo feature, also run `database/migration_add_avatar.sql`.

### Step 4 — Configure backend environment

```bash
cd server
copy .env.example .env
```

Default `.env` (works with XAMPP out of the box):

```
PORT=5000
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=
DB_NAME=code_doctor
JWT_SECRET=code_doctor_jwt_secret_change_in_production
```

Change `DB_PASSWORD` only if your MySQL root user has a password.

### Step 5 — Install dependencies

Open **two terminals**:

```bash
# Terminal 1 — Backend
cd server
npm install

# Terminal 2 — Frontend
cd client
npm install
```

### Step 6 — Run the application

```bash
# Terminal 1 — Backend (keep running)
cd server
npm run dev

# Terminal 2 — Frontend (keep running)
cd client
npm run dev
```

You should see:

- API: `http://localhost:5000`
- App: `http://localhost:5173`

Open **http://localhost:5173** in your browser.

### Step 7 — Create your account

1. Click **Create one** on the login page
2. Use a Riphah email: `@riphah.edu.pk` or `@students.riphah.edu.pk`
3. Password: minimum 8 characters
4. Sign in after registration

---

## Project Structure

```
code_doctor/
├── client/          React frontend
├── server/          Express API
├── database/        SQL schema & migrations
└── code_doctor.html Original UI prototype (reference)
```

---

## Common Issues

| Problem | Fix |
|---------|-----|
| `Server error during registration` | Import `database/schema.sql` in phpMyAdmin |
| `Failed to upload photo` | Restart backend: `Ctrl+C` then `npm run dev` in `server/` |
| Port 5000 already in use | Stop other Node processes or change `PORT` in `server/.env` |
| MySQL connection failed | Ensure XAMPP MySQL is running |

---

## Team

- Hassan Tahir (45427) — Project Leader
- Ch Umer Abbas (47074)
- Ch AbdulRehman Akram (47848)
- Supervisor: Dr Muhammad Fawad
