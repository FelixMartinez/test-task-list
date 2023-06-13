import { useCallback } from 'react';
import { useApolloClient } from "@apollo/client";
import { useAuth } from "8base-react-sdk";

/**
 * Function to log out the user.
 * Clears the Apollo client cache and performs logout through client authentication.
 * @param {Object} apolloClient - Apollo Client.
 * @param {Object} authClient - Authentication client.
 */
export const logout = async (apolloClient: any, authClient: any) => {
  await apolloClient.clearStore();
  authClient.logout();
};

/**
 * Custom Hook to get a logout function.
 * Uses the Apollo client and authentication client provided by the 8base-react-sdk.
 * Returns a logout function wrapped in useCallback for optimal performance.
 * @returns {Function} - Logout function.
 */
export const useLogout = () => {
  const apolloClient = useApolloClient();
  const { authClient } = useAuth();

  // Define the logout function using useCallback to avoid unnecessary renderings.
  const logoutCallback = useCallback(() => logout(apolloClient, authClient), [
    apolloClient,
    authClient,
  ]);

  return logoutCallback;
};
