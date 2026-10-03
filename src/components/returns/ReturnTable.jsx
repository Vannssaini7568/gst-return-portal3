import {
  Eye,
  Download,
  Trash2,
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import StatusBadge from '../common/StatusBadge';
import { formatDate } from '../../utils/formatters';

export default function ReturnTable({
  rows,
  onDelete,
  onDownload,
}) {
  const nav = useNavigate();

  return (
    <div className="overflow-x-auto rounded-xl border border-gray-300 bg-white">
      <table className="w-full  border-gray-200 min-w-[1200px] text-left text-sm text-gray-900 ">
        <thead className="bg-gray-200 text-xs uppercase text-gray-900 border-gray-200">
          <tr>
            {[
              'Return ID',
              'GSTIN',
              'Business',
              'Type',
              'FY',
              'Period',
              'File',
              'Upload Date',
              'Status',
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
          {rows.map((r) => (
            <tr
              key={r.id}
              className=" border-gray-200 hover:bg-gray-50"
            >
              <td className="px-4 py-3 border-gray-200 font-semibold">
                {r.returnId}
              </td>

              <td className="px-4 py-3 border-gray-200">
                {r.gstin}
              </td>

              <td className="px-4 py-3 border-gray-200">
                {r.businessName}
              </td>

              <td className="px-4 py-3 border-gray-200">
                {r.returnType}
              </td>

              <td className="px-4 py-3 border-gray-200">
                {r.financialYear}
              </td>

              <td className="px-4 py-3 border-gray-200">
                {r.taxPeriod}
              </td>

              <td className="px-4 py-3 border-gray-200">
                {r.fileName}
              </td>

              <td className="px-4 py-3 border-gray-200">
                {formatDate(r.uploadDate)}
              </td>

              <td className="px-4 py-3 border-gray-200">
                <StatusBadge status={r.status} />
              </td>

              <td className="px-4 py-3 border-gray-200">
                <div className="flex gap-2">
                  <button
                    onClick={() => nav(`/returns/${r.id}`)}
                    title="View"
                  >
                    <Eye size={17} />
                  </button>

                  <button
                    onClick={() => onDownload(r)}
                    title="Download"
                  >
                    <Download size={17} />
                  </button>

                  <button
                    onClick={() => onDelete(r)}
                    title="Delete"
                    className="text-red-600"
                  >
                    <Trash2 size={17} />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}