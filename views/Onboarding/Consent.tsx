import * as React from 'react';

import { Button } from '@/components';
import { useOnboardingContext } from '@/providers/onboarding/OnboardingProvider';
import { OnboardingStepsEnum } from '@/providers/onboarding/types';

export const Consent = () => {
  const { handleStep } = useOnboardingContext();

  return (
    <>
      <div className="flex flex-col space-y-8">
        <div className="space-y-3">
          <h2 className="font-demi text-4xl text-indigoGray-90">Consent</h2>
          <p className="font-sans text-sm font-medium text-indigoGray-60">
            We’re in 2022, so there are some documents you should click through
            to use Mazury
          </p>
        </div>

        <div className="mb-[90px] space-y-6 ">
          <div>
            <h3 className="text-semibold font-sans text-blue-800">
              Terms of service
            </h3>
            <p className="font-sans text-sm font-medium text-indigoGray-60">
              We’re in 2022, so there are some documents you should click
              through to use Mazury
            </p>
          </div>

          <div>
            <h3 className="text-semibold font-sans text-blue-800">
              Privacy policy
            </h3>
            <p className="font-sans text-sm font-medium text-indigoGray-60">
              We’re in 2022, so there are some documents you should click
              through to use Mazury
            </p>
          </div>
        </div>
      </div>
      <div className="mt-auto mb-4 space-y-4">
        <p className="font-sans text-sm font-medium text-indigoGray-60">
          By clicking this button you consent to the Terms of service and
          Privacy policy and confirm that you understood these documents.
        </p>

        <Button
          onClick={() => handleStep(OnboardingStepsEnum['HOWDIDYOUFINDUS'])}
          className="mt-auto w-full"
        >
          I accept
        </Button>
      </div>
    </>
  );
};
