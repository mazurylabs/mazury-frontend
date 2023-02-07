import * as React from 'react';
import { NextPageContext } from 'next';
import SVG from 'react-inlinesvg';
import { useRouter } from 'next/router';

import {
  InfiniteData,
  useMutation,
  useQuery,
  useQueryClient,
} from 'react-query';

import { Layout } from 'components';
import { ActionButton, Container, ProfileSummary } from 'views/Profile';
import { useAccount } from 'hooks';
import { Badge, BadgeIssuer, ListResponse, Profile } from 'types';
import { axios } from 'lib/axios';
import { commify } from 'utils';
import { useHighlightCredentials } from './highlight';
import { getHighlightedCredentials } from 'views/Profile/Overview/Idle';
import clsx from 'clsx';

interface HighlightProps {
  address: string;
  credentialId: string;
  highlightedCredentials: Badge[];
}

const Skeleton = () => {
  return (
    <div className="space-y-8 rounded-lg bg-indigoGray-5 p-6">
      <div className="flex max-w-[600px] items-center space-x-6">
        <div className="h-[175px] w-[175px] animate-pulse rounded-full bg-indigoGray-30 px-9" />
        <div className=" grow space-y-4">
          <div className="h-5 w-[80%] animate-pulse rounded-xl bg-indigoGray-30" />
          <div className="h-6 w-[100%] animate-pulse rounded-xl bg-indigoGray-30" />
        </div>
      </div>

      <div className="max-w-[400px] space-y-4">
        <div className="h-6 w-[100%] animate-pulse rounded-xl bg-indigoGray-30" />
        <div className="h-6 w-[100%] animate-pulse rounded-xl bg-indigoGray-30" />
        <div className="h-6 w-[100%] animate-pulse rounded-xl bg-indigoGray-30" />
      </div>

      <div className="flex max-w-[60%] space-x-2">
        <div className="h-8 w-[100%] animate-pulse rounded-2xl bg-indigoGray-30" />
        <div className="h-8 w-[100%] animate-pulse rounded-2xl bg-indigoGray-30" />
        <div className="h-8 w-[100%] animate-pulse rounded-2xl bg-indigoGray-30" />
      </div>
    </div>
  );
};

