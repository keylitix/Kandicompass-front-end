import { NextRequest, NextResponse } from 'next/server';

export function middleware(request: NextRequest) {
  const token = request.cookies.get('_client_kandy_jwt')?.value;
  const path = request.nextUrl.pathname;

  const isProtected = path.startsWith('/dashboard');
  const isAuthPage = ['/sign-in', '/', '/sign-up'].includes(path);
  const isOpenPage = ['/terms-and-conditions'].includes(path);

  if (isProtected && !token) {
    const redirectUrl = new URL('/sign-in', request.url);
    redirectUrl.searchParams.set('callbackUrl', request.nextUrl.href);
    return NextResponse.redirect(redirectUrl);
  }

  if (isAuthPage && token) {
    return NextResponse.redirect(new URL('/dashboard', request.url));
  }

  if (isOpenPage) {
    return NextResponse.next();
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/', '/sign-in', '/dashboard', '/dashboard/:path*'],
};
