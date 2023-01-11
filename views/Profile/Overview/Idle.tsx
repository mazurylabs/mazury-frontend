import * as React from 'react';
import { useRouter } from 'next/router';
import SVG from 'react-inlinesvg';

import { OverviewViews } from 'pages/people/[address]';
import { Progress } from 'components';
import { Credential } from '../Credential';

interface IdleProps {
  handleNavigateViews: (view: OverviewViews) => void;
  address?: string;
  isOwnProfile: boolean;
}

type DummyCrendential = {
  id: number;
  title: string;
  description: string;
  ownedBy: number;
  image: string;
};

const dummyCredentials = [
  {
    id: 1,
    title: 'Hardhat OSS Contributor 2022',
    description: 'The holder of this badge has successfully finished',
    ownedBy: 1234,
    image: '/icons/dummyCredential.svg',
  },
  {
    id: 2,
    title: 'Hardhat OSS Contributor 2022',
    description: 'The holder of this badge has successfully finished',
    ownedBy: 1234,
    image: '/icons/dummyCredential.svg',
  },
  {
    id: 3,
    title: 'Hardhat OSS Contributor 2022',
    description: 'The holder of this badge has successfully finished',
    ownedBy: 1234,
    image: '/icons/dummyCredential.svg',
  },
];

export const Idle = ({
  handleNavigateViews,
  address,
  isOwnProfile,
}: IdleProps) => {
  const router = useRouter();
  const [showLess, setShowLess] = React.useState(false);

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
                total={4}
                current={3}
                label="complete"
                size="small"
                variant="dark"
              />
            </div>
            <button
              className="m-0 p-0 font-sansMid text-sm font-medium text-indigoGray-5"
              onClick={() => setShowLess(!showLess)}
            >
              {showLess ? 'Show less' : 'Show more'}
            </button>
          </div>

          {!showLess && (
            <div className="border-t-none flex rounded-b-lg border border-indigoGray-20 py-3 px-6">
              <button
                className="m-0 shrink-0 p-0 pr-[10px] font-sansSemi text-xs font-semibold text-indigoGray-90"
                onClick={() => router.push(`${router.asPath}/edit`)}
              >
                Add personal information
              </button>
              <button
                className="!m-0 shrink-0 border-l border-l-indigoGray-20 !p-0 !pl-[10px] !pr-[10px] font-sansSemi  !text-xs !font-semibold text-indigoGray-90"
                onClick={() => handleNavigateViews('discover')}
              >
                Discover web3 credentials
              </button>
              <button
                className="!m-0 shrink-0 border-l border-l-indigoGray-20 !p-0 !pl-[10px] !pr-[10px] font-sansSemi  !text-xs !font-semibold text-indigoGray-90"
                onClick={() =>
                  router.push(`${router.asPath}/credentials/highlight`)
                }
              >
                Highlight credentials
              </button>
              <button
                className="!m-0 shrink-0 border-l border-l-indigoGray-20 !p-0 !pl-[10px] !pr-[10px] font-sansSemi  !text-xs !font-semibold text-indigoGray-90"
                onClick={() => handleNavigateViews('social')}
              >
                Connect social media
              </button>
              <a
                target="_blank"
                rel="noreferrer"
                href={`https://airtable.com/shr7Cjchcji8zMay7?prefill_Mazury+profile=https://app.mazury.xyz/people/${address}`}
                className="!m-0 shrink-0 border-l border-l-indigoGray-20 !p-0 !pl-[10px] !pr-[10px] font-sansSemi  !text-xs !font-semibold text-indigoGray-90"
              >
                Sign up for Mazury Talent
              </a>
            </div>
          )}
        </div>
      )}
      <div className="flex space-x-6">
        <CredentialsSection
          credentials={dummyCredentials}
          handleNavigateViews={handleNavigateViews}
          isOwnProfile={isOwnProfile}
          commonCredentials={
            isOwnProfile ? undefined : dummyCredentials.slice(0, 2)
          }
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
  credentials: DummyCrendential[];
  handleNavigateViews: (view: OverviewViews) => void;
  isOwnProfile: boolean;
  commonCredentials?: DummyCrendential[];
}> = ({
  credentials,
  handleNavigateViews,
  isOwnProfile,
  commonCredentials,
}) => {
  return (
    <SectionWrapper icon="/icons/credentials-grey.svg" title="Top credentials">
      <div className="space-y-10">
        <div className="flex flex-col">
          <div className="space-y-4">
            {credentials.map((credential) => (
              <Credential
                key={credential.id}
                title={credential.title}
                description={credential.description}
                onSelect={() => {}}
                imageSrc={credential.image}
                totalSupply={credential.ownedBy}
              />
            ))}
          </div>
          {isOwnProfile && (
            <div className="mb-[85px] mt-9 w-fit self-center">
              <button
                type="button"
                onClick={() => handleNavigateViews('discover')}
                className="text-center font-sans text-xs font-semibold text-indigo-600"
              >
                Discover web3 credentials
              </button>
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
        <p className="text-center font-sans text-indigoGray-90">
          Discover Mirror and Lenster to show off your web3 network and
          knowledge
        </p>
        <div className="flex items-center space-x-8">
          <a
            target="_blank"
            rel="noreferrer"
            className="flex cursor-pointer items-center space-x-2"
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
