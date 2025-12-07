import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { isAuthenticated } from '@/lib/auth';

export async function GET() {
    try {
        const authenticated = await isAuthenticated();
        if (!authenticated) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const [total, inTransit, pending, delivered] = await Promise.all([
            prisma.delivery.count(),
            prisma.delivery.count({ where: { status: 'IN_TRANSIT' } }),
            prisma.delivery.count({ where: { status: 'PENDING' } }),
            prisma.delivery.count({ where: { status: 'DELIVERED' } }),
        ]);

        return NextResponse.json({
            total,
            inTransit,
            pending,
            delivered,
        });
    } catch (error) {
        console.error('Error fetching admin stats:', error);
        return NextResponse.json(
            { error: 'Failed to fetch statistics' },
            { status: 500 }
        );
    }
}
