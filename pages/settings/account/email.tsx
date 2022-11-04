import { useState, useEffect } from 'react';
import Image from 'next/image';
import { NextPage } from 'next';
import { Button, Input, SettingsLayout, WalletRequestModal } from 'components';
import { getProfile, updateProfile, verifyEmail } from 'utils/api';
import { useProtectedRoute } from 'hooks';
import { useSelector, useDispatch } from 'react-redux';

import { userSlice } from '@/selectors';
import { login, updateUserProfile } from '@/slices/user';
import { useCountDown } from '@/hooks/useCountDown';

type Steps = 'idle' | 'active' | 'error';

const EmailPage: NextPage = () => {
  const { count, handleStartCounter } = useCountDown(30);
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
    // setCurrentStep('active');

    if (address) {
      const { error } = await verifyEmail(address);
      if (!error) {
        setCurrentStep('idle');
        handleStartCounter();
      } else {
        setCurrentStep('error');
      }
    }
  };

  const handleRefresh = async () => {
    const { data } = await getProfile(profile?.eth_address as string);

    if (data) {
      dispatch(login(data));
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
        console.log(data);
        dispatch(
          updateUserProfile({
            ...data,
            ...(profile?.email !== email && { email_verified: false }),
          })
        );
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
        <div className="flex grow flex-col pb-4">
          <div className="font-serif text-4xl font-semibold leading-9">
            <h2>Email</h2>
          </div>

          {(accountEmail || profile?.email) && !profile?.email_verified && (
            <div className="mt-8 space-y-4 rounded-xl border border-indigoGray-20 px-6 py-4">
              <div className="space-y-2">
                <h1 className="font-demi text-3xl text-indigoGray-90">
                  Verify e-mail
                </h1>
                <p className="font-sans text-sm font-medium text-indigoGray-60">
                  In order to continue, you need to verify your e-mail address.
                  Please check your email and follow the instructions. If you
                  did not receive an email or if it expired, you can resend one.
                </p>
              </div>

              <div className="flex space-x-4">
                {/* <Button className="!block w-[50%] !p-3">Resend message</Button> */}
                <button
                  type="button"
                  className="h-[45px] w-[50%] rounded-lg bg-indigoGray-10 font-sans text-sm font-semibold text-indigoGray-90 shadow-sm"
                  onClick={handleEmailVerification}
                  disabled={count > 0}
                >
                  {count > 0 ? `${count} Seconds` : 'Resend Message'}
                </button>
                <button
                  type="button"
                  className="h-[45px] w-[50%] rounded-lg bg-indigoGray-10 bg-indigoGray-90 text-indigoGray-5"
                  onClick={handleRefresh}
                >
                  Refresh
                </button>
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
