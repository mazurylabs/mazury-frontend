import * as React from 'react';
import { useRouter } from 'next/router';
import { useDispatch, useSelector } from 'react-redux';
import Link from 'next/link';
import SVG from 'react-inlinesvg';

import { userSlice } from 'selectors';
import { useMutualFollowers } from 'hooks';
import {
  formatIpfsImage,
  formatNumber,
  plurify,
  returnTruncatedIfEthAddress,
} from 'utils';
import { MutualFollowers, Profile } from 'types';
import { Button, Tags } from 'components';
import { updateUserProfile } from '@/slices/user';

interface ProfileSummaryProps {
  user?: Profile;
  profile?: Profile;
  address?: string;
  isOwnProfile: boolean;
  loading?: boolean;
}

const Skeleton = () => {
  return (
    <div className="sticky top-10 z-10 mt-10 h-fit w-[350px] overflow-hidden rounded-lg bg-white lg:shrink-0">
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
          <div className="h-3 w-[100%] animate-pulse rounded-lg bg-indigoGray-30" />
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
}: ProfileSummaryProps) => {
  const router = useRouter();
  const isEditPage = router.asPath?.includes('edit');

  const { mutualFollowers, remainingFollowers } = useMutualFollowers(
    profile?.lens_id as string,
    user?.lens_id as string
  );

  const lensFollowers = formatNumber(+mutualFollowers?.pageInfo?.totalCount);

  if (loading) return <Skeleton />;

  return (
    <div className="sticky top-10 z-10 mt-10 h-fit w-[350px] overflow-hidden rounded-lg bg-white lg:shrink-0">
      <img
        src={'/icons/no-banner.svg'}
        alt="Banner"
        className="h-[114px] w-full"
      />

      <div className="relative bg-indigoGray-5 px-4 pb-6">
        <div className="relative top-[-26px] mb-[-10px] flex items-center space-x-2">
          <div>
            <img
              src={profile?.avatar || '/icons/no-avatar.svg'}
              alt="Profile"
              className="h-[100px] w-[100px] rounded-full object-cover"
            />
          </div>

          <div>
            <h1 className="font-demi text-2xl !font-bold text-indigoGray-90">
              {profile?.full_name}
            </h1>
            {profile?.username && (
              <p className="font-sans text-xs text-indigoGray-50">
                @{profile?.username}
              </p>
            )}
          </div>
        </div>

        <div>
          {!isOwnProfile && !!mutualFollowers.items?.length && (
            <div className="mb-[19px] hidden space-y-[6px] md:block">
              {!!lensFollowers && (
                <p className="font-indigoGray-50 font-sans text-xs">
                  <span className="font-sansSemi font-semibold text-indigoGray-90">
                    {lensFollowers}
                  </span>{' '}
                  followers on Lens
                </p>
              )}

              <Followers
                remainder={+remainingFollowers}
                mutuals={mutualFollowers.items}
              />
            </div>
          )}

          {profile?.bio && (
            <p className="font-sans text-sm text-indigoGray-90">
              {profile.bio}
            </p>
          )}

          {!isOwnProfile &&
            (profile?.is_recruiter || profile?.open_to_opportunities) && (
              <div className="mt-2 space-y-2">
                {profile?.is_recruiter && (
                  <Tag
                    icon="/icons/user-white.svg"
                    title="Recruiter"
                    className="bg-indigoGray-90"
                  />
                )}
                {profile?.open_to_opportunities && (
                  <Tag
                    icon="/icons/openToOpportunities.svg"
                    title="Open to opportunities"
                    className="bg-indigoGray-90"
                  />
                )}
                <Tag
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

        <div className="mb-6 mt-4 flex space-x-2">
          <Button
            variant={
              !isOwnProfile && !user?.is_recruiter ? 'tertiary' : 'primary'
            }
            onClick={() =>
              isOwnProfile
                ? router.push(`/people/${address}/edit`)
                : console.log('connecting')
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
            >
              <SVG height={16} width={16} src="/icons/share.svg" />
            </Button>
          )}
        </div>

        <div className="space-y-2">
          <div className="flex justify-between">
            <div className="flex items-center space-x-2">
              <SVG src="/icons/browse-wallet.svg" height={16} width={16} />
              <div>
                <p className="font-semi font-sansSemi text-xs text-indigoGray-90">
                  {profile?.username}
                </p>

                <p
                  className={`font-sans text-xs text-indigoGray-${
                    profile?.ens_name ? '70' : '50'
                  }`}
                >
                  {returnTruncatedIfEthAddress(profile?.eth_address as string)}
                </p>
              </div>
            </div>

            <div className="flex space-x-2">
              {isOwnProfile && (
                <button>
                  <SVG src="/icons/chevron-down.svg" height={24} width={24} />
                </button>
              )}
              <button aria-label="copy to clipboard">
                <SVG src="/icons/copy.svg" height={24} width={24} />
              </button>
            </div>
          </div>

          {profile?.lens_handle && (
            <div className="flex items-center justify-between">
              <div className="flex space-x-2">
                <SVG src="/icons/lens.svg" height={16} width={16} />
                <div>
                  <p className="font-semi font-sansSemi text-xs text-indigoGray-90">
                    {profile?.lens_handle}
                  </p>
                </div>
              </div>

              <div className="flex space-x-2">
                {isOwnProfile && (
                  <button>
                    <SVG src="/icons/chevron-down.svg" height={24} width={24} />
                  </button>
                )}
                <button aria-label="copy to clipboard">
                  <SVG src="/icons/lenster.svg" height={24} width={24} />
                </button>
              </div>
            </div>
          )}
        </div>

        {isOwnProfile && (
          <Button
            variant="tertiary"
            className="mt-6 h-[29px] w-full border-[1.5px] border-indigoGray-20"
          >
            <div className="flex items-center space-x-2">
              <SVG height={16} width={16} src="/icons/plus.svg" />
              <span className="font-sansMid text-sm font-medium text-indigoGray-90">
                Add links
              </span>
            </div>
          </Button>
        )}
      </div>
    </div>
  );
};

const Followers = ({
  remainder,
  mutuals,
}: {
  remainder: number;
  mutuals: MutualFollowers['items'];
}) => {
  if (!mutuals || mutuals.length === 0) return null;

  return (
    <div className="flex items-center space-x-[3.5px]">
      <div className="flex space-x-[-6px]">
        {mutuals?.map((follower, index) => {
          return (
            <img
              key={follower.id}
              src={formatIpfsImage(follower.picture.original.url)}
              className={`h-6 w-6 rounded-full`}
              style={{
                zIndex: mutuals.length - index,
              }}
            />
          );
        })}
      </div>

      <p className="font-sansMid text-xs font-medium text-indigoGray-50">
        {mutuals?.map(({ handle, id, ownedBy }) => {
          const noMutuals = id === mutuals[mutuals.length - 1].id;
          return (
            <span key={handle + id}>
              <Link href={`/people/${ownedBy}`}>
                <a className="cursor-pointer">{handle}</a>
              </Link>
              {noMutuals ? '' : `${!!remainder ? ', ' : ' and '}`}
            </span>
          );
        })}
        {!!remainder && ', and ' + remainder + plurify(+remainder, ' other')}
      </p>
    </div>
  );
};

const Tag = ({
  title,
  icon,
  className,
}: {
  title: string;
  icon: string;
  className: string;
}) => {
  return (
    <div
      className={`flex w-fit items-center space-x-2 rounded-md px-2 py-[2px] ${className}`}
    >
      <SVG height={16} width={16} src={icon} />
      <p className="font-sansMid text-xs font-medium text-emerald-50">
        {title}
      </p>
    </div>
  );
};
