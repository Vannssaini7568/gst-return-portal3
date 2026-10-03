import { useMemo, useState } from 'react';
import SearchBar from '../components/common/SearchBar';
import StatusBadge from '../components/common/StatusBadge';
import Pagination from '../components/common/Pagination';
import { getUploadHistory } from '../services/returnService';

export default function UploadHistory() {
  const rows = getUploadHistory();
  const [q, setQ] = useState('');
  const [status, setStatus] = useState('All');
  const [type, setType] = useState('All');
  const [page, setPage] = useState(1);

  const f = useMemo(
    () =>
      rows.filter(
        (r) =>
          r.fileName.toLowerCase().includes(q.toLowerCase()) &&
          (status === 'All' || r.status === status) &&
          (type === 'All' || r.returnType === type)
      ),
    [rows, q, status, type]
  );

  const p = Math.max(1, Math.ceil(f.length / 8));

  return (
    <div className="space-y-5">
      <div>
        <h1 className="text-2xl font-bold">Upload History</h1>
        <p className="text-sm text-slate-500">
          A chronological view of simulated uploads.
        </p>
      </div>

      <div className="grid gap-3 md:grid-cols-[1fr_180px_180px]">
        <SearchBar
          value={q}
          onChange={(v) => {
            setQ(v);
            setPage(1);
          }}
          placeholder="Search file name..."
        />

        <select
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          className="rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm"
        >
          <option>All</option>
          {['Successful', 'Processing', 'Pending', 'Failed'].map((x) => (
            <option key={x}>{x}</option>
          ))}
        </select>

        <select
          value={type}
          onChange={(e) => setType(e.target.value)}
          className="rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm"
        >
          <option>All</option>
          {['GSTR-1', 'GSTR-3B', 'GSTR-2B', 'GSTR-4', 'GSTR-9'].map((x) => (
            <option key={x}>{x}</option>
          ))}
        </select>
      </div>

      <div className="overflow-x-auto rounded-xl border border-gray-300 bg-white">
        <table className="w-full min-w-[950px]  text-left text-sm">
          <thead className="bg-gray-200 text-xs border-gray-200 uppercase text-gray-900">
            <tr>
              {[
                'File Name',
                'GSTIN',
                'Return Type',
                'Uploaded By',
                'Date',
                'Time',
                'Status',
              ].map((x) => (
                <th className="px-4 py-3" key={x}>
                  {x}
                </th>
              ))}
            </tr>
          </thead>

          <tbody className="divide-y">
            {f.slice((page - 1) * 8, page * 8).map((r) => (
              <tr key={r.id} className="border-gray-200 hover:bg-gray-50">
                <td className="px-4 py-3 border-gray-200 font-medium">{r.fileName}</td>
                <td className="px-4 py-3 border-gray-200">{r.gstin}</td>
                <td className="px-4 py-3 border-gray-200">{r.returnType}</td>
                <td className="px-4 py-3 border-gray-200">{r.uploadedBy}</td>
                <td className="px-4 py-3 border-gray-200">{r.uploadDate}</td>
                <td className="px-4 py-3 border-gray-200">{r.uploadTime}</td>
                <td className="px-4 py-3 border-gray-200">
                  <StatusBadge status={r.status} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <Pagination page={page} pages={p} onChange={setPage} />
    </div>
  );
}