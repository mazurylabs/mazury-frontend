import { createContext, Dispatch, SetStateAction, FC, useState } from 'react';
import { PersonBasicDetails } from 'types';

interface SidebarContextType {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  signInOpen: boolean;
  setSignInOpen: Dispatch<SetStateAction<boolean>>;
}

export const SidebarContext = createContext<SidebarContextType>({
  isOpen: false,
  setIsOpen: () => {},
  signInOpen: false,
  setSignInOpen: () => {},
});

export const SidebarProvider: React.FC = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [signInOpen, setSignInOpen] = useState(false);

  return (
    <SidebarContext.Provider
      value={{ isOpen, setIsOpen, signInOpen, setSignInOpen }}
    >
      {children}
    </SidebarContext.Provider>
  );
};

export interface OnboardingFormDataType {
  bio?: string;
  username?: string;
  ens_name?: string;
  eth_address?: string;
  role_developer?: boolean;
  role_designer?: boolean;
  role_trader?: boolean;
  role_creator?: boolean;
  role_researcher?: boolean;
  role_investor?: boolean;
  role_community_manager?: boolean;
  open_to_opportunities?: boolean;
  email?: string;
  website?: string;
  avatar?: string;
  twitter?: string;
  github?: string;
  full_name?: string;
  is_recruiter?: boolean;
}

interface OnboardingContextType {
  formData: OnboardingFormDataType;
  setFormData: Dispatch<SetStateAction<OnboardingFormDataType>>;
  fetched: boolean;
  setFetched: Dispatch<SetStateAction<boolean>>;
  avatarFile: File | null;
  setAvatarFile: Dispatch<SetStateAction<File | null>>;
  referralReceiver?: PersonBasicDetails;
  setReferralReceiver?: Dispatch<
    SetStateAction<PersonBasicDetails | undefined>
  >;
  twitterConnected: boolean;
  setTwitterConnected: Dispatch<SetStateAction<boolean>>;
  githubConnected: boolean;
  setGithubConnected: Dispatch<SetStateAction<boolean>>;
  valid: {
    username: boolean;
    email: boolean;
  };
  setValid: Dispatch<SetStateAction<{ username: boolean; email: boolean }>>;
}

export const OnboardingContext = createContext<OnboardingContextType>({
  formData: {},
  setFormData: () => {},
  fetched: false,
  setFetched: () => {},
  avatarFile: null,
  setAvatarFile: () => {},
  referralReceiver: undefined,
  setReferralReceiver: () => {},
  twitterConnected: false,
  setTwitterConnected: () => {},
  githubConnected: false,
  setGithubConnected: () => {},
  valid: {
    username: false,
    email: false,
  },
  setValid: () => {},
});
