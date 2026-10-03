import {
  Users,
  UserCheck,
  Building2,
  FileText,
  CheckCircle2,
  XCircle,
} from 'lucide-react';
import StatCard from '../components/dashboard/StatCard';
import StatusBadge from '../components/common/StatusBadge';
import { get, KEYS } from '../utils/localStorage';
import { getGSTINs } from '../services/gstinService';
import { getReturns } from '../services/returnService';

export default function AdminPanel() {
  const users = get(KEYS.users, []);
  const gst = getGSTINs();
  const r = getReturns();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">
          Admin Panel
        </h1>

        <p className="text-sm text-slate-500">
          Frontend-only administration using mock data.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-6">
        <StatCard
          title="Total Users"
          value={users.length}
          icon={Users}
        />

        <StatCard
          title="Active Users"
          value={
            users.filter((x) => x.status === 'Active').length
          }
          icon={UserCheck}
          tone="green"
        />

        <StatCard
          title="Total GSTINs"
          value={gst.length}
          icon={Building2}
        />

        <StatCard
          title="Total Returns"
          value={r.length}
          icon={FileText}
        />

        <StatCard
          title="Successful"
          value={
            r.filter((x) => x.status === 'Successful').length
          }
          icon={CheckCircle2}
          tone="green"
        />

        <StatCard
          title="Failed"
          value={
            r.filter((x) => x.status === 'Failed').length
          }
          icon={XCircle}
          tone="red"
        />
      </div>

      <div className="overflow-x-auto rounded-xl border border-gray-200 bg-white">
        <table className="w-full min-w-[800px] text-left text-sm text-xs uppercase text-gray-900">
          <thead className="bg-gray-200 text-xs uppercase text-gray-900 border-gray-200">
            <tr>
              {[
                'Name',
                'Email',
                'Role',
                'Status',
                'Last Login',
                'Actions',
              ].map((x) => (
                <th
                  className="px-4 py-3"
                  key={x} 
                >
                  {x}
                </th>
              ))}
            </tr>
          </thead>

          <tbody className="divide-y">
            {users.map((u) => (
              <tr key={u.id} className="border-gray-200 hover:bg-gray-50">
                <td className="px-4 py-3 font-semibold">
                  {u.name}
                </td>

                <td className="px-4 py-3 border-gray-200">
                  {u.email}
                </td>

                <td className="px-4 py-3 border-gray-200">
                  {u.role}
                </td>

                <td className="px-4 py-3 border-gray-200">
                  <StatusBadge status={u.status} />
                </td>

                <td className="px-4 py-3 border-gray-200">
                  {u.lastLogin}
                </td>

                <td className="px-4 py-3 border-gray-200">
                  <button  className="text-brand-600">
                    Manage
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}