import { NextResponse } from 'next/server';
import { auth } from '@/auth';
import { PATHS } from './lib/constants';

export const proxy = auth(async function handleProxy(request) {
  if (!request.auth && ![PATHS.signIn, PATHS.signUp].includes(request.nextUrl.pathname)) {
    const signInUrl = new URL(PATHS.signIn, request.nextUrl.origin);
    signInUrl.searchParams.set('callbackUrl', request.nextUrl.pathname);
    return NextResponse.redirect(signInUrl);
  }

  if (request.auth && [PATHS.signIn, PATHS.signUp].includes(request.nextUrl.pathname)) {
    return NextResponse.redirect(new URL(PATHS.home, request.nextUrl.origin));
  }

  return NextResponse.next();
});

export const config = {
  matcher: [
    // TODO: Path for authenticated users only
    '/account/:path*',
    '/dashboard/:path*',

    // TODO: Path for non-authenticated users only
    '/sign-in/:path*',
    '/sign-up/:path*',

    // TODO: Path for both authenticated and non-authenticated users
  ],
};