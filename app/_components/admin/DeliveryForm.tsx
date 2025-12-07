'use client'

import { useState } from 'react'

export default function DeliveryForm() {
    const [formData, setFormData] = useState({
        senderName: '',
        senderAddress: '',
        senderPhone: '',
        senderEmail: '',
        receiverName: '',
        receiverAddress: '',
    })

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        // Handle form submission
        console.log('Form submitted:', formData)
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
                                        className="flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-lg text-white focus:outline-0 focus:ring-0 border border-[#314d68] bg-[#182634] focus:border-[#258cf4] min-h-24 placeholder:text-[#90adcb] p-[15px] text-base font-normal leading-normal"
                                        placeholder="Enter receiver's address"
                                    />
                                </label>
                            </div>
                        </div>
                    </div>
                </div>
                <button
                    className="flex w-full cursor-pointer items-center justify-center overflow-hidden rounded-lg h-12 px-4 bg-[#258cf4] text-white text-base font-bold leading-normal tracking-[0.015em] hover:bg-[#258cf4]/90 transition-colors"
                    type="submit"
                >
                    <span>Schedule Delivery</span>
                </button>
            </form>
        </div>
    )
}
