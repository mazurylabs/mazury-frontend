import * as React from 'react';
import SVG from 'react-inlinesvg';
import clsx from 'clsx';

import { Profile } from 'types';
import { useMutualFollowers } from 'hooks';
import { returnTruncatedIfEthAddress } from 'utils';

import { ProfileTag } from './ProfileTag';
import { LensFollowers } from './LensFollowers';

interface ProfileSummaryProps {
  user?: Profile;
  profile?: Profile;
  address?: string;
  isOwnProfile: boolean;
  loading?: boolean;
}

export const ProfileSummaryAccordion: React.FC<ProfileSummaryProps> = ({
  profile,
  user,
  isOwnProfile,
}) => {
  const [isToggled, setIsToggled] = React.useState(false);

  const { mutualFollowers, remainingFollowers, lensFollowers } =
    useMutualFollowers(profile?.lens_id as string, user?.lens_id as string);

  return (
    <div className="h-fit w-full space-y-4 rounded-lg bg-indigoGray-5 px-6 py-4 lg:hidden">
      <button
        type="button"
        className="flex w-full items-center justify-between font-sans text-sm font-medium text-indigoGray-50"
        onClick={() => setIsToggled(!isToggled)}
      >
        Profile details
        <SVG
          src="/icons/chevron-down.svg"
          height={24}
          width={24}
          className={clsx(isToggled && 'rotate-180')}
        />
      </button>

      {isToggled && (
        <div className="space-y-4">
          {!isOwnProfile && !!mutualFollowers?.items?.length && (
            <LensFollowers
              remainder={+remainingFollowers}
              mutuals={mutualFollowers.items}
              lensFollowers={lensFollowers}
              className="mb-[19px] hidden lg:block"
            />
          )}

          <div className="space-y-2">
            {profile?.bio && (
              <p className="font-sans text-sm text-indigoGray-90">
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
          </div>

          {profile?.location && (
            <div className="mt-4 flex items-center space-x-2">
              <SVG src="/icons/location.svg" height={16} width={16} />
              <p className="font-sansSemi text-xs font-semibold text-indigoGray-90">
                {profile.location}
              </p>
            </div>
          )}

          <div className="block space-y-2 lg:hidden">
            <div className="flex justify-between">
              <div className="flex items-center space-x-2">
                <SVG src="/icons/browse-wallet.svg" height={16} width={16} />
                <div>
                  <p className="font-sansSemi text-xs font-semibold text-indigoGray-90">
                    {profile?.username}
                  </p>

                  <p
                    className={`font-sans text-xs text-indigoGray-${
                      profile?.ens_name ? '70' : '50'
                    }`}
                  >
                    {returnTruncatedIfEthAddress(
                      profile?.eth_address as string
                    )}
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
                    <p className="font-sansSemi text-xs font-semibold text-indigoGray-90">
                      {profile?.lens_handle}
                    </p>
                  </div>
                </div>

                <div className="flex space-x-2">
                  {isOwnProfile && (
                    <button>
                      <SVG
                        src="/icons/chevron-down.svg"
                        height={24}
                        width={24}
                      />
                    </button>
                  )}
                  <button aria-label="copy to clipboard">
                    <SVG src="/icons/lenster.svg" height={24} width={24} />
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
