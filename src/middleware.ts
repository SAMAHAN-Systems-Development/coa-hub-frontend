import { auth } from "@/auth";
import { NextResponse } from "next/server";

export default auth((req) => {
  const { pathname } = req.nextUrl;
  const isLoggedIn = !!req.auth;

  // Public routes that don't require authentication
  const publicRoutes = ["/login"];
  const isPublicRoute = publicRoutes.some((route) => pathname.startsWith(route));

  // Redirect logged-in users away from login page
  if (isPublicRoute && isLoggedIn) {
    const user = req.auth?.user;
    const redirectUrl = user?.isAdmin ? "/admin" : "/";
    return NextResponse.redirect(new URL(redirectUrl, req.url));
  }

  // Redirect non-logged-in users to login page
  if (!isPublicRoute && !isLoggedIn) {
    const loginUrl = new URL("/login", req.url);
    loginUrl.searchParams.set("callbackUrl", pathname);
    return NextResponse.redirect(loginUrl);
  }

  // Admin routes - require admin role
  if (pathname.startsWith("/admin")) {
    const user = req.auth?.user;
    if (!user?.isAdmin) {
      return NextResponse.redirect(new URL("/", req.url));
    }
  }

  return NextResponse.next();
});

export const config = {
  matcher: [
    /*
     * Match all request paths except:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public folder
     * - API routes
     */
    "/((?!api|_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
