'use client'
import { SearchIcon } from "lucide-react"
import { useRouter } from "next/navigation"
import { useState } from "react";

function Hero() {
    const router = useRouter();
    const [trackingId, setTrackingId] = useState('');

    const handleTrack = (trackingId: string) => {
        if (!trackingId) return;
        // redirect to tracking page
        router.push("/package/" + trackingId);
    }

    return (
        <div className='min-h-[60vh] md:min-h-[480px] bg-cover bg-center flex flex-col justify-center items-center gap-4 rounded-lg p-4 md:p-0'
            style={{
                backgroundImage: "linear-gradient(rgba(15, 23, 42, 0.8) 0%, rgba(15, 23, 42, 0.6) 100%), url('/hero.png')"
            }}
        >
            <h1 className="text-3xl md:text-5xl lg:text-6xl font-semibold text-white text-center">Logistics, Reimagined for Tomorrow.</h1>
            <p className="text-gray-400 text-center text-sm md:text-base px-4">Experience the future of delivery with unparalleled speed, efficiency, and cutting-edge technology.</p>

            {/* tracking search */}
            <div className="w-full max-w-xl mt-8 flex flex-col md:flex-row items-stretch md:items-center gap-2 bg-primary p-2 rounded-xl border border-white/20">
                {/* icon - hidden on small screens inside input container or kept? Let's keep it consistent. 
                    Actually, if flex-col, the icon might look weird alone if not carefully placed.
                    Let's update the structure slightly to keep icon with input if possible, 
                    OR just stack the button below the input group.
                */}
                <div className="flex-1 flex items-center gap-2 px-2">
                    <SearchIcon className="text-gray-400" />
                    <input
                        type="text"
                        placeholder="Enter tracking number"
                        className="w-full px-2 py-2 placeholder:text-white/50 text-white focus:outline-none bg-transparent"
                        onChange={(e) => setTrackingId(e.target.value)}
                        value={trackingId}
                    />
                </div>
                {/* button */}
                <button className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 w-full md:w-auto" onClick={() => handleTrack(trackingId)}>Track</button>
            </div>
        </div>
    )
}

export default Hero