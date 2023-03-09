import * as React from 'react';
import { useRouter } from 'next/router';
import SVG from 'react-inlinesvg';
import { motion } from 'framer-motion';
import clsx from 'clsx';
import toast, { Toaster } from 'react-hot-toast';

import { useAnimateOnScroll, useMobile, useMutualFollowers } from 'hooks';

import { Profile } from 'types';
import { Button } from 'components';
import { returnTruncatedIfEthAddress } from 'utils';

import { LensFollowers } from './LensFollowers';
import { ProfileTag } from './ProfileTag';
import { NavItem } from './type';

interface ProfileSummaryProps {
  user?: Profile;
  profile?: Profile;
  address?: string;
  isOwnProfile: boolean;
  loading?: boolean;
  navItems?: NavItem[];
  intersectionRef?: React.MutableRefObject<HTMLDivElement>;
}

const Skeleton: React.FC<{
  intersectionRef?: React.MutableRefObject<HTMLDivElement>;
}> = ({ intersectionRef }) => {
  return (
    <div className="h-fit overflow-hidden rounded-lg bg-white lg:sticky lg:top-10 lg:z-10 lg:mt-10 lg:w-[350px] lg:shrink-0">
      <div className="h-[114px] w-full animate-pulse bg-indigoGray-30" />
      <div className="relative bg-indigoGray-5 px-4 pb-6">
        <div className="relative top-[-26px] mb-[-10px] flex items-center space-x-2">
          <div>
            <div className="animte-pulse h-[100px] w-[100px] rounded-full bg-indigoGray-30" />
          </div>

          <div className="grow space-y-2">
            <div className="h-5 w-[45%] animate-pulse rounded-lg bg-indigoGray-30" />
            <div className="h-3 w-[100%] animate-pulse rounded-lg bg-indigoGray-30" />
          </div>
        </div>
        <div className="space-y-1">
          <div className="h-3 w-[100%] animate-pulse rounded-lg bg-indigoGray-30" />
          <div className="h-3 w-[100%] animate-pulse rounded-lg bg-indigoGray-30" />
          <div className="h-3 w-[100%] animate-pulse rounded-lg bg-indigoGray-30" />
        </div>

        <div className="mt-6 space-y-2">
          <div
            ref={intersectionRef}
            className="h-3 w-[100%] animate-pulse rounded-lg bg-indigoGray-30"
          />
          <div className="h-9 w-[100%] animate-pulse rounded-lg bg-indigoGray-30" />
        </div>

        <div className="mt-6">
          <div className="h-3 w-[100%] animate-pulse rounded-lg bg-indigoGray-30" />
        </div>
      </div>
    </div>
  );
};

