import * as React from 'react';
import Link from 'next/link';

import { Button } from '@/components';
import { useOnboardingContext } from '@/providers/onboarding/OnboardingProvider';
import { OnboardingStepsEnum } from '@/providers/onboarding/types';
import storage from '@/utils/storage';
import { ONBOARDING_DATA } from '@/config';

export const Consent = () => {
  const { handleStep, profile, handleSetProfile, viewedSteps, activeStep } =
    useOnboardingContext();

  const handleOnboardingData = () => {
    const onboardingData = {
      profile,
      viewedSteps,
      activeStep,
    };
    storage.setToken(onboardingData, ONBOARDING_DATA);
  };

  const handleConsent = () => {
    handleSetProfile('privacy_consent', true);
    handleStep(OnboardingStepsEnum['HOWDIDYOUFINDUS']);
  };

  return (
    <>
      <div className="flex flex-col space-y-8">
        <div className="space-y-3">
          <h2 className="font-demi text-4xl text-indigoGray-90">Consent</h2>
          <p className="font-sansMid text-sm font-medium text-indigoGray-60">
            We’re in 2022, so there are some documents you should click through
            to use Mazury
          </p>
        </div>

        <div className="mb-[90px] space-y-6 ">
          <div>
            <Link href={'/terms-of-service'}>
              <a
                className="font-sans font-semibold text-blue-800 underline"
                onClick={handleOnboardingData}
              >
                Terms of service
              </a>
            </Link>
            <p className="font-sansMid text-sm font-medium text-indigoGray-60">
              We’re in 2022, so there are some documents you should click
              through to use Mazury
            </p>
          </div>

          <div>
            <Link href={'/privacy-policy'}>
              <a
                className="font-sans font-semibold text-blue-800 underline"
                onClick={handleOnboardingData}
              >
                Privacy policy
              </a>
            </Link>
            <p className="font-sansMid text-sm font-medium text-indigoGray-60">
              We’re in 2022, so there are some documents you should click
              through to use Mazury
            </p>
          </div>
        </div>
      </div>
      <div className="mt-auto mb-4 space-y-4 sm:mt-[128px]">
        <p className="font-sansMid text-sm font-medium text-indigoGray-60">
          By clicking this button you consent to the Terms of service and
          Privacy policy and confirm that you understood these documents.
        </p>

        <Button size="large" onClick={handleConsent} className="mt-auto w-full">
          I accept
        </Button>
      </div>
    </>
  );
};
