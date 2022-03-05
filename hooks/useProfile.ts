import useSWR from 'swr';
import { Profile } from '../types';

export const useProfile = (address: string) => {
  const { data, error } = useSWR<Profile>(`/profiles/${address}`);

  return {
    profile: data!,
    error: error,
  };
};

export const useIsOnboarded = (address: string) => {
  const { profile, error } = useProfile(address);

  return {
    onboarded: profile?.onboarded,
    error,
  };
};
