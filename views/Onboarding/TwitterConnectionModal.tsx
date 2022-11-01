import { userSlice } from '@/selectors';
import { updateUserProfile } from '@/slices/user';
import { Button, Input, Modal, Spinner } from 'components';
import { TwitterModalContext } from 'contexts';
import Image from 'next/image';
import { FC, useCallback, useContext, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { getMessageToBeSigned, verifyTweet } from 'utils/api';

interface ContentComponentProps {
  onButtonClick?: () => void;
}

const PasteTweetStep: FC<ContentComponentProps> = () => {
  const { goToNextStep, tweetURL, setTweetURL } =
    useContext(TwitterModalContext);

  return (
    <div className="w-[300px] md:w-[350px]">
      <h3 className="font-demi text-3xl text-indigoGray-90">
        Verify Twitter link
      </h3>
      <span className="mt-2 text-sm text-indigoGray-60">
        Paste your tweet&apos;s link here to verify
      </span>

      <Input
        label="Twitter link"
        outerClassName="mt-4"
        placeholder="e.g. https://twitter.com/mazuryxyz/status/1565365440557236224"
        value={tweetURL}
        onChange={(val) => setTweetURL(val)}
      />

      <div className="mt-4 flex w-full justify-around gap-4">
        <Button className="w-1/2" variant="secondary">
          SKIP
        </Button>
        <Button className="w-1/2" onClick={goToNextStep} variant="primary">
          CONNECT
        </Button>
      </div>
    </div>
  );
};

const WalletSigningStep: FC<ContentComponentProps> = ({}) => {
  const dispatch = useDispatch();
  const { goToNextStep, tweetURL, setCurrentStep } =
    useContext(TwitterModalContext);

  const submitForVerification = useCallback(async () => {
    const { error, data } = await verifyTweet(tweetURL as string);

    if (error) {
      // In case of an error go to the next step i.e. the error screen
      goToNextStep();
    } else {
      // In case of success skip the next screen
      dispatch(updateUserProfile({ twitter: data.username }));
      setCurrentStep((currentStep) => currentStep + 2);
    }
  }, [goToNextStep, tweetURL, setCurrentStep]);

  const requestSignature = useCallback(async () => {
    submitForVerification();
  }, [submitForVerification]);

  useEffect(() => {
    requestSignature();
    // we only want to run this once
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="flex w-[300px] flex-col md:w-[350px]">
      <div className="my-4 flex justify-center">
        <Spinner />
      </div>
    </div>
  );
};

const FailedStep: FC<ContentComponentProps> = ({}) => {
  const { goToNextStep } = useContext(TwitterModalContext);
  return (
    <div className="flex w-[300px] flex-col md:w-[350px]">
      <h3 className="font-demi text-3xl text-indigoGray-90">
        Connection failed
      </h3>
      <span className="mt-2 text-sm text-indigoGray-60">
        Something went wrong.
      </span>

      <div className="mt-4 flex w-full justify-around gap-4">
        <Button className="w-1/2" variant="secondary">
          GO BACK
        </Button>
      </div>
    </div>
  );
};

const SuccessStep: FC<ContentComponentProps> = ({ onButtonClick }) => {
  return (
    <div className="flex w-[300px] flex-col md:w-[350px]">
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
