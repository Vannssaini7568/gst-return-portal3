import { Routes, Route, Navigate } from 'react-router-dom';
import { get, KEYS } from '../utils/localStorage';
import DashboardLayout from '../components/layout/DashboardLayout';
import Login from '../pages/Login';
import Dashboard from '../pages/Dashboard';
import UploadReturn from '../pages/UploadReturn';
import Returns from '../pages/Returns';
import ReturnDetails from '../pages/ReturnDetails';
import UploadHistory from '../pages/UploadHistory';
import GSTINManagement from '../pages/GSTINManagement';
import Reports from '../pages/Reports';
import Profile from '../pages/Profile';
import Settings from '../pages/Settings';
import AdminPanel from '../pages/AdminPanel';

function Guard({ children }) {
  return get(KEYS.auth, false) ? children : <Navigate to="/login" replace />;
}

function NotFound() {
  return (
    <div className="grid min-h-screen place-items-center">
      <div className="text-center">
        <p className="text-6xl font-black">404</p>
        <p className="mt-2 text-slate-500">Page not found</p>
        <a className="mt-4 inline-block text-brand-600" href="/dashboard" >
          Go to Dashboard
        </a>
      </div>
    </div>
  );
}

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route
        element={
          <Guard>
            <DashboardLayout />
          </Guard>
        }
      >
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/upload-return" element={<UploadReturn />} />
        <Route path="/returns" element={<Returns />} />
        <Route path="/returns/:id" element={<ReturnDetails />} />
        <Route path="/upload-history" element={<UploadHistory />} />
        <Route path="/gstins" element={<GSTINManagement />} />
        <Route path="/reports" element={<Reports />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/admin" element={<AdminPanel />} />
      </Route>
      <Route
        path="/"
        element={<Navigate to="/dashboard" replace />}
      />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}
 
