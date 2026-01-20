import { NextRequest, NextResponse } from "next/server";

export async function proxy(req = NextRequest) {
  const token = req.cookies.get("token")?.value || "";

  const path = req.nextUrl.pathname;
  const isPublicPath = ["/login", "/signup", "/", "/verifyemail"].includes(path);

  if (!token && !isPublicPath) {
    return NextResponse.redirect(new URL("/login", req.nextUrl));
  }
  if (token && isPublicPath) {
    return NextResponse.redirect(new URL("/profile", req.nextUrl));
  }


}

 export const config = {
    matcher: ["/login", "/signup", "/", "/profile","/verifyemail"],
  };
