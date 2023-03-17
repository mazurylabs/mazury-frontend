import { useQuery } from '@tanstack/react-query';

import { axios } from 'lib/axios';
import { CredentialsCount } from '../types';

const getCredentialCount = async (
  address: string
): Promise<CredentialsCount> => {
  const { data } = await axios.get(`/profiles/${address}/count/`);
  return data;
};

export const useCredentialCount = (address: string) => {
  return useQuery({
    queryKey: ['credentialCount', address],
    queryFn: () => getCredentialCount(address),
    enabled: !!address,
  });
};
