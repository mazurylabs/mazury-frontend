import Axios from 'axios';
import { useQuery } from '@tanstack/react-query';

import { MutualFollowers } from '../types';
import { formatNumber } from 'utils';

export const useMutualFollowers = (
  viewingProfileId: string,
  yourProfileId: string
) => {
  const { data, isLoading } = useQuery({
    queryKey: ['mutualFollowers', viewingProfileId, yourProfileId],
    queryFn: () => getMutualFollowers(viewingProfileId, yourProfileId),
    enabled:
      !!viewingProfileId &&
      !!yourProfileId &&
      viewingProfileId !== yourProfileId,
  });

  const followers = +(
    data?.mutualFollowersProfiles?.pageInfo?.totalCount || '0'
  );
  const mutualFollowers = +(
    data?.mutualFollowersProfiles?.items?.length || '0'
  );

  return {
    isLoading,
    mutualFollowers: data?.mutualFollowersProfiles,
    remainingFollowers: formatNumber(followers - mutualFollowers),
    lensFollowers: formatNumber(followers),
  };
};

export const getMutualFollowers = async (
  viewingProfileId: string,
  yourProfileId: string
): Promise<Record<'mutualFollowersProfiles', MutualFollowers>> => {
  try {
    const query = {
      query: `
      query {
        mutualFollowersProfiles(
          request: {
            viewingProfileId: ${JSON.stringify(viewingProfileId)}
            yourProfileId: ${JSON.stringify(yourProfileId)}
            limit: ${JSON.stringify(2)}
          }
        ) {
          items {
            id
            name
            handle
            picture {
              ... on NftImage {
                uri
              }
              ... on MediaSet {
                original {
                  url
                }
              }
            }
            ownedBy
          }
          pageInfo {
            totalCount
          }
        }
      }
      `,
    };

    const response = await Axios({
      url: 'https://api.lens.dev/',
      method: 'post',
      data: query,
    });

    return response.data.data;
  } catch (error) {
    throw error;
  }
};
