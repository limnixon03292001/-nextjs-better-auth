import { getSessionCookie } from "better-auth/cookies";
import { NextRequest, NextResponse } from "next/server";

const protectedRoutes = ["/profile"];

export async function proxy(request: NextRequest) {
  const { nextUrl } = request;

  const sessionCookie = getSessionCookie(request);

  const result = NextResponse.next();

  const isLoggedIn = !!sessionCookie;

  const isOnProtectedRoutes = protectedRoutes.includes(nextUrl.pathname);

  const isOnAuthRoutes = nextUrl.pathname.startsWith("/auth");

  if (isOnProtectedRoutes && !isLoggedIn) {
    return NextResponse.redirect(new URL("/auth/login", request.url));
  }

  if (isOnAuthRoutes && isLoggedIn) {
    return NextResponse.redirect(new URL("/profile", request.url));
  }

  return result;
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|.*\\.png$).*)"],
};
