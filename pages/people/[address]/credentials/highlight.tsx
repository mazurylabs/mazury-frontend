import * as React from 'react';
import { NextPageContext } from 'next';
import { useRouter } from 'next/router';
import { useMutation, useQueryClient } from 'react-query';
import clsx from 'clsx';

import { Button, Layout } from 'components';
import { useAccount, useBadges, useCredentialCount } from 'hooks';
import { Badge, Profile } from 'types';
import { axios } from 'lib/axios';
import { getHighlightedCredentials } from 'views/Profile/Overview/Idle';

import {
  Container,
  Credential,
  EmptyState,
  FilterSearch,
  ProfileSummary,
} from 'views/Profile';

interface HighlightProps {
  address: string;
  highlightedCredentials: Badge[];
}

const skeletons = Array(12).fill('skeleton');

const Credentials = ({ address, highlightedCredentials }: HighlightProps) => {
  const router = useRouter();
  const { user, profile, accountInView, isOwnProfile } = useAccount(address);
  const credentialCount = useCredentialCount(address);
  const [searchTerm, setSearchTerm] = React.useState('');

  const [credentialsFilter, setCredentialsFilter] = React.useState({
    query: '',
    issuer: '',
  });

  const useHighlightCredentialsMutation = useHighlightCredentials({
    onComplete: router.back,
    address,
  });

  const {
    badges,
    handleFetchMore,
    hasMoreData,
    isFetchingNextPage,
    isLoading,
  } = useBadges(address, credentialsFilter.issuer, 10, credentialsFilter.query);

  const prevHighlightedCredentials = highlightedCredentials.map(
    (credential) => credential.id
  );
  const highlightCredentialsRef = React.useRef<number>(
    prevHighlightedCredentials.length
  );
  const [selectedCredentials, setSelectedCredentials] = React.useState<
    string[]
  >(prevHighlightedCredentials);

  const handleSelectCredential = (id: string) => {
    setSelectedCredentials((credentials) => {
      if (credentials.length === 8 && !credentials.includes(id))
        return credentials;

      if (credentials.includes(id)) {
        return credentials.filter((prevID) => prevID !== id);
      }

      return [...credentials, id];
    });
  };

  const handleSearch = () => {
    setCredentialsFilter((prev) => ({ ...prev, query: searchTerm }));
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const handleSelect = (issuer?: string) => {
    setCredentialsFilter((prev) => ({ ...prev, issuer: issuer || '' }));
  };

  const handleResetFilters = () => {
    setCredentialsFilter({ issuer: '', query: '' });
    setSearchTerm('');
  };

  return (
    <Layout variant="plain">
      <Container
        title="Highlight credentials"
        handleGoBack={
          selectedCredentials.length === highlightCredentialsRef.current
            ? undefined
            : router.back
        }
        summary={
          <ProfileSummary
            address={address}
            profile={accountInView}
            user={user.profile as Profile}
            isOwnProfile={isOwnProfile}
          />
        }
        handleSave={async () =>
          await useHighlightCredentialsMutation.mutateAsync({
            data: selectedCredentials,
          } as any)
        }
        isSaving={useHighlightCredentialsMutation.isLoading}
      >
        <div className="space-y-6">
          <FilterSearch
            dropdown={{
              onSelect: handleSelect,
              options: credentialCount.data?.credentials,
              label: 'credentials',
              className: 'grow',
              selectedOption: credentialsFilter.issuer,
            }}
            search={{
              onSearch: handleSearch,
              searchTerm,
              onChange: handleChange,
            }}
          />

          <div className="flex space-x-6">
            <div className="rounded-md bg-indigoGray-10 p-3">
              <p className="font-inter text-sm font-medium text-indigoGray-90">
                {selectedCredentials.length} selected out of 8 possible
              </p>
            </div>
          </div>

          <div
            className={clsx(
              badges.length || isLoading
                ? 'grid grid-cols-2 gap-6'
                : 'flex items-center justify-center'
            )}
          >
            {isLoading ? (
              skeletons.map((item, index) => (
                <Credential.Skeleton key={index + item} />
              ))
            ) : badges.length ? (
              badges?.map(({ id: badgeId, badge_type }) => {
                return (
                  <Credential
                    key={badge_type.id}
                    imageSrc={badge_type.image}
                    title={badge_type.title}
                    variant={badge_type.issuer.name}
                    totalSupply={badge_type.total_supply}
                    description={badge_type.description}
                    showCheckbox={true}
                    isSelected={selectedCredentials.includes(badgeId)}
                    onSelect={() => handleSelectCredential(badgeId)}
                    className={`${
                      selectedCredentials.length >= 8 &&
                      !selectedCredentials.includes(badgeId)
                        ? 'cursor-not-allowed'
                        : ''
                    } `}
                  />
                );
              })
            ) : (
              <EmptyState onReset={handleResetFilters} />
            )}
          </div>

          {hasMoreData && (
            <div className="flex justify-center">
              <Button
                className="w-[211px] shrink-0 !border !border-indigoGray-20 !bg-indigoGray-10 !text-indigoGray-90 !shadow-base"
                variant="secondary"
                onClick={() => handleFetchMore()}
                loading={isFetchingNextPage}
              >
                Load more
              </Button>
            </div>
          )}
        </div>
      </Container>
    </Layout>
  );
};

export default Credentials;

export const getServerSideProps = async (context: NextPageContext) => {
  const highlightedCredentials = await getHighlightedCredentials(
    context.query.address as string
  );

  return {
    props: {
      address: context.query.address,
      highlightedCredentials,
    },
  };
};

export const highlightCredentials = ({ data }: { data: string[] }) => {
  return axios.patch(`/badges/highlight`, {
    ids: data,
  });
};

export const useHighlightCredentials = ({
  onComplete,
  address,
}: {
  onComplete?: () => void;
  address: string;
}) => {
  const queryClient = useQueryClient();

  return useMutation({
    onSuccess: () => {
      onComplete?.();
      queryClient.invalidateQueries(['badges', address]);
    },
    mutationFn: highlightCredentials,
  });
};
