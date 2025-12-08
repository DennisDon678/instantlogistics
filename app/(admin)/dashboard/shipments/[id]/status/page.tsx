'use client'

import Link from 'next/link'
import { useState, useEffect } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { Loader2 } from 'lucide-react'

interface Delivery {
    id: string
    deliveryId: string
    status: string
    senderName: string
    senderAddress: string
    senderPhone: string
    receiverName: string
    receiverAddress: string
    receiverPhone: string
    scheduledDate: string
    history: any[]
}

const STATUS_OPTIONS = [
    { value: 'PENDING', label: 'Pending' },
    { value: 'IN_TRANSIT', label: 'In Transit' },
    { value: 'DELIVERED', label: 'Delivered' },
    { value: 'DELAYED', label: 'Delayed' },
]

export default function StatusManagementPage() {
    const params = useParams()
    const router = useRouter()
    const id = params?.id as string

    const [delivery, setDelivery] = useState<Delivery | null>(null)
    const [loading, setLoading] = useState(true)
    const [submitting, setSubmitting] = useState(false)
    const [error, setError] = useState('')

    const [status, setStatus] = useState('')
    const [location, setLocation] = useState('')
    const [notes, setNotes] = useState('')

    useEffect(() => {
        if (id) {
            fetchDelivery()
        }
    }, [id])

    const fetchDelivery = async () => {
        try {
            setLoading(true)
            const res = await fetch(`/api/deliveries/${encodeURIComponent(id)}`)
            if (!res.ok) throw new Error('Failed to fetch delivery')
            const data = await res.json()
            setDelivery(data)
            setStatus(data.status) // Initialize with current status
        } catch (err) {
            console.error(err)
            setError('Failed to load delivery details')
        } finally {
            setLoading(false)
        }
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        if (!delivery) return

        try {
            setSubmitting(true)
            const res = await fetch(`/api/deliveries/${delivery.id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    status,
                    location,
                    description: notes
                })
            })

            if (!res.ok) throw new Error('Failed to update status')

            router.push(`/dashboard/shipments/${encodeURIComponent(delivery.deliveryId)}`)
            router.refresh()
        } catch (err) {
            console.error(err)
            alert('Failed to update status')
        } finally {
            setSubmitting(false)
        }
    }

    if (loading) return <div className="p-8 text-white">Loading...</div>
    if (error) return <div className="p-8 text-red-500">{error}</div>
    if (!delivery) return <div className="p-8 text-white">Delivery not found</div>

    // Calculate progress for UI
    const getProgress = (s: string) => {
        switch (s) {
            case 'PENDING': return 25
            case 'IN_TRANSIT': return 50
            case 'DELAYED': return 50
            case 'DELIVERED': return 100
            default: return 0
        }
    }

    return (
        <main className="flex-1 p-4 md:p-6 lg:p-8 overflow-y-auto">
            <div className="max-w-4xl mx-auto">
                {/* Breadcrumbs */}
                <div className="flex flex-wrap items-center gap-2 mb-6">
                    <Link href="/dashboard/shipments" className="text-[#90adcb] text-base font-medium leading-normal hover:text-[#258cf4] transition-colors">
                        Deliveries
                    </Link>
                    <span className="text-[#90adcb] text-base font-medium leading-normal">/</span>
                    <Link href={`/dashboard/shipments/${encodeURIComponent(delivery.deliveryId)}`} className="text-[#90adcb] text-base font-medium leading-normal hover:text-[#258cf4] transition-colors">
                        {delivery.deliveryId}
                    </Link>
                    <span className="text-[#90adcb] text-base font-medium leading-normal">/</span>
                    <span className="text-white text-base font-medium leading-normal">Update Status</span>
                </div>

                {/* Page Heading */}
                <div className="flex flex-wrap justify-between gap-3 mb-8">
                    <div className="flex min-w-72 flex-col gap-3">
                        <p className="text-white text-2xl md:text-3xl lg:text-4xl font-black leading-tight tracking-[-0.033em]">
                            Manage Status: {delivery.deliveryId}
                        </p>
                        <p className="text-[#90adcb] text-base font-normal leading-normal">
                            Update tracking status and add history events
                        </p>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
                    {/* Left Column: Delivery Details */}
                    <div className="lg:col-span-2 flex flex-col gap-6 lg:gap-8">
                        {/* Progress Bar */}
                        <div className="bg-[#1a2836] p-6 rounded-xl">
                            <div className="flex flex-col gap-3">
                                <div className="flex gap-6 justify-between items-center">
                                    <p className="text-white text-base font-medium leading-normal">Current Status</p>
                                    <span className="inline-flex items-center rounded-full bg-[#258cf4]/20 px-3 py-1 text-sm font-medium text-[#258cf4] capitalize">
                                        {delivery.status.replace(/_/g, ' ').toLowerCase()}
                                    </span>
                                </div>
                                <div className="rounded-full bg-[#314d68] h-2">
                                    <div className="h-2 rounded-full bg-[#258cf4] transition-all duration-500" style={{ width: `${getProgress(delivery.status)}%` }}></div>
                                </div>
                            </div>
                        </div>

                        {/* Customer Info */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
                            <div className="bg-[#1a2836] p-6 rounded-xl">
                                <h3 className="text-white text-lg font-bold mb-4">Sender Details</h3>
                                <div className="space-y-3 text-sm">
                                    <p className="text-[#90adcb]"><span className="font-medium text-white">Name:</span> {delivery.senderName}</p>
                                    <p className="text-[#90adcb]"><span className="font-medium text-white">Address:</span> {delivery.senderAddress}</p>
                                    <p className="text-[#90adcb]"><span className="font-medium text-white">Phone:</span> {delivery.senderPhone}</p>
                                </div>
                            </div>
                            <div className="bg-[#1a2836] p-6 rounded-xl">
                                <h3 className="text-white text-lg font-bold mb-4">Receiver Details</h3>
                                <div className="space-y-3 text-sm">
                                    <p className="text-[#90adcb]"><span className="font-medium text-white">Name:</span> {delivery.receiverName}</p>
                                    <p className="text-[#90adcb]"><span className="font-medium text-white">Address:</span> {delivery.receiverAddress}</p>
                                    <p className="text-[#90adcb]"><span className="font-medium text-white">Phone:</span> {delivery.receiverPhone}</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Right Column: Status Management Form */}
                    <div className="bg-[#1a2836] p-6 rounded-xl flex flex-col">
                        <h2 className="text-white text-[22px] font-bold leading-tight tracking-[-0.015em] mb-1">
                            Update Status
                        </h2>
                        <form onSubmit={handleSubmit} className="grow flex flex-col gap-6 mt-6">
                            <div>
                                <label className="block text-sm font-medium text-white mb-2" htmlFor="status-update">
                                    New Status
                                </label>
                                <select
                                    className="w-full bg-[#101922] border border-[#314d68] text-white rounded-lg focus:ring-[#258cf4] focus:border-[#258cf4] p-3 focus:outline-none"
                                    id="status-update"
                                    value={status}
                                    onChange={(e) => setStatus(e.target.value)}
                                    required
                                >
                                    {STATUS_OPTIONS.map(opt => (
                                        <option key={opt.value} value={opt.value}>{opt.label}</option>
                                    ))}
                                </select>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-white mb-2" htmlFor="location">
                                    Current Location
                                </label>
                                <input
                                    className="w-full bg-[#101922] border border-[#314d68] text-white rounded-lg focus:ring-[#258cf4] focus:border-[#258cf4] p-3 focus:outline-none placeholder:text-[#5b728a]"
                                    id="location"
                                    type="text"
                                    placeholder="e.g. Warehouse B, New York"
                                    value={location}
                                    onChange={(e) => setLocation(e.target.value)}
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-white mb-2" htmlFor="internal-notes">
                                    Description / Notes
                                </label>
                                <textarea
                                    className="w-full bg-[#101922] border border-[#314d68] text-white rounded-lg focus:ring-[#258cf4] focus:border-[#258cf4] placeholder:text-[#5b728a] p-3 focus:outline-none"
                                    id="internal-notes"
                                    placeholder="e.g. Package arrived at facility"
                                    rows={4}
                                    value={notes}
                                    onChange={(e) => setNotes(e.target.value)}
                                />
                            </div>
                            <div className="mt-auto flex flex-col sm:flex-row gap-3">
                                <button
                                    type="submit"
                                    disabled={submitting}
                                    className="w-full flex items-center justify-center gap-2 px-4 py-2.5 text-sm font-semibold text-white bg-[#258cf4] rounded-lg hover:bg-[#258cf4]/90 disabled:opacity-50"
                                >
                                    {submitting && <Loader2 className="w-4 h-4 animate-spin" />}
                                    Update Status
                                </button>
                                <Link
                                    href={`/dashboard/shipments/${encodeURIComponent(delivery.deliveryId)}`}
                                    className="w-full px-4 py-2.5 text-sm font-semibold text-white bg-transparent border border-[#314d68] rounded-lg hover:bg-[#314d68]/50 text-center"
                                >
                                    Cancel
                                </Link>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </main>
    )
}
