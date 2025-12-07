import { Search, Bell } from 'lucide-react'
import StatsCard from '@/app/_components/admin/StatsCard'
import DeliveryTrendsChart from '@/app/_components/admin/DeliveryTrendsChart'
import StatusPieChart from '@/app/_components/admin/StatusPieChart'
import ActivityTable from '@/app/_components/admin/ActivityTable'

export default function DashboardPage() {
    return (
        <div className="p-4 md:p-6 lg:p-8">
            {/* Page Heading */}
            <div className="flex flex-wrap justify-between items-center gap-4 mb-6 lg:mb-8">
                <div className="flex flex-col gap-1">
                    <h1 className="text-white text-2xl md:text-3xl lg:text-4xl font-bold leading-tight tracking-tight">Admin Overview</h1>
                    <p className="text-gray-400 text-sm md:text-base font-normal leading-normal">
                        Welcome, Alex! Here&apos;s a summary of your logistics operations.
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
                    value="12,450"
                    change="+5.2%"
                    isPositive={true}
                />
                <StatsCard
                    label="In Transit"
                    value="832"
                    change="+1.8%"
                    isPositive={true}
                />
                <StatsCard
                    label="Pending"
                    value="156"
                    change="-0.5%"
                    isPositive={false}
                />
                <StatsCard
                    label="Successful"
                    value="11,462"
                    change="+6.1%"
                    isPositive={true}
                />
            </div>

            {/* Charts Section */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-6 mb-6 lg:mb-8">
                <DeliveryTrendsChart />
                <StatusPieChart />
            </div>

            {/* Recent Activity */}
            <ActivityTable />
        </div>
    )
}
