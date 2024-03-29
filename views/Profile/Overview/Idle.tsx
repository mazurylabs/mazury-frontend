import * as React from 'react';
import { useRouter } from 'next/router';
import SVG from 'react-inlinesvg';
import { QueryClient, useQuery } from '@tanstack/react-query';
import clsx from 'clsx';
import Link from 'next/link';
import { Progress } from 'components';
import { axios } from 'lib/axios';
import { Badge, LensPublication, ListResponse, Post } from 'types';
import { useBadges } from 'hooks';

import { Credential } from '../Credential';
import { useLensPost } from '../Container';
import { useWriting } from '@/pages/people/[address]/content';
import { MirrorPost } from '../MirrorPost';
import { LensPost } from '../LensPost';

interface IdleProps {
  address: string;
  isOwnProfile: boolean;
  profileSummaryAccordion: React.ReactNode;
  lensId: string;
  author: { username: string; avatar: string };
}

type DummyCrendential = {
  id: number;
  title: string;
  description: string;
  ownedBy: number;
  image: string;
};

type ProfileCompletion = {
  personal_information: boolean;
  discover_web3_credentials: boolean;
  highlight_credentials: boolean;
  connect_social_media: boolean;
  email_verified: boolean;
};

const skeletons = Array(5).fill('skeleton');

