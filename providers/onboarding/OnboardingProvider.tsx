import * as React from 'react';

import { ValueOf } from '@/types';
import { Context, OnboardingStepsEnum } from './types';
import { ONBOARDING_DATA } from '@/config';
import storage from '@/utils/storage';

export const OnboardingContext = React.createContext<Context>({
  activeStep: OnboardingStepsEnum.PROFILEINFORMATION,
  viewedSteps: [],
  profile: {} as Context['profile'],
  handleSetProfile: () => null,
  handleStep: () => null,
  handleViewedSteps: () => null,
});

export const OnboardingProvider: React.FC = ({ children }) => {
  const storedOnboardingData = storage.getToken(ONBOARDING_DATA) as Context;

  const [activeStep, setActiveStep] = React.useState<Context['activeStep']>(
    () => {
      return (
        storedOnboardingData?.activeStep ||
        OnboardingStepsEnum.PROFILEINFORMATION
      );
    }
  );

  const [viewedSteps, setViewedSteps] = React.useState<Context['viewedSteps']>(
    () => {
      return storedOnboardingData?.viewedSteps || [activeStep];
    }
  );

  const [profile, setProfile] = React.useState<Context['profile']>(() => {
    return storedOnboardingData?.profile || ({} as Context['profile']);
  });

  const handleSetProfile = (
    key: keyof Context['profile'],
    value: ValueOf<Context['profile']>
  ) => {
    setProfile((profile) => ({ ...profile, [key]: value }));
  };

  const handleStep = (step: OnboardingStepsEnum) => {
    setActiveStep(step);

    storage.clearToken(ONBOARDING_DATA);

    if (!viewedSteps.includes(step)) {
      setViewedSteps((prevSteps) => [...prevSteps, step]);
    } else {
      const updatedViewedSteps = viewedSteps.filter(
        (prevStep) => prevStep !== activeStep
      );

      setViewedSteps(updatedViewedSteps);
    }
  };

  const handleViewedSteps = (steps: OnboardingStepsEnum[]) => {
    setViewedSteps(steps);
  };

  return (
    <OnboardingContext.Provider
      value={{
        activeStep,
        profile,
        handleSetProfile,
        handleStep,
        viewedSteps,
        handleViewedSteps,
      }}
    >
      {children}
    </OnboardingContext.Provider>
  );
};

export const useOnboardingContext = (): Context => {
  const context = React.useContext(OnboardingContext);

  if (!context) {
    throw new Error(
      'Ensure that you wrap any components in the OnboardingProvider component'
    );
  }

  return context;
};
