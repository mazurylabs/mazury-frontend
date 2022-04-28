import useSWR from 'swr';
import { ListResponse, Profile } from '../types';

export const useProfileSuggestions = (
  address?: string,
  options?: { isNetwork?: boolean; limit?: number }
) => {
  const networkParam = options?.isNetwork ? '?network=' : '';
  const limitParam = options?.limit ? '&limit=' + options?.limit : '';

  const { data, error } = useSWR<ListResponse<Profile>>(
    `/profiles/${networkParam}${address}${limitParam}`
  );

  return {
    profiles: data?.results,
    error,
  };
};
