import {combineReducers, configureStore } from '@reduxjs/toolkit';
import { APP_TITLE } from '@/config';
import { api } from '@/api/api';
// Importing reducers with the full path because reexporting from src/features/{featureName} causes issues using preloadedState in tests
/* eslint-disable no-restricted-imports */
import authReducer from '@/features/auth/stores/authSlice';

const rootReducer = combineReducers({
  [api.reducerPath]: api.reducer,
  auth: authReducer,
});


// This should be Preloaded<RootState> but for developpement, we use temporary Partial type. Typescript kept happy, however we should check the right way to type this.
export const setupStore = (preloadedState?: Partial<RootState>) =>
  configureStore({
    reducer: rootReducer,
    preloadedState,
    devTools: {
      name: APP_TITLE,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(api.middleware),
  });

export const store = setupStore();

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore['dispatch'];
