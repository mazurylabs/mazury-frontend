import * as React from 'react';
import clsx from 'clsx';

import { MobileSidebar } from 'components';
import { Sidebar } from './Sidebar';

interface LayoutProps {
  variant?: 'plain';
  showMobileSidebar?: boolean;
  className?: string;
}

export const Layout: React.FC<LayoutProps> = ({
  children,
  showMobileSidebar = true,
  className,
}) => {
  return (
    <div
      className="flex min-h-screen w-full flex-col"
      data-testid="layout-container"
    >
      <Sidebar />

      <main className={clsx('w-full grow flex px-0 pt-0 md:px-8', className)}>
        <div className="w-full lg:w-[calc(100vw-56px)] lg:pl-[56px] lg:mx-auto">
          {children}
        </div>
      </main>

      <MobileSidebar className={clsx(!showMobileSidebar && 'hidden')} />
    </div>
  );
};
