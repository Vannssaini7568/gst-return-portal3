export default function ValidationResult({ items }) {
  return (
    <div className="rounded-xl border border-gray-200 bg-white p-5">
      <h3 className="font-semibold">
        Validation Summary
      </h3>

      <div className="mt-3 grid gap-2 sm:grid-cols-2">
        {items.map((x) => (
          <div
            key={x.label}
            className={`flex items-center gap-2 rounded-lg p-2 text-sm ${
              x.ok
                ? 'bg-emerald-50 text-emerald-700'
                : 'bg-red-50 text-red-700'
            }`}
          >
            <span>{x.ok ? '✓' : '✕'}</span>

            {x.label}
          </div>
        ))}
      </div>
    </div>
  );
}