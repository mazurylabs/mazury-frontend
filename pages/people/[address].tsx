import { NextPage, NextPageContext } from 'next';
import React, { useRef } from 'react';
import { SWRConfig } from 'swr';
import {
  Button,
  Avatar,
  NavButton,
  ActivityPreview,
  BadgePreview,
  HR,
} from '../../components';
import { OutlineButton } from '../../components/Button';
import { useProfile } from '../../hooks/useProfile';
import {
  ColorName,
  MappedRoles,
  Profile as IProfile,
  ProfileSection,
  Role,
} from '../../types';
import { getTruncatedAddress, goToLink } from '../../utils';
import { getProfile } from '../../utils/api';
import { FaGithub, FaGlobe, FaTwitter } from 'react-icons/fa';
import Head from 'next/head';
import { ReferralPreview } from '../../components/ReferralPreview';
import { useReferrals } from '../../hooks/useReferrals';
import { useBadges } from '../../hooks/useBadges';
import Image from 'next/image';
import { useRouter } from 'next/router';

interface Props {
  address: string;
  ens?: string;
}

interface PageProps extends Props {
  fallback: IProfile;
}

const profileSections: ProfileSection[] = [
  'Activity',
  'Badges',
  'Referrals',
  'Writing',
  'DAOs',
];

const sectionToColor: { [key in ProfileSection]: ColorName } = {
  Activity: 'indigo',
  Badges: 'fuchsia',
  Referrals: 'emerald',
  Writing: 'amber',
  DAOs: 'purple',
};

const roleFieldToLabel: MappedRoles<string> = {
  role_developer: 'Developer',
  role_designer: 'Designer',
  role_trader: 'Trader',
  role_creator: 'Creator',
  role_researcher: 'Researcher',
  role_investor: 'Investor',
  role_community_manager: 'Community manager',
};

