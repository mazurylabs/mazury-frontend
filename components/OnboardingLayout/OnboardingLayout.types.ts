import { ReactNode } from 'react';

export interface OnboardingLayoutProps {
  firstHeading: ReactNode;
  secondHeading: ReactNode;
  children: ReactNode;
  bottomContent: ReactNode;
}
