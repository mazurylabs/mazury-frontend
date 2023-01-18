/* eslint-disable @next/next/no-img-element */
import Link from 'next/link';
import * as React from 'react';
import { SidebarContext } from 'contexts';
import { useRouter } from 'next/router';
import { useDispatch, useSelector } from 'react-redux';
import SVG from 'react-inlinesvg';
import { motion } from 'framer-motion';

import { userSlice } from '@/selectors';
import { logout } from '@/slices/user';
import { colors } from '@/utils';
import { verifyEmail } from '@/utils/api';
import { WalletRequestModal } from '@/components/WalletRequestModal';
import { SlidersIcon } from '@/components/Icons';
import { HomeIcon, SearchIcon, UserIcon } from '@/components';
import { useAccount } from 'wagmi';

const iconColors = {
  active: colors.indigo[50],
  inactive: colors.indigoGray[90],
};

type Steps = 'idle' | 'active' | 'error';

const sidebarItemVariants = {
  open: {
    width: 182,
    transition: { duration: 0.2 },
  },
  closed: {
    width: 42,
    transition: { duration: 0.2 },
  },
};

const variants = {
  open: {
    width: 225,
    transition: { duration: 0.2 },
  },
  closed: {
    width: 75,
    transition: { duration: 0.2 },
  },
};

