
import { useMemo } from 'react';
import {
    Upload,
    Building2,
    FileText,
    BarChart3,
    CheckCircle2,
    Clock3,
    XCircle,
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import StatCard from '../components/dashboard/StatCard';
import DashboardCharts from '../components/dashboard/DashboardCharts';
import RecentUploads from '../components/dashboard/RecentUploads';
import { getDashboardStats } from '../services/dashboardService';
import { getReturns } from '../services/returnService';
import Button from '../components/common/Button';

export default function Dashboard() {
    const nav = useNavigate();
    const stats = useMemo(getDashboardStats, []);
    const recent = getReturns().slice(0, 5);

    return (
        <div className="space-y-6">
            <div>
                <p className="text-sm font-medium text-brand-600">Overview</p>
                <h1 className="mt-1 text-2xl font-bold">Dashboard</h1>
                <p className="mt-1 text-sm text-gray-500">
                    Track your GST return activity and upload status.
                </p>
            </div>

            <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
                <StatCard
                    title="Total Returns"
                    value={stats.total}
                    icon={FileText}
                />
                <StatCard
                    title="Successful Returns"
                    value={stats.successful}
                    icon={CheckCircle2}
                    tone="green"
                />
                <StatCard
                    title="Pending Returns"
                    value={stats.pending}
                    icon={Clock3}
                    tone="amber"
                />
                <StatCard
                    title="Failed Returns"
                    value={stats.failed}
                    icon={XCircle}
                    tone="red"
                />
            </div>

            <div className="rounded-xl border border-gray-200 bg-white p-5">
                <div className="flex flex-wrap items-center justify-between gap-3">
                    <div>
                        <h3 className="font-semibold">Quick Actions</h3>
                        <p className="text-sm text-gray-500">
                            Common tasks to keep your workspace moving.
                        </p>
                    </div>

                    <div className="flex flex-wrap gap-2">
                        <Button onClick={() => nav('/upload-return')}>
                            <Upload size={17} />
                            Upload Return
                        </Button>

                        <Button
                            variant="secondary"
                            onClick={() => nav('/gstins')}
                        >
                            <Building2 size={17} />
                            Add GSTIN
                        </Button>

                        <Button
                            variant="secondary"
                            onClick={() => nav('/returns')}
                        >
                            <FileText size={17} />
                            View Returns
                        </Button>

                        <Button
                            variant="secondary"
                            onClick={() => nav('/reports')}
                        >
                            <BarChart3 size={17} />
                            Reports
                        </Button>
                    </div>
                </div>
            </div>

            <DashboardCharts />
            <RecentUploads rows={recent} />
        </div>
    );
}

