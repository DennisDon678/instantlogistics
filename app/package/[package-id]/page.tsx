'use client'

import Header from '@/app/_components/landingpage/header'
import { SearchIcon, ToggleLeftIcon } from 'lucide-react'
import { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'

// Define types
interface DeliveryHistory {
    status: string;
    location: string;
    timestamp: string;
    description: string;
}

interface Delivery {
    id: string;
    deliveryId: string;
    status: string;
    senderName: string;
    senderAddress: string;
    receiverName: string;
    receiverAddress: string;
    scheduledDate: string;
    history: DeliveryHistory[];
}

function Tracking() {
    const params = useParams();
    const trackingId = params?.['package-id'] as string;

    const [delivery, setDelivery] = useState<Delivery | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [searchId, setSearchId] = useState(trackingId);

    useEffect(() => {
        if (trackingId) {
            fetchDelivery(trackingId);
        } else {
            setLoading(false);
        }
    }, [trackingId]);

    const fetchDelivery = async (id: string) => {
        try {
            setLoading(true);
            setError('');

            const res = await fetch(`/api/deliveries/${id}`);

            if (!res.ok) {
                if (res.status === 404) throw new Error('Tracking number not found');
                throw new Error('Failed to fetch delivery details');
            }

            const data = await res.json();
            setDelivery(data);
        } catch (err: any) {
            setError(err.message || 'An error occurred');
            setDelivery(null);
        } finally {
            setLoading(false);
        }
    }

    const handleSearch = () => {
        if (searchId) {
            window.location.href = `/package/${searchId}`;
        }
    }

    return (
        <div className="px-10 py-4">
            <Header />
            <div className="mt-5 flex flex-col gap-2">
                <h2 className="text-2xl md:text-3xl font-semibold">Track your package</h2>
                <p className="text-gray-400 text-sm">Enter your tracking number below to see the real-time status of your package.</p>
            </div>

            {/* Search Bar */}
            <div className="mt-8 w-full flex flex-col md:flex-row gap-2 justify-between items-stretch md:items-center">
                <div className="flex flex-row gap-2 items-center bg-secondary w-full md:w-[90%] px-4 rounded-md border border-gray-300/10">
                    <SearchIcon className="w-5 h-5 text-gray-500" />
                    <input
                        type="text"
                        placeholder="Enter tracking number"
                        className="w-full p-2 focus:outline-none bg-transparent text-white"
                        value={searchId}
                        onChange={(e) => setSearchId(e.target.value)}
                        onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
                    />
                </div>
                <button
                    className="p-2 bg-blue-500 text-white rounded capitalize hover:bg-blue-600 transition-colors w-full md:w-auto"
                    onClick={handleSearch}
                >
                    Track shipment
                </button>
            </div>

            {/* Content Area */}
            <div className="mt-5">
                {loading && (
                    <div className="flex justify-center items-center py-20">
                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
                    </div>
                )}

                {/* Show error only if not loading */}
                {!loading && error && (
                    <div className="bg-red-500/10 border border-red-500/50 text-red-500 p-4 rounded-md text-center">
                        {error}
                    </div>
                )}

                {/* Show content only if not loading and no error and delivery exists */}
                {!loading && !error && delivery && (
                    <div className="grid grid-cols-1 md:grid-cols-[2fr_1fr] gap-4">
                        {/* Shipment Details */}
                        <div className='flex flex-col'>
                            <div className="bg-secondary p-6 rounded-md">
                                <h3 className="text-lg font-semibold capitalize">shipment details</h3>
                                <div className="grid grid-cols-1 md:grid-cols-2 flex-1 justify-between items-center gap-6 mt-5">
                                    <div className="flex flex-col">
                                        <p className="text-gray-400 text-sm">Tracking Number</p>
                                        <p className="text-lg font-semibold">{delivery.deliveryId}</p>
                                    </div>
                                    <div className="flex flex-col">
                                        <p className="text-gray-400 text-sm">Estimated Delivery</p>
                                        <p className="text-lg font-semibold">{new Date(delivery.scheduledDate).toLocaleDateString()}</p>
                                    </div>
                                    <div className="flex flex-col">
                                        <p className="text-gray-400 text-sm">Sender</p>
                                        <p className="text-lg font-semibold truncate max-w-[200px]" title={delivery.senderAddress}>{delivery.senderAddress}</p>
                                    </div>
                                    <div className="flex flex-col">
                                        <p className="text-gray-400 text-sm">Destination</p>
                                        <p className="text-lg font-semibold truncate max-w-[200px]" title={delivery.receiverAddress}>{delivery.receiverAddress}</p>
                                    </div>
                                    <div className="flex flex-col">
                                        <p className="text-gray-400 text-sm">Status</p>
                                        <p className="text-lg font-semibold capitalize">{delivery.status.replace(/_/g, ' ').toLowerCase()}</p>
                                    </div>
                                    <div className="flex flex-col">
                                        <p className="text-gray-400 text-sm">Service</p>
                                        <p className="text-lg font-semibold">Standard</p>
                                    </div>
                                </div>

                                <div className="flex flex-row items-center gap-4 w-full md:w-[60%] mt-5 flex-wrap">
                                    <button className="capitalize bg-gray-500/50 py-2 px-4 rounded-md cursor-not-allowed text-sm">change Delivery</button>
                                    <button className="capitalize bg-gray-500/50 py-2 px-4 rounded-md cursor-not-allowed text-sm">request signature</button>
                                    <button className="capitalize bg-gray-500/50 py-2 px-4 rounded-md cursor-pointer text-sm">view proof</button>
                                </div>
                            </div>
                        </div>

                        {/* Status Timeline */}
                        <div className='flex flex-col'>
                            <div className="bg-secondary p-6 rounded-md h-full">
                                <div className="flex flex-row items-center justify-between">
                                    <h3 className="text-lg font-semibold capitalize">status timeline</h3>
                                    <div className="flex flex-row items-center gap-2">
                                        <p className="text-gray-400 text-sm">Get updates</p>
                                        <ToggleLeftIcon size={24} className="cursor-pointer" />
                                    </div>
                                </div>

                                <div className="mt-6 space-y-3">
                                    {delivery.history && delivery.history.map((event, index) => (
                                        <div className="flex gap-3" key={index}>
                                            <div className="flex flex-col items-center">
                                                <div className={`w-4 h-6 rounded-full mt-1 ${index === 0 ? 'bg-green-500' : 'bg-blue-500'}`}></div>
                                                <div className="w-0.5 h-full bg-gray-700 mt-1"></div>
                                            </div>
                                            <div className="flex-1 pb-2">
                                                <p className="font-semibold text-white">{event.status}</p>
                                                <p className="text-sm text-gray-400">{event.location}</p>
                                                <p className="text-xs text-gray-500">
                                                    {new Date(event.timestamp).toLocaleString('en-US', {
                                                        month: 'short', day: 'numeric', hour: 'numeric', minute: 'numeric'
                                                    })}
                                                </p>
                                                {event.description && (
                                                    <p className="text-xs text-gray-500 mt-1 italic">{event.description}</p>
                                                )}
                                            </div>
                                        </div>
                                    ))}
                                    {(!delivery.history || delivery.history.length === 0) && (
                                        <p className="text-gray-400 italic">No history available.</p>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}

export default Tracking