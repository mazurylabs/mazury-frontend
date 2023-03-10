import * as React from 'react';
import { NextPageContext } from 'next';
import { useInfiniteQuery } from '@tanstack/react-query';
import clsx from 'clsx';

import type { ListResponse, Post } from 'types';
import { axios } from 'lib/axios';
import { Button, Layout } from 'components';
import {
  Container,
  EmptyState,
  LensPost,
  MirrorPost,
  ProfileSummary,
  ProfileSummaryMobile,
} from 'views/Profile';
import { useAccount, useIntersect, useMobile } from 'hooks';
import { useLensPost } from '@/views/Profile/Container';
import { ethers } from 'ethers';
import { formatProfileRoute } from '@/utils';

interface WritingProps {
  ethAddress: string;
}

const skeletons = Array(3).fill('skeleton');

const Writing = ({ ethAddress }: WritingProps) => {
  const { user, accountInView, isOwnProfile } = useAccount(ethAddress);
  const isMobile = useMobile();

  const { ref, entry } = useIntersect({
    rootMargin: '56px',
    enabled: isMobile,
  });

  const address = ethers.utils.isAddress(ethAddress)
    ? ethAddress
    : accountInView?.eth_address || '';

  const {
    writings,
    handleFetchMore,
    hasMoreData,
    isFetchingNextPage,
    isLoading: isMirrorLoading,
  } = useWriting({ address });

  const { data: lensPost, isLoading: isLensLoading } = useLensPost({
    profileId: accountInView?.lens_id as string,
  });

  const isLoading = isLensLoading && isMirrorLoading;

  const navItems = Container.useNavItems({
    address: ethAddress,
    activeItem: 'writing',
    profileId: accountInView?.lens_id as string,
  });

  return (
    <Layout variant="plain" showMobileSidebar={entry?.isIntersecting}>
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
        <div className="space-y-6">
          {/* <FilterSearch
            dropdown={{
              onSelect: () => {},
              label: 'writings',
              className: 'grow',
            }}
            defaultView="dropdown"
            resetFilters={false}
          /> */}

          <div
            className={clsx(
              isLoading && 'grid grid-cols-1 gap-6 lg:grid-cols-2',
              (writings.length || lensPost?.items.length) &&
                'columns-1 gap-6 lg:columns-2',
              !writings.length &&
                !lensPost?.items.length &&
                'flex items-center justify-center'
            )}
          >
            {isLoading ? (
              skeletons.map((item, index) => <Skeleton key={index + item} />)
            ) : writings.length || lensPost?.items.length ? (
              <>
                {writings?.map((writing) => {
                  return <MirrorPost key={writing.id} {...writing} />;
                })}
                {lensPost?.items.map((post) => {
                  if (!post?.id) return null;

                  return (
                    <LensPost
                      key={post.id}
                      replies={post.stats.totalAmountOfComments}
                      quotes={post.stats.totalAmountOfMirrors}
                      likes={post.stats.totalUpvotes}
                      saves={post.stats.totalAmountOfCollects}
                      url={`https://lenster.xyz/posts/${post.id}`}
                      description={post.metadata.content}
                      author={{
                        username: accountInView?.username,
                        avatar: accountInView?.avatar,
                      }}
                    />
                  );
                })}
              </>
            ) : (
              <EmptyState emptyMessage="No writings to show" />
            )}
          </div>
        </div>

        {hasMoreData && (
          <div className="mt-6 flex justify-center">
            <Button
              className="w-[211px] shrink-0 !border !border-indigoGray-20 !bg-indigoGray-10 !font-semibold !text-indigoGray-90"
              variant="secondary"
              onClick={() => handleFetchMore()}
              loading={isFetchingNextPage}
            >
              Load more
            </Button>
          </div>
        )}
      </Container>
    </Layout>
  );
};

export default Writing;

export const getServerSideProps = async (
  context: NextPageContext & { resolvedUrl: string }
) => {
  const address = context.query.address as string;

  const url = context.resolvedUrl;

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

export const Skeleton = () => {
  return (
    <div
      className={`w-full space-y-3 rounded-lg bg-indigoGray-5 py-3 pl-4 pr-[10px] xl:min-w-[401px]`}
    >
      <div className="flex items-center space-x-2">
        <div className="h-8 w-8 animate-pulse rounded-full bg-indigoGray-30" />
        <div className="h-4 w-[60%] animate-pulse rounded-lg bg-indigoGray-30" />
      </div>

      <div className="h-5 w-[90%] animate-pulse rounded-lg bg-indigoGray-30" />

      <div className="h-full grow space-y-1">
        <div className="h-4 w-full animate-pulse rounded-lg bg-indigoGray-30" />
        <div className="h-4 w-full animate-pulse rounded-lg bg-indigoGray-30" />
        <div className="h-4 w-full animate-pulse rounded-lg bg-indigoGray-30" />
      </div>
    </div>
  );
};

export const fetchWriting = async ({
  address,
  limit = 4,
  nextPage,
}: {
  address: string;
  limit?: number;
  nextPage?: string;
}): Promise<ListResponse<Post>> => {
  const { data } = await axios.get(nextPage || `/writing/mirror/${address}`);

  return data;
};

export const useWriting = ({
  address,
  limit,
  enabled = true,
}: {
  address: string;
  limit?: number;
  enabled?: boolean;
}) => {
  const {
    isLoading,
    error,
    data,
    isFetchingNextPage,
    fetchNextPage,
    hasNextPage,
  } = useInfiniteQuery(
    clsx('writing', address).split(' '),
    ({ pageParam }) => fetchWriting({ address, limit, nextPage: pageParam }),
    {
      getNextPageParam: (lastPage) => {
        return lastPage.next;
      },
      enabled: enabled ? enabled && !!address : !!address,
    }
  );

  const queryResponse = data?.pages.reduce((prev, next) => {
    return {
      ...prev,
      ...next,
      results: [...(prev?.results || []), ...next.results],
    };
  }, {} as ListResponse<Post>);

  return {
    writings: queryResponse?.results || [],
    error,
    count: queryResponse?.count || 0,
    handleFetchMore: fetchNextPage,
    hasMoreData: hasNextPage,
    isLoading: isLoading,
    isFetchingNextPage,
  };
};
