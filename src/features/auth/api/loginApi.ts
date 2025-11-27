import { api } from '@/api/api';
import type { UserResponse, LoginCredentials} from '../types/auth';

export const loginApi = api.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation<UserResponse, LoginCredentials>({
      query: (credentials) => ({ url: '/login', method: 'POST', body: credentials }),
    })
  }),
});

export const { useLoginMutation } = loginApi;
