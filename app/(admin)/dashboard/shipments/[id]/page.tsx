import Link from 'next/link'
import { Route, Warehouse, Package } from 'lucide-react'

export default function DeliveryDetailPage() {
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
                            <span className="text-white text-base font-medium leading-normal">#XYZ-123-4567</span>
                        </div>
                        <h2 className="text-2xl md:text-3xl font-bold text-white mt-1">Manage Delivery</h2>
                    </div>
                    <Link href="/dashboard/shipments/123/status" className="flex min-w-[84px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-10 px-6 bg-[#258cf4] text-white text-sm font-bold leading-normal tracking-[0.015em] hover:bg-[#258cf4]/90 transition-colors">
                        <span className="truncate">Update Status</span>
                    </Link>
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
                                <p className="text-2xl font-bold text-white">In Transit</p>
                            </div>
                            <p className="text-sm text-[#90adcb] mt-2">Updated 5 minutes ago</p>
                            <div className="mt-4 w-full bg-gray-700 rounded-full h-2">
                                <div className="bg-orange-400 h-2 rounded-full" style={{ width: '60%' }}></div>
                            </div>
                        </div>

                        {/* Sender Details Card */}
                        <div className="bg-[#192635] p-6 rounded-xl shadow-md">
                            <div className="flex justify-between items-center">
                                <h3 className="text-lg font-bold text-white leading-tight tracking-[-0.015em]">Sender Details</h3>
                                <button className="text-[#258cf4] text-sm font-medium hover:underline">Edit</button>
                            </div>
                            <div className="mt-4 space-y-3 text-sm">
                                <p className="text-[#90adcb]">
                                    <strong className="text-white/90">Name:</strong> John Doe
                                </p>
                                <p className="text-[#90adcb]">
                                    <strong className="text-white/90">Address:</strong> 123 Quantum St, Cybertown, 98765
                                </p>
                                <p className="text-[#90adcb]">
                                    <strong className="text-white/90">Email:</strong> john.doe@example.com
                                </p>
                                <p className="text-[#90adcb]">
                                    <strong className="text-white/90">Phone:</strong> +1 (555) 123-4567
                                </p>
                            </div>
                        </div>

                        {/* Receiver Details Card */}
                        <div className="bg-[#192635] p-6 rounded-xl shadow-md">
                            <div className="flex justify-between items-center">
                                <h3 className="text-lg font-bold text-white leading-tight tracking-[-0.015em]">Receiver Details</h3>
                                <button className="text-[#258cf4] text-sm font-medium hover:underline">Edit</button>
                            </div>
                            <div className="mt-4 space-y-3 text-sm">
                                <p className="text-[#90adcb]">
                                    <strong className="text-white/90">Name:</strong> Jane Smith
                                </p>
                                <p className="text-[#90adcb]">
                                    <strong className="text-white/90">Address:</strong> 456 Nexus Ave, Neocity, 12345
                                </p>
                                <p className="text-[#90adcb]">
                                    <strong className="text-white/90">Email:</strong> jane.smith@example.com
                                </p>
                                <p className="text-[#90adcb]">
                                    <strong className="text-white/90">Phone:</strong> +1 (555) 987-6543
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Right Column */}
                    <div className="lg:col-span-2 flex flex-col gap-6">
                        {/* Map Card */}
                        <div className="bg-[#192635] p-4 rounded-xl shadow-md h-[400px]">
                            <div
                                className="w-full h-full bg-center bg-no-repeat bg-cover rounded-lg"
                                style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuCwlUBebabX0eLqRIf3WNDxBNLN17QZ1Wb2pCla8Mk-hk3DJk3gthOq_WoaOXNV0hk28pUxflbJYG_HiW0FtT54Ipqr9FHzde3d0aD9RkVtZ8FpVdGDkBPlWwTOT5lu94_U6dZcBxz_ZPmPtke_pXZaekE7cFunAbAIikjMCvCRbRkrE2IAW7bYvO05LyUnKFo78KM8TLH9-wwyx1-8qpciX6tBtOqifHRJARyIsWZ5RtLlkkKD70CG5dqIJ41XNDgNyVbmoZS60a0")' }}
                            >
                            </div>
                        </div>

                        {/* Delivery History */}
                        <div className="bg-[#192635] p-6 rounded-xl shadow-md flex-1">
                            <h3 className="text-lg font-bold text-white leading-tight tracking-[-0.015em]">Delivery History</h3>
                            <div className="mt-4 space-y-6">
                                {/* Timeline Item 1 */}
                                <div className="flex gap-4">
                                    <div className="flex flex-col items-center">
                                        <div className="flex items-center justify-center size-8 bg-[#258cf4]/20 rounded-full">
                                            <Route className="text-[#258cf4] w-5 h-5" />
                                        </div>
                                        <div className="w-px h-full bg-gray-700"></div>
                                    </div>
                                    <div>
                                        <p className="font-bold text-white">Package In Transit</p>
                                        <p className="text-sm text-[#90adcb]">Location: Neocity Distribution Hub</p>
                                        <p className="text-xs text-gray-500 mt-1">October 26, 2023, 08:15 AM</p>
                                    </div>
                                </div>

                                {/* Timeline Item 2 */}
                                <div className="flex gap-4">
                                    <div className="flex flex-col items-center">
                                        <div className="flex items-center justify-center size-8 bg-[#258cf4]/20 rounded-full">
                                            <Warehouse className="text-[#258cf4] w-5 h-5" />
                                        </div>
                                        <div className="w-px h-full bg-gray-700"></div>
                                    </div>
                                    <div>
                                        <p className="font-bold text-white">Arrived at Hub</p>
                                        <p className="text-sm text-[#90adcb]">Location: Cybertown Central Post</p>
                                        <p className="text-xs text-gray-500 mt-1">October 25, 2023, 11:30 PM</p>
                                    </div>
                                </div>

                                {/* Timeline Item 3 */}
                                <div className="flex gap-4">
                                    <div className="flex flex-col items-center">
                                        <div className="flex items-center justify-center size-8 bg-[#258cf4]/20 rounded-full">
                                            <Package className="text-[#258cf4] w-5 h-5" />
                                        </div>
                                    </div>
                                    <div>
                                        <p className="font-bold text-white">Label Created</p>
                                        <p className="text-sm text-[#90adcb]">Package information sent to logistics partner.</p>
                                        <p className="text-xs text-gray-500 mt-1">October 25, 2023, 02:00 PM</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    )
}
