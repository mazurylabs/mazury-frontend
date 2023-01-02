import * as React from 'react';
import { useSelector } from 'react-redux';

import { userSlice } from 'selectors';
import { useProfile } from './useProfile';
import { Profile } from 'types';

export const useAccount = (address?: string) => {
  const user = useSelector(userSlice);
  const isOwnProfile = user?.profile?.eth_address === address;
  const { profile } = useProfile(!isOwnProfile ? address : '');
  const accountInView = isOwnProfile ? (user.profile as Profile) : profile;

  return {
    user,
    profile,
    isOwnProfile,
    accountInView,
  };
};
