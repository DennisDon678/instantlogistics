import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

// GET /api/settings - Get site settings
export async function GET() {
    try {
        // Get the first (and should be only) settings record
        let settings = await prisma.siteSettings.findFirst()

        // If no settings exist, create default ones
        if (!settings) {
            settings = await prisma.siteSettings.create({
                data: {
                    companyName: 'Instant Logistics',
                    tagline: 'Fast. Smart. Futuristic.',
                    email: 'contact@instantlogistics.com',
                    phone: '+1 (555) 123-4567',
                    address: '123 Logistics Ave, Tech City, TC 12345',
                    country: 'United States',
                    facebook: 'https://facebook.com/instantlogistics',
                    twitter: 'https://twitter.com/instantlogistics',
                    instagram: 'https://instagram.com/instantlogistics',
                    linkedin: 'https://linkedin.com/company/instantlogistics',
                },
            })
        }

        return NextResponse.json(settings)
    } catch (error) {
        console.error('Error fetching settings:', error)
        return NextResponse.json(
            { error: 'Failed to fetch settings' },
            { status: 500 }
        )
    }
}

// PUT /api/settings - Update site settings
export async function PUT(request: NextRequest) {
    try {
        const body = await request.json()

        // Get existing settings
        const existing = await prisma.siteSettings.findFirst()

        let settings
        if (existing) {
            // Update existing settings
            settings = await prisma.siteSettings.update({
                where: { id: existing.id },
                data: {
                    companyName: body.companyName,
                    tagline: body.tagline,
                    email: body.email,
                    phone: body.phone,
                    address: body.address,
                    country: body.country,
                    facebook: body.facebook,
                    twitter: body.twitter,
                    instagram: body.instagram,
                    linkedin: body.linkedin,
                },
            })
        } else {
            // Create new settings if none exist
            settings = await prisma.siteSettings.create({
                data: body,
            })
        }

        return NextResponse.json(settings)
    } catch (error) {
        console.error('Error updating settings:', error)
        return NextResponse.json(
            { error: 'Failed to update settings' },
            { status: 500 }
        )
    }
}
