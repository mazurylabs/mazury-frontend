/* eslint-disable @next/next/no-img-element */
import Link from 'next/link';
import * as React from 'react';
import { SidebarContext } from 'contexts';
import { useRouter } from 'next/router';
import SVG from 'react-inlinesvg';

import { SignIn } from 'views/SignIn';

import { colors } from 'utils';
import { verifyEmail } from 'utils/api';

import { WalletRequestModal } from 'components/WalletRequestModal';
import { SlidersIcon } from 'components/Icons';
import { HomeIcon, SearchIcon } from 'components';

import { useLogout, useUser } from 'providers/react-query-auth';
import { useUserSession } from '@/hooks';
import storage from '@/utils/storage';
import { STORED_USER } from '@/config';

const iconColors = {
  active: colors.indigo[50],
  inactive: colors.indigoGray[90],
};

type Steps = 'idle' | 'active' | 'error';

export const Sidebar: React.FC = () => {
  const logout = useLogout();
  const router = useRouter();

  const userSessionExpired = useUserSession();

  const [currentStep, setCurrentStep] = React.useState<Steps>('idle');

  const storedUser = storage.getToken(STORED_USER);

  const { pathname } = router;
  const { data: profile } = useUser({
    enabled: !userSessionExpired,
    initialData: storedUser,
  });

  const { isOpen, signInOpen, setSignInOpen } =
    React.useContext(SidebarContext);

  const openSignIn = () => setSignInOpen(true);
  const closeSignIn = () => setSignInOpen(false);

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
    logout.mutate({}, { onSuccess: () => router.push('/') });
  };

  return (
    <>
      <menu
        className={`flex min-w-[200px] flex-col text-xl font-bold ${
          isOpen ? 'justify-center' : 'items-center'
        } grow`}
      >
        {signInOpen ? (
          <div className="flex flex-col">
            <button
              type="button"
              className="justify-start hover:cursor-pointer"
              aria-label="back"
              onClick={closeSignIn}
            >
              <SVG src="/icons/arrow-left.svg" height={24} width={24} />
            </button>
            <SignIn />
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
                !!storedUser &&
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

              {!!storedUser ? (
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
                <button
                  type="button"
                  onClick={openSignIn}
                  className={`flex h-[40px] hover:cursor-pointer ${
                    isOpen && 'w-full'
                  } items-center gap-4 rounded-md p-3 text-sm font-medium text-indigoGray-90 hover:bg-indigoGray-10 hover:text-indigoGray-50 active:border-solid active:border-indigoGray-30 active:bg-indigoGray-10 active:text-indigoGray-80`}
                >
                  <SVG width="16px" height="16px" src="/icons/user-black.svg" />{' '}
                  {isOpen && (
                    <span className="w-[fit-content] shrink-0">Sign in</span>
                  )}
                </button>
              )}

              {!!storedUser && (
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

              {!!storedUser && (
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
    <Link legacyBehavior href={href} passHref>
      <a
        className={`flex h-[40px] ${
          isOpen && 'w-full'
        } items-center gap-4 rounded-md border ${
          !active &&
          'border-hidden hover:bg-indigoGray-10 hover:text-indigoGray-50'
        } p-3 text-sm font-medium text-indigoGray-90 active:border-solid active:border-indigoGray-30 active:bg-indigoGray-10 active:text-indigoGray-80 ${
          active &&
          'border-solid border-indigoGray-30 bg-indigoGray-90 text-indigo-50'
        } ${className}`}
      >
        <span className="shrink-0">{icon}</span> {isOpen && label}
      </a>
    </Link>
  );
};
