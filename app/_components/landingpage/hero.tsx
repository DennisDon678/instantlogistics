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
        <div className='min-h-[480px] bg-cover bg-center flex flex-col justify-center items-center gap-4 rounded-lg'
            style={{
                backgroundImage: "linear-gradient(rgba(15, 23, 42, 0.8) 0%, rgba(15, 23, 42, 0.6) 100%), url('/hero.png')"
            }}
        >
            <h1 className="text-5xl font-semibold text-white">Logistics, Reimagined for Tomorrow.</h1>
            <p className="text-gray-400">Experience the future of delivery with unparalleled speed, efficiency, and cutting-edge technology.</p>

            {/* tracking search */}
            <div className="w-full max-w-xl mt-8 flex items-center gap-2 bg-primary p-2 rounded-xl border border-white/20">
                {/* icon */}
                <SearchIcon />
                {/* input */}
                <input type="text" placeholder="Enter tracking number" className="w-full px-4 py-2 placeholder:text-white/50 text-white focus:outline-none" onChange={(e) => setTrackingId(e.target.value)} value={trackingId}/>
                {/* button */}
                <button className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600" onClick={() => handleTrack(trackingId)}>Track</button>
            </div>
        </div>
    )
}

export default Hero