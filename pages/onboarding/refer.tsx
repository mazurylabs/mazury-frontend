import { userSlice } from '@/selectors';
import { Avatar, Button, InfoBox, Input, OnboardingLayout } from 'components';
import { OnboardingContext } from 'contexts';
import { useDebounce, useProfileSearch, useReferrals } from 'hooks';
import { NextPage } from 'next';
import { useRouter } from 'next/router';
import { FC, useContext, useState } from 'react';
import { useSelector } from 'react-redux';
import {
  getMonthAndYear,
  getSkillsFromProfile,
  getSkillSlugsFromReferral,
  returnTruncatedIfEthAddress,
} from 'utils';

interface PersonProps {
  date?: string;
  avatarSrc: string;
  username: string;
  role: string;
  onReferClick: () => void;
  showDate?: boolean;
}

const Person: FC<PersonProps> = ({
  date,
  avatarSrc,
  username,
  role,
  onReferClick,
  showDate = true,
}) => {
  return (
    <div className="flex items-center">
      <Avatar src={avatarSrc} width="56px" height="56px" />

      <div className="ml-4 flex flex-col">
        {showDate && (
          <span className="text-xs font-medium text-teal-500">{date}</span>
        )}
        <span className="font-serif text-xl font-bold text-indigoGray-90">
          {returnTruncatedIfEthAddress(username)}
        </span>
        <span className="mt-1 text-xs font-medium text-indigoGray-50">
          {role}
        </span>
      </div>

      <Button
        onClick={onReferClick}
        variant="secondary"
        className="ml-auto h-fit"
      >
        REFER
      </Button>
    </div>
  );
};

const ReferPage: NextPage = () => {
  const router = useRouter();
  const { address } = useSelector(userSlice);
  const { referrals } = useReferrals(address as string);
  const { setReferralReceiver } = useContext(OnboardingContext);
  const [searchQuery, setSearchQuery] = useState('');
  const debouncedQuery = useDebounce(searchQuery);
  const { profiles } = useProfileSearch(0, [], [], [], debouncedQuery, false);

  const showSearchResults = !!searchQuery;

  return (
    <OnboardingLayout
      firstHeading="Role"
      secondHeading="Time to refer!"
      bottomButtonText="SKIP"
    >
      <div className="mt-3 flex flex-col">
        <InfoBox>
          This is a big thing on Mazury. Referrals make your profile pop and
          make sure you get credit for your reputation on web3.
        </InfoBox>

        <Input
          className="mt-6"
          placeholder="Search for a user"
          value={searchQuery}
          onChange={setSearchQuery}
        />

        {!showSearchResults && referrals && referrals.length > 0 && (
          <>
            <span className="mt-6 text-sm font-medium uppercase text-indigoGray-40">
              People that referred you
            </span>

            <div className="mt-2 flex flex-col gap-4">
              {referrals.map((referral) => {
                const skillSlugs = getSkillSlugsFromReferral(referral);

                return (
                  <Person
                    avatarSrc={referral.author.avatar}
                    date={getMonthAndYear(new Date(referral.created_at))}
                    username={referral.author.username}
                    role={skillSlugs ? skillSlugs[0] : 'No role'}
                    key={referral.id}
                    onReferClick={() => {
                      setReferralReceiver?.(referral.author);
                      router.push('/onboarding/write');
                    }}
                  />
                );
              })}
            </div>
          </>
        )}

        {showSearchResults && (
          <>
            <span className="mt-6 text-sm font-medium uppercase text-indigoGray-40">
              Search results
            </span>

            <div className="mt-2 flex flex-col gap-4">
              {!profiles ||
                (profiles.length === 0 && (
                  <span className="mt-8 text-center text-base font-medium text-indigoGray-80">
                    No users found. Try searching for someone else.
                  </span>
                ))}
              {profiles?.map((profile) => {
                const skillSlugs = getSkillsFromProfile(profile);

                return (
                  <Person
                    avatarSrc={profile.avatar}
                    username={profile.username}
                    role={skillSlugs ? skillSlugs[0] : 'No role'}
                    key={profile.id}
                    onReferClick={() => {
                      setReferralReceiver?.({
                        eth_address: profile.eth_address,
                        username: profile.username,
                        avatar: profile.avatar,
                        ens_name: profile.ens_name,
                      });
                      router.push('/onboarding/write');
                    }}
                    showDate={false}
                  />
                );
              })}
            </div>
          </>
        )}
      </div>
    </OnboardingLayout>
  );
};

export default ReferPage;
