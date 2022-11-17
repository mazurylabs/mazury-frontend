import * as React from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { Button } from '@/components';
import { useOnboardingContext } from '@/providers/onboarding/OnboardingProvider';
import { updateProfile } from '@/utils/api';
import { userSlice } from '@/selectors';
import { updateUserProfile } from '@/slices/user';
import { OnboardingStepsEnum } from '@/providers/onboarding/types';

const howDidYouFindUsSources = [
  'Search engine',
  'Twitter',
  'Friends or Family',
  'Social media',
  'Other',
];

export const HowDidYouFindUs = () => {
  const dispatch = useDispatch();
  const { handleStep, profile, handleSetProfile } = useOnboardingContext();
  const { profile: userProfile } = useSelector(userSlice);

  const handleCheck = (selectedSource: string) => {
    handleSetProfile(
      'how_did_you_find_us',
      profile.how_did_you_find_us === selectedSource ? '' : selectedSource
    );
  };

  const handleSubmit = async () => {
    const { error, data } = await updateProfile(
      userProfile?.eth_address as string,
      '',
      profile
    );

    if (!error) {
      dispatch(updateUserProfile(data));
      handleStep(OnboardingStepsEnum['ALLSET']);
    }
  };

  return (
    <>
      <div className="mb-[90px] space-y-8 sm:mb-[128px]">
        <div className="space-y-3">
          <h2 className="font-demi text-4xl text-indigoGray-90">Last step!</h2>
          <p className="font-sansMid text-sm font-medium text-indigoGray-60">
            We’d like to know how you found out about Mazury
          </p>
        </div>

        <div className="space-y-4">
          {howDidYouFindUsSources.map((source) => (
            <CheckButton
              key={source}
              label={source}
              checked={profile.how_did_you_find_us === source}
              onCheck={() => handleCheck(source)}
            />
          ))}
        </div>
      </div>

      <Button size="large" onClick={handleSubmit} className="mt-auto w-full">
        {profile.how_did_you_find_us ? 'Continue' : 'Skip'}
      </Button>
    </>
  );
};

const CheckButton = ({
  label,
  checked,
  onCheck,
}: {
  label: string;
  checked: boolean;
  onCheck: () => void;
}) => {
  return (
    <button
      type="button"
      onClick={onCheck}
      className="flex h-[56px] w-full items-center justify-between rounded rounded-lg border border-indigoGray-20 px-6"
    >
      <span className="font-sans text-base font-medium text-indigoGray-90">
        {label}
      </span>
      <div
        className={`h-4 w-4 rounded border-[1.5px] border-indigoGray-20 ${
          checked ? 'bg-indigoGray-90' : 'transparent'
        }`}
      />
    </button>
  );
};
