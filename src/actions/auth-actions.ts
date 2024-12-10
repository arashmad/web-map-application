// A server action
"use server";

import { authAPI } from "./api";

/* Helper Functions */
import { getErrorMessageHelper } from "@/helpers/ErrorHandler";

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

type ISignActionResult = ISignInResult | ISignInError;

/**
 * A server action that signs in a user using the email and password provided.
 *
 * This action will return a response object with a user property if the sign in is
 * successful, and a message property if the sign in fails.
 *
 * @param param An object with the email and password of the user to sign in.
 * @returns A response object with a user property containing the user's information,
 * or a message property containing an error message.
 */
export async function signInAction(
  param: ILoginRequest
): Promise<ISignActionResult> {
  try {
    const { email, password } = param;

    // Construct the request to the API
    const response = await fetch(`${authAPI.base}${authAPI.subRoutes.login}`, {
      method: "POST",
      headers: {
        accept: "application/json",
        "Content-Type": "application/json",
      },
      // Send the email and password in the request body
      body: JSON.stringify({ email, password }),
    });

    // Get the response data
    const data = await response.json();

    // Return the response object
    return response.status !== 200
      ? // If the response is not 200 OK, return an object with an error message
        { message: data.msg }
      : // If the response is 200 OK, return an object with the user's information
        { user: data };
  } catch (error) {
    return { message: getErrorMessageHelper(error) };
  }
}
