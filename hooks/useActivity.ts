import useSWR from 'swr';
import { ListResponse, Activity } from '../types';

export const useActivity = (
  address: string,
  options?: { isNetwork?: boolean; limit?: number }
) => {
  // TODO: Pagination

  const networkParam = options?.isNetwork ? 'network' : 'user';
  const limitParam = options?.limit ? '&limit=' + options?.limit : '';

  const { data, error } = useSWR<ListResponse<Activity>>(
    `/activity?${networkParam}=${address}${limitParam}`
  );

  return {
    activity: data?.results,
    error,
  };
};
