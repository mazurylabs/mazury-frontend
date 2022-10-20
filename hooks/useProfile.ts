import * as React from 'react';

import { axios } from '../lib/axios';
import { Profile } from '../types';

export const useProfile = (
  address: string | undefined,
  isOwnProfile?: boolean
) => {
  const [profile, setProfile] = React.useState<Profile>();
  const [error, setError] = React.useState(null);

  React.useEffect(() => {
    const fetchProfile = async () => {
      try {
        const { data } = await axios.get(
          `/profiles/${address}?action=display_profile_page`
        );

        if (data) {
          setProfile(data);
        }
      } catch (error: any) {
        setError(error);
      }
    };

    !isOwnProfile && fetchProfile();
  }, []);

  return {
    profile,
    error,
  };
};

export const useIsOnboarded = (address: string) => {
  const { profile, error } = useProfile(address);

  return {
    onboarded: profile?.onboarded,
    error,
  };
};
