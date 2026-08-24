import { SignJWT, jwtVerify } from "jose";
import bcrypt from "bcryptjs";
import { cookies } from "next/headers";
import prisma from "./db";

const JWT_SECRET = new TextEncoder().encode(
  process.env.AUTH_SECRET || "prime_automation_super_secret_jwt_key_2026_production_safe"
);

const SESSION_COOKIE_NAME = "prime_admin_session";

export interface SessionPayload {
  userId: string;
  email: string;
  name: string;
  role: string;
  expiresAt: number;
}

export async function hashPassword(password: string): Promise<string> {
  return await bcrypt.hash(password, 10);
}

export async function verifyPassword(password: string, hash: string): Promise<boolean> {
  return await bcrypt.compare(password, hash);
}

export async function createSessionToken(payload: {
  userId: string;
  email: string;
  name: string;
  role: string;
}): Promise<string> {
  const expiresAt = Date.now() + 7 * 24 * 60 * 60 * 1000; // 7 days

  return await new SignJWT({ ...payload, expiresAt })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("7d")
    .sign(JWT_SECRET);
}

export async function verifySessionToken(token: string): Promise<SessionPayload | null> {
  try {
    const { payload } = await jwtVerify(token, JWT_SECRET);
    return payload as unknown as SessionPayload;
  } catch (error) {
    return null;
  }
}

export async function getCurrentAdminUser(): Promise<{
  id: string;
  email: string;
  name: string;
  role: string;
} | null> {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get(SESSION_COOKIE_NAME)?.value;
    if (!token) return null;

    const payload = await verifySessionToken(token);
    if (!payload) return null;

    // 1. Try finding by payload.userId in DB
    let user = null;
    if (payload.userId) {
      try {
        user = await prisma.adminUser.findUnique({
          where: { id: payload.userId },
          select: {
            id: true,
            email: true,
            name: true,
            role: true,
            isActive: true,
          },
        });
      } catch (dbErr) {
        console.warn("DB query by userId failed, trying by email:", dbErr);
      }
    }

    // 2. If not found by id (e.g. database switched to Supabase / reseeded), lookup by email
    if (!user && payload.email) {
      try {
        user = await prisma.adminUser.findUnique({
          where: { email: payload.email.toLowerCase().trim() },
          select: {
            id: true,
            email: true,
            name: true,
            role: true,
            isActive: true,
          },
        });
      } catch (dbErr) {
        console.warn("DB query by email failed:", dbErr);
      }
    }

    // 3. If user exists in DB and is active, return DB user
    if (user && user.isActive) {
      return {
        id: user.id,
        email: user.email,
        name: user.name || "Admin",
        role: user.role,
      };
    }

    // 4. If token is cryptographically verified with JWT_SECRET, fallback to payload info
    if (payload.email) {
      return {
        id: payload.userId || "admin-session-id",
        email: payload.email,
        name: payload.name || "Admin",
        role: payload.role || "ADMIN",
      };
    }

    return null;
  } catch (error) {
    console.error("getCurrentAdminUser error:", error);
    return null;
  }
}

export async function requireAdminAuth(): Promise<{
  id: string;
  email: string;
  name: string;
  role: string;
}> {
  const user = await getCurrentAdminUser();
  if (!user) {
    throw new Error("Unauthorized: Admin authentication required");
  }
  return user;
}

export { SESSION_COOKIE_NAME };
