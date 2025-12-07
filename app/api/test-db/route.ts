import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET() {
    try {
        // Test database connection
        await prisma.$connect()

        // Try to count deliveries
        const deliveryCount = await prisma.delivery.count()
        const settingsCount = await prisma.siteSettings.count()

        return NextResponse.json({
            status: 'success',
            message: 'Database connection successful!',
            data: {
                deliveries: deliveryCount,
                settings: settingsCount,
                connected: true,
            }
        })
    } catch (error) {
        console.error('Database connection error:', error)
        return NextResponse.json(
            {
                status: 'error',
                message: 'Database connection failed',
                error: error instanceof Error ? error.message : 'Unknown error',
            },
            { status: 500 }
        )
    } finally {
        await prisma.$disconnect()
    }
}
