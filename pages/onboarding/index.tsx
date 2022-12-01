import { NextPage } from 'next';
import SVG from 'react-inlinesvg';

import { OnboardingProvider } from '@/providers/onboarding/OnboardingProvider';
import { OnboardingContext } from '@/providers/onboarding/OnboardingProvider';
import { OnboardingStepsEnum } from '@/providers/onboarding/types';
import * as OnboardingViews from '@/views/Onboarding';
import Link from 'next/link';

const onboardingSteps: Record<OnboardingStepsEnum, JSX.Element> = {
  [OnboardingStepsEnum.ALLSET]: <OnboardingViews.AllSet />,
  [OnboardingStepsEnum.COMMUNICATION]: <OnboardingViews.Communication />,
  [OnboardingStepsEnum.CONSENT]: <OnboardingViews.Consent />,
  [OnboardingStepsEnum.HOWDIDYOUFINDUS]: <OnboardingViews.HowDidYouFindUs />,
  [OnboardingStepsEnum.LOCATION]: <OnboardingViews.Location />,
  [OnboardingStepsEnum.PROFILEINFORMATION]: (
    <OnboardingViews.ProfileInformation />
  ),
  [OnboardingStepsEnum.PROFILETYPE]: <OnboardingViews.ProfileType />,
  [OnboardingStepsEnum.SOCIALS]: <OnboardingViews.Socials />,
  [OnboardingStepsEnum.RECRUITER]: <OnboardingViews.RecruiterInfo />,
  [OnboardingStepsEnum.OPENTOPROJECTS]: <OnboardingViews.OpenToProjects />,
};

const OnboardingPage: NextPage = () => {
  return (
    <OnboardingProvider>
      <OnboardingContext.Consumer>
        {({ activeStep, viewedSteps, handleStep }) => {
          const currentIndex = viewedSteps.indexOf(activeStep);

          const handleGoBack = () => {
            if (currentIndex) {
              const prevStep = viewedSteps[currentIndex - 1];
              handleStep(prevStep);
            }
          };

          return (
            <div className="relative flex h-screen flex-col items-center px-4 pb-12 sm:h-fit sm:px-0">
              <Link href="/">
                <a className="fixed top-6 left-4 hidden xl:block">
                  <span className="sr-only">Home</span>
                  <SVG height={40} width={40} src="/icons/mazury-logo.svg" />
                </a>
              </Link>

              <div className="flex h-full w-full flex-col sm:w-[530px]">
                <div className="space-y-4 bg-white pt-4 sm:pt-6">
                  <div className="h-6 w-6">
                    {!!currentIndex && (
                      <button
                        type="button"
                        onClick={handleGoBack}
                        className="self-start"
                      >
                        <SVG
                          src="/icons/arrow-left.svg"
                          height={24}
                          width={24}
                        />
                        <span className="sr-only">Go back</span>
                      </button>
                    )}
                  </div>

                  <h1 className="font-sansMid text-sm font-medium text-indigoGray-40">
                    {activeStep.split('-')[0]}
                  </h1>
                </div>

                <form className="flex grow flex-col sm:grow-0">
                  {onboardingSteps[activeStep]}
                </form>
              </div>
            </div>
          );
        }}
      </OnboardingContext.Consumer>
    </OnboardingProvider>
  );
};

export default OnboardingPage;
