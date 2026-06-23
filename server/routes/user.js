import { Router } from 'express';
import { authMiddleware } from '../middleware/auth.js';
import { avatarUpload } from '../middleware/upload.js';
import { getProfile, updateProfile, uploadAvatar, changePassword } from '../controllers/userController.js';

const router = Router();

function handleUpload(req, res, next) {
  avatarUpload.single('avatar')(req, res, err => {
    if (err) {
      const message = err.code === 'LIMIT_FILE_SIZE'
        ? 'Image must be under 2MB'
        : err.message || 'Upload failed';
      return res.status(400).json({ message });
    }
    next();
  });
}

router.get('/profile', authMiddleware, getProfile);
router.put('/profile', authMiddleware, updateProfile);
router.post('/avatar', authMiddleware, handleUpload, uploadAvatar);
router.put('/password', authMiddleware, changePassword);

export default router;
