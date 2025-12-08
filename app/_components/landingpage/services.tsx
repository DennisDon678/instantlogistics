import { BotIcon, EarthIcon, RouteIcon } from "lucide-react"

const services = [
    {
        title: "AI-Powered Routing",
        description: "Intelligent algorithms optimize delivery routes in real-time, avoiding delays and reducing transit time.",
        icon: <RouteIcon />
    },
    {
        title: "Autonomous Drone Delivery",
        description: "Swift, secure, and eco-friendly delivery for last-mile logistics, reaching even the most remote locations.",
        icon: <BotIcon />
    },
    {
        title: "Global Quantum Network",
        description: "A hyper-secure network that protects your shipment's data from origin to destination with next-generation encryption.",
        icon: <EarthIcon />
    },
]

function Services() {
    return (
        <div className="flex flex-col gap-4" id="services">
            {/* title */}
            <h2 className='text-xl font-semibold'>Our Advanced Services</h2>
            {/* service list */}
            <div className="flex flex-col md:flex-row gap-3">
                {services.map((service, index) => (
                    <div key={index} className="flex flex-col gap-2 border border-gray-400/20 p-4 rounded-lg">
                        <div className="p-4 bg-primary rounded-lg text-blue-600">
                            {service.icon}
                        </div>
                        <h3 className="font-semibold">{service.title}</h3>
                        <p className="text-gray-500">{service.description}</p>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Services