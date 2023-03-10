import { axios } from 'lib/axios';
import { useQuery } from '@tanstack/react-query';
import clsx from 'clsx';

import { ListResponse, Profile } from '../types';

const getProfileSuggestions = async ({
  address,
  networkParam,
  limitParam,
}: {
  address: string;
  networkParam: string;
  limitParam: string;
}) => {
  const { data } = await axios.get<ListResponse<Profile>>(
    clsx(`/profiles/`, networkParam, address, limitParam).split(' ').join('')
  );

  return data.results;
};

export const useProfileSuggestions = (
  address?: string,
  options?: { isNetwork?: boolean; limit?: number }
) => {
  const networkParam = clsx(options?.isNetwork && '?network=');
  const limitParam = clsx(options?.limit && '&limit=' + options?.limit);

  const { data, error } = useQuery({
    queryKey: clsx('profileSuggestions').split(' '),
    queryFn: () =>
      getProfileSuggestions({
        address: address || '',
        networkParam,
        limitParam,
      }),
  });

  return {
    profiles: data,
    error,
  };
};
