import * as React from 'react';

import { updateProfile, verifyTweet } from '@/utils/api';
import { Steps } from './types';
import { getTwitterConnectionPopupLink } from '@/utils';

import { Modal } from '../Modal';

import { ActiveStep } from './ActiveStep';
import { ErrorStep } from './ErrorStep';
import { DisconnectStep } from './DisconnectStep';
import { useUser } from 'providers/react-query-auth';

interface TwitterModalProps {
  trigger: React.ReactElement;
  handleSubmit?: (twitterUsername: string) => void;
  isDisconnecting?: boolean;
}

export const TwitterModal: React.FC<TwitterModalProps> = ({
  trigger,
  handleSubmit,
  isDisconnecting,
}) => {
  const [loading, setLoading] = React.useState(false);
  const { data: profile } = useUser();
  const [url, setUrl] = React.useState<string>('');
  const [currentStep, setCurrentStep] = React.useState<Steps>(Steps.IDLE);

  const submitForVerification = async () => {
    setLoading(true);

    const { data, error } = await verifyTweet(url);

    if (error) {
      setCurrentStep(Steps.ERROR);
    } else {
      handleSubmit?.(data.username);
      setCurrentStep(Steps.IDLE);
    }

    setLoading(false);
  };

  const disconnectTwitter = async (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
    setLoading(true);

    const { error } = await updateProfile(profile?.eth_address as string, '', {
      twitter: '',
    });

    if (error) {
      return alert('Error disconnecting profile.');
    }
    setLoading(false);
    handleSubmit?.('');
  };

  const handleSkip = () => {
    setCurrentStep(Steps.IDLE);
    setUrl('');
  };

  const handleVerifyTwitter = async (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
    const twitterPopupLink = getTwitterConnectionPopupLink(
      profile?.eth_address as string
    );

    window.open(twitterPopupLink, '_blank');

    setCurrentStep(Steps.ACTIVE);
  };

  const handleDisconnect = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    setCurrentStep(Steps.DISCONNECT);
  };

  const triggerButton = React.cloneElement(trigger, {
    onClick: isDisconnecting ? handleDisconnect : handleVerifyTwitter,
  });

  const steps: Record<Steps, JSX.Element> = {
    idle: <></>,
    active: (
      <ActiveStep
        handleChange={(value) => setUrl(value)}
        handleConnect={() => submitForVerification()}
        handleSkip={handleSkip}
        url={url}
        loading={loading}
      />
    ),
    error: (
      <ErrorStep
        handleSkip={handleSkip}
        handleRetry={() => submitForVerification()}
        loading={loading}
      />
    ),
    disconnect: (
      <DisconnectStep
        handleCancel={() => setCurrentStep(Steps.IDLE)}
        handleDisconnect={disconnectTwitter}
        loading={loading}
      />
    ),
  };

  return (
    <>
      {triggerButton}
      <Modal
        isOpen={currentStep !== Steps.IDLE}
        onClose={() => setCurrentStep(Steps.IDLE)}
        containerClassName="!w-fit"
      >
        {steps[currentStep]}
      </Modal>
    </>
  );
};
