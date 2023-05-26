/* eslint-disable @next/next/no-img-element */

import Link from 'next/link';
import { useRouter } from 'next/router';
import * as React from 'react';
import clsx from 'clsx';
import SVG from 'react-inlinesvg';
import * as Popover from '@radix-ui/react-popover';

import { useLogout, useUser } from 'providers/react-query-auth';
import storage from 'utils/storage';
import { STORED_USER } from 'config';
import { useMobile, useUserSession } from 'hooks';
import { Avatar } from '../Avatar';

interface MobileSidebarProps {
  children?: React.ReactNode;
  className?: string;
}

export const MobileSidebar: React.FC<MobileSidebarProps> = ({
  children,
  className,
}) => {
  const userSessionExpired = useUserSession();
  const router = useRouter();
  const logout = useLogout();

  const storedUser = storage.getToken(STORED_USER);

  const { data: profile } = useUser({
    enabled: !userSessionExpired,
    initialData: storedUser,
  });

  return (
    <div
      className={clsx(
        'sticky bottom-0 left-0 flex w-screen items-center justify-center border bg-white px-[58.5px] py-4 lg:hidden',
        className
      )}
    >
      <div className="flex items-center space-x-16">
        <NavItem
          to="/"
          icon="/icons/opportunities.svg"
          label="home"
          active={
            router.pathname.includes('opportunities') || router.pathname === '/'
          }
        />
        <NavItem
          label="Search"
          to="/search"
          icon="/icons/search.svg"
          active={router.pathname.includes('search')}
        />

        {storedUser?.is_recruiter && (
          <NavItem
            label="Projects"
            to="/projects"
            icon="/icons/dashboard.svg"
            active={router.pathname.includes('projects')}
          />
        )}

        {!storedUser && (
          <Link href="/sign-in" passHref>
            <span className="sr-only">Sign in</span>
            <SVG
              src="/icons/user.svg"
              width={24}
              height={24}
              className={
                router.pathname.includes('sign-in')
                  ? 'text-indigoGray-90'
                  : 'text-indigoGray-40'
              }
            />
          </Link>
        )}

        {storedUser && (
          <Popover.Root>
            <div className="flex items-center space-x-4">
              <Popover.Trigger className="relative">
                <Avatar
                  src={profile?.avatar || '/profile-active.svg'}
                  alt={profile?.username || ''}
                  variant="sm"
                />
              </Popover.Trigger>
            </div>

            <Popover.Portal>
              <Popover.Content
                align="center"
                sideOffset={10}
                className="h-[106px] w-[200px]"
              >
                <div className="flex flex-col py-[5px] space-y-[6.5px] items-start h-full w-full flex-col rounded-lg bg-white shadow-base font-sans text-sm text-indigoGray-90">
                  <Link
                    href={`/people/${storedUser.eth_address}`}
                    passHref
                    className="font-regular pl-4 grow text-sm font-sans text-indigoGray-90 flex items-center space-x-3 w-full grow"
                  >
                    <Avatar
                      src={storedUser.avatar}
                      alt="user"
                      variant="xs"
                      outerClassName="h-4 w-4 shrink-0"
                    />
                    <span>Profile</span>
                  </Link>

                  <Link
                    href={'/settings'}
                    passHref
                    className="font-regular pl-4 grow text-sm font-sans text-indigoGray-90 flex items-center space-x-3 w-full grow"
                  >
                    <SVG src="/icons/settings.svg" width={16} height={16} />
                    <span>Settings</span>
                  </Link>

                  <button
                    type="button"
                    className="font-regular pl-4 grow text-sm font-sans text-indigoGray-90 flex items-center space-x-3 w-full grow"
                    onClick={() =>
                      window.open('https://mazury.canny.io/feedback', '_blank')
                    }
                  >
                    <SVG src="/icons/help-circle.svg" width={16} height={16} />
                    <span>Give feedback</span>
                  </button>

                  <button
                    type="button"
                    className="font-regular pl-4 grow text-sm font-sans text-indigoGray-90 flex items-center space-x-3 w-full grow"
                    onClick={() =>
                      logout.mutate({}, { onSuccess: () => router.push('/') })
                    }
                  >
                    <SVG src="/icons/sign-out.svg" width={16} height={16} />
                    <span>Sign out</span>
                  </button>
                </div>
                <Popover.Arrow fill="white" className="drop-shadow" />
              </Popover.Content>
            </Popover.Portal>
          </Popover.Root>
        )}
      </div>
    </div>
  );
};

const NavItem = ({
  to,
  active,
  icon,
  label,
}: {
  to: string;
  active: boolean;
  icon: string;
  label: string;
}) => {
  return (
    <Link
      href={to}
      passHref
      className={clsx(active ? 'text-indigoGray-90' : 'text-indigoGray-40')}
    >
      <span className="sr-only">{label}</span>
      <SVG src={icon} width={24} height={24} />
    </Link>
  );
};
