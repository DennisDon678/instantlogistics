'use client'

import Link from 'next/link'
import { useState } from 'react'

export default function StatusManagementPage() {
    const [status, setStatus] = useState('')
    const [notes, setNotes] = useState('')

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        console.log('Status update:', { status, notes })
        // Handle status update
    }

    return (
        <main className="flex-1 p-4 md:p-6 lg:p-8 overflow-y-auto">
            <div className="max-w-4xl mx-auto">
                {/* Breadcrumbs */}
                <div className="flex flex-wrap gap-2 mb-6">
                    <Link href="/dashboard/shipments" className="text-[#90adcb] text-base font-medium leading-normal hover:text-white">
                        Deliveries
                    </Link>
                    <span className="text-[#90adcb] text-base font-medium leading-normal">/</span>
                    <Link href="/dashboard/shipments/123" className="text-[#90adcb] text-base font-medium leading-normal hover:text-white">
                        Manage Deliveries
                    </Link>
                    <span className="text-[#90adcb] text-base font-medium leading-normal">/</span>
                    <span className="text-white text-base font-medium leading-normal">TZ-45892</span>
                </div>

                {/* Page Heading */}
                <div className="flex flex-wrap justify-between gap-3 mb-8">
                    <div className="flex min-w-72 flex-col gap-3">
                        <p className="text-white text-2xl md:text-3xl lg:text-4xl font-black leading-tight tracking-[-0.033em]">
                            Delivery #TZ-45892
                        </p>
                        <p className="text-[#90adcb] text-base font-normal leading-normal">
                            Update and manage the delivery status
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
                                    <p className="text-white text-base font-medium leading-normal">Delivery Progress</p>
                                    <span className="inline-flex items-center rounded-full bg-[#258cf4]/20 px-3 py-1 text-sm font-medium text-[#258cf4]">
                                        In Transit
                                    </span>
                                </div>
                                <div className="rounded-full bg-[#314d68] h-2">
                                    <div className="h-2 rounded-full bg-[#258cf4]" style={{ width: '50%' }}></div>
                                </div>
                                <p className="text-[#90adcb] text-sm font-normal leading-normal">Next: Out for Delivery</p>
                            </div>
                        </div>

                        {/* Customer and Route Info */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
                            <div className="bg-[#1a2836] p-6 rounded-xl">
                                <h3 className="text-white text-lg font-bold mb-4">Customer Details</h3>
                                <div className="space-y-3 text-sm">
                                    <p className="text-[#90adcb]">
                                        <span className="font-medium text-white">Name:</span> John Doe
                                    </p>
                                    <p className="text-[#90adcb]">
                                        <span className="font-medium text-white">Address:</span> 123 Future Ave, Neo City, 90210
                                    </p>
                                    <p className="text-[#90adcb]">
                                        <span className="font-medium text-white">Contact:</span> +1 (555) 123-4567
                                    </p>
                                </div>
                            </div>
                            <div className="bg-[#1a2836] p-6 rounded-xl">
                                <h3 className="text-white text-lg font-bold mb-4">Route Information</h3>
                                <div className="space-y-3 text-sm">
                                    <p className="text-[#90adcb]">
                                        <span className="font-medium text-white">Origin:</span> Warehouse A, Sector 7
                                    </p>
                                    <p className="text-[#90adcb]">
                                        <span className="font-medium text-white">Destination:</span> Customer Residence
                                    </p>
                                    <p className="text-[#90adcb]">
                                        <span className="font-medium text-white">Est. Delivery:</span> 24 Dec 2023, 5:00 PM
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Right Column: Status Management */}
                    <div className="bg-[#1a2836] p-6 rounded-xl flex flex-col">
                        <h2 className="text-white text-[22px] font-bold leading-tight tracking-[-0.015em] mb-1">
                            Status Management
                        </h2>
                        <p className="text-[#90adcb] text-sm font-normal mb-6">
                            Last updated: 23 Dec 2023, 11:42 AM by Admin
                        </p>
                        <form onSubmit={handleSubmit} className="flex-grow flex flex-col gap-6">
                            <div>
                                <label className="block text-sm font-medium text-white mb-2" htmlFor="status-update">
                                    Select New Status
                                </label>
                                <select
                                    className="w-full bg-[#101922] border border-[#314d68] text-white rounded-lg focus:ring-[#258cf4] focus:border-[#258cf4] p-3 focus:outline-none"
                                    id="status-update"
                                    name="status"
                                    value={status}
                                    onChange={(e) => setStatus(e.target.value)}
                                >
                                    <option value="">Select a status...</option>
                                    <option value="out-for-delivery">Mark as &apos;Out for Delivery&apos;</option>
                                    <option value="delivered">Mark as &apos;Delivered&apos;</option>
                                    <option value="exception">Flag an Issue / Exception</option>
                                    <option value="delayed">Mark as &apos;Delayed&apos;</option>
                                </select>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-white mb-2" htmlFor="internal-notes">
                                    Internal Notes (Optional)
                                </label>
                                <textarea
                                    className="w-full bg-[#101922] border border-[#314d68] text-white rounded-lg focus:ring-[#258cf4] focus:border-[#258cf4] placeholder:text-[#5b728a] p-3 focus:outline-none"
                                    id="internal-notes"
                                    name="notes"
                                    placeholder="e.g., Recipient requested contactless drop-off"
                                    rows={4}
                                    value={notes}
                                    onChange={(e) => setNotes(e.target.value)}
                                />
                            </div>
                            <div className="mt-auto flex flex-col sm:flex-row gap-3">
                                <button
                                    type="submit"
                                    className="w-full px-4 py-2.5 text-sm font-semibold text-white bg-[#258cf4] rounded-lg hover:bg-[#258cf4]/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-[#1a2836] focus:ring-[#258cf4]"
                                >
                                    Update Status
                                </button>
                                <Link
                                    href="/dashboard/shipments/123"
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
