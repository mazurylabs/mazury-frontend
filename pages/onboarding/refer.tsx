import { Avatar, Button, InfoBox, Input, OnboardingLayout } from 'components';
import { OnboardingContext } from 'contexts';
import { useReferrals } from 'hooks';
import { NextPage } from 'next';
import { useRouter } from 'next/router';
import { FC, useContext, useRef } from 'react';
import { getMonthAndYear, getSkillSlugsFromReferral } from 'utils';
import { useAccount } from 'wagmi';

interface PersonProps {
  date: string;
  avatarSrc: string;
  username: string;
  role: string;
  onReferClick: () => void;
}

const Person: FC<PersonProps> = ({
  date,
  avatarSrc,
  username,
  role,
  onReferClick,
}) => {
  return (
    <div className="flex items-center">
      <Avatar src={avatarSrc} width="56px" height="56px" />

      <div className="ml-4 flex flex-col">
        <span className="text-xs font-medium text-teal-500">{date}</span>
        <span className="font-serif text-xl font-bold text-indigoGray-90">
          {username}
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
  const [{ data: accountData }] = useAccount();
  const { referrals } = useReferrals(accountData?.address as string);
  const { setReferralReceiver } = useContext(OnboardingContext);

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

        {referrals && referrals.length > 0 && (
          <>
            {/* TODO: Add search icon & implement search */}
            <Input className="mt-6" placeholder="Search for a user" />

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
      </div>
    </OnboardingLayout>
  );
};

export default ReferPage;
