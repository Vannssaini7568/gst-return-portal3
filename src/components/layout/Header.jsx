import { Menu, Bell, ChevronDown } from 'lucide-react';
import { useState } from 'react';
import { get, KEYS } from '../../utils/localStorage';

export default function Header({ onMenu }) {
  const [open, setOpen] = useState(false);
  const user = get(KEYS.user, { name: 'Admin User' });

  return (
    <header className="sticky top-0 z-30 flex h-16 items-center justify-between border-b border-gray-200 bg-white/95 px-4 backdrop-blur md:px-6">
      <button className="md:hidden" onClick={onMenu}>
        <Menu />
      </button>

      <div className="hidden md:block">
        <p className="text-sm text-gray-500">
          GST Return Management
        </p>
        <p className="font-semibold">Workspace</p>
      </div>

      <div className="relative flex items-center gap-3">
        <button className="relative rounded-lg p-2 hover:bg-slate-100">
          <Bell size={19} />
          <span className="absolute right-1 top-1 h-2 w-2 rounded-full bg-red-500" />
        </button>

        <button
          onClick={() => setOpen(!open)}
          className="flex items-center gap-2 rounded-lg p-1.5 hover:bg-slate-50"
        >
          <div className="grid h-8 w-8 place-items-center rounded-full bg-brand-100 text-sm font-bold text-brand-700">
            {user.name?.[0] || 'A'}
          </div>

          <span className="hidden text-sm font-semibold sm:block">
            {user.name || 'Admin User'}
          </span>

          <ChevronDown size={16} />
        </button>

        {open && (
          <div className="absolute right-0 top-12 w-48 rounded-xl border border-gray-200 bg-white p-2 shadow-xl">
            <div className="px-3 py-2 text-xs text-gray-500">
              Signed in as
            </div>

            <div className="px-3 pb-2 text-sm font-semibold">
              {user.email || 'admin@gstportal.com'}
            </div>
          </div>
        )}
      </div>
    </header>
  );
}