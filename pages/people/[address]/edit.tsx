import * as React from 'react';
import { NextPageContext } from 'next';
import SVG from 'react-inlinesvg';
import { useQueryClient } from '@tanstack/react-query';
import { Toaster, toast } from 'react-hot-toast';
import { useRouter } from 'next/router';

import { Button, Input, Layout } from 'components';
import { Container, ProfileSummary } from 'views/Profile';
import { useAccount, useMobile } from 'hooks';
import { updateProfile, isValid } from 'utils/api';
import { ValueOf } from 'types';
import { emailRegex, formatProfileRoute } from 'utils';
import { ethers } from 'ethers';

interface EditProps {
  ethAddress: string;
}

interface UserProfile {
  username: string;
  full_name?: string;
  email: string;
  location?: string;
  avatar?: File;
  banner?: File;
  bio?: string;
  title?: string;
}

const Edit = ({ ethAddress }: EditProps) => {
  const isMobile = useMobile(false);
  const router = useRouter();
  const queryClient = useQueryClient();
  const { user, accountInView, isOwnProfile } = useAccount(ethAddress);
  const [loading, setLoading] = React.useState(false);
  const [usernameError, setUsernameError] = React.useState('');
  const [emailError, setEmailError] = React.useState('');
  const [userProfile, setUserProfile] = React.useState<UserProfile>(
    {} as UserProfile
  );

  const address = ethers.utils.isAddress(ethAddress)
    ? ethAddress
    : accountInView?.eth_address || '';

  const avatar = userProfile?.avatar
    ? URL.createObjectURL(userProfile?.avatar as any)
    : '';

  const banner = userProfile?.banner
    ? URL.createObjectURL(userProfile?.banner as any)
    : '';

  const handleChange = (
    name: keyof typeof userProfile,
    value: ValueOf<UserProfile>
  ) => {
    setUserProfile((profile) => {
      return { ...profile, [name]: value };
    });
  };

  const handleFileUpload = (
    event: React.ChangeEvent<HTMLInputElement>,
    name: 'avatar' | 'banner'
  ) => {
    const { files } = event.target;
    if (files && files.length !== 0) {
      handleChange(name, files[0]);
      event.target.value = '';
    }
  };

  const handleBlur = (name: 'email' | 'username') => {
    if (
      !userProfile?.email.toLowerCase().match(emailRegex) &&
      name === 'email'
    ) {
      setEmailError('Email address is invalid');
      return;
    }

    if (!userProfile?.username) {
      setUsernameError('Username is required');
    }
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);
    setUsernameError('');
    setEmailError('');

    const { avatar, banner, ...restOfProfile } = userProfile;

    let payload = {} as UserProfile;
    let isEmailInvalid = false;
    let isUsernameInvalid = false;

    for (let field in restOfProfile) {
      if ((user as any)[field] !== (userProfile as any)[field]) {
        payload = { ...payload, [field]: (userProfile as any)[field] };
      }
    }

    if (payload?.email) {
      const { error: emailError } = await isValid('email', payload?.email);

      if (emailError) {
        isEmailInvalid = true;
        setEmailError('Email address already exist');
      }
    }

    if (payload?.username) {
      const { error: usernameError } = await isValid(
        'username',
        payload?.username
      );

      if (usernameError) {
        isUsernameInvalid = true;
        setUsernameError('Username already exist');
      }
    }

    if (isUsernameInvalid || isEmailInvalid) {
      setLoading(false);
      return;
    }

    const { error, data } = await updateProfile(
      address,
      '',
      payload as any,
      userProfile?.avatar,
      false,
      userProfile?.banner
    );

    setLoading(false);

    if (!error) {
      queryClient.setQueryData(['authenticated-user'], (prev: any) => ({
        ...prev,
        ...data,
      }));
    } else {
      toast.error('Something went wrong');
    }
  };

  React.useEffect(() => {
    if (!isOwnProfile) {
      router.push(`/people/${address}`);
    }
  }, [isOwnProfile]);

  React.useEffect(() => {
    if (user) {
      setUserProfile({
        location: user?.location || '',
        username: user?.username || '',
        full_name: user?.full_name || '',
        email: user?.email || '',
        bio: user?.bio || '',
        title: user?.title || '',
      });
    }
  }, [user]);

  return (
    <Layout variant="plain" showMobileSidebar={false}>
      <Container
        title="Edit profile"
        handleSave={isMobile ? () => {} : undefined}
        summary={
          <ProfileSummary
            address={address}
            profile={accountInView}
            user={user}
            isOwnProfile={isOwnProfile}
          />
        }
      >
        <form onSubmit={handleSubmit}>
          <div className="mb-6 space-y-2">
            <p className="text.sm font-sansMid font-medium text-indigoGray-90">
              Profile picture
            </p>

            <div className="relative h-[238px] overflow-hidden rounded-lg lg:w-[350px]">
              <div className="relative">
                <img
                  src={banner || user?.banner || '/icons/no-banner.svg'}
                  alt="Banner"
                  className="h-[114px] w-full object-cover object-top"
                />
                <ImageButton
                  label={
                    !userProfile.banner ? (
                      'Add picture'
                    ) : (
                      <span className="flex">
                        Replace{' '}
                        <SVG src="/icons/trash.svg" className="ml-6 h-4 w-4" />
                      </span>
                    )
                  }
                  onClick={(event) => handleFileUpload(event, 'banner')}
                  id="banner"
                  className="absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%]"
                />
              </div>
              <div className="h-[124px] bg-indigoGray-5 pl-4"></div>

              <div className="absolute bottom-0 left-4 w-fit">
                <img
                  src={avatar || user?.avatar || '/icons/no-avatar.svg'}
                  alt="Avatar"
                  className="h-[150px] w-[150px] rounded-full object-cover"
                />

                <ImageButton
                  id="avatar"
                  label={
                    !userProfile.avatar ? (
                      'Add picture'
                    ) : (
                      <span className="flex">
                        Replace{' '}
                        <SVG src="/icons/trash.svg" className="ml-6 h-4 w-4" />
                      </span>
                    )
                  }
                  onClick={(event) => handleFileUpload(event, 'avatar')}
                  className="absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%]"
                />
              </div>
            </div>
          </div>

          <div className="space-y-6 lg:w-[500px]">
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
                value={userProfile.username || ''}
                placeholder="Insert username"
                onChange={(value) => {
                  handleChange('username', value);
                }}
                error={!!usernameError}
                onFocus={() => setUsernameError('')}
                onBlur={() => handleBlur('username')}
              />
              {usernameError && (
                <div className="flex items-center space-x-1 pl-2">
                  <SVG src="/icons/error.svg" height={12} width={12} />
                  <p className="font-sans text-xs text-red-500">
                    {usernameError}
                  </p>
                </div>
              )}
            </div>

            <Input
              id="full_name"
              label="Full name"
              value={userProfile.full_name || ''}
              placeholder="Insert full name"
              onChange={(value) => {
                handleChange('full_name', value);
              }}
            />

            <div className="space-y-1">
              <div className="space-y-1">
                <Input
                  id="email"
                  label={
                    <div className="font-sans text-indigoGray-40">
                      E-mail{' '}
                      <span className="font-sans font-normal text-indigoGray-30">
                        (Required)
                      </span>
                    </div>
                  }
                  value={userProfile.email || ''}
                  placeholder="Insert e-mail"
                  onChange={(value) => {
                    handleChange('email', value);
                  }}
                  error={!!emailError}
                  onFocus={() => setEmailError('')}
                  onBlur={() => handleBlur('email')}
                />
                {emailError && (
                  <div className="flex items-center space-x-1 pl-2">
                    <SVG src="/icons/error.svg" height={12} width={12} />
                    <p className="font-sans text-xs text-red-500">
                      {emailError}
                    </p>
                  </div>
                )}
              </div>

              <div className="flex items-center space-x-1 pl-2">
                <SVG
                  src={`/icons/error-warning-line.svg`}
                  height={12}
                  width={12}
                />
                <p className="font-sans text-xs text-indigoGray-40">
                  We will send you a confirmation e-mail
                </p>
              </div>
            </div>

            <div>
              <Input
                id="location"
                label="Location"
                value={userProfile.location || ''}
                placeholder="Insert location"
                onChange={(value) => {
                  handleChange('location', value);
                }}
              />
            </div>

            <div>
              <Input
                id="title"
                label="Job title"
                value={userProfile.title || ''}
                placeholder="Insert job title"
                onChange={(value) => {
                  handleChange('title', value);
                }}
              />
            </div>

            <div className="flex flex-col">
              <label
                className="font-sans text-sm font-normal text-indigoGray-40"
                // htmlFor={id}
              >
                Bio
              </label>
              <textarea
                placeholder="Insert Bio"
                className="resize-none rounded-lg border border-indigoGray-20 px-4 py-3 font-sansMid text-sm font-medium text-indigoGray-90 outline-none placeholder:text-indigoGray-50 hover:border-indigoGray-40 focus:border-indigo-600"
                rows={5}
                maxLength={400}
                value={userProfile.bio || ''}
                onChange={(e) => handleChange('bio', e.target.value)}
                // disabled={!!existingReferral}
              />
            </div>

            <div className="hidden space-x-2 lg:flex">
              <Button
                onClick={router.back}
                className="w-full !border !border-[1.5px] !border-indigoGray-20 !bg-indigoGray-10 !font-sans !font-semibold !text-indigoGray-90 !shadow-base"
                variant="primary"
                type="button"
              >
                Cancel
              </Button>
              <Button
                loading={loading}
                className="w-full !font-sans !font-semibold"
                type="submit"
                disabled={
                  !userProfile.username ||
                  !userProfile.email ||
                  !!emailError ||
                  !!usernameError
                  // (userProfile.username === user.profile?.username &&
                  //   userProfile.email === user.profile?.email)
                }
              >
                Save
              </Button>
            </div>
          </div>
        </form>
        <Toaster />
      </Container>
    </Layout>
  );
};

