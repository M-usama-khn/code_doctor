import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import pool from '../config/db.js';

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const RIPHAH_RE = /@(riphah\.edu\.pk|students\.riphah\.edu\.pk)$/i;

function signToken(user) {
  return jwt.sign(
    { id: user.id, email: user.email, role: user.role },
    process.env.JWT_SECRET,
    { expiresIn: '7d' }
  );
}

function formatUser(row) {
  return {
    id: row.id,
    fullName: row.full_name,
    sapId: row.sap_id,
    email: row.email,
    role: row.role,
    avatar: row.avatar || null,
    createdAt: row.created_at,
  };
}

export async function register(req, res) {
  try {
    const { fullName, sapId, email, password, role } = req.body;

    if (!fullName?.trim() || !sapId?.trim() || !email?.trim() || !password) {
      return res.status(400).json({ message: 'All fields are required' });
    }
    if (!EMAIL_RE.test(email)) {
      return res.status(400).json({ message: 'Invalid email format' });
    }
    if (!RIPHAH_RE.test(email)) {
      return res.status(400).json({ message: 'Use a Riphah email (@riphah.edu.pk or @students.riphah.edu.pk)' });
    }
    if (password.length < 8) {
      return res.status(400).json({ message: 'Password must be at least 8 characters' });
    }

    const allowedRoles = ['Developer', 'Reviewer', 'Administrator'];
    const userRole = allowedRoles.includes(role) ? role : 'Developer';

    const [existing] = await pool.query(
      'SELECT id FROM users WHERE email = ? OR sap_id = ?',
      [email.trim().toLowerCase(), sapId.trim()]
    );
    if (existing.length) {
      return res.status(409).json({ message: 'Email or SAP ID already registered' });
    }

    const hash = await bcrypt.hash(password, 10);
    const [result] = await pool.query(
      'INSERT INTO users (full_name, sap_id, email, password, role) VALUES (?, ?, ?, ?, ?)',
      [fullName.trim(), sapId.trim(), email.trim().toLowerCase(), hash, userRole]
    );

    res.status(201).json({
      message: 'Account created successfully',
      user: { id: result.insertId, fullName: fullName.trim(), sapId: sapId.trim(), email: email.trim().toLowerCase(), role: userRole },
    });
  } catch (err) {
    console.error('Register error:', err);
    res.status(500).json({ message: 'Server error during registration' });
  }
}

export async function login(req, res) {
  try {
    const { email, password } = req.body;
    if (!email?.trim() || !password) {
      return res.status(400).json({ message: 'Email and password are required' });
    }

    const [rows] = await pool.query('SELECT * FROM users WHERE email = ?', [email.trim().toLowerCase()]);
    if (!rows.length) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    const user = rows[0];
    const valid = await bcrypt.compare(password, user.password);
    if (!valid) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    const token = signToken(user);
    res.json({ token, user: formatUser(user) });
  } catch (err) {
    console.error('Login error:', err);
    res.status(500).json({ message: 'Server error during login' });
  }
}
