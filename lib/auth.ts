import { SignJWT, jwtVerify } from 'jose';
import bcrypt from 'bcryptjs';
import { cookies } from 'next/headers';

const SECRET_KEY = new TextEncoder().encode(
    process.env.JWT_SECRET || 'your-secret-key-change-in-production'
);

const COOKIE_NAME = 'admin_session';
const COOKIE_OPTIONS = {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax' as const,
    maxAge: 60 * 60 * 24 * 7, // 7 days
    path: '/',
};

export interface SessionPayload {
    adminId: string;
    username: string;
    email: string;
}

/**
 * Hash a password using bcrypt
 */
export async function hashPassword(password: string): Promise<string> {
    return bcrypt.hash(password, 10);
}

/**
 * Verify a password against a hash
 */
export async function verifyPassword(
    password: string,
    hashedPassword: string
): Promise<boolean> {
    return bcrypt.compare(password, hashedPassword);
}

/**
 * Create a JWT session token
 */
export async function createSession(payload: SessionPayload): Promise<string> {
    const token = await new SignJWT(payload)
        .setProtectedHeader({ alg: 'HS256' })
        .setIssuedAt()
        .setExpirationTime('7d')
        .sign(SECRET_KEY);

    return token;
}

/**
 * Verify and decode a JWT session token
 */
export async function verifySession(
    token: string
): Promise<SessionPayload | null> {
    try {
        const { payload } = await jwtVerify(token, SECRET_KEY);
        return payload as SessionPayload;
    } catch (error) {
        return null;
    }
}

/**
 * Set session cookie
 */
export async function setSessionCookie(token: string): Promise<void> {
    const cookieStore = await cookies();
    cookieStore.set(COOKIE_NAME, token, COOKIE_OPTIONS);
}

/**
 * Get session from cookie
 */
export async function getSession(): Promise<SessionPayload | null> {
    const cookieStore = await cookies();
    const token = cookieStore.get(COOKIE_NAME)?.value;

    if (!token) {
        return null;
    }

    return verifySession(token);
}

/**
 * Clear session cookie
 */
export async function clearSession(): Promise<void> {
    const cookieStore = await cookies();
    cookieStore.delete(COOKIE_NAME);
}

/**
 * Check if user is authenticated (for middleware)
 */
export async function isAuthenticated(): Promise<boolean> {
    const session = await getSession();
    return session !== null;
}
