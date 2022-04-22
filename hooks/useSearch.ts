import useSWR from 'swr';
import useSWRInfinite from 'swr/infinite';
import { BadgeIssuer, BadgeType, ListResponse, Profile, Role } from 'types';

export const useProfileSearch = (
  offset: number,
  badgeSlugs: string[],
  roles: Role[]
) => {
  // TODO: Pagination
  const { data, error } = useSWR<ListResponse<Profile>>(
    `/search/profiles/?badges=${badgeSlugs.join(';')}&role=${
      roles[0]?.split('role_')?.[1]
    }&offset=${offset}&limit=20`
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
