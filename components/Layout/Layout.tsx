import { motion } from 'framer-motion';
import { FC, useState } from 'react';
import { SidebarContext } from 'contexts';
import { MobileSidebar } from '../MobileSidebar/MobileSidebar';
import { Sidebar } from 'components';

interface LayoutProps {
  sidebarContent?: React.ReactNode;
  innerLeftContent: React.ReactNode;
  innerRightContent: React.ReactNode;
  headerContent?: React.ReactNode;
}

export const Layout: FC<LayoutProps> = ({
  sidebarContent = Sidebar,
  innerLeftContent,
  innerRightContent,
  headerContent,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div
      className="min-h-screen w-full flex-col"
      data-testid="layout-container"
    >
      <SidebarContext.Provider value={{ isOpen, setIsOpen }}>
        <motion.aside
          className={`fixed top-0 z-20 hidden h-screen w-[75px] flex-col bg-white py-10 ${
            isOpen && 'px-5'
          } shadow-inner lg:flex`}
          whileHover={{
            width: '200px',
          }}
          onMouseEnter={() => setIsOpen(true)}
          onMouseLeave={() => setIsOpen(false)}
          role="menu"
        >
          {sidebarContent}
        </motion.aside>
      </SidebarContext.Provider>

      <main className="mx-auto flex min-h-[90vh]  w-full flex-col gap-8 px-0 pt-0 md:px-8 lg:ml-[75px] lg:w-11/12">
        {headerContent}

        <div className="flex grow flex-col gap-8 md:flex-row">
          {/* TODO: Fix alignment. Align with the content in the header */}
          <div className="hidden w-full flex-col gap-4 md:flex md:w-3/12">
            {innerLeftContent}
          </div>

          <div className="flex w-full grow flex-col gap-8 px-4 md:w-9/12 md:px-0">
            {innerRightContent}
          </div>
        </div>
      </main>

      <MobileSidebar />
    </div>
  );
};
