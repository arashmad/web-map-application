// Containing server actions for the user authentication
"use server";

import { authAPI } from "./api";

/* Types */
import {
  IValidateTokenResponse,
  ILoginRequest,
  ILoginResponse,
} from "./schema/auth-schema";

/* Helper Functions */
import { getErrorMessageHelper, saveSession } from "@/helpers";

interface IResponseError {
  message: string;
}

/**
 * Server action to validate ACCESS_TOKEN.
 *
 * Makes a GET request to the server's validate-token endpoint with the ACCESS_TOKEN.
 * If the request is successful, it returns the user data.
 * If the request fails, it returns an error message.
 *
 * @param {string} token - The ACCESS_TOKEN to validate.
 * @returns A promise that resolves to an object with the user data, or an object with an error message.
 */
export async function validateTokenAction(
  token: string
): Promise<{ user: IValidateTokenResponse } | IResponseError> {
  try {
    const response = await fetch(
      `${authAPI.base}${authAPI.subRoutes.validate}`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    const data = await response.json();

    if (response.status !== 200) return { message: data.msg };
    return { user: data };
  } catch (error) {
    return { message: getErrorMessageHelper(error) };
  }
}

/**
 * Server action to refresh the access token.
 *
 * Makes a POST request to the server's refresh-token endpoint with the refresh token.
 * If the request is successful, it saves the new access token and refresh token as cookies
 * and returns the new access token.
 * If the request fails, it returns an error message.
 *
 * @param {string} token - The refresh token used to obtain a new access token.
 * @returns A promise that resolves to an object with the new access token, or an object with an error message.
 */
export async function refreshTokenAction(
  token: string
): Promise<{ access_token: string } | IResponseError> {
  try {
    const response = await fetch(
      `${authAPI.base}${authAPI.subRoutes.refresh}`,
      {
        method: "POST",
        headers: {
          accept: "application/json",
          "content-type": "application/json",
        },
        body: JSON.stringify({ refresh_token: token }),
      }
    );

    const data = await response.json();

    if (response.status !== 200) return { message: data.msg };

    await saveSession(data.access_token, data.refresh_token);
    return { access_token: data.access_token };
  } catch (error) {
    return { message: getErrorMessageHelper(error) };
  }
}

/**
 * Server action to handle sign in.
 *
 * Makes a POST request to the server's login endpoint with the user's email and password.
 * If the request is successful, it saves the access token as a cookie and returns the user data.
 * If the request fails, it returns an error message.
 *
 * @param param - The data needed for the login request.
 * @returns A promise that resolves to an object with the user data, or an object with an error message.
 */
export async function signInAction(
  param: ILoginRequest
): Promise<{ user: ILoginResponse } | IResponseError> {
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
