import { X } from 'lucide-react';

export default function Modal({
  open,
  title,
  onClose,
  children,
  footer,
}) {
  if (!open) return null; 

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 p-4">
      <div className="w-full max-w-lg rounded-2xl bg-white shadow-2xl">
        <div className="flex items-center justify-between border-b border-gray-400 p-5">
          <h3 className="font-bold text-slate-900">{title}</h3>

          <button onClick={onClose} aria-label="Close">
            <X size={20} />
          </button>
        </div>

        <div className="max-h-[70vh] overflow-y-auto p-5">
          {children}
        </div>

         {footer && (
          <div className="flex justify-end gap-2 border-t  border-gray-400 p-4">
            {footer}
          </div>
        )}
      </div>
    </div>
  );
}