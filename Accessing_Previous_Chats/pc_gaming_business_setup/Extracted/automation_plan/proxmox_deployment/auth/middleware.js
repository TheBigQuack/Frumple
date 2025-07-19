
// Middleware for protecting investor routes
// Place this in your Next.js project root as middleware.js

import { withAuth } from "next-auth/middleware"

export default withAuth(
  function middleware(req) {
    // Add any additional middleware logic here
    console.log("Middleware executed for:", req.nextUrl.pathname)
  },
  {
    callbacks: {
      authorized: ({ token, req }) => {
        const { pathname } = req.nextUrl
        
        // Public routes that don't require authentication
        const publicRoutes = [
          '/',
          '/about',
          '/contact',
          '/auth/signin',
          '/auth/signup',
          '/auth/error',
          '/auth/verify-request',
          '/api/auth',
          '/api/health'
        ]
        
        // Check if the route is public
        if (publicRoutes.some(route => pathname.startsWith(route))) {
          return true
        }
        
        // Admin routes require admin role
        if (pathname.startsWith('/admin')) {
          return token?.role === 'admin'
        }
        
        // Investor dashboard requires authentication
        if (pathname.startsWith('/dashboard')) {
          return !!token
        }
        
        // Investment routes require KYC verification
        if (pathname.startsWith('/invest')) {
          return token?.investorProfile?.kyc_verified === true
        }
        
        // API routes require authentication
        if (pathname.startsWith('/api/') && !pathname.startsWith('/api/auth')) {
          return !!token
        }
        
        // Default: require authentication
        return !!token
      },
    },
  }
)

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public folder
     */
    '/((?!_next/static|_next/image|favicon.ico|public/).*)',
  ],
}
