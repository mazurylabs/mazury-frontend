import { ValueOf } from '@/types';

export enum OnboardingStepsEnum {
  ALLSET = 'READY, SET, GO!',
  COMMUNICATION = 'COMMUNICATION',
  CONSENT = 'DOCUMENTS',
  HOWDIDYOUFINDUS = 'HOW DID YOU FIND US',
  LOCATION = 'JOB COMMUNICATION',
  PROFILEINFORMATION = 'PROFILE INFORMATION',
  PROFILETYPE = 'PROFILE TYPE',
  SOCIALS = 'SOCIALS',
  TALENT = 'TALENT',
  RECRUITER = 'PROFILE TYPE-RECUITER',
  OPENTOPROJECTS = 'PROFILE TYPE-OPENTOPROJECTS',
}

export interface Profile {
  profile_type: 'recruiter' | 'talent' | '';
  open_to_projects: boolean;
  location: string;
  twitter: string;
  github: string;
  linkedIn: string;
  website: string;
  how_did_you_find_us: string;
}

export interface Context {
  activeStep: OnboardingStepsEnum;
  viewedSteps: OnboardingStepsEnum[];
  profile: Profile;
  handleSetProfile: (
    key: keyof Context['profile'],
    value: ValueOf<Context['profile']>
  ) => void;
  handleStep: (step: OnboardingStepsEnum) => void;
  handleViewedSteps: (steps: OnboardingStepsEnum[]) => void;
}
