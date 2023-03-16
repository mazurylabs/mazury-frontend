import { configureAuth } from 'react-query-auth';
import { disconnect } from '@wagmi/core';

import { axios } from 'lib/axios';
import storage from 'utils/storage';
import { clearWagmiStorage } from 'utils';
import { getUserFn } from 'utils/api';

import {
  ACCESS_TOKEN_KEY,
  REFRESH_TOKEN_KEY,
  STORED_USER,
  USER_ADDRESS,
} from 'config';

export async function logoutFn() {
  await disconnect();
  clearWagmiStorage();

  storage.clearToken(USER_ADDRESS);
  storage.clearToken(REFRESH_TOKEN_KEY);
  storage.clearToken(ACCESS_TOKEN_KEY);
  storage.clearToken(STORED_USER);
}

export async function userFn() {
  const address = storage.getToken(USER_ADDRESS);
  if (!address) return null;

  const user = await getUserFn(address);

  return user;
}

async function loginFn({
  message,
  signature,
  address,
}: {
  message: string;
  signature: string;
  address: string;
}) {
  const { data: tokens } = await axios.post<{
    access_token: string;
    refresh: string;
  }>(`auth/siwe/verify`, {
    message,
    user: address,
    signature,
  });

  storage.setToken(tokens.refresh, REFRESH_TOKEN_KEY);
  storage.setToken(tokens.access_token, ACCESS_TOKEN_KEY);

  const user = await getUserFn(address);
  storage.setToken(user, STORED_USER);
  return user;
}

const { useUser, useLogin, useRegister, useLogout, AuthLoader } = configureAuth(
  {
    userFn,
    logoutFn,
    loginFn,
    registerFn: async () => null,
  }
);

export { useUser, useLogin, useRegister, useLogout, AuthLoader };