const Profile: React.FC<Props> = ({ address }) => {
  const router = useRouter();
  // we still make use of SWR on the client. This will use fallback data in the beginning but will re-fetch if needed.
  const { profile, error } = useProfile(address);
  const { referrals, error: referralError } = useReferrals(address);
  const { badges, error: badgesError } = useBadges(address);
  const [activeSection, setActiveSection] =
    React.useState<ProfileSection>('Activity');

  const activityRef = useRef<HTMLHeadingElement>(null);
  const badgesRef = useRef<HTMLHeadingElement>(null);
  const referralsRef = useRef<HTMLHeadingElement>(null);
  const writingRef = useRef<HTMLHeadingElement>(null);

  return (
    <>
      <Head>
        <title>{profile.username} | Mazury</title>
      </Head>
      <div>
        <div className='flex gap-8 py-4 px-24 items-center'>
          <Image
            onClick={() => router.back()}
            className='hover:cursor-pointer'
            src='/icons/back.svg'
            alt='Back'
            width={16}
            height={16}
          />
          <p className='font-demi'>{profile.username}</p>
        </div>

        <div
          className='flex gap-8 px-8 rounded-lg py-6 items-center'
          style={{
            background:
              'linear-gradient(72.37deg, rgba(97, 191, 243, 0.2) 18.05%, rgba(244, 208, 208, 0.128) 83.63%), radial-gradient(58.61% 584.5% at 57.29% 41.39%, rgba(233, 209, 204, 0.9) 0%, rgba(236, 219, 212, 0.468) 100%)',
          }}
        >
          <div className='flex flex-col gap-8'>
            <div className='flex gap-6 items-center'>
              <Avatar src={profile.avatar} />
              <div className='flex flex-col'>
                <div className='flex gap-4 items-baseline'>
                  <h1 className='font-demi text-5xl text-indigoGray-90'>
                    {profile.username}
                  </h1>
                  <h3 className='text-indigoGray-40'>Michael Scott</h3>
                </div>

                <p className='text-indigoGray-70'>
                  {profile.ens_name && `${profile.ens_name} `}
                  <span className='text-indigoGray-40'>
                    ({getTruncatedAddress(profile.eth_address, 3)})
                  </span>
                </p>
              </div>
            </div>

            <p className='text-indigoGray-70'>{profile.bio}</p>

            <div className='flex gap-6'>
              {/* @ts-expect-error any element of type 'Role' is also a 'string' */}
              {Object.keys(roleFieldToLabel).map((role: Role) => {
                if (profile[role] === true) {
                  return (
                    <Button key={role} className='bg-white font-bold'>
                      {roleFieldToLabel[role]}
                    </Button>
                  );
                }
              })}
            </div>
          </div>

          <div className='ml-auto flex gap-16 pr-24'>
            <div className='flex flex-col items-center gap-0'>
              <div className='font-serif font-bold text-4xl'>
                {profile.referred_by.length}
              </div>
              <div className='text-sm uppercase text-indigoGray-60 opacity-60'>
                Referrals
              </div>
            </div>
            <div className='flex flex-col items-center gap-0'>
              <div className='font-serif font-bold text-4xl'>62k</div>
              <div className='text-sm uppercase text-indigoGray-60 opacity-60'>
                Badges
              </div>
            </div>
            <div className='flex flex-col items-center gap-0'>
              <div className='font-serif font-bold text-4xl'>23</div>
              <div className='text-sm uppercase text-indigoGray-60 opacity-60'>
                Posts
              </div>
            </div>
          </div>
        </div>

        <div className='flex gap-4 mt-6 px-24'>
          {profile.twitter && (
            <OutlineButton
              onClick={() => goToLink(`https://twitter.com/${profile.twitter}`)}
            >
              <FaTwitter /> {profile.twitter}
            </OutlineButton>
          )}
          {profile.website && (
            <OutlineButton onClick={() => goToLink(profile.website)}>
              <FaGlobe /> {profile.website}
            </OutlineButton>
          )}
          {profile.github && (
            <OutlineButton
              onClick={() => goToLink(`https://github.com/${profile.twitter}`)}
            >
              <FaGithub /> {profile.github}
            </OutlineButton>
          )}
        </div>

        <hr className='mt-8' />

        <div className='flex py-10 px-24 gap-12'>
          <div className='flex flex-col gap-4 justify-start w-2/12 sticky top-12 left-0 h-fit'>
            {profileSections.map((sectionName) => (
              <NavButton
                key={sectionName}
                label={sectionName}
                active={sectionName === activeSection}
                color={sectionToColor[sectionName]}
                onClick={() => {
                  let currRef;
                  switch (sectionName) {
                    case 'Activity':
                      currRef = activityRef;
                      break;
                    case 'Badges':
                      currRef = badgesRef;
                      break;
                    case 'Referrals':
                      currRef = referralsRef;
                      break;
                    case 'Writing':
                      currRef = writingRef;
                      break;
                    case 'DAOs':
                      currRef = writingRef;
                      break;
                    default:
                      break;
                  }
                  window.scrollTo({
                    top: currRef?.current?.offsetTop,
                    behavior: 'smooth',
                  });
                  setActiveSection(sectionName);
                }}
              />
            ))}
          </div>

          <div className='flex flex-col w-10/12'>
            <h3
              ref={activityRef}
              id='activity'
              className='text-3xl font-bold font-serif text-indigoGray-90'
            >
              Activity
            </h3>
            <div className='mt-8 flex flex-col gap-6 w-10/12'>
              <ActivityPreview
                activityType='event'
                thumbnailSrc='/blue-ph.png'
                label='Getting seen in web3 with Alec.eth (head of talent @ ConsenSys mesh, building peepledao) — mazury community call #1'
                time='3 days ago'
              />
              <ActivityPreview
                activityType='referral'
                thumbnailSrc='/blue-ph.png'
                label='Mikela wrote a referral for luc'
                time='3 days ago'
              />
              <ActivityPreview
                activityType='vote'
                thumbnailSrc='/blue-ph.png'
                label='Voted Yes - Create $CODE on P-5: Governance Token Proposal'
                time='3 days ago'
              />
            </div>

            <h3 className='text-xl font-bold font-serif mt-12 text-indigoGray-90'>
              Recent referrals
            </h3>
            <div className='mt-8 grid grid-cols-2 gap-6 w-10/12'>
              {referrals?.slice(0, 2).map((referral) => {
                return (
                  <ReferralPreview
                    key={referral.id}
                    referredBy={{
                      username: referral.author.username,
                      avatarSrc: referral.author.avatar,
                    }}
                    text={referral.content}
                    skills={['community', 'frontendDev']}
                  />
                );
              })}
            </div>

            <HR />

            <div>
              <h3
                ref={badgesRef}
                className='text-3xl font-bold font-serif text-indigoGray-90'
              >
                Badges
              </h3>
              <div className='grid grid-cols-2 gap-12 mt-8'>
                {badges?.map((badge) => {
                  const { badge_type, id } = badge;
                  const { image, description, title } = badge_type;

                  return (
                    <BadgePreview
                      key={id}
                      description={description}
                      heading={title}
                      imgSrc={image}
                      totalCount={100}
                    />
                  );
                })}
              </div>
            </div>

            <HR />

            <div>
              <h3
                ref={referralsRef}
                className='text-3xl font-serif font-bold text-indigoGray-90'
              >
                Referrals
              </h3>
              <div className='mt-8 grid grid-cols-2 gap-6 w-10/12'>
                {referrals?.slice(0, 4).map((referral) => {
                  return (
                    <ReferralPreview
                      key={referral.id}
                      referredBy={{
                        username: referral.author.username,
                        avatarSrc: referral.author.avatar,
                      }}
                      text={referral.content}
                      skills={['community', 'frontendDev']}
                    />
                  );
                })}
              </div>
            </div>

            <HR />

            <div>
              <h3
                ref={writingRef}
                className='text-3xl font-serif font-bold text-indigoGray-90'
              >
                Writing
              </h3>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

const Page: NextPage<PageProps> = ({ fallback, address }) => {
  return (
    <SWRConfig value={{ fallback }}>
      <Profile address={address} />
    </SWRConfig>
  );
};

export default Page;

export const getServerSideProps = async (context: NextPageContext) => {
  const { address } = context.query;
  const profile = await getProfile(address as string);
  return {
    props: {
      address: context.query.address,
      // we pass a fallback to SWR so that it always has something to render and not show a loading indicator
      fallback: {
        [`/profiles/${address}`]: profile,
      },
    },
  };
};
