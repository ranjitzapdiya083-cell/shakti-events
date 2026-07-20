import { SignJWT, jwtVerify } from 'jose';
import { cookies } from 'next/headers';

const SECRET = new TextEncoder().encode(process.env.SESSION_SECRET || 'dev-secret-change-me');
const COOKIE_NAME = 'shakti_session';
const ADMIN_COOKIE_NAME = 'shakti_admin_session';

async function createToken(payload) {
  return await new SignJWT(payload)
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime('7d')
    .sign(SECRET);
}

async function verifyToken(token) {
  try {
    const { payload } = await jwtVerify(token, SECRET);
    return payload;
  } catch {
    return null;
  }
}

// ---- Regular user session ----

export async function createUserSession(user) {
  const token = await createToken({
    id: user.id,
    fullname: user.fullname,
    email: user.email,
    role: user.role,
  });
  cookies().set(COOKIE_NAME, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
    maxAge: 60 * 60 * 24 * 7,
  });
}

export async function getUserSession() {
  const token = cookies().get(COOKIE_NAME)?.value;
  if (!token) return null;
  return await verifyToken(token);
}

export function clearUserSession() {
  cookies().delete(COOKIE_NAME);
}

// ---- Admin session ----

export async function createAdminSession(admin) {
  const token = await createToken({
    id: admin.id,
    fullname: admin.fullname,
    email: admin.email,
    role: 'admin',
  });
  cookies().set(ADMIN_COOKIE_NAME, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
    maxAge: 60 * 60 * 24 * 7,
  });
}

export async function getAdminSession() {
  const token = cookies().get(ADMIN_COOKIE_NAME)?.value;
  if (!token) return null;
  return await verifyToken(token);
}

export function clearAdminSession() {
  cookies().delete(ADMIN_COOKIE_NAME);
}
