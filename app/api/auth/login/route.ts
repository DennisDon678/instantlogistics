import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { verifyPassword, createSession, setSessionCookie } from '@/lib/auth';

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const { username, password } = body;

        // Validate input
        if (!username || !password) {
            return NextResponse.json(
                { error: 'Username and password are required' },
                { status: 400 }
            );
        }

        // Find admin by username or email
        const admin = await prisma.admin.findFirst({
            where: {
                OR: [
                    { username: username },
                    { email: username },
                ],
            },
        });

        if (!admin) {
            return NextResponse.json(
                { error: 'Invalid credentials' },
                { status: 401 }
            );
        }

        // Verify password
        const isValidPassword = await verifyPassword(password, admin.password);

        if (!isValidPassword) {
            return NextResponse.json(
                { error: 'Invalid credentials' },
                { status: 401 }
            );
        }

        // Create session
        const token = await createSession({
            adminId: admin.id,
            username: admin.username,
            email: admin.email,
        });

        // Set cookie
        await setSessionCookie(token);

        // Return success
        return NextResponse.json({
            success: true,
            admin: {
                id: admin.id,
                username: admin.username,
                email: admin.email,
                name: admin.name,
            },
        });
    } catch (error) {
        console.error('Login error:', error);
        return NextResponse.json(
            { error: 'An error occurred during login' },
            { status: 500 }
        );
    }
}
