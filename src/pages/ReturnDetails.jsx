import { useNavigate, useParams } from 'react-router-dom';
import {
  ArrowLeft,
  Download,
  Trash2,
  CheckCircle2,
} from 'lucide-react';
import Button from '../components/common/Button';
import StatusBadge from '../components/common/StatusBadge';
import { getReturns, deleteReturn } from '../services/returnService';

export default function ReturnDetails() {
  const { id } = useParams();
  const nav = useNavigate();
  const r = getReturns().find((x) => x.id === id);

  if (!r)
    return (
      <div className="rounded-xl border bg-white p-10 text-center">
        <h2 className="font-bold">Return not found</h2>
        <Button className="mt-4" onClick={() => nav('/returns')}>
          Back to Returns
        </Button>
      </div>
    );

  const download = () => {
    const b = new Blob([JSON.stringify(r, null, 2)], {
      type: 'application/json',
    });
    const a = document.createElement('a');
    a.href = URL.createObjectURL(b);
    a.download = r.fileName;
    a.click();
  };

  return (
    <div className="space-y-5">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <button
            onClick={() => nav('/returns')}
            className="mb-2 flex items-center gap-1 text-sm text-slate-500"
          >
            <ArrowLeft size={16} />
            Back to Returns
          </button>

          <h1 className="text-2xl font-bold">{r.returnId}</h1>
          <p className="text-sm text-slate-500">
            Detailed return record
          </p>
        </div>

        <div className="flex gap-2">
          <Button variant="secondary" onClick={download}>
            <Download size={17} />
            Download
          </Button>

          <Button
            variant="danger"
            onClick={() => {
              deleteReturn(r.id);
              nav('/returns');
            }}
          >
            <Trash2 size={17} />
            Delete
          </Button>
        </div>
      </div>

      <div className="grid gap-5 lg:grid-cols-3">
        <div className="rounded-xl border border-gray-200 bg-white p-5 lg:col-span-2">
          <div className="flex items-center justify-between">
            <h2 className="font-semibold">Return Information</h2>
            <StatusBadge status={r.status} />
          </div>

          <div className="mt-5 grid gap-5 sm:grid-cols-2">
            {[
              ['GSTIN', r.gstin],
              ['Business Name', r.businessName],
              ['Return Type', r.returnType],
              ['Financial Year', r.financialYear],
              ['Tax Period', r.taxPeriod],
              ['File Name', r.fileName],
              ['File Size', r.fileSize],
              ['Upload Date', r.uploadDate],
              ['Upload Time', r.uploadTime],
            ].map(([k, v]) => (
              <div key={k}>
                <p className="text-xs font-semibold uppercase text-gray-600">
                  {k}
                </p>
                <p className="mt-1 font-medium">{v}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-xl border border-gray-200 bg-white p-5">
          <h2 className="font-semibold">Validation Summary</h2>

          <div className="mt-4 space-y-3">
            {[
              'File validation',
              'GSTIN validation',
              'Required fields',
              'File format',
              'File size',
            ].map((x) => (
              <div
                key={x}
                className="flex items-center gap-2 text-sm text-emerald-700"
              >
                <CheckCircle2 size={17} />
                {x} completed
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="rounded-xl border border-gray-200 bg-white p-5">
        <h2 className="font-semibold">Activity Timeline</h2>

        <div className="mt-5 space-y-5">
          {[
            'Return Created',
            'File Uploaded',
            'Validation Completed',
            'Processing Completed',
          ].map((x, i) => (
            <div className="flex gap-3" key={x}>
              <div className="mt-1 h-3 w-3 rounded-full bg-brand-600 ring-4 ring-brand-50" />

              <div>
                <p className="font-semibold">{x}</p>
                <p className="text-sm text-gray-500">
                  {r.uploadDate} • {r.uploadTime}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
 