export const ProfileSummary = ({
  user,
  profile,
  address,
  isOwnProfile,
  loading,
  intersectionRef,
}: ProfileSummaryProps) => {
  const router = useRouter();
  const isEditPage = router.asPath?.includes('edit');
  const isMobile = useMobile();

  const { avatarHeight, height, fontSize, top, opacity, backgroundColor } =
    useAnimateOnScroll();

  const { mutualFollowers, remainingFollowers, lensFollowers } =
    useMutualFollowers(profile?.lens_id as string, user?.lens_id as string);

  const handleCopy = async (value: string) => {
    await navigator.clipboard.writeText(value);
    toast.success('Copied to clipboard!');
  };

  if (loading) return <Skeleton intersectionRef={intersectionRef} />;

  return (
    <>
      <Toaster />
      <div className="h-fit overflow-hidden rounded-lg bg-white lg:sticky lg:top-10 lg:z-10 lg:mt-10 lg:w-[350px] lg:shrink-0">
        <motion.div
          className={clsx('h-[114px] w-full', 'bg-gradient-3')}
          style={isMobile ? { opacity } : undefined}
        >
          {profile?.banner && (
            <img src={profile?.banner} alt="Banner" className="h-full w-full" />
          )}
        </motion.div>

        <div className="relative px-4 lg:bg-indigoGray-5 lg:pb-6">
          <motion.div
            className="relative top-[-26px] mb-[-16px] flex items-center space-x-4 lg:mb-[-10px]"
            style={isMobile ? { top, height, backgroundColor } : undefined}
          >
            <div>
              <motion.img
                src={profile?.avatar || '/icons/no-avatar.svg'}
                alt="Profile"
                className="h-[100px] w-[100px] rounded-full object-cover"
                style={
                  isMobile
                    ? { height: avatarHeight, width: avatarHeight }
                    : undefined
                }
              />
            </div>

            <div>
              {profile?.full_name && (
                <motion.h1
                  className="font-demi text-2xl !font-bold text-indigoGray-90"
                  style={{ fontSize }}
                >
                  {profile?.full_name}
                </motion.h1>
              )}

              {profile?.username && (
                <p
                  className={clsx(
                    'font-sans text-xs text-indigoGray-50',
                    !profile.full_name &&
                      'font-demi text-2xl !font-bold text-indigoGray-90'
                  )}
                >
                  @{profile?.username}
                </p>
              )}
            </div>
          </motion.div>

          <div>
            {!isOwnProfile && !!mutualFollowers?.items?.length && (
              <LensFollowers
                remainder={+remainingFollowers}
                mutuals={mutualFollowers.items}
                lensFollowers={lensFollowers}
                className="mb-[19px] hidden lg:block"
              />
            )}

            {profile?.title && (
              <p className="mb-2 hidden font-sans text-sm font-semibold text-indigoGray-90 lg:block">
                {profile.title}
              </p>
            )}

            {profile?.bio && (
              <p className="hidden font-sans text-sm text-indigoGray-90 lg:block">
                {profile.bio}
              </p>
            )}

            {!isOwnProfile &&
              (profile?.is_recruiter || profile?.open_to_opportunities) && (
                <div className="mt-2 hidden space-y-2 lg:block">
                  {profile?.is_recruiter && (
                    <ProfileTag
                      icon="/icons/user-white.svg"
                      title="Recruiter"
                      className="bg-indigoGray-90"
                    />
                  )}
                  {profile?.open_to_opportunities && (
                    <ProfileTag
                      icon="/icons/openToOpportunities.svg"
                      title="Open to opportunities"
                      className="bg-indigoGray-90"
                    />
                  )}
                  <ProfileTag
                    icon="/icons/mazuryTalent.svg"
                    title="Mazury Talent"
                    className="bg-emerald-600"
                  />
                </div>
              )}

            {profile?.location && (
              <div className="mt-4 flex items-center space-x-2">
                <SVG src="/icons/location.svg" height={16} width={16} />
                <p className="font-sansSemi text-xs font-semibold text-indigoGray-90">
                  {profile.location}
                </p>
              </div>
            )}
          </div>

          <div
            ref={intersectionRef}
            className="mb-6 mt-3 flex space-x-2 lg:mt-[6px] lg:mt-4"
          >
            <Button
              variant={
                !isOwnProfile && !user?.is_recruiter ? 'tertiary' : 'primary'
              }
              onClick={() =>
                isOwnProfile
                  ? router.push(`/people/${address}/edit`)
                  : handleCopy(window.location.href)
              }
              className={`grow ${
                !isOwnProfile && !user?.is_recruiter
                  ? 'border border-[1.5px] !border-indigoGray-20 !font-sansSemi !font-semibold'
                  : ''
              }`}
              disabled={isEditPage}
            >
              {!isOwnProfile && (
                <SVG
                  src={`/icons/${user?.is_recruiter ? 'connect' : 'share'}.svg`}
                  height={16}
                  width={16}
                  className="mr-2"
                />
              )}

              {!isOwnProfile && user?.is_recruiter
                ? 'Request contact'
                : isOwnProfile
                ? 'Edit profile'
                : 'Share profile'}
            </Button>

            {(isOwnProfile || user?.is_recruiter) && (
              <Button
                variant="tertiary"
                className="min-w-16 border-[1.5px] border-indigoGray-20"
                onClick={() => handleCopy(window.location.href)}
              >
                <SVG height={16} width={16} src="/icons/share.svg" />
              </Button>
            )}
          </div>

          <div className="hidden space-y-2 lg:block">
            {profile?.eth_address && (
              <ProfileLinks
                url={`https://etherscan.io/address/${profile?.eth_address}`}
                icon="/icons/browse-wallet.svg"
                value={returnTruncatedIfEthAddress(
                  profile?.eth_address as string
                )}
              />
            )}
            {profile?.lens_handle && (
              <ProfileLinks
                url={`https://lenster.xyz/u/${profile?.lens_handle}`}
                icon={'/icons/lens.svg'}
                value={`@${profile?.lens_handle}`}
              />
            )}

            {profile?.twitter && (
              <ProfileLinks
                url={`http://twitter.com/${profile.twitter}`}
                icon="/icons/twitter-black.svg"
                value={`@${profile?.twitter}`}
              />
            )}
            {profile?.github && (
              <ProfileLinks
                url={`https://github.com/${profile.github}`}
                icon="/icons/github-black.svg"
                value={profile?.github}
              />
            )}
          </div>
        </div>
      </div>
    </>
  );
};

const ProfileLinks = ({
  value,
  url,
  icon,
}: {
  value: string;
  url: string;
  icon: string;
}) => {
  return (
    <div className="flex items-center space-x-2 text-indigoGray-90 hover:text-indigoGray-60">
      <SVG src={icon} height={16} width={16} />
      <p className={clsx('font-sans text-xs font-medium text-inherit')}>
        {value}
      </p>
      <a
        target="_blank"
        rel="noreferrer"
        href={url}
        className="flex h-[20px] w-[20px] items-center justify-center rounded-full bg-indigoGray-10 hover:bg-indigoGray-20"
      >
        <SVG
          src="/icons/external-link.svg"
          className="text-indigoGray-90"
          height={12}
          width={12}
        />
      </a>
    </div>
  );
};
