import { api } from '@/api/api';
import type { Event, CreateEvent } from '../types';

export const eventApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getAllEvents: builder.query<Event[], void>({
      query: () => ({
        url: '/event/events',
        method: 'GET',
      }),
    }),

    getEventById: builder.query<Event, string>({
      query: (id) => ({
        url: `/event/events/${id}`,
        method: 'GET',
      }),
    }),

    createEvent: builder.mutation<Event, CreateEvent>({
      query: (eventData) => ({
        url: '/event/events/',
        method: 'POST',
        body: eventData,
      }),
    }),
  }),
});

export const { 
  useGetAllEventsQuery, 
  useGetEventByIdQuery,
  useCreateEventMutation 
} = eventApi;
