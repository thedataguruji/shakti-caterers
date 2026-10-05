import { NextRequest, NextResponse } from "next/server";
import { jwtVerify } from "jose";

const CUSTOMER_COOKIE_NAME = "sc_customer_session";
const ADMIN_COOKIE_NAME = "sc_admin_session";

function getSecretKey() {
  const secret = process.env.SESSION_SECRET ?? "";
  return new TextEncoder().encode(secret);
}

async function isValidSession(token: string | undefined, role: string) {
  if (!token) return false;
  try {
    const { payload } = await jwtVerify(token, getSecretKey());
    return payload.role === role;
  } catch {
    return false;
  }
}

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  if (pathname.startsWith("/account") && pathname !== "/account/login") {
    const token = req.cookies.get(CUSTOMER_COOKIE_NAME)?.value;
    const valid = await isValidSession(token, "customer");
    if (!valid) {
      const loginUrl = new URL("/account/login", req.url);
      loginUrl.searchParams.set("next", pathname);
      return NextResponse.redirect(loginUrl);
    }
  }

  if (pathname.startsWith("/admin") && pathname !== "/admin/login") {
    const token = req.cookies.get(ADMIN_COOKIE_NAME)?.value;
    const valid = await isValidSession(token, "admin");
    if (!valid) {
      return NextResponse.redirect(new URL("/admin/login", req.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/account/:path*", "/admin/:path*"],
};
