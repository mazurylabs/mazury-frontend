import { useRouter } from 'next/router';
import * as React from 'react';
import SVG from 'react-inlinesvg';
import { AnimatePresence } from 'framer-motion';
import { useQuery } from '@tanstack/react-query';

import { Button, Modal } from 'components';
import { Navbar } from './Navbar';
import { NavItem } from './type';
import { useCredentialCount } from 'hooks';
import { RequireSignin } from '@/components/RequireSignin';
import clsx from 'clsx';
import Axios from 'axios';
import { LensPublication } from 'types';

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
      <div className="flex grow flex-col pb-10 lg:flex-row lg:space-x-6 xl:mx-[auto] xl:min-w-[1200px]">
        <div className={clsx(title && 'hidden lg:block')}>{summary}</div>

        <div className="relative flex grow flex-col xl:max-w-fit">
          <div
            className={clsx(
              'top-0 z-20 bg-white pb-4 lg:sticky lg:top-0 lg:pt-10 lg:pb-6',
              title && 'sticky'
            )}
          >
            {title ? (
              <div className="flex items-center justify-between pt-4 pl-4 lg:pt-0 lg:pl-0">
                <div className="flex space-x-2">
                  <button aria-label="back" onClick={handleBack}>
                    <SVG height={24} width={24} src="/icons/chevron-left.svg" />
                  </button>
                  <p className="font-sansMid text-xl font-medium text-indigoGray-90 lg:text-2xl">
                    {title}
                  </p>
                </div>

                {handleSave && (
                  <Button
                    className="mr-2 w-fit !px-5 lg:mr-0 lg:w-[200px]"
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

          <div className="max-w-[826.6px] grow overflow-scroll px-4 xl:min-w-[826.6px] xl:px-0">
            {children}
          </div>
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
  profileId,
}: {
  address: string;
  activeItem: string;
  profileId: string;
}) => {
  const credentialCount = useCredentialCount(address);
  const { data, isLoading } = useLensPost({ profileId });

  const loading = isLoading || credentialCount.isLoading;

  const writingCount = loading
    ? '0'
    : +(data?.items.length || '0') +
      +(credentialCount.data?.posts?.total || '0');

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
      value: String(writingCount),
      icon: '/icons/writing.svg',
      href: `/people/${address}/writing`,
    },
  ];

  return navItems.map((item) =>
    item.label.toLowerCase() === activeItem
      ? {
          ...item,
          isActive: true,
        }
      : item
  );
};

Container.useNavItems = useNavItems;

const getLensPublications = async (profileId: string) => {
  try {
    const query = {
      query: `
      query {
        publications(
          request: {
            profileId: ${JSON.stringify(profileId)}
            limit: ${JSON.stringify(10)}
            publicationTypes: [POST, COMMENT, MIRROR]
          }
        ) {
          items {
            ... on Post {
              id
              stats {
                totalAmountOfMirrors
                totalAmountOfCollects
                totalAmountOfComments
                totalUpvotes
                totalDownvotes
              }
              metadata {
                name
                content
              }
            }
          }
          
        }
      }
      `,
    };

    const response = await Axios.post<{
      data: {
        publications: LensPublication;
      };
    }>('https://api.lens.dev/', query);

    return {
      items: response.data.data.publications.items.filter((item) => item?.id),
    };
  } catch (error) {
    throw error;
  }
};

export const useLensPost = ({ profileId }: { profileId: string }) => {
  return useQuery({
    queryKey: ['lensPublications', profileId],
    queryFn: () => getLensPublications(profileId),
    enabled: !!profileId,
  });
};
