import { Button } from './Button';
import { Modal } from './Modal';
import { Spinner } from './Spinner';

type Steps = 'idle' | 'active' | 'error';

interface Props {
  step: Steps;
  handleSkip: () => void;
  handleRequestSignature: () => void;
}

export const WalletRequestModal = ({
  step,
  handleSkip,
  handleRequestSignature,
}: Props) => {
  const signWalletStep = (
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
        <Button variant="secondary" onClick={handleSkip}>
          SKIP
        </Button>
        <Button onClick={handleRequestSignature} variant="primary">
          RETRY
        </Button>
      </div>
    </div>
  );

  const errorStep = (
    <div className="flex flex-col">
      <h3 className="font-demi text-3xl text-indigoGray-90">
        Connection failed
      </h3>
      <span className="mt-2 text-sm text-indigoGray-60">
        Something went wrong.
      </span>

      <div className="mt-4 flex w-full justify-around gap-4">
        <Button variant="secondary">SKIP</Button>
        <Button onClick={handleRequestSignature} variant="primary">
          RETRY
        </Button>
      </div>
    </div>
  );

  const steps: Record<Steps, JSX.Element> = {
    idle: <></>,
    active: signWalletStep,
    error: errorStep,
  };

  return (
    <Modal isOpen={step !== 'idle'} onClose={handleSkip}>
      {steps[step]}
    </Modal>
  );
};
