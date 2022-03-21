import { useEffect, useState } from 'react';
import useSWR from 'swr';
import { skillsList } from 'utils';
import { ListResponse, Referral, Skill } from '../types';

export const useReferrals = (address: string, authored: boolean = false) => {
  const { data, error } = useSWR<ListResponse<Referral>>(
    `/referrals/?${authored ? 'author' : 'receiver'}=${address}`
  );
  const [referrals, setReferrals] = useState<Referral[]>([]);

  useEffect(() => {
    const res = data?.results;
    if (res) {
      for (let item of res) {
        let skills: Skill[] = [];
        for (let skill of skillsList) {
          if (item[skill]) {
            skills.push(skill);
          }
        }
        item.skills = skills;
      }
      setReferrals(res);
    }
  }, [data?.results]);

  return {
    referrals,
    error,
  };
};
