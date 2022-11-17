import * as React from 'react';
import { useSelector } from 'react-redux';

import { updateProfile, verifyTweet } from '@/utils/api';
import { Steps } from './types';
import { userSlice } from '@/selectors';
import { getTwitterConnectionPopupLink } from '@/utils';

import { Modal } from '../Modal';

import { ActiveStep } from './ActiveStep';
import { ErrorStep } from './ErrorStep';
import { DisconnectStep } from './DisconnectStep';

interface TwitterModalProps {
  trigger: React.ReactElement;
  handleSubmit: (twitterUsername: string) => void;
  isDisconnecting?: boolean;
}

export const TwitterModal: React.FC<TwitterModalProps> = ({
  trigger,
  handleSubmit,
  isDisconnecting,
}) => {
  const { profile } = useSelector(userSlice);
  const [url, setUrl] = React.useState<string>('');
  const [currentStep, setCurrentStep] = React.useState<Steps>(Steps.IDLE);

  const submitForVerification = async () => {
    const { data, error } = await verifyTweet(url);

    if (error) {
      setCurrentStep(Steps.ERROR);
    } else {
      handleSubmit(data.username);
      setCurrentStep(Steps.IDLE);
    }
  };

  const disconnectTwitter = async () => {
    const { error } = await updateProfile(profile?.eth_address as string, '', {
      twitter: '',
    });

    if (error) {
      return alert('Error disconnecting profile.');
    }

    handleSubmit('');
  };

  const handleSkip = () => {
    setCurrentStep(Steps.IDLE);
    setUrl('');
  };

  const handleVerifyTwitter = async () => {
    const twitterPopupLink = getTwitterConnectionPopupLink(
      profile?.eth_address as string
    );

    window.open(twitterPopupLink, '_blank');

    setCurrentStep(Steps.ACTIVE);
  };

  const handleDisconnect = () => setCurrentStep(Steps.DISCONNECT);

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
      />
    ),
    error: (
      <ErrorStep
        handleSkip={handleSkip}
        handleRetry={() => submitForVerification()}
      />
    ),
    disconnect: (
      <DisconnectStep
        handleCancel={() => setCurrentStep(Steps.IDLE)}
        handleDisconnect={() => disconnectTwitter()}
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
