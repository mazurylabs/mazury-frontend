import useSWR from 'swr';
import { ConnectionType } from '../types';

export const useConnectionStatus = (address: string) => {
  const { data, error } = useSWR<ConnectionType[]>(
    `connections/check/?eth_address=${address}`
  );

  return {
    connectionStatus: { ...(data && data[0]) },
    error,
  };
};
