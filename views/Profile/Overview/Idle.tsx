import * as React from 'react';
import { useRouter } from 'next/router';
import SVG from 'react-inlinesvg';
import { QueryClient, useQuery } from 'react-query';
import clsx from 'clsx';
import Axios from 'axios';
import Link from 'next/link';

import { OverviewViews } from 'pages/people/[address]';
import { Progress } from 'components';
import { Credential } from '../Credential';
import { axios } from 'lib/axios';
import { Badge } from 'types';
import { useBadges } from 'hooks';

interface IdleProps {
  handleNavigateViews: (view: OverviewViews) => void;
  address: string;
  isOwnProfile: boolean;
  highlightedCredentials?: Badge[];
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
  highlightedCredentials,
}: IdleProps) => {
  const hasHighlightedCredentials = !!highlightedCredentials?.length;
  const router = useRouter();
  const [showLess, setShowLess] = React.useState(false);
  const queryClient = new QueryClient();

  const profileCompletion = useQuery({
    queryKey: 'profileCompletion',
    queryFn: () => getProfileCompletion(address),
    enabled: isOwnProfile,
  });

  const { badges, isLoading } = useBadges(
    address,
    undefined,
    8,
    undefined,
    !hasHighlightedCredentials
  );

  const handleMazuryTalent = async () => {
    await axios.post(`/profiles/${address}/mazury_talent/`, {});
    queryClient.invalidateQueries('profileCompletion');
  };

  const credentials = hasHighlightedCredentials
    ? highlightedCredentials
    : badges;

  const profileCompletionData = profileCompletion.data;
  const completionDataArray = Object.values(profileCompletionData || {});

  return (
    <div className="space-y-6">
      {isOwnProfile && (
        <div className="overflow-hidden rounded-lg lg:max-w-[826.6px]">
          <div className="flex w-full items-center justify-between bg-indigoGray-90 py-3 px-6">
            <div className="flex items-center space-x-8">
              <p className="font-sans text-sm font-semibold text-indigoGray-5">
                Complete your profile
              </p>
              <Progress
                total={completionDataArray.length}
                current={completionDataArray.filter(Boolean).length}
                label="complete"
                size="small"
                variant="dark"
              />
            </div>
            <button
              className="m-0 p-0 font-sansMid text-sm font-medium text-indigoGray-5"
              onClick={() => setShowLess(!showLess)}
            >
              {showLess ? 'Show more' : 'Show less'}
            </button>
          </div>

          {!showLess && (
            <div className="border-t-none flex rounded-b-lg border border-indigoGray-20 py-3 px-6">
              <button
                disabled={!!profileCompletionData?.['personal_information']}
                className={clsx(
                  'm-0 shrink-0 p-0 pr-[10px] font-sansSemi text-xs font-semibold text-indigoGray-90',
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
                  'm-0 shrink-0 border-l border-l-indigoGray-20 p-0 pl-[10px] pr-[10px] font-sansSemi text-xs font-semibold text-indigoGray-90',
                  profileCompletionData?.['discover_web3_credentials'] &&
                    'cursor-not-allowed font-medium text-indigoGray-40 line-through'
                )}
                onClick={() => router.push(`${router.asPath}/discover`)}
              >
                Discover web3 credentials
              </button>
              <button
                disabled={!!profileCompletionData?.['highlight_credentials']}
                className={clsx(
                  'm-0 shrink-0 border-l border-l-indigoGray-20 p-0 pl-[10px] pr-[10px] font-sansSemi text-xs font-semibold text-indigoGray-90',
                  profileCompletionData?.['highlight_credentials'] &&
                    !!highlightedCredentials?.length &&
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
                  'm-0 shrink-0 border-l border-l-indigoGray-20 p-0 pl-[10px] pr-[10px] font-sansSemi text-xs font-semibold text-indigoGray-90',
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
                  '!m-0 shrink-0 border-l border-l-indigoGray-20 !p-0 !pl-[10px] !pr-[10px] font-sansSemi  !text-xs !font-semibold text-indigoGray-90',
                  profileCompletionData?.['sign_up_mazury_talent'] &&
                    'pointer-events-none font-medium text-indigoGray-40 line-through'
                )}
                onClick={handleMazuryTalent}
              >
                Learn about Mazury Talent
              </a>
            </div>
          )}
        </div>
      )}
      <div className="flex space-x-6">
        <CredentialsSection
          credentials={credentials}
          isOwnProfile={isOwnProfile}
          loading={isLoading}
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
    <div className="h-fit max-w-[50%] grow space-y-4 rounded-lg bg-indigoGray-5 py-4 px-6">
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
        <SVG width={149} height={53} src="/icons/credentials-listing.svg" />
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

export const getHighlightedCredentials = async (
  address: string
): Promise<any> => {
  //write proper types
  const { data } = await Axios.get(
    'https://mazury-staging.herokuapp.com/badges',
    {
      params: {
        highlighted: true,
        owner: address,
      },
    }
  );
  return data.results;
};
