import { axios } from '../lib/axios';
import { useEffect, useRef, useState } from 'react';
import useSWR from 'swr';
import type { ListResponse, Badge, BadgeIssuer } from '../types';

export const useBadges = (
  address: string,
  issuer: BadgeIssuer = 'mazury',
  limit: number = 4
) => {
  const [fetchMore, setFetchMore] = useState(false);
  const [badges, setBadges] = useState<Badge[]>([]);
  const [nextEndpoint, setNextEndpoint] = useState('');

  const { data, error } = useSWR<ListResponse<Badge>>(
    `/badges/?owner=${address}&issuer=${issuer}&limit=${limit}`
  );

  const handleFetchMore = () => setFetchMore(true);

  useEffect(() => {
    setBadges(data?.results as Badge[]);
    data?.next ? setNextEndpoint(data?.next) : setNextEndpoint('');
  }, [data]);

  useEffect(() => {
    const fetchMoreBadges = async () => {
      if (fetchMore && nextEndpoint) {
        const { data } = await axios.get(nextEndpoint);

        if (data?.results.length !== 0) {
          setBadges((badges) => badges.concat(data?.results));
          setFetchMore(false);
          setNextEndpoint(data?.next);
        }
      }
    };

    fetchMoreBadges();
  }, [fetchMore, nextEndpoint]);

  return {
    badges,
    error,
    count: data?.count,
    handleFetchMore,
    hasMoreData: Boolean(nextEndpoint),
  };
};
