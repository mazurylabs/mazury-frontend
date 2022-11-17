import * as React from 'react';
import { useRouter } from 'next/router';
import SVG from 'react-inlinesvg';

import { Button, Input, TwitterModal, GithubModal } from '@/components';
import { useOnboardingContext } from '@/providers/onboarding/OnboardingProvider';
import { OnboardingStepsEnum } from '@/providers/onboarding/types';
import { ONBOARDING_DATA } from '@/config';
import storage from '@/utils/storage';

export const Socials = () => {
  const router = useRouter();
  const { handleStep, profile, handleSetProfile, viewedSteps, activeStep } =
    useOnboardingContext();

  const hasSocial =
    profile.github || profile.linkedIn || profile.twitter || profile.website;

  const handleConnectGithub = React.useCallback((data?: any) => {
    const onboardingData = {
      profile: { ...profile, ...data },
      viewedSteps,
      activeStep,
    };
    storage.setToken(onboardingData, ONBOARDING_DATA);
  }, []);

  React.useEffect(() => {
    const username = router.query?.username as string;
    if (username) {
      handleSetProfile('github', username);
      handleConnectGithub({ github: username });
    }
  }, []);

  return (
    <>
      <div className="mb-[90px] space-y-8 sm:mb-[128px]">
        <div className="space-y-3">
          <h2 className="font-demi text-4xl text-indigoGray-90">
            Let’s get in touch
          </h2>
          <p className="font-sansMid text-sm font-medium text-indigoGray-60">
            Make your profile stand out by giving others more info about you!
            All this data is optional.
          </p>
        </div>

        <Input
          id="website"
          label="Website"
          value={profile.website}
          placeholder="Insert website"
          onChange={(value) => {
            handleSetProfile('website', value);
          }}
        />

        <div className="flex flex-col space-y-4">
          <TwitterModal
            trigger={
              <button
                className={`flex h-[45px] grow items-center justify-center space-x-2 rounded-lg shadow-base ${
                  !profile.twitter ? 'bg-[#4A99E9]' : 'bg-indigoGray-10'
                }`}
              >
                <SVG
                  height={16}
                  width={16}
                  src={`/icons/twitter${profile.twitter ? '-black' : ''}.svg`}
                />
                <span
                  className={`font-sansSemi text-sm font-semibold ${
                    !profile.twitter
                      ? 'text-indigoGray-5'
                      : 'text-indigoGray-90'
                  }`}
                >
                  {profile.twitter ? 'Connected to Twitter' : 'Twitter'}
                </span>
              </button>
            }
            handleSubmit={(username) => handleSetProfile('twitter', username)}
            isDisconnecting={!!profile.twitter}
          />

          <GithubModal
            trigger={
              <button
                className={`flex h-[45px] grow items-center justify-center space-x-2 rounded-lg shadow-base ${
                  !profile.github ? 'bg-[#262626]' : 'bg-indigoGray-10'
                }`}
              >
                <SVG
                  height={16}
                  width={16}
                  src={`/icons/github${profile.github ? '-black' : ''}.svg`}
                />

                <span
                  className={`font-sansSemi text-sm font-semibold ${
                    !profile.github ? 'text-indigoGray-5' : 'text-indigoGray-90'
                  }`}
                >
                  Github
                </span>
              </button>
            }
            isDisconnecting={!!profile.github}
            handleSubmit={(username) => handleSetProfile('github', username)}
            handleConnect={handleConnectGithub}
          />

          <button
            disabled={!!profile.linkedIn}
            className={`flex h-[45px] grow items-center justify-center space-x-2 rounded-lg shadow-base ${
              !profile.linkedIn ? 'bg-[#2D64BC]' : 'bg-indigoGray-10'
            }`}
          >
            <SVG
              height={16}
              width={16}
              src={`/icons/linkedin${profile.linkedIn ? '-black' : ''}.svg`}
            />
            <span
              className={`font-sansSemi text-sm font-semibold ${
                !profile.linkedIn ? 'text-indigoGray-5' : 'text-indigoGray-90'
              }`}
            >
              LinkedIn
            </span>
          </button>
        </div>
      </div>

      <Button
        size="large"
        onClick={() => handleStep(OnboardingStepsEnum['CONSENT'])}
        className="mt-auto w-full"
      >
        {hasSocial ? 'Continue' : 'Skip'}
      </Button>
    </>
  );
};