export const Idle = ({
  address,
  isOwnProfile,
  profileSummaryAccordion,
  lensId,
  author,
}: IdleProps) => {
  const router = useRouter();
  const [showLess, setShowLess] = React.useState(false);
  const queryClient = new QueryClient();

  const profileCompletion = useQuery({
    queryKey: ['profileCompletion'],
    queryFn: () => getProfileCompletion(address),
    enabled: isOwnProfile && !!address,
  });

  const highlightedCredentials = useHighlightedCredentials(address);
  const { data: lensPost, isLoading: isLensLoading } = useLensPost({
    profileId: lensId,
  });
  const { writings: mirrorPost, isLoading: isMirrorLoading } = useWriting({
    address,
    limit: 8,
    enabled: !!address,
  });

  const hasHighlightedCredentials = !!highlightedCredentials.data?.length;

  const { badges, isLoading } = useBadges(
    address,
    undefined,
    8,
    undefined,
    !hasHighlightedCredentials,
    !!address
  );

  const credentials = hasHighlightedCredentials
    ? highlightedCredentials.data || []
    : badges;

  const profileCompletionData = profileCompletion.data;
  const completionDataArray = Object.values(profileCompletionData || {});
  const completedData = completionDataArray.filter(Boolean).length;

  const showCompletionData =
    isOwnProfile &&
    completedData !== 5 &&
    profileCompletion.status !== 'loading';

  return (
    <div
      className={clsx(
        'space-y-4',
        showCompletionData ? 'lg:space-y-6' : 'lg:space-y-0'
      )}
    >
      {showCompletionData && (
        <div className="overflow-hidden rounded-lg lg:max-w-[826.6px]">
          <div className="flex w-full justify-between bg-indigoGray-90 py-3 px-6 lg:items-center">
            <div className="flex flex-col space-y-2 lg:flex-row lg:items-center lg:space-y-0 lg:space-x-8">
              <p className="font-sans text-sm font-semibold text-indigoGray-5">
                Complete your profile
              </p>
              <Progress
                total={completionDataArray.length}
                current={completedData}
                label="complete"
                size="small"
                variant="dark"
              />
            </div>
            <button
              className="m-0 h-fit p-0 font-sansMid text-sm font-medium text-indigoGray-5"
              onClick={() => setShowLess(!showLess)}
            >
              {showLess ? 'Show more' : 'Show less'}
            </button>
          </div>

          {!showLess && (
            <div className="border-t-none flex flex-col divide-y divide-x-0 rounded-b-lg border border-indigoGray-20 py-3 px-6 lg:flex-row lg:justify-between lg:divide-x lg:divide-y-0 lg:divide-indigoGray-20">
              {completedData !== 5 ? (
                <>
                  <button
                    disabled={!!profileCompletionData?.['personal_information']}
                    className={clsx(
                      'm-0 p-0 pb-3 text-left font-sans text-xs font-medium text-indigoGray-90 hover:text-indigoGray-60 lg:px-[10px] lg:pb-0 lg:font-semibold',
                      profileCompletionData?.['personal_information'] &&
                        'cursor-not-allowed font-medium text-indigoGray-40 line-through'
                    )}
                    onClick={() => router.push(`${router.asPath}/edit`)}
                  >
                    Add personal information
                  </button>
                  <button
                    disabled={
                      !!profileCompletionData?.['discover_web3_credentials']
                    }
                    className={clsx(
                      'm-0 p-0 pb-3 pt-3 text-left font-sans text-xs font-medium text-indigoGray-90 hover:text-indigoGray-60 lg:px-[10px] lg:pt-0 lg:pb-0 lg:font-semibold',
                      profileCompletionData?.['discover_web3_credentials'] &&
                        'cursor-not-allowed font-medium text-indigoGray-40 line-through'
                    )}
                    onClick={() => router.push(`${router.asPath}/discover`)}
                  >
                    Discover web3 credentials
                  </button>
                  <button
                    disabled={
                      !!profileCompletionData?.['highlight_credentials']
                    }
                    className={clsx(
                      'm-0 p-0 pb-3 pt-3 text-left font-sans text-xs font-medium text-indigoGray-90 hover:text-indigoGray-60 lg:px-[10px] lg:pt-0 lg:pb-0 lg:font-semibold',
                      profileCompletionData?.['highlight_credentials'] &&
                        !!highlightedCredentials.data?.length &&
                        'cursor-not-allowed font-medium text-indigoGray-40 line-through'
                    )}
                    onClick={() =>
                      router.push(`${router.asPath}/credentials/highlight`)
                    }
                  >
                    Highlight credentials
                  </button>
                  <button
                    disabled={!!profileCompletionData?.['connect_social_media']}
                    className={clsx(
                      'm-0 p-0 pb-3 pt-3 text-left font-sans text-xs font-medium text-indigoGray-90 hover:text-indigoGray-60 lg:px-[10px] lg:pt-0 lg:pb-0 lg:font-semibold',
                      profileCompletionData?.['connect_social_media'] &&
                        'cursor-not-allowed font-medium text-indigoGray-40 line-through'
                    )}
                    onClick={() => router.push(`${router.asPath}/edit`)}
                  >
                    Connect social media
                  </button>
                  <button
                    disabled={!!profileCompletionData?.['email_verified']}
                    className={clsx(
                      'm-0 p-0 pb-3 pt-3 text-left font-sans text-xs font-medium text-indigoGray-90 hover:text-indigoGray-60 lg:px-[10px] lg:pt-0 lg:pb-0 lg:font-semibold',
                      profileCompletionData?.['email_verified'] &&
                        'cursor-not-allowed font-medium text-indigoGray-40 line-through'
                    )}
                    onClick={() => router.push(`${router.asPath}/edit`)}
                  >
                    Verify email
                  </button>
                </>
              ) : (
                <p className="font-sans text-xs text-indigoGray-90">
                  Congrats, you just created your first web3 native resume!
                </p>
              )}
            </div>
          )}
        </div>
      )}

      <div className="lg:hidden">{profileSummaryAccordion}</div>

      <div className="flex flex-col space-y-4 xl:flex-row xl:space-x-6 xl:space-y-0">
        <CredentialsSection
          credentials={credentials}
          isOwnProfile={isOwnProfile}
          loading={isLoading || highlightedCredentials.isLoading}
          hasHighlightedCredentials={hasHighlightedCredentials}
          // commonCredentials={
          //   isOwnProfile ? undefined : dummyCredentials.slice(0, 2)
          // }
        />
        <WritingSection
          loading={(!!lensId && isLensLoading) || isMirrorLoading}
          lensPost={lensPost?.items}
          mirrorPost={mirrorPost}
          author={author}
        />
      </div>
    </div>
  );
};

