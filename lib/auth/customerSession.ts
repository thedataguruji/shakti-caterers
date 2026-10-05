import { cookies } from "next/headers";
import { signSession, verifySession, SessionPayload } from "./session";

export const CUSTOMER_COOKIE_NAME = "sc_customer_session";

export async function createCustomerSession(customerId: string, mobile: string) {
  const token = await signSession(
    { sub: customerId, role: "customer", mobile },
    "7d"
  );
  cookies().set(CUSTOMER_COOKIE_NAME, token, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 60 * 60 * 24 * 7,
  });
}

export async function getCustomerSession(): Promise<SessionPayload | null> {
  const token = cookies().get(CUSTOMER_COOKIE_NAME)?.value;
  if (!token) return null;
  const session = await verifySession(token);
  if (!session || session.role !== "customer") return null;
  return session;
}

export function clearCustomerSession() {
  cookies().delete(CUSTOMER_COOKIE_NAME);
}
