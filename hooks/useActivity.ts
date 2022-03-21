import useSWR from 'swr';
import { ListResponse, Activity } from '../types';

export const useActivity = (address: string) => {
  // TODO: Pagination
  const { data, error } = useSWR<ListResponse<Activity>>(
    `/activity?user=${address}`
  );

  return {
    activity: data?.results,
    error,
  };
};
