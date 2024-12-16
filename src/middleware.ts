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

  // If there is no tokens in session
  if (!access_token || !refresh_token) {
    console.log("-> No session cookies found");
    // When user tries to open /signin page -> go to /signin (Avoid infinite loop)
    if (req.nextUrl.pathname === "/signin") {
      console.log("-> Allow user to open /signin");
      return NextResponse.next();
    } else {
      // For pages other than /signin page -> go to /signin
      console.log("-> Redirect to /signin");
      return NextResponse.redirect(new URL("/signin", req.url));
    }
  }

  // In case of having tokens in session -> validate them

  // The access token validation
  const validateTokenActionRes = await validateTokenAction(access_token);

  // Invalid/Expired access token
  if ("message" in validateTokenActionRes) {
    const validateTokenResponseErrorMessage = validateTokenActionRes.message;

    console.log("-> ", validateTokenResponseErrorMessage);

    // If the access token is invalid -> go to the sign-in page
    if (validateTokenResponseErrorMessage.indexOf("invalid") >= 0) {
      return NextResponse.redirect(new URL("/signin", req.url));
    }

    // If the access token is expired -> generate a new access token
    const refreshTokenActionRes = await refreshTokenAction(refresh_token);

    // Invalid/Expired refresh token -> go to /signin page
    if ("message" in refreshTokenActionRes) {
      console.log(`Failed to refresh token: ${refreshTokenActionRes.message}`);
      return NextResponse.redirect(new URL("/signin", req.url));
    }
  }

  // If user is already logged in -> redirect to /map
  if (req.nextUrl.pathname === "/signin") {
    return NextResponse.redirect(new URL("/map", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/signin", "/map/:path*"],
};
