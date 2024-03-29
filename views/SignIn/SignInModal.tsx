import { useRouter } from 'next/router';
import * as React from 'react';
import SVG from 'react-inlinesvg';
import { useSignMessage } from 'wagmi';
import { useQueryClient } from '@tanstack/react-query';
import * as Sentry from '@sentry/nextjs';

import { createSiweMessage } from 'utils/api';
import storage from 'utils/storage';

import { Button, Modal, Spinner } from 'components';
import { ROUTE_PATH, USER_ADDRESS } from 'config';
import { SidebarContext } from 'contexts';

import { useLogin } from 'providers/react-query-auth';
import { Profile } from 'types';

type Steps = 'initialise' | 'loading' | 'error';

interface SignInModalProps {
  onClose: () => void;
}

export const SignInModal: React.FC<SignInModalProps> = ({ onClose }) => {
  const router = useRouter();
  const login = useLogin();
  const queryClient = useQueryClient();

  const address = storage.getToken(USER_ADDRESS);

  const [activeStep, setActiveStep] = React.useState<Steps>('initialise');
  const { setSignInOpen, setIsOpen } = React.useContext(SidebarContext);

  const { signMessage } = useSignMessage({
    onSuccess(data, variables) {
      handleSignIn(variables.message as string, data);
    },
    onError(error) {
      window.localStorage.clear();
      setActiveStep('error');
      Sentry.captureException(error);
    },
  });

  const handleSignMessage = async () => {
    const message = await createSiweMessage(
      address,
      'Sign in with Ethereum to the app.'
    );

    signMessage({ message });
  };

  const handleSignIn = async (message: string, signature: string) => {
    await login.mutateAsync({ message, address, signature });

    await handleUser();
  };

  const handleUser = async () => {
    const pathToRoute = storage.getToken(ROUTE_PATH);
    const user = queryClient.getQueryData<Profile>(['authenticated-user']);

    onClose();
    setSignInOpen(false);
    setIsOpen(false);

    if (!user?.onboarded) {
      router.push('/onboarding');
    } else if (pathToRoute) {
      router.push(pathToRoute);
      storage.clearToken(ROUTE_PATH);
    } else {
      router.push(`/`);
    }
  };

  const handleInitialise = () => {
    setActiveStep('loading');
    storage.setToken(router.asPath, ROUTE_PATH);
    handleSignMessage();
  };

  const handleCancel = () => {
    window.localStorage.clear();
    onClose();
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
          className="w-full bg-emerald-600 text-white hover:text-white active:text-white"
          size="large"
        >
          <div className="flex items-center">
            <SVG
              src="/icons/lightning.svg"
              height={16}
              width={16}
              className="mr-2"
            />
            <span>Remember me</span>
          </div>
        </Button>

        <p className="font-sans text-xs font-medium text-indigoGray-40">
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
        <Button variant="secondary" onClick={handleCancel} className="grow">
          CANCEL
        </Button>
      </div>
    </div>
  );

  const error = (
    <div className="flex h-full flex-col">
      <h3 className="font-demi text-3xl text-indigoGray-90">
        Connection failed
      </h3>
      <span className="mt-2 flex-grow text-sm text-indigoGray-60">
        We couldn't read your wallet signature.<br></br>
        Please refresh and try again.
      </span>

      <div className="mt-4 flex w-full justify-around gap-4 space-x-2">
        <Button variant="secondary" onClick={onClose}>
          GO BACK
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
