import { useState, useEffect } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { getInitials } from '../../utils/constants';
import * as authService from '../../services/authService';
import { useToast } from '../../contexts/ToastContext';

export default function Profile() {
  const { user, updateUser } = useAuth();
  const { showToast } = useToast();
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');

  useEffect(() => {
    if (user) {
      setFullName(user.fullName || '');
      setEmail(user.email || '');
    }
  }, [user]);
  const [saving, setSaving] = useState(false);
  const [passwords, setPasswords] = useState({ current: '', newPass: '', confirm: '' });
  const [changingPass, setChangingPass] = useState(false);

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

  return (
    <div style={{ maxWidth: 600 }}>
      <div className="profile-header">
        <div className="prof-avatar-big">{getInitials(user?.fullName)}</div>
        <div>
          <div className="prof-name">{user?.fullName}</div>
          <div className="prof-role">{user?.role} · School of Computing &amp; Innovation</div>
          <div className="prof-sap">SAP ID: {user?.sapId} · FYP Group Member</div>
        </div>
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
              <div className="form-group"><label>Role</label><input className="form-control" value={user?.role || ''} readOnly /></div>
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
