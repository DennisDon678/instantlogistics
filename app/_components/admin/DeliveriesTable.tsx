'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Search, Eye, Edit, Route, ChevronDown } from 'lucide-react'

interface Delivery {
    id: string
    status: 'Delivered' | 'In-Transit' | 'Delayed' | 'Pending'
    sender: string
    receiver: string
    scheduled: string
}

const deliveries: Delivery[] = [
    { id: '#8B3D9A', status: 'Delivered', sender: 'John Doe', receiver: 'Jane Smith', scheduled: '2024-07-20' },
    { id: '#C1E5F2', status: 'In-Transit', sender: 'Alice Johnson', receiver: 'Bob Brown', scheduled: '2024-07-21' },
    { id: '#A6B7C8', status: 'Delayed', sender: 'Charlie Davis', receiver: 'Diana Evans', scheduled: '2024-07-22' },
    { id: '#F9E8D7', status: 'Pending', sender: 'Frank Green', receiver: 'Grace Hall', scheduled: '2024-07-23' },
    { id: '#3D4A5B', status: 'Delivered', sender: 'Heidi King', receiver: 'Ivan Lopez', scheduled: '2024-07-19' },
    { id: '#E0F1A2', status: 'In-Transit', sender: 'Judy Miller', receiver: 'Karl Nelson', scheduled: '2024-07-24' },
]

const statusStyles = {
    'Delivered': 'bg-[#39FF14]/20 text-[#39FF14]',
    'In-Transit': 'bg-[#FFD700]/20 text-[#FFD700]',
    'Delayed': 'bg-[#FF3131]/20 text-[#FF3131]',
    'Pending': 'bg-[#258cf4]/20 text-[#258cf4]',
}

export default function DeliveriesTable() {
    const [searchQuery, setSearchQuery] = useState('')
    const [statusFilter, setStatusFilter] = useState('All')

    const filteredDeliveries = deliveries.filter(delivery => {
        const matchesSearch = delivery.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
            delivery.sender.toLowerCase().includes(searchQuery.toLowerCase()) ||
            delivery.receiver.toLowerCase().includes(searchQuery.toLowerCase())
        const matchesStatus = statusFilter === 'All' || delivery.status === statusFilter
        return matchesSearch && matchesStatus
    })

    return (
        <div className="flex flex-col gap-6 bg-[#1A1D21] p-6 rounded-xl">
            <div className="flex flex-col gap-4">
                <h3 className="text-white text-lg font-bold leading-tight tracking-[-0.015em]">
                    All Deliveries
                </h3>

                {/* Search and Filters */}
                <div className="flex flex-wrap items-center gap-4">
                    <div className="relative flex-1 min-w-64">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-[#90adcb] w-5 h-5" />
                        <input
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="flex w-full min-w-0 resize-none overflow-hidden rounded-lg text-white focus:outline-0 focus:ring-0 border border-[#314d68] bg-[#182634] focus:border-[#258cf4] h-12 placeholder:text-[#90adcb] pl-12 pr-4 text-base font-normal leading-normal"
                            placeholder="Search by ID, name..."
                        />
                    </div>
                    <div className="relative">
                        <select
                            value={statusFilter}
                            onChange={(e) => setStatusFilter(e.target.value)}
                            className="appearance-none w-48 rounded-lg text-white focus:outline-0 focus:ring-0 border border-[#314d68] bg-[#182634] focus:border-[#258cf4] h-12 placeholder:text-[#90adcb] px-4 pr-10 text-base font-normal leading-normal"
                        >
                            <option>All</option>
                            <option>Pending</option>
                            <option>In-Transit</option>
                            <option>Delivered</option>
                            <option>Delayed</option>
                        </select>
                        <ChevronDown className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-[#90adcb] w-5 h-5" />
                    </div>
                </div>

                {/* Data Table */}
                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead className="border-b border-[#2C313A]">
                            <tr>
                                <th className="p-4 text-sm font-semibold text-[#90adcb] uppercase">Delivery ID</th>
                                <th className="p-4 text-sm font-semibold text-[#90adcb] uppercase">Status</th>
                                <th className="p-4 text-sm font-semibold text-[#90adcb] uppercase">Sender</th>
                                <th className="p-4 text-sm font-semibold text-[#90adcb] uppercase">Receiver</th>
                                <th className="p-4 text-sm font-semibold text-[#90adcb] uppercase">Scheduled</th>
                                <th className="p-4 text-sm font-semibold text-[#90adcb] uppercase">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-[#2C313A]">
                            {filteredDeliveries.map((delivery) => (
                                <tr key={delivery.id} className="hover:bg-[#2C313A]/50 transition-colors">
                                    <td className="p-4 text-sm font-mono text-white">{delivery.id}</td>
                                    <td className="p-4">
                                        <span className={`inline-block px-3 py-1 text-xs font-bold rounded-full ${statusStyles[delivery.status]}`}>
                                            {delivery.status}
                                        </span>
                                    </td>
                                    <td className="p-4 text-sm text-white">{delivery.sender}</td>
                                    <td className="p-4 text-sm text-white">{delivery.receiver}</td>
                                    <td className="p-4 text-sm text-white">{delivery.scheduled}</td>
                                    <td className="p-4">
                                        <div className="flex items-center gap-2">
                                            <Link
                                                href={`/dashboard/shipments/${delivery.id.replace('#', '')}`}
                                                className="text-[#90adcb] hover:text-white transition-colors"
                                                title="View Details"
                                            >
                                                <Eye className="w-5 h-5" />
                                            </Link>
                                            <button
                                                className="text-[#90adcb] hover:text-white transition-colors"
                                                title="Edit Delivery"
                                            >
                                                <Edit className="w-5 h-5" />
                                            </button>
                                            <Link
                                                href={`/dashboard/shipments/${delivery.id.replace('#', '')}/status`}
                                                className="text-[#90adcb] hover:text-white transition-colors"
                                                title="Update Status"
                                            >
                                                <Route className="w-5 h-5" />
                                            </Link>
                                        </div>
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