const ImageButton = ({
  onClick,
  label,
  className,
  id,
}: {
  onClick: (event: React.ChangeEvent<HTMLInputElement>) => void;
  label: string | React.ReactNode;
  className?: string;
  id: string;
}) => {
  return (
    <div>
      <label
        className={`flex cursor-pointer items-center rounded-[40px] bg-[rgb(248,249,252)]/90 px-4 py-2 font-sansMid text-xs font-medium text-indigoGray-90 ${className} min-w-[99px]`}
        htmlFor={id}
      >
        {label}
      </label>

      <input
        id={id}
        accept="image/*"
        type="file"
        onInput={(event) => onClick(event as any)}
        className="sr-only"
        name="avatar"
      />
    </div>
  );
};

export default Edit;

export const getServerSideProps = async (
  context: NextPageContext & { resolvedUrl: string }
) => {
  const address = context.query.address as string;

  const url = context.resolvedUrl || '';

  const { ethAddress, normalisedRoute } = formatProfileRoute(url, address);

  if (!ethers.utils.isAddress(address) && !address.includes('.eth')) {
    return {
      redirect: {
        destination: normalisedRoute,
        permanent: false,
      },
      props: { ethAddress },
    };
  }

  return {
    props: {
      ethAddress,
    },
  };
};
