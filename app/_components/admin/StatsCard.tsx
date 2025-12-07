interface StatsCardProps {
    label: string
    value: string | number
    change: string
    isPositive: boolean
}

export default function StatsCard({ label, value, change, isPositive }: StatsCardProps) {
    return (
        <div className="flex flex-col gap-2 rounded-xl p-6 bg-white/5 border border-white/10">
            <p className="text-gray-300 text-base font-medium leading-normal">{label}</p>
            <p className="text-white text-3xl font-bold leading-tight">{value}</p>
            <p className={`text-base font-medium leading-normal ${isPositive ? 'text-green-400' : 'text-red-400'}`}>
                {change}
            </p>
        </div>
    )
}
