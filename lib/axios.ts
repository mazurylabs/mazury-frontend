import Axios, { AxiosRequestConfig } from 'axios';

import { ACCESS_TOKEN_KEY, API_URL, REFRESH_TOKEN_KEY } from '../config/index';
import storage from '../utils/storage';

async function authRequestInterceptor(config: AxiosRequestConfig) {
  if (!config?.headers) return;

  const storedToken = storage.getToken(ACCESS_TOKEN_KEY);

  if (storedToken && !config?.headers['Authorization']) {
    config.headers['Authorization'] = `Bearer ${storedToken}`;
  }
  config.headers.Accept = 'application/json';
  return config;
}

async function refreshToken(refreshToken: string) {
  const res = await axios.post(`/auth/token/refresh`, {
    refresh: refreshToken,
  });

  return res.data;
}

async function authResponseErrorInterceptor(error: any) {
  const prevRequest = error?.config;

  const accessToken = storage.getToken(ACCESS_TOKEN_KEY);
  const refreshToken = storage.getToken(REFRESH_TOKEN_KEY);
  const isAccessExpired = storage.isTokenExpired(accessToken);
  const isRefreshExpired = storage.isTokenExpired(refreshToken);

  if (
    (isAccessExpired || error?.response?.status === 401) &&
    !prevRequest?.sent &&
    !isRefreshExpired
  ) {
    const storedToken = storage.getToken(REFRESH_TOKEN_KEY);

    prevRequest.sent = true;
    const { access } = await refreshToken(storedToken);
    storage.setToken(access, ACCESS_TOKEN_KEY);
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
