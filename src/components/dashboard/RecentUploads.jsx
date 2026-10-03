import { Eye } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import StatusBadge from '../common/StatusBadge';

export default function RecentUploads({ rows }) {
  const nav = useNavigate();

  return (
    <div className="rounded-xl border border-gray-200 bg-white">
      <div className="flex items-center justify-between border-b border-gray-200 p-5">
        <h3 className="font-semibold">Recent Uploads</h3>

        <button
          onClick={() => nav('/returns')}
          className="text-sm font-semibold text-brand-600"
        >
          View all
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full min-w-[750px] text-left text-sm">
          <thead className="bg-gray-200 text-xs border-gray-200 uppercase text-gray-900">
            <tr>
              {[
                'Return ID',
                'File',
                'GSTIN',
                'Type',
                'Tax Period',
                'Date',
                'Status',
                '',
              ].map((h) => (
                <th
                  className="px-4 py-3"
                  key={h}
                >
                  {h}
                </th>
              ))}
            </tr>
          </thead>

          <tbody className="divide-y">
            {rows.map((r) => (
              <tr key={r.id} className="border-gray-200 hover:bg-gray-50">
                <td className="px-4 py-3 border-gray-200 font-semibold">
                  {r.returnId}
                </td>

                <td className="px-4 py-3 border-gray-200">
                  {r.fileName}
                </td>

                <td className="px-4 py-3 border-gray-200">
                  {r.gstin}
                </td>

                <td className="px-4 py-3 border-gray-200">
                  {r.returnType}
                </td>

                <td className="px-4 py-3 border-gray-200">
                  {r.taxPeriod}
                </td>

                <td className="px-4 py-3 border-gray-200">
                  {r.uploadDate}
                </td>

                <td className="px-4 py-3 border-gray-200">
                  <StatusBadge status={r.status} />
                </td>

                <td className="px-4 py-3 border-gray-200  ">
                  <button
                    onClick={() => nav(`/returns/${r.id}`)}
                  >
                    <Eye size={17} />
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