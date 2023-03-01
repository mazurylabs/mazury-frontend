import { useState, useEffect } from 'react';
import { NextPage } from 'next';
import { Button, Input, Modal, SettingsLayout, Spinner } from 'components';
import { updateProfile } from 'utils/api';
import { useIsOnboarded, useProtectedRoute } from 'hooks';
import { useQueryClient } from '@tanstack/react-query';

import { useUser } from 'providers/react-query-auth';

type Steps = 'idle' | 'active' | 'error';

interface User {
  username: string;
  full_name: string;
}

const UsernamePage: NextPage = () => {
  const queryClient = useQueryClient();
  const { data: profile } = useUser();
  useProtectedRoute();
  useIsOnboarded();

  const [currentStep, setCurrentStep] = useState<Steps>('idle');
  const [isNewChange, setIsNewChange] = useState(false);
  const [username, setUsername] = useState('');
  const [full_name, setFullname] = useState('');
  const [disabled, setDisabled] = useState(true);

  // Prefill form with exisiting email
  useEffect(() => {
    if (profile) {
      setFullname(profile?.full_name as string);
      setUsername(profile?.username as string);
    }
  }, [profile]);

  const onUsernameChange = (value: string) => {
    setUsername(value);
    disabled && setDisabled(false);
  };
  const onFullnameChange = (value: string) => {
    setFullname(value);
    disabled && setDisabled(false);
  };

  const onSubmit = async (user: User) => {
    // setCurrentStep('active');
    await handleRequestSignature(user);
  };

  const handleRequestSignature = async (user: User) => {
    if (!profile?.eth_address) {
      return alert('Please connect your wallet first');
    }

    const { error: updateProfileError, data } = await updateProfile(
      profile?.eth_address || '',
      '',
      user
    );

    setIsNewChange(true);
    setCurrentStep('idle');

    //optimistic update for the input fields
    if (data) {
      queryClient.setQueryData(['authenticated-user'], (prev: any) => ({
        ...prev,
        ...data,
      }));
      setUsername(data.username);
      setFullname(data.full_name);
      setDisabled(true);
    }

    if (updateProfileError) {
      return alert('Error updating profile.');
    }
  };

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
        <Button variant="secondary" onClick={() => setCurrentStep('idle')}>
          SKIP
        </Button>
        <Button
          onClick={() => handleRequestSignature({ username, full_name })}
          variant="primary"
        >
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
        <Button
          onClick={() => handleRequestSignature({ username, full_name })}
          variant="primary"
        >
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
    <SettingsLayout
      content={
        <div className="flex grow flex-col">
          <div className="font-serif text-4xl font-semibold leading-9">
            <h2>Username</h2>
          </div>

          <div className="mt-4 flex grow flex-col lg:mt-6">
            <div className="flex w-full grow flex-col">
              <div>
                <Input
                  id="username"
                  label="Username"
                  value={username}
                  placeholder="Insert username"
                  onChange={onUsernameChange}
                />
                {/* <div className="mt-2 flex">
                  {suggestions.map((suggestion, index) => (
                    <span
                      className="mr-2 flex max-w-[6.0625rem] grow justify-center rounded-lg border border-indigoGray-90 py-2"
                      key={suggestion + index}
                    >
                      {suggestion}
                    </span>
                  ))}
                </div> */}
              </div>

              <Input
                id="full-name"
                outerClassName="mt-8 mb-8"
                placeholder="Insert full name"
                value={full_name}
                onChange={onFullnameChange}
                label={
                  <>
                    Full name{' '}
                    <span className="text-indigoGray-20">(optional)</span>
                  </>
                }
              />

              <div className="flex grow flex-col justify-end md:grow-0">
                {isNewChange && (
                  <div className="mb-3 flex justify-center">
                    <p className="text-sm font-bold text-green-600">
                      Your changes have been saved
                    </p>
                  </div>
                )}
                <Button
                  className="w-full uppercase"
                  size="large"
                  onClick={() => onSubmit({ username, full_name })}
                  disabled={disabled || !username}
                >
                  Save Changes
                </Button>
              </div>
            </div>
          </div>

          <Modal
            isOpen={currentStep !== 'idle'}
            onClose={() => setCurrentStep('idle')}
          >
            {steps[currentStep]}
          </Modal>
        </div>
      }
    />
  );
};

export default UsernamePage;
