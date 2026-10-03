export default function Button({
  children,
  variant = 'primary',
  className = '',
  ...p
}) {
  const s = {
    primary: 'bg-brand-600 text-white hover:bg-brand-700',
    secondary:
      'bg-white text-slate-700 border border-slate-200 hover:bg-slate-50',
    danger: 'bg-red-600 text-white hover:bg-red-700',
    ghost: 'text-slate-600 hover:bg-slate-100',
  };

  return (
    <button
      className={`inline-flex items-center justify-center gap-2 rounded-lg px-4 py-2 text-sm font-semibold transition ${s[variant]} ${className}`}
      {...p}
    >
      {children}
    </button>
  );
}