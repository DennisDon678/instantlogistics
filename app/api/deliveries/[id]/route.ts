import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

// GET /api/deliveries/[id] - Get single delivery
export async function GET(
    request: NextRequest,
    props: { params: Promise<{ id: string }> }
) {
    try {
        const params = await props.params;
        const decodedId = decodeURIComponent(params.id);

        const delivery = await prisma.delivery.findFirst({
            where: {
                OR: [
                    { id: decodedId },
                    { deliveryId: decodedId },
                    { deliveryId: decodedId.startsWith('#') ? decodedId : `#${decodedId}` },
                ],
            },
            include: {
                history: {
                    orderBy: { timestamp: 'desc' },
                },
            },
        })
        console.log(delivery)

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

// PUT /api/deliveries/[id] - Update delivery status and history
export async function PUT(
    request: NextRequest,
    props: { params: Promise<{ id: string }> }
) {
    try {
        const params = await props.params;
        const body = await request.json()

        // Prepare update data
        const updateData: any = {
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
        }

        // If status is being updated, log it in history
        if (body.status) {
            updateData.history = {
                create: {
                    status: body.status,
                    location: body.location || 'Unknown Location', // Default if not provided
                    description: body.description || `Status updated to ${body.status}`,
                    timestamp: new Date(),
                }
            }
        }

        const delivery = await prisma.delivery.update({
            where: { id: params.id },
            data: updateData,
            include: {
                history: {
                    orderBy: { timestamp: 'desc' }
                },
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
    props: { params: Promise<{ id: string }> }
) {
    try {
        const params = await props.params;
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
