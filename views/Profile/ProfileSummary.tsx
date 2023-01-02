import * as React from 'react';
import { useRouter } from 'next/router';
import { useSelector } from 'react-redux';
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
import { Button } from 'components';

interface ProfileSummaryProps {
  user?: Profile;
  profile?: Profile;
  address?: string;
  isOwnProfile: boolean;
}

export const ProfileSummary = ({
  user,
  profile,
  address,
  isOwnProfile,
}: ProfileSummaryProps) => {
  const router = useRouter();
  const isEditPage = router.asPath?.includes('edit');

  const { mutualFollowers, remainingFollowers } = useMutualFollowers(
    profile?.lens_id as string,
    user?.lens_id as string
  );

  const lensFollowers = formatNumber(+mutualFollowers?.pageInfo?.totalCount);

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
          {/* {profile.<div></div>} */}

          {profile?.bio && (
            <p className="mb-4 font-sans text-sm text-indigoGray-90">
              {profile.bio}
            </p>
          )}

          {profile?.location && (
            <div className="mt-[2px] flex items-center space-x-2">
              <SVG src="/icons/location.svg" height={16} width={16} />
              <p className="font-sansSemi text-xs font-semibold text-indigoGray-90">
                {profile.location}
              </p>
            </div>
          )}
        </div>

        {!isOwnProfile && (
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

        {isOwnProfile && (
          <div className="mb-6 flex space-x-2">
            <Button
              onClick={() => router.push(`/profile/${address}/edit`)}
              className="grow"
              disabled={isEditPage}
            >
              Edit profile
            </Button>
            <Button
              variant="tertiary"
              className="min-w-16 border-[1.5px] border-indigoGray-20"
            >
              <SVG height={16} width={16} src="/icons/share.svg" />
            </Button>
          </div>
        )}

        <div className="mb-6 space-y-2">
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
              <button>
                <SVG src="/icons/chevron-down.svg" height={24} width={24} />
              </button>
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
                <button>
                  <SVG src="/icons/chevron-down.svg" height={24} width={24} />
                </button>
                <button aria-label="copy to clipboard">
                  <SVG src="/icons/lenster.svg" height={24} width={24} />
                </button>
              </div>
            </div>
          )}
        </div>

        <Button
          variant="tertiary"
          className="h-[29px] w-full border-[1.5px] border-indigoGray-20"
        >
          <div className="flex items-center space-x-2">
            <SVG height={16} width={16} src="/icons/plus.svg" />
            <span className="font-sansMid text-sm font-medium text-indigoGray-90">
              Add links
            </span>
          </div>
        </Button>
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
