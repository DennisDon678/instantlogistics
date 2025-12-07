'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function DeliveryForm() {
    const router = useRouter()
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')
    const [success, setSuccess] = useState(false)

    const [formData, setFormData] = useState({
        senderName: '',
        senderAddress: '',
        senderPhone: '',
        senderEmail: '',
        receiverName: '',
        receiverAddress: '',
        receiverPhone: '',
        receiverEmail: '',
        scheduledDate: new Date().toISOString().split('T')[0],
    })

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setLoading(true)
        setError('')
        setSuccess(false)

        try {
            const res = await fetch('/api/admin/shipments', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            })

            if (!res.ok) {
                throw new Error('Failed to create shipment')
            }

            setSuccess(true)
            setFormData({
                senderName: '',
                senderAddress: '',
                senderPhone: '',
                senderEmail: '',
                receiverName: '',
                receiverAddress: '',
                receiverPhone: '',
                receiverEmail: '',
                scheduledDate: new Date().toISOString().split('T')[0],
            })
            router.refresh() // Refresh server components to show new data
        } catch (err) {
            setError('An error occurred. Please try again.')
        } finally {
            setLoading(false)
        }
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        })
    }

    return (
        <div className="flex flex-col gap-6 bg-[#1A1D21] p-6 rounded-xl">
            <form className="flex flex-col gap-6" onSubmit={handleSubmit}>
                <div>
                    <h3 className="text-white text-lg font-bold leading-tight tracking-[-0.015em] pb-2">
                        Create New Delivery
                    </h3>
                    {error && <p className="text-red-400 text-sm mb-4">{error}</p>}
                    {success && <p className="text-green-400 text-sm mb-4">Shipment created successfully!</p>}

                    <div className="flex flex-col gap-4 mt-4">
                        {/* Sender Details */}
                        <div>
                            <h4 className="text-[#90adcb] text-sm font-medium leading-normal pb-3">
                                SENDER DETAILS
                            </h4>
                            <div className="flex flex-col gap-4">
                                <label className="flex flex-col flex-1">
                                    <p className="text-white text-base font-medium leading-normal pb-2">
                                        Full Name
                                    </p>
                                    <input
                                        name="senderName"
                                        value={formData.senderName}
                                        onChange={handleChange}
                                        required
                                        className="flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-lg text-white focus:outline-0 focus:ring-0 border border-[#314d68] bg-[#182634] focus:border-[#258cf4] h-14 placeholder:text-[#90adcb] p-[15px] text-base font-normal leading-normal"
                                        placeholder="Enter sender's full name"
                                    />
                                </label>
                                <label className="flex flex-col flex-1">
                                    <p className="text-white text-base font-medium leading-normal pb-2">
                                        Full Address
                                    </p>
                                    <textarea
                                        name="senderAddress"
                                        value={formData.senderAddress}
                                        onChange={handleChange}
                                        required
                                        className="flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-lg text-white focus:outline-0 focus:ring-0 border border-[#314d68] bg-[#182634] focus:border-[#258cf4] min-h-24 placeholder:text-[#90adcb] p-[15px] text-base font-normal leading-normal"
                                        placeholder="Enter sender's address"
                                    />
                                </label>
                                <div className="grid grid-cols-2 gap-4">
                                    <label className="flex flex-col flex-1">
                                        <p className="text-white text-base font-medium leading-normal pb-2">
                                            Phone
                                        </p>
                                        <input
                                            name="senderPhone"
                                            value={formData.senderPhone}
                                            onChange={handleChange}
                                            required
                                            className="flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-lg text-white focus:outline-0 focus:ring-0 border border-[#314d68] bg-[#182634] focus:border-[#258cf4] h-14 placeholder:text-[#90adcb] p-[15px] text-base font-normal leading-normal"
                                            placeholder="Sender's Phone"
                                        />
                                    </label>
                                    <label className="flex flex-col flex-1">
                                        <p className="text-white text-base font-medium leading-normal pb-2">
                                            Email
                                        </p>
                                        <input
                                            name="senderEmail"
                                            type="email"
                                            value={formData.senderEmail}
                                            onChange={handleChange}
                                            required
                                            className="flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-lg text-white focus:outline-0 focus:ring-0 border border-[#314d68] bg-[#182634] focus:border-[#258cf4] h-14 placeholder:text-[#90adcb] p-[15px] text-base font-normal leading-normal"
                                            placeholder="Sender's Email"
                                        />
                                    </label>
                                </div>
                            </div>
                        </div>

                        {/* Receiver Details */}
                        <div>
                            <h4 className="text-[#90adcb] text-sm font-medium leading-normal pb-3">
                                RECEIVER DETAILS
                            </h4>
                            <div className="flex flex-col gap-4">
                                <label className="flex flex-col flex-1">
                                    <p className="text-white text-base font-medium leading-normal pb-2">
                                        Full Name
                                    </p>
                                    <input
                                        name="receiverName"
                                        value={formData.receiverName}
                                        onChange={handleChange}
                                        required
                                        className="flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-lg text-white focus:outline-0 focus:ring-0 border border-[#314d68] bg-[#182634] focus:border-[#258cf4] h-14 placeholder:text-[#90adcb] p-[15px] text-base font-normal leading-normal"
                                        placeholder="Enter receiver's full name"
                                    />
                                </label>
                                <label className="flex flex-col flex-1">
                                    <p className="text-white text-base font-medium leading-normal pb-2">
                                        Full Address
                                    </p>
                                    <textarea
                                        name="receiverAddress"
                                        value={formData.receiverAddress}
                                        onChange={handleChange}
                                        required
                                        className="flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-lg text-white focus:outline-0 focus:ring-0 border border-[#314d68] bg-[#182634] focus:border-[#258cf4] min-h-24 placeholder:text-[#90adcb] p-[15px] text-base font-normal leading-normal"
                                        placeholder="Enter receiver's address"
                                    />
                                </label>
                                <div className="grid grid-cols-2 gap-4">
                                    <label className="flex flex-col flex-1">
                                        <p className="text-white text-base font-medium leading-normal pb-2">
                                            Phone
                                        </p>
                                        <input
                                            name="receiverPhone"
                                            value={formData.receiverPhone}
                                            onChange={handleChange}
                                            required
                                            className="flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-lg text-white focus:outline-0 focus:ring-0 border border-[#314d68] bg-[#182634] focus:border-[#258cf4] h-14 placeholder:text-[#90adcb] p-[15px] text-base font-normal leading-normal"
                                            placeholder="Receiver's Phone"
                                        />
                                    </label>
                                    <label className="flex flex-col flex-1">
                                        <p className="text-white text-base font-medium leading-normal pb-2">
                                            Email
                                        </p>
                                        <input
                                            name="receiverEmail"
                                            type="email"
                                            value={formData.receiverEmail}
                                            onChange={handleChange}
                                            required
                                            className="flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-lg text-white focus:outline-0 focus:ring-0 border border-[#314d68] bg-[#182634] focus:border-[#258cf4] h-14 placeholder:text-[#90adcb] p-[15px] text-base font-normal leading-normal"
                                            placeholder="Receiver's Email"
                                        />
                                    </label>
                                </div>
                            </div>
                        </div>

                        {/* Schedule Date */}
                        <div>
                            <label className="flex flex-col flex-1">
                                <p className="text-white text-base font-medium leading-normal pb-2">
                                    Scheduled Date
                                </p>
                                <input
                                    name="scheduledDate"
                                    type="date"
                                    value={formData.scheduledDate}
                                    onChange={handleChange}
                                    required
                                    className="flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-lg text-white focus:outline-0 focus:ring-0 border border-[#314d68] bg-[#182634] focus:border-[#258cf4] h-14 placeholder:text-[#90adcb] p-[15px] text-base font-normal leading-normal"
                                />
                            </label>
                        </div>
                    </div>
                </div>
                <button
                    className="flex w-full cursor-pointer items-center justify-center overflow-hidden rounded-lg h-12 px-4 bg-[#258cf4] text-white text-base font-bold leading-normal tracking-[0.015em] hover:bg-[#258cf4]/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    type="submit"
                    disabled={loading}
                >
                    <span>{loading ? 'Creating...' : 'Schedule Delivery'}</span>
                </button>
            </form>
        </div>
    )
}
