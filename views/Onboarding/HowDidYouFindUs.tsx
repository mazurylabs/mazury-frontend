import * as React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Toaster, toast } from 'react-hot-toast';

import { Button, Checkbox } from '@/components';
import { useOnboardingContext } from '@/providers/onboarding/OnboardingProvider';
import { updateProfile } from '@/utils/api';
import { userSlice } from '@/selectors';
import { login } from '@/slices/user';
import { OnboardingStepsEnum } from '@/providers/onboarding/types';

const howDidYouFindUsSources = [
  'Search engine',
  'Twitter',
  'Friends or Family',
  'Social media',
  'Other',
];

export const HowDidYouFindUs = () => {
  const [loading, setLoading] = React.useState(false);
  const dispatch = useDispatch();
  const { handleStep, profile, handleSetProfile } = useOnboardingContext();
  const { profile: userProfile } = useSelector(userSlice);

  const handleCheck = (selectedSource: string) => {
    const filteredSources = profile.how_did_you_find_us
      ?.split(';')
      .filter((source) => source !== selectedSource)
      .join(';');

    const updatedSources =
      (profile.how_did_you_find_us ? profile.how_did_you_find_us + ';' : '') +
      selectedSource;

    const payload = profile.how_did_you_find_us?.includes(selectedSource)
      ? filteredSources
      : updatedSources;

    handleSetProfile('how_did_you_find_us', payload);
  };

  const handleSubmit = async (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    setLoading(true);

    const { error, data } = await updateProfile(
      userProfile?.eth_address as string,
      '',
      profile
    );

    setLoading(false);

    if (!error) {
      dispatch(login(data));
      handleStep(OnboardingStepsEnum['ALLSET']);
    } else {
      toast.error('Something went wrong');
    }
  };

  return (
    <>
      <div className="mb-[90px] space-y-8 sm:space-y-6">
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
              checked={!!profile.how_did_you_find_us?.includes(source)}
              onCheck={() => handleCheck(source)}
            />
          ))}
        </div>
      </div>

      <Toaster />

      <Button
        size="large"
        onClick={handleSubmit}
        className="mt-auto w-full"
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
