import { NextPage, NextPageContext } from 'next';
import React, { useEffect, useRef, useState } from 'react';
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
  Sidebar,
  ReferralPreview,
  BlueSocialButton,
} from 'components';
import {
  ColorName,
  MappedRoles,
  Profile as IProfile,
  ProfileSection,
  Role,
} from 'types';
import { getTruncatedAddress, goToLink, toCapitalizedWord } from 'utils';
import { getProfile } from 'utils/api';
import { FaGithub, FaGlobe, FaTwitter } from 'react-icons/fa';
import Head from 'next/head';
import {
  useBadges,
  useReferrals,
  useScrollPosition,
  useTotalBadgeCounts,
  useProfile,
  useActiveProfileSection,
  useMobile,
  useActivity,
} from 'hooks';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { motion } from 'framer-motion';

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
  // TODO: Integrate this into the markup once the design and the API have agreed on the types.
  // const { activity, error: activityError } = useActivity(address);
  const { referrals, error: referralError } = useReferrals(address);
  const { referrals: authoredReferrals, error: authoredReferralsError } =
    useReferrals(address, true);
  const { badges, error: badgesError } = useBadges(address);
  const { totalBadgeCounts, error: badgeCountsError } = useTotalBadgeCounts();
  const scrollPos = useScrollPosition();
  const shouldCollapseHeader = scrollPos && scrollPos > 0;
  const [activeSection, setActiveSection] =
    React.useState<ProfileSection>('Activity');

  const [badgesExpanded, setBadgesExpanded] = useState(false);
  const [referralsExpanded, setReferralsExpanded] = useState(false);
  const [referralsToggle, setReferralsToggle] = useState<'received' | 'given'>(
    'received'
  );

  const referralsToShow =
    referralsToggle === 'received' ? referrals : authoredReferrals;

  const activityRef = useRef<HTMLHeadingElement>(null);
  const altActivityRef = useRef<HTMLDivElement>(null);
  const badgesRef = useRef<HTMLHeadingElement>(null);
  const referralsRef = useRef<HTMLHeadingElement>(null);
  const writingRef = useRef<HTMLHeadingElement>(null);
  const headerRef = useRef<HTMLHRElement>(null);

  const currActiveSection = useActiveProfileSection();
  const isMobile = useMobile();

  const hasAnySocial = profile.github || profile.website || profile.twitter;

  const handleSectionClick = (section: ProfileSection) => {
    setActiveSection(section);
    let ref;
    switch (section) {
      case 'Activity':
        ref = activityRef || altActivityRef;
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
      let offsetTop = 390;
      offsetTop = isMobile
        ? scrollPos! < 10
          ? offsetTop + 60
          : offsetTop - 200
        : offsetTop;
      window?.scrollTo({
        top: ref.current.offsetTop - offsetTop,
        behavior: 'smooth',
      });
    }
  };

  useEffect(() => {
    if (currActiveSection) {
      setActiveSection(toCapitalizedWord(currActiveSection) as ProfileSection);
    }
  }, [currActiveSection]);

  return (
    <>
      <Head>
        <title>{profile.username} | Mazury</title>
      </Head>
      <Layout
        sidebarContent={<Sidebar />}
        headerContent={
          <div className="sticky top-0 left-0 z-10 bg-white">
            <div className="hidden items-center gap-4 py-4 px-[39.5px] md:flex">
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
              className="flex w-full items-center gap-8 rounded-none bg-white px-[39.5px] py-6 transition duration-1000 ease-in-out md:rounded-2xl md:py-6"
              style={{
                background:
                  'linear-gradient(72.37deg, rgba(97, 191, 243, 0.2) 18.05%, rgba(244, 208, 208, 0.128) 83.63%), radial-gradient(58.61% 584.5% at 57.29% 41.39%, rgba(233, 209, 204, 0.9) 0%, rgba(236, 219, 212, 0.468) 100%)',
              }}
            >
              <div className="flex flex-col gap-4 lg:gap-8">
                <div className="flex flex-col gap-2">
                  <div className="flex gap-4 md:hidden">
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
                  <div className="flex items-center gap-6">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <motion.img
                      animate={{
                        width: shouldCollapseHeader ? '56px' : '100px',
                        height: shouldCollapseHeader ? '56px' : '100px',
                      }}
                      initial={{
                        width: shouldCollapseHeader ? '56px' : '100px',
                        height: shouldCollapseHeader ? '56px' : '100px',
                      }}
                      src={profile.avatar}
                      alt={`${profile.username}'s avatar`}
                      className="rounded-full"
                    />
                    <div className="flex flex-col">
                      <div className="flex items-baseline gap-4">
                        <motion.h1
                          animate={{
                            fontSize: shouldCollapseHeader
                              ? '30px'
                              : isMobile && profile.username.length > 8
                              ? '32px'
                              : '48px',
                          }}
                          className={`no-scrollbar overflow-x-scroll font-demi text-indigoGray-90 md:overflow-auto`}
                        >
                          {profile.username.length > 15 && isMobile
                            ? profile.username.slice(0, 10) + '...'
                            : profile.username}
                        </motion.h1>
                        <h3
                          className={`hidden text-indigoGray-40 md:inline-block ${
                            shouldCollapseHeader ? 'text-sm' : 'text-lg'
                          }`}
                        >
                          Michael Scott
                        </h3>
                      </div>

                      <h3
                        className={`text-indigoGray-40 md:hidden ${
                          shouldCollapseHeader ? 'text-sm' : 'text-lg'
                        }`}
                      >
                        Michael Scott
                      </h3>

                      <p
                        className={`text-indigoGray-70 md:block ${
                          shouldCollapseHeader ? 'hidden text-sm' : 'text-base'
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
                  className={`text-indigoGray-70 ${
                    shouldCollapseHeader ? 'hidden' : 'block'
                  }`}
                >
                  {profile.bio}
                </p>

                <div
                  className={`no-scrollbar w-full gap-6 overflow-x-scroll md:overflow-auto ${
                    shouldCollapseHeader ? 'hidden' : 'flex'
                  }`}
                >
                  {/* @ts-expect-error any element of type 'Role' is also a 'string' */}
                  {Object.keys(roleFieldToLabel).map((role: Role) => {
                    if (profile[role] === true) {
                      return (
                        <button
                          key={role}
                          className="rounded bg-white bg-opacity-80 px-4 py-1 text-xs font-bold text-indigoGray-90"
                        >
                          {roleFieldToLabel[role]}
                        </button>
                      );
                    }
                  })}
                </div>

                <div
                  className={`flex gap-4 lg:hidden ${
                    shouldCollapseHeader && 'hidden'
                  }`}
                >
                  <div className="flex items-baseline gap-1">
                    <span className="text-xs font-bold text-indigoGray-50">
                      {referrals?.length || '-'}
                    </span>
                    <span className="text-xs font-medium uppercase text-indigoGray-40">
                      Referrals
                    </span>
                  </div>

                  <div className="flex items-baseline gap-1">
                    <span className="text-xs font-bold text-indigoGray-50">
                      {badges?.length || '-'}
                    </span>
                    <span className="text-xs font-medium uppercase text-indigoGray-40">
                      Badges
                    </span>
                  </div>

                  <div className="flex items-baseline gap-1">
                    <span className="text-xs font-bold text-indigoGray-50">
                      23
                    </span>
                    <span className="text-xs font-medium uppercase text-indigoGray-40">
                      Posts
                    </span>
                  </div>
                </div>
              </div>

              <div className="ml-auto hidden gap-16 pr-24 lg:flex">
                <div className="flex flex-col items-center gap-0">
                  <motion.span
                    style={{ fontSize: shouldCollapseHeader ? '24px' : '36px' }}
                    className="font-serif font-bold"
                  >
                    {referrals?.length || '-'}
                  </motion.span>
                  <div className="text-sm uppercase text-indigoGray-60 opacity-60">
                    Referrals
                  </div>
                </div>
                <div className="flex flex-col items-center gap-0">
                  <motion.span
                    style={{ fontSize: shouldCollapseHeader ? '24px' : '36px' }}
                    className="font-serif font-bold"
                  >
                    {badges?.length || '-'}
                  </motion.span>
                  <div className="text-sm uppercase text-indigoGray-60 opacity-60">
                    Badges
                  </div>
                </div>
                <div className="flex flex-col items-center gap-0">
                  <motion.span
                    style={{ fontSize: shouldCollapseHeader ? '24px' : '36px' }}
                    className="font-serif font-bold"
                  >
                    23
                  </motion.span>
                  <div className="text-xs uppercase text-indigoGray-60 opacity-60">
                    Posts
                  </div>
                </div>
              </div>
            </div>

            <div
              className={`no-scrollbar mt-4 flex gap-4 overflow-x-scroll px-4 text-sm font-medium md:overflow-x-auto lg:px-[39.5px] ${
                shouldCollapseHeader && 'hidden md:flex'
              }`}
            >
              {profile.twitter && (
                <BlueSocialButton
                  variant="secondary"
                  onClick={() =>
                    goToLink(`https://twitter.com/${profile.twitter}`)
                  }
                >
                  <FaTwitter /> {profile.twitter}
                </BlueSocialButton>
              )}
              {profile.website && (
                <BlueSocialButton
                  variant="secondary"
                  onClick={() => goToLink(profile.website)}
                >
                  <FaGlobe /> {profile.website}
                </BlueSocialButton>
              )}
              {profile.github && (
                <BlueSocialButton
                  variant="secondary"
                  onClick={() =>
                    goToLink(`https://github.com/${profile.twitter}`)
                  }
                >
                  <FaGithub /> {profile.github}
                </BlueSocialButton>
              )}
            </div>

            <hr
              className={`${
                shouldCollapseHeader && 'mt-0 md:mt-4'
              } mt-4 mb-0 border-indigoGray-20 md:mt-4`}
            />

            <div className="no-scrollbar flex gap-4 overflow-x-scroll px-4 py-4 font-serif text-lg font-bold md:hidden">
              {profileSections.map((item) => {
                // We have temporarily removed the DAOs section
                if (item === 'DAOs') {
                  return null;
                }
                return (
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
                );
              })}
            </div>

            <hr ref={headerRef} />
          </div>
        }
        innerLeftContent={
          <div
            className={`sticky left-0 ${
              hasAnySocial ? 'top-[16.5rem]' : 'top-[14.5rem]'
            } flex h-fit flex-col justify-start gap-4`}
          >
            {profileSections.map((sectionName) => {
              // We have temporarily removed the DAOs section
              if (sectionName === 'DAOs') {
                return null;
              }
              return (
                <Pill
                  className="mx-auto w-[150px] justify-start"
                  key={sectionName}
                  isNav
                  label={sectionName}
                  active={sectionName === activeSection}
                  color={sectionToColor[sectionName]}
                  onClick={() => {
                    handleSectionClick(sectionName);
                  }}
                />
              );
            })}
          </div>
        }
        innerRightContent={
          <>
            <div>
              <h3
                id="activity"
                ref={activityRef}
                className="hidden font-serif text-3xl font-bold text-indigoGray-90 md:block"
              >
                Activity
              </h3>
              <div
                id="activity-alt"
                ref={altActivityRef}
                className="mt-0 flex flex-col gap-6 md:mt-8 xl:w-10/12"
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

            {referrals.length > 0 && (
              <div>
                <h3 className="mt-12 font-serif text-xl font-bold text-indigoGray-90">
                  Recent referrals
                </h3>
                <div className="mt-4 grid w-full grid-cols-1 gap-6 lg:grid-cols-2 xl:w-10/12">
                  {referrals?.slice(0, 2).map((referral) => {
                    return (
                      <ReferralPreview
                        key={referral.id}
                        referredBy={{
                          username: referral.author.username,
                          avatarSrc: referral.author.avatar,
                        }}
                        text={referral.content}
                        skills={referral.skills || []}
                        date={referral.created_at}
                      />
                    );
                  })}
                </div>
                <HR />
              </div>
            )}

            {referrals.length <= 0 && <HR className="mt-0" />}

            <div>
              <div className="flex flex-col gap-4 md:flex-row md:items-center">
                <h3
                  id="badges"
                  ref={badgesRef}
                  className="font-serif text-3xl font-bold text-indigoGray-90"
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

              <div className="mt-8 grid w-full grid-cols-1 gap-12 lg:grid-cols-2 xl:w-10/12">
                {badges && badges.length > 0 ? (
                  badges
                    ?.slice(0, badgesExpanded ? badges.length : 4)
                    .map((badge) => {
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
                    })
                ) : (
                  <p className="text-lg text-indigoGray-60">
                    No recent badges to show
                  </p>
                )}
              </div>

              {badges && badges.length > 4 && (
                <div className="xl:w-10/12">
                  <Button
                    onClick={() => setBadgesExpanded((v) => !v)}
                    variant="secondary"
                    className="mx-auto mt-6"
                  >
                    {badgesExpanded ? 'COLLAPSE' : 'LOAD MORE'}
                  </Button>
                </div>
              )}

              <HR />
            </div>

            <div>
              <div className="flex flex-col gap-4 md:flex-row md:items-center">
                <h3
                  id="referrals"
                  ref={referralsRef}
                  className="font-serif text-3xl font-bold text-indigoGray-90"
                >
                  Referrals
                </h3>
                <div className="flex gap-[24px]">
                  <Pill
                    label="Received"
                    active={referralsToggle === 'received'}
                    color="emerald"
                    className="h-fit w-fit md:ml-8"
                    onClick={() => {
                      if (referralsToggle === 'received') {
                        return;
                      }
                      setReferralsToggle('received');
                    }}
                  />
                  <Pill
                    label="Given"
                    color="emerald"
                    className="h-fit w-fit"
                    active={referralsToggle === 'given'}
                    onClick={() => {
                      if (referralsToggle === 'given') {
                        return;
                      }
                      setReferralsToggle('given');
                    }}
                  />
                </div>
              </div>

              <div className="mt-8 grid w-full grid-cols-1 gap-6 lg:grid-cols-2 xl:w-10/12">
                {referralsToShow && referralsToShow.length > 0 ? (
                  referralsToShow
                    ?.slice(0, referralsExpanded ? referralsToShow.length : 4)
                    .map((referral) => {
                      return (
                        <ReferralPreview
                          key={referral.id}
                          referredBy={{
                            username: referral.author.username,
                            avatarSrc: referral.author.avatar,
                          }}
                          text={referral.content}
                          skills={referral.skills || []}
                          date={referral.created_at}
                        />
                      );
                    })
                ) : (
                  <p className="text-lg text-indigoGray-60">
                    No referrals to show
                  </p>
                )}
              </div>

              {referralsToShow && referralsToShow.length > 4 && (
                <div className="xl:w-10/12">
                  <Button
                    onClick={() => setReferralsExpanded((v) => !v)}
                    variant="secondary"
                    className="mx-auto mt-6"
                  >
                    {referralsExpanded ? 'COLLAPSE' : 'LOAD MORE'}
                  </Button>
                </div>
              )}
              <HR />
            </div>

            <div>
              <div className="flex flex-col gap-4 md:flex-row md:items-center">
                <h3
                  id="writing"
                  ref={writingRef}
                  className="font-serif text-3xl font-bold text-indigoGray-90"
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

              <div className="mt-8 grid w-full grid-cols-1 gap-6 lg:grid-cols-2 xl:w-10/12">
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

              <div className="xl:w-10/12">
                <Button variant="secondary" className="mx-auto mt-6">
                  LOAD MORE
                </Button>
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
  const { data: profile } = await getProfile(address as string);
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
