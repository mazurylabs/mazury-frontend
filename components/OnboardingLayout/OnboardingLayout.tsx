import Image from 'next/image';
import { FC } from 'react';
import { OnboardingLayoutProps } from './OnboardingLayout.types';

export const OnboardingLayout: FC<OnboardingLayoutProps> = ({
  children,
  firstHeading,
  secondHeading,
  bottomContent,
}) => {
  return (
    <main className="flex min-h-screen flex-col px-4 py-4 align-top">
      <Image
        src="/icons/back.svg"
        alt="Back"
        width="16px"
        height="16px"
        layout="fixed"
      />

      <h1 className="mt-6 text-sm font-medium uppercase text-indigoGray-40">
        {firstHeading}
      </h1>
      <h3 className="mt-2 font-demi text-4xl text-indigoGray-90">
        {secondHeading}
      </h3>

      {children}

      <div className="sticky bottom-8 mx-auto mt-auto w-full">
        {bottomContent}
      </div>
    </main>
  );
};
