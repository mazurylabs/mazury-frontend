import * as React from 'react';
import SVG from 'react-inlinesvg';

import { Button, Input } from '@/components';
import { useOnboardingContext } from '@/providers/onboarding/OnboardingProvider';
import { OnboardingStepsEnum } from '@/providers/onboarding/types';
import { isValid } from '@/utils/api';
import { useUser } from '@/providers/react-query-auth';
import { emailRegex } from '@/utils';

export const ProfileInformation = () => {
  const [loading, setLoading] = React.useState(false);
  const [usernameError, setUsernameError] = React.useState<string>('');
  const [emailError, setEmailError] = React.useState<string>('');

  const { data: userProfile } = useUser();
  const { handleStep, handleSetProfile, profile } = useOnboardingContext();

  const handleSubmit = async (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    setLoading(true);
    setUsernameError('');
    setEmailError('');

    if (!profile.email.toLowerCase().match(emailRegex)) {
      setEmailError('Email address is invalid');
      setLoading(false);
      return;
    }

    setLoading(true);

    const usernameError = await (
      await isValid('username', profile.username)
    ).error;

    const emailError = await (await isValid('email', profile.email)).error;

    setLoading(false);

    if (!emailError && !usernameError) {
      handleStep(OnboardingStepsEnum['ALLSET']);
    } else if (emailError && usernameError) {
      setEmailError('Email already exists');
      setUsernameError('Username already exists');
    } else if (emailError) {
      setEmailError('Email already exists');
    } else if (usernameError) {
      setUsernameError('Username already exists');
    }
  };

  return (
    <>
      <div className="mb-[90px] space-y-8 sm:mb-[128px] sm:space-y-6 xl:mb-[32px]">
        <div className="space-y-3">
          <h2 className="font-demi text-4xl text-indigoGray-90">Hi there</h2>
          <p className="font-sansSemi text-sm font-medium text-indigoGray-60">
            We’re glad you’re joining us. Let’s take a moment to polish your
            profile a bit!
          </p>
        </div>

        <div className="space-y-4">
          <div className="space-y-1 font-sansMid font-medium">
            <h3 className="text-xs text-black-300">WALLET USED</h3>
            {profile?.ens_name && (
              <p className="text-lg text-indigoGray-90">
                {userProfile?.ens_name}
              </p>
            )}
            <p className="text-xs text-indigoGray-40">
              {userProfile?.eth_address}
            </p>
          </div>

          <div className="space-y-1">
            <Input
              id="username"
              label={
                <div
                  className={`font-sans text-${
                    emailError ? 'red-500' : 'indigoGray-40'
                  }`}
                >
                  Username{' '}
                  <span
                    className={`font-sans font-normal text-${
                      emailError ? 'red-500' : 'indigoGray-40'
                    }`}
                  >
                    (Required)
                  </span>
                </div>
              }
              value={profile.username || ''}
              placeholder="Insert username"
              onChange={(value) => {
                handleSetProfile('username', value);
              }}
              error={!!usernameError}
              onFocus={() => setUsernameError('')}
            />
            {usernameError && (
              <div className="flex items-center space-x-1 pl-2">
                <SVG src="/icons/error.svg" height={12} width={12} />
                <p className="font-sans text-xs text-red-500">
                  {usernameError}
                </p>
              </div>
            )}
          </div>

          <div className="space-y-1">
            <Input
              id="email"
              label={
                <div
                  className={`font-sans text-${
                    emailError ? 'red-500' : 'indigoGray-40'
                  }`}
                >
                  E-mail{' '}
                  <span
                    className={`font-sans font-normal text-${
                      emailError ? 'red-500' : 'indigoGray-40'
                    }`}
                  >
                    (Required)
                  </span>
                </div>
              }
              value={profile.email || ''}
              placeholder="Insert e-mail"
              onChange={(value) => handleSetProfile('email', value)}
              error={!!emailError}
              onFocus={() => setEmailError('')}
            />
            <div className="flex items-center space-x-1 pl-2">
              <SVG
                src={`/icons/error${!emailError ? '-warning-line' : ''}.svg`}
                height={12}
                width={12}
              />
              <p
                className={`font-sans text-xs text-${
                  emailError ? 'red-500' : 'indigoGray-40'
                }`}
              >
                {emailError || 'We will send you a confirmation e-mail'}
              </p>
            </div>
          </div>

          <div>
            <div className="font-sans text-sm text-indigoGray-40">
              Profile type{' '}
              <span className="font-sans font-normal text-indigoGray-30">
                (Required)
              </span>
            </div>
            <div className="space-y-4">
              <button
                className="flex w-full justify-between rounded-lg border border-indigoGray-20 p-6"
                // onClick={() => handleNext(true)}
              >
                <span className="font-sansMid text-base font-medium text-indigoGray-90">
                  I’m a recruiter
                </span>
                <SVG src="/icons/arrow-right.svg" height={24} width={24} />
              </button>

              <button
                className="flex w-full justify-between rounded-lg border border-indigoGray-20 p-6"
                // onClick={() => handleNext(false)}
              >
                <span className="font-sansMid text-base font-medium text-indigoGray-90">
                  I’m a professional
                </span>
                <SVG src="/icons/arrow-right.svg" height={24} width={24} />
              </button>
            </div>
          </div>
        </div>
      </div>

      <Button
        type="submit"
        size="large"
        className="!mb-12 w-full xl:mb-0"
        disabled={!profile.username || !profile.email}
        loading={loading}
        onClick={handleSubmit}
      >
        Continue
      </Button>
    </>
  );
};
