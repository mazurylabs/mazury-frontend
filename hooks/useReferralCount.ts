import useSWR from 'swr';

export const useReferralCount = (address: string, received: boolean = true) => {
  const type = received ? 'receiver' : 'author';
  const { data, error } = useSWR<{ count: number }>(
    `/referrals/count?type=${type}&address=${address}`
  );

  return {
    referralCount: data?.count,
    error,
  };
};
