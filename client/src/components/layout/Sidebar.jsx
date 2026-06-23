import { NavLink, useNavigate } from 'react-router-dom';
import { NAV_ITEMS } from '../../utils/constants';
import { getRoleLabel } from '../../utils/userHelpers';
import UserAvatar from '../common/UserAvatar';
import { useAuth } from '../../contexts/AuthContext';
import { useToast } from '../../contexts/ToastContext';

export default function Sidebar() {
  const { user, logout } = useAuth();
  const { showToast } = useToast();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    showToast('Logged out successfully', 'blue');
    navigate('/login');
  };

  return (
    <div className="sidebar">
      <div className="sidebar-logo">
        <div className="s-logo-icon"><i className="fas fa-stethoscope" /></div>
        <div>
          <div className="s-logo-text">Code Doctor</div>
          <div className="s-logo-uni">Riphah Int&apos;l Univ.</div>
        </div>
      </div>
      <nav className="sidebar-nav">
        {NAV_ITEMS.map(section => (
          <div key={section.section}>
            <div className="nav-section">{section.section}</div>
            {section.items.map(item => (
              <NavLink
                key={item.id}
                to={item.path}
                className={({ isActive }) => `nav-item${isActive ? ' active' : ''}`}
              >
                <i className={`fas ${item.icon}`} />
                {item.label}
                {item.badge && <span className="nav-badge">{item.badge}</span>}
              </NavLink>
            ))}
          </div>
        ))}
      </nav>
      <div className="sidebar-user">
        <UserAvatar user={user} />
        <div>
          <div className="s-user-name">{user?.fullName}</div>
          <div className="s-user-role">SAP {user?.sapId} · {getRoleLabel(user?.role)}</div>
        </div>
        <button className="s-logout" onClick={handleLogout} title="Logout" type="button">
          <i className="fas fa-arrow-right-from-bracket" />
        </button>
      </div>
    </div>
  );
}
