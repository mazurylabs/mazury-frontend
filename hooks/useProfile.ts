import useSWR from 'swr';
import { Profile } from '../types';
import { useBadges } from './useBadges';

export const useProfile = (address: string) => {
  const { data, error } = useSWR<Profile>(`/profiles/${address}`);
  const { badges, error: badgesError } = useBadges(address);

  return {
    profile: data!,
    badges,
    error: error || badgesError,
  };
};
