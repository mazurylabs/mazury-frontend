import * as React from 'react';
import type { AppProps } from 'next/app';
import NextHead from 'next/head';
import { useRouter } from 'next/router';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import { Inter } from '@next/font/google';
dayjs.extend(relativeTime);

import {
  DefaultOptions,
  Hydrate,
  QueryClient,
  useQueryClient,
} from '@tanstack/react-query';

import 'styles/globals.css';

import { AppProvider } from 'providers';
import { useLogout } from 'providers/react-query-auth';

import { REFRESH_TOKEN_KEY } from 'config';
import storage from 'utils/storage';

const inter = Inter({ subsets: ['latin'] });

const queryConfig: DefaultOptions = {
  queries: {
    useErrorBoundary: true,
    refetchOnWindowFocus: false,
    retry: false,
  },
};

const App = (props: AppProps) => {
  const [queryClient] = React.useState<QueryClient>(
    () => new QueryClient({ defaultOptions: queryConfig })
  );

  return (
    <AppProvider queryClient={queryClient}>
      <NextHead>
        <title>Mazury</title>
        <link rel="icon" href="/new-logo.svg" />
      </NextHead>

      <div className={inter.className}>
        <SessionAuthenticator {...props} />
      </div>
    </AppProvider>
  );
};

export default App;

const SessionAuthenticator = ({ Component, pageProps }: AppProps) => {
  const queryClient = useQueryClient();
  const router = useRouter();
  const logout = useLogout();

  React.useEffect(() => {
    const user = queryClient.getQueryData(['authenticated-user']);

    const refreshToken = storage.getToken(REFRESH_TOKEN_KEY);

    const isRefreshTokenExpired = storage.isTokenExpired(refreshToken);

    if (user && isRefreshTokenExpired) {
      logout.mutateAsync({}, { onSuccess: () => router.push('/') });
    }
  }, []);

  return (
    <Hydrate state={pageProps.dehydratedState}>
      <Component {...pageProps} />
    </Hydrate>
  );
};
