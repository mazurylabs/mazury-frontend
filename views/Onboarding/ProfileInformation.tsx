import * as React from 'react';
import SVG from 'react-inlinesvg';

import Link from 'next/link';
import { Button, Checkbox, Input } from '@/components';
import { useOnboardingContext } from '@/providers/onboarding/OnboardingProvider';
import { OnboardingStepsEnum } from '@/providers/onboarding/types';
import { isValid } from '@/utils/api';
import { useUser } from '@/providers/react-query-auth';
import { emailRegex } from '@/utils';

export const ProfileInformation = () => {
  const [loading, setLoading] = React.useState(false);
  const [usernameError, setUsernameError] = React.useState<string>('');
  const [emailError, setEmailError] = React.useState<string>('');
  const [isRecruiter, setIsRecruiter] = React.useState<boolean>(false);
  const [tosAccepted, setTosAccepted] = React.useState<boolean>(false);

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
      // TODO upload all data?
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
          <h2 className="font-demi text-4xl text-indigoGray-90">Hi there!</h2>
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
                    emailError ? 'red-500' : 'indigoGray-40 mb-0.5'
                  }`}
                >
                  Username{' '}
                  <span
                    className={`font-sans font-normal text-${
                      emailError ? 'red-500' : 'indigoGray-30'
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
                    emailError ? 'red-500' : 'indigoGray-40 mb-0.5'
                  }`}
                >
                  E-mail{' '}
                  <span
                    className={`font-sans font-normal text-${
                      emailError ? 'red-500' : 'indigoGray-30'
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
            <div className="mb-0.5 font-sans text-sm text-indigoGray-40">
              Profile type{' '}
              <span className="font-sans font-normal text-indigoGray-30">
                (Required)
              </span>
            </div>
            <div className="flex flex-row space-x-1 md:space-x-4">
              <button
                type="button"
                className={`flex w-full justify-between rounded-lg py-3 px-4 ${
                  !isRecruiter
                    ? `border-[1.5px] border-indigo-600 bg-indigo-50`
                    : `border border-indigoGray-20`
                }`}
                onClick={() => {
                  handleSetProfile('is_recruiter', false);
                  setIsRecruiter(false);
                }}
              >
                <span className="font-sansMid text-sm font-medium text-indigoGray-90">
                  I’m a professional
                </span>
              </button>

              <button
                type="button"
                className={`flex w-full justify-between rounded-lg py-3 px-4 ${
                  isRecruiter
                    ? `border-[1.5px] border-indigo-600 bg-indigo-50`
                    : `border border-indigoGray-20`
                }`}
                onClick={() => {
                  handleSetProfile('is_recruiter', true);
                  setIsRecruiter(true);
                }}
              >
                <span className="font-sansMid text-sm font-medium text-indigoGray-90">
                  I’m a recruiter
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>

      <div>
        <div className="mb-2 flex flex-row items-center space-x-2">
          <Checkbox
            innerClassName="h-4 w-4"
            outerClassName="h-4 w-4"
            checked={tosAccepted}
            setChecked={() => setTosAccepted(!tosAccepted)}
            label=""
            id={'acceptTos'}
          />
          <p className="text-sm">
            By checking you agree to the{' '}
            <Link
              className="font-medium text-indigo-600"
              href={'/privacy-policy'}
              target="_blank"
            >
              privacy-policy
            </Link>{' '}
            and the{' '}
            <Link
              className="font-medium text-indigo-600"
              href={'/terms-of-service'}
              target="_blank"
            >
              terms of service
            </Link>
          </p>
        </div>
        <Button
          type="submit"
          size="large"
          className="!mb-12 w-full xl:mb-0"
          disabled={!profile.username || !profile.email || !tosAccepted}
          loading={loading}
          onClick={handleSubmit}
        >
          Continue
        </Button>
      </div>
    </>
  );
};
