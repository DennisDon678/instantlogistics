
function Technology() {
    return (
        <div className='mt-10'>
            <div className="w-2xl flex flex-col gap-2">
                <h1 className='text-2xl font-semibold capitalize'>The Technology behind your delivery</h1>
                <p className='text-gray-500'>Our innovative infrastucture combines AI, autonomous systems, and a quantum-secured network to ensure your packages arrive faster and safer than ever before.</p>
            </div>
            <div className=" bg-center bg-cover bg-no-repeat aspect-video mt-8 rounded-lg" 
            style={{
                backgroundImage: "url('/map.png')"
            }}
            ></div>
        </div>
    )
}

export default Technology