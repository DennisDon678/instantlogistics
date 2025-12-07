'use client'

import { Menu } from 'lucide-react'
import { useState, useEffect } from 'react'
import { useRouter, usePathname } from 'next/navigation'
import AdminSidebar from '@/app/_components/admin/AdminSidebar'

export default function AdminLayout({
    children,
}: {
    children: React.ReactNode
}) {
    const router = useRouter()
    const pathname = usePathname()
    const [sidebarOpen, setSidebarOpen] = useState(false)
    const [loading, setLoading] = useState(true)
    const [authenticated, setAuthenticated] = useState(false)

    useEffect(() => {
        // Skip auth check for login page
        if (pathname === '/admin/login') {
            setLoading(false)
            setAuthenticated(true)
            return
        }

        // Check authentication
        const checkAuth = async () => {
            try {
                const response = await fetch('/api/auth/session')
                const data = await response.json()

                if (data.authenticated) {
                    setAuthenticated(true)
                } else {
                    router.push('/admin/login')
                }
            } catch (error) {
                console.error('Auth check failed:', error)
                router.push('/admin/login')
            } finally {
                setLoading(false)
            }
        }

        checkAuth()
    }, [pathname, router])

    // Show loading state
    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <div className="text-center">
                    <div className="w-16 h-16 border-4 border-[#258cf4] border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                    <p className="text-gray-600">Loading...</p>
                </div>
            </div>
        )
    }

    // Don't render protected content if not authenticated
    if (!authenticated && pathname !== '/admin/login') {
        return null
    }

    // Don't show sidebar on login page
    if (pathname === '/admin/login') {
        return <>{children}</>
    }

    return (
        <div className="relative flex min-h-screen w-full">
            {/* Hamburger Menu Button - Mobile Only */}
            <button
                onClick={() => setSidebarOpen(true)}
                className="fixed top-6 left-6 z-50 lg:hidden p-3 rounded-lg bg-[#258cf4] shadow-lg hover:bg-[#258cf4]/90 transition-colors"
            >
                <Menu className="w-6 h-6 text-white" />
            </button>

            <AdminSidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

            <main className="flex-1 overflow-y-auto">
                {children}
            </main>
        </div>
    )
}
