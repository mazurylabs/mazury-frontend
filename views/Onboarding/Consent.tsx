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

  const handleConsent = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    handleSetProfile('privacy_consent', true);
    handleStep(OnboardingStepsEnum['HOWDIDYOUFINDUS']);
  };

  return (
    <>
      <div className="flex flex-col space-y-8">
        <div className="space-y-3">
          <h2 className="font-demi text-4xl text-indigoGray-90">Documents</h2>
          <p className="font-sansMid text-sm font-medium text-indigoGray-60">
            We’re in 2022, so there are some documents you should read before
            using Mazury.
          </p>
        </div>

        <div className="mb-[90px] space-y-6 ">
          <div>
            <Link legacyBehavior href={'/terms-of-service'}>
              <a
                target="_blank"
                className="font-sans font-semibold text-blue-800 underline"
                // onClick={handleOnboardingData}
              >
                Terms of service
              </a>
            </Link>
            <p className="font-sansMid text-sm font-medium text-indigoGray-60">
              This document lays out general rules of the service. There is a
              short summary at the begining.
            </p>
          </div>

          <div>
            <Link legacyBehavior href={'/privacy-policy'}>
              <a
                target="_blank"
                className="font-sans font-semibold text-blue-800 underline"
                // onClick={handleOnboardingData}
              >
                Privacy policy
              </a>
            </Link>
            <p className="font-sansMid text-sm font-medium text-indigoGray-60">
              The policy talks about the data we use and how you can control
              that data.
            </p>
          </div>
        </div>
      </div>
      <div className="mt-[90px] mb-4 space-y-4 sm:mt-[128px] xl:mt-[32px]">
        <p className="font-sansMid text-sm font-medium text-indigoGray-60">
          By clicking this button you consent to the Terms of service and
          Privacy policy and confirm that you understood these documents.
        </p>

        <Button
          type="submit"
          size="large"
          onClick={handleConsent}
          className="w-full"
        >
          I accept
        </Button>
      </div>
    </>
  );
};
