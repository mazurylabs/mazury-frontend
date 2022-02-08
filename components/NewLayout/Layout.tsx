import { motion } from 'framer-motion';
import { FC, useState } from 'react';
import { SidebarContext } from '../../contexts';

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
          className={`fixed w-[75px] top-0 border h-screen py-10 px-5 shadow-inner flex flex-col z-20`}
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

      <main className='ml-[75px] flex flex-col w-11/12 min-h-screen border gap-8 p-8'>
        {headerContent && <div className='border'>headerContent</div>}

        <div className='flex gap-8'>
          <div className='flex flex-col w-3/12 border gap-8'>
            {innerLeftContent}
          </div>

          <div className='flex flex-col w-9/12 border gap-8'>
            {innerRightContent}
          </div>
        </div>
      </main>
    </div>
  );
};
