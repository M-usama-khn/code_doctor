import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import Topbar from './Topbar';

export default function AppShell() {
  return (
    <div className="app-page">
      <Sidebar />
      <div className="main-content">
        <Topbar />
        <div className="content-area">
          <Outlet />
        </div>
      </div>
    </div>
  );
}
