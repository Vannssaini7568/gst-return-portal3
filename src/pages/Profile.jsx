import { useState } from 'react';
import Button from '../components/common/Button';
import { get, set, KEYS } from '../utils/localStorage';

export default function Profile() {
  const [p, setP] = useState(get(KEYS.profile, {}));
  const [saved, setSaved] = useState(false);

  const save = () => {
    set(KEYS.profile, p);
    setSaved(true);
    setTimeout(() => setSaved(false), 1800);
  };

  return (
    <div className="mx-0 max-w-3xl space-y-5">
      <div>
        <h1 className="text-2xl font-bold">Profile</h1>
        <p className="text-sm text-slate-500">
          Manage your workspace profile information.
        </p>
      </div>

      <div className="rounded-xl border border-gray-200 bg-white p-6">
        <div className="mb-6 flex items-center gap-4">
          <div className="grid h-16 w-16 place-items-center rounded-full bg-brand-100 text-xl font-bold text-brand-700">
            {p.fullName?.[0] || 'A'}
          </div>

          <div>
            <h2 className="font-semibold">{p.fullName}</h2>
            <p className="text-sm text-slate-500">{p.designation}</p>
          </div>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          {[
            ['fullName', 'Full Name'],
            ['email', 'Email'],
            ['mobile', 'Mobile'],
            ['companyName', 'Company Name'],
            ['designation', 'Designation'],
          ].map(([k, l]) => (
            <div key={k}>
              <label className="mb-1 block text-sm font-semibold">
                {l}
              </label>
              <input
                value={p[k] || ''}
                onChange={(e) =>
                  setP({ ...p, [k]: e.target.value })
                }
                className="w-full rounded-lg border border-gray-300 p-2.5"
              />
            </div>
          ))}
        </div>

        <div className="mt-5 flex items-center gap-3">
          <Button onClick={save}>Save Changes</Button>

          {saved && (
            <span className="text-sm font-semibold text-emerald-600">
              Profile saved
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
 
