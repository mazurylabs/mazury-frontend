import * as React from 'react';
import type { AppProps } from 'next/app';
import NextHead from 'next/head';

import 'styles/globals.css';

import { AppProvider } from '@/providers';
import { useDispatch, useSelector } from 'react-redux';
import { userSlice } from '@/selectors';
import { getProfile } from '@/utils/api';
import storage from '@/utils/storage';
import { ACCESS_TOKEN_KEY, REFRESH_TOKEN_KEY } from '@/config';
import { login, logout } from '@/slices/user';
import { AnnouncementModal } from '@/components/Announcement';
import { clearWagmiStorage } from '@/utils';
import Script from 'next/script';

const App = ({ Component, pageProps }: AppProps) => {
  const Authenticator = () => {
    const isMounted = React.useRef(false);
    const dispatch = useDispatch();
    const { address, profile } = useSelector(userSlice);
    const refreshToken = storage.getToken(REFRESH_TOKEN_KEY);
    const accessToken = storage.getToken(ACCESS_TOKEN_KEY);

    const isRefreshTokenExpired = storage.isTokenExpired(refreshToken);
    const isAccessTokenValid = storage.isTokenExpired(accessToken);

    const handleProfile = React.useCallback(async () => {
      if (!accessToken || !refreshToken) return;

      if (isRefreshTokenExpired) {
        return dispatch(logout());
      }

      if (address && !isMounted.current && !profile) {
        const { data } = await getProfile(address || '');

        if (data && isAccessTokenValid) {
          dispatch(login(data));
        }
      }
    }, [address, isRefreshTokenExpired, dispatch, isAccessTokenValid]);

    React.useEffect(() => {
      isMounted.current = true;

      clearWagmiStorage();
      handleProfile();
    }, [handleProfile]);

    React.useEffect(() => {
      if (!accessToken || !refreshToken) dispatch(logout());
    }, []);

    return <Component {...pageProps} />;
  };

  return (
    <AppProvider>
      <NextHead>
        <title>Mazury</title>
        <link rel="icon" href="/new-logo.svg" />
        <link rel="preconnect" href="https://rsms.me/" />
        <link rel="stylesheet" href="https://rsms.me/inter/inter.css" />
      </NextHead>

      <Authenticator />
    </AppProvider>
  );
};

export default App;
