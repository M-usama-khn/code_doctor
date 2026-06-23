import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import AuthLayout from '../../components/layout/AuthLayout';
import { useAuth } from '../../contexts/AuthContext';
import { useToast } from '../../contexts/ToastContext';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const { showToast } = useToast();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const user = await login(email, password);
      showToast(`Welcome back, ${user.fullName}!`, 'green');
      navigate('/dashboard');
    } catch (err) {
      setError(err.response?.data?.message || 'Invalid email or password.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthLayout>
      <div className="auth-logo">
        <div className="auth-logo-icon"><i className="fas fa-stethoscope" /></div>
        <div style={{ textAlign: 'left' }}>
          <div className="auth-logo-text">Code Doctor</div>
          <div style={{ fontSize: 10, color: 'var(--text3)' }}>Static Analysis Platform</div>
        </div>
      </div>
      <div className="auth-sub" style={{ marginBottom: 4 }}>
        Riphah International University, Lahore Campus<br />
        School of Computing &amp; Innovation
      </div>
      <hr className="divider" />
      <div className="auth-title">Sign in to your account</div>
      <div className="auth-sub">Use your student email and password</div>
      {error && (
        <div className="auth-alert">
          <i className="fas fa-circle-exclamation" /> &nbsp;{error}
        </div>
      )}
      <form onSubmit={handleSubmit}>
        <div className="field">
          <label>Email Address</label>
          <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="45427@students.riphah.edu.pk" required />
        </div>
        <div className="field">
          <label>Password</label>
          <input type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="••••••••" required />
        </div>
        <button className="btn-auth" type="submit" disabled={loading}>
          <i className="fas fa-arrow-right-to-bracket" /> &nbsp;{loading ? 'Signing in…' : 'Sign In'}
        </button>
      </form>
      <div className="auth-link"><Link to="/forgot">Forgot password?</Link></div>
      <div className="auth-link">Don&apos;t have an account? <Link to="/signup">Create one</Link></div>
    </AuthLayout>
  );
}
