'use client'
import { RocketIcon } from 'lucide-react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
function Header() {
  const navigations = [
    {
      name:"services",
      href:"#services"
    },
    {
      name:"technology",
      href:"#technology"
    },{
      name:"about",
      href:"/about"
    },
    {
      name:"contact",
      href:"/contact"
    },
  ]

 

  return (
    <div>
      {/* main housing */}
      <div className="flex flex-row items-center justify-between border-b pb-3 border-b-gray-700/50">
        {/* logo */}
        <Link href="/" className="flex items-center gap-2">
          <RocketIcon className='text-blue-500' />
          <p className="text-xl font-bold">Instant Logistics</p>
        </Link>

        {/* navigation */}
        <div className="flex flex-row gap-4 capitalize items-center">
          {navigations.map((navigation,index)=>(
            <Link href={navigation.href} key={index} className='hover:underline hover:underline-offset-2 hover:text-blue-300'>
              {navigation.name}
            </Link>
          ))}
          <button className='bg-blue-500 text-white px-4 py-2 rounded-xl cursor-not-allowed'>Login</button>
        </div>
      </div>
    </div>
  )
}

export default Header