import { ACCESS_TOKEN_KEY, REFRESH_TOKEN_KEY, USER_ADDRESS } from 'config';
import storage from 'utils/storage';

export const useUserSession = () => {
  const refreshToken = storage.getToken(REFRESH_TOKEN_KEY);
  const accessToken = storage.getToken(ACCESS_TOKEN_KEY);

  const isRefreshTokenExpired = storage.isTokenExpired(refreshToken);
  const isAccessTokenExpired = storage.isTokenExpired(accessToken);

  return isRefreshTokenExpired || isAccessTokenExpired;
};
