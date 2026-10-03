export default function Toast({ toast }) {
  if (!toast) return null;

  return (
    <div
      className={`fixed right-4 top-4 z-[60] rounded-xl px-4 py-3 text-sm font-semibold text-white shadow-xl ${
        toast.type === 'error' ? 'bg-red-600' : 'bg-emerald-600'
      }`}
    >
      {toast.message}
    </div>
  );
}