const SectionWrapper: React.FC<{
  title: string;
  icon: React.ReactNode;
  url: string;
}> = ({ title, icon, children, url }) => {
  return (
    <div className="h-fit grow rounded-lg bg-indigoGray-5 px-6 pb-4 lg:h-[580px] lg:overflow-y-auto lg:pb-2 xl:max-w-[50%]">
      <div className="sticky top-0 flex items-center space-x-2 bg-indigoGray-5 py-4 text-indigoGray-50 hover:text-indigoGray-70">
        {icon}
        <Link
          href={url}
          className={clsx(
            'font-sansMid text-sm font-medium text-inherit',
            !url && 'pointer-events-none'
          )}
        >
          {title}
        </Link>
        <SVG src="/icons/chevron-right.svg" height={16} width={16} />
      </div>
      {children}
    </div>
  );
};

const CredentialsSection: React.FC<{
  credentials: Badge[];
  isOwnProfile: boolean;
  commonCredentials?: DummyCrendential[];
  loading?: boolean;
  hasHighlightedCredentials: boolean;
}> = ({
  credentials,
  isOwnProfile,
  commonCredentials,
  loading,
  hasHighlightedCredentials,
}) => {
  const router = useRouter();
  const hasCredentials = !!credentials?.length;

  return (
    <SectionWrapper
      icon={
        <SVG
          src={'/icons/credentials.svg'}
          height={16}
          width={16}
          className="text-inherit"
        />
      }
      title={
        hasHighlightedCredentials
          ? 'Highlighted credentials'
          : 'Top credentials'
      }
      url={
        isOwnProfile
          ? `${
              router.asPath +
              (hasHighlightedCredentials
                ? '/credentials/highlight'
                : '/credentials')
            }`
          : ''
      }
    >
      <div className="space-y-10">
        <div
          className={clsx(
            'flex flex-col items-center justify-center',
            !hasCredentials && 'min-h-[331px] pt-8'
          )}
        >
          {loading ? (
            <div className="mb-[85px] w-full space-y-4">
              {skeletons.map((item, index) => (
                <Credential.Skeleton key={index + item} />
              ))}
            </div>
          ) : hasCredentials ? (
            <div className="space-y-4">
              {credentials.map(({ badge_type, id }) => (
                <Credential
                  key={id}
                  title={badge_type.title}
                  description={badge_type.description}
                  onSelect={() =>
                    router.push(`${router.asPath}/credentials/${id}`)
                  }
                  imageSrc={badge_type.image}
                  totalSupply={badge_type.total_supply}
                  variant={badge_type.issuer.name}
                />
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center">
              <SVG src="/icons/no-credentials.svg" width={227} height={70} />
              <p className="font-sans text-sm text-indigoGray-90">
                No web3 credentials yet
              </p>
            </div>
          )}
          {!loading && (
            <div
              className={clsx(
                ' w-fit self-center',
                hasCredentials && 'mb-[85px] mt-9'
              )}
            >
              <Link
                href={`/people/${router.query.address}/discover`}
                className={!isOwnProfile ? 'invisible' : ''}
              >
                <div className="flex items-center rounded-lg p-2 text-center font-sans text-xs font-semibold text-indigo-600 hover:bg-indigoGray-10">
                  <p className="rm-2">Discover web3 credentials</p>
                  <SVG
                    src="/icons/chevron-right.svg"
                    height={16}
                    width={16}
                    className="text-indigo-600"
                  />
                </div>
              </Link>
            </div>
          )}
        </div>

        {commonCredentials && (
          <div className="space-y-4">
            <p className="font-sansMid text-sm font-medium text-indigoGray-50">
              Credentials you have in common
            </p>

            <div className="space-y-4">
              {commonCredentials.map((credential) => (
                <Credential
                  key={credential.id + credential.title}
                  title={credential.title}
                  description={credential.description}
                  onSelect={() => {}}
                  imageSrc={credential.image}
                  totalSupply={credential.ownedBy}
                />
              ))}
            </div>
          </div>
        )}
      </div>
    </SectionWrapper>
  );
};

const WritingSection: React.FC<{
  loading?: boolean;
  lensPost?: LensPublication['items'];
  mirrorPost?: Post[];
  author: {
    username: string;
    avatar: string;
  };
}> = ({ loading, mirrorPost, lensPost, author }) => {
  const router = useRouter();

  return (
    <SectionWrapper
      icon={
        <SVG
          src={'/icons/content.svg'}
          height={16}
          width={16}
          className="text-inherit"
        />
      }
      title="Content"
      url={router.asPath + '/content'}
    >
      {loading ? (
        <div className="mb-[85px] w-full space-y-4">
          {skeletons.map((_, index) => (
            <div
              key={`writing-skeleton-${index}`}
              className={`w-full space-y-3 rounded-lg bg-indigoGray-5 py-3 pl-4 pr-[10px]`}
            >
              <div className="flex items-center space-x-2">
                <div className="h-8 w-8 animate-pulse rounded-full bg-indigoGray-30" />
                <div className="h-4 w-[60%] animate-pulse rounded-lg bg-indigoGray-30" />
              </div>

              <div className="h-5 w-[90%] animate-pulse rounded-lg bg-indigoGray-30" />

              <div className="h-full grow space-y-1">
                <div className="h-4 w-full animate-pulse rounded-lg bg-indigoGray-30" />
                <div className="h-4 w-full animate-pulse rounded-lg bg-indigoGray-30" />
                <div className="h-4 w-full animate-pulse rounded-lg bg-indigoGray-30" />
              </div>
            </div>
          ))}
        </div>
      ) : mirrorPost?.length || lensPost?.length ? (
        <>
          <>
            {mirrorPost?.map((writing) => {
              return (
                <MirrorPost hideBanner={true} key={writing.id} {...writing} />
              );
            })}

            {lensPost?.slice(0, 8 - (mirrorPost?.length || 0)).map((post) => {
              if (!post?.id) return null;

              return (
                <LensPost
                  key={post.id}
                  replies={post.stats.totalAmountOfComments}
                  quotes={post.stats.totalAmountOfMirrors}
                  likes={post.stats.totalUpvotes}
                  saves={post.stats.totalAmountOfCollects}
                  url={`https://lenster.xyz/posts/${post.id}`}
                  description={post.metadata.content}
                  author={author}
                />
              );
            })}
          </>
        </>
      ) : (
        <div className="flex min-h-[331px] flex-col items-center justify-center pt-8">
          <SVG width={202} height={70} src="/icons/no-content.svg" />
          <p className="text-center font-sans text-sm text-indigoGray-90">
            No content on web3 social yet
          </p>
          <div className="flex items-center space-x-8">
            <a
              target="_blank"
              rel="noreferrer"
              className="flex cursor-pointer items-center space-x-2 rounded-lg p-2 text-[#01501F] hover:bg-indigoGray-10"
              href="https://www.lens.xyz"
            >
              <SVG src="/icons/lens-green.svg" height={16} width={16} />
              <span className="font-sans text-xs font-semibold text-inherit">
                Discover Lens
              </span>
              <SVG
                src="/icons/chevron-right.svg"
                height={16}
                width={16}
                className="text-[#01501F]"
              />
            </a>
            <a
              target="_blank"
              rel="noreferrer"
              className="flex cursor-pointer items-center space-x-2 rounded-lg p-2 text-blue-600 hover:bg-indigoGray-10"
              href="https://www.mirror.xyz"
            >
              <SVG src="/icons/mirror-icon-blue.svg" height={16} width={16} />
              <span className="font-sans text-xs font-semibold text-inherit">
                Discover Mirror
              </span>
              <SVG
                src="/icons/chevron-right.svg"
                height={16}
                width={16}
                className="text-blue-600"
              />
            </a>
          </div>
        </div>
      )}
    </SectionWrapper>
  );
};

export const getProfileCompletion = async (address: string) => {
  const { data } = await axios.get<ProfileCompletion>(
    `/profiles/${address}/completion`
  );
  return data;
};

const getHighlightedCredentials = async (address: string) => {
  const { data } = await axios.get<ListResponse<Badge>>('/badges', {
    params: {
      highlighted: true,
      owner: address,
    },
  });
  return data.results;
};

export const useHighlightedCredentials = (address: string) => {
  return useQuery({
    queryKey: clsx('highlightedCredentials', address).split(' '),
    queryFn: () => getHighlightedCredentials(address),
    enabled: !!address,
  });
};
