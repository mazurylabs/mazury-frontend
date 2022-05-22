import useSWR from 'swr';
import useSWRInfinite from 'swr/infinite';
import { BadgeIssuer, BadgeType, ListResponse, Profile, Role } from 'types';

const generateProfilesSearchQuery = (
  offset: number,
  badgeSlugs: string[],
  roles: Role[],
  skillSlugs: string[]
) => {
  const badgesPart =
    badgeSlugs.length > 0 ? `&badges=${badgeSlugs.join(';')}` : '';
  const rolesPart =
    roles.length > 0 ? `&roles=${roles[0]?.split('role_')?.[1]}` : '';
  const skillsPart =
    skillSlugs.length > 0 ? `&skills=${skillSlugs.join(';')}` : '';
  return `/search/profiles/?offset=${offset}&limit=20${badgesPart}${rolesPart}${skillsPart}`;
};

export const useProfileSearch = (
  offset: number,
  badgeSlugs: string[],
  roles: Role[],
  skillSlugs: string[]
) => {
  const { data, error } = useSWR<ListResponse<Profile>>(
    generateProfilesSearchQuery(offset, badgeSlugs, roles, skillSlugs)
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
