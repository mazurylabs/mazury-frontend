import { useRouter } from 'next/router';
import React from 'react';
import Link from 'next/link';

export const Layout: React.FC = ({ children }) => {
  const router = useRouter();
  const { pathname } = router;
  const showSidebar = pathname !== '/';

  return (
    <div className='w-full flex'>
      {/* SIDEBAR ON THE LEFT */}
      {showSidebar && (
        <aside className='w-1/12 sticky top-0 border-2 h-screen py-10 px-5'>
          <menu className='flex flex-col gap-12 mt-12 text-xl font-bold items-center'>
            <Link href='/' passHref>
              <a>Home</a>
            </Link>
            <Link href='/search' passHref>
              <a>Search</a>
            </Link>
            <Link href='/people/0x' passHref>
              <a>Profile</a>
            </Link>
            <Link href='/settings' passHref>
              <a>Settings</a>
            </Link>
          </menu>
        </aside>
      )}

      {/* APP */}
      <main className='container w-11/12'>{children}</main>
    </div>
  );
};
