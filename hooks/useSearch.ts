import useSWR from 'swr';
import { BadgeIssuer, BadgeType, ListResponse, Profile } from 'types';

export const useProfileSearch = (badgeSlugs: string[]) => {
  // TODO: Pagination
  const { data, error } = useSWR<ListResponse<Profile>>(
    `/search/profiles/?badges=${badgeSlugs.join(';')}`
  );

  return {
    profiles: data?.results,
    error,
    count: data?.count,
  };
};

export const useBadgesSearch = (query: string, issuer: BadgeIssuer) => {
  // TODO: Pagination
  const { data, error } = useSWR<ListResponse<BadgeType>>(
    `/search/badge-types/?query=${query}&issuer=${issuer}`
  );

  return {
    badges: data?.results,
    count: data?.count,
    error,
  };
};
