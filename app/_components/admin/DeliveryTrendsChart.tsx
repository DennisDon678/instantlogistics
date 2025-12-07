interface DeliveryTrendsChartProps {
    data: Array<{ date: string, count: number }>
}

export default function DeliveryTrendsChart({ data }: DeliveryTrendsChartProps) {
    const maxCount = Math.max(...data.map(d => d.count), 1) // Avoid division by zero

    return (
        <div className="lg:col-span-2 flex flex-col gap-2 rounded-xl border border-white/10 p-6 bg-white/5">
            <div className="flex justify-between items-center mb-4">
                <div>
                    <p className="text-white text-lg font-medium leading-normal">Delivery Trends</p>
                    <p className="text-gray-400 text-sm">Last 7 Days</p>
                </div>
            </div>

            <div className="flex items-end justify-between gap-2 h-[200px] w-full pt-4">
                {data.map((item) => {
                    const heightPct = (item.count / maxCount) * 100
                    const dayName = new Date(item.date).toLocaleDateString('en-US', { weekday: 'short' })

                    return (
                        <div key={item.date} className="flex flex-col items-center gap-2 flex-1 group">
                            <div className="relative w-full flex justify-center items-end h-full">
                                <div
                                    className="w-full max-w-[40px] bg-[#258cf4]/20 border border-[#258cf4] rounded-t-sm transition-all duration-300 group-hover:bg-[#258cf4]/40"
                                    style={{ height: `${Math.max(heightPct, 5)}%` }} // Min height 5% for visibility
                                >
                                    <div className="opacity-0 group-hover:opacity-100 absolute -top-8 left-1/2 -translate-x-1/2 bg-black text-white text-xs py-1 px-2 rounded transition-opacity whitespace-nowrap">
                                        {item.count} deliveries
                                    </div>
                                </div>
                            </div>
                            <span className="text-gray-400 text-xs">{dayName}</span>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}
