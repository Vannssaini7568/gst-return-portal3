import { useMemo, useState } from 'react';
import { Download, Trash2 } from 'lucide-react';
import SearchBar from '../components/common/SearchBar';
import Button from '../components/common/Button';
import ReturnTable from '../components/returns/ReturnTable';
import Modal from '../components/common/Modal';
import Pagination from '../components/common/Pagination';
import { getReturns, deleteReturn } from '../services/returnService';
import { exportCSV } from '../utils/csvExport';

export default function Returns() {
  const [rows, setRows] = useState(getReturns());
  const [q, setQ] = useState('');
  const [type, setType] = useState('All');
  const [status, setStatus] = useState('All');
  const [confirm, setConfirm] = useState(null);
  const [page, setPage] = useState(1);

  const filtered = useMemo(
    () =>
      rows.filter(
        (r) =>
          [r.gstin, r.businessName, r.returnId, r.fileName]
            .join(' ')
            .toLowerCase()
            .includes(q.toLowerCase()) &&
          (type === 'All' || r.returnType === type) &&
          (status === 'All' || r.status === status)
      ),
    [rows, q, type, status]
  );

  const pages = Math.max(1, Math.ceil(filtered.length / 8));
  const shown = filtered.slice((page - 1) * 8, page * 8);

  const download = (r) => {
    const blob = new Blob([JSON.stringify(r, null, 2)], {
      type: 'application/json',
    });

    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = r.fileName.endsWith('.json')
      ? r.fileName
      : `${r.returnId}.json`;
    a.click();
    URL.revokeObjectURL(a.href);
  };

  return (
    <div className="space-y-5">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <h1 className="text-2xl font-bold">Returns</h1>
          <p className="text-sm text-gray-500">
            Search, filter and manage uploaded return records.
          </p>
        </div>

        <Button
          variant="secondary"
          onClick={() => exportCSV(filtered, 'gst-returns.csv')}
        >
          <Download size={17} />
          Export CSV
        </Button>
      </div>

      <div className="grid gap-3 md:grid-cols-[1fr_180px_180px]">
        <SearchBar
          value={q}
          onChange={(v) => {
            setQ(v);
            setPage(1);
          }}
          placeholder="Search GSTIN, business, return ID or file..."
        />

        <select
          value={type}
          onChange={(e) => setType(e.target.value)}
          className="rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm"
        >
          <option>All</option>
          {['GSTR-1', 'GSTR-3B', 'GSTR-2B', 'GSTR-4', 'GSTR-9'].map(
            (x) => (
              <option key={x}>{x}</option>
            )
          )}
        </select>

        <select
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          className="rounded-lg border border-gray-300  bg-white px-3 py-2 text-sm"
        >
          <option>All</option>
          {['Successful', 'Processing', 'Pending', 'Failed'].map(
            (x) => (
              <option key={x}>{x}</option>
            )
          )}
        </select>
      </div>

      <ReturnTable
        rows={shown}
        onDelete={setConfirm}
        onDownload={download}
      />

      <Pagination page={page} pages={pages} onChange={setPage} />

      <Modal
        open={!!confirm}
        title="Delete Return"
        onClose={() => setConfirm(null)}
        footer={
          <>
            <Button
              variant="secondary"
              onClick={() => setConfirm(null)}
            >
              Cancel
            </Button>

            <Button
              variant="danger"
              onClick={() => {
                deleteReturn(confirm.id);
                setRows(getReturns());
                setConfirm(null);
              }}
            >
              <Trash2 size={17} />
              Delete
            </Button>
          </>
        }
      >
        <p className="text-sm text-slate-600">
          Are you sure you want to delete{' '}
          <b>{confirm?.returnId}</b>? This removes the record from
          localStorage.
        </p>
      </Modal>
    </div>
  );
}
 
