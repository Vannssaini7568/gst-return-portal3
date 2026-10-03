export default function EmptyState({
  title = 'No records found',
  description = 'There is nothing to display yet.',
}) {
  return (
    <div className="rounded-xl border border-dashed border-slate-300 bg-white p-10 text-center">
      <div className="mx-auto mb-3 grid h-10 w-10 place-items-center rounded-full bg-slate-100 text-slate-500">
        —
      </div>

      <h3 className="font-semibold">{title}</h3>

      <p className="mt-1 text-sm text-slate-500">
        {description}
      </p>
    </div>
  );
}