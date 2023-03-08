import * as React from 'react';
import { NextPageContext } from 'next';
import SVG from 'react-inlinesvg';
import Link from 'next/link';
import { useRouter } from 'next/router';
import clsx from 'clsx';

import { Button, Layout } from 'components';
import {
  Container,
  ProfileSummary,
  FilterSearch,
  Credential,
  EmptyState,
  ProfileSummaryMobile,
} from 'views/Profile';
import {
  useAccount,
  useBadges,
  useCredentialCount,
  useIntersect,
  useMobile,
} from 'hooks';

import { useHighlightedCredentials } from 'views/Profile/Overview/Idle';
import { ethers } from 'ethers';

interface CredentialsProps {
  address: string;
}

const skeletons = Array(12).fill('skeleton');

const Credentials = ({ address }: CredentialsProps) => {
  const router = useRouter();
  const { user, accountInView, isOwnProfile } = useAccount(address);
  const [searchTerm, setSearchTerm] = React.useState('');
  const isMobile = useMobile();

  const { ref, entry } = useIntersect({
    rootMargin: '56px',
    enabled: isMobile,
  });

  const ethAddress = ethers.utils.isAddress(address)
    ? address
    : accountInView?.eth_address || '';

  const [credentialsFilter, setCredentialsFilter] = React.useState({
    query: '',
    issuer: '',
  });

  const highlightedCredentials = useHighlightedCredentials(address);

  const {
    badges,
    handleFetchMore,
    hasMoreData,
    isFetchingNextPage,
    isLoading,
  } = useBadges(
    ethAddress,
    credentialsFilter.issuer,
    10,
    credentialsFilter.query
  );

  const credentialCount = useCredentialCount(address);

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

  const navItems = Container.useNavItems({
    address,
    activeItem: 'credentials',
  });

  return (
    <Layout
      variant="plain"
      showMobileSidebar={entry?.isIntersecting}
      className="lg:px-0"
    >
      <Container
        navItems={navItems}
        summary={
          <ProfileSummary
            address={address}
            profile={accountInView}
            user={user}
            isOwnProfile={isOwnProfile}
            intersectionRef={ref}
          />
        }
      >
        <ProfileSummaryMobile
          navItems={navItems}
          isVisible={!entry?.isIntersecting}
          profile={accountInView}
        />

        <div className="space-y-3 lg:space-y-6">
          <div className="flex w-full items-center space-x-4">
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

            {isOwnProfile && (
              <Link
                legacyBehavior
                href={`/people/${address}/credentials/highlight`}
              >
                <a className="flex items-center space-x-2 py-3 px-6 font-sansSemi text-sm font-semibold text-indigo-600">
                  <SVG src="/icons/heart-colored.svg" height={16} width={16} />
                  <span className="hidden lg:block">Highlight</span>
                </a>
              </Link>
            )}
          </div>

          {!!highlightedCredentials?.data?.length && (
            <div className="space-y-2">
              <p className="font-sans text-sm text-indigoGray-50">
                Highlighted credentials
              </p>
              <div className="grid grid-cols-1 gap-6 xl:grid-cols-2">
                {highlightedCredentials.data?.map(({ badge_type, id }) => (
                  <Credential
                    key={id + 'highlighted'}
                    title={badge_type.title}
                    description={badge_type.description}
                    onSelect={() =>
                      router.push(`/people/${address}/credentials/${id}`)
                    }
                    imageSrc={badge_type.image}
                    totalSupply={badge_type.total_supply}
                    isSelected={true}
                    className="border-indigo-400 px-4 py-2"
                    variant={badge_type.issuer.name}
                  />
                ))}
              </div>
            </div>
          )}

          <div>
            <p className="mb-2 font-sans text-sm text-indigoGray-50">
              All credentials
            </p>

            <div
              className={clsx(
                badges.length || isLoading
                  ? 'grid grid-cols-1 gap-6 xl:grid-cols-2'
                  : 'flex items-center justify-center'
              )}
            >
              {isLoading ? (
                skeletons.map((item, index) => (
                  <Credential.Skeleton key={index + item} />
                ))
              ) : badges.length ? (
                badges?.map(({ id: badgeId, badge_type, hidden }) => {
                  const { title, total_supply, description, image, issuer } =
                    badge_type;

                  return (
                    <Credential
                      key={badgeId + 'all_credentials'}
                      imageSrc={image}
                      title={title}
                      variant={issuer.name}
                      totalSupply={total_supply}
                      description={description}
                      isSelected={true}
                      className="border-transparent px-4 py-2"
                      isHidden={hidden}
                      onSelect={() =>
                        router.push(`/people/${address}/credentials/${badgeId}`)
                      }
                    />
                  );
                })
              ) : (
                <EmptyState onReset={handleResetFilters} />
              )}
            </div>

            {hasMoreData && (
              <div className="mt-6 flex justify-center">
                <Button
                  className="w-[211px] shrink-0 !border !border-indigoGray-20 !bg-indigoGray-10 !text-indigoGray-90"
                  variant="secondary"
                  onClick={() => handleFetchMore()}
                  loading={isFetchingNextPage}
                >
                  Load more
                </Button>
              </div>
            )}
          </div>
        </div>
      </Container>
    </Layout>
  );
};

export default Credentials;

export const getServerSideProps = async (context: NextPageContext) => {
  return {
    props: {
      address: context.query.address,
    },
  };
};
