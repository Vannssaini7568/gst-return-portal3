import Button from './Button';

export default function Pagination({
  page,
  pages,
  onChange,
}) {
  if (pages <= 1) return null;

  return (
    <div className="flex items-center justify-between border-t border-gray-200 px-4 py-3 text-sm">
      <span className="text-slate-500">
        Page {page} of {pages}
      </span>

      <div className="flex gap-2">
        <Button
          variant="secondary"
          disabled={page === 1}
          onClick={() => onChange(page - 1)}
        >
          Previous
        </Button>

        <Button
          variant="secondary"
          disabled={page === pages}
          onClick={() => onChange(page + 1)}
        >
          Next
        </Button>
      </div>
    </div>
  );
}