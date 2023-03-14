import { FC } from 'react';
import { MobileSidebar } from '../MobileSidebar/MobileSidebar';
import { Sidebar } from 'components';

interface LayoutProps {
  sidebarContent?: React.ReactNode;
  innerLeftContent?: React.ReactNode;
  innerRightContent?: React.ReactNode;
  headerContent?: React.ReactNode;
  variant?: 'three-part' | 'plain';
  children?: React.ReactNode;
}

export const Layout: FC<LayoutProps> = ({
  innerLeftContent,
  innerRightContent,
  headerContent,
  variant = 'three-part',
  children,
}) => {
  return (
    <div
      className="flex min-h-screen w-full flex-col"
      data-testid="layout-container"
    >
      <Sidebar />

      <main className="mx-auto flex  w-full grow flex-col gap-8 px-0 pt-0 md:px-8 lg:ml-[75px] lg:w-11/12">
        {variant === 'three-part' && (
          <>
            {headerContent}

            <div className="flex min-h-[80vh] grow flex-col gap-8 md:flex-row">
              {/* TODO: Fix alignment. Align with the content in the header */}
              <div className="hidden w-full flex-col gap-4 md:flex md:w-3/12">
                {innerLeftContent}
              </div>

              <div className="flex w-full grow flex-col gap-8 px-4 md:w-9/12 md:px-0">
                {innerRightContent}
              </div>
            </div>
          </>
        )}
        {variant === 'plain' && <>{children}</>}
      </main>

      <MobileSidebar />
    </div>
  );
};
