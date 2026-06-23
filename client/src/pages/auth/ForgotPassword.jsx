import { useState } from 'react';
import { Link } from 'react-router-dom';
import AuthLayout from '../../components/layout/AuthLayout';

export default function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [sent, setSent] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSent(true);
  };

  return (
    <AuthLayout>
      <div className="auth-logo">
        <div className="auth-logo-icon"><i className="fas fa-stethoscope" /></div>
        <div><div className="auth-logo-text">Code Doctor</div></div>
      </div>
      <div className="auth-title">Reset your password</div>
      <div className="auth-sub">Enter your email to receive a reset link</div>
      {sent && <div className="auth-success"><i className="fas fa-envelope" /> &nbsp;Reset link sent! Check your inbox.</div>}
      <form onSubmit={handleSubmit}>
        <div className="field">
          <label>Email Address</label>
          <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="45427@students.riphah.edu.pk" required />
        </div>
        <button className="btn-auth" type="submit"><i className="fas fa-paper-plane" /> &nbsp;Send Reset Link</button>
      </form>
      <div className="auth-link"><Link to="/login"><i className="fas fa-arrow-left" /> Back to login</Link></div>
    </AuthLayout>
  );
}
