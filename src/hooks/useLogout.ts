import { useCallback } from 'react';
import { useApolloClient } from "@apollo/client";
import { useAuth } from "8base-react-sdk";

export const logout = async (apolloClient: any, authClient: any) => {
  await apolloClient.clearStore();
  authClient.logout();
};

export const useLogout = () => {
  const apolloClient = useApolloClient();
  const { authClient } = useAuth();

  const logoutCallback = useCallback(() => logout(apolloClient, authClient), [
    apolloClient,
    authClient,
  ]);

  return logoutCallback;
};
