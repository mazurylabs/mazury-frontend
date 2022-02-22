import { useEffect, useState } from 'react';
import useSWR from 'swr';
import { ListResponse, Referral, Skill } from '../types';

const skillsList: Skill[] = [
  'frontendDev',
  'backendDev',
  'smartContractDev',
  'protocolDev',
  'design',
  'growthMarketing',
  'writing',
  'productManagement',
  'projectManagement',
  'dataScience',
  'art',
  'defiDegen',
  'nftDegen',
  'teaching',
  'memes',
  'community',
];

export const useReferrals = (address: string) => {
  const { data, error } = useSWR<ListResponse<Referral>>(
    `/referrals/?receiver=${address}`
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
