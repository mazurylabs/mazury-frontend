import { useRouter } from 'next/router';
import * as React from 'react';
import SVG from 'react-inlinesvg';
import { useSignMessage } from 'wagmi';
import { useDispatch, useSelector } from 'react-redux';

import { getProfile } from '@/utils/api';
import { createSiweMessage, getTokens } from '@/utils/api';
import storage from '@/utils/storage';

import { Button, Modal, Spinner } from '@/components';
import { ACCESS_TOKEN_KEY, REFRESH_TOKEN_KEY } from '@/config';
import { userSlice } from '@/selectors';
import { login } from '@/slices/user';

type Steps = 'initialise' | 'loading' | 'error';

interface SignInModalProps {
  onClose: () => void;
}

const wagmiSetupKeys = [
  'wagmi.wallet',
  '-walletlink:https://www.walletlink.org:session:id',
  ' -walletlink:https://www.walletlink.org:session:secret',
  '-walletlink:https://www.walletlink.org:session:linked',
  '-walletlink:https://www.walletlink.org:IsStandaloneSigning',
];

export const SignInModal: React.FC<SignInModalProps> = ({ onClose }) => {
  const router = useRouter();
  const dispatch = useDispatch();
  const { address, profile } = useSelector(userSlice);
  const [_, signMessage] = useSignMessage();
  const [activeStep, setActiveStep] = React.useState<Steps>('initialise');

  const clearWagmiStorage = () => {
    wagmiSetupKeys.forEach((key) => localStorage.removeItem(key));
  };

  const handleAuthCredentials = async () => {
    if (!address) {
      alert('Please connect your wallet first');
      return;
    }

    const message = await createSiweMessage(
      address,
      'Sign in with Ethereum to the app.'
    );

    const { data: signature, error: signatureError } = await signMessage({
      message,
    });

    if (!signature || signatureError) {
      alert('Error signing message');
      return;
    }

    return { signature, message };
  };

  const handleSignIn = async () => {
    try {
      if (address) {
        const credentials = await handleAuthCredentials();

        const tokens = await getTokens(
          credentials?.message,
          credentials?.signature,
          address
        );

        storage.setToken(tokens.refresh, REFRESH_TOKEN_KEY);
        storage.setToken(tokens.access_token, ACCESS_TOKEN_KEY);

        clearWagmiStorage();

        await handleUser();
      }
    } catch (error) {
      setActiveStep('error');
    }
  };

  const handleUser = async () => {
    try {
      if (address) {
        const { data } = await getProfile(address);

        if (data) {
          onClose();
          dispatch(login(data));

          if (!data.onboarded) {
            router.push('/onboarding');
          } else {
            router.push(`/`);
          }
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleInitialise = () => {
    setActiveStep('loading');
    handleSignIn();
  };

  const initialise = (
    <div className="space-y-4 bg-white">
      <div className="space-y-2">
        <h3 className="font-demi text-3xl text-indigoGray-90">
          Sign once and relax
        </h3>

        <p className="font-sans text-sm font-medium leading-[21px] text-indigoGray-60">
          Let us remember you and skip signing everything you do on Mazury.
        </p>
      </div>

      <div className="space-y-2">
        <Button
          variant="tertiary"
          onClick={handleInitialise}
          className="w-full bg-emerald-600 text-white"
          size="large"
        >
          <SVG
            src="/icons/lightning.svg"
            height={16}
            width={16}
            className="mr-2"
          />
          Remember me
        </Button>

        <p className="font-inter text-xs font-medium font-semibold text-indigoGray-40">
          Signing is an authentication method and doesn't authorize us to access
          your funds or control your identity
        </p>
      </div>
    </div>
  );

  const loading = (
    <div className="flex h-full flex-col justify-between">
      <h3 className="font-demi text-3xl text-indigoGray-90">
        Sign with wallet
      </h3>

      <div className="mt-4 flex justify-center">
        <Spinner />
      </div>

      <div className="mt-4 flex w-full justify-around gap-4 space-x-2">
        <Button variant="secondary" onClick={onClose} className="grow">
          SKIP
        </Button>
        <Button onClick={handleInitialise} variant="primary" className="grow">
          RETRY
        </Button>
      </div>
    </div>
  );

  const error = (
    <div className="flex h-full flex-col">
      <h3 className="font-demi text-3xl text-indigoGray-90">
        Connection failed
      </h3>
      <span className="mt-2 text-sm text-indigoGray-60">
        Something went wrong.
      </span>

      <div className="mt-4 flex w-full justify-around gap-4 space-x-2">
        <Button variant="secondary" onClick={onClose}>
          SKIP
        </Button>
        <Button onClick={handleInitialise} variant="primary">
          RETRY
        </Button>
      </div>
    </div>
  );

  const steps: Record<Steps, JSX.Element> = {
    initialise,
    loading,
    error,
  };

  return (
    <Modal isOpen={true} onClose={onClose}>
      <div className="h-[234px] w-[343px] px-2">{steps[activeStep]}</div>
    </Modal>
  );
};
