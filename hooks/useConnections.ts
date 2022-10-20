import useSWR from 'swr';
import { ConnectionType, ListResponse } from '../types';

export const useConnections = () => {
  const { data, error } = useSWR<ListResponse<ConnectionType>>(`connections`);

  return {
    connections: data?.results,
    error,
  };
};
