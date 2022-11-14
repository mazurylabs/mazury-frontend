import * as React from 'react';
import SVG from 'react-inlinesvg';

import { useOnboardingContext } from '@/providers/onboarding/OnboardingProvider';
import { Context, OnboardingStepsEnum } from '@/providers/onboarding/types';

export const ProfileType = () => {
  const { handleSetProfile, handleStep } = useOnboardingContext();

  const handleNext = (profileType: Context['profile']['profile_type']) => {
    handleSetProfile('profile_type', profileType);
    handleStep(
      OnboardingStepsEnum[
        profileType === 'recruiter' ? 'RECRUITER' : 'OPENTOPROJECTS'
      ]
    );
  };

  return (
    <div className="space-y-16">
      <div className="space-y-3">
        <h2 className="font-demi text-4xl text-indigoGray-90">
          What are you up to?
        </h2>
        <p className="font-sans text-sm font-medium text-indigoGray-60">
          Do you plan to use Mazury for recruiting or as a professional?
        </p>
        <p className="font-sans text-sm font-medium text-indigoGray-60">
          This decision can be change in the future
        </p>
      </div>

      <div className="space-y-4">
        <button
          className="flex w-full justify-between rounded-lg border border-indigoGray-20 p-6"
          onClick={() => handleNext('recruiter')}
        >
          <span className="font-sans text-base font-medium text-indigoGray-90">
            I’m a recruiter
          </span>
          <SVG src="/icons/arrow-right.svg" height={24} width={24} />
        </button>

        <button
          className="flex w-full justify-between rounded-lg border border-indigoGray-20 p-6"
          onClick={() => handleNext('talent')}
        >
          <span className="font-sans text-base font-medium text-indigoGray-90">
            I’m a professional
          </span>
          <SVG src="/icons/arrow-right.svg" height={24} width={24} />
        </button>
      </div>
    </div>
  );
};
