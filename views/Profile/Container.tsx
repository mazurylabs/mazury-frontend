import { useRouter } from 'next/router';
import * as React from 'react';
import SVG from 'react-inlinesvg';

import { Button } from 'components';
import { Navbar } from './Navbar';
import { NavItem } from './type';

interface ContainerProps {
  summary: React.ReactElement;
  title?: string;
  navItems?: NavItem[];
  handleGoBack?: () => void;
  handleSave?: () => void;
}

export const Container: React.FC<ContainerProps> = ({
  summary,
  title,
  children,
  navItems,
  handleGoBack,
  handleSave,
}) => {
  const router = useRouter();

  return (
    <div className="flex space-x-6 pb-10">
      {summary}

      <div className="grow">
        <div className="sticky top-0 z-10 bg-white pt-10 pb-6">
          {title ? (
            <div className="flex justify-between">
              <div className="flex space-x-2">
                <button aria-label="back" onClick={handleGoBack || router.back}>
                  <SVG height={24} width={24} src="/icons/chevron-left.svg" />
                </button>
                <p className="font-sansMid text-2xl font-medium text-indigoGray-90">
                  {title}
                </p>
              </div>

              {handleSave && <Button className="w-[200px]">Save</Button>}
            </div>
          ) : (
            <Navbar links={navItems || []} />
          )}
        </div>

        <div className="grow overflow-scroll">{children}</div>
      </div>
    </div>
  );
};
