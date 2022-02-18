import { OnboardingContext } from 'contexts';
import { useContext } from 'react';
import { ProfileView } from './Profile';
import { RoleView } from './Role';

export const OnboardingView = () => {
  const { currentStep, setCurrentStep } = useContext(OnboardingContext);

  switch (currentStep) {
    case 1:
      return <ProfileView />;
    case 2:
      return <RoleView />;
    default:
      return null;
  }
};
