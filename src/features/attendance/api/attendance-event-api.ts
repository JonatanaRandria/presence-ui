// Fichier: ../api/attendanceApi.ts

import { api } from '@/api/api';
import type { Event } from '../types'; // Assurez-vous que le type Event est importé

// --- Définitions de types pour les endpoints de présence (Attendance) ---

export type ActivatePresencePayload = {
  official_latitude?: number;
  official_longitude?: number;
  primary_responsible_id?: string;
};

export type AttendanceActionResponse = {
  status: 'success' | 'error';
  message: string;
  event_status: string; // Ex: 'IN_PROGRESS' ou 'PASSED'
  primary_responsible_id?: string | null; 
};

// --- API Client (Injection d'endpoints) ---

export const attendanceApi = api.injectEndpoints({
  endpoints: (builder) => ({
    /**
     * Action pour ACTIVER la session de présence d'un événement.
     * Route attendue: /event/events/{id}/activate_presence/ (POST)
     */
    activatePresence: builder.mutation<
      AttendanceActionResponse,
      { id: string; data: ActivatePresencePayload }
    >({
      query: ({ id, data }) => ({
        url: `/event/events/${id}/activate_presence/`,
        method: 'POST',
        body: data,
      }),
      invalidatesTags: (result, error, { id }) => [{ type: 'Event', id }],
    }),

    /**
     * Action pour FERMER la session de présence d'un événement.
     * Route attendue: /event/events/{id}/close_presence/ (POST)
     */
    closePresence: builder.mutation<
      AttendanceActionResponse,
      string // L'ID de l'événement
    >({
      query: (id) => ({
        url: `/event/events/${id}/close_presence/`,
        method: 'POST',
      }),
      invalidatesTags: (result, error, id) => [{ type: 'Event', id }],
    }),
  }),
});

export const { useActivatePresenceMutation, useClosePresenceMutation } = attendanceApi;