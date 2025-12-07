import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { isAuthenticated } from '@/lib/auth';
import { DeliveryStatus } from '@prisma/client';

export async function GET(request: NextRequest) {
    try {
        const authenticated = await isAuthenticated();
        if (!authenticated) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const searchParams = request.nextUrl.searchParams;
        const page = parseInt(searchParams.get('page') || '1');
        const limit = parseInt(searchParams.get('limit') || '10');
        const search = searchParams.get('search') || '';
        const status = searchParams.get('status');

        const skip = (page - 1) * limit;

        const where: any = {};

        if (search) {
            where.OR = [
                { deliveryId: { contains: search, mode: 'insensitive' } },
                { senderName: { contains: search, mode: 'insensitive' } },
                { receiverName: { contains: search, mode: 'insensitive' } },
            ];
        }

        if (status && status !== 'All') {
            // Map frontend status to Prisma enum
            const statusMap: Record<string, DeliveryStatus> = {
                'Pending': 'PENDING',
                'In-Transit': 'IN_TRANSIT',
                'Delivered': 'DELIVERED',
                'Delayed': 'DELAYED'
            };
            if (statusMap[status]) {
                where.status = statusMap[status];
            }
        }

        const [deliveries, total] = await Promise.all([
            prisma.delivery.findMany({
                where,
                skip,
                take: limit,
                orderBy: { createdAt: 'desc' },
            }),
            prisma.delivery.count({ where }),
        ]);

        return NextResponse.json({
            deliveries,
            pagination: {
                total,
                pages: Math.ceil(total / limit),
                page,
                limit,
            },
        });
    } catch (error) {
        console.error('Error fetching shipments:', error);
        return NextResponse.json(
            { error: 'Failed to fetch shipments' },
            { status: 500 }
        );
    }
}

export async function POST(request: NextRequest) {
    try {
        const authenticated = await isAuthenticated();
        if (!authenticated) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const body = await request.json();

        // Generate a random delivery ID if not provided
        const deliveryId = body.deliveryId || `DLV${Math.floor(Math.random() * 1000000).toString().padStart(6, '0')}`;

        const delivery = await prisma.delivery.create({
            data: {
                deliveryId,
                status: 'PENDING',
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
                        status: 'PENDING',
                        location: body.senderAddress, // Initial location
                        description: 'Shipment created',
                    }
                }
            },
        });

        return NextResponse.json(delivery, { status: 201 });
    } catch (error) {
        console.error('Error creating shipment:', error);
        return NextResponse.json(
            { error: 'Failed to create shipment' },
            { status: 500 }
        );
    }
}
