'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Search, Eye, Edit, Route, ChevronDown, ChevronLeft, ChevronRight } from 'lucide-react'

interface Delivery {
    id: string
    deliveryId: string
    status: string
    senderName: string
    receiverName: string
    scheduledDate: string
}

const statusStyles: Record<string, string> = {
    'DELIVERED': 'bg-[#39FF14]/20 text-[#39FF14]',
    'IN_TRANSIT': 'bg-[#FFD700]/20 text-[#FFD700]',
    'DELAYED': 'bg-[#FF3131]/20 text-[#FF3131]',
    'PENDING': 'bg-[#258cf4]/20 text-[#258cf4]',
}

export default function DeliveriesTable() {
    const [deliveries, setDeliveries] = useState<Delivery[]>([])
    const [loading, setLoading] = useState(true)
    const [searchQuery, setSearchQuery] = useState('')
    const [statusFilter, setStatusFilter] = useState('All')
    const [page, setPage] = useState(1)
    const [totalPages, setTotalPages] = useState(1)

    useEffect(() => {
        const fetchDeliveries = async () => {
            setLoading(true)
            try {
                const params = new URLSearchParams({
                    page: page.toString(),
                    limit: '10',
                    search: searchQuery,
                    status: statusFilter,
                })
                const res = await fetch(`/api/admin/shipments?${params}`)
                const data = await res.json()
                setDeliveries(data.deliveries)
                setTotalPages(data.pagination.pages)
            } catch (error) {
                console.error('Failed to fetch deliveries:', error)
            } finally {
                setLoading(false)
            }
        }

        // Debounce search
        const timeoutId = setTimeout(() => {
            fetchDeliveries()
        }, 500)

        return () => clearTimeout(timeoutId)
    }, [searchQuery, statusFilter, page])

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
                            onChange={(e) => {
                                setSearchQuery(e.target.value)
                                setPage(1) // Reset to first page on search
                            }}
                            className="flex w-full min-w-0 resize-none overflow-hidden rounded-lg text-white focus:outline-0 focus:ring-0 border border-[#314d68] bg-[#182634] focus:border-[#258cf4] h-12 placeholder:text-[#90adcb] pl-12 pr-4 text-base font-normal leading-normal"
                            placeholder="Search by ID, name..."
                        />
                    </div>
                    <div className="relative">
                        <select
                            value={statusFilter}
                            onChange={(e) => {
                                setStatusFilter(e.target.value)
                                setPage(1) // Reset to first page on filter change
                            }}
                            className="appearance-none w-48 rounded-lg text-white focus:outline-0 focus:ring-0 border border-[#314d68] bg-[#182634] focus:border-[#258cf4] h-12 placeholder:text-[#90adcb] px-4 pr-10 text-base font-normal leading-normal"
                        >
                            <option value="All">All Status</option>
                            <option value="Pending">Pending</option>
                            <option value="In-Transit">In Transit</option>
                            <option value="Delivered">Delivered</option>
                            <option value="Delayed">Delayed</option>
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
                            {loading ? (
                                <tr>
                                    <td colSpan={6} className="p-8 text-center text-gray-400">Loading...</td>
                                </tr>
                            ) : deliveries.length === 0 ? (
                                <tr>
                                    <td colSpan={6} className="p-8 text-center text-gray-400">No deliveries found.</td>
                                </tr>
                            ) : (
                                deliveries.map((delivery) => (
                                    <tr key={delivery.id} className="hover:bg-[#2C313A]/50 transition-colors">
                                        <td className="p-4 text-sm font-mono text-white">{delivery.deliveryId}</td>
                                        <td className="p-4">
                                            <span className={`inline-block px-3 py-1 text-xs font-bold rounded-full ${statusStyles[delivery.status] || 'bg-gray-500/20 text-gray-400'}`}>
                                                {delivery.status.replace('_', ' ')}
                                            </span>
                                        </td>
                                        <td className="p-4 text-sm text-white">{delivery.senderName}</td>
                                        <td className="p-4 text-sm text-white">{delivery.receiverName}</td>
                                        <td className="p-4 text-sm text-white">{new Date(delivery.scheduledDate).toLocaleDateString()}</td>
                                        <td className="p-4">
                                            <div className="flex items-center gap-2">
                                                <Link
                                                    href={`/dashboard/shipments/${delivery.deliveryId}`}
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
                                                    href={`/dashboard/shipments/${delivery.deliveryId}/status`}
                                                    className="text-[#90adcb] hover:text-white transition-colors"
                                                    title="Update Status"
                                                >
                                                    <Route className="w-5 h-5" />
                                                </Link>
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>

                {/* Pagination */}
                <div className="flex justify-between items-center mt-4 border-t border-[#2C313A] pt-4">
                    <p className="text-sm text-[#90adcb]">
                        Page {page} of {totalPages}
                    </p>
                    <div className="flex gap-2">
                        <button
                            onClick={() => setPage(p => Math.max(1, p - 1))}
                            disabled={page === 1}
                            className="p-2 rounded-lg bg-[#182634] border border-[#314d68] text-white disabled:opacity-50 disabled:cursor-not-allowed hover:bg-[#182634]/80 transition-colors"
                        >
                            <ChevronLeft className="w-5 h-5" />
                        </button>
                        <button
                            onClick={() => setPage(p => Math.min(totalPages, p + 1))}
                            disabled={page === totalPages}
                            className="p-2 rounded-lg bg-[#182634] border border-[#314d68] text-white disabled:opacity-50 disabled:cursor-not-allowed hover:bg-[#182634]/80 transition-colors"
                        >
                            <ChevronRight className="w-5 h-5" />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}
