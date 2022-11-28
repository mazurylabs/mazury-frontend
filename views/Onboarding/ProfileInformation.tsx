import * as React from 'react';
import SVG from 'react-inlinesvg';
import { useSelector } from 'react-redux';

import { Button, Input } from '@/components';
import { useOnboardingContext } from '@/providers/onboarding/OnboardingProvider';
import { OnboardingStepsEnum } from '@/providers/onboarding/types';
import { userSlice } from '@/selectors';
import { isValid } from '@/utils/api';

export const ProfileInformation = () => {
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState(false);
  const { profile: userProfile } = useSelector(userSlice);
  const { handleStep, handleSetProfile, profile } = useOnboardingContext();
  const avatar = profile?.avatar
    ? URL.createObjectURL(profile?.avatar as any)
    : '';

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { files } = event.target;
    if (files && files.length !== 0) {
      handleSetProfile('avatar', files[0]);
      event.target.value = '';
    }
  };

  const handleRemove = () => {
    handleSetProfile('avatar', '');
  };

  const handleSubmit = async (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    setLoading(true);
    setError(false);

    const { error } = await isValid('username', profile.username);

    setLoading(false);

    if (!error) {
      handleStep(OnboardingStepsEnum['COMMUNICATION']);
    } else {
      setError(true);
    }
  };

  return (
    <>
      <div className="mb-[90px] space-y-8 sm:space-y-6">
        <div className="space-y-3">
          <h2 className="font-demi text-4xl text-indigoGray-90">Hi there</h2>
          <p className="font-sansSemi text-sm font-medium text-indigoGray-60">
            We’re glad you’re joining us. Let’s take a moment to polish your
            profile a bit!
          </p>
        </div>

        <div className="space-y-4">
          <div className="space-y-1 font-sansMid font-medium">
            <h3 className="text-xs text-black-300">WALLET USED</h3>
            {profile?.ens_name && (
              <p className="text-lg text-indigoGray-90">
                {userProfile?.ens_name}
              </p>
            )}
            <p className="text-xs text-indigoGray-40">
              {userProfile?.eth_address}
            </p>
          </div>

          <div className="space-y-1">
            <Input
              id="username"
              label={
                <div className="font-sans text-indigoGray-40">
                  Username{' '}
                  <span className="font-sans font-normal text-indigoGray-30">
                    (Required)
                  </span>
                </div>
              }
              value={profile.username || ''}
              placeholder="Insert username"
              onChange={(value) => {
                handleSetProfile('username', value);
              }}
              error={error}
              onFocus={() => setError(false)}
            />
            {error && (
              <div className="flex items-center space-x-1 pl-2">
                <SVG src="/icons/error.svg" height={12} width={12} />
                <p className="font-sans text-xs text-red-500">
                  Username already exists
                </p>
              </div>
            )}
          </div>

          <div>
            <Input
              id="full_name"
              label={
                <div className="font-sans text-indigoGray-40">
                  Full name{' '}
                  <span className="font-sans font-normal text-indigoGray-30">
                    (Optional)
                  </span>
                </div>
              }
              value={profile.full_name || ''}
              placeholder="Insert full name"
              onChange={(value) => {
                handleSetProfile('full_name', value);
              }}
            />
          </div>
        </div>

        <div className="flex w-full items-center justify-center space-x-6">
          <div>
            <img
              src={avatar || '/icons/no-avatar.svg'}
              alt="Profile"
              className="h-[100px] w-[100px] rounded-full object-cover"
            />
          </div>

          <div className="space-y-2">
            <div className="cursor-pointer">
              <div className="flex h-[29px] w-[131px] items-center justify-center rounded-lg border border-indigoGray-20 bg-indigoGray-10 shadow-base">
                <label
                  htmlFor="avatar-upload"
                  className="cursor-pointer font-sans text-sm font-semibold text-indigoGray-90"
                >
                  Add picture
                </label>
              </div>

              <input
                id="avatar-upload"
                accept="image/*"
                type="file"
                onInput={handleFileUpload}
                className="sr-only"
                name="avatar"
              />
            </div>

            <Button
              type="button"
              onClick={handleRemove}
              variant="tertiary"
              className="w-full !p-0 !font-sans !font-semibold"
              disabled={!profile.avatar}
            >
              Remove
            </Button>
          </div>
        </div>
      </div>

      <Button
        type="submit"
        size="large"
        className="mt-auto w-full"
        disabled={!profile.username}
        loading={loading}
        onClick={handleSubmit}
      >
        Continue
      </Button>
    </>
  );
};
