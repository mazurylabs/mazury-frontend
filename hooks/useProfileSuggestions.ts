import useSWR from 'swr';
import { useDispatch } from 'react-redux';
import { ListResponse, Profile } from '../types';
import { setSuggestions } from '../slices/profileSuggestions';

export const useProfileSuggestions = (
  address?: string,
  options?: { isNetwork?: boolean; limit?: number }
) => {
  const dispatch = useDispatch();

  const networkParam = options?.isNetwork ? '?network=' : '';
  const limitParam = options?.limit ? '&limit=' + options?.limit : '';

  const { data, error } = useSWR<ListResponse<Profile>>(
    `/profiles/${networkParam}${address}${limitParam}`
  );

  if (data) dispatch(setSuggestions(data?.results));

  return {
    profiles: data?.results,
    error,
  };
};
