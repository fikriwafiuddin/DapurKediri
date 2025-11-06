import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

export function proxy(req: NextRequest) {
  const { pathname } = req.nextUrl

  // Only handle /admin routes
  if (pathname.startsWith("/admin")) {
    const token = req.cookies.get("token")?.value

    // If user is trying to access login but already has token, redirect to dashboard
    if (pathname === "/admin/login") {
      if (token) {
        const url = req.nextUrl.clone()
        url.pathname = "/admin/dashboard"
        return NextResponse.redirect(url)
      }
      return NextResponse.next()
    }

    // For all other /admin routes (including /admin and subpages), require token
    if (!token) {
      const url = req.nextUrl.clone()
      url.pathname = "/admin/login"
      // Optionally include the attempted path to redirect back after login
      url.searchParams.set("next", pathname)
      return NextResponse.redirect(url)
    }

    // Token exists, allow
    return NextResponse.next()
  }

  return NextResponse.next()
}

export const config = {
  matcher: ["/admin/:path*"],
}
