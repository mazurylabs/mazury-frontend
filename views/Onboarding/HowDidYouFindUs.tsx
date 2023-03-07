import * as React from 'react';
import { Toaster, toast } from 'react-hot-toast';

import { Button, Checkbox } from '@/components';
import { useOnboardingContext } from '@/providers/onboarding/OnboardingProvider';
import { updateProfile } from '@/utils/api';
import { OnboardingStepsEnum } from '@/providers/onboarding/types';
import { useUser } from '@/providers/react-query-auth';
import { useQueryClient } from '@tanstack/react-query';

const howDidYouFindUsSources = [
  'Twitter',
  'Friend',
  'Other social media',
  'Web3 credential provider',
  'Other',
];

export const HowDidYouFindUs = () => {
  const queryClient = useQueryClient();
  const [loading, setLoading] = React.useState(false);
  const { handleStep, profile, handleSetProfile } = useOnboardingContext();
  const { data: userProfile } = useUser();

  const handleCheck = (selectedSource: string) => {
    const filteredSources = profile.how_did_you_find_us
      ?.split(';')
      .filter((source) => source !== selectedSource)
      .join(';');

    const updatedSources =
      (profile.how_did_you_find_us ? profile.how_did_you_find_us + ';' : '') +
      selectedSource;

    const payload = profile.how_did_you_find_us
      ?.split(';')
      .includes(selectedSource)
      ? filteredSources
      : updatedSources;

    handleSetProfile('how_did_you_find_us', payload);
  };

  const handleSubmit = async (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    setLoading(true);

    const { avatar, ...restOfProfile } = profile;

    const { error, data } = await updateProfile(
      userProfile?.eth_address as string,
      '',
      restOfProfile,
      profile?.avatar
    );

    setLoading(false);

    if (!error) {
      queryClient.setQueryData(['authenticated-user'], (prev: any) => ({
        ...prev,
        ...data,
        onboarded: true,
      }));
      handleStep(OnboardingStepsEnum['ALLSET']);
    } else {
      toast.error('Something went wrong');
    }
  };

  return (
    <>
      <div className="mb-[90px] space-y-8 sm:mb-[128px] sm:space-y-6 xl:mb-[32px]">
        <div className="space-y-3">
          <h2 className="font-demi text-4xl text-indigoGray-90">Last step!</h2>
          <p className="font-sansMid text-sm font-medium text-indigoGray-60">
            We’d like to know how you found out about Mazury
          </p>
        </div>

        <div className="space-y-4 sm:space-y-3">
          {howDidYouFindUsSources.map((source) => (
            <CheckButton
              key={source}
              label={source}
              checked={
                !!profile.how_did_you_find_us?.split(';').includes(source)
              }
              onCheck={() => handleCheck(source)}
            />
          ))}
        </div>
      </div>

      <Toaster />

      <Button
        size="large"
        onClick={handleSubmit}
        className="!mb-12 w-full xl:!mb-0"
        loading={loading}
        type="submit"
      >
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
    <div
      onClick={onCheck}
      className="flex h-[56px] w-full cursor-pointer items-center justify-between rounded rounded-lg border border-indigoGray-20 px-6"
    >
      <span className="font-sans text-base font-medium text-indigoGray-90">
        {label}
      </span>
      <Checkbox
        label={<div className="sr-only">{label}</div>}
        checked={checked}
        setChecked={onCheck}
        id={label}
        innerClassName="!w-4 !h-4"
        outerClassName="w-4 h-4"
      />
    </div>
  );
};
