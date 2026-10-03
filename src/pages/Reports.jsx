import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
} from 'recharts';
import { getReturns } from '../services/returnService';
import { getGSTINs } from '../services/gstinService';
import StatCard from '../components/dashboard/StatCard';
import {
  FileText,
  CheckCircle2,
  Clock3,
  XCircle,
  Download,
} from 'lucide-react';
import Button from '../components/common/Button';
import { exportCSV } from '../utils/csvExport';

export default function Reports() {
  const r = getReturns();

  const months = [
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec',
    'Jan',
    'Feb',
    'Mar',
  ];

  const monthly = months.map((m, i) => ({
    month: m,
    total:
      r.filter(
        (x) =>
          x.taxPeriod ===
          [
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
          ][i]
      ).length + 1,
    successful: Math.max(
      0,
      r.filter(
        (x) =>
          x.taxPeriod ===
            [
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
            ][i] && x.status === 'Successful'
      ).length
    ),
  }));

  const type = ['GSTR-1', 'GSTR-3B', 'GSTR-2B', 'GSTR-4', 'GSTR-9'].map(
    (x) => ({
      name: x,
      value: r.filter((a) => a.returnType === x).length,
    })
  );

  const status = ['Successful', 'Pending', 'Failed'].map((x) => ({
    name: x,
    value: r.filter((a) => a.status === x).length,
  }));

  const gst = getGSTINs().map((g) => ({
    name: g.businessName,
    value: r.filter((a) => a.gstin === g.gstin).length,
  }));

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <h1 className="text-2xl font-bold">Reports</h1>
          <p className="text-sm text-gray-500">
            Operational reporting based on local mock records.
          </p>
        </div>

        <Button
          variant="secondary"
          onClick={() => exportCSV(monthly, 'gst-monthly-report.csv')}
        >
          <Download size={17} />
          Export Report
        </Button>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard
          title="Total Returns"
          value={r.length}
          icon={FileText}
        />

        <StatCard
          title="Successful"
          value={r.filter((x) => x.status === 'Successful').length}
          icon={CheckCircle2}
          tone="green"
        />

        <StatCard
          title="Failed"
          value={r.filter((x) => x.status === 'Failed').length}
          icon={XCircle}
          tone="red"
        />

        <StatCard
          title="Pending"
          value={
            r.filter(
              (x) =>
                x.status === 'Pending' || x.status === 'Processing'
            ).length
          }
          icon={Clock3}
          tone="amber"
        />
      </div>

      <div className="grid gap-5 xl:grid-cols-2">
        <div className="rounded-xl border border-gray-200 bg-white p-5">
          <h3 className="font-semibold">Monthly Returns</h3>

          <div className="mt-4 h-64">
            <ResponsiveContainer>
              <LineChart data={monthly}>
                <CartesianGrid
                  strokeDasharray="3 3"
                  vertical={false}
                />
                <XAxis dataKey="month" />
                <YAxis allowDecimals={false} />
                <Tooltip />
                <Line
                  dataKey="total"
                  stroke="#2563eb"
                  strokeWidth={3}
                />
                <Line
                  dataKey="successful"
                  stroke="#10b981"
                  strokeWidth={3}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="rounded-xl border border-gray-200 bg-white p-5">
          <h3 className="font-semibold">Return Type Distribution</h3>

          <div className="mt-4 h-64">
            <ResponsiveContainer>
              <BarChart data={type}>
                <XAxis dataKey="name" />
                <YAxis allowDecimals={false} />
                <Tooltip />
                <Bar
                  dataKey="value"
                  fill="#4f46e5"
                  radius={[5, 5, 0, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="rounded-xl border border-gray-200 bg-white p-5">
          <h3 className="font-semibold">Status Distribution</h3>
          <div className="mt-4 h-64">
            <ResponsiveContainer>
              <PieChart>
                <Pie
                  data={status}
                  dataKey="value"
                  nameKey="name"
                  innerRadius={50}
                  outerRadius={85}
                  label
                >
                  {status.map((_, i) => (
                    <Cell
                      key={i}
                      fill={['#10b981', '#f59e0b', '#ef4444'][i]}
                    />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="rounded-xl border border-gray-200 bg-white p-5">
          <h3 className="font-semibold">GSTIN-wise Uploads</h3>

          <div className="mt-4 h-64">
            <ResponsiveContainer>
              <BarChart data={gst} layout="vertical">
                <XAxis type="number" allowDecimals={false} />
                <YAxis
                  type="category"
                  dataKey="name"
                  width={120}
                />
                <Tooltip />
                <Bar
                  dataKey="value"
                  fill="#2563eb"
                  radius={[0, 5, 5, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      <div className="overflow-x-auto rounded-xl border border-gray-200 bg-white">
        <table className="w-full min-w-[650px] text-left text-sm">
          <thead className="bg-gray-200 text-xs border-gray-200 uppercase text-gray-900">
            <tr>
              {[
                'Month',
                'Total Returns',
                'Successful',
                'Failed',
                'Pending',
              ].map((x) => (
                <th className="px-4 py-3" key={x}>
                  {x}
                </th>
              ))}
            </tr>
          </thead>

          <tbody className="divide-y">
            {monthly.map((m, i) => (
              <tr key={m.month} className="border-gray-200 hover:bg-gray-50">
                <td className="px-4 py-3 border-gray-200 font-medium">
                  {m.month}
                </td>

                <td className="px-4 py-3 border-gray-200">{m.total}</td>

                <td className="px-4 py-3 border-gray-200">{m.successful}</td>

                <td className="px-4 py-3 border-gray-200">
                  {
                    r.filter(
                      (x) =>
                        x.taxPeriod ===
                          [
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
                          ][i] && x.status === 'Failed'
                    ).length
                  }
                </td>

                <td className="px-4 py-3 border-gray-200">
                  {Math.max(0, m.total - m.successful)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
 
