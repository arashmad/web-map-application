import "server-only";
import { cookies } from "next/headers";

const accessTokenExpiry = 60 * 60 * 1000; // every hour
const refreshTokenExpiry = 2 * 24 * 60 * 60 * 1000; // every 2 days

/**
 * Set the access token and refresh token as http only cookies
 * Removed from session after accessTokenExpiry
 * @param {string} access_token - The access token to save to the session
 * @param {string} refresh_token - The refresh token to save to the session
 */
export async function saveSession(access_token: string, refresh_token: string) {
  const cookieStore = await cookies();
  cookieStore.set("access_token", access_token, {
    httpOnly: true,
    secure: true,
    expires: new Date(Date.now() + accessTokenExpiry),
    sameSite: "lax",
    path: "/",
  });

  cookieStore.set("refresh_token", refresh_token, {
    httpOnly: true,
    secure: true,
    expires: new Date(Date.now() + refreshTokenExpiry),
    sameSite: "lax",
    path: "/",
  });
}
