import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

function decodeJWTPayload(token: string): Record<string, any> | null {
  try {
    const base64Payload = token.split(".")[1];
    const payload = Buffer.from(base64Payload, "base64").toString("utf8");
    return JSON.parse(payload);
  } catch {
    return null;
  }
}

const PUBLIC_ROUTES = ["/login", "/no-permission", "/error"];
const SUPER_ADMIN_ROUTES = ["/schools", "/reports"];
const ADMIN_ROUTES = ["/students", "/fee", "/sms", "/master"];

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (PUBLIC_ROUTES.some((route) => pathname.startsWith(route))) {
    return NextResponse.next();
  }

  if (
    pathname.startsWith("/_next") ||
    pathname.startsWith("/api") ||
    pathname.includes(".")
  ) {
    return NextResponse.next();
  }

  const token = request.cookies.get("accessToken")?.value;

  if (!token) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  const payload = decodeJWTPayload(token);
  if (!payload) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  const role = payload.role as string;

  const isSuperAdminRoute = SUPER_ADMIN_ROUTES.some((r) =>
    pathname.startsWith(r)
  );
  const isAdminRoute = ADMIN_ROUTES.some((r) => pathname.startsWith(r));

  if (isSuperAdminRoute && role !== "SUPER_ADMIN") {
    return NextResponse.redirect(new URL("/no-permission", request.url));
  }

  if (isAdminRoute && role !== "ADMIN") {
    return NextResponse.redirect(new URL("/no-permission", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};
