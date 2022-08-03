import * as React from 'react';

import { OnboardingContext, OnboardingFormDataType } from '@/contexts';
import { PersonBasicDetails } from '@/types';

const initialOnboardingState = {
  username: '',
  role_community_manager: false,
  role_creator: false,
  role_investor: false,
  role_developer: false,
  role_designer: false,
  role_researcher: false,
  role_trader: false,
  open_to_opportunities: false,
  full_name: '',
};

export const OnboardingProvider: React.FC = ({ children }) => {
  const [onboardingFormData, setOnboardingFormData] =
    React.useState<OnboardingFormDataType>(initialOnboardingState);
  const [fetchedProfile, setFetchedProfile] = React.useState(false);
  const [avatarFile, setAvatarFile] = React.useState<File | null>(null);
  const [referralReceiver, setReferralReceiver] =
    React.useState<PersonBasicDetails>();
  const [twitterConnected, setTwitterConnected] = React.useState(false);
  const [githubConnected, setGithubConnected] = React.useState(false);
  const [valid, setValid] = React.useState({
    username: true,
    email: true,
  });

  return (
    <OnboardingContext.Provider
      value={{
        formData: onboardingFormData,
        setFormData: setOnboardingFormData,
        fetched: fetchedProfile,
        setFetched: setFetchedProfile,
        avatarFile,
        setAvatarFile,
        referralReceiver,
        setReferralReceiver,
        twitterConnected,
        setTwitterConnected,
        githubConnected,
        setGithubConnected,
        valid,
        setValid,
      }}
    >
      {children}
    </OnboardingContext.Provider>
  );
};
