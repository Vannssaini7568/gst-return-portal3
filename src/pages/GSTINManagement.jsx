import { useState } from 'react';
import { Plus, Edit, Trash2, Download } from 'lucide-react';
import Button from '../components/common/Button';
import Modal from '../components/common/Modal';
import StatusBadge from '../components/common/StatusBadge';
import {
  getGSTINs,
  addGSTIN,
  updateGSTIN,
  deleteGSTIN,
} from '../services/gstinService';
import { validateGSTIN } from '../utils/validation';
import { exportCSV } from '../utils/csvExport';

const empty = {
  gstin: '',
  businessName: '',
  tradeName: '',
  state: 'Rajasthan',
  status: 'Active',
};

export default function GSTINManagement() {
  const [rows, setRows] = useState(getGSTINs());
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState(empty);
  const [error, setError] = useState('');

  const save = () => {
    if (!validateGSTIN(form.gstin)) {
      return setError('Enter a valid 15-character GSTIN.');
    }

    if (!form.businessName || !form.tradeName || !form.state) {
      return setError('Please complete all fields.');
    }

    const r = {
      ...form,
      id: form.id || `g-${Date.now()}`,
      addedDate:
        form.addedDate || new Date().toISOString().slice(0, 10),
    };

    form.id ? updateGSTIN(r) : addGSTIN(r);
    setRows(getGSTINs());
    setOpen(false);
    setForm(empty);
    setError('');
  };

  return (
    <div className="space-y-5">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <h1 className="text-2xl font-bold">GSTIN Management</h1>
          <p className="text-sm text-gray-600">
            Manage mock business registrations used by this portal.
          </p>
        </div>

        <div className="flex gap-2">
          <Button
            variant="secondary"
            onClick={() => exportCSV(rows, 'gstins.csv')}
          >
            <Download size={17} />
            Export CSV
          </Button>

          <Button
            onClick={() => {
              setForm(empty);
              setOpen(true);
            }}
          >
            <Plus size={17} />
            Add GSTIN
          </Button>
        </div>
      </div>

      <div className="overflow-x-auto rounded-xl border border-gray-200 bg-white">
        <table className="w-full min-w-[900px] text-left text-sm">
          <thead className="bg-gray-200 text-xs uppercase text-gray-500">
            <tr>
              {[
                'GSTIN',
                'Business Name',
                'Trade Name',
                'State',
                'Status',
                'Added Date',
                'Actions',
              ].map((x) => (
                <th className="px-4 py-3" key={x}>
                  {x}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y">
            {rows.map((r) => (
              <tr key={r.id} className="border-gray-200 hover:bg-gray-50">
                <td className="px-4 py-3 border-gray-200 font-semibold">{r.gstin}</td>
                <td className="px-4 py-3 border-gray-200">{r.businessName}</td>
                <td className="px-4 py-3 border-gray-200">{r.tradeName}</td>
                <td className="px-4 py-3 border-gray-200">{r.state}</td>
                <td className="px-4 py-3 border-gray-200">
                  <StatusBadge status={r.status} />
                </td>
                <td className="px-4 py-3 border-gray-200">{r.addedDate}</td>
                <td className="px-4 py-3 border-gray-200">
                  <div className="flex gap-2">
                    <button
                      onClick={() => {
                        setForm(r);
                        setOpen(true);
                      }}
                    >
                      <Edit size={17} />
                    </button>

                    <button
                      className="text-red-600"
                      onClick={() => {
                        deleteGSTIN(r.id);
                        setRows(getGSTINs());
                      }}
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

      <Modal open={open} title={ form.id ? "Edit GSTIN" : "Add GSTIN"} 
        onClose={() => setOpen(false)}  
        footer={
          <>
            <Button variant="secondary" onClick={() => setOpen(false)}>
              Cancel
            </Button>
            <Button onClick={save}>Save GSTIN</Button>
          </>
        }
        >
        <div className="space-y-3">
          <div>
            <label className="mb-1 block text-sm font-semibold">
              GSTIN
            </label>
            <input
              type="text"
              value={form.gstin}
              onChange={(e) =>
                setForm({ ...form, gstin: e.target.value })
              }
              className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm"
            />
          </div>

          <div>
            <label className="mb-1 block text-sm font-semibold">
              Business Name
            </label>
            <input
              type="text"
              value={form.businessName}
              onChange={(e) =>
                setForm({ ...form, businessName: e.target.value })
              }
              className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm"
            />
          </div>

          <div>
            <label className="mb-1 block text-sm font-semibold">
              Trade Name
            </label>
            <input
              type="text"
              value={form.tradeName}
              onChange={(e) =>
                setForm({ ...form, tradeName: e.target.value })
              }
              className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm"
            />
          </div>
          {
            (['gstin', 'GSTIN'],
             ['tradeName', 'Trade Name'],
             ['businessName', 'Business Name'],  
             ['status', 'Status']).map (([key, label]) => {
              <div key={key}>
                 <label className="mb-1 block text-sm font-semibold">{label}</label>
                 <input
                   type="text"
                   value={form[key]}
                   onChange={(e) =>
                     setForm({ ...form, [key]: e.target.value })
                   }
                  className="w-full rounded-lg border border-gray-300 p-2.5"
                 />
              </div>
            } )          
          }

          <div>
            <label className="mb-1 block text-sm font-semibold">
              State
            </label>
            <select
              value={form.state}
              onChange={(e) =>
                setForm({ ...form, state: e.target.value })
              }
              className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm"
            >
              {[
                'Rajasthan',
                'Maharashtra',
                'Karnataka',
                'Tamil Nadu',
                'Delhi',
              ].map((x) => (
                <option key={x}>{x}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="mb-1 block text-sm font-semibold">
              Status
            </label>
            <select
              value={form.status}
              onChange={(e) =>
                setForm({ ...form, status: e.target.value })
              }
              className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm"
            >
              {['Active', 'Inactive'].map((x) => (
                <option key={x}>{x}</option>
              ))}
            </select>
          </div>

          {error && (
            <p className="text-sm text-red-600">
              {error}
            </p>
          )}
        </div>
      </Modal>
    </div>
  );
}
 
