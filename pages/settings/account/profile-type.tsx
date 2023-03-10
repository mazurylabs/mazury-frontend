import { NextPage } from 'next';
import * as React from 'react';
import { toast, Toaster } from 'react-hot-toast';

import { Button, SettingsLayout } from 'components';
import { useIsOnboarded, useProtectedRoute } from 'hooks';
import { updateProfile } from '@/utils/api';

import * as Sentry from '@sentry/nextjs';
import { useUser } from 'providers/react-query-auth';
import { useQueryClient } from '@tanstack/react-query';

const EthAddressPage: NextPage = () => {
  useProtectedRoute();
  useIsOnboarded();
  const queryClient = useQueryClient();
  const { data: profile } = useUser();
  const [loading, setLoading] = React.useState(false);
  const [isRecruiter, setIsRecruiter] = React.useState(
    () => !!profile?.is_recruiter
  );

  const handleSubmit = async () => {
    setLoading(true);
    const { error } = await updateProfile(profile?.eth_address as string, '', {
      is_recruiter: isRecruiter,
    });

    if (!error) {
      queryClient.setQueryData(['authenticated-user'], (prev: any) => ({
        ...prev,
        is_recruiter: isRecruiter,
      }));
    } else {
      Sentry.captureException(error);
      toast.error('Something went wrong');
    }

    setLoading(false);
  };

  return (
    <SettingsLayout
      content={
        <div className="flex grow flex-col space-y-8">
          <Toaster />
          <div className="space-y-3">
            <h2 className="font-serif text-4xl font-semibold leading-9">
              Profile type
            </h2>
            <p className="font-sansMid text-sm font-medium text-indigoGray-60">
              Do you plan to use Mazury for recruiting or as a professional?
            </p>
          </div>

          <div className="space-y-4">
            <button
              className="flex w-full items-center justify-between rounded-lg border border-indigoGray-20 p-6"
              onClick={() => setIsRecruiter(true)}
            >
              <span className="font-sansMid text-base font-medium text-indigoGray-90">
                I’m a recruiter
              </span>

              <Radio checked={isRecruiter} label="recruiter" />
            </button>

            <button
              className="flex w-full items-center justify-between rounded-lg border border-indigoGray-20 p-6"
              onClick={() => setIsRecruiter(false)}
            >
              <span className="font-sansMid text-base font-medium text-indigoGray-90">
                I’m a professional
              </span>
              <Radio label={'professional'} checked={!isRecruiter} />
            </button>
          </div>

          <Button
            className="!mt-auto w-full uppercase lg:!mt-8"
            size="large"
            disabled={isRecruiter === profile?.is_recruiter}
            loading={loading}
            onClick={handleSubmit}
          >
            Save changes
          </Button>
        </div>
      }
    />
  );
};

const Radio: React.FC<{ checked: boolean; label: string }> = ({
  checked,
  label,
}) => {
  return (
    <div className="flex h-6 w-6 items-center justify-center rounded-full bg-indigoGray-10">
      <div
        className={`h-[14.86px] w-[14.86px] rounded-full ${
          checked ? 'bg-indigoGray-90' : 'bg-transparent'
        }`}
      />
      <div className="sr-only">
        <label htmlFor={label} />
        <input id={label} type="checkbox" checked={checked} />
      </div>
    </div>
  );
};

export default EthAddressPage;
