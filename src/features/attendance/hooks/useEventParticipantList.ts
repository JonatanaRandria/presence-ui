// src/features/events/hooks/useEventParticipantList.ts

import { useGetAttendeesListQuery } from "../api/attendees-event-api";

// --- Interfaces ---

export interface Participant {
  id: string;
  fullName: string;
  scannedBy: string;
  job: string;
}

interface ParticipantsListResponse {
    participants: Participant[];
    currentPage: number;
    totalPages: number;
    totalParticipants: number;
}

// --- Hook ---

export const useEventParticipantsList = (eventId: string, page: number = 1, searchQuery: string = '') => {
  const { 
    data, // data est de type Attendee[]
    isLoading: isQueryLoading,
    error: queryError, 
    isFetching 
  } = useGetAttendeesListQuery({
    eventId: eventId,
    page: page, 
    search: searchQuery,
  }, {
    // Ne pas exécuter la requête si l'ID est manquant
    skip: !eventId,
    refetchOnMountOrArgChange: true,
  });

  // 1. Détermination de l'état de chargement
  const isLoading = isQueryLoading || isFetching;

  // 2. Traitement de l'erreur (création de la variable `error` de type string)
  const error = queryError 
    ? ('status' in queryError 
        ? `Error ${queryError.status}: Check network or permissions.` 
        : 'An unknown error occurred.') 
    : '';

  // 3. Mapping des données (data est un tableau)
  // Utilise `data` directement car l'API retourne un tableau (Attendee[])
  const participants: Participant[] = data?.map(attendee => ({
    id: attendee.id,
    fullName: attendee.full_name,
    scannedBy: attendee.scannedByFullName,
    job: attendee.job || 'N/A', // Ajout de 'N/A' si le champ est manquant
  })) || [];

  // 4. Construction de l'objet de réponse pour l'UI
  const totalParticipants = participants.length;
  const totalPages = 1; // Fixé à 1 car la pagination UI est désactivée
  
  const participantsData: ParticipantsListResponse = {
    participants: participants,
    currentPage: 1,
    totalPages: totalPages, 
    totalParticipants: totalParticipants,
  };

  return { 
    data: participantsData, 
    isLoading, 
    error // Retourne la variable `error` (string) correctement définie
  };
};