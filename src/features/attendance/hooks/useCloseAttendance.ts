// Fichier: ../hooks/useCloseAttendance.ts (ou dans le même fichier que useActivateAttendance si vous préférez)

import { useState } from 'react';
import { useClosePresenceMutation} from '../api/attendance-event-api';
import type { AttendanceActionResponse } from '../api/attendance-event-api'
import { getErrorMessage } from '@/api/utils'; // Assurez-vous que ce chemin est correct

/**
 * Hook personnalisé pour gérer la fermeture de la session de présence d'un événement.
 */
export const useCloseAttendance = () => {
  const [
    closeSession, 
    { 
      isLoading: isClosing, 
      error: mutationError 
    }
  ] = useClosePresenceMutation();

  const [closingLocalError, setClosingLocalError] = useState<string | null>(null);

  /**
   * Fonction pour lancer la fermeture de la présence.
   * @param eventId L'ID de l'événement à fermer.
   * @returns La réponse de l'API en cas de succès.
   */
  const handleClose = async (
    eventId: string, 
  ): Promise<AttendanceActionResponse | undefined> => {
    setClosingLocalError(null); 
    
    try {
      // La mutation prend directement l'ID de l'événement
      const result = await closeSession(eventId).unwrap();
      
      return result;
      
    } catch (err) {
      // Gère les erreurs de l'API ou du réseau
      const errorMessage = getErrorMessage(err);
      setClosingLocalError(errorMessage);
      console.error("Échec de la fermeture de la session:", err);
      throw err; // Relancer l'erreur après l'avoir formatée
    }
  };

  return {
    closeAttendance: handleClose,
    isClosing,
    closingError: closingLocalError || (mutationError ? getErrorMessage(mutationError) : null),
  };
};