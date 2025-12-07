import { Search, Bell } from 'lucide-react'
import StatsCard from '@/app/_components/admin/StatsCard'
import DeliveryTrendsChart from '@/app/_components/admin/DeliveryTrendsChart'
import StatusPieChart from '@/app/_components/admin/StatusPieChart'
import ActivityTable from '@/app/_components/admin/ActivityTable'
import { prisma } from '@/lib/prisma'

async function getStats() {
    const today = new Date()
    const last7Days = Array.from({ length: 7 }, (_, i) => {
        const d = new Date(today)
        d.setDate(d.getDate() - i)
        return d.toISOString().split('T')[0]
    }).reverse()

    const [total, inTransit, pending, delivered, delayed, dailyStats] = await Promise.all([
        prisma.delivery.count(),
        prisma.delivery.count({ where: { status: 'IN_TRANSIT' } }),
        prisma.delivery.count({ where: { status: 'PENDING' } }),
        prisma.delivery.count({ where: { status: 'DELIVERED' } }),
        prisma.delivery.count({ where: { status: 'DELAYED' } }),
        Promise.all(last7Days.map(async (date) => {
            const count = await prisma.delivery.count({
                where: {
                    createdAt: {
                        gte: new Date(`${date}T00:00:00.000Z`),
                        lt: new Date(`${date}T23:59:59.999Z`),
                    }
                }
            })
            return { date, count }
        }))
    ])

    return {
        total,
        inTransit,
        pending,
        delivered,
        delayed,
        dailyStats
    }
}

export default async function DashboardPage() {
    const stats = await getStats()

    return (
        <div className="p-4 md:p-6 lg:p-8">
            {/* Page Heading */}
            <div className="flex flex-wrap justify-between items-center gap-4 mb-6 lg:mb-8">
                <div className="flex flex-col gap-1">
                    <h1 className="text-white text-2xl md:text-3xl lg:text-4xl font-bold leading-tight tracking-tight">Admin Overview</h1>
                    <p className="text-gray-400 text-sm md:text-base font-normal leading-normal">
                        Welcome, Admin! Here&apos;s a summary of your logistics operations.
                    </p>
                </div>
                <div className="flex items-center gap-2 w-full sm:w-auto">
                    <div className="relative flex-1 sm:w-64">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                        <input
                            className="w-full pl-10 pr-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-500 focus:ring-2 focus:ring-[#258cf4] focus:border-[#258cf4] transition focus:outline-none"
                            placeholder="Search shipments, fleet..."
                            type="text"
                        />
                    </div>
                    <button className="p-2 rounded-lg bg-white/5 border border-white/10 text-gray-300 hover:bg-white/10 transition">
                        <Bell className="w-5 h-5" />
                    </button>
                </div>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-6 lg:mb-8">
                <StatsCard
                    label="Total Deliveries"
                    value={stats.total.toLocaleString()}
                    change="+0%" // Dynamic change calculation requires historical data
                    isPositive={true}
                />
                <StatsCard
                    label="In Transit"
                    value={stats.inTransit.toLocaleString()}
                    change="Active"
                    isPositive={true}
                />
                <StatsCard
                    label="Pending"
                    value={stats.pending.toLocaleString()}
                    change="Action Needed"
                    isPositive={stats.pending === 0}
                />
                <StatsCard
                    label="Successful"
                    value={stats.delivered.toLocaleString()}
                    change="Completed"
                    isPositive={true}
                />
            </div>

            {/* Charts Section */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-6 mb-6 lg:mb-8">
                <DeliveryTrendsChart data={stats.dailyStats} />
                <StatusPieChart stats={{
                    inTransit: stats.inTransit,
                    pending: stats.pending,
                    delivered: stats.delivered,
                    delayed: stats.delayed
                }} />
            </div>

            {/* Recent Activity */}
            <ActivityTable />
        </div>
    )
}
