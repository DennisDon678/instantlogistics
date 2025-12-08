'use client'

import { LayoutDashboard, Truck, Route, BarChart3, Settings, Bell, LogOut, X } from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

const navigation = [
    { name: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
    { name: 'Shipments', href: '/dashboard/shipments', icon: Truck },
    { name: 'Settings', href: '/dashboard/settings', icon: Settings },
]

const bottomActions = [
    { name: 'Notifications', href: '/dashboard/notifications', icon: Bell },
    { name: 'Log out', href: '/logout', icon: LogOut },
]

interface AdminSidebarProps {
    isOpen?: boolean
    onClose?: () => void
    user?: {
        name: string
        email: string
    } | null
}

export default function AdminSidebar({ isOpen = false, onClose, user }: AdminSidebarProps) {
    const pathname = usePathname()

    // Get initials from name
    const getInitials = (name: string) => {
        return name
            .split(' ')
            .map(n => n[0])
            .join('')
            .toUpperCase()
            .slice(0, 2)
    }

    return (
        <>
            {/* Mobile Overlay */}
            {isOpen && (
                <div
                    className="fixed inset-0 bg-black/50 z-40 lg:hidden"
                    onClick={onClose}
                />
            )}

            {/* Sidebar */}
            <aside className={`
                fixed lg:sticky lg:top-0 lg:h-screen inset-y-0 left-0 z-60
                w-64 flex flex-col justify-between bg-white/5 p-4 border-r border-white/10
                transform transition-transform duration-300 ease-in-out
                ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
                overflow-y-auto
            `}>
                {/* Close button for mobile */}
                <div className="lg:hidden absolute top-4 right-4">
                    <button
                        onClick={onClose}
                        className="p-2 rounded-lg hover:bg-white/10 transition-colors"
                    >
                        <X className="w-5 h-5 text-gray-300" />
                    </button>
                </div>

                <div className="flex flex-col gap-4">
                    {/* User Profile */}
                    <div className="flex items-center gap-3 p-2">
                        <div className="bg-linear-to-br from-blue-500 to-purple-600 rounded-full size-10 flex items-center justify-center">
                            <span className="text-white font-semibold text-lg">
                                {user?.name ? getInitials(user.name) : 'AD'}
                            </span>
                        </div>
                        <div className="flex flex-col">
                            <h1 className="text-white text-base font-medium leading-normal">
                                {user?.name || 'Admin User'}
                            </h1>
                            <p className="text-gray-400 text-sm font-normal leading-normal">
                                {'Logistics Manager'}
                            </p>
                        </div>
                    </div>

                    {/* Navigation */}
                    <nav className="flex flex-col gap-2 mt-4">
                        {navigation.map((item) => {
                            const Icon = item.icon
                            const isActive = pathname === item.href

                            return (
                                <Link
                                    key={item.name}
                                    href={item.href}
                                    onClick={onClose}
                                    className={`flex items-center gap-3 px-3 py-2 rounded-lg transition-colors duration-200 ${isActive
                                        ? 'bg-primary'
                                        : 'hover:bg-white/10'
                                        }`}
                                >
                                    <Icon className={`w-5 h-5 ${isActive ? 'text-white' : 'text-gray-300'}`} />
                                    <p className={`text-sm font-medium leading-normal ${isActive ? 'text-white' : 'text-gray-300'}`}>
                                        {item.name}
                                    </p>
                                </Link>
                            )
                        })}
                    </nav>
                </div>

                {/* Bottom Actions */}
                <div className="flex flex-col gap-1">
                    {bottomActions.map((item) => {
                        const Icon = item.icon

                        // Special handling for logout
                        if (item.name === 'Log out') {
                            return (
                                <button
                                    key={item.name}
                                    onClick={async () => {
                                        try {
                                            await fetch('/api/auth/logout', { method: 'POST' })
                                            window.location.href = '/admin/login'
                                        } catch (error) {
                                            console.error('Logout failed:', error)
                                        }
                                    }}
                                    className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-white/10 transition-colors duration-200 text-left"
                                >
                                    <Icon className="w-5 h-5 text-gray-300" />
                                    <p className="text-gray-300 text-sm font-medium leading-normal">{item.name}</p>
                                </button>
                            )
                        }

                        return (
                            <Link
                                key={item.name}
                                href={item.href}
                                onClick={onClose}
                                className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-white/10 transition-colors duration-200"
                            >
                                <Icon className="w-5 h-5 text-gray-300" />
                                <p className="text-gray-300 text-sm font-medium leading-normal">{item.name}</p>
                            </Link>
                        )
                    })}
                </div>
            </aside>
        </>
    )
}
