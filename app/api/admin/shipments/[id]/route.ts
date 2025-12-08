import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { isAuthenticated } from '@/lib/auth';
import { DeliveryStatus } from '@prisma/client';

// GET /api/admin/shipments/[id]
export async function GET(
    request: NextRequest,
    props: { params: Promise<{ id: string }> }
) {
    try {
        const params = await props.params;
        const authenticated = await isAuthenticated();
        if (!authenticated) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const delivery = await prisma.delivery.findUnique({
            where: { deliveryId: params.id },
            include: { history: { orderBy: { timestamp: 'desc' } } },
        });

        if (!delivery) {
            return NextResponse.json({ error: 'Shipment not found' }, { status: 404 });
        }

        return NextResponse.json(delivery);
    } catch (error) {
        console.error('Error fetching shipment:', error);
        return NextResponse.json(
            { error: 'Failed to fetch shipment' },
            { status: 500 }
        );
    }
}

// PUT /api/admin/shipments/[id]
export async function PUT(
    request: NextRequest,
    props: { params: Promise<{ id: string }> }
) {
    try {
        const params = await props.params;
        const authenticated = await isAuthenticated();
        if (!authenticated) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const body = await request.json();
        const { status, location, description, ...updateData } = body;

        // If status is changing, add history entry
        const historyCreate = status ? {
            create: {
                status: status,
                location: location || 'Unknown Location',
                description: description || `Status updated to ${status}`,
            }
        } : undefined;

        const delivery = await prisma.delivery.update({
            where: { deliveryId: params.id },
            data: {
                ...updateData,
                status: status as DeliveryStatus,
                history: historyCreate,
            },
        });

        return NextResponse.json(delivery);
    } catch (error) {
        console.error('Error updating shipment:', error);
        return NextResponse.json(
            { error: 'Failed to update shipment' },
            { status: 500 }
        );
    }
}

// DELETE /api/admin/shipments/[id]
export async function DELETE(
    request: NextRequest,
    props: { params: Promise<{ id: string }> }
) {
    try {
        const params = await props.params;
        const authenticated = await isAuthenticated();
        if (!authenticated) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        await prisma.delivery.delete({
            where: { deliveryId: params.id },
        });

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error('Error deleting shipment:', error);
        return NextResponse.json(
            { error: 'Failed to delete shipment' },
            { status: 500 }
        );
    }
}
