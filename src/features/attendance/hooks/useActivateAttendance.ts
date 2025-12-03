// Fichier: ../hooks/useActivateAttendance.ts

import { useState } from 'react';
import { useActivatePresenceMutation} from '../api/attendance-event-api'; 
import type { ActivatePresencePayload, AttendanceActionResponse } from '../api/attendance-event-api'
import { getErrorMessage } from '@/api/utils'; 


export const useActivateAttendance = () => {
  const [
    activateSession, 
    { 
      isLoading: isActivating, 
      error: mutationError 
    }
  ] = useActivatePresenceMutation();

  const [activationLocalError, setActivationLocalError] = useState<string | null>(null);

  /**
   * Fonction pour lancer l'activation de la présence.
   * @param eventId L'ID de l'événement.
   * @param latitude La latitude actuelle du responsable.
   * @param longitude La longitude actuelle du responsable.
   * @returns La réponse de l'API en cas de succès.
   */

  const handleActivate = async (
    eventId: string, 
    latitude: number,
    longitude: number
  ): Promise<AttendanceActionResponse | undefined> => {
    setActivationLocalError(null); 
    
   
    const currentUserId = localStorage.getItem('userId'); 

    if (!currentUserId) {
      setActivationLocalError("Erreur d'authentification: ID utilisateur introuvable pour la désignation du responsable.");
      throw new Error("ID utilisateur manquant pour l'activation."); 
    }

    const payload: ActivatePresencePayload = {
      primary_responsible_id: currentUserId,
      official_latitude: latitude,
      official_longitude: longitude,
    };

    try {
      const result = await activateSession({ 
        id: eventId, 
        data: payload 
      }).unwrap();
      
      return result;
      
    } catch (err) {
      const errorMessage = getErrorMessage(err);
      setActivationLocalError(errorMessage);
      console.error("Échec de l'activation de la session:", err);
      throw err; 
    }
  };

  return {
    activateAttendance: handleActivate,
    isActivating,
    activationError: activationLocalError || (mutationError ? getErrorMessage(mutationError) : null),
  };
};