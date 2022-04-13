/* eslint-disable @next/next/no-img-element */
import Image from 'next/image';
import Link from 'next/link';
import { FC, useEffect } from 'react';
import { useAccount } from 'wagmi';

interface MobileSidebarProps {
  children?: React.ReactNode;
  // TODO: Implement active state
}

export const MobileSidebar: FC<MobileSidebarProps> = ({ children }) => {
  const [{ data: accountData }] = useAccount();
  const isSignedIn = !!accountData;

  useEffect(() => {
    console.log({ accountData });
  }, [accountData]);

  return (
    <div className="sticky bottom-0 left-0 flex w-screen items-center justify-between border bg-white px-[58.5px] pt-4 pb-8 lg:hidden">
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

          {isSignedIn ? (
            <Link href={`/people/${accountData?.address}`} passHref>
              <a>
                <Image
                  src="/profile-active.svg"
                  alt="Profile icon"
                  width="24px"
                  height="24px"
                />{' '}
              </a>
            </Link>
          ) : (
            <Link href="/sign-in" passHref>
              <a>
                <Image
                  src="/icons/login.svg"
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
