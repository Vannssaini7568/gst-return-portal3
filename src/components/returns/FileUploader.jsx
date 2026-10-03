import { useRef, useState } from 'react';
import {
  UploadCloud,
  File,
  Trash2,
} from 'lucide-react';
import { formatBytes } from '../../utils/formatters';

export default function FileUploader({ file, setFile }) {
  const ref = useRef();
  const [drag, setDrag] = useState(false);

  const pick = (f) => {
    if (f) setFile(f);
  };

  return (
    <div
      onDragOver={(e) => {
        e.preventDefault();
        setDrag(true);
      }}
      onDragLeave={() => setDrag(false)}
      onDrop={(e) => {
        e.preventDefault();
        setDrag(false);
        pick(e.dataTransfer.files[0]);
      }}
      className={`rounded-xl border-2 border-dashed p-8 text-center ${
        drag
          ? 'border-brand-500 bg-brand-50'
          : 'border-slate-300 bg-slate-50'
      }`}
    >
      {!file ? (
        <>
          <UploadCloud
            className="mx-auto text-brand-600"
            size={42}
          />

          <p className="mt-3 font-semibold">
            Drag & Drop your GST Return file here
          </p>

          <p className="my-1 text-sm text-slate-500">
            or
          </p>

          <button
            type="button"
            onClick={() => ref.current.click()}
            className="font-semibold text-brand-600"
          >
            Browse File
          </button>

          <input
            ref={ref}
            type="file"
            hidden
            accept=".json,.csv,.xlsx,.xls"
            onChange={(e) => pick(e.target.files[0])}
          />

          <p className="mt-3 text-xs text-slate-500">
            JSON, CSV, XLSX, XLS • Max 10 MB
          </p>
        </>
      ) : (
        <div className="mx-auto flex max-w-xl items-center gap-3 rounded-lg border bg-white p-4 text-left">
          <File className="text-brand-600" />

          <div className="min-w-0 flex-1">
            <p className="truncate font-semibold">
              {file.name}
            </p>

            <p className="text-xs text-slate-500">
              {formatBytes(file.size)} • {file.type || 'File'}
            </p>
          </div>

          <button
            type="button"
            onClick={() => setFile(null)}
            className="rounded-lg p-2 text-red-600 hover:bg-red-50"
          >
            <Trash2 size={18} />
          </button>
        </div>
      )}
    </div>
  );
}