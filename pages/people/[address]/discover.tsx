import * as React from 'react';
import { NextPageContext } from 'next';
import SVG from 'react-inlinesvg';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import { Layout, Progress } from 'components';
import { Container, ProfileSummary } from 'views/Profile';
import { useAccount } from 'hooks';

import { axios } from 'lib/axios';
import { capitalize } from 'utils';

interface ProfileProps {
  address: string;
}

interface CredentialProps {
  title: string;
  icon: string;
  description: string;
  url: string;
  isViewed?: boolean;
  onClickExternalUrl: () => void;
}

export type OverviewViews = 'idle' | 'discover' | 'social';

const Discover = ({ address }: ProfileProps) => {
  const [selectedFilter, setSelectedFilter] = React.useState('All');
  const { user, accountInView, isOwnProfile } = useAccount(address);
  const queryClient = useQueryClient();

  const { data } = useQuery({
    queryKey: ['discover', address],
    queryFn: () => getDiscoverCredentials(address),
    enabled: isOwnProfile,
  });

  const { mutate } = useDiscoverCredentials({
    onComplete: (data) => {
      queryClient.setQueryData<DiscoverCredentials>(
        ['discover', address],
        (prev) => ({
          issuers:
            prev?.issuers.map((item) =>
              item.issuer.name === data ? { ...item, discovered: true } : item
            ) || [],
        })
      );
    },
  });

  const filterCategories =
    data?.issuers
      .reduce((prev, next, index) => {
        prev.push(...next.issuer.categories);
        return prev;
      }, [] as string[])
      .reduce((prev, next) => {
        return { ...prev, [next]: prev[next] + 1 || 1 };
      }, {} as Record<string, number>) || {};

  const progress =
    data?.issuers.reduce((prev, next) => {
      return prev + (!!next.discovered ? 1 : 0);
    }, 0) || 0;

  return (
    <Layout variant="plain" showMobileSidebar={false}>
      <Container
        title={'Discover web3 credentials'}
        summary={
          <ProfileSummary
            address={address}
            profile={accountInView}
            user={user}
            isOwnProfile={isOwnProfile}
            loading={!accountInView}
          />
        }
      >
        <div>
          <div className="mb-7 space-y-7">
            <div className="flex space-x-5 overflow-x-auto">
              <FilterButton
                isSelected={selectedFilter === 'All'}
                title="All"
                handleSelect={() => setSelectedFilter('All')}
                value={data?.issuers.length || 0}
              />
              {Object.keys(filterCategories).map((category) => (
                <FilterButton
                  key={category}
                  title={category}
                  isSelected={selectedFilter === category}
                  handleSelect={() => setSelectedFilter(category)}
                  value={filterCategories[category]}
                />
              ))}
            </div>

            <Progress
              total={data?.issuers.length || 0}
              current={progress}
              label="read"
              size="large"
              variant="light"
            />
          </div>

          <div className="lg:grid lg:grid-cols-3">
            {data?.issuers.map((issuer) => {
              if (selectedFilter === 'All') {
                return (
                  <Credential
                    key={issuer.issuer.name}
                    title={issuer.issuer.name}
                    description={issuer.issuer.description}
                    icon={issuer.issuer.logo_url}
                    url={issuer.issuer.external_url}
                    isViewed={issuer.discovered}
                    onClickExternalUrl={() =>
                      mutate({ data: issuer.issuer.name, address })
                    }
                  />
                );
              } else if (issuer.issuer.categories.includes(selectedFilter)) {
                return (
                  <Credential
                    key={issuer.issuer.name}
                    title={issuer.issuer.name}
                    description={issuer.issuer.description}
                    icon={issuer.issuer.logo_url}
                    url={issuer.issuer.external_url}
                    isViewed={issuer.discovered}
                    onClickExternalUrl={() =>
                      mutate({ data: issuer.issuer.name, address })
                    }
                  />
                );
              }
            })}
          </div>
        </div>
      </Container>
    </Layout>
  );
};

export default Discover;

type DiscoverCredentials = {
  issuers: {
    discovered: boolean;
    issuer: {
      categories: string[];
      description: string;
      display_name: string;
      external_url: string;
      logo_url: string;
      name: string;
    };
  }[];
};

const getDiscoverCredentials = async (address: string) => {
  const { data } = await axios.get<DiscoverCredentials>(`/discover/${address}`);
  return data;
};

export const discoverCredential = ({
  data,
  address,
}: {
  data: string;
  address: string;
}) => {
  return axios.patch(`/discover/${address}`, {
    issuer: data,
    discovered: true,
  });
};

export const useDiscoverCredentials = ({
  onComplete,
}: {
  onComplete?: (data: string) => void;
}) => {
  return useMutation({
    onSuccess: (_, variable) => {
      console.log(variable.data);
      onComplete?.(variable.data);
    },
    mutationFn: discoverCredential,
  });
};

export const getServerSideProps = async (context: NextPageContext) => {
  return {
    props: {
      address: context.query.address,
    },
  };
};

const FilterButton = ({
  title,
  value,
  isSelected,
  handleSelect,
}: {
  title: string;
  value: number;
  isSelected?: boolean;
  handleSelect: () => void;
}) => {
  return (
    <button
      type="button"
      className={`flex shrink-0 space-x-2 rounded-md bg-${
        isSelected ? 'indigoGray-90' : 'transparent'
      } py-2 px-3`}
      onClick={handleSelect}
    >
      <span
        className={`text-${
          isSelected
            ? 'indigo-50 font-sansSemi font-semibold'
            : 'indigoGray-90 font-sansMid font-medium'
        }`}
      >
        {title}
      </span>
      {value && (
        <span className={`text-indigoGray-${isSelected ? '5' : '40'}`}>
          {value}
        </span>
      )}
    </button>
  );
};

const Credential = ({
  title,
  icon,
  description,
  url,
  isViewed,
  onClickExternalUrl,
}: CredentialProps) => {
  return (
    <div
      className={`relative mr-6 mb-8 flex w-full flex-col items-center rounded-lg border text-center lg:max-w-[259px] ${
        isViewed ? 'border-2 border-green-600' : 'border-indigoGray-20'
      } p-4`}
    >
      <img
        src={icon}
        className="mb-3 h-4 w-4 object-contain"
        alt={title}
        onError={(event) => {
          event.currentTarget.src = '/icons/brokenImage.svg';
          event.currentTarget.classList.add('!h-8', '!w-8');
        }}
      />
      <p className="mb-4 font-serif text-xl font-semibold text-indigoGray-90">
        {capitalize(title)}
      </p>
      <p className="mb-5 font-sans text-sm text-indigoGray-90">{description}</p>
      <a
        onClick={isViewed ? undefined : onClickExternalUrl}
        target="_blank"
        rel="noreferrer"
        className="flex space-x-2 rounded-lg bg-indigoGray-5 py-1 px-6"
        href={url}
      >
        <span className="font-sansSemi text-sm font-semibold text-indigoGray-90">
          Visit {capitalize(title)}
        </span>
        <SVG height={16} width={16} src="/icons/external-link-black.svg" />
      </a>

      {isViewed && (
        <div className="absolute top-0 right-0 translate-x-[35%] translate-y-[-35%] bg-white p-1">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-green-600">
            <SVG width={21} height={18} src="/icons/checkbox.svg" />
          </div>
        </div>
      )}
    </div>
  );
};
