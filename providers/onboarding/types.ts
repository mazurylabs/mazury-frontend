import { Profile, ValueOf } from '@/types';

export enum OnboardingStepsEnum {
  ALLSET = 'READY, SET, GO!',
  COMMUNICATION = 'COMMUNICATION',
  CONSENT = 'TERMS AND PRIVACY',
  HOWDIDYOUFINDUS = 'HOW DID YOU FIND US',
  LOCATION = 'YOUR LOCATION',
  PROFILEINFORMATION = 'PROFILE INFORMATION',
  PROFILETYPE = 'PROFILE TYPE',
  SOCIALS = 'SOCIALS',
  RECRUITER = 'PROFILE TYPE-RECUITER',
  OPENTOPROJECTS = 'PROFILE TYPE-OPENTOPROJECTS',
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
