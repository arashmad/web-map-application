import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

/* Server Actions */
import {
  validateTokenAction,
  refreshTokenAction,
} from "./actions/auth-actions";

export async function middleware(req: NextRequest) {
  const access_token = req.cookies.get("access_token")?.value;
  const refresh_token = req.cookies.get("refresh_token")?.value;

  /**
   * Return to the sign-in page if session cookies are not found
   */
  if (!access_token || !refresh_token) {
    console.log("-> No session cookies found");
    return NextResponse.redirect(new URL("/signin", req.url));
  }

  /**
   * Validating access token
   */
  const validateTokenActionRes = await validateTokenAction(access_token);

  if ("message" in validateTokenActionRes) {
    const validateTokenResponseErrorMessage = validateTokenActionRes.message;

    console.log("-> ", validateTokenResponseErrorMessage);

    if (validateTokenResponseErrorMessage.indexOf("invalid") >= 0) {
      return NextResponse.redirect(new URL("/signin", req.url));
    }
    // Check message to see the problem
    // Invalid access token -> return to the sign-in page
    // Expired access token -> generate a new access-token using refresh-token

    const refreshTokenActionRes = await refreshTokenAction(refresh_token);

    if ("message" in refreshTokenActionRes) {
      console.log(`Failed to refresh token: ${refreshTokenActionRes.message}`);
      return NextResponse.redirect(new URL("/signin", req.url));
    }
  }

  // If user is already logged in -> redirect to /map
  if (req.nextUrl.pathname === "/signin")
    return NextResponse.redirect(new URL("/map", req.url));

  return NextResponse.next();
}

export const config = {
  matcher: ["/signin", "/map/:path*"],
};
