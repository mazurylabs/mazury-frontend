import * as React from 'react';
import SVG from 'react-inlinesvg';

import { Button } from '@/components';
import { OnboardingStepsEnum } from '@/providers/onboarding/types';
import { useOnboardingContext } from '@/providers/onboarding/OnboardingProvider';
import Link from 'next/link';

export const RecruiterInfo = () => {
  const { handleStep } = useOnboardingContext();

  const handleSubmit = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    handleStep(OnboardingStepsEnum['SOCIALS']);
  };

  return (
    <>
      <div className="mb-[90px] space-y-8 sm:mb-[128px] xl:mb-[128px]">
        <div className="space-y-3">
          <h2 className="font-demi text-4xl text-indigoGray-90">
            Recruiter info
          </h2>
          <p className="font-sans text-sm font-medium text-indigoGray-60">
            We are creating a platform tailored to web3 recruiters.
          </p>
        </div>

        <div className="flex w-full justify-center">
          <SVG width={120} height={131} src="/icons/recruiter.svg" />
        </div>

        <div className="space-y-6">
          <div>
            <h3 className="font-sans text-base font-semibold text-indigoGray-90">
              Mazury Talent
            </h3>
            <p className="font-sans text-sm font-medium text-indigoGray-60">
              We gather CVs from exceptional users, talk to them and send their
              documents to companies looking for talent
            </p>
          </div>

          <div>
            <h3 className="font-sans text-base font-semibold text-indigoGray-90">
              Credential search
            </h3>
            <p className="font-sans text-sm font-medium text-indigoGray-60">
              We provide guides about using the platform to recruiters, like
              this
              <Link href="https://mazury.notion.site/How-to-scout-talent-using-Mazury-Search-3b0b609e4d334349bb997562ef446773">
                <a target="_blank" className="font-semiBold text-indigo-600">
                  {' '}
                  guide to scout using Mazury Search
                </a>
              </Link>
            </p>
          </div>
        </div>
      </div>
      <Button
        size="large"
        onClick={handleSubmit}
        className="w-full"
        type="submit"
      >
        Continue
      </Button>
    </>
  );
};
