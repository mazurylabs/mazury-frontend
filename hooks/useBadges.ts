import { useInfiniteQuery } from '@tanstack/react-query';
import clsx from 'clsx';

import type { ListResponse, Badge } from 'types';
import { axios } from 'lib/axios';

export const fetchBadges = async ({
  issuer,
  address,
  limit = 4,
  nextPage,
  query,
}: {
  address: string;
  issuer?: string;
  limit: number;
  nextPage?: string;
  query?: string;
}): Promise<ListResponse<Badge>> => {
  const { data } = await axios.get(
    nextPage ||
      `/search/badges?owner=${address}&size=${limit}${
        query ? `&query=${query}` : ''
      }${issuer ? `&filters=${issuer}` : ''}`
  );

  return data;
};

export const useBadges = (
  address: string,
  issuer?: string,
  limit: number = 4,
  query?: string,
  enabled: boolean = true
) => {
  const {
    isLoading,
    error,
    data,
    isFetchingNextPage,
    fetchNextPage,
    hasNextPage,
  } = useInfiniteQuery(
    clsx('badges', address, query && query, issuer && issuer).split(' '),
    ({ pageParam }) =>
      fetchBadges({ address, issuer, limit, nextPage: pageParam, query }),
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
  }, {} as ListResponse<Badge>);

  return {
    badges: queryResponse?.results || [],
    error,
    count: queryResponse?.count || 0,
    handleFetchMore: fetchNextPage,
    hasMoreData: hasNextPage,
    isLoading: isLoading,
    isFetchingNextPage,
  };
};
