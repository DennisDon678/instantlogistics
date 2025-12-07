interface StatusPieChartProps {
    stats: {
        inTransit: number
        pending: number
        delivered: number
        delayed: number
    }
}

export default function StatusPieChart({ stats }: StatusPieChartProps) {
    const total = stats.inTransit + stats.pending + stats.delivered + stats.delayed

    // Calculate percentages for stroke-dasharray
    const inTransitPct = total > 0 ? (stats.inTransit / total) * 100 : 0
    const deliveredPct = total > 0 ? (stats.delivered / total) * 100 : 0
    const pendingPct = total > 0 ? (stats.pending / total) * 100 : 0
    const delayedPct = total > 0 ? (stats.delayed / total) * 100 : 0

    // Calculate offsets
    const inTransitOffset = 25
    const deliveredOffset = 25 - inTransitPct
    const pendingOffset = 25 - inTransitPct - deliveredPct
    const delayedOffset = 25 - inTransitPct - deliveredPct - pendingPct

    return (
        <div className="flex flex-col gap-4 rounded-xl border border-white/10 p-6 bg-white/5">
            <p className="text-white text-lg font-medium leading-normal">Deliveries by Status</p>
            <div className="w-full h-full flex items-center justify-center">
                <div className="relative w-40 h-40">
                    <svg className="w-full h-full" viewBox="0 0 36 36">
                        <circle cx="18" cy="18" r="15.9155" fill="none" stroke="#333" strokeWidth="3.8" />

                        {/* In Transit - Blue */}
                        {inTransitPct > 0 && (
                            <circle
                                cx="18" cy="18" r="15.9155"
                                fill="none"
                                stroke="#258cf4"
                                strokeWidth="3.8"
                                strokeDasharray={`${inTransitPct} ${100 - inTransitPct}`}
                                strokeDashoffset={inTransitOffset}
                            />
                        )}

                        {/* Successful - Green */}
                        {deliveredPct > 0 && (
                            <circle
                                cx="18" cy="18" r="15.9155"
                                fill="none"
                                stroke="#059669"
                                strokeWidth="3.8"
                                strokeDasharray={`${deliveredPct} ${100 - deliveredPct}`}
                                strokeDashoffset={deliveredOffset}
                            />
                        )}

                        {/* Pending - Amber */}
                        {pendingPct > 0 && (
                            <circle
                                cx="18" cy="18" r="15.9155"
                                fill="none"
                                stroke="#f59e0b"
                                strokeWidth="3.8"
                                strokeDasharray={`${pendingPct} ${100 - pendingPct}`}
                                strokeDashoffset={pendingOffset}
                            />
                        )}

                        {/* Delayed - Red */}
                        {delayedPct > 0 && (
                            <circle
                                cx="18" cy="18" r="15.9155"
                                fill="none"
                                stroke="#ef4444"
                                strokeWidth="3.8"
                                strokeDasharray={`${delayedPct} ${100 - delayedPct}`}
                                strokeDashoffset={delayedOffset}
                            />
                        )}
                    </svg>
                    <div className="absolute inset-0 flex flex-col items-center justify-center">
                        <span className="text-white text-3xl font-bold">{total}</span>
                        <span className="text-gray-400 text-sm">Total</span>
                    </div>
                </div>
            </div>
            <div className="flex justify-center gap-4 text-sm flex-wrap">
                <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-green-500"></span>
                    <span className="text-gray-300">Successful ({stats.delivered})</span>
                </div>
                <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-[#258cf4]"></span>
                    <span className="text-gray-300">In Transit ({stats.inTransit})</span>
                </div>
                <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-amber-500"></span>
                    <span className="text-gray-300">Pending ({stats.pending})</span>
                </div>
                <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-red-500"></span>
                    <span className="text-gray-300">Delayed ({stats.delayed})</span>
                </div>
            </div>
        </div>
    )
}
