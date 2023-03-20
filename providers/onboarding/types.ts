import { Profile, ValueOf } from '@/types';

export enum OnboardingStepsEnum {
  ALLSET = 'READY, SET, GO!',
  PROFILEINFORMATION = 'PROFILE INFORMATION',
}

export interface Context {
  activeStep: OnboardingStepsEnum;
  viewedSteps: OnboardingStepsEnum[];
  profile: Omit<Profile, 'avatar'> & { avatar: File };
  handleSetProfile: (
    key: keyof Context['profile'],
    value: ValueOf<Context['profile']>
  ) => void;
  handleStep: (step: OnboardingStepsEnum) => void;
  handleViewedSteps: (steps: OnboardingStepsEnum[]) => void;
}
