import { RocketIcon } from 'lucide-react'
import Link from 'next/link'


function Footer() {
    return (
        <div className='mt-10 border-t border-gray-200/10 pt-8'>
            <div className="flex flex-col md:flex-row justify-start gap-6">
                <div className='flex flex-col gap-2 w-full md:w-1/4'>
                    {/* logo */}
                    <Link href="/" className="flex items-center gap-2">
                        <RocketIcon className='text-blue-500' />
                        <p className="text-xl font-bold">Instant Logistics</p>
                    </Link>
                    <p className='text-gray-500 text-sm'>Reimagine Logistics for a brighter, faster tomorrow.</p>
                </div>
                {/* company */}
                <div className="flex flex-col gap-2 w-full md:w-1/4">
                    <h1 className='font-bold'>Company</h1>
                    <p className='text-sm text-gray-500'>About Us</p>
                    <p className='text-sm text-gray-500'>Carear</p>
                    <p className='text-sm text-gray-500'>Blog</p>
                </div>
                {/* services */}
                <div className="flex flex-col gap-2 w-full md:w-1/4">
                    <h1 className='font-bold'>Services</h1>
                    <p className='text-sm text-gray-500'>AI routing</p>
                    <p className='text-sm text-gray-500'>Drone Delivery</p>
                    <p className='text-sm text-gray-500'>Global Network</p>
                </div>

                {/* legal */}
                <div className="flex flex-col gap-2 w-full md:w-1/4">
                    <h1 className='font-bold'>Legal</h1>
                    <p className='text-sm text-gray-500'>Privacy Policy</p>
                    <p className='text-sm text-gray-500'>Terms of Use</p>
                    <p className='text-sm text-gray-500'>Contact</p>
                </div>
            </div>
            <div className="border-t border-gray-200/10 pt-4 mt-6">
                <div className="flex flex-row justify-between items-center">
                    <div>
                        <p className="text-sm text-gray-500">© 2025 Instant Logistics. All rights reserved.</p>
                    </div>
                    {/* social media icons */}
                    <div className="flex flex-row gap-2 text-gray-500">
                        <Link href="">X</Link>
                        <Link href="">LinkedIn</Link>
                        <Link href="">GitHub</Link>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Footer