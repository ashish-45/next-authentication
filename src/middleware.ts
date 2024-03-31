import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;

  const isPublicPath =
    path === "/Login" ||
    path === "/Signup" ||
    path === "/verifyemail" ||
    path === "/forgotPassword" ||
    path === "/ResetPassword";

  const token = request.cookies.get("token")?.value || "";

  if (isPublicPath && token) {
    return NextResponse.redirect(new URL("/Profile", request.nextUrl));
  }
  if (!isPublicPath && !token) {
    return NextResponse.redirect(new URL("/Login", request.nextUrl));
  }
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: [
    "/",
    "/Profile",
    "/Signup",
    "/Login",
    "/verifyemail",
    "/forgotPassword",
    "/ResetPassword"
  ],
};
