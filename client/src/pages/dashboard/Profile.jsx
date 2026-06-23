import { useRef, useState, useEffect } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { getRoleLabel } from '../../utils/userHelpers';
import UserAvatar from '../../components/common/UserAvatar';
import AvatarCropModal from '../../components/profile/AvatarCropModal';
import * as authService from '../../services/authService';
import { useToast } from '../../contexts/ToastContext';

const IMAGE_TYPES = ['image/jpeg', 'image/png', 'image/webp', 'image/gif'];
const MAX_AVATAR_SIZE = 5 * 1024 * 1024;

export default function Profile() {
  const { user, updateUser, refreshProfile } = useAuth();
  const { showToast } = useToast();
  const photoRef = useRef(null);
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [loadingProfile, setLoadingProfile] = useState(true);
  const [saving, setSaving] = useState(false);
  const [uploadingPhoto, setUploadingPhoto] = useState(false);
  const [cropImageSrc, setCropImageSrc] = useState(null);
  const [passwords, setPasswords] = useState({ current: '', newPass: '', confirm: '' });
  const [changingPass, setChangingPass] = useState(false);

  useEffect(() => {
    refreshProfile()
      .catch(() => showToast('Failed to load profile', 'red'))
      .finally(() => setLoadingProfile(false));
  }, [refreshProfile, showToast]);

  useEffect(() => {
    if (user) {
      setFullName(user.fullName || '');
      setEmail(user.email || '');
    }
  }, [user]);

  const closeCropModal = () => {
    if (cropImageSrc) URL.revokeObjectURL(cropImageSrc);
    setCropImageSrc(null);
  };

  const handleSaveProfile = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      const data = await authService.updateProfile(fullName, email);
      updateUser(data.user);
      showToast('Profile updated successfully!', 'green');
    } catch (err) {
      showToast(err.response?.data?.message || 'Failed to update profile', 'red');
    } finally {
      setSaving(false);
    }
  };

  const handlePhotoSelect = (e) => {
    const file = e.target.files?.[0];
    e.target.value = '';
    if (!file) return;

    if (!IMAGE_TYPES.includes(file.type)) {
      showToast('Only JPG, PNG, WEBP, or GIF images are allowed', 'red');
      return;
    }
    if (file.size > MAX_AVATAR_SIZE) {
      showToast('Image must be under 5MB', 'red');
      return;
    }

    const src = URL.createObjectURL(file);
    setCropImageSrc(src);
  };

  const handleCropSave = async (croppedFile) => {
    setUploadingPhoto(true);
    try {
      const data = await authService.uploadAvatar(croppedFile);
      updateUser(data.user);
      showToast('Profile photo updated!', 'green');
      closeCropModal();
    } catch (err) {
      showToast(err.response?.data?.message || 'Failed to upload photo', 'red');
    } finally {
      setUploadingPhoto(false);
    }
  };

  const handleChangePassword = async (e) => {
    e.preventDefault();
    setChangingPass(true);
    try {
      await authService.changePassword(passwords.current, passwords.newPass, passwords.confirm);
      showToast('Password changed successfully!', 'green');
      setPasswords({ current: '', newPass: '', confirm: '' });
    } catch (err) {
      showToast(err.response?.data?.message || 'Failed to change password', 'red');
    } finally {
      setChangingPass(false);
    }
  };

  if (loadingProfile) {
    return <div className="loading-screen" style={{ minHeight: 200 }}>Loading profile…</div>;
  }

  return (
    <div className="profile-page">
      {cropImageSrc && (
        <AvatarCropModal
          imageSrc={cropImageSrc}
          onClose={closeCropModal}
          onSave={handleCropSave}
          saving={uploadingPhoto}
        />
      )}

      <div className="profile-header">
        <UserAvatar user={user} className="prof-avatar-big" size={72} />
        <div>
          <div className="prof-name">{user?.fullName}</div>
          <div className="prof-role">{getRoleLabel(user?.role)} · School of Computing &amp; Innovation</div>
          <div className="prof-sap">SAP ID: {user?.sapId} · FYP Group Member</div>
        </div>
        <input ref={photoRef} type="file" accept="image/jpeg,image/png,image/webp,image/gif" style={{ display: 'none' }} onChange={handlePhotoSelect} />
        <button className="btn btn-blue profile-photo-btn" type="button" onClick={() => photoRef.current?.click()} disabled={uploadingPhoto}>
          <i className="fas fa-camera" /> Photo
        </button>
      </div>

      <div className="panel" style={{ marginBottom: 14 }}>
        <div className="panel-hd"><span className="panel-title"><i className="fas fa-user" style={{ color: 'var(--blue)', marginRight: 6 }} />Account Information</span></div>
        <div className="panel-body">
          <form onSubmit={handleSaveProfile}>
            <div className="form-row">
              <div className="form-group"><label>Full Name</label><input className="form-control" value={fullName} onChange={e => setFullName(e.target.value)} required /></div>
              <div className="form-group"><label>SAP ID</label><input className="form-control" value={user?.sapId || ''} readOnly /></div>
            </div>
            <div className="form-row">
              <div className="form-group"><label>Email Address</label><input className="form-control" type="email" value={email} onChange={e => setEmail(e.target.value)} required /></div>
              <div className="form-group"><label>Role</label><input className="form-control" value={getRoleLabel(user?.role)} readOnly /></div>
            </div>
            <button className="btn btn-blue" type="submit" disabled={saving}>
              <i className="fas fa-save" /> {saving ? 'Saving…' : 'Save Changes'}
            </button>
          </form>
        </div>
      </div>

      <div className="panel">
        <div className="panel-hd"><span className="panel-title"><i className="fas fa-lock" style={{ color: 'var(--orange)', marginRight: 6 }} />Change Password</span></div>
        <div className="panel-body">
          <form onSubmit={handleChangePassword}>
            <div className="form-group"><label>Current Password</label><input type="password" className="form-control" value={passwords.current} onChange={e => setPasswords(p => ({ ...p, current: e.target.value }))} placeholder="••••••••" required /></div>
            <div className="form-row">
              <div className="form-group"><label>New Password</label><input type="password" className="form-control" value={passwords.newPass} onChange={e => setPasswords(p => ({ ...p, newPass: e.target.value }))} placeholder="Min 8 characters" required minLength={8} /></div>
              <div className="form-group"><label>Confirm Password</label><input type="password" className="form-control" value={passwords.confirm} onChange={e => setPasswords(p => ({ ...p, confirm: e.target.value }))} placeholder="Repeat new password" required /></div>
            </div>
            <button className="btn btn-blue" type="submit" disabled={changingPass}>
              <i className="fas fa-key" /> {changingPass ? 'Updating…' : 'Update Password'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
