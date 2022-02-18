import { createContext, Dispatch, SetStateAction } from 'react';

interface SidebarContextType {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
}

export const SidebarContext = createContext<SidebarContextType>({
  isOpen: false,
  setIsOpen: () => {},
});

interface OnboardingContextType {
  currentStep: number;
  setCurrentStep: Dispatch<SetStateAction<number>>;
}

export const OnboardingContext = createContext<OnboardingContextType>({
  currentStep: 0,
  setCurrentStep: () => {},
});
