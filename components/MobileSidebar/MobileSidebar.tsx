/* eslint-disable @next/next/no-img-element */
import Image from 'next/image';
import Link from 'next/link';
import { FC } from 'react';

interface MobileSidebarProps {
  children?: React.ReactNode;
  // TODO: Implement active state
}

export const MobileSidebar: FC<MobileSidebarProps> = ({ children }) => {
  return (
    <div className="fixed bottom-0 left-0 flex w-screen items-center justify-between border bg-white px-[58.5px] pt-4 pb-8 lg:hidden">
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

          <Link
            href="/people/0xF417ACe7b13c0ef4fcb5548390a450A4B75D3eB3"
            passHref
          >
            <a>
              <Image
                src="/profile-active.svg"
                alt="Profile icon"
                width="24px"
                height="24px"
              />{' '}
            </a>
          </Link>

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
