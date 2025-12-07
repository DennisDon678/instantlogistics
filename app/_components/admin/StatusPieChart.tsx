export default function StatusPieChart() {
    return (
        <div className="flex flex-col gap-4 rounded-xl border border-white/10 p-6 bg-white/5">
            <p className="text-white text-lg font-medium leading-normal">Deliveries by Status</p>
            <div className="w-full h-full flex items-center justify-center">
                <div className="relative w-40 h-40">
                    <svg className="w-full h-full" viewBox="0 0 36 36">
                        {/* In Transit - Blue */}
                        <path
                            d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                            fill="none"
                            stroke="#258cf4"
                            strokeDasharray="75, 100"
                            strokeWidth="3.8"
                        />
                        {/* Successful - Green */}
                        <path
                            d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                            fill="none"
                            stroke="#059669"
                            strokeDasharray="15, 100"
                            strokeDashoffset="-75"
                            strokeWidth="3.8"
                        />
                        {/* Pending - Amber */}
                        <path
                            d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                            fill="none"
                            stroke="#f59e0b"
                            strokeDasharray="10, 100"
                            strokeDashoffset="-90"
                            strokeWidth="3.8"
                        />
                    </svg>
                    <div className="absolute inset-0 flex flex-col items-center justify-center">
                        <span className="text-white text-3xl font-bold">832</span>
                        <span className="text-gray-400 text-sm">In Transit</span>
                    </div>
                </div>
            </div>
            <div className="flex justify-center gap-4 text-sm flex-wrap">
                <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-green-500"></span>
                    <span className="text-gray-300">Successful</span>
                </div>
                <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-[#258cf4]"></span>
                    <span className="text-gray-300">In Transit</span>
                </div>
                <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-amber-500"></span>
                    <span className="text-gray-300">Pending</span>
                </div>
            </div>
        </div>
    )
}
