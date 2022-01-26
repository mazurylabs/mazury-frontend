import useSWR from 'swr';
import { ListResponse, Badge } from '../types';

export const useBadges = (address: string) => {
  // TODO: Pagination
  const { data, error } = useSWR<ListResponse<Badge>>(
    `/badges/?owner=${address}`
  );

  return {
    badges: data?.results,
    error,
  };
};
