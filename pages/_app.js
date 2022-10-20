import PropTypes from "prop-types";
import CssBaseline from "@mui/material/CssBaseline";
import theme from "src/theme";
import createEmotionCache from "src/createEmotionCache";
import RTL from "site-settings/RTL";
import msgs from "site-settings/site-translations";
import Head from "next/head";
import { useState, useEffect } from "react";
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink
} from "@apollo/client";
import { AuthContextProvider } from "contexts";
import { setContext } from "@apollo/client/link/context";
import { IntlProvider } from "react-intl";
import { MainLayout } from "layouts";
import { ThemeProvider } from "@mui/material/styles";
import { CacheProvider } from "@emotion/react";
import { StyledEngineProvider } from '@mui/material/styles';
import "../styles/globals.css";

// Client-side cache, shared for the whole session of the user in the browser.
const clientSideEmotionCache = createEmotionCache();

export default function MyApp(props) {
  const { Component, emotionCache = clientSideEmotionCache, pageProps } = props;
  const [showChild, setShowChild] = useState(false);
  const locale = "ar";

  const httpLink = createHttpLink({
    uri: "/api/graphql",
    credentials: "same-origin",
  }); 

  const authLink = setContext((_, { headers }) => {
    const cookies = new URLSearchParams(
      document.cookie.replaceAll("&", "%26").replaceAll("; ", "&")
    );
    const token = cookies.get("token");
    return {
      headers: {
        ...headers,
        authorization: token ? `${token}` : "",
      },
    };
  });

  const client = new ApolloClient({
    link: authLink.concat(httpLink),
    cache: new InMemoryCache(),
  });

  useEffect(() => {
    setShowChild(true);
  }, []);

  if (!showChild) return null;

  return (
    <CacheProvider value={emotionCache}>
      <Head>
        <title>حجز مناسبات | Booking Events</title>
        <meta name="description" content="booking events" />
        <meta name='viewport' content='width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0' />
      </Head>
      <AuthContextProvider>
        <ApolloProvider client={client}>
          <IntlProvider locale={locale} messages={msgs[locale]}>
            <MainLayout>
              <StyledEngineProvider injectFirst>
                <ThemeProvider theme={theme}>
                  <RTL>
                    {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
                    <CssBaseline />
                    {typeof window === undefined ? <></> : <Component {...pageProps} />}
                  </RTL>
                </ThemeProvider>
              </StyledEngineProvider>
            </MainLayout>
          </IntlProvider>
        </ApolloProvider>
      </AuthContextProvider>
    </CacheProvider>
  );
}

MyApp.propTypes = {
  Component: PropTypes.elementType.isRequired,
  emotionCache: PropTypes.object,
  pageProps: PropTypes.object.isRequired,
};