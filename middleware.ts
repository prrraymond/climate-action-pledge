import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {
  // For now, let's simplify the middleware to avoid potential issues
  // Check if the request is for the dashboard and there's no auth cookie
  const path = request.nextUrl.pathname
  const authCookie = request.cookies.get("auth")?.value

  // Log for debugging
  console.log("Middleware path:", path)
  console.log("Auth cookie:", authCookie)

  // Allow all requests to pass through for now
  return NextResponse.next()
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    "/((?!api|_next/static|_next/image|favicon.ico).*)",
  ],
}
