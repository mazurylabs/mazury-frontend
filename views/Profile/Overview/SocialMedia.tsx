import * as React from 'react';
import SVG from 'react-inlinesvg';
import { Toaster, toast } from 'react-hot-toast';

import { Button, GithubModal, Input, TwitterModal } from 'components';
import { updateProfile } from 'utils/api';
import { useQueryClient } from '@tanstack/react-query';
import { useUser } from '@/providers/react-query-auth';

interface SocialMediaProps {
  address?: string;
}

export const SocialMedia: React.FC<SocialMediaProps> = ({ address }) => {
  const queryClient = useQueryClient();
  const [loading, setLoading] = React.useState(false);
  const [website, setWebsite] = React.useState('');
  const { data: profile } = useUser();

  React.useEffect(() => {
    if (profile?.website) {
      setWebsite(profile?.website);
    }
  }, [profile]);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (address) {
      setLoading(true);

      const formData = {
        website,
      };

      const { error, data } = await updateProfile(address, '', formData);

      setLoading(false);

      if (!error) {
        queryClient.setQueryData(['authenticated-user'], (prev: any) => ({
          ...prev,
          ...data,
        }));
      } else {
        toast.error('Something went wrong');
      }
    }
  };

  return (
    <div>
      <div className="mb-8 space-y-3">
        <p className="font-inter text-xl font-medium text-indigoGray-90">
          Private website
        </p>

        <form
          className="flex items-end space-x-2 lg:w-[489px]"
          onSubmit={handleSubmit}
        >
          <Input
            id="website"
            label="Website"
            value={website || ''}
            placeholder="Insert website"
            className="h-[45px]"
            outerClassName="grow"
            onChange={(value) => setWebsite(value)}
          />

          <Button
            className="h-[45px] min-w-[81px]"
            size="large"
            type="submit"
            loading={loading}
            disabled={profile?.website === website}
          >
            Save
          </Button>
        </form>
      </div>

      <div className="flex max-w-[400px] flex-col space-y-4">
        <TwitterModal
          trigger={
            <button
              type="submit"
              className={`flex h-[45px] grow items-center justify-center space-x-2 rounded-lg shadow-base ${
                !profile?.twitter ? 'bg-[#4A99E9]' : 'bg-indigoGray-10'
              }`}
            >
              <SVG
                height={16}
                width={16}
                src={`/icons/twitter${profile?.twitter ? '-black' : ''}.svg`}
              />
              <span
                className={`font-sansSemi text-sm font-semibold ${
                  !profile?.twitter ? 'text-indigoGray-5' : 'text-indigoGray-90'
                }`}
              >
                {profile?.twitter ? 'Connected to Twitter' : 'Twitter'}
              </span>
            </button>
          }
          handleSubmit={(username) =>
            queryClient.setQueryData(['authenticated-user'], (prev: any) => ({
              ...prev,
              twitter: username,
            }))
          }
          isDisconnecting={!!profile?.twitter}
        />

        <GithubModal
          trigger={
            <button
              type="submit"
              className={`flex h-[45px] grow items-center justify-center space-x-2 rounded-lg shadow-base ${
                !profile?.github ? 'bg-[#262626]' : 'bg-indigoGray-10'
              }`}
            >
              <SVG
                height={16}
                width={16}
                src={`/icons/github${profile?.github ? '-black' : ''}.svg`}
              />

              <span
                className={`font-sansSemi text-sm font-semibold ${
                  !profile?.github ? 'text-indigoGray-5' : 'text-indigoGray-90'
                }`}
              >
                Github
              </span>
            </button>
          }
          isDisconnecting={!!profile?.github}
          handleSubmit={(username) => {
            queryClient.setQueryData(['authenticated-user'], (prev: any) => ({
              ...prev,
              github: username,
            }));
          }}
        />
      </div>
      <Toaster />
    </div>
  );
};
