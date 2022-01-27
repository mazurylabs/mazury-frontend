import { NextPage, NextPageContext } from 'next';
import Link from 'next/link';
import React from 'react';
import { SWRConfig } from 'swr';
import { Button, Avatar, NavButton } from '../../components';
import { BlueOutlineButton } from '../../components/Button';
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
import Head from 'next/head'

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
  'Blog posts',
  'DAOs',
];

const sectionToColor: { [key in ProfileSection]: ColorName } = {
  Activity: 'purple',
  Badges: 'pink',
  Referrals: 'green',
  'Blog posts': 'brown',
  DAOs: 'lemon',
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
  // we still make use of SWR on the client. This will use fallback data in the beginning but will re-fetch if needed.
  const { profile, error } = useProfile(address);
  const [activeSection, setActiveSection] =
    React.useState<ProfileSection>('Activity');

  return (
    <>
      <Head>
        <title>{profile.username} | Mazury</title>
      </Head>
      <div>
        <div className='flex gap-8 py-4 px-24 items-center'>
          <Button>&lt;</Button>
          <p className='font-demi'>{profile.username}</p>
        </div>

        <div
          className='flex gap-8 px-8 rounded-lg py-6 items-center'
          style={{
            background:
              'linear-gradient(72.37deg, rgba(97, 191, 243, 0.2) 18.05%, rgba(244, 208, 208, 0.128) 83.63%), radial-gradient(58.61% 584.5% at 57.29% 41.39%, rgba(233, 209, 204, 0.9) 0%, rgba(236, 219, 212, 0.468) 100%);',
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
            <BlueOutlineButton
              onClick={() => goToLink(`https://twitter.com/${profile.twitter}`)}
            >
              <FaTwitter /> {profile.twitter}
            </BlueOutlineButton>
          )}
          {profile.website && (
            <BlueOutlineButton onClick={() => goToLink(profile.website)}>
              <FaGlobe /> {profile.website}
            </BlueOutlineButton>
          )}
          {profile.github && (
            <BlueOutlineButton
              onClick={() => goToLink(`https://github.com/${profile.twitter}`)}
            >
              <FaGithub /> {profile.github}
            </BlueOutlineButton>
          )}
        </div>

        <hr className='mt-8' />

        <div className='flex py-10 px-24 gap-12'>
          <div className='flex flex-col gap-4 justify-start w-2/12'>
            {profileSections.map((sectionName) => (
              <NavButton
                key={sectionName}
                label={sectionName}
                active={sectionName === activeSection}
                color={sectionToColor[sectionName]}
                onClick={() => setActiveSection(sectionName)}
              />
            ))}
          </div>

          <div className='flex flex-col w-10/12'>
            <h3 className='text-3xl font-bold font-serif'>Activity</h3>
            <div className='mt-4 flex flex-col gap-8'>
              <div className='flex gap-8'>
                <Avatar src='/blue-ph.png' width='80px' height='80px' />
                <div className='flex flex-col justify-center'>
                  <p className='text-sm'>Event</p>
                  <p>
                    Getting seen in web3 with Alec.eth (head of talent @
                    ConsenSys mesh, building peepledao) — mazury community call
                    #1
                  </p>
                </div>
              </div>

              <div className='flex gap-8'>
                <Avatar src='/blue-ph.png' width='80px' height='80px' />
                <div className='flex flex-col justify-center'>
                  <p className='text-sm'>Vote</p>
                  <p>Partnership & Mutual Grant with Gitcoin</p>
                </div>
              </div>
            </div>

            <div className='flex gap-12 w-full'>
              <div className='w-1/2'>
                <h3 className='mt-8 text-lg font-bold'>Recent badges</h3>
                <div className='flex mt-4 gap-8'>
                  <div className='flex flex-col'>
                    <Avatar src='/yellow-ph.png' borderRadius='7px' />
                    <p className='font-bold text-xl mt-2'>Web3 on wheels</p>
                    <p className='text-sm'>Moon school</p>
                  </div>

                  <div className='flex flex-col'>
                    <Avatar src='/yellow-ph.png' borderRadius='7px' />
                    <p className='font-bold text-xl mt-2'>Web3 on wheels</p>
                    <p className='text-sm'>Moon school</p>
                  </div>
                </div>
              </div>

              <div className='w-1/2'>
                <h3 className='mt-8 text-lg font-bold'>Recent POAPs</h3>
                <div className='flex mt-4 gap-8'>
                  <Avatar src='/blue-ph.png' />
                  <Avatar src='/blue-ph.png' />
                </div>
              </div>
            </div>

            <hr className='my-8' />

            <div>
              <h2 className='text-3xl font-bold'>Badges</h2>
              <div className='flex gap-8 mt-4'>
                <Link href='#' passHref>
                  <a className='text-xl font-bold'>Mazury badges</a>
                </Link>
                <Link href='#' passHref>
                  <a className='text-xl'>Badges</a>
                </Link>
                <Link href='#' passHref>
                  <a className='text-xl'>Badges</a>
                </Link>
                <Link href='#' passHref>
                  <a className='text-xl'>Badges</a>
                </Link>
              </div>

              <div className='w-1/2'>
                <h3 className='mt-8 text-lg font-bold'>Recent badges</h3>
                <div className='flex mt-4 gap-8'>
                  {profile.top_badges?.slice(0, 3).map((badge) => {
                    return (
                      <div key={badge.id} className='flex flex-col'>
                        <Avatar
                          src={badge.badge_type.image}
                          borderRadius='7px'
                        />
                        <p className='font-bold text-xl mt-2'>
                          {badge.badge_type.title}
                        </p>
                        <p className='text-sm'>
                          {badge.badge_type.description}
                        </p>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>

        <hr className='mb-20' />
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
