/**
 * Interface for the validate-token response data.
 */
export interface IValidateTokenResponse {
  /** The unique ID of the authenticated user. */
  user_id: string;
  /** Indicates whether the authenticated user is an administrator. */
  is_admin: boolean;
  /** An array of services that the authenticated user has access to.*/
  services: string[];
}

/**
 * Interface for the login request data.
 */
export interface ILoginRequest {
  /** The email address of the user. */
  email: string;
  /** The password of the user. */
  password: string;
}

/**
 * Interface for the login response data.
 */
export interface ILoginResponse {
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
