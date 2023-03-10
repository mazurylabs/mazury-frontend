import * as React from 'react';
import { PersistGate } from 'redux-persist/integration/react';
import { configureStore } from '@reduxjs/toolkit';
import { combineReducers } from 'redux';
import storage from 'redux-persist/lib/storage';
import { persistReducer } from 'redux-persist';

import { persistStore } from 'redux-persist';

const rootReducer = combineReducers({});

const persistConfig = {
  key: 'Mazury',
  storage,
};

const reducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer,
  devTools: process.env.NODE_ENV !== 'production',
});

const persistor = persistStore(store);

export const ReduxProvider: React.FC = ({ children }) => {
  return (
    <PersistGate loading={null} persistor={persistor}>
      {children}
    </PersistGate>
  );
};
