import useSWR from 'swr';
import { BadgeType, ListResponse } from '../types';

export const useBadgeTypes = (issuer: string = 'mazury') => {
  const { data, error } = useSWR<ListResponse<BadgeType>>(
    `badge_types?issuer=${issuer}`
  );

  return {
    badgeTypes: data?.results,
    nextBadgeType: data?.next || '',
    error,
  };
};
