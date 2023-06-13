"use client";
import { AppProvider } from "8base-react-sdk";
import { AUTH_STRATEGIES, Auth } from "8base-sdk";
import { ApolloProvider } from "@apollo/client";
import { ThemeProvider } from "@mui/material";
import type { AppProps } from "next/app";
import { SnackbarProvider } from 'notistack';
import { useCallback, useEffect, useState } from "react";

import { Loading } from "@/src/components/ui/Loading";
import { EntriesProvider } from "@/src/contexts/entries";
import { UIProvider } from "@/src/contexts/ui";
import useApollo from "@/src/hooks/useApollo";
import {
  AUTH_CLIENT_ID,
  AUTH_DOMAIN,
  LOGOUT_REDIRECT_URI,
  REDIRECT_URI,
  WORKSPACE_ENDPOINT,
} from "@/src/shared/constants";
import { lightTheme } from "@/src/themes";
import { BrowserRouter } from "react-router-dom";
import { Routes } from "./routes";

export default function App({ Component, pageProps }: AppProps) {
  const client = useApollo(pageProps);
  const [athCliente, setAthCliente] = useState(undefined);

  const onRequestSuccess = useCallback(({ operation }: any) => {
    const message = operation.getContext();

    if (message) {
      console.log("message: ", message);
    }
  }, []);

  const onRequestError = useCallback(({ graphQLErrors }: any) => {
    const hasGraphQLErrors =
      Array.isArray(graphQLErrors) && graphQLErrors.length > 0;

    if (hasGraphQLErrors) {
      graphQLErrors.forEach((error) => {
        console.error(error.message);
      });
    }
  }, []);

  useEffect(() => {
    if (typeof window !== "undefined") {
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
  }, []);

  if (!athCliente || !client) {
    return <Loading />;
  }

  const renderComponent = ({ loading }: any) => {
    if (loading) {
      return <Loading />;
    }

    return (
      <SnackbarProvider maxSnack={ 3 }>
        <BrowserRouter>
          <ApolloProvider client={client}>
            <EntriesProvider>
              <UIProvider>
                <ThemeProvider theme={lightTheme}>
                  <Routes />
                </ThemeProvider>
              </UIProvider>
            </EntriesProvider>
          </ApolloProvider>
        </BrowserRouter>
      </SnackbarProvider>
    );
  }

  return (
    <AppProvider
      uri={WORKSPACE_ENDPOINT!}
      authClient={athCliente}
      onRequestError={onRequestError}
      onRequestSuccess={onRequestSuccess}
      withSubscriptions
    >
       {renderComponent}
    </AppProvider>
  );
}
