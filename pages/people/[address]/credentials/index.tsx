import * as React from 'react';
import { NextPageContext } from 'next';
import SVG from 'react-inlinesvg';
import Link from 'next/link';
import { useRouter } from 'next/router';

import { Button, Layout } from 'components';
import {
  Container,
  ProfileSummary,
  FilterSearch,
  Credential,
} from 'views/Profile';
import { useAccount, useBadges } from 'hooks';
import { Badge, Profile } from 'types';
import { getHighlightedCredentials } from 'views/Profile/Overview/Idle';

interface CredentialsProps {
  address: string;
  highlightedCredentials: Badge[];
}

const skeletons = Array(12).fill('skeleton');

const Credentials = ({ address, highlightedCredentials }: CredentialsProps) => {
  const router = useRouter();
  const { user, profile, accountInView, isOwnProfile } = useAccount(address);

  const [credentialsFilter, setCredentialsFilter] = React.useState({
    query: '',
    issuer: '',
  });

  const {
    badges,
    handleFetchMore,
    hasMoreData,
    isFetchingNextPage,
    isLoading,
  } = useBadges(address, credentialsFilter.issuer, 10, credentialsFilter.query);

  const handleSearch = (query: string) => {
    setCredentialsFilter((prev) => ({ ...prev, query }));
  };

  const navItems = [
    { label: 'Overview', isActive: false, href: `/people/${address}` },
    {
      label: 'Credentials',
      isActive: true,
      value: '0',
      icon: '/icons/credentials-active.svg',
      href: `/people/${address}/credentials`,
    },
    {
      label: 'Writing',
      isActive: false,
      value: '0',
      icon: '/icons/writing-black.svg',
      href: `/people/${address}/writing`,
    },
    {
      label: 'Socials',
      isActive: false,
      value: '0',
      icon: '/icons/dao.svg',
      href: `/people/${address}/socials`,
    },
  ];

  return (
    <Layout variant="plain">
      <Container
        navItems={navItems}
        summary={
          <ProfileSummary
            address={address}
            profile={accountInView}
            user={user.profile as Profile}
            isOwnProfile={isOwnProfile}
          />
        }
      >
        <div className="space-y-6">
          <div className="flex w-full items-center space-x-4">
            <FilterSearch
              dropdown={{
                onSelect: () => {},
                options: [],
                label: 'credentials',
                className: 'grow',
              }}
              search={{ onSearch: handleSearch }}
              defaultView="dropdown"
            />

            {isOwnProfile && (
              <Link href={`/people/${address}/credentials/highlight`}>
                <a className="flex items-center space-x-2 py-3 px-6 font-sansSemi text-sm font-semibold text-indigo-600">
                  <SVG
                    src="/icons/heart-colored.svg"
                    height={16}
                    width={16}
                    className="mr-2"
                  />
                  Highlight
                </a>
              </Link>
            )}
          </div>

          {!!highlightedCredentials?.length && (
            <div className="space-y-2">
              <p className="font-sans text-sm text-indigoGray-50">
                Highlighted credentials
              </p>
              <div className="grid grid-cols-2 gap-8">
                {highlightedCredentials.map(({ badge_type, id }) => (
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
                  />
                ))}
              </div>
            </div>
          )}

          <div>
            <p className="mb-2 font-sans text-sm text-indigoGray-50">
              All credentials
            </p>

            <div className="mb-6 grid grid-cols-2 gap-8">
              {isLoading
                ? skeletons.map((item, index) => (
                    <Credential.Skeleton key={index + item} />
                  ))
                : badges?.map(({ id: badgeId, badge_type, hidden }) => {
                    const {
                      title,
                      id,
                      total_supply,
                      description,
                      image,
                      issuer,
                    } = badge_type;

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
                          router.push(
                            `/people/${address}/credentials/${badgeId}`
                          )
                        }
                      />
                    );
                  })}
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
