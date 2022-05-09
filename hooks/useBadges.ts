import useSWR from 'swr';
import type { ListResponse, Badge, BadgeIssuer } from '../types';

export const useBadges = (address: string, issuer: BadgeIssuer = 'mazury') => {
  // TODO: Pagination
  const { data, error } = useSWR<ListResponse<Badge>>(
    `/badges/?owner=${address}&issuer=${issuer}`
  );

  return {
    badges: data?.results,
    error,
    count: data?.count,
  };
};
