import { motion } from 'framer-motion';
import { FC, useState } from 'react';
import { SidebarContext } from 'contexts';
import { MobileSidebar } from '../MobileSidebar/MobileSidebar';
import { Sidebar } from 'components';
import Link from 'next/link';
import SVG from 'react-inlinesvg';

interface LayoutProps {
  sidebarContent?: React.ReactNode;
  innerLeftContent?: React.ReactNode;
  innerRightContent?: React.ReactNode;
  headerContent?: React.ReactNode;
  variant?: 'three-part' | 'plain';
  children?: React.ReactNode;
}

export const Layout: FC<LayoutProps> = ({
  sidebarContent = <Sidebar />,
  innerLeftContent,
  innerRightContent,
  headerContent,
  variant = 'three-part',
  children,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [signInOpen, setSignInOpen] = useState(false);

  const variants = {
    open: {
      width: 225,
      transition: { duration: 0.2 },
    },
    signInOpen: {
      width: 335,
      transition: { duration: 0.2 },
    },
    closed: {
      width: 75,
      transition: { duration: 0.2 },
    },
  };

  return (
    <div
      className="flex min-h-screen w-full flex-col"
      data-testid="layout-container"
    >
      <SidebarContext.Provider
        value={{ isOpen, setIsOpen, signInOpen, setSignInOpen }}
      >
        <motion.aside
          variants={variants}
          animate={signInOpen ? 'signInOpen' : isOpen ? 'open' : 'closed'}
          className={`fixed top-0 z-30 !hidden h-screen flex-col items-center bg-white px-4 py-6 shadow-inner lg:!flex`}
          onMouseEnter={() => setIsOpen(true)}
          onMouseLeave={() => !signInOpen && setIsOpen(false)}
          role="menu"
        >
          <Link href="/">
            <a className="cursor-pointer">
              <SVG src="/new-logo.svg" height="32px" width="32px" />
            </a>
          </Link>

          <hr className={`mx-3 my-8 w-full border border-indigoGray-20`} />
          {sidebarContent}
        </motion.aside>
      </SidebarContext.Provider>

      <main className="mx-auto flex  w-full grow flex-col gap-8 px-0 pt-0 md:px-8 lg:ml-[75px] lg:w-11/12">
        {variant === 'three-part' && (
          <>
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
          </>
        )}
        {variant === 'plain' && <>{children}</>}
      </main>

      <MobileSidebar />
    </div>
  );
};
