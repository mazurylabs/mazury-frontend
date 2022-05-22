import React, { useEffect, useState } from 'react';
import useSWR from 'swr';
import { BadgeType, ListResponse } from '../types';

export const useBadgeTypes = (issuer: string = 'mazury') => {
  const { data, error } = useSWR<ListResponse<BadgeType>>(
    `badge_types?issuer=${issuer}`
  );

  return {
    badgeTypes: data?.results,
    nextBadgeType: data?.next || '',
    error,
  };
};

export const useTotalBadgeCounts = () => {
  const { badgeTypes, error } = useBadgeTypes();
  const [totalBadgeCounts, setTotalBadgeCounts] = useState<{
    [key: string]: number;
  }>({});

  useEffect(() => {
    if (badgeTypes) {
      const badgeCounts: { [key: string]: number } = {};
      badgeTypes.forEach((badgeType) => {
        badgeCounts[badgeType.id] = badgeType.total_supply!;
      });
      setTotalBadgeCounts(badgeCounts);
    }
  }, [badgeTypes]);

  return {
    totalBadgeCounts,
    error,
  };
};
