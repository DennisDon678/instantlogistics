import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

// Allow both GET and POST for easy testing
export async function GET() {
    return seedDatabase()
}

export async function POST() {
    return seedDatabase()
}

async function seedDatabase() {
    try {
        // Check if data already exists
        const existingDeliveries = await prisma.delivery.count()
        if (existingDeliveries > 0) {
            return NextResponse.json({
                status: 'info',
                message: 'Database already has data. Skipping seed.',
                data: { deliveries: existingDeliveries },
            })
        }

        // Create site settings
        const settings = await prisma.siteSettings.upsert({
            where: { id: '1' },
            update: {},
            create: {
                id: '1',
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

        // Create sample deliveries
        const delivery1 = await prisma.delivery.create({
            data: {
                deliveryId: '#8B3D9A',
                status: 'DELIVERED',
                senderName: 'John Doe',
                senderAddress: '123 Quantum St, Cybertown, 98765',
                senderEmail: 'john.doe@example.com',
                senderPhone: '+1 (555) 123-4567',
                receiverName: 'Jane Smith',
                receiverAddress: '456 Nexus Ave, Neocity, 12345',
                receiverEmail: 'jane.smith@example.com',
                receiverPhone: '+1 (555) 987-6543',
                scheduledDate: new Date('2024-07-20'),
                history: {
                    create: [
                        {
                            status: 'Delivered',
                            location: 'Neocity, Customer Address',
                            description: 'Package delivered successfully',
                            timestamp: new Date('2024-07-20T14:30:00'),
                        },
                        {
                            status: 'Out for Delivery',
                            location: 'Neocity Distribution Center',
                            description: 'Package out for delivery',
                            timestamp: new Date('2024-07-20T08:00:00'),
                        },
                    ],
                },
            },
        })

        const delivery2 = await prisma.delivery.create({
            data: {
                deliveryId: '#C1E5F2',
                status: 'IN_TRANSIT',
                senderName: 'Alice Johnson',
                senderAddress: '789 Tech Blvd, Silicon Valley, 94025',
                senderEmail: 'alice.j@example.com',
                senderPhone: '+1 (555) 234-5678',
                receiverName: 'Bob Brown',
                receiverAddress: '321 Innovation Dr, Austin, 78701',
                receiverEmail: 'bob.brown@example.com',
                receiverPhone: '+1 (555) 876-5432',
                scheduledDate: new Date('2024-07-21'),
                history: {
                    create: [
                        {
                            status: 'In Transit',
                            location: 'Dallas Distribution Hub',
                            description: 'Package in transit to Austin',
                            timestamp: new Date('2024-07-21T10:15:00'),
                        },
                    ],
                },
            },
        })

        const delivery3 = await prisma.delivery.create({
            data: {
                deliveryId: '#A6B7C8',
                status: 'DELAYED',
                senderName: 'Charlie Davis',
                senderAddress: '555 Market St, San Francisco, 94102',
                senderEmail: 'charlie.d@example.com',
                senderPhone: '+1 (555) 345-6789',
                receiverName: 'Diana Evans',
                receiverAddress: '777 Broadway, New York, 10003',
                receiverEmail: 'diana.e@example.com',
                receiverPhone: '+1 (555) 765-4321',
                scheduledDate: new Date('2024-07-22'),
                history: {
                    create: [
                        {
                            status: 'Delayed',
                            location: 'Chicago Sorting Facility',
                            description: 'Weather delay - expected to resume tomorrow',
                            timestamp: new Date('2024-07-22T09:00:00'),
                        },
                    ],
                },
            },
        })

        return NextResponse.json({
            status: 'success',
            message: 'Database seeded successfully!',
            data: {
                settings: 1,
                deliveries: 3,
                ids: [delivery1.deliveryId, delivery2.deliveryId, delivery3.deliveryId],
            },
        })
    } catch (error) {
        console.error('Seed error:', error)
        return NextResponse.json(
            {
                status: 'error',
                message: 'Failed to seed database',
                error: error instanceof Error ? error.message : 'Unknown error',
            },
            { status: 500 }
        )
    }
}
