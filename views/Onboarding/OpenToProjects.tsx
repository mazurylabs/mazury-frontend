import * as React from 'react';

import { Button } from '@/components';
import { useOnboardingContext } from '@/providers/onboarding/OnboardingProvider';
import { OnboardingStepsEnum } from '@/providers/onboarding/types';

export const OpenToProjects = () => {
  const { handleStep, handleSetProfile } = useOnboardingContext();

  const handleNext = (isOpenToProject: boolean) => {
    handleSetProfile('open_to_projects', isOpenToProject);
    handleStep(OnboardingStepsEnum['LOCATION']);
  };

  return (
    <>
      <div className="mb-[90px] flex flex-col">
        <div className="space-y-3">
          <h2 className="font-demi text-4xl text-indigoGray-90">
            Open to projects?
          </h2>
          <p className="font-sans text-sm font-medium text-indigoGray-60">
            We mark users that might consider project proposals for recruiters.
            This makes the situation clear for everyone
          </p>
        </div>
      </div>

      <div className="mt-auto space-y-4">
        <Button
          onClick={() => handleNext(false)}
          className="mt-auto w-full !bg-indigoGray-10 !text-indigoGray-90"
          variant="primary"
        >
          Skip for now
        </Button>
        <Button onClick={() => handleNext(true)} className="mt-auto w-full">
          I’m open to opportunities
        </Button>
      </div>
    </>
  );
};
