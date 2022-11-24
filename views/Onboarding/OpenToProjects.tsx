import * as React from 'react';

import { Button } from '@/components';
import { useOnboardingContext } from '@/providers/onboarding/OnboardingProvider';
import { OnboardingStepsEnum } from '@/providers/onboarding/types';

export const OpenToProjects = () => {
  const { handleStep, handleSetProfile } = useOnboardingContext();

  const handleNext = (
    event: React.MouseEvent<HTMLButtonElement>,
    isOpenToProject: boolean
  ) => {
    event.preventDefault();
    handleSetProfile('open_to_opportunities', isOpenToProject);
    handleStep(OnboardingStepsEnum[isOpenToProject ? 'LOCATION' : 'SOCIALS']);
  };

  return (
    <>
      <div className="mb-[90px] flex flex-col sm:mb-[128px]">
        <div className="space-y-3">
          <h2 className="font-demi text-4xl text-indigoGray-90">
            Open to projects?
          </h2>
          <p className="font-sansMid text-sm font-medium text-indigoGray-60">
            We mark users that might consider project proposals for recruiters.
            This makes the situation clear for everyone
          </p>
        </div>
      </div>

      <div className="mt-auto space-y-4">
        <Button
          size="large"
          onClick={(event) => handleNext(event, false)}
          className="mt-auto w-full !bg-indigoGray-10 !font-sans !font-semibold !text-indigoGray-90"
          variant="primary"
          type="submit"
        >
          Skip for now
        </Button>
        <Button
          size="large"
          onClick={(event) => handleNext(event, true)}
          className="mt-auto w-full !font-sans !font-semibold"
          type="submit"
        >
          I’m open to opportunities
        </Button>
      </div>
    </>
  );
};
