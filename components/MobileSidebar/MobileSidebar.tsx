/* eslint-disable @next/next/no-img-element */

import Link from 'next/link';
import { useRouter } from 'next/router';
import * as React from 'react';
import clsx from 'clsx';
import SVG from 'react-inlinesvg';

import { useLogout, useUser } from 'providers/react-query-auth';
import storage from '@/utils/storage';
import { STORED_USER } from '@/config';
import { useUserSession } from '@/hooks';
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

  const handleLogOut = () => {
    logout.mutate({}, { onSuccess: () => router.push('/') });
  };

  return (
    <div
      className={clsx(
        'sticky bottom-0 left-0 flex w-screen items-center justify-between border bg-white px-[58.5px] py-4 lg:hidden',
        className
      )}
    >
      {children || (
        <>
          <Link href="/" passHref>
            <span className="sr-only">Home</span>
            <SVG src="/icons/home.svg" width={24} height={24} />
          </Link>

          <Link href="/search" passHref>
            <span className="sr-only">Search</span>
            <SVG src="/icons/search.svg" width={24} height={24} />
          </Link>

          {!!profile && !!storedUser ? (
            <Link href={`/people/${profile.eth_address}`}>
              <Avatar
                src={profile?.avatar || '/profile-active.svg'}
                alt={profile.username}
                variant="sm"
              />
            </Link>
          ) : (
            <Link href="/sign-in" passHref>
              <span className="sr-only">Sign in</span>
              <SVG
                src="/icons/user.svg"
                width={24}
                height={24}
                className="text-indigoGray-90"
              />
            </Link>
          )}

          <Link href="/settings" passHref>
            <span className="sr-only">Settings</span>
            <SVG src="/icons/sliders.svg" width={24} height={24} />{' '}
          </Link>
        </>
      )}
    </div>
  );
};
