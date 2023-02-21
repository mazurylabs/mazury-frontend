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
import { Badge, ListResponse, Profile } from 'types';
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

  const tags = data?.badge_type.tags.reduce((prev, next) => {
    return {
      ...prev,
      [next?.level]: [...(prev?.[next.level] || []), next.name],
    };
  }, {} as Record<'1' | '2' | '3', string[]>);

  return (
    <Layout variant="plain" showMobileSidebar={false}>
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
          <div className="space-y-8 rounded-lg px-4 py-6 lg:bg-indigoGray-5 lg:p-6">
            <div className="flex flex-col lg:flex-row lg:space-x-6">
              <div className="mb-6 h-[200px] w-[200px] shrink-0 self-center lg:mb-0 lg:self-start">
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
                <div className="space-y-2">
                  {data?.hidden && (
                    <div className="flex w-fit items-center space-x-2 rounded-md bg-indigoGray-90 py-[2px] px-2 lg:hidden ">
                      <SVG
                        src="/icons/eye-slash-white.svg"
                        height={16}
                        width={16}
                      />
                      <p className="font-sans text-xs font-medium text-indigoGray-5">
                        Hidden
                      </p>
                    </div>
                  )}
                  <p className="w-fit rounded-md bg-indigoGray-10 py-1 px-2 font-sans text-sm text-indigoGray-60">
                    {commify(+(data?.badge_type.total_supply || '0'))} people
                    have this credential
                  </p>
                </div>
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
                        See on POAP
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
                  {tags?.[3] && (
                    <div className="flex flex-col space-y-2 lg:flex-row lg:items-center lg:space-y-0 lg:space-x-4">
                      <div className="flex items-center space-x-4">
                        <div className="flex justify-end lg:w-[60px]">
                          <SVG src="/icons/star.svg" height={17} width={18} />
                          <SVG src="/icons/star.svg" height={17} width={18} />
                          <SVG src="/icons/star.svg" height={17} width={18} />
                        </div>
                        <p className="font-sans text-sm font-medium text-indigoGray-90">
                          Expert at
                        </p>
                      </div>
                      <>
                        {tags?.[3].map((tag) => (
                          <p
                            key={tag + 'level-3'}
                            className="w-fit rounded-md bg-indigoGray-10 py-1 px-2 font-sans text-sm font-medium text-indigoGray-90"
                          >
                            {tag}
                          </p>
                        ))}
                      </>
                    </div>
                  )}

                  {tags?.[2] && (
                    <div className="flex flex-col space-y-2 lg:flex-row lg:items-center lg:space-y-0 lg:space-x-4">
                      <div className="flex items-center space-x-4">
                        <div className="flex justify-end lg:w-[60px]">
                          <SVG src="/icons/star.svg" height={17} width={18} />
                          <SVG src="/icons/star.svg" height={17} width={18} />
                        </div>
                        <p className="font-sans text-sm font-medium text-indigoGray-90">
                          Intermediate at
                        </p>
                      </div>
                      <>
                        {tags?.[2].map((tag) => (
                          <p
                            key={tag + 'level-2'}
                            className="w-fit rounded-md bg-indigoGray-10 py-1 px-2 font-sans text-sm font-medium text-indigoGray-90"
                          >
                            {tag}
                          </p>
                        ))}
                      </>
                    </div>
                  )}

                  {tags?.[1] && (
                    <div className="flex flex-col space-y-2 lg:flex-row lg:items-center lg:space-y-0 lg:space-x-4">
                      <div className="flex items-center space-x-4">
                        <div className="flex justify-end lg:w-[60px]">
                          <SVG src="/icons/star.svg" height={17} width={18} />
                        </div>
                        <p className="font-sans text-sm font-medium text-indigoGray-90">
                          Basic at
                        </p>
                      </div>
                      <>
                        {tags?.[1].map((tag) => (
                          <p
                            key={tag + 'level-1'}
                            className="w-fit rounded-md bg-indigoGray-10 py-1 px-2 font-sans text-sm font-medium text-indigoGray-90"
                          >
                            {tag}
                          </p>
                        ))}
                      </>
                    </div>
                  )}
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

              <ActionButton
                icon="/icons/share.svg"
                label="Copy link"
                onClick={() => {}}
              />
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
