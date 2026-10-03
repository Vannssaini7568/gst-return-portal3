import { useState } from 'react';
import Button from '../components/common/Button';
import { get, set, KEYS } from '../utils/localStorage';

export default function Settings() {
  const initial = get(KEYS.settings, {
    notifications: {
      upload: true,
      validation: true,
      failed: true,
    },
    dark: false,
  });

  const [s, setS] = useState(initial);
  const [saved, setSaved] = useState(false);

  const save = () => {
    set(KEYS.settings, s);
    setSaved(true);
    document.documentElement.classList.toggle('dark', s.dark);
    setTimeout(() => setSaved(false), 1500);
  };

  return (
    <div className="mx-0 max-w-3xl space-y-5">
      <div>
        <h1 className="text-2xl font-bold">Settings</h1>
        <p className="text-sm text-slate-500">
          Configure account notifications and appearance.
        </p>
      </div>

      <section className="rounded-xl border border-gray-200 bg-white p-6">
        <h2 className="font-semibold">Account</h2>

        <div className="mt-4 grid gap-4 sm:grid-cols-2">
          <div>
            <label className="mb-1 block text-sm font-semibold">
              Email
            </label>
            <input
              value="admin@gstportal.com"
              readOnly
              className="w-full rounded-lg border border-gray-300 bg-slate-50 p-2.5"
            />
          </div>

          <div>
            <label className="mb-1 block text-sm font-semibold">
              Mobile
            </label>
            <input
              value="+91 98765 43210"
              readOnly
              className="w-full rounded-lg border border-gray-300 bg-slate-50 p-2.5"
            />
          </div>

          <div>
            <label className="mb-1 block text-sm font-semibold">
              Password
            </label>
            <input
              value="••••••••"
              readOnly
              className="w-full rounded-lg border border-gray-300 bg-slate-50 p-2.5"
            />
          </div>
        </div>
      </section>

      <section className="rounded-xl border border-gray-200 bg-white p-6">
        <h2 className="font-semibold">Notifications</h2>

        <div className="mt-4 space-y-3">
          {[
            ['upload', 'Upload notifications'],
            ['validation', 'Validation notifications'],
            ['failed', 'Failed return notifications'],
          ].map(([k, l]) => (
            <label
              className="flex items-center justify-between rounded-lg bg-slate-50 p-3"
              key={k}
            >
              <span className="text-sm font-medium">{l}</span>

              <input
                type="checkbox"
                checked={s.notifications[k]}
                onChange={(e) =>
                  setS({
                    ...s,
                    notifications: {
                      ...s.notifications,
                      [k]: e.target.checked,
                    },
                  })
                }
              />
            </label>
          ))}
        </div>
      </section>

      <section className="rounded-xl border border-gray-200 bg-white p-6">
        <h2 className="font-semibold">Appearance</h2>

        <label className="mt-4 flex items-center justify-between rounded-lg bg-slate-50 p-3">
          <span className="text-sm font-medium">Dark mode</span>

          <input
            type="checkbox"
            checked={s.dark}
            onChange={(e) =>
              setS({
                ...s,
                dark: e.target.checked,
              })
            }
          />
        </label>
      </section>

      <div className="flex items-center gap-3">
        <Button onClick={save}>Save Settings</Button>

        {saved && (
          <span className="text-sm font-semibold text-emerald-600">
            Settings saved
          </span>
        )}
      </div>
    </div>
  );
}