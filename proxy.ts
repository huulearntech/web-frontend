import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@/auth'; // Import your auth configuration

export default async function proxy(request: NextRequest) {
  const session = await auth(); // Get the session
  
  // Define protected paths
  const protectedPaths = ['/account', /** TODO: Add more */]; 
  const isProtected = protectedPaths.some(path => request.nextUrl.pathname.startsWith(path));

  if (isProtected && !session) {
    const signInUrl = new URL('/sign-in', request.nextUrl.origin);
    signInUrl.searchParams.set('callbackUrl', request.nextUrl.pathname);
    return NextResponse.redirect(signInUrl);
  }
  
  // Allow the request to continue if authenticated or not a protected path
  return NextResponse.next();
}

// Optionally, define a matcher to specify which paths the proxy runs on
export const config = {
  matcher: ['/((?!api|_next/static|_next/image|.*\\.png$).*)'], // Apply to all paths except static files/API routes
};

// import { NextRequest, NextResponse } from 'next/server';
// export default function proxy(request: NextRequest) {
//   return NextResponse.next();
// }