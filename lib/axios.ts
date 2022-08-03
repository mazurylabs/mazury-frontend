import Axios, { AxiosRequestConfig } from 'axios';

import { ACCESS_TOKEN_KEY, API_URL, REFRESH_TOKEN_KEY } from '@/config';
import storage from '@/utils/storage';
import { refreshToken } from '@/utils/api';

async function authRequestInterceptor(config: AxiosRequestConfig) {
  if (!config?.headers) return;

  const storedToken = storage.getToken(ACCESS_TOKEN_KEY);

  if (storedToken && !config?.headers['Authorization']) {
    config.headers['Authorization'] = `Bearer ${storedToken}`;
  }
  config.headers.Accept = 'application/json';
  return config;
}

async function authResponseErrorInterceptor(error: any) {
  const prevRequest = error?.config;

  const storedToken = storage.getToken(ACCESS_TOKEN_KEY);
  const isExpired = storage.isTokenExpired(storedToken);

  if (error?.response?.status === 401 && isExpired && !prevRequest?.sent) {
    const storedToken = storage.getToken(REFRESH_TOKEN_KEY);

    prevRequest.sent = true;
    const { access } = await refreshToken(storedToken);
    prevRequest.headers['Authorization'] = `Bearer ${access}`;
    return axios(prevRequest);
  }
  return Promise.reject(error);
}

export const axios = Axios.create({
  baseURL: API_URL,
  headers: { 'Content-Type': 'application/json' },
  withCredentials: true,
});

axios.interceptors.request.use(authRequestInterceptor);

axios.interceptors.response.use(
  (response) => response,
  authResponseErrorInterceptor
);
