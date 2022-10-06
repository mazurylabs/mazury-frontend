import Head from 'next/head';
import { NextPage, NextPageContext } from 'next';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { axios } from '@/lib/axios';
import { FaGithub, FaGlobe, FaTwitter } from 'react-icons/fa';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { motion } from 'framer-motion';
import toast, { Toaster } from 'react-hot-toast';

import {
  Button,
  Pill,
  BadgePreview,
  HR,
  MirrorPost,
  Layout,
  Sidebar,
  ReferralPreview,
  BlueSocialButton,
  PenIcon,
} from 'components';

import {
  Badge,
  BadgeIssuer,
  MappedRoles,
  ProfileSection,
  Referral,
  Role,
} from 'types';

import {
  colors,
  getMetricDisplayValue,
  goToLink,
  hasAlreadyReferredReceiver,
  returnTruncatedIfEthAddress,
  toCapitalizedWord,
  sectionToColor,
} from 'utils';

import {
  useBadges,
  useReferrals,
  useScrollPosition,
  useTotalBadgeCounts,
  useProfile,
  useActiveProfileSection,
  useMobile,
  usePosts,
  useCredentialCount,
} from 'hooks';

import { WriteReferralModal } from 'views/Profile/WriteReferralModal';
import { ProfilePageLoadingState } from 'views/Profile/LoadingState';
import { EditProfileModal } from 'views/Profile/EditProfileModal';
import { useSelector } from 'react-redux';
import { userSlice } from '@/selectors';
import { getBadgeById } from '@/utils/api';

interface Props {
  address: string;
  ens?: string;
}

interface PageProps extends Props {}

