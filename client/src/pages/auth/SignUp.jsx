import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import AuthLayout from '../../components/layout/AuthLayout';
import { useAuth } from '../../contexts/AuthContext';

export default function SignUp() {
  const [form, setForm] = useState({ fullName: '', sapId: '', email: '', password: '', role: 'Developer' });
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { register } = useAuth();
  const navigate = useNavigate();

  const update = (field) => (e) => setForm(f => ({ ...f, [field]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    if (form.password.length < 8) {
      setError('Password must be at least 8 characters');
      return;
    }
    setLoading(true);
    try {
      await register(form);
      setSuccess('Account created! Redirecting to login…');
      setTimeout(() => navigate('/login'), 2000);
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthLayout>
      <div className="auth-logo">
        <div className="auth-logo-icon"><i className="fas fa-stethoscope" /></div>
        <div>
          <div className="auth-logo-text">Code Doctor</div>
          <div style={{ fontSize: 10, color: 'var(--text3)' }}>Static Analysis Platform</div>
        </div>
      </div>
      <div className="auth-title">Create an account</div>
      <div className="auth-sub">Join the Code Doctor platform</div>
      {success && <div className="auth-success"><i className="fas fa-check-circle" /> &nbsp;{success}</div>}
      {error && <div className="auth-alert"><i className="fas fa-circle-exclamation" /> &nbsp;{error}</div>}
      <form onSubmit={handleSubmit}>
        <div className="field"><label>Full Name</label><input type="text" value={form.fullName} onChange={update('fullName')} placeholder="Your full name" required /></div>
        <div className="field"><label>SAP ID</label><input type="text" value={form.sapId} onChange={update('sapId')} placeholder="e.g. 47848" required /></div>
        <div className="field"><label>Email Address</label><input type="email" value={form.email} onChange={update('email')} placeholder="45427@students.riphah.edu.pk" required /></div>
        <div className="field"><label>Password</label><input type="password" value={form.password} onChange={update('password')} placeholder="Min 8 characters" required minLength={8} /></div>
        <div className="field">
          <label>Role</label>
          <select className="form-control" value={form.role} onChange={update('role')}>
            <option value="Developer">Student / Developer</option>
            <option value="Reviewer">Reviewer</option>
            <option value="Administrator">Administrator</option>
          </select>
        </div>
        <button className="btn-auth" type="submit" disabled={loading}>
          <i className="fas fa-user-plus" /> &nbsp;{loading ? 'Creating…' : 'Create Account'}
        </button>
      </form>
      <div className="auth-link">Already have an account? <Link to="/login">Sign in</Link></div>
    </AuthLayout>
  );
}
