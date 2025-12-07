import Header from '@/app/_components/landingpage/header'
import { SearchIcon, ToggleLeftIcon } from 'lucide-react'


function Tracking() {
    return (
        <div className="px-10 py-4">
            <Header />
            <div className="mt-5 flex flex-col gap-2">
                <h2 className="text-3xl font-semibold">Track your package</h2>
                <p className="text-gray-400 text-sm">Enter your tracking number below to see the real-time status of your package.</p>
            </div>
            <div className="mt-8 w-full flex flex-row gap-2 justify-between items-center">
                <div className="flex flex-row gap-2 items-center bg-secondary w-[90%] px-4 rounded-md border border-gray-300/10">
                    <SearchIcon className="w-5 h-5 text-gray-500" />
                    <input type="text" placeholder="Enter tracking number" className="w-[99%] p-2 focus:outline-none" />
                </div>
                <button className="p-2 bg-blue-500 text-white rounded capitalize">Track shipment</button>
            </div>

            {/*  Main event*/}
            <div className="mt-5 grid grid-cols-[2fr_1fr] gap-4">
                {/* two sides on large screen */}

                <div className='flex flex-col'>
                    {/* map and details */}
                    <div className="bg-secondary p-6 rounded-md">
                        <h3 className="text-lg font-semibold capitalize">shipment details</h3>
                        <div className="grid grid-cols-2 flex-1 justify-between items-center gap-6 mt-5">
                            <div className="flex flex-col">
                                <p className="text-gray-400 text-sm">Tracking Number</p>
                                <p className="text-lg font-semibold">#123456789</p>
                            </div>
                            <div className="flex flex-col">
                                <p className="text-gray-400 text-sm">Estimated Delivery</p>
                                <p className="text-lg font-semibold">Dec 12, 2025</p>
                            </div>
                            <div className="flex flex-col">
                                <p className="text-gray-400 text-sm">Origin</p>
                                <p className="text-lg font-semibold">New York, NY</p>
                            </div>
                            <div className="flex flex-col">
                                <p className="text-gray-400 text-sm">Destination</p>
                                <p className="text-lg font-semibold">Los Angeles, CA</p>
                            </div>
                            <div className="flex flex-col">
                                <p className="text-gray-400 text-sm">Weight & Dimensions</p>
                                <p className="text-lg font-semibold">10kg / 10cm x 10cm x 10cm</p>
                            </div>
                            <div className="flex flex-col">
                                <p className="text-gray-400 text-sm">Service</p>
                                <p className="text-lg font-semibold">Standard</p>
                            </div>
                        </div>

                        <div className="flex flex-row items-center gap-4 w-[60%] mt-5">
                            <button className="capitalize bg-gray-500/50 py-2 px-4 rounded-md cursor-not-allowed">change Delivery</button>
                            <button className="capitalize bg-gray-500/50 py-2 px-4 rounded-md cursor-not-allowed">request signature</button>
                            <button className="capitalize bg-gray-500/50 py-2 px-4 rounded-md cursor-pointer">view proof</button>
                        </div>
                    </div>

                </div>

                <div className='flex flex-col'>
                    {/* status timeline */}
                    <div className="bg-secondary p-6 rounded-md">
                        <div className="flex flex-row items-center justify-between">
                            <h3 className="text-lg font-semibold capitalize">status timeline</h3>
                            {/* toggle for get updates */}
                            <div className="flex flex-row items-center gap-2">
                                <p className="text-gray-400 text-sm">Get updates</p>
                                <ToggleLeftIcon size={24} />
                            </div>

                        </div>

                        {/* activity and location and time */}
                        <div className="mt-6 space-y-3">
                            {/* Delivered */}
                            <div className="flex gap-3">
                                <div className="flex flex-col items-center">
                                    <div className="w-4 h-6 rounded-full bg-green-500 mt-1"></div>
                                    <div className="w-0.5 h-full bg-gray-700 mt-1"></div>
                                </div>
                                <div className="flex-1 pb-2">
                                    <p className="font-semibold text-white">Delivered</p>
                                    <p className="text-sm text-gray-400">New York, NY</p>
                                    <p className="text-xs text-gray-500">Oct 28, 9:52 AM</p>
                                </div>
                            </div>

                            {/* Out for Delivery */}
                            <div className="flex gap-3">
                                <div className="flex flex-col items-center">
                                    <div className="w-4 h-6 rounded-full bg-yellow-500 mt-1"></div>
                                    <div className="w-0.5 h-full bg-gray-700 mt-1"></div>
                                </div>
                                <div className="flex-1 pb-2">
                                    <p className="font-semibold text-white">Out for Delivery</p>
                                    <p className="text-sm text-gray-400">New York, NY</p>
                                    <p className="text-xs text-gray-500">Oct 28, 8:16 AM</p>
                                </div>
                            </div>

                            {/* Arrived at Local Hub */}
                            <div className="flex gap-3">
                                <div className="flex flex-col items-center">
                                    <div className="w-4 h-6 rounded-full bg-blue-500 mt-1"></div>
                                    <div className="w-0.5 h-full bg-gray-700 mt-1"></div>
                                </div>
                                <div className="flex-1 pb-2">
                                    <p className="font-semibold text-white">Arrived at Local Hub</p>
                                    <p className="text-sm text-gray-400">New York, NY</p>
                                    <p className="text-xs text-gray-500">Oct 28, 2:48 AM</p>
                                </div>
                            </div>

                            {/* In Transit */}
                            <div className="flex gap-3">
                                <div className="flex flex-col items-center">
                                    <div className="w-4 h-6 rounded-full bg-blue-500 mt-1"></div>
                                    <div className="w-0.5 h-full bg-gray-700 mt-1"></div>
                                </div>
                                <div className="flex-1 pb-2">
                                    <p className="font-semibold text-white">In Transit</p>
                                    <p className="text-sm text-gray-400">Departed from Chicago, IL</p>
                                    <p className="text-xs text-gray-500">Oct 26, 11:05 PM</p>
                                </div>
                            </div>

                            {/* Label Created */}
                            <div className="flex gap-3">
                                <div className="flex flex-col items-center">
                                    <div className="w-4 h-6 rounded-full bg-blue-500 mt-1"></div>
                                    <div className="w-0.5 h-full bg-gray-700 mt-1"></div>
                                </div>
                                <div className="flex-1">
                                    <p className="font-semibold text-white">Label Created</p>
                                    <p className="text-sm text-gray-400">Los Angeles, CA</p>
                                    <p className="text-xs text-gray-500">Oct 24, 3:00 PM</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Tracking