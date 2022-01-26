import useSWR from 'swr';
import { Profile } from '../types';

export const useProfile = (address: string) => {
  const { data, error } = useSWR<Profile>(`/profiles/${address}`);

  return {
    profile: data as Profile,
    error,
  };
};
