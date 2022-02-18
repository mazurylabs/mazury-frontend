import { Button } from 'components';
import { OnboardingContext } from 'contexts';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { FC, useContext } from 'react';
import { OnboardingLayoutProps } from './OnboardingLayout.types';

export const OnboardingLayout: FC<OnboardingLayoutProps> = ({
  children,
  firstHeading,
  secondHeading,
  bottomButtonText = 'CONTINUE',
}) => {
  const router = useRouter();
  const { currentStep, setCurrentStep } = useContext(OnboardingContext);

  const goBack = () => {
    if (currentStep === 1) {
      router.back();
    } else {
      setCurrentStep(currentStep - 1);
    }
  };

  return (
    <main className="flex min-h-screen flex-col px-4 py-4 align-top">
      <Image
        onClick={goBack}
        src="/icons/back.svg"
        alt="Back"
        width="16px"
        height="16px"
        layout="fixed"
        className="hover:cursor-pointer"
      />

      <h1 className="mt-6 text-sm font-medium uppercase text-indigoGray-40">
        {firstHeading}
      </h1>
      <h3 className="mt-2 font-demi text-4xl text-indigoGray-90">
        {secondHeading}
      </h3>

      {children}

      <div className="sticky bottom-8 mx-auto mt-auto w-full">
        <Button
          onClick={() => setCurrentStep(currentStep + 1)}
          className="w-full justify-center"
        >
          {bottomButtonText}
        </Button>
      </div>
    </main>
  );
};
