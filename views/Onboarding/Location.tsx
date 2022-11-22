import * as React from 'react';
import SVG from 'react-inlinesvg';

import { Button, Input } from '@/components';
import { OnboardingStepsEnum } from '@/providers/onboarding/types';
import { useOnboardingContext } from '@/providers/onboarding/OnboardingProvider';

export const Location = () => {
  const { handleStep, profile, handleSetProfile } = useOnboardingContext();

  const handleSubmit = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    handleStep(OnboardingStepsEnum['SOCIALS']);
  };

  return (
    <>
      <div className="mb-[90px] space-y-8 sm:mb-[128px]">
        <div className="space-y-3">
          <h2 className="font-demi text-4xl text-indigoGray-90">Location</h2>
          <p className="font-sansMid text-sm font-medium text-indigoGray-60">
            Although optional, location gives a better personalisation for the
            job offers you might receive from recruiters
          </p>
        </div>

        <div className="space-y-1">
          <Input
            id="location"
            label="Location"
            value={profile.location || ''}
            placeholder="Insert location"
            onChange={(value) => handleSetProfile('location', value)}
          />
          <div className="flex items-center space-x-1 pl-2">
            <SVG src="/icons/error-warning-line.svg" height={12} width={12} />
            <p className="font-sans text-xs text-indigoGray-40">
              Optional. Important for recruiters looking for candidates.
            </p>
          </div>
        </div>
      </div>
      <Button
        size="large"
        onClick={handleSubmit}
        className="mt-auto w-full"
        type="submit"
      >
        {profile.location ? 'Continue' : 'Skip'}
      </Button>
    </>
  );
};
