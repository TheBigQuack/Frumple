
import { withAuth } from "next-auth/middleware"
import { NextResponse } from "next/server"

export default withAuth(
  function middleware(req) {
    const { pathname } = req.nextUrl
    const token = req.nextauth.token

    // Protect investor routes
    if (pathname.startsWith('/investor')) {
      if (!token || token.role !== 'investor') {
        return NextResponse.redirect(new URL('/auth/signin?error=unauthorized', req.url))
      }
    }

    // Protect admin routes 
    if (pathname.startsWith('/admin')) {
      if (!token || token.role !== 'admin') {
        return NextResponse.redirect(new URL('/auth/signin?error=unauthorized', req.url))
      }
    }

    return NextResponse.next()
  },
  {
    callbacks: {
      authorized: ({ token, req }) => {
        const { pathname } = req.nextUrl
        
        // Allow access to public routes
        if (!pathname.startsWith('/investor') && !pathname.startsWith('/admin')) {
          return true
        }
        
        // Check if user has token
        return !!token
      },
    },
  }
)

export const config = {
  matcher: ['/investor/:path*', '/admin/:path*']
}
