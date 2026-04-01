import { NextResponse } from 'next/server';
import { auth } from '@/auth';
import { PATHS } from './lib/constants';
// import { UserRole } from './lib/generated/prisma/enums';
// 
// // FIXME: The roles in an array may repeat. The so-called AI is fucked, gave me all garbage code.
// type UserRoleOrUnauth = UserRole | "UNAUTH";
// const pathsRequiringRole: Record<string, UserRoleOrUnauth[]> = {
//   [PATHS.account]: ["USER", "HOTEL_OWNER", "ADMIN"],
//   [PATHS.accountHistory]: ["USER"],
//   [PATHS.accountRecentlyViewed]: ["USER"],
//   [PATHS.adminDashboard]: ["ADMIN"],
//   [PATHS.hotelDashboard]: ["HOTEL_OWNER"],
//   [PATHS.signIn]: ["UNAUTH"],
//   [PATHS.signUp]: ["UNAUTH"],
//   [PATHS.home]: ["USER", "UNAUTH"],
//   [PATHS.favorites]: ["USER"],
//   [PATHS.bookings]: ["USER", "UNAUTH"],
//   [PATHS.hotels]: ["USER", "UNAUTH"],
//   [PATHS.search]: ["USER", "UNAUTH"],
//   [PATHS.searchMap]: ["USER", "UNAUTH"],
//   // [PATHS.forgotPassword]: [],
//   // [PATHS.signUpHotel]: [],
//   // [PATHS.unauthorized]: [],
//   // [PATHS.notFound]: []
// };

export const proxy = auth(async function handleProxy(request) {
  const { pathname, origin } = request.nextUrl;
  const isAuthenticated = Boolean(request.auth);

  const isSignInOrSignUp = [PATHS.signIn, PATHS.signUp].some(
    (p) => pathname === p || pathname.startsWith(p + '/')
  );

  if (!isAuthenticated && !isSignInOrSignUp) {
    const signInUrl = new URL(PATHS.signIn, origin);
    signInUrl.searchParams.set('callbackUrl', pathname);
    return NextResponse.redirect(signInUrl);
  }

  if (isAuthenticated && isSignInOrSignUp) {
    return NextResponse.redirect(new URL(PATHS.home, origin));
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