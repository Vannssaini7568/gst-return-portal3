import { NavLink, useNavigate } from 'react-router-dom';
import {
  LayoutDashboard,
  Upload,
  FileText,
  History,
  Building2,
  BarChart3,
  User,
  Settings,
  ShieldCheck,
  LogOut,
  X,
  PanelLeftClose,
  PanelLeftOpen,
} from 'lucide-react';
import { remove, KEYS } from '../../utils/localStorage';

const items = [
  ['/dashboard', 'Dashboard', LayoutDashboard],
  ['/upload-return', 'Upload Return', Upload],
  ['/returns', 'Returns', FileText],
  ['/upload-history', 'Upload History', History],
  ['/gstins', 'GSTIN Management', Building2],
  ['/reports', 'Reports', BarChart3],
  ['/profile', 'Profile', User],
  ['/settings', 'Settings', Settings],
  ['/admin', 'Admin Panel', ShieldCheck],
];

export default function Sidebar({
  open,
  setOpen,
  collapsed,
  setCollapsed,
}) {
  const nav = useNavigate();

  const logout = () => {
    remove(KEYS.auth);
    nav('/login');
  };

  return (
    <aside
      className={`${open ? 'translate-x-0' : '-translate-x-full'} fixed inset-y-0 left-0 z-40 w-64 border-r border-gray-200 bg-white transition md:static md:translate-x-0 ${
        collapsed ? 'md:w-20' : ''
      }`}
    >
      <div className="flex h-16 items-center justify-between border-b border-gray-200 px-4">
        <div
          className={`flex items-center gap-2 font-bold text-brand-700 ${
            collapsed ? 'md:hidden' : ''
          }`}
        >
          <div className="grid h-9 w-9 place-items-center rounded-lg bg-brand-600 text-white">
            G
          </div>
          GST Portal
        </div>

        <button
          className="md:hidden"
          onClick={() => setOpen(false)}
        >
          <X />
        </button>

        <button
          className="hidden md:block"
          onClick={() => setCollapsed(!collapsed)}
        >
          {collapsed ? (
            <PanelLeftOpen  size={22} />
          ) : (
            <PanelLeftClose size={22} />
          )}
        </button>
      </div>

      <nav className="space-y-1 p-3">
        {items.map(([to, label, Icon]) => (
          <NavLink
            onClick={() => setOpen(false)}
            key={to}
            to={to}
            className={({ isActive }) =>
              `flex items-center gap-3 rounded-lg px-3 py-2.5 text-base font-semibold ${
                isActive
                  ? 'bg-brand-50 text-brand-700'
                  : 'text-slate-600 hover:bg-slate-50'
              } ${collapsed ? 'md:justify-center' : ''}`
            }
          >
            <Icon size={19} />

            <span className={collapsed ? 'md:hidden' : ''}>
              {label}
            </span>
          </NavLink>
        ))}

        <button
          onClick={logout}
          className={`flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-slate-600 hover:bg-slate-50 ${
            collapsed ? 'md:justify-center' : ''
          }`}
        >
          <LogOut size={19} />

          <span className={collapsed ? 'md:hidden' : ' text-base font-semibold'}>
            Logout
          </span>
        </button>
      </nav>
    </aside>
  );
}