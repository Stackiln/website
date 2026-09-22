import { NextRequest, NextResponse } from "next/server";

const docsHost = "docs.stackiln.com";
const publicFile = /\.[^/]+$/;

export function proxy(request: NextRequest) {
  const host = request.headers.get("host")?.split(":")[0];
  const pathname = request.nextUrl.pathname;

  if (host !== docsHost || publicFile.test(pathname)) {
    return NextResponse.next();
  }

  if (pathname === "/docs" || pathname.startsWith("/docs/")) {
    const canonical = request.nextUrl.clone();
    canonical.pathname = pathname.slice(5) || "/";
    return NextResponse.redirect(canonical, 308);
  }

  const destination = request.nextUrl.clone();
  destination.pathname = pathname === "/" ? "/docs" : `/docs${pathname}`;
  return NextResponse.rewrite(destination);
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
