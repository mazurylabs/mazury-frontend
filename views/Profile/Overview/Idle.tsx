import * as React from 'react';
import { useRouter } from 'next/router';
import SVG from 'react-inlinesvg';
import { QueryClient, useQuery } from 'react-query';
import clsx from 'clsx';
import Link from 'next/link';
import { Progress } from 'components';
import { axios } from 'lib/axios';
import { Badge, ListResponse } from 'types';
import { useBadges } from 'hooks';

import { OverviewViews } from 'pages/people/[address]';
import { Credential } from '../Credential';

interface IdleProps {
  handleNavigateViews: (view: OverviewViews) => void;
  address: string;
  isOwnProfile: boolean;
  profileSummaryAccordion: React.ReactNode;
}

type DummyCrendential = {
  id: number;
  title: string;
  description: string;
  ownedBy: number;
  image: string;
};

const skeletons = Array(5).fill('skeleton');

export const Idle = ({
  handleNavigateViews,
  address,
  isOwnProfile,
  profileSummaryAccordion,
}: IdleProps) => {
  const router = useRouter();
  const [showLess, setShowLess] = React.useState(false);
  const queryClient = new QueryClient();

  const profileCompletion = useQuery({
    queryKey: 'profileCompletion',
    queryFn: () => getProfileCompletion(address),
    enabled: isOwnProfile,
  });

  const highlightedCredentials = useHighlightedCredentials(address);

  const hasHighlightedCredentials = !!highlightedCredentials.data?.length;

  const { badges, isLoading } = useBadges(
    address,
    undefined,
    8,
    undefined,
    !hasHighlightedCredentials && !!address
  );

  const handleMazuryTalent = async () => {
    await axios.post(`/profiles/${address}/mazury_talent/`, {});
    queryClient.invalidateQueries('profileCompletion');
  };

  const credentials = hasHighlightedCredentials
    ? highlightedCredentials.data || []
    : badges;

  const profileCompletionData = profileCompletion.data;
  const completionDataArray = Object.values(profileCompletionData || {});
  const completedData = completionDataArray.filter(Boolean).length;

  return (
    <div className="space-y-4 lg:space-y-6">
      {isOwnProfile && (
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
            <div className="border-t-none flex flex-col rounded-b-lg border border-indigoGray-20 py-3 px-6 lg:flex-row">
              {completedData !== 5 ? (
                <>
                  <button
                    disabled={!!profileCompletionData?.['personal_information']}
                    className={clsx(
                      'm-0 shrink-0 border-b border-b-indigoGray-20 p-0 pb-3 text-left font-sans text-xs font-medium text-indigoGray-90 lg:border-transparent lg:pr-[10px] lg:pb-0 lg:font-semibold',
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
                      'm-0 shrink-0 border-b border-b-indigoGray-20 border-l-indigoGray-20 p-0 pb-3 pt-3 text-left font-sans text-xs font-medium text-indigoGray-90 lg:border-l lg:border-transparent lg:pt-0 lg:pb-0 lg:pl-[10px] lg:pr-[10px] lg:font-semibold',
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
                      'm-0 shrink-0 border-b border-b-indigoGray-20 border-l-indigoGray-20 p-0 pb-3 pt-3 text-left font-sans text-xs font-medium text-indigoGray-90 lg:border-l lg:border-transparent lg:pt-0 lg:pb-0 lg:pl-[10px] lg:pr-[10px] lg:font-semibold',
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
                      'm-0 shrink-0 border-b border-b-indigoGray-20 border-l-indigoGray-20 p-0 pb-3 pt-3 text-left font-sans text-xs font-medium text-indigoGray-90 lg:border-l lg:border-transparent lg:pt-0 lg:pb-0 lg:pl-[10px] lg:pr-[10px] lg:font-semibold',
                      profileCompletionData?.['connect_social_media'] &&
                        'cursor-not-allowed font-medium text-indigoGray-40 line-through'
                    )}
                    onClick={() => handleNavigateViews('social')}
                  >
                    Connect social media
                  </button>
                  <a
                    target="_blank"
                    rel="noreferrer"
                    href={`https://airtable.com/shr7Cjchcji8zMay7?prefill_Mazury+profile=https://app.mazury.xyz/people/${address}`}
                    className={clsx(
                      '!m-0 shrink-0 border-l-indigoGray-20 !p-0 !pt-3 font-sans !text-xs !font-medium text-indigoGray-90 lg:border-l lg:!pt-0 lg:!pl-[10px] lg:!pr-[10px] lg:!font-semibold',
                      profileCompletionData?.['sign_up_mazury_talent'] &&
                        'pointer-events-none font-medium text-indigoGray-40 line-through'
                    )}
                    onClick={handleMazuryTalent}
                  >
                    Learn about Mazury Talent
                  </a>
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

      <div className="flex flex-col space-y-4 lg:flex-row lg:space-x-6 lg:space-y-0">
        <CredentialsSection
          credentials={credentials}
          isOwnProfile={isOwnProfile}
          loading={isLoading || highlightedCredentials.isLoading}
          hasHighlightedCredentials={hasHighlightedCredentials}
          // commonCredentials={
          //   isOwnProfile ? undefined : dummyCredentials.slice(0, 2)
          // }
        />
        <WritingSection />
      </div>
    </div>
  );
};

const SectionWrapper: React.FC<{ title: string; icon: string }> = ({
  title,
  icon,
  children,
}) => {
  return (
    <div className="h-fit grow space-y-4 rounded-lg bg-indigoGray-5 py-4 px-6 lg:max-w-[50%]">
      <div className="flex items-center space-x-2">
        <SVG src={icon} height={16} width={16} />
        <p className="font-sansMid text-sm font-medium text-indigoGray-50">
          {title}
        </p>
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
      icon="/icons/credentials-grey.svg"
      title={
        hasHighlightedCredentials
          ? 'Highlighted credentials'
          : 'Top credentials'
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
                  onSelect={() => {}}
                  imageSrc={badge_type.image}
                  totalSupply={badge_type.total_supply}
                />
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center">
              <SVG
                src="/icons/empty-credentials-listing.svg"
                width={225}
                height={91}
              />
              <p className="font-sans text-sm text-indigoGray-90">
                For now this user doesn’t have any credentials
              </p>
            </div>
          )}
          {isOwnProfile && !loading && (
            <div
              className={clsx(
                'mt-5 w-fit self-center',
                hasCredentials && 'mb-[85px] mt-9'
              )}
            >
              <Link href={`/people/${router.query.address}/discover`}>
                <a className="text-center font-sans text-xs font-semibold text-indigo-600">
                  Discover web3 credentials
                </a>
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

const WritingSection = () => {
  return (
    <SectionWrapper icon="/icons/writing-grey.svg" title="Highlighted writing">
      <div className="flex min-h-[331px] flex-col items-center justify-center space-y-4 pt-8">
        <SVG width={169} height={60} src="/icons/credentials-listing.svg" />
        <p className="text-center font-sans text-sm text-indigoGray-90">
          Discover Mirror and Lenster to show off your web3 network and
          knowledge
        </p>
        <div className="flex items-center space-x-8">
          <a
            target="_blank"
            rel="noreferrer"
            className="flex cursor-pointer items-center space-x-2"
            href="https://www.lens.xyz"
          >
            <SVG src="/icons/lens-green.svg" height={16} width={16} />
            <span className="font-sans text-xs font-semibold text-[#01501F]">
              Discover Lens
            </span>
            <SVG src="/icons/chevron-right-green.svg" height={16} width={16} />
          </a>
          <a
            target="_blank"
            rel="noreferrer"
            className="flex cursor-pointer items-center space-x-2"
            href="https://www.mirror.xyz"
          >
            <SVG src="/icons/mirror-icon-blue.svg" height={16} width={16} />
            <span className="font-sans text-xs font-semibold text-blue-600">
              Discover Mirror
            </span>
            <SVG src="/icons/chevron-right-blue.svg" height={16} width={16} />
          </a>
        </div>
      </div>
    </SectionWrapper>
  );
};

export const getProfileCompletion = async (address: string): Promise<any> => {
  //write proper types
  const { data } = await axios.get(`/profiles/${address}/completion`);
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
