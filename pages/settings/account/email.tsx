import { useState, useEffect } from 'react';
import Image from 'next/image';
import { NextPage } from 'next';
import { useSWRConfig } from 'swr';
import { useAccount, useSignMessage } from 'wagmi';
import { Button, Input, Modal, SettingsLayout, Spinner } from 'components';
import { useProfile } from 'hooks';
import { getMessageToBeSigned, updateProfile } from 'utils/api';

type Steps = 'idle' | 'active' | 'error';

const EmailPage: NextPage = () => {
  const { mutate } = useSWRConfig();
  const [email, setEmail] = useState('');
  const [currentStep, setCurrentStep] = useState<Steps>('idle');
  const [isNewChange, setIsNewChange] = useState(false);
  const [_, signMessage] = useSignMessage();
  const [{ data: accountData }] = useAccount();
  const { profile } = useProfile(accountData?.address as string);

  //Prefill form with exisiting email
  useEffect(() => {
    setEmail(profile?.email || '');
  }, [profile]);

  const emailConfirmed = true; //dummy data

  const onEmailChange = (value: string) => setEmail(value);

  const onSubmit = async () => {
    setCurrentStep('active');
    await handleRequestSignature();
  };

  const handleRequestSignature = async () => {
    if (!accountData?.address) {
      return alert('Please connect your wallet first');
    }

    const { data: messageToBeSigned, error: messageSignError } =
      await getMessageToBeSigned(accountData?.address);

    if (!messageToBeSigned || messageSignError) {
      return alert(
        'Couldnt get the message to be signed. Please try again later.'
      );
    }

    const { data: signature, error: signatureError } = await signMessage({
      message: messageToBeSigned,
    });

    if (!signature || signatureError) {
      return alert('Error signing message');
    }

    const formData = {
      email,
    };

    const { error: updateProfileError, data } = await updateProfile(
      accountData?.address,
      signature,
      formData
    );

    mutate(`/profile/${accountData?.address}`);
    setEmail(data.email); //optimistic update for the input fields
    setIsNewChange(true);
    setCurrentStep('idle');

    if (updateProfileError) {
      return alert('Error updating profile.');
    }
  };

  const onDelete = async () => {
    setEmail('');

    onSubmit();
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
        <Button variant="secondary">SKIP</Button>
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
    <SettingsLayout
      content={
        <div className="flex grow flex-col">
          <div className="font-serif text-4xl font-semibold leading-9">
            <h2>Email</h2>
          </div>

          {emailConfirmed && (
            <div className="mt-8 rounded-md bg-indigoGray-10 p-3">
              <div>
                <h3 className="font-bold">Confirmation</h3>

                <p className="my-3">
                  You haven’t confirmed your current address. If you wish to do
                  so, we can resend the link.
                </p>

                <Button
                  className="bg-transparent text-lg uppercase"
                  size="large"
                  variant="secondary"
                >
                  RESEND E-MAIL
                </Button>
              </div>
            </div>
          )}

          <div className="mt-8 flex grow flex-col">
            <form className="flex w-full grow flex-col">
              <div className="flex grow items-center md:mb-8 md:grow-0 md:justify-between">
                <div className="mr-10 max-w-[83%] shrink grow md:max-w-full">
                  <Input
                    id="email"
                    placeholder="Insert e-mail"
                    label="Email"
                    value={email}
                    onChange={onEmailChange}
                  />
                </div>

                <div className="flex h-[70%] shrink-0 items-center self-end">
                  <button type="button" aria-label="delete" onClick={onDelete}>
                    <Image
                      src="/icons/trash.svg"
                      alt="Back"
                      width="16px"
                      height="16px"
                    />
                  </button>
                </div>
              </div>

              <div>
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
                  onClick={onSubmit}
                  disabled={!Boolean(email)}
                >
                  Save Changes
                </Button>
              </div>
            </form>
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

export default EmailPage;
