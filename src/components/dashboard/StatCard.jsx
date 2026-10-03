export default function StatCard({
  title,
  value,
  icon: Icon,
  change = '12.5%',
  tone = 'blue',
}) {
  const t = {
    blue: 'bg-blue-50 text-blue-600',
    green: 'bg-emerald-50 text-emerald-600',
    amber: 'bg-amber-50 text-amber-600',
    red: 'bg-red-50 text-red-600',
  }[tone];

  return (
    <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-base font-medium text-gray-500">
            {title}
          </p>
          <p className="mt-2 text-3xl font-bold">
            {value}
          </p>
          <p className="mt-1 text-sm text-gray-500">
            <span className="font-semibold text-emerald-600">
              ↑ {change}
            </span>{' '}
            vs last period
          </p>
        </div>
        <div className={`grid h-11 w-11 place-items-center rounded-xl ${t}`} >
          <Icon size={21} />
        </div>
      </div>
    </div>
  );
}