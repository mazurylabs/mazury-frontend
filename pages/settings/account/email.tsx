import { useState, useEffect } from 'react';
import Image from 'next/image';
import { NextPage } from 'next';
import { useAccount, useSignMessage } from 'wagmi';
import {
  Button,
  Input,
  Modal,
  SettingsLayout,
  Spinner,
  WalletRequestModal,
} from 'components';
import {
  getMessageToBeSigned,
  getProfile,
  updateProfile,
  verifyEmail,
} from 'utils/api';
import { useProtectedRoute } from 'hooks';

type Steps = 'idle' | 'active' | 'error';

const EmailPage: NextPage = () => {
  useProtectedRoute();

  const [currentStep, setCurrentStep] = useState<Steps>('idle');
  const [isNewChange, setIsNewChange] = useState(false);
  const [_, signMessage] = useSignMessage();
  const [{ data: accountData }] = useAccount();
  const [accountEmail, setAccountEmail] = useState('');
  const [email, setEmail] = useState('');
  const [emailVerified, setEmailVerified] = useState(false);
  const [disabled, setDisabled] = useState(true);

  // Prefill form with exisiting email
  useEffect(() => {
    if (accountData?.address) {
      getProfile(accountData?.address).then((res) => {
        setEmail(res.data?.email as string);
        setAccountEmail(res.data?.email as string);
        setEmailVerified(res.data?.email_verified as boolean);
      });
    }
  }, [accountData?.address]);

  const onEmailChange = (value: string) => {
    setEmail(value);
    disabled && setDisabled(false);
  };

  const onSubmit = async (email: string) => {
    setCurrentStep('active');
    await handleRetry(email);
  };

  const handleEmailVerification = async () => {
    setCurrentStep('active');
    const signature = await handleRequestSignature();

    if (signature && accountData?.address) {
      const { error } = await verifyEmail(accountData?.address, signature);
      if (!error) {
        setCurrentStep('idle');
      } else {
        setCurrentStep('error');
      }
    }
  };

  const handleRequestSignature = async () => {
    if (!accountData?.address) {
      alert('Please connect your wallet first');
      return;
    }

    const { data: messageToBeSigned, error: messageSignError } =
      await getMessageToBeSigned(accountData?.address);

    if (!messageToBeSigned || messageSignError) {
      alert('Couldnt get the message to be signed. Please try again later.');
      return;
    }

    const { data: signature, error: signatureError } = await signMessage({
      message: messageToBeSigned,
    });

    if (!signature || signatureError) {
      alert('Error signing message');
      return;
    }

    return signature;
  };

  const handleRetry = async (email: string) => {
    if (accountData?.address) {
      const signature = await handleRequestSignature();

      const formData = {
        email,
      };

      const { error: updateProfileError, data } = await updateProfile(
        accountData?.address,
        signature as string,
        formData
      );

      if (updateProfileError) {
        setCurrentStep('error');
        return alert('Error updating profile.');
      } else {
        setIsNewChange(true);
        setCurrentStep('idle');
        setEmail(data.email); //optimistic update for the input fields
        setAccountEmail(data.email);
        setDisabled(true);
      }
    }
  };

  const onDelete = async () => {
    await onSubmit('');
  };

  return (
    <SettingsLayout
      content={
        <div className="flex grow flex-col">
          <div className="font-serif text-4xl font-semibold leading-9">
            <h2>Email</h2>
          </div>

          {accountEmail && !emailVerified && (
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
                  onClick={handleEmailVerification}
                >
                  RESEND E-MAIL
                </Button>
              </div>
            </div>
          )}

          <div className="mt-8 flex grow flex-col">
            <form className="flex w-full grow flex-col">
              <div className="flex items-center pr-6  md:mb-8 md:justify-between">
                <div className="mr-10 max-w-[83%] shrink grow md:max-w-full">
                  <Input
                    id="email"
                    placeholder="Insert e-mail"
                    label="Email"
                    value={email}
                    onChange={onEmailChange}
                  />
                </div>

                <div className="flex shrink-0 items-center self-end py-3">
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
                  onClick={() => onSubmit(email)}
                  disabled={!email || disabled}
                >
                  Save Changes
                </Button>
              </div>
            </form>
          </div>

          <WalletRequestModal
            step={currentStep}
            handleSkip={() => setCurrentStep('idle')}
            handleRequestSignature={() => handleRetry(email)}
          />
        </div>
      }
    />
  );
};

export default EmailPage;
