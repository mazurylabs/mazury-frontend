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
  [OnboardingStepsEnum.TALENT]: <OnboardingViews.Talent />,
  [OnboardingStepsEnum.RECRUITER]: <OnboardingViews.RecruiterInfo />,
  [OnboardingStepsEnum.OPENTOPROJECTS]: <OnboardingViews.OpenToProjects />,
};

const OnboardingPage: NextPage = () => {
  return (
    <OnboardingProvider>
      <OnboardingContext.Consumer>
        {({ activeStep, viewedSteps, handleStep }) => {
          const handleGoBack = () => {
            const currentIndex = viewedSteps.indexOf(activeStep);

            if (currentIndex) {
              const prevStep = viewedSteps[currentIndex - 1];
              handleStep(prevStep);
            }
          };

          return (
            <div className="relative flex h-screen flex-col items-center justify-center">
              <Link href="/">
                <a className="absolute top-6 left-4 hidden xl:block">
                  <span className="sr-only">Home</span>
                  <SVG height={40} width={40} src="/icons/mazury-logo.svg" />
                </a>
              </Link>

              <div className="flex shrink-0 grow flex-col space-y-4 p-4 sm:w-[530px] sm:pt-20">
                <button
                  type="button"
                  onClick={handleGoBack}
                  className="self-start"
                >
                  <SVG src="/icons/arrow-left.svg" height={16} width={16} />
                  <span className="sr-only">Go back</span>
                </button>

                <div className="flex grow flex-col space-y-2">
                  <h1 className="font-sans text-sm font-medium text-indigoGray-40">
                    {activeStep.split('-')[0]}
                  </h1>
                  <div className="flex grow flex-col">
                    {onboardingSteps[activeStep]}
                  </div>
                </div>
              </div>
            </div>
          );
        }}
      </OnboardingContext.Consumer>
    </OnboardingProvider>
  );
};

export default OnboardingPage;
