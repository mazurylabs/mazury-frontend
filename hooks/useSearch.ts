import useSWR from 'swr';
import useSWRInfinite from 'swr/infinite';
import { BadgeIssuer, BadgeType, ListResponse, Profile, Role } from 'types';

const generateProfilesSearchQuery = (
  offset: number,
  badgeSlugs: string[],
  roles: Role[],
  skillSlugs: string[],
  query: string,
  contactable: boolean
) => {
  const badgesPart =
    badgeSlugs.length > 0
      ? badgeSlugs.join(';') === 'undefined'
        ? ''
        : `&badges=${badgeSlugs.join(';')}`
      : '';
  const rolesPart =
    roles.length > 0 ? `&roles=${roles[0]?.split('role_')?.[1]}` : '';
  const skillsPart =
    skillSlugs.length > 0 ? `&skills=${skillSlugs.join(';')}` : '';
  const queryPart = query ? `&query=${query}` : '';
  const contactablePart = contactable ? '&contactable=true' : '';

  return `/search/profiles/?offset=${offset}&limit=20${queryPart}${badgesPart}${rolesPart}${skillsPart}${contactablePart}`;
};

export const useProfileSearch = (
  offset: number,
  badgeSlugs: string[],
  roles: Role[],
  skillSlugs: string[],
  query: string,
  contactable: boolean
) => {
  const { data, error } = useSWR<ListResponse<Profile>>(
    generateProfilesSearchQuery(
      offset,
      badgeSlugs,
      roles,
      skillSlugs,
      query,
      contactable
    )
  );

  return {
    profiles: data?.results,
    error,
    count: data?.count,
    hasNextPage: !!data?.next,
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

export const useSkillsSearch = (query: string) => {
  // TODO: Pagination
  const { data, error } = useSWR<ListResponse<{ name: string; slug: string }>>(
    `/search/skills/?query=${query}`
  );

  return {
    skills: data?.results,
    count: data?.count,
    error,
  };
};
