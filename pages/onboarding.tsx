import { OnboardingContext } from 'contexts';
import { NextPage } from 'next';
import { useState } from 'react';
import { OnboardingView } from 'views/Onboarding';

const OnboardingPage: NextPage = () => {
  // TODO: Set back to 1
  const [currentStep, setCurrentStep] = useState(2);

  return (
    <OnboardingContext.Provider value={{ currentStep, setCurrentStep }}>
      <OnboardingView />
    </OnboardingContext.Provider>
  );
};

export default OnboardingPage;
