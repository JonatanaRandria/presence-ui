import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { API_URL } from '@/config';
import type { RootState } from '@/stores/store';


export const api = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://127.0.0.1:8000/api',
    prepareHeaders: (headers, { getState }) => {
      headers.set('Content-Type', 'application/json');
      const token = (getState() as RootState).auth.token;
      if (token) {
        headers.set('authorization', `Bearer ${token}`);
      }

      console.log(API_URL);
      
      return headers;
    },
  }),
  tagTypes: ['Attendee','Event','User',],
  endpoints: () => ({}),
});
