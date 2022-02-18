import { Button } from 'components';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { FC } from 'react';
import { OnboardingLayoutProps } from './OnboardingLayout.types';

const onboardingRoutes = ['/', 'role', 'refer', 'write', 'redirect'];

export const OnboardingLayout: FC<OnboardingLayoutProps> = ({
  children,
  firstHeading,
  secondHeading,
  bottomButtonText = 'CONTINUE',
}) => {
  const router = useRouter();

  const goForward = () => {
    const currentRoute = [...router.pathname.split('/'), '/'][2];
    const nextRoute =
      onboardingRoutes[onboardingRoutes.indexOf(currentRoute) + 1];
    router.push(`/onboarding/${nextRoute}`);
  };

  const goBack = () => {
    const currentRoute = router.pathname.split('/')[2];
    const prevRoute =
      onboardingRoutes[onboardingRoutes.indexOf(currentRoute) - 1];
    router.push(`/onboarding/${prevRoute}`);
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
        <Button onClick={goForward} className="w-full justify-center">
          {bottomButtonText}
        </Button>
      </div>
    </main>
  );
};
