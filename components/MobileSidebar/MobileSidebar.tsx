/* eslint-disable @next/next/no-img-element */

import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import * as React from 'react';
import clsx from 'clsx';

import { useLogout, useUser } from 'providers/react-query-auth';
import storage from '@/utils/storage';
import { STORED_USER } from '@/config';
import { useUserSession } from '@/hooks';

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
          <Link legacyBehavior href="/" passHref>
            <a>
              <Image
                src="/icons/home.svg"
                alt="Home icon"
                width={24}
                height={24}
              />
            </a>
          </Link>

          <Link legacyBehavior href="/search" passHref>
            <a>
              <Image
                src="/icons/search.svg"
                alt="Search icon"
                width="24"
                height="24"
              />
            </a>
          </Link>

          {!!profile && !!storedUser ? (
            <>
              <Link
                legacyBehavior
                href={`/people/${profile.eth_address}`}
                passHref
              >
                <a>
                  <img
                    src={profile?.avatar || '/profile-active.svg'}
                    alt="Profile icon"
                    className="h-6 w-6 rounded-full object-cover"
                  />{' '}
                </a>
              </Link>
            </>
          ) : (
            <Link legacyBehavior href="/sign-in" passHref>
              <a>
                <Image
                  src="/icons/user-black.svg"
                  alt="Sign in icon"
                  width="24"
                  height="24"
                />{' '}
              </a>
            </Link>
          )}

          <Link legacyBehavior href="/settings" passHref>
            <a>
              <Image
                src="/icons/sliders.svg"
                alt="Settings icon"
                width="24"
                height="24"
              />{' '}
            </a>
          </Link>
        </>
      )}
    </div>
  );
};
