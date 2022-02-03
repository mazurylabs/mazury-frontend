import { useRouter } from 'next/router';
import React from 'react';
import { Sidebar } from './Sidebar';

export const Layout: React.FC = ({ children }) => {
  const router = useRouter();
  const { pathname } = router;
  const showSidebar = pathname !== '/';

  return (
    <div className='w-full flex'>
      {/* SIDEBAR ON THE LEFT */}
      {showSidebar && <Sidebar />}

      {/* APP */}
      <main className='w-11/12 mx-auto'>{children}</main>
    </div>
  );
};