export const Sidebar: React.FC = () => {
  const [currentStep, setCurrentStep] = React.useState<Steps>('idle');
  const router = useRouter();
  const dispatch = useDispatch();
  const [_, disconnect] = useAccount();
  const { pathname } = router;
  const { profile, isAuthenticated } = useSelector(userSlice);
  const { isOpen, setIsOpen } = React.useContext(SidebarContext);

  const handleEmailVerification = async () => {
    if (profile?.eth_address) {
      const { error } = await verifyEmail(profile?.eth_address);
      if (!error) {
        setCurrentStep('idle');
      } else {
        setCurrentStep('error');
      }
    }
  };

  const handleLogOut = () => {
    disconnect();
    router.push('/');
    dispatch(logout());
  };

  return (
    <>
      <motion.aside
        variants={variants}
        animate={isOpen ? 'open' : 'closed'}
        className={`fixed left-0 top-0 z-30 !hidden h-screen w-[75px] flex-col items-center bg-white px-4 py-6 shadow-inner lg:!flex`}
        onMouseEnter={() => setIsOpen(true)}
        onMouseLeave={() => setIsOpen(false)}
        role="menu"
      >
        <Link href="/">
          <a className="h-[32px] w-[32px] cursor-pointer">
            <SVG src="/new-logo.svg" height="32px" width="32px" />
          </a>
        </Link>

        <hr className={`mx-3 my-8 w-full border border-indigoGray-20`} />
        <SidebarItem
          href="/search"
          label="Search"
          icon={
            <SearchIcon
              color={
                pathname.startsWith('/search')
                  ? iconColors.active
                  : iconColors.inactive
              }
            />
          }
          isOpen={isOpen}
          active={pathname.startsWith('/search')}
        />
        <SidebarItem
          href="/"
          label="Home"
          icon={
            <HomeIcon
              color={pathname === '/' ? iconColors.active : iconColors.inactive}
            />
          }
          isOpen={isOpen}
          active={pathname === '/'}
          className="mt-4"
        />

        <WalletRequestModal
          step={currentStep}
          handleSkip={() => setCurrentStep('idle')}
          handleRequestSignature={handleEmailVerification}
        />

        <div className="mt-auto flex flex-col">
          {/* Email not verified alert */}
          {isOpen &&
            isAuthenticated &&
            profile?.email &&
            !profile?.email_verified && (
              <div className="mx-auto mb-11 flex w-[144px] items-center justify-center">
                <img
                  src="/icons/info.svg"
                  width="16px"
                  height="16px"
                  alt="Info icon"
                />

                <p className="ml-3 text-sm font-medium text-indigoGray-90">
                  <span className="font-bold">
                    Your e-mail is not verified.
                  </span>{' '}
                  Check your mailbox or{' '}
                  <button
                    type="button"
                    className="underline hover:cursor-pointer"
                    onClick={handleEmailVerification}
                  >
                    click here
                  </button>{' '}
                  to resend the message.
                </p>
              </div>
            )}

          <hr className={`my-8 w-full border border-indigoGray-20`} />

          {isAuthenticated ? (
            <>
              {/* // Profile button */}
              <SidebarItem
                href={`/people/${profile?.eth_address}`}
                label="Profile"
                icon={
                  <img
                    src={profile?.avatar || '/profile-active.svg'}
                    alt="Profile icon"
                    className="h-5 w-5 rounded-full object-cover"
                  />
                }
                isOpen={isOpen}
                active={pathname.startsWith('/people')}
                className="mt-8"
              />
            </>
          ) : (
            // Sign in button
            <motion.button
              variants={sidebarItemVariants}
              animate={isOpen ? 'open' : 'closed'}
              type="button"
              onClick={() => {}}
              className={`flex h-[40px] w-full items-center gap-4 rounded-md p-3 text-sm font-medium text-indigoGray-90 hover:cursor-pointer hover:bg-indigoGray-10 hover:text-indigoGray-50 active:border-solid active:border-indigoGray-30 active:bg-indigoGray-10 active:text-indigoGray-80`}
            >
              <UserIcon color={'#110F2A'} />
              {isOpen && <p>Connect</p>}
            </motion.button>
          )}

          {isAuthenticated && (
            <SidebarItem
              href="/settings"
              label="Settings"
              icon={
                <SlidersIcon
                  color={
                    pathname.startsWith('/settings')
                      ? iconColors.active
                      : iconColors.inactive
                  }
                />
              }
              isOpen={isOpen}
              className="mb-4 mt-4"
              active={pathname.startsWith('/settings')}
            />
          )}

          {isAuthenticated && (
            <button
              type="button"
              onClick={handleLogOut}
              className={`mt-4 flex h-[40px] hover:cursor-pointer ${
                isOpen && 'w-full'
              } items-center gap-4 rounded-md p-3 text-sm font-medium text-indigoGray-90 hover:bg-indigoGray-10 hover:text-indigoGray-50 active:border-solid active:border-indigoGray-30 active:bg-indigoGray-10 active:text-indigoGray-80`}
            >
              <img
                width="16px"
                height="16px"
                src="/icons/sign-out.svg"
                alt="Sign out icon"
              />{' '}
              {isOpen && (
                <span className="w-[fit-content] shrink-0">Sign out</span>
              )}
            </button>
          )}
        </div>
      </motion.aside>
    </>
  );
};

// ===================================================

/*
 * SidebarItem component
 */
interface SidebarItemProps {
  label: string;
  // Expecting icon to be a ReactNode since we want it to be an SVG wrapped w/ JSX that should accept color as a prop
  icon: React.ReactNode;
  href: string;
  isOpen: boolean;
  className?: string;
  active?: boolean;
}

const SidebarItem: React.FC<SidebarItemProps> = ({
  label,
  icon,
  href,
  isOpen,
  className,
  active = false,
}) => {
  return (
    <Link href={href} passHref>
      <motion.a
        variants={sidebarItemVariants}
        animate={isOpen ? 'open' : 'closed'}
        className={`flex h-[40px] w-full items-center gap-4 rounded-md border ${
          !active &&
          'border-hidden hover:bg-indigoGray-10 hover:text-indigoGray-50'
        } p-3 text-sm font-medium text-indigoGray-90 active:border-solid active:border-indigoGray-30 active:bg-indigoGray-10 active:text-indigoGray-80 ${
          active &&
          'border-solid border-indigoGray-30 bg-indigoGray-90 text-indigo-50'
        } ${className}`}
      >
        <span className="shrink-0">{icon}</span> {isOpen && label}
      </motion.a>
    </Link>
  );
};
