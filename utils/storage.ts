import jwt_decode from 'jwt-decode';
import { APP_STORAGE_PREFIX } from '../config/index';

const storage = {
  getToken: (key: string) => {
    return JSON.parse(
      window.localStorage.getItem(APP_STORAGE_PREFIX + key) as string
    );
  },
  setToken: (token: any, key: string) => {
    window.localStorage.setItem(
      APP_STORAGE_PREFIX + key,
      JSON.stringify(token)
    );
  },
  clearToken: (key: string) => {
    window.localStorage.removeItem(APP_STORAGE_PREFIX + key);
  },
  isTokenExpired: (token?: string) => {
    if (!token) return true;

    const decodedToken = jwt_decode(token) as { exp: number };

    return decodedToken?.exp < Date.now() / 1000;
  },
};

export default storage;
