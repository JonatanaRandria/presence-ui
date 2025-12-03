import { createSlice } from '@reduxjs/toolkit';
import { loginApi } from '../api/loginApi';
import storage from '@/utils/storage';
import type { AuthState, User } from '../types/auth';
import type { RootState } from '@/stores/store';
import type { PayloadAction } from '@reduxjs/toolkit';

type SetCredentialsPayload = {
  user: User;
  token: string;
};

const initialState: AuthState = {
  user: null,
  token: null,
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
    setCredentials: (state, { payload }: PayloadAction<SetCredentialsPayload>) => {
      state.token = payload.token;
      state.user = prepareUser(payload.user); 
    },
    logout: (state) => {
      state.user = null;
      state.token = null;
      storage.clearToken();
    },
    // ❌ Le reducer 'rememberAuth' est supprimé
  },
  extraReducers: (builder) => {
    builder
      // 1. Gère la connexion par identifiants
      .addMatcher(loginApi.endpoints.loginWithCredentials.matchFulfilled, (state, { payload }) => {
        const { token, ...user } = payload;
        
        state.token = token;
        state.user = prepareUser(user as User);
        

        console.log(payload);
        
        // ✅ La sauvegarde est maintenant INCONDITIONNELLE
        storage.setToken('token', token);
        storage.setToken('userId', payload.user.id);
      })
      
      // 2. Gère la vérification de session (par token)
      .addMatcher(loginApi.endpoints.verifyToken.matchFulfilled, (state, { payload }) => {
        const { token, ...user } = payload;
        
        state.token = token;
        state.user = prepareUser(user as User);
        // Le token est déjà dans le local storage
      })
      
      // 3. Gère l'échec de vérification
      .addMatcher(loginApi.endpoints.verifyToken.matchRejected, (state) => {
          state.user = null;
          state.token = null;
         
      });
  },
});

// ❌ 'rememberAuth' est retiré de l'exportation
export const { logout, setCredentials } = slice.actions; 

export default slice.reducer;

export const selectCurrentUser = (state: RootState) => state.auth.user;