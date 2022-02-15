import { NextPage, NextPageContext } from 'next';
import React, { useRef } from 'react';
import { SWRConfig } from 'swr';
import {
  Button,
  Pill,
  ActivityPreview,
  BadgePreview,
  HR,
  GMPost,
  MirrorPost,
  Layout,
} from '../../components';
import { OutlineButton } from '../../components/Button';
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
import {
  useBadges,
  useReferrals,
  useScrollPosition,
  useTotalBadgeCounts,
  useProfile,
} from '../../hooks';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { LoadMoreButton } from '../../components/Pill';
import { motion } from 'framer-motion';
import { Sidebar } from '../../components/Sidebar';

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
  const { totalBadgeCounts, error: badgeCountsError } = useTotalBadgeCounts();
  const scrollPos = useScrollPosition();
  const shouldCollapseHeader = scrollPos && scrollPos > 0;
  const [activeSection, setActiveSection] =
    React.useState<ProfileSection>('Activity');

  const activityRef = useRef<HTMLHeadingElement>(null);
  const badgesRef = useRef<HTMLHeadingElement>(null);
  const referralsRef = useRef<HTMLHeadingElement>(null);
  const writingRef = useRef<HTMLHeadingElement>(null);

  const handleSectionClick = (section: ProfileSection) => {
    setActiveSection(section);
    let ref;
    switch (section) {
      case 'Activity':
        ref = activityRef;
        break;
      case 'Badges':
        ref = badgesRef;
        break;
      case 'Referrals':
        ref = referralsRef;
        break;
      case 'Writing':
        ref = writingRef;
        break;
      case 'DAOs':
        ref = writingRef;
        break;
      default:
        ref = activityRef;
    }
    if (ref && ref.current) {
      ref.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      <Head>
        <title>{profile.username} | Mazury</title>
      </Head>
      <Layout
        sidebarContent={<Sidebar />}
        headerContent={
          <div className={`sticky top-0 left-0 bg-white z-10`}>
            <div className="hidden md:flex gap-8 py-4 px-24 items-center">
              <Image
                onClick={() => router.back()}
                className="hover:cursor-pointer"
                src="/icons/back.svg"
                alt="Back"
                width={16}
                height={16}
              />
              <p className="font-demi">{profile.username}</p>
            </div>

            <div
              className="flex gap-8 px-8 py-4 md:py-6 rounded-none md:rounded-2xl items-center bg-white transition duration-1000 ease-in-out w-full"
              style={{
                background:
                  'linear-gradient(72.37deg, rgba(97, 191, 243, 0.2) 18.05%, rgba(244, 208, 208, 0.128) 83.63%), radial-gradient(58.61% 584.5% at 57.29% 41.39%, rgba(233, 209, 204, 0.9) 0%, rgba(236, 219, 212, 0.468) 100%)',
              }}
            >
              <div className="flex flex-col gap-4 lg:gap-8">
                <div className="flex flex-col gap-2">
                  <div className="flex md:hidden gap-4">
                    <Image
                      onClick={() => router.back()}
                      className="hover:cursor-pointer"
                      src="/icons/back.svg"
                      alt="Back"
                      width={16}
                      height={16}
                    />
                    <p className="font-demi">{profile.username}</p>
                  </div>
                  <div className="flex gap-6 items-center">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <motion.img
                      animate={{
                        width: shouldCollapseHeader ? '48px' : '100px',
                        height: shouldCollapseHeader ? '48px' : '100px',
                      }}
                      initial={{
                        width: shouldCollapseHeader ? '48px' : '100px',
                        height: shouldCollapseHeader ? '48px' : '100px',
                      }}
                      src={profile.avatar}
                      alt={`${profile.username}'s avatar`}
                      className="rounded-full"
                    />
                    <div className="flex flex-col">
                      <div className="flex gap-4 items-baseline">
                        <motion.h1
                          animate={{
                            fontSize: shouldCollapseHeader ? '24px' : '48px',
                          }}
                          className={`font-demi text-indigoGray-90 overflow-x-scroll md:overflow-auto no-scrollbar`}
                        >
                          {profile.username}
                        </motion.h1>
                        <h3
                          className={`hidden md:inline-block text-indigoGray-40 ${
                            shouldCollapseHeader ? 'text-sm' : 'text-lg'
                          }`}
                        >
                          Michael Scott
                        </h3>
                      </div>

                      <h3
                        className={`md:hidden text-indigoGray-40 ${
                          shouldCollapseHeader ? 'text-sm' : 'text-lg'
                        }`}
                      >
                        Michael Scott
                      </h3>

                      <p
                        className={`text-indigoGray-70 md:block ${
                          shouldCollapseHeader ? 'text-sm hidden' : 'text-base'
                        }`}
                      >
                        {profile.ens_name && `${profile.ens_name} `}
                        <span className="text-indigoGray-40">
                          ({getTruncatedAddress(profile.eth_address, 3)})
                        </span>
                      </p>
                    </div>
                  </div>
                </div>

                <p
                  className={`text-indigoGray-70 md:block ${
                    shouldCollapseHeader && 'hidden'
                  }`}
                >
                  {profile.bio}
                </p>

                <div
                  className={`flex gap-6 overflow-x-scroll md:overflow-auto w-full no-scrollbar ${
                    shouldCollapseHeader && 'hidden md:flex'
                  }`}
                >
                  {/* @ts-expect-error any element of type 'Role' is also a 'string' */}
                  {Object.keys(roleFieldToLabel).map((role: Role) => {
                    if (profile[role] === true) {
                      return (
                        <Button
                          key={role}
                          className="bg-white font-bold text-sm text-indigoGray-90"
                        >
                          {roleFieldToLabel[role]}
                        </Button>
                      );
                    }
                  })}
                </div>

                <div
                  className={`lg:hidden flex gap-4 ${
                    shouldCollapseHeader && 'hidden'
                  }`}
                >
                  <div className="flex gap-1 items-baseline">
                    <span className="text-xs font-bold text-indigoGray-50">
                      {referrals?.length || '-'}
                    </span>
                    <span className="text-xs font-medium uppercase text-indigoGray-40">
                      Referrals
                    </span>
                  </div>

                  <div className="flex gap-1 items-baseline">
                    <span className="text-xs font-bold text-indigoGray-50">
                      {badges?.length || '-'}
                    </span>
                    <span className="text-xs font-medium uppercase text-indigoGray-40">
                      Badges
                    </span>
                  </div>

                  <div className="flex gap-1 items-baseline">
                    <span className="text-xs font-bold text-indigoGray-50">
                      23
                    </span>
                    <span className="text-xs font-medium uppercase text-indigoGray-40">
                      Posts
                    </span>
                  </div>
                </div>
              </div>

              <div className="ml-auto hidden lg:flex gap-16 pr-24">
                <div className="flex flex-col items-center gap-0">
                  <div className="font-serif font-bold text-4xl">
                    {referrals?.length || '-'}
                  </div>
                  <div className="text-sm uppercase text-indigoGray-60 opacity-60">
                    Referrals
                  </div>
                </div>
                <div className="flex flex-col items-center gap-0">
                  <div className="font-serif font-bold text-4xl">
                    {badges?.length || '-'}
                  </div>
                  <div className="text-sm uppercase text-indigoGray-60 opacity-60">
                    Badges
                  </div>
                </div>
                <div className="flex flex-col items-center gap-0">
                  <div className="font-serif font-bold text-4xl">23</div>
                  <div className="text-xs uppercase text-indigoGray-60 opacity-60">
                    Posts
                  </div>
                </div>
              </div>
            </div>

            <div
              className={`flex gap-4 mt-4 md:mt-6 px-4 lg:px-24 text-sm font-medium overflow-x-scroll md:overflow-x-auto no-scrollbar ${
                shouldCollapseHeader && 'hidden md:flex'
              }`}
            >
              {profile.twitter && (
                <OutlineButton
                  onClick={() =>
                    goToLink(`https://twitter.com/${profile.twitter}`)
                  }
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
                  onClick={() =>
                    goToLink(`https://github.com/${profile.twitter}`)
                  }
                >
                  <FaGithub /> {profile.github}
                </OutlineButton>
              )}
            </div>

            <hr
              className={`${
                shouldCollapseHeader && 'mt-0 md:mt-8'
              } mt-4 md:mt-8 mb-0 border-indigoGray-20`}
            />

            <div className="px-4 py-4 md:hidden flex gap-4 font-serif text-lg font-bold overflow-x-scroll no-scrollbar">
              {profileSections.map((item) => (
                <button
                  key={`${item}-mobile-nav`}
                  className={`${
                    activeSection === item
                      ? 'text-indigoGray-90'
                      : 'text-indigoGray-30'
                  }`}
                  onClick={() => handleSectionClick(item)}
                >
                  {item}
                </button>
              ))}
            </div>

            <hr />
          </div>
        }
        innerLeftContent={
          <div className="flex flex-col gap-4 justify-start sticky left-0 h-fit top-[25rem]">
            {profileSections.map((sectionName) => (
              <Pill
                className="w-full xl:w-1/2 mx-auto"
                key={sectionName}
                isNav
                label={sectionName}
                active={sectionName === activeSection}
                color={sectionToColor[sectionName]}
                onClick={() => {
                  handleSectionClick(sectionName);
                }}
              />
            ))}
          </div>
        }
        innerRightContent={
          <>
            <div>
              <h3
                id="activity"
                className="text-3xl font-bold font-serif text-indigoGray-90 hidden md:block"
              >
                Activity
              </h3>
              <div
                ref={activityRef}
                className="mt-0 md:mt-8 flex flex-col gap-6 lg:w-10/12"
              >
                <ActivityPreview
                  activityType="event"
                  thumbnailSrc="/blue-ph.png"
                  label="Getting seen in web3 with Alec.eth (head of talent @ ConsenSys mesh, building peepledao) — mazury community call #1"
                  time="3 days ago"
                />
                <ActivityPreview
                  activityType="referral"
                  thumbnailSrc="/blue-ph.png"
                  label="Mikela wrote a referral for luc"
                  time="3 days ago"
                />
                <ActivityPreview
                  activityType="vote"
                  thumbnailSrc="/blue-ph.png"
                  label="Voted Yes - Create $CODE on P-5: Governance Token Proposal"
                  time="3 days ago"
                />
              </div>
            </div>

            <div>
              <h3 className="text-xl font-bold font-serif mt-12 text-indigoGray-90">
                Recent referrals
              </h3>
              <div className="mt-4 grid grid-cols-1 lg:grid-cols-2 gap-6 xl:w-10/12 w-full">
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
            </div>

            <div>
              <div className="flex flex-col md:flex-row gap-4 md:items-center">
                <h3
                  ref={badgesRef}
                  className="text-3xl font-bold font-serif text-indigoGray-90"
                >
                  Badges
                </h3>
                <div className="flex gap-[24px]">
                  <Pill
                    label="Mazury badges"
                    active
                    color="fuchsia"
                    className="h-fit w-fit md:ml-8"
                  />
                  <Pill label="POAPs" color="fuchsia" className="h-fit w-fit" />
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mt-8">
                {badges?.slice(0, 4).map((badge) => {
                  const { badge_type, id } = badge;
                  const { image, description, title } = badge_type;

                  return (
                    <BadgePreview
                      key={id}
                      description={description}
                      heading={title}
                      imgSrc={image}
                      totalCount={totalBadgeCounts[badge_type.id]}
                    />
                  );
                })}
              </div>

              <div className="lg:w-10/12">
                <LoadMoreButton />
              </div>
              <HR />
            </div>

            <div>
              <div className="flex flex-col md:flex-row gap-4 md:items-center">
                <h3
                  ref={referralsRef}
                  className="text-3xl font-serif font-bold text-indigoGray-90"
                >
                  Referrals
                </h3>
                <div className="flex gap-[24px]">
                  <Pill
                    label="Received"
                    active
                    color="emerald"
                    className="h-fit w-fit md:ml-8"
                  />
                  <Pill label="Given" color="emerald" className="h-fit w-fit" />
                </div>
              </div>

              <div className="mt-8 grid grid-cols-1 lg:grid-cols-2 gap-6 xl:w-10/12 w-full">
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

              <div className="lg:w-10/12">
                <LoadMoreButton />
              </div>
              <HR />
            </div>

            <div>
              <div className="flex flex-col md:flex-row gap-4 md:items-center">
                <h3
                  ref={writingRef}
                  className="text-3xl font-serif font-bold text-indigoGray-90"
                >
                  Writing
                </h3>

                <div className="flex gap-[24px]">
                  <Pill
                    color="amber"
                    label="All posts"
                    className="md:ml-8"
                    active
                  />
                  <Pill color="amber" label="GM" />
                  <Pill color="amber" label="Mirror" />
                </div>
              </div>

              <div className="mt-8 grid grid-cols-1 lg:grid-cols-2 gap-6 xl:w-10/12 w-full">
                <GMPost
                  author={{
                    username: 'mikela.eth',
                    avatarSrc: '/avatar-2.png',
                  }}
                  content="wojtek is one of the smartest and kindest friends i've had the honor to meet. unreserved support for whatever he brings into existence with his big brain. LFG 🌊"
                  upvoteCount={3}
                  commentCount={3}
                  link="https://github.com/dhaiwat10"
                />
                <MirrorPost
                  author={{
                    username: 'mikela.eth',
                    avatarSrc: '/avatar-2.png',
                  }}
                  link="https://github.com/dhaiwat10"
                  bgImageSrc="/post-bg.jpeg"
                  title="Why is the internet so lonely?"
                />
                <GMPost
                  author={{
                    username: 'mikela.eth',
                    avatarSrc: '/avatar-2.png',
                  }}
                  content="wojtek is one of the smartest and kindest friends i've had the honor to meet. unreserved support for whatever he brings into existence with his big brain. LFG 🌊"
                  upvoteCount={3}
                  commentCount={3}
                  link="https://github.com/dhaiwat10"
                />
                <GMPost
                  author={{
                    username: 'mikela.eth',
                    avatarSrc: '/avatar-2.png',
                  }}
                  content="wojtek is one of the smartest and kindest friends i've had the honor to meet. unreserved support for whatever he brings into existence with his big brain. LFG 🌊"
                  upvoteCount={3}
                  commentCount={3}
                  link="https://github.com/dhaiwat10"
                />
                <MirrorPost
                  author={{
                    username: 'mikela.eth',
                    avatarSrc: '/avatar-2.png',
                  }}
                  link="https://github.com/dhaiwat10"
                  bgImageSrc="/post-bg.jpeg"
                  title="Why is the internet so lonely?"
                />
                <GMPost
                  author={{
                    username: 'mikela.eth',
                    avatarSrc: '/avatar-2.png',
                  }}
                  content="wojtek is one of the smartest and kindest friends i've had the honor to meet. unreserved support for whatever he brings into existence with his big brain. LFG 🌊"
                  upvoteCount={3}
                  commentCount={3}
                  link="https://github.com/dhaiwat10"
                />
              </div>

              <div className="lg:w-10/12">
                <LoadMoreButton />
              </div>
            </div>
          </>
        }
      />
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
