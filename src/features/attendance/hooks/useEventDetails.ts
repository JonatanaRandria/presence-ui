// src/features/events/hooks/useEventDetails.ts

import { useState, useEffect } from 'react';

interface EventDetails {
  title: string;
  // Vous pouvez ajouter d'autres détails ici
}

const mockEventDetails: Record<string, EventDetails> = {
  'event-123': { title: 'Grande Conférence sur l\'IA et le Futur' },
  'event-456': { title: 'Workshop de Développement Mobile' },
  // Ajoutez d'autres données simulées si nécessaire
};

export const useEventDetails = (eventId: string) => {
  const [event, setEvent] = useState<EventDetails | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!eventId) {
      setError('Event ID is missing.');
      setIsLoading(false);
      return;
    }

    setIsLoading(true);
    setError('');

    // Simulation d'un appel API avec un délai de 500ms
    const timer = setTimeout(() => {
      const details = mockEventDetails[eventId];
      if (details) {
        setEvent(details);
        setError('');
      } else {
        setEvent(null);
        setError(`Event with ID "${eventId}" not found.`);
      }
      setIsLoading(false);
    }, 500);

    return () => clearTimeout(timer);
  }, [eventId]);

  return { event, isLoading, error };
};