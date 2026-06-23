import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import multer from 'multer';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
export const avatarsDir = path.join(__dirname, '..', 'uploads', 'avatars');

fs.mkdirSync(avatarsDir, { recursive: true });

const ALLOWED = ['.jpg', '.jpeg', '.png', '.webp', '.gif'];

const storage = multer.diskStorage({
  destination: (_req, _file, cb) => cb(null, avatarsDir),
  filename: (req, file, cb) => {
    let ext = path.extname(file.originalname).toLowerCase();
    if (!ext) {
      const map = { 'image/jpeg': '.jpg', 'image/png': '.png', 'image/webp': '.webp', 'image/gif': '.gif' };
      ext = map[file.mimetype] || '.jpg';
    }
    cb(null, `user-${req.user.id}-${Date.now()}${ext}`);
  },
});

export const avatarUpload = multer({
  storage,
  limits: { fileSize: 2 * 1024 * 1024 },
  fileFilter: (_req, file, cb) => {
    const ext = path.extname(file.originalname).toLowerCase();
    const mimeOk = /^image\/(jpeg|png|webp|gif)$/.test(file.mimetype);
    if (ALLOWED.includes(ext) || mimeOk) cb(null, true);
    else cb(new Error('Only JPG, PNG, WEBP, or GIF images are allowed'));
  },
});

export function deleteAvatarFile(avatarPath) {
  if (!avatarPath) return;
  const filename = path.basename(avatarPath);
  const fullPath = path.join(avatarsDir, filename);
  if (fs.existsSync(fullPath)) fs.unlinkSync(fullPath);
}
