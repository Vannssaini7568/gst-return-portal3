export default function StatusBadge({ status }) {
  const m = {
    Successful: 'bg-emerald-50 text-emerald-700',
    Pending: 'bg-amber-50 text-amber-700',
    Processing: 'bg-blue-50 text-blue-700',
    Failed: 'bg-red-50 text-red-700',
    Active: 'bg-emerald-50 text-emerald-700',
    Inactive: 'bg-gray-100 text-gray-600',
  };

  return (
    <span
      className={`rounded-full px-2.5 py-1 text-xs font-semibold ${
        m[status] || 'bg-gray-100 text-gray-600'
      }`}
    >
      {status}
    </span>
  );
}