import { ReactNode } from 'react';

export interface OnboardingLayoutProps {
  firstHeading: ReactNode;
  secondHeading: ReactNode;
  children: ReactNode;
  bottomButtonText?: ReactNode;
  bottomButtonOnClick?: () => Promise<void>;
  bottomButtonDisabled?: boolean;
  overrideOnClick?: boolean;
}
