import { Action, combineReducers } from 'redux';
import { ThunkAction } from '@reduxjs/toolkit';
import storage from 'redux-persist/lib/storage';
import { persistReducer } from 'redux-persist';

import userReducer from './user';

const rootReducer = combineReducers({
  user: userReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

export type AppThunk = ThunkAction<void, RootState, undefined, Action<string>>;

const persistConfig = {
  key: 'Mazury',
  version: 1,
  storage,
  blacklist: ['alert'],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export default persistedReducer;
