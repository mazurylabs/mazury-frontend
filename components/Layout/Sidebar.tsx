import Link from 'next/link';
import * as React from 'react';
import { useRouter } from 'next/router';
import clsx from 'clsx';
import SVG from 'react-inlinesvg';

import { verifyEmail } from 'utils/api';
import { Avatar, WalletRequestModal } from 'components';
import { SignIn } from 'views/SignIn';
import { useLogout, useUser } from 'providers/react-query-auth';
import { useUserSession } from 'hooks';
import storage from 'utils/storage';
import { STORED_USER } from 'config';
import { SidebarContext } from 'contexts';

type Steps = 'idle' | 'active' | 'error';

export const Sidebar: React.FC = () => {
  const { isOpen, signInOpen, setIsOpen, setSignInOpen } =
    React.useContext(SidebarContext);

  const logout = useLogout();
  const router = useRouter();

  const userSessionExpired = useUserSession();
  const [currentStep, setCurrentStep] = React.useState<Steps>('idle');

  const storedUser = storage.getToken(STORED_USER);

  const { data: profile } = useUser({
    enabled: !userSessionExpired,
    initialData: storedUser,
  });

  const navItems = {
    secondRow: [
      {
        name: 'Opportunities',
        to: '/',
        icon: '/icons/opportunities.svg',
        active:
          router.pathname.includes('opportunities') || router.pathname === '/',
      },
      {
        name: 'Search',
        to: '/search',
        icon: '/icons/search.svg',
        active: router.pathname.includes('search'),
      },
      storedUser?.is_recruiter && {
        name: 'Projects',
        to: '/projects',
        icon: '/icons/dashboard.svg',
        active: router.pathname.includes('projects'),
      },
    ].filter(Boolean),
    thirdRow: [
      storedUser && {
        name: 'Profile',
        to: `/people/${storedUser.eth_address}`,
        icon: (
          <Avatar
            src={storedUser.avatar}
            alt="user"
            variant="xs"
            outerClassName="h-4 w-4 shrink-0"
          />
        ),
        active: router.pathname.includes('people'),
      },
      !storedUser && {
        name: 'Sign in',
        onClick: () => setSignInOpen(true),
        icon: '/icons/user.svg',
      },
      storedUser && {
        name: 'Settings',
        to: `/settings`,
        icon: '/icons/settings.svg',
        active: router.pathname.includes('settings'),
      },
      {
        name: 'Give feedback',
        icon: '/icons/help-circle.svg',
        active: false,
        onClick: () =>
          window.open('https://mazury.canny.io/feedback', '_blank'),
      },
      storedUser && {
        name: 'Sign out',
        onClick: () => logout.mutate({}, { onSuccess: () => router.push('/') }),
        icon: '/icons/sign-out.svg',
      },
    ].filter(Boolean),
  };

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

  return (
    <>
      <aside
        role="menu"
        className={clsx(
          'h-screen fixed left-0 top-0 z-30 hidden lg:flex bg-white px-2 pt-6 pb-4 border-r border-indigoGray-20',
          signInOpen && 'w-[335px]'
        )}
        onPointerEnter={() => setIsOpen(true)}
        onPointerLeave={() => !signInOpen && setIsOpen(false)}
      >
        {signInOpen && (
          <div className="flex flex-col">
            <button
              type="button"
              className="justify-start hover:cursor-pointer h-6 w-6"
              aria-label="back"
              onClick={() => setSignInOpen(false)}
            >
              <SVG src="/icons/arrow-left.svg" height={24} width={24} />
            </button>

            <SignIn />
          </div>
        )}

        {!signInOpen && (
          <div
            className={clsx(
              'flex flex-col grow transition-all',
              isOpen ? 'w-[184px]' : 'w-10'
            )}
          >
            <div className="flex w-full items-center">
              <SidebarItem
                icon={
                  <div className="h-8 w-8">
                    <SVG src="/new-logo.svg" className="h-8 w-8 shrink-0" />
                  </div>
                }
                href="/"
              />
            </div>

            <div className="grow border-t border-b border-indigoGray-20 pt-8 my-8 space-y-4">
              {navItems.secondRow.map((item) => (
                <SidebarItem
                  key={item.name}
                  icon={item.icon}
                  label={item.name}
                  href={item.to}
                  active={item.active}
                />
              ))}
            </div>

            <div className="space-y-3">
              {navItems.thirdRow.map((item) => (
                <SidebarItem
                  key={item.name}
                  icon={item.icon}
                  label={item.name}
                  href={item.to}
                  onClick={item.onClick}
                  active={item.active}
                  variant="sm"
                />
              ))}
            </div>
          </div>
        )}
      </aside>

      {signInOpen && (
        <WalletRequestModal
          step={currentStep}
          handleSkip={() => setCurrentStep('idle')}
          handleRequestSignature={handleEmailVerification}
        />
      )}
    </>
  );
};

type SidebarItemProps = {
  label?: string;
  icon: React.ReactNode | string;
  active?: boolean;
  href: string;
  onClick?: () => void;
  variant?: 'sm' | 'lg';
};

const SidebarItem = ({
  label,
  icon,
  active = false,
  variant = 'lg',
  ...props
}: SidebarItemProps) => {
  const Component = props.href ? Link : 'button';

  return (
    <Component
      {...props}
      className={clsx(
        'transition-all rounded-md flex items-center space-x-3 font-sans text-sm overflow-hidden w-full',
        variant === 'lg' ? 'h-10 font-medium' : 'h-[16px] font-normal',
        label && 'px-3',
        label &&
          !active &&
          variant === 'lg' &&
          'hover:bg-indigoGray-10 hover:text-indigoGray-50',
        label && !active && variant === 'sm' && 'hover:text-indigoGray-50',
        active && variant === 'lg' && 'bg-indigoGray-90 text-indigo-50',
        active && variant === 'sm' && 'text-indigoGray-50',
        !active && variant === 'lg' && 'bg-transparent text-indigoGray-90'
      )}
    >
      {typeof icon === 'string' ? (
        <SVG src={icon} className="shrink-0 h-4 w-4" />
      ) : (
        icon
      )}{' '}
      <span className="whitespace-nowrap">{label}</span>
    </Component>
  );
};
