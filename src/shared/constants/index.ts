export const WORKSPACE_ENDPOINT = process.env.NEXT_PUBLIC_APP_WORKSPACE_ENDPOINT;

/**
 * Creating an Authentication Profile in 8base will provide
 * you with a Client ID and Domain.
 */
export const AUTH_DOMAIN = process.env.NEXT_PUBLIC_APP_AUTH_DOMAIN;
export const AUTH_CLIENT_ID = process.env.NEXT_PUBLIC_APP_AUTH_CLIENT_ID;
export const AUTH_PROFILE_ID = process.env.NEXT_PUBLIC_APP_AUTH_PROFILE_ID;

/**
 * The redirect and logout URIs are all configured in the
 * authentication profile that gets set up in the 8base
 * management console.
 */
export const LOGOUT_REDIRECT_URI = `http://localhost:3000/logout`;
export const REDIRECT_URI = `http://localhost:3000/auth/callback`;

export const TOAST_SUCCESS_MESSAGE = 'TOAST_SUCCESS_MESSAGE';
