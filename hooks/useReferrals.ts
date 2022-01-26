import useSWR from 'swr';
import { ListResponse, Referral } from '../types';

export const useReferrals = (address: string) => {
  const { data, error } = useSWR<ListResponse<Referral>>(
    `/referrals/?receiver=${address}`
  );

  return {
    referrals: data?.results,
    error,
  };
};
