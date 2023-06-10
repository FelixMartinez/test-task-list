"use client";
import { ThemeProvider } from "@mui/material";
import type { AppProps } from "next/app";
import { lightTheme } from "@/src/themes";
import { UserProvider } from "@auth0/nextjs-auth0/client";
import { EntriesProvider } from "@/src/contexts/entries";
import { UIProvider } from "@/src/contexts/ui";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <UserProvider>
      <EntriesProvider>
        <UIProvider>
          <ThemeProvider theme={lightTheme}>
            <Component {...pageProps} />
          </ThemeProvider>
        </UIProvider>
      </EntriesProvider>
    </UserProvider>
  );
}
