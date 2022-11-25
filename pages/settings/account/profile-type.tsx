import { NextPage } from 'next';
import * as React from 'react';
import { useDispatch } from 'react-redux';
import { toast, Toaster } from 'react-hot-toast';

import { Button, Checkbox, SettingsLayout } from 'components';
import { useIsOnboarded, useProtectedRoute } from 'hooks';
import { useSelector } from 'react-redux';
import { userSlice } from '@/selectors';
import { updateProfile } from '@/utils/api';
import { updateUserProfile } from '@/slices/user';

const EthAddressPage: NextPage = () => {
  useProtectedRoute();
  useIsOnboarded();
  const dispatch = useDispatch();
  const { profile } = useSelector(userSlice);
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
      dispatch(updateUserProfile({ is_recruiter: isRecruiter }));
    } else {
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
              <Checkbox
                label={<span className="sr-only">recruiter</span>}
                checked={isRecruiter}
                setChecked={() => {}}
                id={'recruiter'}
                innerClassName="!w-4 !h-4"
                outerClassName="w-4 h-4"
              />
            </button>

            <button
              className="flex w-full items-center justify-between rounded-lg border border-indigoGray-20 p-6"
              onClick={() => setIsRecruiter(false)}
            >
              <span className="font-sansMid text-base font-medium text-indigoGray-90">
                I’m a professional
              </span>
              <Checkbox
                label={<span className="sr-only">professional</span>}
                checked={!isRecruiter}
                setChecked={() => {}}
                id={'professional'}
                innerClassName="!w-4 !h-4"
                outerClassName="w-4 h-4"
              />
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

export default EthAddressPage;