const CredentialDetails = ({
  address,
  credentialId,
  highlightedCredentials,
}: HighlightProps) => {
  const router = useRouter();
  const { user, profile, accountInView, isOwnProfile } = useAccount(address);
  const queryClient = useQueryClient();

  const cachedData = queryClient.getQueryData(['badges']) as
    | InfiniteData<ListResponse<Badge>>
    | undefined;

  const cachedBadge = cachedData?.pages
    .reduce((prev, next) => {
      return [...prev, ...next.results];
    }, [] as Badge[])
    .find((badge) => badge.id === credentialId);

  const { isLoading, data } = useQuery({
    queryKey: ['badge', credentialId],
    queryFn: () => getBadge({ id: credentialId }),
    enabled: !!!cachedBadge,
    initialData: cachedBadge,
  });

  const useHighlightCredentialsMutation = useHighlightCredentials({
    onComplete: () => {
      queryClient.setQueryData(['badge', credentialId], (prev: any) => ({
        ...prev,
        highlighted: !data?.highlighted,
      }));
    },
    address,
  });

  const useHideCredentialMutation = useHideCredential({
    onComplete: () => {
      queryClient.setQueryData(['badge', credentialId], (prev: any) => ({
        ...prev,
        hidden: !data?.hidden,
      }));
    },
  });

  const handleSearch = () => {
    const queryParam =
      'badges=' + encodeURIComponent(data?.badge_type.slug as string);

    router.push(`/search?${queryParam}`);
  };

  const handleHide = async () => {
    await useHideCredentialMutation.mutateAsync({
      id: credentialId,
      payload: !data?.hidden,
    });
  };

  const handleHighlight = async () => {
    await useHighlightCredentialsMutation.mutateAsync({
      data: data?.highlighted
        ? highlightedCredentials.reduce((prev, next) => {
            if (next.id === data?.id) return prev;
            return [...prev, next.id];
          }, [] as string[])
        : [
            ...highlightedCredentials.map((credential) => credential.id),
            credentialId,
          ],
    } as any);
  };

  const variant = data?.badge_type.issuer.name;

  return (
    <Layout variant="plain">
      <Container
        title="Credential details"
        summary={
          <ProfileSummary
            address={address}
            profile={accountInView}
            user={user.profile as Profile}
            isOwnProfile={isOwnProfile}
          />
        }
      >
        {isLoading ? (
          <Skeleton />
        ) : (
          <div className="space-y-8 rounded-lg bg-indigoGray-5 p-6">
            <div className="flex space-x-6">
              <div className="h-[200px] w-[200px] shrink-0">
                <img
                  src={data?.badge_type.image}
                  className={clsx(
                    'h-full w-full rounded object-contain',
                    (variant === 'gitpoap' || variant === 'poap') &&
                      'rounded-full',
                    (variant === 'sismo' || variant === '101') &&
                      'rounded-sm bg-gray-100'
                  )}
                  onError={(event) => {
                    event.currentTarget.src = '/icons/brokenImage.svg';
                  }}
                  alt={'title' + ' badge'}
                />
              </div>

              <div className="space-y-4">
                <p className="w-fit rounded-md bg-indigoGray-10 py-1 px-2 font-sans text-sm text-indigoGray-60">
                  {commify(+(data?.badge_type.total_supply || '0'))} people have
                  this credential
                </p>
                <div className="space-y-3">
                  <h2 className="font-serif text-4xl font-semibold text-indigoGray-90">
                    {data?.badge_type.title}
                  </h2>
                  <p className="font-sans text-sm text-indigoGray-90">
                    {data?.badge_type.description}
                  </p>

                  <div className="flex space-x-6">
                    {data?.external_links.opensea && (
                      <a
                        href={data.external_links.opensea}
                        rel="noreferrer"
                        target="_blank"
                        className="flex items-center rounded-md bg-indigo-50 py-1 px-2 font-sansMid text-sm font-medium text-indigo-600"
                      >
                        <SVG
                          src={`/icons/opensea.svg`}
                          height={16}
                          width={16}
                          className="mr-2"
                        />
                        See on Opensea
                      </a>
                    )}

                    {data?.external_links.rainbow && (
                      <a
                        href={data.external_links.rainbow}
                        rel="noreferrer"
                        target="_blank"
                        className="flex items-center rounded-md bg-indigo-50 py-1 px-2 font-sansMid text-sm font-medium text-indigo-600"
                      >
                        <SVG
                          src={`/icons/rainbow.svg`}
                          height={16}
                          width={16}
                          className="mr-2"
                        />
                        See on Rainbow
                      </a>
                    )}

                    {data?.external_links.poap && (
                      <a
                        href={data?.external_links.poap}
                        rel="noreferrer"
                        target="_blank"
                        className="flex items-center rounded-md bg-indigo-50 py-1 px-2 font-sansMid text-sm font-medium text-indigo-600"
                      >
                        <SVG
                          src={`/icons/gitpoap.svg`}
                          height={16}
                          width={16}
                          className="mr-2"
                        />
                        See on GitPOAP
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {!!data?.badge_type.tags.length && (
              <div className="space-y-2">
                <p className="font-sans text-sm text-indigoGray-50">
                  What does this credential mean?
                </p>
                <div className="space-y-4">
                  <div className="flex items-center space-x-4">
                    <div className="flex w-[60px] justify-end">
                      <SVG src="/icons/star.svg" height={17} width={18} />
                      <SVG src="/icons/star.svg" height={17} width={18} />
                      <SVG src="/icons/star.svg" height={17} width={18} />
                    </div>
                    <p className="font-sans text-sm font-medium text-indigoGray-90">
                      Expert at
                    </p>
                    <p className="rounded-md bg-indigoGray-10 py-1 px-2 font-sans text-sm font-medium text-indigoGray-90">
                      Frontend development
                    </p>
                  </div>

                  <div className="flex items-center space-x-4">
                    <div className="flex w-[60px] justify-end">
                      <SVG src="/icons/star.svg" height={17} width={18} />
                      <SVG src="/icons/star.svg" height={17} width={18} />
                    </div>
                    <p className="font-sans text-sm font-medium text-indigoGray-90">
                      Intermediate at
                    </p>
                    <p className="rounded-md bg-indigoGray-10 py-1 px-2 font-sans text-sm font-medium text-indigoGray-90">
                      Frontend development
                    </p>
                  </div>

                  <div className="flex items-center space-x-4">
                    <div className="flex w-[60px] justify-end">
                      <SVG src="/icons/star.svg" height={17} width={18} />
                    </div>
                    <p className="font-sans text-sm font-medium text-indigoGray-90">
                      Basic at
                    </p>
                    <p className="rounded-md bg-indigoGray-10 py-1 px-2 font-sans text-sm font-medium text-indigoGray-90">
                      Frontend development
                    </p>
                  </div>
                </div>
              </div>
            )}

            <div className="flex flex-wrap gap-3">
              <ActionButton
                icon="/icons/search-white.svg"
                label="Search using this credential"
                className="border-indigoGray-90 bg-indigoGray-90 text-indigoGray-5"
                onClick={handleSearch}
              />
              {isOwnProfile && (
                <ActionButton
                  icon={`/icons/${
                    data?.highlighted ? 'remove-heart' : 'heart-black'
                  }.svg`}
                  label={
                    data?.highlighted
                      ? 'Remove highlight'
                      : 'Highlight credential'
                  }
                  onClick={handleHighlight}
                  loading={useHighlightCredentialsMutation.isLoading}
                />
              )}
              {isOwnProfile && (
                <ActionButton
                  icon={`/icons/${data?.hidden ? 'eye-open' : 'hide'}.svg`}
                  label={data?.hidden ? 'Unhide' : 'Hide'}
                  onClick={handleHide}
                  loading={useHideCredentialMutation.isLoading}
                />
              )}
              {/* <ActionButton icon="/icons/mint.svg" label="Mint NFT" /> */}

              <ActionButton icon="/icons/share.svg" onClick={() => {}} />
            </div>
          </div>
        )}
      </Container>
    </Layout>
  );
};

export default CredentialDetails;

export const getServerSideProps = async (context: NextPageContext) => {
  const highlightedCredentials = await getHighlightedCredentials(
    context.query.address as string
  );

  return {
    props: {
      address: context.query.address,
      credentialId: context.query.credentialId,
      highlightedCredentials,
    },
  };
};

const getBadge = async ({ id }: { id: string }): Promise<Badge> => {
  const { data } = await axios.get(`/badges/${id}`);
  return data;
};

export const hideCredential = ({
  id,
  payload,
}: {
  id: string;
  payload: boolean;
}) => {
  return axios.patch(`/badges/${id}/hide/?value=${payload}`, {});
};

const useHideCredential = ({ onComplete }: { onComplete?: () => void }) => {
  return useMutation({
    onSuccess: () => {
      onComplete?.();
    },
    mutationFn: hideCredential,
  });
};
