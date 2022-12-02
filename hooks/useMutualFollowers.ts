import { MutualFollowers } from '@/types';
import { getMutualFollowers } from '@/utils/api';
import * as React from 'react';

export const useMutualFollowers = (
  viewingProfileId: string,
  yourProfileId: string
) => {
  const [mutualFollowers, setMutualFollowers] = React.useState<MutualFollowers>(
    {} as MutualFollowers
  );

  React.useEffect(() => {
    const getFollowers = async () => {
      try {
        if (
          viewingProfileId &&
          yourProfileId &&
          viewingProfileId !== yourProfileId
        ) {
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
  }, []);

  return { mutualFollowers };
};
