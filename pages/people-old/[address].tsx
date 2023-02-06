import Head from 'next/head';
import { NextPage, NextPageContext } from 'next';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { axios } from '@/lib/axios';
import { FaGithub, FaGlobe, FaTwitter } from 'react-icons/fa';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { AnimatePresence, motion } from 'framer-motion';
import toast, { Toaster } from 'react-hot-toast';
import SVG from 'react-inlinesvg';

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
  Modal,
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
  formatNumber,
  formatIpfsImage,
  plurify,
} from 'utils';

import {
  useBadges,
  useReferrals,
  useScrollPosition,
  useProfile,
  useActiveProfileSection,
  useMobile,
  usePosts,
  useCredentialCount,
  useIsOnboarded,
  useMutualFollowers,
} from 'hooks';

import { WriteReferralModal } from 'views/Profile/WriteReferralModal';
import { ProfilePageLoadingState } from 'views/Profile/LoadingState';
import { EditProfileModal } from 'views/Profile/EditProfileModal';
import { useSelector } from 'react-redux';
import { userSlice } from '@/selectors';
import {
  getBadgeById,
  requestConnection,
  requestConnectionStatus,
} from '@/utils/api';
import { useConnectionStatus } from '@/hooks/useConnectionStatus';
import { RequestStatusModal } from '@/components/RequestContactModal/RequestStatusModal';
import { RecruiterModalContent } from '@/components/RequestContactModal/RecruiterModalContent';
import { NonRecruiterModalContent } from '@/components/RequestContactModal/NonRecruiterModalContent';
import { RequireSignin } from '@/components/RequireSignin';
import Link from 'next/link';

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
  useIsOnboarded();
  const router = useRouter();
  const isMobile = useMobile();
  const { profile, error } = useProfile(address);
  const accountData = useSelector(userSlice);
  const currActiveSection = useActiveProfileSection();

  const viewingOwnProfile = false;
  const account = viewingOwnProfile ? accountData.profile : profile;
  const eth_address = account?.eth_address || '';

  const { connectionStatus } = useConnectionStatus(eth_address);
  const { posts } = usePosts(eth_address);
  const data = useCredentialCount(eth_address);
  const scrollPos = useScrollPosition();
  const [badgeIssuer, setBadgeIssuer] = useState<BadgeIssuer>('mazury');
  const [sharedCredential, setSharedCredential] = useState<Badge | null>(null!);
  const { referrals } = useReferrals(eth_address);
  const { referrals: authoredReferrals } = useReferrals(eth_address, true);
  const shouldCollapseHeader = !!(scrollPos && scrollPos > 0);
  const [activeSection, setActiveSection] =
    React.useState<ProfileSection>('Credentials');

  const [isConnectionRequested, setConnectionRequested] = useState(false);

  const [badgesExpanded, setBadgesExpanded] = useState(false);
  const [referralsExpanded, setReferralsExpanded] = useState(false);
  const [referralsToggle, setReferralsToggle] = useState<'received' | 'given'>(
    'received'
  );
  const [postsExpanded, setPostsExpanded] = useState(false);

  // To track whether the 'write referral' modal is open or not
  const [referralModalOpen, setReferralModalOpen] = useState(false);

  // To track whether the 'edit profile' modal is open or not
  const [editProfileModalOpen, setEditProfileModalOpen] = useState(false);

  const [isRequestModalOpen, setIsRequestModalOpen] = useState(false);

  // If the author has already referred the receiver, this holds that referral. Else it's null.
  const [existingReferral, setExistingReferral] = useState<Referral | null>(
    null
  );
  // If the receiver has already referred the author, this holds that referral. Else it's null.
  const [receivedReferral, setReceivedReferral] = useState<Referral | null>(
    null
  );

  const { badges, handleFetchMore, hasMoreData } = useBadges(
    eth_address,
    badgeIssuer
  );

  const activityRef = useRef<HTMLHeadingElement>(null);
  const altActivityRef = useRef<HTMLDivElement>(null);
  const badgesRef = useRef<HTMLHeadingElement>(null);
  const referralsRef = useRef<HTMLHeadingElement>(null);
  const writingRef = useRef<HTMLHeadingElement>(null);
  const headerRef = useRef<HTMLHRElement>(null);

  const { mutualFollowers } = useMutualFollowers('0x05', '0x290f');

  const getBadgeFromRoute = useCallback(async (id: string) => {
    try {
      if (badges.find((badge) => badge.id === id)) return;
      const badge = await getBadgeById(id);
      setSharedCredential(badge.data);
    } catch (error) {
      console.log(error);
    }
  }, []);

  useEffect(() => {
    let routeCredential = (router?.query?.credential as string)?.split('#');

    if (routeCredential && routeCredential?.length !== 0) {
      setBadgeIssuer(routeCredential[0] as BadgeIssuer);
      getBadgeFromRoute(routeCredential[1]);
    }
  }, [getBadgeFromRoute]);

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

  const remainingFollowers = formatNumber(
    +mutualFollowers?.pageInfo?.totalCount - +mutualFollowers?.items?.length
  );
  const badgeCount = 0; // just a hack that you can easily remove after badgeCount is removed from types

  const referralsToShow =
    referralsToggle === 'received' ? referrals : authoredReferrals;

  // const viewingOwnProfile = accountData?.address === eth_address;

  const hasAnySocial = account?.github || account?.website || account?.twitter;

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
      const { data } = await requestConnection(eth_address);

      if (data) {
        setConnectionRequested(true);
        setIsRequestModalOpen(true);
      }
    } catch (error: any) {
      if (error.message.includes('403') || !accountData.isAuthenticated) {
        setIsRequestModalOpen(true);
      }
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

  // console.log(!connectionStatus?.status);

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

  if (!account) {
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
        <title>{returnTruncatedIfEthAddress(account.username)} | Mazury</title>
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
          avatar: account.avatar,
          ens_name: account.ens_name,
          eth_address: account.eth_address,
          username: account.username,
        }}
        existingReferral={existingReferral}
        receivedReferral={receivedReferral}
      />
      <Layout
        sidebarContent={<Sidebar />}
        headerContent={
          <div className="sticky top-0 left-0 z-10 bg-white">
            <div className="hidden items-center justify-between gap-4 py-4 px-[39.5px] md:flex">
              <div className="flex items-center">
                <Image
                  onClick={() => router.back()}
                  className="hover:cursor-pointer"
                  src="/icons/back.svg"
                  alt="Back"
                  width={16}
                  height={16}
                />
                {/* <p className="ml-2 font-demi">
                  {returnTruncatedIfEthAddress(account.username)}
                </p> */}
              </div>

              {/* Write referral button, large screens */}
              {!viewingOwnProfile && (
                <button
                  className={`font-inter flex h-[29px] w-auto min-w-[186px] ${
                    !connectionStatus ? 'animate-pulse' : ''
                  } items-center justify-center rounded-lg px-6 text-center font-sans text-sm font-semibold text-indigoGray-5 ${
                    isConnectionRequested || Boolean(connectionStatus?.status)
                      ? 'bg-gray-200'
                      : 'bg-indigoGray-90'
                  }`}
                  type="button"
                  onClick={handleConnectRequest}
                  disabled={
                    isConnectionRequested || Boolean(connectionStatus?.status)
                  }
                >
                  <div className="mr-2">
                    <SVG
                      src={`/icons/connection-${
                        isConnectionRequested
                          ? 'pending'
                          : connectionStatus.status
                      }.svg`}
                      height={16}
                      width={16}
                    />
                  </div>
                  <span
                    className={`${
                      isConnectionRequested || Boolean(connectionStatus.status)
                        ? 'text-indigoGray-40'
                        : 'text-indigoGray-5'
                    }`}
                  >
                    {!isConnectionRequested && !connectionStatus
                      ? ''
                      : connectionStatus?.status
                      ? `Contact ${connectionStatus.status}`
                      : isConnectionRequested
                      ? 'Contact pending'
                      : 'Request contact'}
                  </span>
                </button>
              )}
            </div>

            <div
              className="flex w-full items-center gap-8 rounded-none bg-white px-4 py-6 transition duration-1000 ease-in-out md:rounded-2xl md:py-6 lg:px-10"
              style={{
                background:
                  'linear-gradient(72.37deg, rgba(97, 191, 243, 0.2) 18.05%, rgba(244, 208, 208, 0.128) 83.63%), radial-gradient(58.61% 584.5% at 57.29% 41.39%, rgba(233, 209, 204, 0.9) 0%, rgba(236, 219, 212, 0.468) 100%)',
              }}
            >
              <div className="flex flex-col space-y-4 lg:space-y-8">
                <div className="flex flex-col gap-2">
                  <div className="flex items-center justify-between gap-4 md:hidden">
                    <div className="flex items-center">
                      <Image
                        onClick={() => router.back()}
                        className="hover:cursor-pointer"
                        src="/icons/back.svg"
                        alt="Back"
                        width={16}
                        height={16}
                      />
                      <p className="ml-2 font-demi">
                        {returnTruncatedIfEthAddress(account.username)}
                      </p>
                    </div>

                    {/* Write referral button, small screens */}
                    {!viewingOwnProfile && (
                      <button
                        className={`font-inter flex h-[29px] w-auto min-w-[186px] ${
                          !connectionStatus ? 'animate-pulse' : ''
                        } items-center justify-center rounded-lg px-6 text-center font-sans text-sm font-semibold text-indigoGray-5 ${
                          isConnectionRequested ||
                          Boolean(connectionStatus?.status)
                            ? 'bg-gray-200'
                            : 'bg-indigoGray-90'
                        }`}
                        type="button"
                        onClick={handleConnectRequest}
                        disabled={
                          isConnectionRequested ||
                          Boolean(connectionStatus?.status)
                        }
                      >
                        <div className="mr-2">
                          <SVG
                            src={`/icons/connection-${
                              isConnectionRequested
                                ? 'pending'
                                : connectionStatus.status
                            }.svg`}
                            height={16}
                            width={16}
                          />
                        </div>
                        <span
                          className={`${
                            isConnectionRequested ||
                            Boolean(connectionStatus.status)
                              ? 'text-indigoGray-40'
                              : 'text-indigoGray-5'
                          }`}
                        >
                          {!isConnectionRequested && !connectionStatus
                            ? ''
                            : connectionStatus?.status
                            ? `Contact ${connectionStatus.status}`
                            : isConnectionRequested
                            ? 'Contact pending'
                            : 'Request contact'}
                        </span>
                      </button>
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
                      src={account.avatar}
                      alt={`${account.username}'s avatar`}
                      className="rounded-full object-cover"
                    />
                    <div className="flex flex-col">
                      <div className="flex items-baseline gap-4">
                        <motion.h1
                          animate={{
                            fontSize: shouldCollapseHeader
                              ? '30px'
                              : isMobile && account.username.length > 8
                              ? '32px'
                              : '48px',
                          }}
                          className={`no-scrollbar overflow-x-scroll font-demi text-indigoGray-90 md:overflow-auto`}
                        >
                          {account.username == account.eth_address
                            ? returnTruncatedIfEthAddress(account.eth_address)
                            : account.username.length > 15 && isMobile
                            ? account.username.slice(0, 10) + '...'
                            : account.username}
                        </motion.h1>
                        <h3
                          className={`hidden text-indigoGray-40 md:inline-block ${
                            shouldCollapseHeader ? 'text-sm' : 'text-lg'
                          }`}
                        >
                          {account.full_name}
                        </h3>
                      </div>

                      <h3
                        className={`text-indigoGray-40 md:hidden ${
                          shouldCollapseHeader ? 'text-sm' : 'text-lg'
                        }`}
                      >
                        {account.full_name}
                      </h3>

                      <div className="flex items-center space-x-2">
                        <SVG
                          src="/icons/browse-wallet.svg"
                          height="16px"
                          width="16px"
                        />
                        <p
                          className={`font-sansMid !text-sm font-medium text-indigoGray-70 md:block ${
                            shouldCollapseHeader
                              ? 'hidden text-sm'
                              : 'text-base'
                          }`}
                        >
                          {account.ens_name && `${account.ens_name} `}
                          {account.ens_name ? (
                            <span className="text-indigoGray-40">
                              (
                              {returnTruncatedIfEthAddress(account.eth_address)}
                              )
                            </span>
                          ) : (
                            <span className={'text-indigoGray-70'}>
                              {returnTruncatedIfEthAddress(account.eth_address)}
                            </span>
                          )}
                        </p>
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <SVG
                          src="/icons/clipboard.svg"
                          height="16px"
                          width="16px"
                          className="hover:cursor-pointer"
                          onClick={copyAddressToClipboard}
                        />
                      </div>

                      {account?.lens_handle && (
                        <div className="mt-[2px] flex items-center space-x-2">
                          <SVG src="/icons/lens.svg" height={16} width={16} />
                          <p className="font-sansMid text-sm font-medium text-indigoGray-70">
                            {account.lens_handle}
                          </p>
                          <Link
                            href={`https://lenster.xyz/u/${account.lens_handle}`}
                          >
                            <a
                              target="_blank"
                              rel="noreferrer"
                              className="flex"
                            >
                              <SVG
                                src="/icons/external-link-black.svg"
                                height={16}
                                width={16}
                              />
                            </a>
                          </Link>
                        </div>
                      )}

                      {account?.location && (
                        <div className="mt-[2px] flex items-center space-x-2">
                          <SVG
                            src="/icons/location.svg"
                            height={16}
                            width={16}
                          />
                          <p className="font-sansMid text-sm font-medium text-indigoGray-70">
                            {account.location}
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {account?.bio && (
                  <p
                    className={`text-indigoGray-70 ${
                      shouldCollapseHeader ? 'hidden' : 'block'
                    }`}
                  >
                    {account?.bio}
                  </p>
                )}

                <div
                  className={`no-scrollbar hidden w-full gap-6 overflow-x-scroll md:flex md:overflow-auto ${
                    shouldCollapseHeader ? 'hidden' : 'flex'
                  }`}
                >
                  {/* @ts-expect-error any element of type 'Role' is also a 'string' */}
                  {Object.keys(roleFieldToLabel).map((role: Role) => {
                    if (account[role] === true) {
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

                {!viewingOwnProfile &&
                  +mutualFollowers?.pageInfo?.totalCount > 0 && (
                    <div className="!mt-[31px] !mb-4 flex h-[18px] items-center space-x-[3.5px] lg:!mt-5 lg:!mb-[0px]">
                      <div className="flex space-x-[-6px]">
                        {mutualFollowers?.items?.map((follower, index) => {
                          return (
                            <img
                              key={follower.id}
                              src={formatIpfsImage(
                                follower.picture.original.url
                              )}
                              className={`h-6 w-6 rounded-full`}
                              style={{
                                zIndex: mutualFollowers.items.length - index,
                              }}
                            />
                          );
                        })}
                      </div>
                      <p className="font-sansMid text-xs font-medium text-indigoGray-50">
                        Followed by{' '}
                        {mutualFollowers?.items?.map(
                          ({ handle, id, ownedBy }) => {
                            const mutuals = mutualFollowers.items;
                            return (
                              <>
                                <a
                                  {...(ownedBy
                                    ? {
                                        onClick: () =>
                                          router.push(`/people/${ownedBy}`),
                                        className: 'cursor-pointer',
                                      }
                                    : {})}
                                >
                                  {handle}
                                </a>
                                {id === mutuals[mutuals.length - 1].id
                                  ? ''
                                  : `${!!remainingFollowers ? ', ' : ' and '}`}
                              </>
                            );
                          }
                        )}
                        {!!remainingFollowers &&
                          ', and ' +
                            remainingFollowers +
                            plurify(+remainingFollowers, ' other')}
                      </p>
                    </div>
                  )}

                <div
                  className={`flex space-x-4 lg:hidden ${
                    shouldCollapseHeader && 'hidden'
                  }`}
                >
                  <div className="flex items-baseline space-x-1">
                    <span className="text-xs font-bold text-indigoGray-50">
                      {formatNumber(account.followers_count || 0)}
                    </span>
                    <span className="text-xs font-medium uppercase text-indigoGray-40">
                      FOLLOWERS ON 🌿
                    </span>
                  </div>

                  <div className="flex items-baseline gap-1">
                    <span className="text-xs font-bold text-indigoGray-50">
                      {getMetricDisplayValue(
                        (data.data?.credentials?.total as any) || 0
                      )}
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

              <div className="ml-auto hidden flex-col lg:flex">
                {viewingOwnProfile && (
                  <Button
                    className="ml-auto mr-24 w-fit"
                    onClick={handleEditProfileClick}
                  >
                    EDIT PROFILE
                  </Button>
                )}

                <div className="mt-8 hidden space-x-16 pr-20 lg:flex">
                  <div className="flex shrink-0 flex-col items-center gap-0">
                    <motion.span
                      style={{
                        fontSize: shouldCollapseHeader ? '24px' : '36px',
                      }}
                      className="font-serif font-bold"
                    >
                      {formatNumber(account.followers_count || 0)}
                    </motion.span>
                    <div className="text-sm uppercase text-indigoGray-60 opacity-60">
                      FOLLOWERS ON 🌿
                    </div>
                  </div>
                  <div className="flex flex-col items-center gap-0">
                    <motion.span
                      style={{
                        fontSize: shouldCollapseHeader ? '24px' : '36px',
                      }}
                      className="font-serif font-bold"
                    >
                      {getMetricDisplayValue(
                        data.data?.credentials?.total as any
                      )}
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
              {account.twitter && (
                <BlueSocialButton
                  variant="secondary"
                  onClick={() =>
                    goToLink(`https://twitter.com/${account.twitter}`)
                  }
                >
                  <FaTwitter /> {account.twitter}
                </BlueSocialButton>
              )}
              {account.website && (
                <BlueSocialButton
                  variant="secondary"
                  onClick={() => goToLink(account.website)}
                >
                  <FaGlobe /> {account.website}
                </BlueSocialButton>
              )}
              {account.github && (
                <BlueSocialButton
                  variant="secondary"
                  onClick={() =>
                    goToLink(`https://github.com/${account.github}`)
                  }
                >
                  <FaGithub /> {account.github}
                </BlueSocialButton>
              )}
              {account.eth_address && (
                <BlueSocialButton
                  variant="secondary"
                  onClick={() =>
                    goToLink(
                      `https://chat.blockscan.com/index?a=${account.eth_address}`
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
                          {getMetricDisplayValue(
                            data.data?.credentials?.mazury as any
                          )}
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
                          {getMetricDisplayValue(
                            Number(data.data?.credentials?.poap || '0')
                          )}
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
                          {getMetricDisplayValue(
                            Number(data.data?.credentials?.gitpoap || '0')
                          )}
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
                          {getMetricDisplayValue(
                            Number(data.data?.credentials?.buildspace || '0')
                          )}
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
                          {getMetricDisplayValue(
                            Number(data.data?.credentials?.sismo || '0')
                          )}
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
                          {getMetricDisplayValue(
                            Number(data.data?.credentials?.[101] || '0')
                          )}
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
                          {getMetricDisplayValue(
                            Number(data.data?.credentials?.kudos || '0')
                          )}
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
                      poapUrl={
                        sharedCredential?.external_links.poapUrl as string
                      }
                      kudosUrl={
                        sharedCredential?.external_links.kudosUrl as string
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

                    const { opensea, rainbow, poap, kudos } = external_links;

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
                        poapUrl={poap}
                        kudosUrl={kudos}
                        externalLink={external_links[issuer.name]}
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
                    onClick={() => handleFetchMore()}
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
                          username: account?.username,
                          avatarSrc: account?.avatar,
                        }}
                        bgImageSrc={post?.background_image || ''}
                        title={post.title}
                        link={post?.url}
                        key={post.id}
                        source={post.source}
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

      <RequestStatusModal
        isOpen={isRequestModalOpen}
        onClose={() => setIsRequestModalOpen(false)}
      >
        {accountData.profile?.is_recruiter ? (
          <RecruiterModalContent />
        ) : (
          <NonRecruiterModalContent />
        )}
      </RequestStatusModal>

      {/* <AnimatePresence>
        <RequireSignin />
      </AnimatePresence> */}
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
