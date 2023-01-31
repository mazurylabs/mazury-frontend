import * as React from 'react';
import { NextPageContext } from 'next';
import SVG from 'react-inlinesvg';
import { useRouter } from 'next/router';
import { useMutation } from 'react-query';
import { AnimatePresence, motion } from 'framer-motion';

import { Button, Checkbox, Layout } from 'components';
import { Container, Credential, ProfileSummary } from 'views/Profile';
import { useAccount, useBadges, useClickOutside } from 'hooks';
import { Badge, BadgeIssuer, Profile } from 'types';
import { axios } from 'lib/axios';
import { getHighlightedCredentials } from 'views/Profile/Overview/Idle';

interface HighlightProps {
  address: string;
  highlightedCredentials: Badge[];
}

const skeletons = Array(12).fill('skeleton');

const credentials = [
  'GitPOAP',
  'Mazury',
  'POAP',
  'Buildspace',
  'Sismo',
  '101',
  'Kudos',
];

const Credentials = ({ address, highlightedCredentials }: HighlightProps) => {
  const router = useRouter();
  const { user, profile, accountInView, isOwnProfile } = useAccount(address);
  const useHighlightCredentialsMutation = useHighlightCredentials({
    onComplete: router.back,
  });

  const [isFocused, setIsFocused] = React.useState(false);
  const [searchTerm, setSearchTerm] = React.useState('');

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

  const handleSearch = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setCredentialsFilter((prev) => ({ ...prev, query: searchTerm }));
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
          <form
            className="flex w-full items-center rounded-lg bg-indigoGray-5 py-3 pl-[14px] pr-2"
            onSubmit={handleSearch}
          >
            <div className="flex h-6 w-6">
              <SVG height={24} width={24} src={`/icons/search-black.svg`} />
            </div>

            <div className="ml-4 mr-10 grow font-sans  text-base font-medium">
              <input
                type="text"
                placeholder="Paradign CTF 2022, ETHAmsterdam 2022 Finalist Hacker..."
                aria-label="Search"
                className="hidden h-full w-full bg-transparent lg:block"
                value={searchTerm}
                onChange={(event) => setSearchTerm(event.target.value)}
                onFocus={() => setIsFocused(true)}
                onBlur={() => setIsFocused(false)}
              />
            </div>

            <div className="h-8 w-8">
              {isFocused && (
                <button type="submit" className="border-none !p-0">
                  <SVG
                    height={32}
                    width={32}
                    src={`/icons/search-forward${
                      searchTerm ? '' : '-inactive'
                    }.svg`}
                  />
                  <span className="sr-only">Submit</span>
                </button>
              )}
            </div>
          </form>

          <div className="flex space-x-6">
            <div className="rounded-md bg-indigoGray-10 p-3">
              <p className="font-inter text-sm font-medium text-indigoGray-90">
                {selectedCredentials.length} selected out of 8 possible
              </p>
            </div>

            <CredentialsFilter
              credentials={credentials}
              onApply={(issuer) =>
                setCredentialsFilter((prev) => ({ ...prev, issuer }))
              }
            />
          </div>

          <div className="grid grid-cols-2 gap-8">
            {isLoading
              ? skeletons.map((item, index) => (
                  <Credential.Skeleton key={index + item} />
                ))
              : badges?.map(({ id: badgeId, badge_type }) => {
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
                      key={id}
                      imageSrc={image}
                      title={title}
                      variant={issuer.name}
                      totalSupply={total_supply}
                      description={description}
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

export const highlightCredentials = ({
  data,
}: {
  data: string[];
}): Promise<any> => {
  return axios.patch(`/badges/highlight`, {
    ids: data,
  });
};

export const useHighlightCredentials = ({ config, onComplete }: any = {}) => {
  return useMutation({
    onSuccess: () => {
      onComplete?.();
    },
    ...config,
    mutationFn: highlightCredentials,
  });
};

const CredentialsFilter = ({
  onApply,
  credentials,
}: {
  onApply: (issuer: string) => void;
  credentials: string[];
}) => {
  const containerRef = React.useRef<HTMLDivElement>(null!);
  const [isToggled, setIsToggled] = React.useState(false);
  const prevIssuers = React.useRef<string[]>([]);
  const [badgeIssuer, setBadgeIssuer] = React.useState<string[]>([]);

  useClickOutside(containerRef, () => {
    setIsToggled(false);
    setBadgeIssuer(prevIssuers.current);
  });

  const handleApply = () => {
    onApply(badgeIssuer.join(';'));
    setIsToggled(false);
    prevIssuers.current = badgeIssuer;
  };

  const handleReset = () => {
    setBadgeIssuer([]);
    prevIssuers.current = [];
    onApply('');
    setIsToggled(false);
  };

  const handleCheck = (selected: string) => {
    const selectedItem = selected.toLowerCase();

    if (badgeIssuer.includes(selectedItem)) {
      setBadgeIssuer((prev) => prev.filter((item) => item !== selectedItem));
      return;
    }
    setBadgeIssuer((prev) => [...prev, selectedItem]);
  };

  return (
    <div className="relative w-fit" ref={containerRef}>
      <button
        type="button"
        className="flex items-center rounded-md bg-indigoGray-10 p-3 font-sans text-sm font-medium"
        onClick={() => setIsToggled(!isToggled)}
      >
        All credentials
        <SVG
          src="/icons/chevron-down-black.svg"
          width={24}
          height={24}
          className="ml-3"
        />
      </button>
      <AnimatePresence>
        {isToggled && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="border-[#e2e6f60] absolute top-[100%] z-10 mt-1 flex h-fit w-[400px] flex-col rounded-3xl border bg-white p-6 pb-2"
          >
            <div className="space-y-4">
              {credentials.map((credential) => (
                <div
                  className="flex cursor-pointer items-center space-x-4"
                  key={credential}
                  onClick={() => handleCheck(credential)}
                >
                  <Checkbox
                    innerClassName="h-4 w-4"
                    outerClassName="h-4 w-4"
                    checked={badgeIssuer.includes(credential.toLowerCase())}
                    setChecked={() => {}}
                    label=""
                    id={credential}
                  />
                  <p className="font-sans text-lg font-medium text-indigoGray-90">
                    {credential}
                    {/* <span className="text-base font-normal text-indigoGray-40">
                      (13 056)
                    </span> */}
                  </p>
                </div>
              ))}
            </div>

            <div className="mt-6 flex justify-end space-x-3">
              <Button
                onClick={handleReset}
                className="w-[144px] !border !border-[1.5px] !border-indigoGray-20 !bg-indigoGray-10 !font-sans !font-semibold !text-indigoGray-90 !shadow-base"
                variant="primary"
                type="button"
              >
                Reset
              </Button>
              <Button
                className="w-[144px] !font-sans !font-semibold"
                type="submit"
                onClick={handleApply}
              >
                Apply
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
