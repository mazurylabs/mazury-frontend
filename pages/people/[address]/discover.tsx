import * as React from 'react';
import { NextPageContext } from 'next';
import SVG from 'react-inlinesvg';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import { Layout, Progress } from 'components';
import { Container, ProfileSummary } from 'views/Profile';
import { useAccount } from 'hooks';

import { axios } from 'lib/axios';
import { capitalize, formatProfileRoute } from 'utils';
import { useRouter } from 'next/router';
import { ethers } from 'ethers';

interface ProfileProps {
  ethAddress: string;
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

const Discover = ({ ethAddress }: ProfileProps) => {
  const [selectedFilter, setSelectedFilter] = React.useState('All');
  const { user, accountInView, isOwnProfile } = useAccount(ethAddress);
  const queryClient = useQueryClient();
  const router = useRouter();

  const address = ethers.utils.isAddress(ethAddress)
    ? ethAddress
    : accountInView?.eth_address || '';

  const { data, isLoading } = useQuery({
    queryKey: ['discover', address],
    queryFn: () => getDiscoverCredentials(address),
    enabled: isOwnProfile && !!address,
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

  if (!isOwnProfile) {
    router.push(`/people/${address}`);
    return null;
  }

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
        {isLoading ? (
          <Skeleton />
        ) : (
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

            <div className="lg:grid lg:grid-cols-2 lg:gap-6 xl:grid-cols-3">
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
        )}
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
  const address = context.query.address as string;

  const url = context.resolvedUrl || '';

  const { ethAddress, normalisedRoute } = formatProfileRoute(url, address);

  if (!ethers.utils.isAddress(address) && !address.includes('.eth')) {
    return {
      redirect: {
        destination: normalisedRoute,
        permanent: false,
      },
      props: { ethAddress },
    };
  }

  return {
    props: {
      ethAddress,
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
        } hover:text-indigoGray-60`}
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
      className={`relative mr-6 mb-8 flex w-full flex-col items-center rounded-lg border text-center hover:shadow-lg xl:max-w-[259px] ${
        isViewed ? 'border-2 border-green-600' : 'border-indigoGray-20'
      } p-4`}
    >
      <div className="mb-3 h-[56px] w-[56px]">
        <img
          src={icon || '/icons/brokenImage.svg'}
          className="h-[56px] w-[56px] object-contain"
          alt={title}
          onError={(event) => {
            event.currentTarget.src = '/icons/brokenImage.svg';
          }}
        />
      </div>
      <p className="mb-4 font-serif text-xl font-semibold text-indigoGray-90">
        {capitalize(title)}
      </p>
      <p className="mb-5 font-sans text-sm text-indigoGray-90">{description}</p>
      <a
        onClick={isViewed ? undefined : onClickExternalUrl}
        target="_blank"
        rel="noreferrer"
        className="mt-[auto] flex items-center space-x-2 rounded-lg bg-indigoGray-5 py-1 px-6"
        href={url}
      >
        <span className="font-sansSemi text-sm font-semibold text-indigoGray-90">
          Visit {capitalize(title)}
        </span>
        <SVG
          height={16}
          width={16}
          src="/icons/external-link.svg"
          className="text-indigoGray-90"
        />
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

const Skeleton = () => {
  return (
    <div className="space-y-6">
      <div className="flex space-x-4">
        <div className="h-[30px] w-[106px] animate-pulse rounded-2xl bg-indigoGray-30" />
        <div className="h-[30px] w-[106px] animate-pulse rounded-2xl bg-indigoGray-30" />
        <div className="h-[30px] w-[106px] animate-pulse rounded-2xl bg-indigoGray-30" />
        <div className="h-[30px] w-[106px] animate-pulse rounded-2xl bg-indigoGray-30" />
        <div className="h-[30px] w-[106px] animate-pulse rounded-2xl bg-indigoGray-30" />
      </div>

      <div className="h-[22px] w-[230px] animate-pulse rounded-2xl bg-indigoGray-30" />

      <div className="lg:grid lg:grid-cols-2 lg:gap-6 xl:grid-cols-3">
        <div className="flex h-[269px] w-[259px] flex-col items-center justify-center space-y-4 rounded-lg border border-indigoGray-20">
          <div className="flex flex-col items-center justify-center space-y-3">
            <div className="h-[57px] w-[57px] animate-pulse rounded-full bg-indigoGray-30" />
            <div className="h-3 w-[140px] animate-pulse rounded-lg bg-indigoGray-30" />
          </div>

          <div className="flex flex-col items-center justify-center space-y-1">
            <div className="h-3 w-[140px] animate-pulse rounded-lg bg-indigoGray-30" />
            <div className="h-3 w-[178px] animate-pulse rounded-lg bg-indigoGray-30" />
            <div className="h-3 w-[120px] animate-pulse rounded-lg bg-indigoGray-30" />
          </div>

          <div className="h-3 w-[120px] animate-pulse rounded-lg bg-indigoGray-30" />
        </div>

        <div className="flex h-[269px] w-[259px] flex-col items-center justify-center space-y-4 rounded-lg border border-indigoGray-20">
          <div className="flex flex-col items-center justify-center space-y-3">
            <div className="h-[57px] w-[57px] animate-pulse rounded-full bg-indigoGray-30" />
            <div className="h-3 w-[140px] animate-pulse rounded-lg bg-indigoGray-30" />
          </div>

          <div className="flex flex-col items-center justify-center space-y-1">
            <div className="h-3 w-[140px] animate-pulse rounded-lg bg-indigoGray-30" />
            <div className="h-3 w-[178px] animate-pulse rounded-lg bg-indigoGray-30" />
            <div className="h-3 w-[120px] animate-pulse rounded-lg bg-indigoGray-30" />
          </div>

          <div className="h-3 w-[120px] animate-pulse rounded-lg bg-indigoGray-30" />
        </div>

        <div className="flex h-[269px] w-[259px] flex-col items-center justify-center space-y-4 rounded-lg border border-indigoGray-20">
          <div className="flex flex-col items-center justify-center space-y-3">
            <div className="h-[57px] w-[57px] animate-pulse rounded-full bg-indigoGray-30" />
            <div className="h-3 w-[140px] animate-pulse rounded-lg bg-indigoGray-30" />
          </div>

          <div className="flex flex-col items-center justify-center space-y-1">
            <div className="h-3 w-[140px] animate-pulse rounded-lg bg-indigoGray-30" />
            <div className="h-3 w-[178px] animate-pulse rounded-lg bg-indigoGray-30" />
            <div className="h-3 w-[120px] animate-pulse rounded-lg bg-indigoGray-30" />
          </div>

          <div className="h-3 w-[120px] animate-pulse rounded-lg bg-indigoGray-30" />
        </div>

        <div className="flex h-[269px] w-[259px] flex-col items-center justify-center space-y-4 rounded-lg border border-indigoGray-20">
          <div className="flex flex-col items-center justify-center space-y-3">
            <div className="h-[57px] w-[57px] animate-pulse rounded-full bg-indigoGray-30" />
            <div className="h-3 w-[140px] animate-pulse rounded-lg bg-indigoGray-30" />
          </div>

          <div className="flex flex-col items-center justify-center space-y-1">
            <div className="h-3 w-[140px] animate-pulse rounded-lg bg-indigoGray-30" />
            <div className="h-3 w-[178px] animate-pulse rounded-lg bg-indigoGray-30" />
            <div className="h-3 w-[120px] animate-pulse rounded-lg bg-indigoGray-30" />
          </div>

          <div className="h-3 w-[120px] animate-pulse rounded-lg bg-indigoGray-30" />
        </div>
      </div>
    </div>
  );
};
