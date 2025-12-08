import Link from 'next/link'
import { prisma } from '@/lib/prisma'

// Define the shape of the activity data
interface ActivityWithDelivery {
    id: string
    status: string
    location: string
    description: string | null
    timestamp: Date
    delivery: {
        deliveryId: string
    }
}

async function getRecentActivities() {
    const activities = await prisma.deliveryHistory.findMany({
        take: 5,
        orderBy: { timestamp: 'desc' },
        include: {
            delivery: {
                select: {
                    deliveryId: true
                }
            }
        }
    })
    return activities
}

export default async function ActivityTable() {
    const activities = await getRecentActivities()

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
                                <th className="px-6 py-4 font-medium text-white" scope="col">Event</th>
                                <th className="px-6 py-4 font-medium text-white" scope="col">Shipment ID</th>
                                <th className="px-6 py-4 font-medium text-white" scope="col">Location</th>
                                <th className="px-6 py-4 font-medium text-white" scope="col">Time</th>
                                <th className="px-6 py-4 font-medium text-white" scope="col"></th>
                            </tr>
                        </thead>
                        <tbody>
                            {activities.length === 0 ? (
                                <tr>
                                    <td colSpan={5} className="px-6 py-8 text-center text-gray-400">
                                        No recent activity found.
                                    </td>
                                </tr>
                            ) : (
                                activities.map((activity: ActivityWithDelivery, index: number) => (
                                    <tr
                                        key={activity.id}
                                        className={`hover:bg-white/5 transition-colors ${index !== activities.length - 1 ? 'border-b border-white/10' : ''
                                            }`}
                                    >
                                        <td className="px-6 py-4">
                                            <span className="text-white font-medium">{activity.status.replace('_', ' ')}</span>
                                            {activity.description && (
                                                <p className="text-xs text-gray-400 mt-0.5">{activity.description}</p>
                                            )}
                                        </td>
                                        <td className="px-6 py-4 text-gray-300 font-mono">
                                            {activity.delivery.deliveryId}
                                        </td>
                                        <td className="px-6 py-4 text-gray-300">
                                            {activity.location}
                                        </td>
                                        <td className="px-6 py-4 text-gray-400 text-sm">
                                            {new Date(activity.timestamp).toLocaleString()}
                                        </td>
                                        <td className="px-6 py-4 text-right">
                                            <Link href={`/dashboard/shipments/${activity.delivery.deliveryId}`} className="font-medium text-[#258cf4] hover:underline">
                                                View
                                            </Link>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}
