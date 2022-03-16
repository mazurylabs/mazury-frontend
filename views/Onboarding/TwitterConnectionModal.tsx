import { Button, Input, Modal, Spinner } from 'components';
import Image from 'next/image';
import { Dispatch, FC, SetStateAction, useState } from 'react';

interface ContentComponentProps {
  onButtonClick?: () => void;
}

const PasteTweetStep: FC<ContentComponentProps> = ({ onButtonClick }) => {
  return (
    <>
      <h3 className="font-demi text-3xl text-indigoGray-90">
        Verify Twitter link
      </h3>
      <span className="mt-2 text-indigoGray-60">
        Paste your tweet&apos;s link here to verify
      </span>

      <Input
        label="Twitter link"
        outerClassName="mt-4"
        placeholder="e.g. https://twitter.com/mazuryxyz"
      />

      <div className="mt-4 flex w-full justify-around gap-4">
        <Button variant="secondary">SKIP</Button>
        <Button onClick={onButtonClick} variant="primary">
          RETRY
        </Button>
      </div>
    </>
  );
};

const WalletSigningStep: FC<ContentComponentProps> = ({ onButtonClick }) => {
  return (
    <div className="flex flex-col">
      <h3 className="font-demi text-3xl text-indigoGray-90">
        Sign with wallet
      </h3>
      <span className="mt-2 text-indigoGray-60">
        Before we finish we need you to sign this with your wallet
      </span>

      <div className="mt-4 flex justify-center">
        <Spinner />
      </div>

      <div className="mt-4 flex w-full justify-around gap-4">
        <Button variant="secondary">SKIP</Button>
        <Button onClick={onButtonClick} variant="primary">
          RETRY
        </Button>
      </div>
    </div>
  );
};

const FailedStep: FC<ContentComponentProps> = ({ onButtonClick }) => {
  return (
    <div className="flex flex-col">
      <h3 className="font-demi text-3xl text-indigoGray-90">
        Connection failed
      </h3>
      <span className="mt-2 text-indigoGray-60">Something went wrong.</span>

      <div className="mt-4 flex w-full justify-around gap-4">
        <Button variant="secondary">SKIP</Button>
        <Button onClick={onButtonClick} variant="primary">
          RETRY
        </Button>
      </div>
    </div>
  );
};

const SuccessStep: FC<ContentComponentProps> = ({ onButtonClick }) => {
  return (
    <div className="flex flex-col">
      <h3 className="font-demi text-3xl text-indigoGray-90">
        You are connected
      </h3>

      <div className="mt-4 flex w-full justify-center">
        <Image
          src="/icons/success.png"
          height="64px"
          width="64px"
          alt="Success indicator"
        />
      </div>

      {/* TEMP */}
      <div className="mt-4 flex w-full justify-around gap-4">
        <Button onClick={onButtonClick} variant="primary">
          CONTINUE
        </Button>
      </div>
    </div>
  );
};

interface TwitterModalProps {
  isOpen: boolean;
  onClose: () => void;
  onFinish: () => void;
}

export const TwitterConnectionModal: FC<TwitterModalProps> = ({
  isOpen,
  onClose,
  onFinish,
}) => {
  const [currentStep, setCurrentStep] = useState(0);

  const resetState = () => {
    setCurrentStep(0);
  };

  const goToNextStep = () => {
    setCurrentStep((currentStep) => currentStep + 1);
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={() => {
        resetState();
        onClose();
      }}
    >
      {currentStep === 0 && <PasteTweetStep onButtonClick={goToNextStep} />}
      {currentStep === 1 && <WalletSigningStep onButtonClick={goToNextStep} />}
      {currentStep === 2 && <FailedStep onButtonClick={goToNextStep} />}
      {currentStep === 3 && <SuccessStep onButtonClick={onFinish} />}
    </Modal>
  );
};
