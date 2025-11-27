// src/features/events/api/attendees-event.api.ts

import { api } from '@/api/api';

// --- Type Definitions ---

export interface Attendee {
  id: string;
  full_name: string;
  scannedByFullName: string;
  job?: string; 
}

// 🛑 CORRECTION ICI : La réponse directe de l'API est un tableau
export type GetAttendeesListResponse = Attendee[]; 

// Les interfaces suivantes peuvent être conservées si vous les utilisez ailleurs pour l'adaptateur
interface ParticipantsListResponseForUI {
    participants: Attendee[];
    currentPage: number;
    totalPages: number;
    totalParticipants: number;
}

// --- RTK Query Endpoint Injection ---

export const attendeesEventApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getAttendeesList: builder.query<GetAttendeesListResponse, { 
        eventId: string; 
        page: number; 
        search: string 
    }>({
      query: ({ eventId, page, search }) => ({
        url: `/event/events/${eventId}/get_attendees/`,
        params: {
            page: page,
            search: search,
        },
      }),
      // 🛑 CORRECTION ICI : Utilisez `result` directement (qui est un tableau), et vérifiez sa présence
      providesTags: (result, error, { eventId }) => 
        result 
          ? [
              { type: 'Attendee', id: 'LIST' },
              // `result` est déjà le tableau (Attendee[])
              ...result.map(({ id }) => ({ type: 'Attendee' as const, id })),
            ]
          : [{ type: 'Attendee', id: 'LIST' }],
    }),
  }),
});

export const { useGetAttendeesListQuery } = attendeesEventApi;