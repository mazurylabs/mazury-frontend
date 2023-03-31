import * as React from 'react';
import { motion } from 'framer-motion';
import SVG from 'react-inlinesvg';
import { useRouter } from 'next/router';
import { useQueryClient } from '@tanstack/react-query';

import { Button } from '../Button';

import { SidebarContext } from 'contexts';
import storage from 'utils/storage';
import { ROUTE_PATH, STORED_USER } from 'config';
import { useCountDown, useMobile } from 'hooks';
import { verifyEmail } from 'utils/api';
import { useUser } from 'providers/react-query-auth';

export const RequireSignin = () => {
  const queryClient = useQueryClient();
  const ref = React.useRef<HTMLDivElement>(null!);
  const isMobile = useMobile();
  const prevPath = React.useRef('');
  const [isSignInRequired, setIsSignInRequired] = React.useState(true);
  const router = useRouter();
  const storedUser = storage.getToken(STORED_USER);
  const { data: profile } = useUser();
  const { setSignInOpen, signInOpen } = React.useContext(SidebarContext);
  const [isClosed, setIsClosed] = React.useState(false);

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

  React.useEffect(() => {
    if (!signInOpen) setIsSignInRequired(true);
  }, [signInOpen]);

  if (prevPath.current && !signInOpen && !isMobile && profile?.onboarded) {
    storage.clearToken(ROUTE_PATH);
  }

  if (isClosed || storedUser) {
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
          delay: prevPath.current ? 0.01 : isSearchPage ? 0 : 30,
        },
      }}
      className={`${
        isSearchPage && !signInOpen
          ? 'before:bg-[rgba(255, 255, 255, 0.7)] absolute backdrop-blur-[5px]'
          : 'fixed before:bg-indigoGray-90'
      } top-0 left-0 flex h-full w-full items-center justify-center  before:absolute before:top-0 before:left-0 before:h-full before:w-full before:opacity-50`}
    >
      {isSignInRequired && <>{!storedUser ? initial : null}</>}
    </motion.div>
  );
};
