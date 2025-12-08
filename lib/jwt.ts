import { SignJWT, jwtVerify } from 'jose';

export const SECRET_KEY = new TextEncoder().encode(
    process.env.JWT_SECRET || 'your-secret-key-change-in-production'
);

export const COOKIE_NAME = 'admin_session';

export const COOKIE_OPTIONS = {
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
    name: string;
}

/**
 * Create a JWT session token
 */
export async function createSession(payload: SessionPayload): Promise<string> {
    const token = await new SignJWT({ ...payload })
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
        // jwtVerify returns payload with index signature, so we cast strictly if compatible, 
        // or just pick fields. For now casting is safe enough for our simple control.
        return payload as unknown as SessionPayload;
    } catch (error) {
        return null;
    }
}
