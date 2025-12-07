import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

// GET /api/deliveries/[id] - Get single delivery
export async function GET(
    request: NextRequest,
    { params }: { params: { id: string } }
) {
    try {
        const delivery = await prisma.delivery.findFirst({
            where: {
                OR: [
                    { id: params.id },
                    { deliveryId: params.id.startsWith('#') ? params.id : `#${params.id}` },
                ],
            },
            include: {
                history: {
                    orderBy: { timestamp: 'desc' },
                },
            },
        })

        if (!delivery) {
            return NextResponse.json(
                { error: 'Delivery not found' },
                { status: 404 }
            )
        }

        return NextResponse.json(delivery)
    } catch (error) {
        console.error('Error fetching delivery:', error)
        return NextResponse.json(
            { error: 'Failed to fetch delivery' },
            { status: 500 }
        )
    }
}

// PUT /api/deliveries/[id] - Update delivery
export async function PUT(
    request: NextRequest,
    { params }: { params: { id: string } }
) {
    try {
        const body = await request.json()

        const delivery = await prisma.delivery.update({
            where: { id: params.id },
            data: {
                status: body.status,
                senderName: body.senderName,
                senderAddress: body.senderAddress,
                senderEmail: body.senderEmail,
                senderPhone: body.senderPhone,
                receiverName: body.receiverName,
                receiverAddress: body.receiverAddress,
                receiverEmail: body.receiverEmail,
                receiverPhone: body.receiverPhone,
                scheduledDate: body.scheduledDate ? new Date(body.scheduledDate) : undefined,
            },
            include: {
                history: true,
            },
        })

        return NextResponse.json(delivery)
    } catch (error) {
        console.error('Error updating delivery:', error)
        return NextResponse.json(
            { error: 'Failed to update delivery' },
            { status: 500 }
        )
    }
}

// DELETE /api/deliveries/[id] - Delete delivery
export async function DELETE(
    request: NextRequest,
    { params }: { params: { id: string } }
) {
    try {
        await prisma.delivery.delete({
            where: { id: params.id },
        })

        return NextResponse.json({ message: 'Delivery deleted successfully' })
    } catch (error) {
        console.error('Error deleting delivery:', error)
        return NextResponse.json(
            { error: 'Failed to delete delivery' },
            { status: 500 }
        )
    }
}
