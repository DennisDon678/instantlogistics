import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { isAuthenticated } from '@/lib/auth';

export async function GET() {
    try {
        const authenticated = await isAuthenticated();
        if (!authenticated) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        // Get the first settings record (assuming singleton)
        const settings = await prisma.siteSettings.findFirst();

        return NextResponse.json(settings || {});
    } catch (error) {
        console.error('Error fetching settings:', error);
        return NextResponse.json(
            { error: 'Failed to fetch settings' },
            { status: 500 }
        );
    }
}

export async function PUT(request: NextRequest) {
    try {
        const authenticated = await isAuthenticated();
        if (!authenticated) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const body = await request.json();

        // Check if settings exist
        const existingSettings = await prisma.siteSettings.findFirst();

        let settings;
        if (existingSettings) {
            settings = await prisma.siteSettings.update({
                where: { id: existingSettings.id },
                data: body,
            });
        } else {
            settings = await prisma.siteSettings.create({
                data: body,
            });
        }

        return NextResponse.json(settings);
    } catch (error) {
        console.error('Error updating settings:', error);
        return NextResponse.json(
            { error: 'Failed to update settings' },
            { status: 500 }
        );
    }
}
