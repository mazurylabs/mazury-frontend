import { createContext, Dispatch, SetStateAction } from 'react';
import { PersonBasicDetails } from 'types';

interface SidebarContextType {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
}

export const SidebarContext = createContext<SidebarContextType>({
  isOpen: false,
  setIsOpen: () => {},
});

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
});
