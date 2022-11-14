import * as React from 'react';

import { Button } from '@/components';
import { useOnboardingContext } from '@/providers/onboarding/OnboardingProvider';
import { OnboardingStepsEnum } from '@/providers/onboarding/types';

export const Talent = () => {
  const { handleStep } = useOnboardingContext();

  return (
    <>
      <div className="mb-[90px] space-y-8">
        <div className="space-y-3">
          <h2 className="font-demi text-4xl text-indigoGray-90">
            Mazury Talent
          </h2>
          <p className="font-sans text-sm font-medium text-indigoGray-60">
            Let us help your applications shine. Sign up in the app to get tips
            and access to companies from our network
          </p>
        </div>
      </div>
      <Button
        onClick={() => handleStep(OnboardingStepsEnum['SOCIALS'])}
        className="mt-auto w-full"
      >
        Continue
      </Button>
    </>
  );
};
