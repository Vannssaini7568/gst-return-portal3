import { useState } from 'react';
import { Plus, Upload, AlertCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import Button from '../components/common/Button';
import Modal from '../components/common/Modal';
import FileUploader from '../components/returns/FileUploader';
import ReturnForm from '../components/returns/ReturnForm';
import ValidationResult from '../components/returns/ValidationResult';
import { getGSTINs } from '../services/gstinService';
import { addHistory, addReturn } from '../services/returnService';
import {
  validateFile,
  validateGSTIN,
  validateReturnForm,
} from '../utils/validation';
import { get, KEYS } from '../utils/localStorage';

export default function UploadReturn() {
  const nav = useNavigate();
  const gstins = getGSTINs();

  const [form, setForm] = useState({
    gstin: '',
    returnType: '',
    financialYear: '',
    taxPeriod: '',
  });

  const [file, setFile] = useState(null);
  const [errors, setErrors] = useState({});
  const [progress, setProgress] = useState(0);
  const [stage, setStage] = useState('');
  const [toast, setToast] = useState('');
  const [addOpen, setAddOpen] = useState(false);

  const selected = gstins.find((g) => g.gstin === form.gstin);

  const items = [
    {
      label: 'File selected',
      ok: !!file,
    },
    {
      label: 'File format valid',
      ok: !!file && !validateFile(file).error,
    },
    {
      label: 'File size valid',
      ok: !!file && !validateFile(file).error,
    },
    {
      label: 'GSTIN format valid',
      ok: validateGSTIN(form.gstin),
    },
    {
      label: 'Return type selected',
      ok: !!form.returnType,
    },
    {
      label: 'Financial year selected',
      ok: !!form.financialYear,
    },
    {
      label: 'Tax period selected',
      ok: !!form.taxPeriod,
    },
  ];

  const submit = () => {
    const e = validateReturnForm(form, file);
    setErrors(e);

    if (Object.keys(e).length) return;

    let p = 0;

    const timer = setInterval(() => {
      p += 20;
      setProgress(p);
      setStage(
          p < 20 ? 'Selecting File' : p < 40 ? 'Validating File'  : p < 80 ? 'Uploading'  : 'Processing'
        );

      if (p >= 100) {
        clearInterval(timer);

        const now = new Date();

        const r = {
          id: `r-${Date.now()}`,
          returnId: `RET-2026-${String(Date.now()).slice(-6)}`,
          gstin: form.gstin,
          businessName: selected?.businessName || '',
          returnType: form.returnType,
          financialYear: form.financialYear,
          taxPeriod: form.taxPeriod,
          fileName: file.name,
          fileSize: `${(file.size / 1024 / 1024).toFixed(2)} MB`,
          uploadDate: now.toISOString().slice(0, 10),
          uploadTime: now.toLocaleTimeString('en-IN', {
            hour: '2-digit',
            minute: '2-digit',
          }),
          status: 'Successful',
          uploadedBy: get(KEYS.user, { name: 'Admin User' }).name,
        };

        addReturn(r);
        addHistory(r);
        setToast('Return uploaded successfully');

        setTimeout(() => nav(`/returns/${r.id}`), 700);
      }
    }, 350);
  };

  return (
    <div className="space-y-6">
      <div>
        <p className="text-sm font-medium text-brand-600">Returns</p>
        <h1 className="text-2xl font-bold">Upload Return</h1>
        <p className="mt-1 text-sm text-slate-500">
          Frontend-only upload simulation. No data is sent to GSTN.
        </p>
      </div>

      <div className="grid gap-5 xl:grid-cols-[1.5fr_.8fr]">
        <div className="space-y-5">
          <section className="rounded-xl border border-gray-200 bg-white p-5">
            <div className="mb-4 flex items-center justify-between">
              <div>
                <h2 className="font-semibold">GSTIN</h2>
                <p className="text-sm text-slate-500">
                  Choose the business registration for this return.
                </p>
              </div>

              <Button
                variant="secondary"
                onClick={() => setAddOpen(true)}
              >
                <Plus size={17} />
                Add New GSTIN
              </Button>
            </div>

            <ReturnForm
              form={form}
              setForm={setForm}
              gstins={gstins}
            />

            {selected && (
              <div className="mt-4 rounded-lg bg-brand-50 p-3 text-sm">
                <b>{selected.businessName}</b> • {selected.state} •{' '}
                {selected.status}
              </div>
            )}

            {errors.gstin && (
              <p className="mt-2 text-sm text-red-600">
                {errors.gstin}
              </p>
            )}
          </section>

          <section className="rounded-xl border border-gray-200 bg-white p-5">
            <h2 className="font-semibold">File Upload</h2>
            <p className="mb-4 text-sm text-gray-500">
              Upload a return file for frontend validation.
            </p>
            <FileUploader file={file} setFile={setFile} />
            {errors.file && (
              <p className="mt-2 text-sm text-red-600">
                {errors.file}
              </p>
            )}
          </section>

          <section className="rounded-xl border border-gray-200 bg-white p-5">
            <div className="flex items-center gap-2 text-amber-700">
              <AlertCircle size={18} />
              <p className="text-sm font-semibold">GST disclaimer</p>
            </div>

            <p className="mt-2 text-sm text-gray-600">
              GSTIN validation checks only the expected 15-character
              format. This portal does not verify GSTIN with GSTN or
              submit actual GST returns.
            </p>
          </section>

          <Button
            className="w-full sm:w-auto"
            onClick={submit}
            disabled={progress > 0 && progress < 100}
          >
            <Upload size={17} />
            {progress ? `${stage} ${progress}%` : 'Upload Return'}
          </Button>

          {progress > 0 && (
            <div className="h-2 overflow-hidden rounded-full bg-gray-200">
              <div
                className="h-full bg-brand-600 transition-all"
                style={{ width: `${progress}%` }}
              />
            </div>
          )}
        </div>

        <ValidationResult items={items} />
      </div>

      <Modal
        open={addOpen}
        title="Add GSTIN"
        onClose={() => setAddOpen(false)}
        footer={
          <Button
            onClick={() => {
              setAddOpen(false);
              setToast(
                'GSTIN management is available from the GSTIN page'
              );
            }}
          >Done</Button>
        }
      >
        <p className="text-base text-gray-700">
          Use <b>GSTIN Management</b> to add or edit GSTIN records,
          then return here to select them.
        </p>
      </Modal>

      {toast && (
        <div className="fixed bottom-5 right-5 rounded-xl bg-emerald-600 px-4 py-3 text-sm font-semibold text-white shadow-lg">
          {toast}
        </div>
      )}
    </div>
  );
}