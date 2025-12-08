import { cookies } from 'next/headers';
import bcrypt from 'bcryptjs';
import {
    SECRET_KEY,
    COOKIE_NAME,
    COOKIE_OPTIONS,
    SessionPayload,
    createSession,
    verifySession
} from './jwt';

// Re-export constants and types for convenience
export { SECRET_KEY, COOKIE_NAME, COOKIE_OPTIONS, createSession, verifySession };
export type { SessionPayload };

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
 * Check if user is authenticated (for server components/actions)
 */
export async function isAuthenticated(): Promise<boolean> {
    const session = await getSession();
    return session !== null;
}
