import { Button, Input, Modal, Spinner } from 'components';
import { TwitterModalContext } from 'contexts';
import Image from 'next/image';
import { FC, useCallback, useContext, useEffect, useState } from 'react';
import { getMessageToBeSigned, verifyTweet } from 'utils/api';
import { useAccount, useSignMessage } from 'wagmi';

interface ContentComponentProps {
  onButtonClick?: () => void;
}

const PasteTweetStep: FC<ContentComponentProps> = () => {
  const [{ data: accountData }] = useAccount();
  const { goToNextStep, setMessageToBeSigned, tweetURL, setTweetURL } =
    useContext(TwitterModalContext);

  const address = accountData?.address;

  const proceedToSigning = async () => {
    const { data: messageToBeSigned, error: messageToBeSignedError } =
      await getMessageToBeSigned(address!);
    if (messageToBeSignedError || !messageToBeSigned) {
      return alert(
        'Couldnt get the message to be signed. Please try again later.'
      );
    }
    setMessageToBeSigned(messageToBeSigned);
    goToNextStep();
  };

  return (
    <>
      <h3 className="font-demi text-3xl text-indigoGray-90">
        Verify Twitter link
      </h3>
      <span className="mt-2 text-sm text-indigoGray-60">
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
        <Button onClick={proceedToSigning} variant="primary">
          RETRY
        </Button>
      </div>
    </>
  );
};

const WalletSigningStep: FC<ContentComponentProps> = ({}) => {
  const {
    goToNextStep,
    messageToBeSigned,
    signature,
    setSignature,
    tweetURL,
    setCurrentStep,
  } = useContext(TwitterModalContext);
  const [_, signMessage] = useSignMessage();

  const submitForVerification = useCallback(async () => {
    if (!signature) {
      return alert('Error signing message');
    }
    const { data, error } = await verifyTweet(
      tweetURL as string,
      signature as string
    );
    console.log({ data, error });
    if (error) {
      // In case of an error go to the next step i.e. the error screen
      goToNextStep();
    } else {
      // In case of success skip the next screen
      setCurrentStep((currentStep) => currentStep + 2);
    }
  }, [signature, goToNextStep, tweetURL, setCurrentStep]);

  const requestSignature = useCallback(async () => {
    if (!messageToBeSigned) {
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
    setSignature(signature);
    submitForVerification();
  }, [messageToBeSigned, signMessage, setSignature, submitForVerification]);

  useEffect(() => {
    requestSignature();
    // we only want to run this once
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="flex flex-col">
      <h3 className="font-demi text-3xl text-indigoGray-90">
        Sign with wallet
      </h3>
      <span className="mt-2 text-sm text-indigoGray-60">
        Before we finish we need you to sign this with your wallet
      </span>

      <div className="mt-4 flex justify-center">
        <Spinner />
      </div>

      <div className="mt-4 flex w-full justify-around gap-4">
        <Button variant="secondary">SKIP</Button>
        <Button onClick={requestSignature} variant="primary">
          RETRY
        </Button>
      </div>
    </div>
  );
};

const FailedStep: FC<ContentComponentProps> = ({}) => {
  const { goToNextStep } = useContext(TwitterModalContext);
  return (
    <div className="flex flex-col">
      <h3 className="font-demi text-3xl text-indigoGray-90">
        Connection failed
      </h3>
      <span className="mt-2 text-sm text-indigoGray-60">
        Something went wrong.
      </span>

      <div className="mt-4 flex w-full justify-around gap-4">
        <Button variant="secondary">SKIP</Button>
        <Button onClick={goToNextStep} variant="primary">
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
  const [tweetURL, setTweetURL] = useState<string | undefined>('');
  const [messageToBeSigned, setMessageToBeSigned] = useState<
    string | undefined
  >();
  const [signature, setSignature] = useState<string | undefined>();

  const resetState = useCallback(() => {
    setCurrentStep(0);
  }, [setCurrentStep]);

  const goToNextStep = useCallback(() => {
    setCurrentStep((currentStep) => currentStep + 1);
  }, [setCurrentStep]);

  return (
    <TwitterModalContext.Provider
      value={{
        setCurrentStep,
        currentStep,
        resetState,
        goToNextStep,
        tweetURL,
        setTweetURL,
        messageToBeSigned,
        setMessageToBeSigned,
        signature,
        setSignature,
      }}
    >
      <Modal
        isOpen={isOpen}
        onClose={() => {
          resetState();
          onClose();
        }}
      >
        {currentStep === 0 && <PasteTweetStep />}
        {currentStep === 1 && <WalletSigningStep />}
        {currentStep === 2 && <FailedStep />}
        {currentStep === 3 && <SuccessStep onButtonClick={onFinish} />}
      </Modal>
    </TwitterModalContext.Provider>
  );
};
