export const returnTypes = [
  'GSTR-1',
  'GSTR-3B',
  'GSTR-2B',
  'GSTR-4',
  'GSTR-9',
];

export const years = [
  '2023-24',
  '2024-25',
  '2025-26',
  '2026-27',
];

export const periods = [
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
  'January',
  'February',
  'March',
];

export default function ReturnForm({
  form,
  setForm,
  gstins,
}) {
  const update = (k, v) =>
    setForm((f) => ({
      ...f,
      [k]: v,
    }));

  return (
    <div className="grid gap-5 md:grid-cols-2">
      <div>
        <label className="mb-1 block text-sm font-semibold">
          GSTIN
        </label>

        <select
          value={form.gstin}
          onChange={(e) => update('gstin', e.target.value)}
          className="w-full rounded-lg border border-gray-300 p-2.5"
        >
          <option value="">Select GSTIN</option>

          {gstins.map((g) => (
            <option key={g.id} value={g.gstin}>
              {g.gstin} — {g.businessName}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label className="mb-1 block text-sm font-semibold">
          Return Type
        </label>

        <select
          value={form.returnType}
          onChange={(e) =>
            update('returnType', e.target.value)
          }
          className="w-full rounded-lg border border-gray-300 p-2.5"
        >
          <option value="">Select return type</option>

          {returnTypes.map((x) => (
            <option key={x}>{x}</option>
          ))}
        </select>
      </div>

      <div>
        <label className="mb-1 block text-sm font-semibold">
          Financial Year
        </label>

        <select
          value={form.financialYear}
          onChange={(e) =>
            update('financialYear', e.target.value)
          }
          className="w-full rounded-lg border border-gray-300 p-2.5"
        >
          <option value="">Select financial year</option>

          {years.map((x) => (
            <option key={x}>{x}</option>
          ))}
        </select>
      </div>

      <div>
        <label className="mb-1 block text-sm font-semibold">
          Tax Period
        </label>

        <select
          value={form.taxPeriod}
          onChange={(e) =>
            update('taxPeriod', e.target.value)
          }
          className="w-full rounded-lg border border-gray-300 p-2.5"
        >
          <option value="">Select tax period</option>

          {periods.map((x) => (
            <option key={x}>{x}</option>
          ))}
        </select>
      </div>
    </div>
  );
}