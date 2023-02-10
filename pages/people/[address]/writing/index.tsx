import * as React from 'react';
import { NextPageContext } from 'next';
import SVG from 'react-inlinesvg';
import { useInfiniteQuery } from 'react-query';
import clsx from 'clsx';

import type { ListResponse, Profile, Post } from 'types';
import { axios } from 'lib/axios';
import { Button, Layout } from 'components';
import {
  Container,
  EmptyState,
  FilterSearch,
  ProfileSummary,
} from 'views/Profile';
import { useAccount } from 'hooks';

interface WritingProps {
  address: string;
}

interface Writing {
  author: { username: string; avatar: string };
  description: string;
  url: string;
}

const skeletons = Array(3).fill('skeleton');

const Writing = ({ address }: WritingProps) => {
  const { user, profile, accountInView, isOwnProfile } = useAccount(address);

  const {
    writings,
    handleFetchMore,
    hasMoreData,
    isFetchingNextPage,
    isLoading,
  } = useWriting({ address });

  return (
    <Layout variant="plain">
      <Container
        navItems={Container.useNavItems({ address, activeItem: 'Writing' })}
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
              isLoading && 'grid grid-cols-2 gap-6',
              writings.length && 'columns-2 gap-6',
              !writings.length && 'flex items-center justify-center'
            )}
          >
            {isLoading ? (
              skeletons.map((item, index) => <Skeleton key={index + item} />)
            ) : writings.length ? (
              writings?.map((writing) => {
                return <Mirror key={writing.id} {...writing} />;
              })
            ) : (
              <EmptyState emptyMessage="No writings to show" />
            )}
          </div>
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
      </Container>
    </Layout>
  );
};

export default Writing;

export const getServerSideProps = async (context: NextPageContext) => {
  return {
    props: {
      address: context.query.address,
    },
  };
};

interface LensPost extends Writing {
  replies: string;
  likes: string;
  quotes: string;
  saves: string;
  detailUrl: string;
}

// const Lens = ({
//   replies,
//   likes,
//   quotes,
//   saves,
//   url,
//   author,
//   description,
//   detailUrl,
// }: LensPost) => {
//   return (
//     <Link href={detailUrl}>
//       <a className="mb-6 flex w-full flex-col space-y-3 rounded-lg bg-indigoGray-5 py-3 px-4">
//         <div className="space-y-1">
//           <div className="flex items-center space-x-2">
//             <img
//               className="h-8 w-8 rounded-full"
//               src={author.avatar}
//               alt={author.username}
//             />
//             <p className="font-sans text-sm font-semibold text-indigoGray-90">
//               {author.username}
//             </p>
//           </div>

//           <p className="font-sans text-sm text-indigoGray-90">{description}</p>
//         </div>

//         <div className="flex items-center justify-between">
//           <div className="flex items-center space-x-4">
//             <p className="flex items-center font-sansMid text-xs font-medium text-indigoGray-90">
//               <SVG
//                 height={16}
//                 width={16}
//                 src="/icons/message-circle.svg"
//                 className="mr-1"
//               />
//               {replies}
//             </p>
//             <p className="flex items-center font-sansMid text-xs font-medium text-indigoGray-90">
//               <SVG
//                 height={16}
//                 width={16}
//                 src="/icons/message-circle.svg"
//                 className="mr-1"
//               />
//               {quotes}
//             </p>
//             <p className="flex items-center font-sansMid text-xs font-medium text-indigoGray-90">
//               <SVG
//                 height={16}
//                 width={16}
//                 src="/icons/message-circle.svg"
//                 className="mr-1"
//               />
//               {likes}
//             </p>
//             <p className="flex items-center font-sansMid text-xs font-medium text-indigoGray-90">
//               <SVG
//                 height={16}
//                 width={16}
//                 src="/icons/message-circle.svg"
//                 className="mr-1"
//               />
//               {saves}
//             </p>
//           </div>

//           <a
//             className="flex items-center space-x-2 font-sans text-xs font-semibold text-[#8b5df5]"
//             target="_blank"
//             rel="noreferrer"
//             href={url}
//           >
//             <SVG height={16} width={16} src="/icons/lenster-indigo.svg" />
//             <span>See on Lenster</span>
//             <SVG src="/icons/chevron-right-indigo.svg" height={16} width={16} />
//           </a>
//         </div>
//       </a>
//     </Link>
//   );
// };

const Mirror = ({
  author,
  preview,
  url,
  title,
  posted_at,
  background_image,
}: Post) => {
  return (
    <a
      target="_blank"
      rel="noreferrer"
      href={url}
      className="mb-6 flex w-full flex-col space-y-3 overflow-hidden rounded-lg bg-indigoGray-5"
    >
      <div className="flex h-[200px] w-[401.3px] items-center justify-center bg-indigoGray-10">
        <img
          src={background_image || '/icons/brokenImage.svg'}
          className={clsx(
            'h-full w-full object-contain',
            !background_image && 'h-[48px] w-[48px]'
          )}
          onError={(event) => {
            event.currentTarget.src = '/icons/brokenImage.svg';
          }}
          alt="banner"
        />
      </div>

      <div className="space-y-3 py-3 px-4">
        <div className="flex items-center space-x-2">
          <img
            className="h-8 w-8 rounded-full"
            src={author.avatar}
            alt={author.username}
          />
          <p className="font-sans text-sm font-semibold text-indigoGray-90">
            {author.username || author.ens_name}
          </p>
        </div>

        <div className="space-y-1">
          <p className="font-sansMid font-medium text-indigoGray-90">{title}</p>
          <p className="font-sans text-sm text-indigoGray-90">{preview}</p>
        </div>

        <div className="flex items-center justify-between">
          <p className="font-sansMid text-xs font-medium text-indigoGray-90">
            {new Date(posted_at).toLocaleDateString()}
          </p>
          <div className="flex items-center space-x-2 font-sans text-xs font-semibold text-sky-600">
            <SVG height={16} width={16} src="/icons/mirror-icon-blue.svg" />
            <span>See on Mirror</span>
            <SVG src="/icons/chevron-right-blue.svg" height={16} width={16} />
          </div>
        </div>
      </div>
    </a>
  );
};

const Skeleton = () => {
  return (
    <div
      className={`w-full space-y-3 rounded-lg bg-indigoGray-5 py-3 pl-4 pr-[10px]`}
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
      enabled,
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
