import { NextRequest, NextResponse } from "next/server";

export function middleware(request: NextRequest) {
  const { hostname, pathname, search } = request.nextUrl;

  if (hostname === "www.easeworkflow.com") {
    const redirectUrl = request.nextUrl.clone();
    redirectUrl.hostname = "easeworkflow.com";
    redirectUrl.protocol = "https:";
    redirectUrl.pathname = pathname;
    redirectUrl.search = search;

    return NextResponse.redirect(redirectUrl, 308);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/:path*"],
};