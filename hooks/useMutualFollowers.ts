import { MutualFollowers } from '../types';
import { getMutualFollowers } from '../utils/api';
import * as React from 'react';
import { formatNumber } from '@/utils';

export const useMutualFollowers = (
  viewingProfileId: string,
  yourProfileId: string
) => {
  const [mutualFollowers, setMutualFollowers] = React.useState<MutualFollowers>(
    {} as MutualFollowers
  );

  const hasValidData =
    viewingProfileId && yourProfileId && viewingProfileId !== yourProfileId;

  const remainingFollowers = hasValidData
    ? formatNumber(
        +mutualFollowers?.pageInfo?.totalCount - +mutualFollowers?.items?.length
      )
    : 0;

  React.useEffect(() => {
    const getFollowers = async () => {
      try {
        if (hasValidData) {
          const { data } = await getMutualFollowers(
            viewingProfileId,
            yourProfileId
          );
          setMutualFollowers(data.mutualFollowersProfiles);
        }
      } catch (error) {
        console.log(error);
      }
    };

    getFollowers();
  }, [viewingProfileId, yourProfileId]);

  return { mutualFollowers, remainingFollowers };
};
