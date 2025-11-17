import  { createSlice } from '@reduxjs/toolkit';
import { loginApi } from '../api/loginApi';
import storage from '@/utils/storage';
import type { AuthState, User } from '../types/auth';
import type { RootState } from '@/stores/store';
import type  {PayloadAction } from '@reduxjs/toolkit';

const initialState: AuthState = {
  user: null,
  token: null,
  remember: null,
};

const prepareUser = (user: User): User => {
  
  return {
    ...user,
    image: user.image || `https://image.dummyjson.com/300x300/008080/ffffff?text=${user.username}`,
  };
};

const slice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.remember = null;
      storage.clearToken();
    },
    rememberAuth: (state, { payload }: PayloadAction<boolean>) => {
      state.remember = payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addMatcher(loginApi.endpoints.login.matchFulfilled, (state, { payload }) => {
        const { token, ...user } = payload;        
        state.token = token;
        state.user = prepareUser(payload);        
          storage.setToken('token',token);
          storage.setToken('userid',payload.user.id)
        
      })
  
  },
});

export const { logout, rememberAuth } = slice.actions;

export default slice.reducer;

export const selectCurrentUser = (state: RootState) => state.auth.user;
