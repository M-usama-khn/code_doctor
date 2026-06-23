import bcrypt from 'bcryptjs';
import pool from '../config/db.js';
import { deleteAvatarFile } from '../middleware/upload.js';

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const RIPHAH_RE = /@(riphah\.edu\.pk|students\.riphah\.edu\.pk)$/i;

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

export async function getProfile(req, res) {
  try {
    const [rows] = await pool.query('SELECT * FROM users WHERE id = ?', [req.user.id]);
    if (!rows.length) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json({ user: formatUser(rows[0]) });
  } catch (err) {
    console.error('Get profile error:', err);
    res.status(500).json({ message: 'Server error' });
  }
}

export async function updateProfile(req, res) {
  try {
    const { fullName, email } = req.body;
    if (!fullName?.trim() || !email?.trim()) {
      return res.status(400).json({ message: 'Full name and email are required' });
    }
    if (!EMAIL_RE.test(email)) {
      return res.status(400).json({ message: 'Invalid email format' });
    }
    if (!RIPHAH_RE.test(email)) {
      return res.status(400).json({ message: 'Use a Riphah email (@riphah.edu.pk or @students.riphah.edu.pk)' });
    }

    const [dup] = await pool.query('SELECT id FROM users WHERE email = ? AND id != ?', [email.trim().toLowerCase(), req.user.id]);
    if (dup.length) {
      return res.status(409).json({ message: 'Email already in use' });
    }

    await pool.query('UPDATE users SET full_name = ?, email = ? WHERE id = ?', [fullName.trim(), email.trim().toLowerCase(), req.user.id]);

    const [rows] = await pool.query('SELECT * FROM users WHERE id = ?', [req.user.id]);
    res.json({ message: 'Profile updated successfully', user: formatUser(rows[0]) });
  } catch (err) {
    console.error('Update profile error:', err);
    res.status(500).json({ message: 'Server error' });
  }
}

export async function uploadAvatar(req, res) {
  try {
    if (!req.file) {
      return res.status(400).json({ message: 'No image file provided' });
    }

    const [rows] = await pool.query('SELECT avatar FROM users WHERE id = ?', [req.user.id]);
    if (!rows.length) {
      return res.status(404).json({ message: 'User not found' });
    }

    const avatarPath = `/uploads/avatars/${req.file.filename}`;
    deleteAvatarFile(rows[0].avatar);

    await pool.query('UPDATE users SET avatar = ? WHERE id = ?', [avatarPath, req.user.id]);

    const [updated] = await pool.query('SELECT * FROM users WHERE id = ?', [req.user.id]);
    res.json({ message: 'Profile photo updated successfully', user: formatUser(updated[0]) });
  } catch (err) {
    console.error('Upload avatar error:', err);
    res.status(500).json({ message: err.message || 'Server error' });
  }
}

export async function changePassword(req, res) {
  try {
    const { currentPassword, newPassword, confirmPassword } = req.body;
    if (!currentPassword || !newPassword || !confirmPassword) {
      return res.status(400).json({ message: 'All password fields are required' });
    }
    if (newPassword.length < 8) {
      return res.status(400).json({ message: 'New password must be at least 8 characters' });
    }
    if (newPassword !== confirmPassword) {
      return res.status(400).json({ message: 'New passwords do not match' });
    }

    const [rows] = await pool.query('SELECT password FROM users WHERE id = ?', [req.user.id]);
    if (!rows.length) {
      return res.status(404).json({ message: 'User not found' });
    }

    const valid = await bcrypt.compare(currentPassword, rows[0].password);
    if (!valid) {
      return res.status(401).json({ message: 'Current password is incorrect' });
    }

    const hash = await bcrypt.hash(newPassword, 10);
    await pool.query('UPDATE users SET password = ? WHERE id = ?', [hash, req.user.id]);
    res.json({ message: 'Password changed successfully' });
  } catch (err) {
    console.error('Change password error:', err);
    res.status(500).json({ message: 'Server error' });
  }
}
