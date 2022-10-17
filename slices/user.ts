import { ACCESS_TOKEN_KEY, REFRESH_TOKEN_KEY } from '../config/index';
import { Profile } from '../types';
import storage from '../utils/storage';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface UserState {
  address: string | null;
  isAuthenticated: boolean;
  profile: null | Profile;
  loading: boolean;
  error: boolean;
}

export const initialState: UserState = {
  address: null,
  isAuthenticated: false,
  profile: null,
  error: false,
  loading: false,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setAddress: (state, { payload }: PayloadAction<string>) => {
      state.address = payload;
    },

    login: (state, { payload }: PayloadAction<Profile>) => {
      state.loading = true;
      state.isAuthenticated = true;
      state.profile = payload;
      state.loading = false;
    },

    loginError: (state) => {
      state.error = true;
      state.isAuthenticated = false;
      state.loading = false;
    },

    logout: (state) => {
      state.loading = true;
      state.isAuthenticated = false;
      state.address = null;
      state.profile = null;
      state.error = false;
      state.loading = false;
      storage.clearToken(ACCESS_TOKEN_KEY);
      storage.clearToken(REFRESH_TOKEN_KEY);
    },
  },
});

export const { login, loginError, logout, setAddress } = authSlice.actions;

export default authSlice.reducer;
