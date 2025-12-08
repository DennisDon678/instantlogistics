'use client'
import { RocketIcon } from 'lucide-react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
function Header() {
  const navigations = [
    {
      name: "services",
      href: "#services"
    },
    {
      name: "technology",
      href: "#technology"
    }, {
      name: "about",
      href: "/about"
    },
    {
      name: "contact",
      href: "/contact"
    },
  ]



  return (
    <div>
      {/* main housing */}
      <div className="flex flex-col md:flex-row items-center justify-between border-b pb-3 border-b-gray-700/50 gap-4 md:gap-0">
        {/* logo */}
        <Link href="/" className="flex items-center gap-2">
          <RocketIcon className='text-blue-500' />
          <p className="text-xl font-bold">Instant Logistics</p>
        </Link>

        {/* navigation */}
        <div className="flex flex-row flex-wrap justify-center gap-4 capitalize items-center">
          {navigations.map((navigation, index) => (
            <Link href={navigation.href} key={index} className='hover:underline hover:underline-offset-2 hover:text-blue-300'>
              {navigation.name}
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Header