import * as React from 'react';
import SVG from 'react-inlinesvg';

import { Button, Input } from '@/components';
import { useOnboardingContext } from '@/providers/onboarding/OnboardingProvider';
import { OnboardingStepsEnum } from '@/providers/onboarding/types';

export const Communication = () => {
  const [touched, setTouched] = React.useState(false);
  const { handleStep, profile, handleSetProfile } = useOnboardingContext();

  const handleSubmit = () => {
    setTouched(true);
    profile.email && handleStep(OnboardingStepsEnum['PROFILETYPE']);
  };

  return (
    <div className="flex grow flex-col">
      <div className="mb-[90px] space-y-8 sm:mb-[128px]">
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
            onChange={(value) => {
              handleSetProfile('email', value);
            }}
            error={touched && !profile.email}
          />
          <div className="flex items-center space-x-1 pl-2">
            <SVG src="/icons/error-warning-line.svg" height={12} width={12} />
            <p className="font-sans text-xs text-indigoGray-40">
              {touched && !profile.email
                ? 'Email is required'
                : 'We will send you a confirmation e-mail'}
            </p>
          </div>
        </div>
      </div>
      <Button
        size="large"
        onClick={handleSubmit}
        className="mt-auto w-full"
        disabled={!profile.email}
      >
        Continue
      </Button>
    </div>
  );
};
