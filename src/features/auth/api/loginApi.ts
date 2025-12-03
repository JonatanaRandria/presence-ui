// /src/api/api.ts

import { api } from '@/api/api';
import type { UserResponse, LoginCredentials, TokenVerificationCredentials } from '../types/auth';

export const loginApi = api.injectEndpoints({
  endpoints: (builder) => ({
    // 1. Ancienne logique de connexion (email/password)
    loginWithCredentials: builder.mutation<UserResponse, LoginCredentials>({
      query: (credentials) => ({ url: '/login', method: 'POST', body: credentials }),
    }),
    
    // 2. Nouvelle logique de vérification de token (par exemple, sur un endpoint /me)
    verifyToken: builder.mutation<UserResponse, TokenVerificationCredentials>({
      query: (credentials) => ({ 
          url: '/ping', // Utilisez un endpoint d'API approprié
          method: 'POST', 
          // Si l'API attend le token dans le corps, c'est bon
          body: credentials
      }),
    }),
  }),
});

// Exporter les nouveaux hooks de mutation
export const { useLoginWithCredentialsMutation, useVerifyTokenMutation } = loginApi;