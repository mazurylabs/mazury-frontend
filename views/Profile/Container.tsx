import { useRouter } from 'next/router';
import * as React from 'react';
import SVG from 'react-inlinesvg';
import { AnimatePresence } from 'framer-motion';

import { Button, Modal } from 'components';
import { Navbar } from './Navbar';
import { NavItem } from './type';
import { useCredentialCount } from 'hooks';
import { RequireSignin } from '@/components/RequireSignin';

interface ContainerProps {
  summary: React.ReactElement;
  title?: string;
  navItems?: NavItem[];
  handleGoBack?: () => void;
  handleSave?: () => void;
  isSaving?: boolean;
}

export const Container: React.FC<ContainerProps> & {
  useNavItems: typeof useNavItems;
} = ({
  summary,
  title,
  children,
  navItems,
  handleGoBack,
  handleSave,
  isSaving,
}) => {
  const [toggleSaveModal, setToggleSaveModal] = React.useState(false);
  const router = useRouter();

  const handleBack = () => {
    if (handleGoBack) {
      setToggleSaveModal(true);
      return;
    }
    router.back();
  };

  const handleDontSave = () => {
    handleGoBack?.();
    setToggleSaveModal(false);
  };

  return (
    <>
      <div className="flex grow space-x-6 pb-10">
        {summary}

        <div className="relative flex grow flex-col">
          <div className="sticky top-0 z-20 bg-white pt-10 pb-6">
            {title ? (
              <div className="flex justify-between">
                <div className="flex space-x-2">
                  <button aria-label="back" onClick={handleBack}>
                    <SVG height={24} width={24} src="/icons/chevron-left.svg" />
                  </button>
                  <p className="font-sansMid text-2xl font-medium text-indigoGray-90">
                    {title}
                  </p>
                </div>

                {handleSave && (
                  <Button
                    className="w-[200px]"
                    onClick={handleSave}
                    loading={!toggleSaveModal && isSaving}
                  >
                    Save
                  </Button>
                )}
              </div>
            ) : (
              <Navbar links={navItems || []} />
            )}
          </div>
          <div className="max-w-[826.6px] grow overflow-scroll">{children}</div>
          <Modal
            isOpen={toggleSaveModal}
            onClose={() => setToggleSaveModal(false)}
          >
            <div className="w-fit max-w-[300px]">
              <h3 className="font-demi text-3xl text-indigoGray-90">
                Are you sure?
              </h3>
              <p className="mt-2 font-sansMid text-sm font-medium text-indigoGray-60">
                You have unsaved changes that will be lost if you exit now
              </p>

              <div className="mt-4 flex w-fit justify-between space-x-4">
                <Button
                  className="w-[140px] shrink-0 !border !border-indigoGray-20 !bg-indigoGray-10 !text-indigoGray-90 !shadow-base"
                  variant="secondary"
                  onClick={handleDontSave}
                >
                  Don't save
                </Button>
                <Button
                  className="w-[140px] shrink-0 !px-0 !font-semibold"
                  variant="primary"
                  onClick={handleSave}
                  loading={isSaving}
                >
                  Save changes
                </Button>
              </div>
            </div>
          </Modal>
        </div>
      </div>

      <AnimatePresence>
        <RequireSignin />
      </AnimatePresence>
    </>
  );
};

const useNavItems = ({
  address,
  activeItem,
}: {
  address: string;
  activeItem: string;
}) => {
  const credentialCount = useCredentialCount(address);

  const navItems = [
    { label: 'Overview', isActive: false, href: `/people/${address}` },
    {
      label: 'Credentials',
      isActive: false,
      value: credentialCount.data?.credentials?.total || '0',
      icon: '/icons/credentials.svg',
      href: `/people/${address}/credentials`,
    },
    {
      label: 'Writing',
      isActive: false,
      value: credentialCount.data?.post?.total || '0',
      icon: '/icons/writing-black.svg',
      href: `/people/${address}/writing`,
    },
  ];

  return navItems.map((item) =>
    item.label === activeItem
      ? { ...item, isActive: true, icon: `/icons/${activeItem}-active.svg` }
      : item
  );
};

Container.useNavItems = useNavItems;
