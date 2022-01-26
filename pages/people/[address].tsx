import { NextPage, NextPageContext } from 'next';
import Link from 'next/link';
import React from 'react';
import { SWRConfig } from 'swr';
import { Button, Avatar, NavButton } from '../../components';
import { useProfile } from '../../hooks/useProfile';
import { ColorName, Profile as IProfile, ProfileSection } from '../../types';
import { getTruncatedAddress } from '../../utils';
import { getProfile } from '../../utils/api';

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

const Profile: React.FC<Props> = ({ address }) => {
  // we still make use of SWR on the client. This will use fallback data in the beginning but will re-fetch if needed.
  const { profile, error } = useProfile(address);
  const [activeSection, setActiveSection] =
    React.useState<ProfileSection>('Activity');

  return (
    <div>
      <div className='flex gap-8 py-12 px-24 items-center'>
        <Button>&lt;</Button>
        <p>{profile.username}</p>

        <input
          type='text'
          className='ml-auto border-2 w-6/12 p-2 rounded-lg'
          placeholder='Search with love...'
        />
      </div>

      <div className='flex gap-8 pb-12 pt-0 px-24'>
        <Avatar src='/avi.png' />

        <div className='flex flex-col gap-2'>
          <h1 className='font-bold text-4xl'>{profile.username}</h1>
          <p>
            {profile.ens_name || getTruncatedAddress(profile.eth_address, 5)}
          </p>

          <div className='flex gap-6'>
            <Button>@{profile.twitter}</Button>
            <Button>E-mail</Button>
            <Button>Discord</Button>
          </div>
        </div>

        <div className='ml-auto flex gap-16 pr-16'>
          <div className='flex flex-col items-center gap-0'>
            <div className='font-bold text-3xl'>24</div>
            <div className='text-sm'>Referrals</div>
          </div>
          <div className='flex flex-col items-center gap-0'>
            <div className='font-bold text-3xl'>62k</div>
            <div className='text-sm'>Badges</div>
          </div>
          <div className='flex flex-col items-center gap-0'>
            <div className='font-bold text-3xl'>23</div>
            <div className='text-sm'>Posts</div>
          </div>
        </div>
      </div>

      <hr />

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
          <h3 className='text-lg font-bold'>Recent activity</h3>
          <div className='mt-4 flex flex-col gap-8'>
            <div className='flex gap-8'>
              <Avatar src='/blue-ph.png' width='80px' height='80px' />
              <div className='flex flex-col justify-center'>
                <p className='text-sm'>Event</p>
                <p>
                  Getting seen in web3 with Alec.eth (head of talent @ ConsenSys
                  mesh, building peepledao) — mazury community call #1
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
                      <Avatar src={badge.badge_type.image} borderRadius='7px' />
                      <p className='font-bold text-xl mt-2'>
                        {badge.badge_type.title}
                      </p>
                      <p className='text-sm'>{badge.badge_type.description}</p>
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
