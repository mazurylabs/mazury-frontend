import * as React from 'react';

import { Button, Input } from '@/components';
import { useOnboardingContext } from '@/providers/onboarding/OnboardingProvider';
import { OnboardingStepsEnum } from '@/providers/onboarding/types';

export const ProfileInformation = () => {
  const { handleStep, handleSetProfile } = useOnboardingContext();

  return (
    <>
      <div className="mb-[90px] space-y-8">
        <div className="space-y-3">
          <h2 className="font-demi text-4xl text-indigoGray-90">
            Hi, nazeeh.eth!
          </h2>
          <p className="font-sans text-sm font-medium text-indigoGray-60">
            We’re glad you’re joining us. Let’s take a moment to polish your
            profile a bit!
          </p>
        </div>

        <div className="space-y-4">
          <div className="space-y-1 font-sans font-medium">
            <h3 className="text-xs text-black-300">ENS NAME</h3>
            <p className="text-lg text-indigoGray-90">nazeeh.eth</p>
            <p className="text-xs text-indigoGray-40">
              0xF417ACe7b13c0ef4fcb5548390a450A4B75D3eB3
            </p>
          </div>

          <div>
            <Input
              id="username"
              label="Username"
              // value={formData.username}
              placeholder="Insert username"
              // onChange={(val) => {
              //   const newFd = { ...formData, username: val };
              //   setFormData(newFd);
              // }}
              // error={!valid.username}
            />
          </div>

          <div>
            <Input
              id="username"
              label="Full name"
              // value={formData.username}
              placeholder="Insert full name"
              // onChange={(val) => {
              //   const newFd = { ...formData, username: val };
              //   setFormData(newFd);
              // }}
              // error={!valid.username}
            />
          </div>
        </div>

        <div className="flex justify-center space-x-6">
          <div>
            <img
              src={'/profile-active.svg'}
              alt="Profile"
              className="h-[100px] w-[100px] rounded-full object-cover"
            />
          </div>

          <div className="space-y-2">
            <Button
              // onClick={onAddPicClick}
              variant="secondary"
              className="w-full uppercase"
            >
              Add picture
            </Button>

            <Button
              // onClick={onRemovePicClick}
              variant="tertiary"
              className="w-full uppercase"
            >
              Remove
            </Button>
          </div>
        </div>
      </div>

      <Button
        onClick={() => handleStep(OnboardingStepsEnum['COMMUNICATION'])}
        className="mt-auto w-full"
      >
        Continue
      </Button>
    </>
  );
};