const profileSections: ProfileSection[] = [
  'Credentials',
  'Referrals',
  'Writing',
  'DAOs',
];

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
  const accountData = useSelector(userSlice);
  // we still make use of SWR on the client. This will use fallback data in the beginning but will re-fetch if needed.
  const { profile, error } = useProfile(address);
  const eth_address = profile?.eth_address || '';

  const [badgeIssuer, setBadgeIssuer] = useState<BadgeIssuer>('mazury');
  const [sharedCredential, setSharedCredential] = useState<Badge | null>(null!);

  const { referrals, count: referralsCount } = useReferrals(eth_address);
  const { referrals: authoredReferrals } = useReferrals(eth_address, true);

  const { badges, handleFetchMore, hasMoreData } = useBadges(
    eth_address,
    badgeIssuer
  );

  const { credentialCount } = useCredentialCount(eth_address);

  const getBadgeFromRoute = useCallback(async (id: string) => {
    if (badges.find((badge) => badge.id === id)) return;
    const badge = await getBadgeById(id);
    setSharedCredential(badge.data);
  }, []);

  useEffect(() => {
    let routeCredential = (router?.query?.credential as string)?.split('#');

    if (routeCredential && routeCredential?.length !== 0) {
      setBadgeIssuer(routeCredential[0] as BadgeIssuer);
      getBadgeFromRoute(routeCredential[1]);
    }
  }, [getBadgeFromRoute]);

  const badgeCount = 0; // just a hack that you can easily remove after badgeCount is removed from types

  const { totalBadgeCounts, error: badgeCountsError } = useTotalBadgeCounts();

  const { posts } = usePosts(eth_address);

  const scrollPos = useScrollPosition();
  const shouldCollapseHeader = !!(scrollPos && scrollPos > 0);
  const [activeSection, setActiveSection] =
    React.useState<ProfileSection>('Credentials');

  const [badgesExpanded, setBadgesExpanded] = useState(false);
  const [referralsExpanded, setReferralsExpanded] = useState(false);
  const [referralsToggle, setReferralsToggle] = useState<'received' | 'given'>(
    'received'
  );
  const [postsExpanded, setPostsExpanded] = useState(false);
  const [activityExpanded, setActivityExpanded] = useState(false);

  // To track whether the 'write referral' modal is open or not
  const [referralModalOpen, setReferralModalOpen] = useState(false);

  // To track whether the 'edit profile' modal is open or not
  const [editProfileModalOpen, setEditProfileModalOpen] = useState(false);

  // If the author has already referred the receiver, this holds that referral. Else it's null.
  const [existingReferral, setExistingReferral] = useState<Referral | null>(
    null
  );
  // If the receiver has already referred the author, this holds that referral. Else it's null.
  const [receivedReferral, setReceivedReferral] = useState<Referral | null>(
    null
  );

  const referralsToShow =
    referralsToggle === 'received' ? referrals : authoredReferrals;

  const viewingOwnProfile = accountData?.address === eth_address;

  const activityRef = useRef<HTMLHeadingElement>(null);
  const altActivityRef = useRef<HTMLDivElement>(null);
  const badgesRef = useRef<HTMLHeadingElement>(null);
  const referralsRef = useRef<HTMLHeadingElement>(null);
  const writingRef = useRef<HTMLHeadingElement>(null);
  const headerRef = useRef<HTMLHRElement>(null);

  const currActiveSection = useActiveProfileSection();
  const isMobile = useMobile();

  const hasAnySocial = profile?.github || profile?.website || profile?.twitter;

  const handleSectionClick = (section: ProfileSection) => {
    setActiveSection(section);
    let ref;

    switch (section) {
      case 'Credentials':
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
        ref = badgesRef;
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

  // Opens the 'write referral' modal
  const handleWriteReferralClick = () => {
    setReferralModalOpen(true);
  };

  const handleConnectRequest = async () => {
    try {
      await axios.get(`profiles/${eth_address}/request_connection/`);
      alert(
        'Congrats, you found a preview feature!\nIf you are a beta tester, we will soon connect you with this user 🎉\nIf you want to become a beta tester, please reach out to us at wojtek@mazury.xyz 📩'
      );
    } catch (error) {
      alert(
        'Congrats, you found a preview feature!\nYou need to log in to use it.'
      );
    }
  };

  const onReferralModalClose = () => {
    setReferralModalOpen(false);
  };

  const handleEditProfileClick = () => {
    setEditProfileModalOpen(true);
  };

  const onEditProfileModalClose = () => {
    setEditProfileModalOpen(false);
  };

  const copyAddressToClipboard = async () => {
    await navigator.clipboard.writeText(eth_address);
    toast.success('Copied to clipboard!');
  };

  const handleCredential = (credential: BadgeIssuer) => {
    setBadgeIssuer(credential);
  };

  useEffect(() => {
    if (currActiveSection) {
      setActiveSection(toCapitalizedWord(currActiveSection) as ProfileSection);
    }
  }, [currActiveSection]);

  // If the user has already referred the receiver, we need to fetch the referral.
  useEffect(() => {
    if (referrals) {
      const foundExistingReferral = hasAlreadyReferredReceiver(
        referrals,
        eth_address, // receiver
        accountData?.address as string // the user
      );
      if (foundExistingReferral) {
        setExistingReferral(foundExistingReferral);
      }
    }
    if (authoredReferrals) {
      const foundExistingReferral = hasAlreadyReferredReceiver(
        authoredReferrals,
        accountData?.address as string, // receiver
        eth_address as string // the user
      );
      if (foundExistingReferral) {
        setReceivedReferral(foundExistingReferral);
      }
    }
  }, [referrals, authoredReferrals, accountData, eth_address]);

  const writeReferralButtonText = existingReferral
    ? 'Edit referral'
    : 'Write referral';

  if (error) {
    return (
      <>
        <Head>
          <title>Mazury</title>
        </Head>
        <Layout
          sidebarContent={<Sidebar />}
          headerContent={
            <p className="p-10 text-3xl">
              Something went wrong. Please try refreshing in a while or contact
              us @mazuryxyz on Twitter if the problem persists.
            </p>
          }
          innerLeftContent={null}
          innerRightContent={null}
        />
      </>
    );
  }

  if (!profile) {
    return (
      <ProfilePageLoadingState
        headerRef={headerRef}
        shouldCollapseHeader={shouldCollapseHeader}
        profileSections={profileSections}
        activeSection={activeSection}
        handleSectionClick={handleSectionClick}
        activityRef={activityRef}
        altActivityRef={altActivityRef}
        badgesRef={badgesRef}
        referralsRef={referralsRef}
        writingRef={writingRef}
      />
    );
  }

  return (
    <>
      <Toaster />
      <Head>
        <title>{returnTruncatedIfEthAddress(profile.username)} | Mazury</title>
      </Head>
      <EditProfileModal
        isOpen={editProfileModalOpen}
        onClose={onEditProfileModalClose}
        address={eth_address}
      />
      <WriteReferralModal
        isOpen={referralModalOpen}
        onClose={onReferralModalClose}
        receiver={{
          avatar: profile.avatar,
          ens_name: profile.ens_name,
          eth_address: profile.eth_address,
          username: profile.username,
        }}
        existingReferral={existingReferral}
        receivedReferral={receivedReferral}
      />
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
              <p className="font-demi">
                {returnTruncatedIfEthAddress(profile.username)}
              </p>

              {/* Write referral button, large screens */}
              {!viewingOwnProfile && (
                <div
                  className="ml-auto flex items-center rounded-lg bg-emerald-600 px-4 py-2"
                  role="button"
                  onClick={handleConnectRequest}
                >
                  <span className="text-sm font-bold uppercase text-white">
                    Request contact
                  </span>
                </div>
              )}
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
                  <div className="flex items-center gap-4 md:hidden">
                    <Image
                      onClick={() => router.back()}
                      className="hover:cursor-pointer"
                      src="/icons/back.svg"
                      alt="Back"
                      width={16}
                      height={16}
                    />
                    <p className="font-demi">
                      {returnTruncatedIfEthAddress(profile.username)}
                    </p>

                    {/* Write referral button, small screens */}
                    {!viewingOwnProfile && (
                      <div
                        className="ml-auto flex items-center"
                        role="button"
                        onClick={handleConnectRequest}
                      >
                        <span className="ml-2 text-sm font-bold uppercase text-indigoGray-90">
                          Request contact
                        </span>
                      </div>
                    )}

                    {
                      // Edit profile button, small screens
                      viewingOwnProfile && (
                        <Button
                          className="ml-auto"
                          onClick={handleEditProfileClick}
                        >
                          EDIT PROFILE
                        </Button>
                      )
                    }
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
                      className="rounded-full object-cover"
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
                          {profile.username == profile.eth_address
                            ? returnTruncatedIfEthAddress(profile.eth_address)
                            : profile.username.length > 15 && isMobile
                            ? profile.username.slice(0, 10) + '...'
                            : profile.username}
                        </motion.h1>
                        <h3
                          className={`hidden text-indigoGray-40 md:inline-block ${
                            shouldCollapseHeader ? 'text-sm' : 'text-lg'
                          }`}
                        >
                          {profile.full_name}
                        </h3>
                      </div>

                      <h3
                        className={`text-indigoGray-40 md:hidden ${
                          shouldCollapseHeader ? 'text-sm' : 'text-lg'
                        }`}
                      >
                        {profile.full_name}
                      </h3>

                      <div className="flex items-center">
                        <p
                          className={`mr-2 text-indigoGray-70 md:block ${
                            shouldCollapseHeader
                              ? 'hidden text-sm'
                              : 'text-base'
                          }`}
                        >
                          {profile.ens_name && `${profile.ens_name} `}
                          <span className="text-indigoGray-40">
                            ({returnTruncatedIfEthAddress(profile.eth_address)})
                          </span>
                        </p>
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src="/icons/clipboard.svg"
                          height="16px"
                          width="16px"
                          alt="Clipboard icon"
                          className="hidden hover:cursor-pointer md:block"
                          onClick={copyAddressToClipboard}
                        />
                      </div>
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
                      {getMetricDisplayValue(referralsCount)}
                    </span>
                    <span className="text-xs font-medium uppercase text-indigoGray-40">
                      Referrals
                    </span>
                  </div>

                  <div className="flex items-baseline gap-1">
                    <span className="text-xs font-bold text-indigoGray-50">
                      {getMetricDisplayValue(credentialCount?.total)}
                    </span>

                    <span className="text-xs font-medium uppercase text-indigoGray-40">
                      Credentials
                    </span>
                  </div>

                  <div className="flex items-baseline gap-1">
                    <span className="text-xs font-bold text-indigoGray-50">
                      {getMetricDisplayValue(posts.length)}
                    </span>
                    <span className="text-xs font-medium uppercase text-indigoGray-40">
                      Posts
                    </span>
                  </div>
                </div>
              </div>

              <div className="ml-auto flex flex-col">
                {viewingOwnProfile && !isMobile && (
                  <Button
                    className="ml-auto mr-24 w-fit"
                    onClick={handleEditProfileClick}
                  >
                    EDIT PROFILE
                  </Button>
                )}

                <div className="mt-8 hidden gap-16 pr-24 lg:flex">
                  <div className="flex flex-col items-center gap-0">
                    <motion.span
                      style={{
                        fontSize: shouldCollapseHeader ? '24px' : '36px',
                      }}
                      className="font-serif font-bold"
                    >
                      {getMetricDisplayValue(referralsCount)}
                    </motion.span>
                    <div className="text-sm uppercase text-indigoGray-60 opacity-60">
                      Referrals
                    </div>
                  </div>
                  <div className="flex flex-col items-center gap-0">
                    <motion.span
                      style={{
                        fontSize: shouldCollapseHeader ? '24px' : '36px',
                      }}
                      className="font-serif font-bold"
                    >
                      {getMetricDisplayValue(credentialCount?.total)}
                    </motion.span>
                    <div className="text-sm uppercase text-indigoGray-60 opacity-60">
                      Credentials
                    </div>
                  </div>
                  <div className="flex flex-col items-center gap-0">
                    <motion.span
                      style={{
                        fontSize: shouldCollapseHeader ? '24px' : '36px',
                      }}
                      className="font-serif font-bold"
                    >
                      {getMetricDisplayValue(posts.length)}
                    </motion.span>
                    <div className="text-xs uppercase text-indigoGray-60 opacity-60">
                      Posts
                    </div>
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
                    goToLink(`https://github.com/${profile.github}`)
                  }
                >
                  <FaGithub /> {profile.github}
                </BlueSocialButton>
              )}
              {profile.eth_address && (
                <BlueSocialButton
                  variant="secondary"
                  onClick={() =>
                    goToLink(
                      `https://chat.blockscan.com/index?a=${profile.eth_address}`
                    )
                  }
                >
                  <Image
                    src="/icons/blockscan.svg"
                    height={14}
                    width={14}
                  ></Image>
                  Chat
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
                  className="mx-auto w-[170px] justify-start"
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
          <div className="pb-4">
            <div className="">
              <div className="flex flex-col gap-4 md:flex-row md:items-center">
                <h3
                  id="Credentials"
                  ref={badgesRef}
                  className="font-serif text-3xl font-bold text-indigoGray-90"
                >
                  Credentials
                </h3>
                <div className="flex w-full flex-wrap">
                  <Pill
                    label={
                      <div className="flex items-center space-x-2">
                        <span>Mazury badges </span>
                        <span
                          className={`font-sans text-sm font-medium ${
                            badgeIssuer === 'mazury'
                              ? 'fuchsia-300'
                              : 'text-indigoGray-40'
                          }`}
                        >
                          {getMetricDisplayValue(credentialCount?.mazury)}
                        </span>
                      </div>
                    }
                    color="fuchsia"
                    className="h-fit w-fit shrink-0 lg:ml-6"
                    active={badgeIssuer === 'mazury'}
                    onClick={() => handleCredential('mazury')}
                  />
                  <Pill
                    label={
                      <div className="flex items-center space-x-2">
                        <span> POAP</span>
                        <span
                          className={`font-sans text-sm font-medium ${
                            badgeIssuer === 'poap'
                              ? 'fuchsia-300'
                              : 'text-indigoGray-40'
                          }`}
                        >
                          {getMetricDisplayValue(credentialCount?.poap)}
                        </span>
                      </div>
                    }
                    color="fuchsia"
                    className="h-fit w-fit shrink-0 lg:ml-6"
                    active={badgeIssuer === 'poap'}
                    onClick={() => handleCredential('poap')}
                  />
                  <Pill
                    label={
                      <div className="flex items-center space-x-2">
                        <span>GitPOAP</span>
                        <span
                          className={`font-sans text-sm font-medium ${
                            badgeIssuer === 'gitpoap'
                              ? 'fuchsia-300'
                              : 'text-indigoGray-40'
                          }`}
                        >
                          {getMetricDisplayValue(credentialCount?.gitpoap)}
                        </span>
                      </div>
                    }
                    color="fuchsia"
                    className="h-fit w-fit shrink-0 lg:ml-6"
                    active={badgeIssuer === 'gitpoap'}
                    onClick={() => handleCredential('gitpoap')}
                  />
                  <Pill
                    label={
                      <div className="flex items-center space-x-2">
                        <span>Buildspace</span>
                        <span
                          className={`font-sans text-sm font-medium ${
                            badgeIssuer === 'buildspace'
                              ? 'fuchsia-300'
                              : 'text-indigoGray-40'
                          }`}
                        >
                          {getMetricDisplayValue(credentialCount?.buildspace)}
                        </span>
                      </div>
                    }
                    color="fuchsia"
                    className="h-fit w-fit shrink-0 lg:ml-6"
                    active={badgeIssuer === 'buildspace'}
                    onClick={() => setBadgeIssuer('buildspace')}
                  />
                  <Pill
                    label={
                      <div className="flex items-center space-x-2">
                        <span>Sismo</span>
                        <span
                          className={`font-sans text-sm font-medium ${
                            badgeIssuer === 'sismo'
                              ? 'fuchsia-300'
                              : 'text-indigoGray-40'
                          }`}
                        >
                          {getMetricDisplayValue(credentialCount?.sismo)}
                        </span>
                      </div>
                    }
                    color="fuchsia"
                    className="h-fit w-fit shrink-0 lg:ml-6"
                    active={badgeIssuer === 'sismo'}
                    onClick={() => handleCredential('sismo')}
                  />
                  <Pill
                    label={
                      <div className="flex items-center space-x-2">
                        <span>101</span>
                        <span
                          className={`font-sans text-sm font-medium ${
                            badgeIssuer === '101'
                              ? 'fuchsia-300'
                              : 'text-indigoGray-40'
                          }`}
                        >
                          {getMetricDisplayValue(credentialCount?.[101])}
                        </span>
                      </div>
                    }
                    color="fuchsia"
                    className="h-fit w-fit shrink-0 lg:ml-6"
                    active={badgeIssuer === '101'}
                    onClick={() => handleCredential('101')}
                  />
                  <Pill
                    label={
                      <div className="flex items-center space-x-2">
                        <span>Kudos</span>
                        <span
                          className={`font-sans text-sm font-medium ${
                            badgeIssuer === '101'
                              ? 'fuchsia-300'
                              : 'text-indigoGray-40'
                          }`}
                        >
                          {getMetricDisplayValue(credentialCount?.kudos)}
                        </span>
                      </div>
                    }
                    color="fuchsia"
                    className="h-fit w-fit shrink-0 lg:ml-6"
                    active={badgeIssuer === 'kudos'}
                    onClick={() => handleCredential('kudos')}
                  />
                </div>
              </div>

              <div className="mt-8 grid w-full grid-cols-1 gap-12 lg:grid-cols-2 2xl:w-10/12">
                {sharedCredential &&
                  !badges?.find(
                    (badge) => badge.id === sharedCredential.id
                  ) && (
                    <BadgePreview
                      routeId={sharedCredential?.id}
                      description={
                        sharedCredential?.badge_type.description as string
                      }
                      heading={sharedCredential?.badge_type.title as string}
                      imgSrc={sharedCredential?.badge_type.image as string}
                      totalCount={
                        sharedCredential?.badge_type.total_supply as number
                      }
                      badgeCount={badgeCount}
                      slug={sharedCredential?.badge_type.slug as string}
                      issuer={
                        sharedCredential?.badge_type.issuer.name as BadgeIssuer
                      }
                      id={sharedCredential?.id as string}
                      owner={sharedCredential?.owner.username as string}
                      canBeMinted={
                        eth_address === sharedCredential?.owner.eth_address &&
                        !sharedCredential?.minted
                      }
                      mintedAt={
                        sharedCredential?.minted_at
                          ? new Date(
                              sharedCredential?.minted_at as string
                            ).toDateString()
                          : 'Date unknown'
                      }
                      openseaUrl={
                        sharedCredential?.external_links.openseaUrl as string
                      }
                      rainbowUrl={
                        sharedCredential?.external_links.rainbowUrl as string
                      }
                    />
                  )}

                {badges && badges.length > 0 ? (
                  badges.map((badge) => {
                    //pass here
                    const {
                      badge_type,
                      id,
                      minted,
                      owner,
                      minted_at,
                      external_links,
                    } = badge;

                    const {
                      image,
                      description,
                      title,
                      total_supply,
                      issuer,
                      slug,
                    } = badge_type;

                    const { opensea, rainbow } = external_links;

                    return (
                      <BadgePreview
                        key={id}
                        description={description}
                        heading={title}
                        imgSrc={image}
                        totalCount={total_supply as number} // TODO: i dont know why "as number" makes ts happy but im gonna leave it —— feel free to change this code
                        badgeCount={badgeCount}
                        slug={slug}
                        issuer={issuer.name}
                        id={id}
                        owner={owner.username}
                        canBeMinted={
                          eth_address === owner.eth_address && !minted
                        }
                        mintedAt={
                          minted_at
                            ? new Date(minted_at).toDateString()
                            : 'Date unknown'
                        }
                        openseaUrl={opensea}
                        rainbowUrl={rainbow}
                        externalLink={
                          Object.values(external_links)[0] as string
                        }
                      />
                    );
                  })
                ) : (
                  <p className="text-lg text-indigoGray-60">
                    {badges?.length === 0
                      ? 'No recent credentials to show'
                      : 'Loading...'}
                  </p>
                )}
              </div>

              {badges?.length !== 0 && hasMoreData && (
                <div className="xl:w-10/12">
                  <Button
                    onClick={handleFetchMore}
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
              <div className="flex flex-col gap-4 lg:flex-row lg:items-center">
                <div className="flex">
                  <h3
                    id="Referrals"
                    ref={referralsRef}
                    className="font-serif text-3xl font-bold text-indigoGray-90"
                  >
                    Referrals
                  </h3>
                  <Button
                    onClick={handleWriteReferralClick}
                    className="ml-auto w-fit uppercase md:hidden"
                    size="small"
                  >
                    <PenIcon color={colors.indigoGray[5]} />
                    {writeReferralButtonText}
                  </Button>
                </div>

                <div className="flex gap-[24px] lg:ml-12 lg:grow">
                  <Pill
                    label="Received"
                    active={referralsToggle === 'received'}
                    color="emerald"
                    className="h-fit w-fit"
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

                  <Button
                    onClick={handleWriteReferralClick}
                    className="ml-auto hidden w-fit uppercase md:flex"
                    size="small"
                  >
                    <PenIcon color={colors.indigoGray[5]} />
                    {writeReferralButtonText}
                  </Button>
                </div>
              </div>

              <div className="mt-8 grid w-full grid-cols-1 gap-6 lg:grid-cols-2">
                {referralsToShow && referralsToShow.length > 0 ? (
                  referralsToShow
                    ?.slice(0, referralsExpanded ? referralsToShow.length : 4)
                    .map((referral) => {
                      return (
                        <ReferralPreview
                          key={referral.id}
                          referral={referral}
                          alternate={referralsToggle === 'given'}
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
                <div>
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
                  id="Writing"
                  ref={writingRef}
                  className="font-serif text-3xl font-bold text-indigoGray-90"
                >
                  Writing
                </h3>
              </div>

              <div className="mt-8 grid w-full grid-cols-1 gap-6 lg:grid-cols-2">
                {posts && posts.length > 0 ? (
                  posts
                    ?.slice(0, postsExpanded ? posts.length : 4)
                    .map((post) => (
                      <MirrorPost
                        author={{
                          username: profile?.username,
                          avatarSrc: profile?.avatar,
                        }}
                        bgImageSrc={post?.background_image || ''}
                        title={post.title}
                        link={post?.url}
                        key={post.id}
                      />
                    ))
                ) : (
                  <p className="text-lg text-indigoGray-60">
                    No recent posts to show
                  </p>
                )}
              </div>
              {posts && posts.length > 4 && (
                <div>
                  <Button
                    onClick={() => setPostsExpanded((v) => !v)}
                    variant="secondary"
                    className="mx-auto mt-6"
                  >
                    {postsExpanded ? 'COLLAPSE' : 'LOAD MORE'}
                  </Button>
                </div>
              )}
            </div>
          </div>
        }
      />
    </>
  );
};

const Page: NextPage<PageProps> = ({ address }) => {
  return <Profile address={address} />;
};

export default Page;

export const getServerSideProps = async (context: NextPageContext) => {
  const { address } = context.query;
  return {
    props: {
      address: context.query.address,
    },
  };
};
