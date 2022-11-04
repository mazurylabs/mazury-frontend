/* eslint-disable @next/next/no-img-element */
import { userSlice } from '../../selectors/index';
import { logout } from '../../slices/user';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import * as React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useAccount } from 'wagmi';

interface MobileSidebarProps {
  children?: React.ReactNode;
  // TODO: Implement active state
}

export const MobileSidebar: React.FC<MobileSidebarProps> = ({ children }) => {
  const [_, disconnect] = useAccount();
  const router = useRouter();
  const dispatch = useDispatch();
  const { address, profile, isAuthenticated } = useSelector(userSlice);

  // const isSignedIn = !!accountData;

  const handleLogOut = () => {
    disconnect();
    dispatch(logout());
    router.push('/');
  };

  return (
    <div className="sticky bottom-0 left-0 flex w-screen items-center justify-between border bg-white px-[58.5px] py-4 lg:hidden">
      {children || (
        <>
          <Link href="/" passHref>
            <a>
              <Image
                src="/icons/home.svg"
                alt="Home icon"
                width="24px"
                height="24px"
              />
            </a>
          </Link>

          <Link href="/search" passHref>
            <a>
              <Image
                src="/icons/search.svg"
                alt="Search icon"
                width="24px"
                height="24px"
              />
            </a>
          </Link>

          {isAuthenticated ? (
            <>
              <Link href={`/people/${address}`} passHref>
                <a>
                  <img
                    src={profile?.avatar || '/profile-active.svg'}
                    alt="Profile icon"
                    width="24px"
                    height="24px"
                    className="rounded-full"
                  />{' '}
                </a>
              </Link>
            </>
          ) : (
            <Link href="/sign-in" passHref>
              <a>
                <Image
                  src="/icons/user-black.svg"
                  alt="Sign in icon"
                  width="24px"
                  height="24px"
                />{' '}
              </a>
            </Link>
          )}

          <Link href="/settings" passHref>
            <a>
              <Image
                src="/icons/sliders.svg"
                alt="Settings icon"
                width="24px"
                height="24px"
              />{' '}
            </a>
          </Link>
        </>
      )}
    </div>
  );
};
