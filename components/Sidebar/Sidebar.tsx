/* eslint-disable @next/next/no-img-element */
import Link from 'next/link';
import * as React from 'react';
import { SidebarContext } from 'contexts';
import { useRouter } from 'next/router';
import Image from 'next/image';
import { useDispatch, useSelector } from 'react-redux';

import { userSlice } from '@/selectors';
import { logout } from '@/slices/user';
import { SignIn } from '@/views/SignIn';
import { colors } from '@/utils';
import { verifyEmail } from '@/utils/api';
import { WalletRequestModal } from '@/components/WalletRequestModal';
import { SlidersIcon } from '@/components/Icons';
import { HomeIcon, SearchIcon } from '@/components';
import { useAccount } from 'wagmi';

const iconColors = {
  active: colors.indigo[50],
  inactive: colors.indigoGray[90],
};

type Steps = 'idle' | 'active' | 'error';

export const Sidebar: React.FC = () => {
  const [currentStep, setCurrentStep] = React.useState<Steps>('idle');
  const router = useRouter();
  const dispatch = useDispatch();
  const [_, disconnect] = useAccount();
  const { pathname } = router;
  const { profile, address, isAuthenticated } = useSelector(userSlice);
  const { isOpen, signInOpen, setSignInOpen } =
    React.useContext(SidebarContext);

  const openSignIn = () => setSignInOpen(true);
  const closeSignIn = () => setSignInOpen(false);

  const handleEmailVerification = async () => {
    setCurrentStep('active');

    if (address) {
      const { error } = await verifyEmail(address);
      if (!error) {
        setCurrentStep('idle');
      } else {
        setCurrentStep('error');
      }
    }
  };

  const handleLogOut = () => {
    disconnect();
    dispatch(logout());
  };

  return (
    <>
      <Image
        src="/new-logo.svg"
        height="32px"
        width="32px"
        alt="Mazury logo"
        className={`${
          isOpen ? 'ml-4' : 'mx-auto'
        } rounded-full hover:cursor-pointer`}
        onClick={() => router.push('/')}
      />

      <Divider className="mx-3 mt-8" />

      <menu
        className={`mt-12 flex flex-col text-xl font-bold ${
          isOpen ? 'items-start' : 'items-center'
        } h-[100%] ${!signInOpen && 'px-3'}`}
      >
        {signInOpen ? (
          <div className="flex flex-col">
            <img
              alt="Go back icon"
              src="/icons/arrow-left.svg"
              height="24px"
              width="24px"
              className="my-8 justify-start hover:cursor-pointer"
              onClick={closeSignIn}
            />
            {true && <SignIn />}
          </div>
        ) : (
          <>
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
                  color={
                    pathname === '/' ? iconColors.active : iconColors.inactive
                  }
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

              <Divider />

              {isAuthenticated ? (
                <>
                  {/* // Profile button */}
                  <SidebarItem
                    href={`/people/${address}`}
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
                <a
                  onClick={openSignIn}
                  className={`mt-8 flex h-[40px] hover:cursor-pointer ${
                    isOpen && 'w-full'
                  } items-center gap-4 rounded-md p-3 text-sm font-medium text-indigoGray-90 hover:bg-indigoGray-10 hover:text-indigoGray-50 active:border-solid active:border-indigoGray-30 active:bg-indigoGray-10 active:text-indigoGray-80`}
                >
                  <img
                    width="16px"
                    height="16px"
                    src="/icons/login.svg"
                    alt="Sign in icon"
                  />{' '}
                  {isOpen && <span>Sign in</span>}
                </a>
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
                <a
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
                  {isOpen && <span>Sign out</span>}
                </a>
              )}
            </div>
          </>
        )}
      </menu>
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
      <a
        className={`flex h-[40px] ${
          isOpen && 'w-full'
        } items-center gap-4 rounded-md border ${
          !active && 'border-hidden'
        } p-3 text-sm font-medium text-indigoGray-90 hover:bg-indigoGray-10 hover:text-indigoGray-50 active:border-solid active:border-indigoGray-30 active:bg-indigoGray-10 active:text-indigoGray-80 ${
          active &&
          'border-solid border-indigoGray-30 bg-indigoGray-90 text-indigo-50'
        } ${className}`}
      >
        <span>{icon}</span> {isOpen && label}
      </a>
    </Link>
  );
};

// ==================================

/*
 * Divider component
 */

interface DividerProps {
  className?: string;
}

const Divider: React.FC<DividerProps> = ({ className }) => {
  return <hr className={`border border-indigoGray-20 ${className}`} />;
};
