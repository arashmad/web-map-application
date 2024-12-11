// A server action
"use server";

import { authAPI } from "./api";

/* Helper Functions */
import { getErrorMessageHelper, saveSession } from "@/helpers";

/**
 * Interface for the login request data.
 *
 * Represents the data sent to the server to authenticate a user.
 */
interface ILoginRequest {
  /** The email address of the user. */
  email: string;

  /** The password of the user. */
  password: string;
}

/**
 * Interface for the login response data.
 *
 * Represents the data returned by the server after a successful login.
 */
interface ILoginResponse {
  /** The access token for the authenticated user. */
  access_token: string;
  /** The refresh token for the authenticated user. */
  refresh_token: string;
  /** The unique ID of the authenticated user. */
  user_id: string;
  /** Indicates whether the authenticated user is an administrator. */
  is_admin: boolean;
  /** An array of services that the authenticated user has access to.*/
  services: string[];
}

interface ISignInResult {
  user: ILoginResponse;
}

interface ISignInError {
  message: string;
}

export async function signInAction(
  param: ILoginRequest
): Promise<ISignInResult | ISignInError> {
  try {
    const { email, password } = param;

    const response = await fetch(`${authAPI.base}${authAPI.subRoutes.login}`, {
      method: "POST",
      headers: {
        accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    const data = await response.json();

    if (response.status !== 200) return { message: data.msg };

    // Save access token as a cookie
    await saveSession(data.access_token, data.refresh_token);

    return { user: data };
  } catch (error) {
    return { message: getErrorMessageHelper(error) };
  }
}
