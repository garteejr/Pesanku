import { NextResponse } from "next/server";

export function middleware(request) {

  const token = request.cookies.get("token")?.value;

  const { pathname } = request.nextUrl;

  // 🔒 Protect dashboard
  if (pathname.startsWith("/dashboard")) {

    if (!token) {
      return NextResponse.redirect(new URL("/login", request.url));
    }

  }

  // 🔓 Kalau sudah login, jangan balik ke login
  if (pathname.startsWith("/login")) {

    if (token) {
      return NextResponse.redirect(new URL("/dashboard", request.url));
    }

  }

  return NextResponse.next();
}

// ⚙️ Route yang mau dilindungi
export const config = {
  matcher: ["/dashboard/:path*", "/login"],
};