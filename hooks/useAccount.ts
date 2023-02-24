import { useQuery } from '@tanstack/react-query';

import { useUser } from 'providers/react-query-auth';

import { Profile } from 'types';
import { useUserSession } from 'hooks';
import { getUserFn } from 'utils/api';
import storage from 'utils/storage';
import { STORED_USER } from 'config';

export const useAccount = (address: string) => {
  const userSessionExpired = useUserSession();
  const storedUser = storage.getToken(STORED_USER) as Profile;

  const { data: user, status } = useUser({
    enabled: !userSessionExpired,
    initialData: storedUser,
  });

  const isOwnProfile = user?.eth_address === address;

  const { data: profile } = useQuery({
    queryKey: ['profile', address],
    queryFn: async () => await getUserFn(address, isOwnProfile),
    enabled: !isOwnProfile,
  });

  const accountInView = isOwnProfile ? (user as Profile) : (profile as Profile);

  return {
    user: user as Profile,
    profile: profile as Profile,
    isOwnProfile,
    accountInView,
    status,
  };
};
