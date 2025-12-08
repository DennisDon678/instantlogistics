'use client'

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { useParams, useRouter } from 'next/navigation'
import { Route, Warehouse, Package, Save, X, Loader2 } from 'lucide-react'

interface DeliveryHistory {
    id: string
    status: string
    location: string
    description: string
    timestamp: string
}

interface Delivery {
    id: string
    deliveryId: string
    status: string
    senderName: string
    senderAddress: string
    senderEmail: string
    senderPhone: string
    receiverName: string
    receiverAddress: string
    receiverEmail: string
    receiverPhone: string
    scheduledDate: string
    history: DeliveryHistory[]
}

export default function DeliveryDetailPage() {
    const params = useParams()
    const router = useRouter()
    const id = params?.id as string

    const [delivery, setDelivery] = useState<Delivery | null>(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState('')
    const [isEditing, setIsEditing] = useState(false)
    const [saving, setSaving] = useState(false)

    // Form state
    const [formData, setFormData] = useState<Partial<Delivery>>({})

    useEffect(() => {
        if (id) {
            fetchDelivery()
        }
    }, [id])

    const fetchDelivery = async () => {
        try {
            setLoading(true)
            const res = await fetch(`/api/deliveries/${id}`)
            if (!res.ok) throw new Error('Failed to fetch delivery')
            const data = await res.json()
            setDelivery(data)
            setFormData(data)
        } catch (err) {
            setError('Failed to load delivery details')
            console.error(err)
        } finally {
            setLoading(false)
        }
    }

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target
        setFormData(prev => ({ ...prev, [name]: value }))
    }

    const handleSave = async () => {
        if (!delivery) return

        try {
            setSaving(true)
            const res = await fetch(`/api/deliveries/${delivery.id}`, { // Use internal ID for update if needed, or deliveryId depending on API. Route uses params.id which matches what we pass.
                // Wait, the API route uses `where: { id: params.id }`. 
                // But `fetchDelivery` used `params.id` (from URL). 
                // If URL is `dashboard/shipments/#57FGN4`, then `id` is `#57FGN4`.
                // The API's GET handles `OR: [{id}, {deliveryId}]`.
                // The API's PUT uses `where: { id: params.id }`. 
                // DOES PUT handle deliveryId? checking route.ts... 
                // `where: { id: params.id }`. NO. It strictly looks for `id` (UUID).
                // So we MUST call PUT with the UUID (`delivery.id`), not the route param `id` if it's a deliveryId.
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData)
            })

            if (!res.ok) throw new Error('Failed to update delivery')

            const updatedDelivery = await res.json()
            setDelivery(updatedDelivery)
            setIsEditing(false)
            router.refresh()
        } catch (err) {
            console.error(err)
            alert('Failed to save changes')
        } finally {
            setSaving(false)
        }
    }

    if (loading) return <div className="flex-1 p-8 text-white">Loading...</div>
    if (error) return <div className="flex-1 p-8 text-red-500">{error}</div>
    if (!delivery) return <div className="flex-1 p-8 text-white">Delivery not found</div>

    return (
        <main className="flex-1 p-4 md:p-6 lg:p-8">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <header className="flex flex-wrap items-center justify-between gap-4 mb-6">
                    <div>
                        {/* Breadcrumbs */}
                        <div className="flex flex-wrap items-center gap-2">
                            <Link href="/dashboard/shipments" className="text-[#90adcb] text-base font-medium leading-normal hover:text-[#258cf4] transition-colors">
                                Deliveries
                            </Link>
                            <span className="text-[#90adcb] text-base font-medium leading-normal">/</span>
                            <span className="text-white text-base font-medium leading-normal">{delivery.deliveryId}</span>
                        </div>
                        <h2 className="text-2xl md:text-3xl font-bold text-white mt-1">Manage Delivery</h2>
                    </div>

                    <div className="flex gap-3">
                        {isEditing ? (
                            <>
                                <button
                                    onClick={() => setIsEditing(false)}
                                    className="flex items-center gap-2 px-4 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-600 transition-colors"
                                    disabled={saving}
                                >
                                    <X className="w-4 h-4" /> Cancel
                                </button>
                                <button
                                    onClick={handleSave}
                                    className="flex items-center gap-2 px-4 py-2 bg-[#258cf4] text-white rounded-lg hover:bg-[#258cf4]/90 transition-colors"
                                    disabled={saving}
                                >
                                    {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />} Save Changes
                                </button>
                            </>
                        ) : (
                            <Link href={`/dashboard/shipments/${delivery.deliveryId}/status`} className="flex min-w-[84px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-10 px-6 bg-[#258cf4] text-white text-sm font-bold leading-normal tracking-[0.015em] hover:bg-[#258cf4]/90 transition-colors">
                                <span className="truncate">Update Status</span>
                            </Link>
                        )}
                    </div>
                </header>

                {/* Grid Layout */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* Left Column */}
                    <div className="lg:col-span-1 flex flex-col gap-6">
                        {/* Status Card */}
                        <div className="bg-[#192635] p-6 rounded-xl shadow-md">
                            <p className="text-sm font-medium text-[#90adcb] mb-1">Status</p>
                            <div className="flex items-center gap-3">
                                <Route className="text-orange-400 w-8 h-8" />
                                <p className="text-2xl font-bold text-white capitalize">{delivery.status.replace(/_/g, ' ').toLowerCase()}</p>
                            </div>
                            <p className="text-sm text-[#90adcb] mt-2">
                                Scheduled: {new Date(delivery.scheduledDate).toLocaleDateString()}
                            </p>
                        </div>

                        {/* Sender Details Card */}
                        <div className="bg-[#192635] p-6 rounded-xl shadow-md">
                            <div className="flex justify-between items-center mb-4">
                                <h3 className="text-lg font-bold text-white leading-tight tracking-[-0.015em]">Sender Details</h3>
                                {!isEditing && (
                                    <button onClick={() => setIsEditing(true)} className="text-[#258cf4] text-sm font-medium hover:underline">Edit</button>
                                )}
                            </div>
                            <div className="space-y-3 text-sm">
                                {isEditing ? (
                                    <>
                                        <div>
                                            <label className="text-[#90adcb] block text-xs mb-1">Name</label>
                                            <input name="senderName" value={formData.senderName} onChange={handleInputChange} className="w-full bg-[#0f172a] border border-gray-700 rounded p-2 text-white" />
                                        </div>
                                        <div>
                                            <label className="text-[#90adcb] block text-xs mb-1">Address</label>
                                            <input name="senderAddress" value={formData.senderAddress} onChange={handleInputChange} className="w-full bg-[#0f172a] border border-gray-700 rounded p-2 text-white" />
                                        </div>
                                        <div>
                                            <label className="text-[#90adcb] block text-xs mb-1">Email</label>
                                            <input name="senderEmail" value={formData.senderEmail} onChange={handleInputChange} className="w-full bg-[#0f172a] border border-gray-700 rounded p-2 text-white" />
                                        </div>
                                        <div>
                                            <label className="text-[#90adcb] block text-xs mb-1">Phone</label>
                                            <input name="senderPhone" value={formData.senderPhone} onChange={handleInputChange} className="w-full bg-[#0f172a] border border-gray-700 rounded p-2 text-white" />
                                        </div>
                                    </>
                                ) : (
                                    <>
                                        <p className="text-[#90adcb]"><strong className="text-white/90">Name:</strong> {delivery.senderName}</p>
                                        <p className="text-[#90adcb]"><strong className="text-white/90">Address:</strong> {delivery.senderAddress}</p>
                                        <p className="text-[#90adcb]"><strong className="text-white/90">Email:</strong> {delivery.senderEmail}</p>
                                        <p className="text-[#90adcb]"><strong className="text-white/90">Phone:</strong> {delivery.senderPhone}</p>
                                    </>
                                )}
                            </div>
                        </div>

                        {/* Receiver Details Card */}
                        <div className="bg-[#192635] p-6 rounded-xl shadow-md">
                            <div className="flex justify-between items-center mb-4">
                                <h3 className="text-lg font-bold text-white leading-tight tracking-[-0.015em]">Receiver Details</h3>
                                {!isEditing && (
                                    <button onClick={() => setIsEditing(true)} className="text-[#258cf4] text-sm font-medium hover:underline">Edit</button>
                                )}
                            </div>
                            <div className="space-y-3 text-sm">
                                {isEditing ? (
                                    <>
                                        <div>
                                            <label className="text-[#90adcb] block text-xs mb-1">Name</label>
                                            <input name="receiverName" value={formData.receiverName} onChange={handleInputChange} className="w-full bg-[#0f172a] border border-gray-700 rounded p-2 text-white" />
                                        </div>
                                        <div>
                                            <label className="text-[#90adcb] block text-xs mb-1">Address</label>
                                            <input name="receiverAddress" value={formData.receiverAddress} onChange={handleInputChange} className="w-full bg-[#0f172a] border border-gray-700 rounded p-2 text-white" />
                                        </div>
                                        <div>
                                            <label className="text-[#90adcb] block text-xs mb-1">Email</label>
                                            <input name="receiverEmail" value={formData.receiverEmail} onChange={handleInputChange} className="w-full bg-[#0f172a] border border-gray-700 rounded p-2 text-white" />
                                        </div>
                                        <div>
                                            <label className="text-[#90adcb] block text-xs mb-1">Phone</label>
                                            <input name="receiverPhone" value={formData.receiverPhone} onChange={handleInputChange} className="w-full bg-[#0f172a] border border-gray-700 rounded p-2 text-white" />
                                        </div>
                                    </>
                                ) : (
                                    <>
                                        <p className="text-[#90adcb]"><strong className="text-white/90">Name:</strong> {delivery.receiverName}</p>
                                        <p className="text-[#90adcb]"><strong className="text-white/90">Address:</strong> {delivery.receiverAddress}</p>
                                        <p className="text-[#90adcb]"><strong className="text-white/90">Email:</strong> {delivery.receiverEmail}</p>
                                        <p className="text-[#90adcb]"><strong className="text-white/90">Phone:</strong> {delivery.receiverPhone}</p>
                                    </>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Right Column */}
                    <div className="lg:col-span-2 flex flex-col gap-6">
                        {/* Map Card */}
                       

                        {/* Delivery History */}
                        <div className="bg-[#192635] p-6 rounded-xl shadow-md flex-1">
                            <h3 className="text-lg font-bold text-white leading-tight tracking-[-0.015em]">Delivery History</h3>
                            <div className="mt-4 space-y-6">
                                {delivery.history && delivery.history.map((event, index) => (
                                    <div className="flex gap-4" key={event.id || index}>
                                        <div className="flex flex-col items-center">
                                            <div className="flex items-center justify-center size-8 bg-[#258cf4]/20 rounded-full">
                                                <Route className="text-[#258cf4] w-5 h-5" />
                                            </div>
                                            {index !== delivery.history.length - 1 && <div className="w-px h-full bg-gray-700"></div>}
                                        </div>
                                        <div>
                                            <p className="font-bold text-white">{event.status}</p>
                                            <p className="text-sm text-[#90adcb]">Location: {event.location}</p>
                                            <p className="text-xs text-gray-500 mt-1">{new Date(event.timestamp).toLocaleString()}</p>
                                        </div>
                                    </div>
                                ))}
                                {(!delivery.history || delivery.history.length === 0) && (
                                    <p className="text-gray-500">No history available.</p>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    )
}
