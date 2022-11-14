import * as React from 'react';
import SVG from 'react-inlinesvg';

import { Button, Input } from '@/components';
import { useOnboardingContext } from '@/providers/onboarding/OnboardingProvider';
import { OnboardingStepsEnum } from '@/providers/onboarding/types';

export const Socials = () => {
  const { handleStep, profile } = useOnboardingContext();

  const hasSocial =
    profile.github || profile.linkedIn || profile.twitter || profile.website;

  return (
    <>
      <div className="mb-[90px] space-y-8">
        <div className="space-y-3">
          <h2 className="font-demi text-4xl text-indigoGray-90">
            Let’s get in touch
          </h2>
          <p className="font-sans text-sm font-medium text-indigoGray-60">
            Make your profile stand out by giving others more info about you!
            All this data is optional.
          </p>
        </div>

        <div className="space-y-1">
          <Input
            id="email"
            label="Website"
            // value={formData.username}
            placeholder="Insert website"
            // onChange={(val) => {
            //   const newFd = { ...formData, username: val };
            //   setFormData(newFd);
            // }}
            // error={!valid.username}
          />
          <div className="flex space-x-1 pl-2">
            <SVG src="/icons/error-warning-line.svg" height={12} width={12} />
            <p className="font-sans text-xs text-indigoGray-40">
              We will send you a confirmation e-mail
            </p>
          </div>
        </div>

        <div className="flex flex-col space-y-4">
          <button
            className={`flex h-[45px] grow items-center justify-center space-x-2 rounded-lg ${
              !profile.twitter ? 'bg-[#4A99E9]' : 'bg-indigoGray-10'
            }`}
            disabled={!!profile.twitter}
          >
            <SVG height={16} width={16} src="/icons/twitter.svg" />
            <span className="font-sans text-sm font-semibold text-indigoGray-5">
              Twitter
            </span>
          </button>

          <button
            disabled={!!profile.github}
            className={`flex h-[45px] grow items-center justify-center space-x-2 rounded-lg ${
              !profile.github ? 'bg-[#262626]' : 'bg-indigoGray-10'
            }`}
          >
            <SVG height={16} width={16} src="/icons/github.svg" />
            <span className="font-semiBold font-sans text-sm text-indigoGray-5">
              Github
            </span>
          </button>

          <button
            disabled={!!profile.linkedIn}
            className={`flex h-[45px] grow items-center justify-center space-x-2 rounded-lg ${
              !profile.linkedIn ? 'bg-[#4A99E9]' : 'bg-indigoGray-10'
            }`}
          >
            <SVG height={16} width={16} src="/icons/linkedin.svg" />
            <span className="font-semiBold font-sans text-sm text-indigoGray-5">
              LinkedIn
            </span>
          </button>
        </div>
      </div>

      <Button
        onClick={() => handleStep(OnboardingStepsEnum['CONSENT'])}
        className="mt-auto w-full"
      >
        {hasSocial ? 'Continue' : 'Skip'}
      </Button>
    </>
  );
};
