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

import { mockReturns } from '../../data/mockData';

const monthly = [
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
].map((m, i) => ({
  month: m,
  uploads:
    mockReturns.filter(
      (r) =>
        r.taxPeriod ===
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
    ).length +
    Math.floor(i / 2) +
    1,
}));

const status = ['Successful', 'Pending', 'Failed'].map(
  (name) => ({
    name,
    value: mockReturns.filter((r) => r.status === name).length,
  })
);

const types = [
  'GSTR-1',
  'GSTR-3B',
  'GSTR-2B',
  'GSTR-4',
  'GSTR-9',
].map((name) => ({
  name,
  value: mockReturns.filter((r) => r.returnType === name).length,
}));

export default function DashboardCharts() {
  return (
    <div className="grid gap-5 xl:grid-cols-2">
      <div className="rounded-xl border border-gray-200 bg-white p-5">
        <h3 className="font-semibold">
          Monthly Return Uploads
        </h3>

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
                type="monotone"
                dataKey="uploads"
                stroke="#2563eb"
                strokeWidth={3}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="rounded-xl border border-gray-200 bg-white p-5">
        <h3 className="font-semibold">Return Status</h3>

        <div className="mt-4 h-64">
          <ResponsiveContainer>
            <PieChart>
              <Pie
                data={status}
                dataKey="value"
                nameKey="name"
                innerRadius={55}
                outerRadius={90}
                label
              >
                {status.map((_, i) => (
                  <Cell
                    key={i}
                    fill={[
                      '#10b981',
                      '#f59e0b',
                      '#ef4444',
                    ][i]}
                  />
                ))}
              </Pie>

              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="rounded-xl border border-gray-200 bg-white p-5 xl:col-span-2">
        <h3 className="font-semibold">
          Return Type Distribution
        </h3>

        <div className="mt-4 h-64">
          <ResponsiveContainer>
            <BarChart data={types}>
              <CartesianGrid
                strokeDasharray="3 3"
                vertical={false}
              />

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
    </div>
  );
}