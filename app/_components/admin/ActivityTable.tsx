import Link from 'next/link'

interface Activity {
    id: string
    status: 'Completed' | 'In Transit' | 'Pending' | 'Delayed'
    date: string
    destination: string
}

const activities: Activity[] = [
    { id: '#ID12389', status: 'Completed', date: '2023-10-26', destination: 'New York, USA' },
    { id: '#ID12388', status: 'In Transit', date: '2023-10-26', destination: 'London, UK' },
    { id: '#ID12387', status: 'Pending', date: '2023-10-25', destination: 'Tokyo, Japan' },
    { id: '#ID12386', status: 'Delayed', date: '2023-10-24', destination: 'Sydney, Australia' },
]

const statusStyles = {
    'Completed': 'bg-green-500/10 text-green-400',
    'In Transit': 'bg-blue-500/10 text-[#258cf4]',
    'Pending': 'bg-amber-500/10 text-amber-400',
    'Delayed': 'bg-red-500/10 text-red-400',
}

export default function ActivityTable() {
    return (
        <div>
            <h2 className="text-white text-2xl font-bold leading-tight tracking-tight px-1 pb-3 pt-5">
                Recent Activity
            </h2>
            <div className="overflow-hidden rounded-xl border border-white/10 bg-white/5">
                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead className="border-b border-white/10">
                            <tr>
                                <th className="px-6 py-4 font-medium text-white" scope="col">Shipment ID</th>
                                <th className="px-6 py-4 font-medium text-white" scope="col">Status</th>
                                <th className="px-6 py-4 font-medium text-white" scope="col">Date</th>
                                <th className="px-6 py-4 font-medium text-white" scope="col">Destination</th>
                                <th className="px-6 py-4 font-medium text-white" scope="col"></th>
                            </tr>
                        </thead>
                        <tbody>
                            {activities.map((activity, index) => (
                                <tr
                                    key={activity.id}
                                    className={`hover:bg-white/5 transition-colors ${index !== activities.length - 1 ? 'border-b border-white/10' : ''
                                        }`}
                                >
                                    <td className="px-6 py-4 text-gray-300 font-mono">{activity.id}</td>
                                    <td className="px-6 py-4">
                                        <span className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-medium ${statusStyles[activity.status]}`}>
                                            {activity.status}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 text-gray-300">{activity.date}</td>
                                    <td className="px-6 py-4 text-gray-300">{activity.destination}</td>
                                    <td className="px-6 py-4 text-right">
                                        <Link href="#" className="font-medium text-[#258cf4] hover:underline">
                                            View Details
                                        </Link>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}
