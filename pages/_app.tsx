import * as React from 'react';
import type { AppProps } from 'next/app';
import NextHead from 'next/head';

import 'styles/globals.css';

import { AppProvider } from '@/providers';
import { useDispatch, useSelector } from 'react-redux';
import { userSlice } from '@/selectors';
import { getProfile } from '@/utils/api';
import storage from '@/utils/storage';
import { REFRESH_TOKEN_KEY } from '@/config';
import { login, logout } from '@/slices/user';
import { AnnouncementModal } from '@/components/Announcement';
import { clearWagmiStorage } from '@/utils';
import FeedbackFishButton from '@/components/FeedbackFishButton';
import Script from 'next/script';

const App = ({ Component, pageProps }: AppProps) => {
  React.useEffect(() => {
    console.log(`                                                   
 ____   _____  _____  _   _   ____  _   _ 
 |    \ (____ |(___  )| | | | / ___)| | | |
 | | | |/ ___ | / __/ | |_| || |    | |_| |
 |_|_|_|\_____|(_____)|____/ |_|     \__  |
                                    (____/ 
  `);
  }, []);

  const Authenticator = () => {
    const dispatch = useDispatch();
    const { address } = useSelector(userSlice);
    const refreshToken = storage.getToken(REFRESH_TOKEN_KEY);
    const isRefreshTokenExpired = storage.isTokenExpired(refreshToken);

    const handleProfile = React.useCallback(async () => {
      if (isRefreshTokenExpired) {
        return dispatch(logout());
      }

      if (address) {
        const { data } = await getProfile(address || '');
        if (data) {
          dispatch(login(data));
        }
      }
    }, [address, isRefreshTokenExpired, dispatch]);

    React.useEffect(() => {
      clearWagmiStorage();
      handleProfile();
    }, [handleProfile]);

    return <Component {...pageProps} />;
  };

  return (
    <AppProvider>
      <NextHead>
        <title>Mazury</title>
        <link rel="icon" href="/new-logo.svg" />
      </NextHead>

      <AnnouncementModal />

      <Authenticator />
      <FeedbackFishButton />

      <Script
        strategy="afterInteractive"
        src="https://www.googletagmanager.com/gtag/js?id=G-1HSTDVKHYN"
      />

      <Script id="google-analytics" strategy="afterInteractive">
        {`
        window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date());
      
        gtag('config', 'G-1HSTDVKHYN');
      `}
      </Script>
    </AppProvider>
  );
};

export default App;
