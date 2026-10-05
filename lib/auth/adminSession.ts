import { cookies } from "next/headers";
import { signSession, verifySession, SessionPayload } from "./session";

export const ADMIN_COOKIE_NAME = "sc_admin_session";

export async function createAdminSession(adminId: string, email: string) {
  const token = await signSession(
    { sub: adminId, role: "admin", email },
    "1d"
  );
  cookies().set(ADMIN_COOKIE_NAME, token, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 60 * 60 * 24,
  });
}

export async function getAdminSession(): Promise<SessionPayload | null> {
  const token = cookies().get(ADMIN_COOKIE_NAME)?.value;
  if (!token) return null;
  const session = await verifySession(token);
  if (!session || session.role !== "admin") return null;
  return session;
}

export function clearAdminSession() {
  cookies().delete(ADMIN_COOKIE_NAME);
}
