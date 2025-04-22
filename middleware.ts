import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

export function middleware(request: NextRequest) {
  // For demonstration purposes only - in a real app, you would check for a valid session
  const isAuthenticated = request.cookies.has("auth") || request.cookies.has("next-auth.session-token")

  // Get the pathname of the request
  const pathname = request.nextUrl.pathname

  // Protected routes that require authentication
  const protectedRoutes = ["/dashboard", "/actions", "/calculator"]

  // Check if the pathname is in the protected routes
  const isProtectedRoute = protectedRoutes.some((route) => pathname.startsWith(route))

  // If the route is protected and the user is not authenticated, redirect to login
  if (isProtectedRoute && !isAuthenticated) {
    const url = new URL("/login", request.url)
    url.searchParams.set("callbackUrl", pathname)
    return NextResponse.redirect(url)
  }

  // If the user is authenticated and trying to access login/register, redirect to dashboard
  if (isAuthenticated && (pathname === "/login" || pathname === "/register")) {
    return NextResponse.redirect(new URL("/dashboard", request.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    // Match all routes except for static files, api routes, and _next
    "/((?!api|_next/static|_next/image|favicon.ico).*)",
  ],
}
