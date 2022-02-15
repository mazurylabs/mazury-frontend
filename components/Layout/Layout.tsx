import { motion } from 'framer-motion';
import { FC, useState } from 'react';
import { SidebarContext } from '../../contexts';
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
    <div className='flex w-full min-h-screen'>
      <SidebarContext.Provider value={{ isOpen, setIsOpen }}>
        <motion.aside
          className={`hidden lg:flex fixed w-[75px] top-0 h-screen py-10 px-5 shadow-inner flex-col z-20`}
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

      <main className='mx-auto lg:ml-[75px] flex flex-col w-full lg:w-11/12 min-h-screen gap-8 px-0 md:px-8 pt-0'>
        {headerContent}

        <div className='flex flex-col md:flex-row gap-8'>
          <div className='hidden md:flex flex-col w-full md:w-3/12 gap-8'>
            {innerLeftContent}
          </div>

          <div className='flex flex-col w-full md:w-9/12 gap-8 pb-16 md:pb-8 px-4 md:px-0'>
            {innerRightContent}
          </div>
        </div>
      </main>

      <MobileSidebar />
    </div>
  );
};
