import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/router';

import { axios } from '../lib/axios';
import { Profile } from '../types';
import { login } from '../slices/user';
import { userSlice } from '../selectors';

export const useProfile = (
  address: string | undefined,
  isOwnProfile?: boolean
) => {
  const dispatch = useDispatch();
  const [profile, setProfile] = React.useState<Profile>();
  const [error, setError] = React.useState(null);

  React.useEffect(() => {
    const fetchProfile = async () => {
      try {
        const { data } = await axios.get(
          `/profiles/${address}${
            !isOwnProfile ? '?action=display_profile_page' : ''
          }`
        );

        if (data) {
          !isOwnProfile && setProfile(data);
          isOwnProfile && dispatch(login(data));
        }
      } catch (error: any) {
        setError(error);
      }
    };

    address && fetchProfile();
  }, []);

  return {
    profile,
    error,
  };
};

export const useIsOnboarded = () => {
  const router = useRouter();
  const { profile } = useSelector(userSlice);

  if (profile && !profile?.onboarded) router.push('/onboarding');
};
