"use client";
import { useCallback, useState, useEffect } from 'react';
import type { AppProps } from "next/app";
import { ApolloProvider } from '@apollo/client';
import { ThemeProvider } from "@mui/material";
import { AppProvider } from '8base-react-sdk';
import { Auth, AUTH_STRATEGIES } from '8base-sdk';

import { lightTheme } from "@/src/themes";
import { UIProvider } from "@/src/contexts/ui";
import useApollo from "@/src/hooks/useApollo";
import { EntriesProvider } from "@/src/contexts/entries";
import { Loading } from '@/src/components/ui/Loading';
import { AUTH_CLIENT_ID, AUTH_DOMAIN, LOGOUT_REDIRECT_URI, REDIRECT_URI, WORKSPACE_ENDPOINT } from '@/src/shared/constants';

export default function App({ Component, pageProps }: AppProps) {
  const client = useApollo(pageProps);
  const [athCliente, setAthCliente] = useState(undefined)

  const onRequestSuccess = useCallback(({ operation }: any) => {
    const message = operation.getContext();

    if (message) {
      console.log('message: ', message);
    }
  }, []);

  const onRequestError = useCallback(({ graphQLErrors }: any) => {
    const hasGraphQLErrors = Array.isArray(graphQLErrors) && graphQLErrors.length > 0;

    if (hasGraphQLErrors) {
      graphQLErrors.forEach((error) => {
        console.error(error.message);
      });
    }
  }, []);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const auth: any = Auth.createClient(
        {
          strategy: AUTH_STRATEGIES.WEB_8BASE_COGNITO,
          subscribable: true,
        },
        {
          domain: AUTH_DOMAIN,
          clientId: AUTH_CLIENT_ID,
          redirectUri: REDIRECT_URI,
          logoutRedirectUri: LOGOUT_REDIRECT_URI,
        }
      );
      setAthCliente(auth);
    }
  }, [])
  
  if (!athCliente || !client) {
    return <Loading />
  }

  return (
    <AppProvider
        uri={WORKSPACE_ENDPOINT!}
        authClient={athCliente}
        onRequestError={onRequestError}
        onRequestSuccess={onRequestSuccess}
      >
      <ApolloProvider client={client}>
        <EntriesProvider>
          <UIProvider>
            <ThemeProvider theme={lightTheme}>
                <Component {...pageProps} />
            </ThemeProvider>
          </UIProvider>
        </EntriesProvider>
      </ApolloProvider>
    </AppProvider>
  );
}
