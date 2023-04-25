import * as React from 'react';
import { NextPageContext } from 'next';
import { ethers } from 'ethers';
import SVG from 'react-inlinesvg';
import { Toaster, toast } from 'react-hot-toast';
import { useRouter } from 'next/router';

import { Layout } from 'components';
import { Container, ProfileSummary, ProfileSummaryMobile } from 'views/Profile';
import { useAccount, useIntersect, useMobile } from 'hooks';

import { Button, GithubModal, Input, TwitterModal } from 'components';
import { updateProfile } from 'utils/api';
import { useQueryClient } from '@tanstack/react-query';
import { useUser } from 'providers/react-query-auth';

interface SocialProps {
  ethAddress: string;
}

const Profile = ({ ethAddress }: SocialProps) => {
  const { user, accountInView, isOwnProfile } = useAccount(ethAddress);
  const isMobile = useMobile();
  const router = useRouter();
  const queryClient = useQueryClient();
  const [loading, setLoading] = React.useState(false);
  const [website, setWebsite] = React.useState('');
  const { data: profile } = useUser();

  const previousSocialMediaRef = React.useRef(false);
  const onSaveRef = React.useRef(false);

  const { ref, entry } = useIntersect({
    rootMargin: '0px',
    enabled: isMobile,
  });

  const address = ethers.utils.isAddress(ethAddress)
    ? ethAddress
    : accountInView?.eth_address || '';

  const navItems = Container.useNavItems({
    ensAddress: ethAddress,
    address,
    activeItem: 'overview',
    profileId: accountInView?.lens_id as string,
  });

  React.useEffect(() => {
    if (profile?.website) {
      setWebsite(profile?.website);
    }
  }, [profile]);

  const handleChange = (value: string) => {
    previousSocialMediaRef.current = true;
    setWebsite(value);
  };

  const handleUpdateProfile = async () => {
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
        onSaveRef.current = true;
      } else {
        toast.error('Something went wrong');
      }
    }
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    handleUpdateProfile();
  };

  return (
    <Layout variant="plain" showMobileSidebar={entry?.isIntersecting}>
      <Container
        title={'Social media'}
        handleGoBack={
          previousSocialMediaRef.current && !onSaveRef.current
            ? router.back
            : undefined
        }
        summary={
          <ProfileSummary
            address={address}
            profile={accountInView}
            user={user}
            isOwnProfile={isOwnProfile}
            loading={!accountInView}
            intersectionRef={ref}
          />
        }
        handleSave={async () => {
          await handleUpdateProfile();
          router.back();
        }}
        isSaving={loading}
        saveWithModal
      >
        <ProfileSummaryMobile
          navItems={navItems}
          isVisible={!entry?.isIntersecting}
          profile={accountInView}
        />
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
                onChange={handleChange}
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
                    src={`/icons/twitter${
                      profile?.twitter ? '-black' : ''
                    }.svg`}
                  />
                  <span
                    className={`font-sansSemi text-sm font-semibold ${
                      !profile?.twitter
                        ? 'text-indigoGray-5'
                        : 'text-indigoGray-90'
                    }`}
                  >
                    {profile?.twitter ? 'Connected to Twitter' : 'Twitter'}
                  </span>
                </button>
              }
              handleSubmit={(username) => {
                queryClient.setQueryData(
                  ['authenticated-user'],
                  (prev: any) => ({
                    ...prev,
                    twitter: username,
                  })
                );
                previousSocialMediaRef.current = true;
                onSaveRef.current = true;
              }}
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
                      !profile?.github
                        ? 'text-indigoGray-5'
                        : 'text-indigoGray-90'
                    }`}
                  >
                    Github
                  </span>
                </button>
              }
              isDisconnecting={!!profile?.github}
              handleSubmit={(username) => {
                queryClient.setQueryData(
                  ['authenticated-user'],
                  (prev: any) => ({
                    ...prev,
                    github: username,
                  })
                );
                previousSocialMediaRef.current = true;
                onSaveRef.current = true;
              }}
              handleConnect={() => {
                previousSocialMediaRef.current = true;
                onSaveRef.current = true;
              }}
            />
          </div>
          <Toaster />
        </div>
      </Container>
    </Layout>
  );
};

export default Profile;

export const getServerSideProps = async (context: NextPageContext) => {
  return {
    props: {
      ethAddress: context.query.address,
    },
  };
};
