import * as React from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import SVG from 'react-inlinesvg';
import { useRouter } from 'next/router';
import { useSelector } from 'react-redux';

import { Button } from '../Button';
import { userSlice } from '@/selectors';
import { SidebarContext } from '@/contexts';
import storage from '@/utils/storage';
import { ROUTE_PATH } from '@/config';
import { useMobile } from '@/hooks';

export const RequireSignin = () => {
  const isMobile = useMobile();
  const prevPath = React.useRef('');
  const [isSignInRequired, setIsSignInRequired] = React.useState(true);
  const router = useRouter();
  const { profile, isAuthenticated } = useSelector(userSlice);
  const { setSignInOpen, signInOpen } = React.useContext(SidebarContext);

  const isEmailVerified = profile?.email && profile?.email_verified;
  const isSearchPage = router.pathname.includes('search');

  const handleClose = () => {
    setIsSignInRequired(false);
    storage.clearToken(ROUTE_PATH);
    prevPath.current = router.asPath;
  };

  const handleSignin = () => {
    prevPath.current = router.asPath;
    setIsSignInRequired(false);
    handleClose();
    storage.setToken(router.asPath, ROUTE_PATH);
    isMobile ? router.push('/sign-in') : setSignInOpen(true);
  };

  const initial = (
    <div className="z-20 flex h-[210px] w-[343px] flex-col rounded-xl bg-white shadow-xl lg:w-[400px]">
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
        <p className="font-sans text-sm font-medium text-indigoGray-60">
          In order to continue, you need to sign in
        </p>
        <Button className="w-[295px]" onClick={handleSignin}>
          Sign in
        </Button>
      </div>
    </div>
  );

  const verify = (
    <div className="z-20 flex min-h-[179px] w-[343px] shrink-0 flex-col space-y-4 rounded-xl bg-white px-6 py-4 shadow-xl lg:w-[400px]">
      <div className="space-y-2">
        <h1 className="font-demi text-3xl text-indigoGray-90">Verify e-mail</h1>
        <p className="font-sans text-sm font-medium text-indigoGray-60">
          In order to continue, you need to verify your e-mail address
        </p>
      </div>

      <div className="flex space-x-4">
        {/* <Button className="!block w-[50%] !p-3">Resend message</Button> */}
        <button
          type="button"
          className="h-[45px] w-[50%] rounded-lg bg-indigoGray-10 font-sans text-sm font-semibold text-indigoGray-90 shadow-sm"
        >
          Resend message
        </button>
        <button
          type="button"
          className="h-[45px] w-[50%] rounded-lg bg-indigoGray-10 bg-indigoGray-90 text-indigoGray-5"
        >
          Refresh
        </button>
      </div>
    </div>
  );

  if (prevPath.current && !signInOpen && !isMobile) {
    storage.clearToken(ROUTE_PATH);
  }

  if (isAuthenticated || (prevPath.current && !signInOpen)) return null;

  return (
    <div
      className={`${
        isSearchPage && !signInOpen
          ? 'before:bg-[rgba(255, 255, 255, 0.7)] absolute backdrop-blur-[5px]'
          : 'fixed before:bg-indigoGray-90'
      } top-0 left-0 ${
        signInOpen ? 'z-10' : 'z-30'
      } flex h-full w-full items-center justify-center  before:absolute before:top-0 before:left-0 before:h-full before:w-full before:opacity-50`}
    >
      {isSignInRequired && <>{isEmailVerified ? verify : initial}</>}
    </div>
  );
};
