// src/features/events/hooks/useEventParticipantList.ts

import { useState, useEffect } from 'react';

interface Participant {
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

// Mock Data
const ALL_MOCK_PARTICIPANTS: Participant[] = Array.from({ length: 55 }, (_, i) => ({
    id: `M-${1000 + i}`,
    fullName: `Participant Mock ${i + 1}`,
    scannedBy: i % 3 === 0 ? 'John Monitor' : 'Sophie Assistant',
    job: i % 2 === 0 ? 'Developer' : (i % 5 === 0 ? 'CTO' : 'Project Manager'),
}));

const PAGE_SIZE = 10;

export const useEventParticipantsList = (eventId: string, page: number = 1, searchQuery: string = '') => {
  const [data, setData] = useState<ParticipantsListResponse | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    setIsLoading(true);
    setError('');
    
    if (!eventId) {
      setError('Event ID is missing.');
      setIsLoading(false);
      setData({ participants: [], currentPage: 1, totalPages: 0, totalParticipants: 0 });
      return;
    }

    const timer = setTimeout(() => {
      
      const lowerCaseQuery = searchQuery.toLowerCase();
      
      // 1. Filtering Logic
      const filteredParticipants = ALL_MOCK_PARTICIPANTS.filter(p => 
          p.fullName.toLowerCase().includes(lowerCaseQuery) ||
          p.id.toLowerCase().includes(lowerCaseQuery) ||
          p.job.toLowerCase().includes(lowerCaseQuery)
      );

      // 2. Pagination Calculation
      const filteredTotal = filteredParticipants.length;
      const filteredTotalPages = Math.ceil(filteredTotal / PAGE_SIZE);

      const startIndex = (page - 1) * PAGE_SIZE;
      const endIndex = startIndex + PAGE_SIZE;
      
      const participantsForPage = filteredParticipants.slice(startIndex, endIndex);

      const response: ParticipantsListResponse = {
        participants: participantsForPage,
        currentPage: page,
        totalPages: filteredTotalPages,
        totalParticipants: filteredTotal,
      };

      setData(response);
      setIsLoading(false);
    }, 800);

    return () => clearTimeout(timer);
  }, [eventId, page, searchQuery]);

  return { data, isLoading, error };
};