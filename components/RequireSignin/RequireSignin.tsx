import * as React from 'react';
import { motion } from 'framer-motion';
import SVG from 'react-inlinesvg';
import { useRouter } from 'next/router';
import { useSelector, useDispatch } from 'react-redux';

import { Button } from '../Button';
import { userSlice } from '@/selectors';
import { SidebarContext } from '@/contexts';
import storage from '@/utils/storage';
import { ROUTE_PATH } from '@/config';
import { useCountDown, useMobile } from '@/hooks';
import { getProfile, verifyEmail } from '@/utils/api';
import { login } from '@/slices/user';

export const RequireSignin = () => {
  const ref = React.useRef<HTMLDivElement>(null!);
  const dispatch = useDispatch();
  const isMobile = useMobile();
  const prevPath = React.useRef('');
  const [isSignInRequired, setIsSignInRequired] = React.useState(true);
  const router = useRouter();
  const { profile, isAuthenticated } = useSelector(userSlice);
  const { setSignInOpen, signInOpen } = React.useContext(SidebarContext);
  const [isClosed, setIsClosed] = React.useState(false);
  const { count, handleStartCounter } = useCountDown(30);

  const isEmailVerified = Boolean(profile?.email_verified);
  const isSearchPage = router.pathname.includes('search');

  const handleClose = () => {
    setIsSignInRequired(false);
    setIsClosed(true);
    storage.clearToken(ROUTE_PATH);
    prevPath.current = router.asPath;
  };

  const handleSignin = () => {
    prevPath.current = router.asPath;
    setIsSignInRequired(false);
    storage.setToken(router.asPath, ROUTE_PATH);
    isMobile ? router.push('/sign-in') : setSignInOpen(true);
  };

  const handleEmailVerification = async () => {
    if (isAuthenticated) {
      const { error } = await verifyEmail(profile?.eth_address as string);
      if (!error) {
        handleStartCounter();
      }
    }
  };

  const handleRefresh = async () => {
    const { data } = await getProfile(profile?.eth_address as string);

    if (data) {
      dispatch(login(data));
    }
  };

  const handleGoToSettings = () => router.push('/settings/account/email');

  const initial = (
    <div
      className={` ${
        isSearchPage && !signInOpen ? 'lg:relative lg:top-[-25%]' : ''
      } z-20 flex h-[210px] w-[343px] flex-col overflow-hidden rounded-xl bg-white shadow-xl lg:w-[400px]`}
    >
      <div className="relative flex h-[96px] items-center justify-center bg-gradient-1 p-3 pl-[13.5px]">
        {!isSearchPage && (
          <button
            type="button"
            className="absolute right-3 top-3 flex h-6 w-6 items-center justify-center rounded-full border border-indigoGray-40"
            onClick={handleClose}
          >
            <SVG src="/icons/x-grey.svg" height={16} width={16} />
          </button>
        )}

        <div className="flex space-x-4">
          <SVG src="/new-logo.svg" height="32px" width="32px" />
          <h2 className="font-demi text-2xl text-indigoGray-90">
            Discover best web3 talent
          </h2>
        </div>
      </div>

      <div className="flex grow flex-col items-center space-y-4 px-6 py-4">
        <p className="text-center font-sans text-sm font-medium text-indigoGray-60">
          Join the professional world of web3 on Mazury
        </p>
        <Button className="w-[295px]" onClick={handleSignin}>
          Sign in
        </Button>
      </div>
    </div>
  );

  const email = (
    <div
      className={` ${
        isSearchPage && !signInOpen ? 'lg:relative lg:top-[-25%]' : ''
      } z-20 flex h-[210px] w-[343px] flex-col overflow-hidden rounded-xl bg-white shadow-xl lg:w-[400px]`}
    >
      <div className="relative flex h-[96px] items-center justify-center bg-gradient-1 p-3 pl-[13.5px]">
        <div className="flex space-x-4">
          <h2 className="font-demi text-3xl text-indigoGray-90">
            Insert e-mail
          </h2>
        </div>
      </div>

      <div className="flex grow flex-col items-center space-y-4 px-6 py-4">
        <p className="text-center font-sans text-sm font-medium text-indigoGray-60">
          Mazury is the bridge between you and the professional world of web3.
          For communication we will need your e-mail.
        </p>
        <Button className="w-[295px]" onClick={handleGoToSettings}>
          Go to settings
        </Button>
      </div>
    </div>
  );

  const verify = (
    <div
      className={`${
        isSearchPage && !signInOpen ? 'lg:relative lg:top-[-25%]' : ''
      } z-20 flex min-h-[179px] w-[343px] shrink-0 flex-col space-y-4 rounded-xl bg-white px-6 py-4 shadow-xl lg:w-[400px]`}
    >
      <div className="space-y-2">
        <h1 className="font-demi text-3xl text-indigoGray-90">Verify e-mail</h1>
        <p className="font-sans text-sm font-medium text-indigoGray-60">
          In order to continue, you need to verify your e-mail address. Please
          check your email and follow the instructions. If you did not receive
          an email or if it expired, you can resend one.
        </p>
      </div>

      <div className="flex space-x-4">
        {/* <Button className="!block w-[50%] !p-3">Resend message</Button> */}
        <button
          type="button"
          className="h-[45px] w-[50%] rounded-lg bg-indigoGray-10 font-sans text-sm font-semibold text-indigoGray-90 shadow-sm"
          onClick={handleEmailVerification}
          disabled={count > 0}
        >
          {count > 0 ? `${count} Seconds` : 'Resend Message'}
        </button>
        <button
          type="button"
          className="h-[45px] w-[50%] rounded-lg bg-indigoGray-90 bg-indigoGray-90 font-sans text-sm font-semibold text-indigoGray-5 shadow-base"
          onClick={handleRefresh}
        >
          Refresh
        </button>
      </div>
    </div>
  );

  React.useEffect(() => {
    if (!signInOpen) setIsSignInRequired(true);
  }, [signInOpen]);

  if (prevPath.current && !signInOpen && !isMobile && profile?.onboarded) {
    storage.clearToken(ROUTE_PATH);
  }

  if (isClosed || (isAuthenticated && isEmailVerified && profile?.email)) {
    return null;
  }

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, zIndex: '-1' }}
      animate={{
        opacity: 1,
        zIndex: signInOpen ? '20' : '30',
        transition: {
          delay: prevPath.current ? 0.01 : isSearchPage ? 0 : 20,
        },
      }}
      className={`${
        isSearchPage && !signInOpen
          ? 'before:bg-[rgba(255, 255, 255, 0.7)] absolute backdrop-blur-[5px]'
          : 'fixed before:bg-indigoGray-90'
      } top-0 left-0 flex h-full w-full items-center justify-center  before:absolute before:top-0 before:left-0 before:h-full before:w-full before:opacity-50`}
    >
      {isSignInRequired && (
        <>
          {!isAuthenticated
            ? initial
            : !isEmailVerified && profile?.email
            ? verify
            : email}
        </>
      )}
    </motion.div>
  );
};
