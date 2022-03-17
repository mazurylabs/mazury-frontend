import { Button, Input, Modal, Spinner } from 'components';
import { Bytes } from 'ethers';
import Image from 'next/image';
import { FC, useState } from 'react';
import { getMessageToBeSigned, verifyTweet } from 'utils/api';
import { useAccount, useSignMessage } from 'wagmi';

interface ContentComponentProps {
  onButtonClick?: () => void;
  signMessage?: (
    config?:
      | {
          message?: string | Bytes | undefined;
        }
      | undefined
  ) => Promise<
    | {
        data: string;
        error: undefined;
      }
    | {
        data: undefined;
        error: Error;
      }
  >;
  address?: string;
}

const PasteTweetStep: FC<ContentComponentProps> = ({
  onButtonClick,
  signMessage,
  address,
}) => {
  const [tweetURL, setTweetURL] = useState('');

  const verifyConnection = async () => {
    const { data: messageToBeSigned, error: messageToBeSignedError } =
      await getMessageToBeSigned(address!);

    if (messageToBeSignedError || !messageToBeSigned) {
      return alert(
        'Couldnt get the message to be signed. Please try again later.'
      );
    }

    const { data: signature, error: signatureError } = await signMessage!({
      message: messageToBeSigned as string,
    });

    if (!signature || signatureError) {
      return alert('Error signing message');
    }

    const { data, error } = await verifyTweet(tweetURL, signature);

    console.log({ data, error });
  };

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
        value={tweetURL}
        onChange={(val) => setTweetURL(val)}
      />

      <div className="mt-4 flex w-full justify-around gap-4">
        <Button variant="secondary">SKIP</Button>
        <Button onClick={verifyConnection} variant="primary">
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
  const [_, signMessage] = useSignMessage();
  const [{ data: accountData }] = useAccount();

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
      {currentStep === 0 && (
        <PasteTweetStep
          onButtonClick={goToNextStep}
          signMessage={signMessage}
          address={accountData?.address}
        />
      )}
      {currentStep === 1 && <WalletSigningStep onButtonClick={goToNextStep} />}
      {currentStep === 2 && <FailedStep onButtonClick={goToNextStep} />}
      {currentStep === 3 && <SuccessStep onButtonClick={onFinish} />}
    </Modal>
  );
};
