import * as React from 'react';

import { updateProfile } from 'utils/api';
import { Modal } from './Modal';
import { Button } from './Button';
import { useUser } from '@/providers/react-query-auth';

interface GithubModalProps {
  trigger: React.ReactElement;
  handleSubmit?: (value: string) => void;
  handleConnect?: () => void;
  isDisconnecting: boolean;
}

export const GithubModal: React.FC<GithubModalProps> = ({
  trigger,
  handleSubmit,
  isDisconnecting,
  handleConnect,
}) => {
  const { data: profile } = useUser();
  const [isOpen, setIsOpen] = React.useState(false);

  const handleConnectGithub = async (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
    const githubPopupLink = `https://github.com/login/oauth/authorize?client_id=${process.env.NEXT_PUBLIC_GITHUB_CLIENT_ID}`;
    window.open(githubPopupLink, '_blank');
    handleConnect?.();
  };

  const handleDisconnect = async (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
    const { error } = await updateProfile(profile?.eth_address as string, '', {
      github: '',
    });

    if (error) {
      return alert('Error disconnecting profile.');
    }
    handleSubmit?.('');
  };

  const handleClose = () => setIsOpen(false);
  const handleOpen = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    setIsOpen(true);
  };

  const triggerButton = React.cloneElement(trigger, {
    onClick: isDisconnecting ? handleOpen : handleConnectGithub,
  });

  return (
    <>
      {triggerButton}
      <Modal isOpen={isOpen} onClose={() => setIsOpen(false)}>
        <div className="w-fit max-w-[300px]">
          <h3 className="font-demi text-3xl text-indigoGray-90">
            Disconnect GitHub
          </h3>
          <p className="mt-2 font-sans text-sm font-medium text-indigoGray-60">
            Are you sure you want to disconnect GitHub from your Mazury profile?
          </p>

          <div className="mt-4 flex w-fit justify-around space-x-4">
            <Button
              className="w-[140px] shrink-0 !border !border-indigoGray-20 !bg-indigoGray-10 !text-indigoGray-90 !shadow-base"
              variant="secondary"
              onClick={handleClose}
            >
              Cancel
            </Button>
            <Button
              className="w-[140px] shrink-0"
              variant="primary"
              onClick={(event) => {
                handleDisconnect(event);
                handleClose();
              }}
            >
              Disconnect
            </Button>
          </div>
        </div>
      </Modal>
    </>
  );
};
