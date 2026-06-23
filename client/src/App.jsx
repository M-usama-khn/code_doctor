import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import { ThemeProvider } from './contexts/ThemeContext';
import { ToastProvider } from './contexts/ToastContext';
import ProtectedRoute, { GuestRoute } from './components/ProtectedRoute';
import AppShell from './components/layout/AppShell';
import Login from './pages/auth/Login';
import SignUp from './pages/auth/SignUp';
import ForgotPassword from './pages/auth/ForgotPassword';
import Dashboard from './pages/dashboard/Dashboard';
import Upload from './pages/dashboard/Upload';
import Analysis from './pages/dashboard/Analysis';
import SmellReport from './pages/dashboard/SmellReport';
import Security from './pages/dashboard/Security';
import Complexity from './pages/dashboard/Complexity';
import AISuggestions from './pages/dashboard/AISuggestions';
import Reports from './pages/dashboard/Reports';
import Search from './pages/dashboard/Search';
import Admin from './pages/dashboard/Admin';
import Profile from './pages/dashboard/Profile';

export default function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <ToastProvider>
          <BrowserRouter>
            <Routes>
              <Route path="/login" element={<GuestRoute><Login /></GuestRoute>} />
              <Route path="/signup" element={<GuestRoute><SignUp /></GuestRoute>} />
              <Route path="/forgot" element={<GuestRoute><ForgotPassword /></GuestRoute>} />
              <Route path="/" element={<ProtectedRoute><AppShell /></ProtectedRoute>}>
                <Route index element={<Navigate to="/dashboard" replace />} />
                <Route path="dashboard" element={<Dashboard />} />
                <Route path="upload" element={<Upload />} />
                <Route path="analysis" element={<Analysis />} />
                <Route path="smells" element={<SmellReport />} />
                <Route path="security" element={<Security />} />
                <Route path="complexity" element={<Complexity />} />
                <Route path="ai" element={<AISuggestions />} />
                <Route path="reports" element={<Reports />} />
                <Route path="search" element={<Search />} />
                <Route path="admin" element={<Admin />} />
                <Route path="profile" element={<Profile />} />
              </Route>
              <Route path="*" element={<Navigate to="/dashboard" replace />} />
            </Routes>
          </BrowserRouter>
        </ToastProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}
