import * as React from 'react';
import SVG from 'react-inlinesvg';

import { Button, Input } from '@/components';
import { useOnboardingContext } from '@/providers/onboarding/OnboardingProvider';
import { OnboardingStepsEnum } from '@/providers/onboarding/types';

export const Communication = () => {
  const { handleStep } = useOnboardingContext();

  return (
    <div className="flex grow flex-col">
      <div className="mb-[90px] space-y-8">
        <div className="space-y-3">
          <h2 className="font-demi text-4xl text-indigoGray-90">
            Contact details
          </h2>
          <p className="font-sans text-sm font-medium text-indigoGray-60">
            Mazury is the bridge between you and the professional world of web3.
            For communication we will need your e-mail.
          </p>
        </div>

        <div className="space-y-1">
          <Input
            id="email"
            label="Email"
            // value={formData.username}
            placeholder="Insert e-mail"
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
      </div>
      <Button
        onClick={() => handleStep(OnboardingStepsEnum['PROFILETYPE'])}
        className="mt-auto w-full"
      >
        Continue
      </Button>
    </div>
  );
};
