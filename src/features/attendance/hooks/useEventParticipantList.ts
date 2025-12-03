// src/features/events/hooks/useEventParticipantList.ts

import { useGetAttendeesListQuery } from "../api/attendees-event-api";

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

export const useEventParticipantsList = (eventId: string, page: number = 1, searchQuery: string = '') => {
  const { 
    data,
    isLoading: isQueryLoading,
    error: queryError, 
    isFetching 
  } = useGetAttendeesListQuery({
    eventId: eventId,
    page: page, 
    search: searchQuery,
  }, {
    skip: !eventId,
    refetchOnMountOrArgChange: false,
    refetchOnFocus: true,
    refetchOnReconnect: true,
    pollingInterval: 5000, 
  });

  const isLoading = isQueryLoading && !data;

  const error = queryError 
    ? ('status' in queryError 
        ? `Error ${queryError.status}: Check network or permissions.` 
        : 'An unknown error occurred.') 
    : '';

  const participants: Participant[] = data?.map(attendee => ({
    id: attendee.id,
    fullName: attendee.full_name,
    scannedBy: attendee.scannedByFullName,
    job: attendee.job || 'N/A',
  })) || [];

  const totalParticipants = participants.length;
  const totalPages = 1; 
  
  const participantsData: ParticipantsListResponse = {
    participants: participants,
    currentPage: 1,
    totalPages: totalPages, 
    totalParticipants: totalParticipants,
  };

  return { 
    data: participantsData, 
    isLoading, 
    isRefetching: isFetching, 
    error
  };
};