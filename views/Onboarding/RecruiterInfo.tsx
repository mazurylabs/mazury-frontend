import * as React from 'react';
import SVG from 'react-inlinesvg';

import { Button } from '@/components';
import { OnboardingStepsEnum } from '@/providers/onboarding/types';
import { useOnboardingContext } from '@/providers/onboarding/OnboardingProvider';

export const RecruiterInfo = () => {
  const { handleStep } = useOnboardingContext();

  const handleSubmit = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    handleStep(OnboardingStepsEnum['SOCIALS']);
  };

  return (
    <>
      <div className="mb-[90px] space-y-8 sm:mb-[128px]">
        <div className="space-y-3">
          <h2 className="font-demi text-4xl text-indigoGray-90">
            Recruiter info
          </h2>
          <p className="font-sans text-sm font-medium text-indigoGray-60">
            We are creating a platform tailored to web3 recruiters.
          </p>
        </div>

        <div className="flex w-full justify-center">
          <SVG width={120} height={131} src="/icons/recruiter.svg" />
        </div>

        <div className="space-y-6">
          <div>
            <h3 className="font-sans text-base font-medium text-indigoGray-90">
              Mazury Talent
            </h3>
            <p className="font-sans text-sm font-medium text-indigoGray-60">
              We gather CVs from exceptional users, talk to them and send their
              documents to companies looking for talent
            </p>
          </div>

          <div>
            <h3 className="font-sans text-base font-medium text-indigoGray-90">
              Credential search
            </h3>
            <p className="font-sans text-sm font-medium text-indigoGray-60">
              We provide guides about using the platform to recruiters, like
              this
              <span className="font-semiBold text-indigo-600">
                {' '}
                guide to scout using Mazury Search
              </span>
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
        Continue
      </Button>
    </>
  );
};
