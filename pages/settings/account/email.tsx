import { useState, useEffect } from 'react';
import Image from 'next/image';
import { NextPage } from 'next';
import { Button, Input, SettingsLayout, WalletRequestModal } from 'components';
import { updateProfile, verifyEmail } from 'utils/api';
import { useProtectedRoute } from 'hooks';
import { useSelector, useDispatch } from 'react-redux';

import { userSlice } from '@/selectors';
import { updateUserProfile } from '@/slices/user';

type Steps = 'idle' | 'active' | 'error';

const EmailPage: NextPage = () => {
  const dispatch = useDispatch();
  useProtectedRoute();

  const [currentStep, setCurrentStep] = useState<Steps>('idle');
  const [isNewChange, setIsNewChange] = useState(false);
  const { profile, address } = useSelector(userSlice);
  const [accountEmail, setAccountEmail] = useState('');
  const [email, setEmail] = useState('');
  const [disabled, setDisabled] = useState(true);

  useEffect(() => {
    if (profile) {
      setEmail(profile?.email);
    }
  }, [profile]);

  const onEmailChange = (value: string) => {
    setEmail(value);
    disabled && setDisabled(false);
  };

  const onSubmit = async (email: string) => {
    // setCurrentStep('active');
    await handleRetry(email);
  };

  const handleEmailVerification = async () => {
    setCurrentStep('active');

    if (address) {
      const { error } = await verifyEmail(address);
      if (!error) {
        setCurrentStep('idle');
      } else {
        setCurrentStep('error');
      }
    }
  };

  const handleRetry = async (email: string) => {
    if (address) {
      const formData = {
        email,
      };

      const { error: updateProfileError, data } = await updateProfile(
        address,
        '',
        formData
      );

      if (updateProfileError) {
        setCurrentStep('error');
        return alert('Error updating profile.');
      } else {
        dispatch(updateUserProfile(data));
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

          {accountEmail && !profile?.email_verified && (
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
