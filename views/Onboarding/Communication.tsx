import * as React from 'react';
import SVG from 'react-inlinesvg';

import { Button, Input } from '@/components';
import { useOnboardingContext } from '@/providers/onboarding/OnboardingProvider';
import { OnboardingStepsEnum } from '@/providers/onboarding/types';
import { isValid } from '@/utils/api';

export const Communication = () => {
  const [error, setError] = React.useState<string>('');
  const [loading, setLoading] = React.useState<boolean>(false);
  const { handleStep, profile, handleSetProfile } = useOnboardingContext();

  const handleSubmit = async (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();

    setError('');

    const emailRegex =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    if (!profile.email.toLowerCase().match(emailRegex)) {
      setError('Email address is invalid');
      return;
    }

    setLoading(true);

    const { error } = await isValid('email', profile.email);

    setLoading(false);

    if (!error) {
      handleStep(OnboardingStepsEnum['PROFILETYPE']);
    } else {
      setError('Email already exists');
    }
  };

  return (
    <div className="flex grow flex-col">
      <div className="mb-[90px] space-y-8 sm:mb-[128px] xl:mb-[32px]">
        <div className="space-y-3">
          <h2 className="font-demi text-4xl text-indigoGray-90">
            Contact details
          </h2>
          <p className="font-sansMid text-sm font-medium text-indigoGray-60">
            Mazury is the bridge between you and the professional world of web3.
            For communication we will need your e-mail.
          </p>
        </div>

        <div className="space-y-1">
          <Input
            id="email"
            label={
              <div className="font-sans text-indigoGray-40">
                E-mail{' '}
                <span className="font-sans font-normal text-indigoGray-30">
                  (Required)
                </span>
              </div>
            }
            value={profile.email || ''}
            placeholder="Insert e-mail"
            onChange={(value) => handleSetProfile('email', value)}
            error={!!error}
            onFocus={() => setError('')}
          />
          <div className="flex items-center space-x-1 pl-2">
            <SVG
              src={`/icons/error${!error ? '-warning-line' : ''}.svg`}
              height={12}
              width={12}
            />
            <p
              className={`font-sans text-xs text-${
                error ? 'red-500' : 'indigoGray-40'
              }`}
            >
              {error || 'We will send you a confirmation e-mail'}
            </p>
          </div>
        </div>
      </div>
      <Button
        size="large"
        onClick={handleSubmit}
        className="w-full"
        disabled={!profile.email}
        loading={loading}
        type="submit"
      >
        Continue
      </Button>
    </div>
  );
};
