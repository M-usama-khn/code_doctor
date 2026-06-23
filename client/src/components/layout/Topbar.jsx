import { useLocation, useNavigate } from 'react-router-dom';
import { PAGE_TITLES } from '../../utils/constants';
import { useTheme } from '../../contexts/ThemeContext';
import { useToast } from '../../contexts/ToastContext';

export default function Topbar() {
  const location = useLocation();
  const navigate = useNavigate();
  const { toggleTheme, isDark } = useTheme();
  const { showToast } = useToast();

  const segment = location.pathname.split('/')[1] || 'dashboard';
  const title = PAGE_TITLES[segment] || 'Dashboard';

  const quickSearch = (v) => {
    if (v.length > 2) navigate('/search');
  };

  return (
    <div className="topbar">
      <span className="topbar-title">{title}</span>
      <div className="topbar-search">
        <i className="fas fa-magnifying-glass" />
        <input placeholder="Search projects…" onChange={e => quickSearch(e.target.value)} />
      </div>
      <button className="btn" onClick={toggleTheme} title="Toggle theme" type="button">
        <i className={`fas ${isDark ? 'fa-sun' : 'fa-moon'}`} />
      </button>
      <button className="btn btn-blue" onClick={() => navigate('/upload')} type="button">
        <i className="fas fa-plus" /> Upload Code
      </button>
      <button className="btn" onClick={() => showToast('Preparing PDF report for download…', 'blue')} type="button">
        <i className="fas fa-file-arrow-down" /> PDF Report
      </button>
    </div>
  );
}
