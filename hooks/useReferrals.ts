import { useEffect, useState } from 'react';
import useSWR from 'swr';
import { skillsList } from 'utils';
import { ListResponse, Referral, Skill } from '../types';

export const useReferrals = (address: string, authored: boolean = false) => {
  const { data, error } = useSWR<ListResponse<Referral>>(
    `/referrals/?${authored ? 'author' : 'receiver'}=${address}`
  );

  return {
    referrals: data?.results,
    error,
    count: data?.count,
  };
};
