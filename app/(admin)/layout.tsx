'use client'

import { Menu } from 'lucide-react'
import { useState } from 'react'
import AdminSidebar from '@/app/_components/admin/AdminSidebar'

export default function AdminLayout({
    children,
}: {
    children: React.ReactNode
}) {
    const [sidebarOpen, setSidebarOpen] = useState(false)

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
