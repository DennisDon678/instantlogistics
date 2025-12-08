import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

// GET /api/deliveries - Get all deliveries
export async function GET(request: NextRequest) {
    try {
        const { searchParams } = new URL(request.url)
        const status = searchParams.get('status')
        const search = searchParams.get('search')

        const where: any = {}

        // Filter by status if provided
        if (status && status !== 'All') {
            where.status = status.toUpperCase().replace('-', '_')
        }

        // Search by ID, sender, or receiver
        if (search) {
            where.OR = [
                { deliveryId: { contains: search, mode: 'insensitive' } },
                { senderName: { contains: search, mode: 'insensitive' } },
                { receiverName: { contains: search, mode: 'insensitive' } },
            ]
        }

        const deliveries = await prisma.delivery.findMany({
            where,
            orderBy: { createdAt: 'desc' },
            include: {
                history: {
                    orderBy: { timestamp: 'desc' },
                    take: 1, // Get latest history entry
                },
            },
        })

        return NextResponse.json(deliveries)
    } catch (error) {
        console.error('Error fetching deliveries:', error)
        return NextResponse.json(
            { error: 'Failed to fetch deliveries' },
            { status: 500 }
        )
    }
}

// POST /api/deliveries - Create new delivery
export async function POST(request: NextRequest) {
    try {
        const body = await request.json()

        // Generate delivery ID (e.g., #8B3D9A)
        const deliveryId = `DLV-${Math.random().toString(36).substring(2, 8).toUpperCase()}`

        const delivery = await prisma.delivery.create({
            data: {
                deliveryId,
                status: body.status || 'PENDING',
                senderName: body.senderName,
                senderAddress: body.senderAddress,
                senderEmail: body.senderEmail,
                senderPhone: body.senderPhone,
                receiverName: body.receiverName,
                receiverAddress: body.receiverAddress,
                receiverEmail: body.receiverEmail,
                receiverPhone: body.receiverPhone,
                scheduledDate: new Date(body.scheduledDate),
                history: {
                    create: {
                        status: 'Label Created',
                        location: 'Origin',
                        description: 'Package information sent to logistics partner.',
                        timestamp: new Date(),
                    },
                },
            },
            include: {
                history: true,
            },
        })

        return NextResponse.json(delivery, { status: 201 })
    } catch (error) {
        console.error('Error creating delivery:', error)
        return NextResponse.json(
            { error: 'Failed to create delivery' },
            { status: 500 }
        )
    }
}
