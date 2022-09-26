import useSWR from 'swr';
import { CredentialCount } from '../types';

export const useCredentialCount = (address: string) => {
  const { data, error } = useSWR<CredentialCount>(
    `profiles/${address}/credential_counts/`
  );

  return {
    credentialCount: data,
    error,
  };
};
