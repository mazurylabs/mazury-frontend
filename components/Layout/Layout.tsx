import { motion } from 'framer-motion';
import { FC, useState } from 'react';
import { SidebarContext } from 'contexts';
import { MobileSidebar } from '../MobileSidebar/MobileSidebar';

interface LayoutProps {
  sidebarContent: React.ReactNode;
  innerLeftContent: React.ReactNode;
  innerRightContent: React.ReactNode;
  headerContent?: React.ReactNode;
}

export const Layout: FC<LayoutProps> = ({
  sidebarContent,
  innerLeftContent,
  innerRightContent,
  headerContent,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="flex min-h-screen w-full">
      <SidebarContext.Provider value={{ isOpen, setIsOpen }}>
        <motion.aside
          className={`fixed top-0 z-20 hidden h-screen w-[75px] flex-col py-10 px-5 shadow-inner lg:flex`}
          style={{
            background:
              'linear-gradient(184.64deg, #FFFFFF -5.13%, #E7E8E9 103.54%)',
          }}
          whileHover={{
            width: '266px',
          }}
          onMouseEnter={() => setIsOpen(true)}
          onMouseLeave={() => setIsOpen(false)}
        >
          {sidebarContent}
        </motion.aside>
      </SidebarContext.Provider>

      <main className="mx-auto flex min-h-screen w-full flex-col gap-8 px-0 pt-0 md:px-8 lg:ml-[75px] lg:w-11/12">
        {headerContent}

        <div className="flex flex-col gap-8 md:flex-row">
          <div className="hidden w-full flex-col gap-8 md:flex md:w-3/12">
            {innerLeftContent}
          </div>

          <div className="flex w-full flex-col gap-8 px-4 pb-16 md:w-9/12 md:px-0 md:pb-8">
            {innerRightContent}
          </div>
        </div>
      </main>

      <MobileSidebar />
    </div>
  );
};
