export default function AuthLayout({ children }) {
  return (
    <div className="auth-page">
      <div className="auth-bg" />
      <div className="auth-grid" />
      <div className="auth-box">{children}</div>
    </div>
  );
}
