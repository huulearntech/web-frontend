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
  if (!request.auth && ![PATHS.signIn, PATHS.signUp].includes(request.nextUrl.pathname)) {
    const signInUrl = new URL(PATHS.signIn, request.nextUrl.origin);
    signInUrl.searchParams.set('callbackUrl', request.nextUrl.pathname);
    return NextResponse.redirect(signInUrl);
  }

  if (request.auth && [PATHS.signIn, PATHS.signUp].includes(request.nextUrl.pathname)) {
    return NextResponse.redirect(new URL(PATHS.home, request.nextUrl.origin));

    // const role: UserRoleOrUnauth = request.auth.user.role ?? "UNAUTH";
    // if (pathsRequiringRole[request.nextUrl.pathname]?.includes(role)) {
    //   return NextResponse.next();
    // }
  } // else resolve access based on role requirements for the path

  // return NextResponse.redirect(
  //   new URL(PATHS.notFound, request.nextUrl.origin)
  // );
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