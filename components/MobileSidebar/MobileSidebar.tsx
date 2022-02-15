import Link from 'next/link';
import { FC } from 'react';

interface MobileSidebarProps {
  children?: React.ReactNode;
}

export const MobileSidebar: FC<MobileSidebarProps> = ({ children }) => {
  return (
    <div className="fixed bottom-0 left-0 flex w-screen items-center justify-center gap-8 border bg-white p-2 lg:hidden">
      {children || (
        <>
          <Link href="/" passHref>
            <a>
              <img src="/icons/home.svg" alt="Home icon" />
            </a>
          </Link>

          <Link href="/" passHref>
            <a>
              <img src="/icons/search.svg" alt="Home icon" />
            </a>
          </Link>

          <Link
            href="/people/0xF417ACe7b13c0ef4fcb5548390a450A4B75D3eB3"
            passHref
          >
            <a>
              <img src="/profile-active.svg" alt="Profile icon" />{' '}
            </a>
          </Link>

          <Link href="/" passHref>
            <a>
              <img src="/icons/sliders.svg" alt="Settings icon" />{' '}
            </a>
          </Link>
        </>
      )}
    </div>
  );
};
