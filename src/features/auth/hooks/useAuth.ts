// /src/features/auth/hooks/useAuth.ts

import { useCallback, useMemo, useState, useEffect } from 'react';
import { useAppSelector, useAppDispatch } from '@/hooks/store';
import { selectCurrentUser, logout as _logout, setCredentials } from '../stores/authSlice';
import storage from '@/utils/storage';
import type { AuthUser, User } from '../types/auth'; // Assurez-vous d'importer le type User réel

export const useAuth = () => {
  const user = useAppSelector(selectCurrentUser);
  const userId = user?.id;
  const dispatch = useAppDispatch();
  
  // 💡 INITIALISATION : Toujours commencer par true pour bloquer le rendu
  const [isLoading, setIsLoading] = useState(true); 

  const logout = useCallback(() => {
    dispatch(_logout());
  }, [dispatch]);
  
  useEffect(() => {
    // Si l'utilisateur est déjà chargé dans Redux, l'attente est terminée.
    if (user) { 
        setIsLoading(false);
        return;
    }

    const token = storage.getToken(); 
    const storedUserId = storage.getUserId(); 
    
    if (token && storedUserId) {
      // 💡 LOGIQUE SYNCHRONE : Charge l'utilisateur temporaire à partir de localStorage
      const tempUser: AuthUser = { id: storedUserId, username: 'unknown', email: 'unknown' }; 
      
      dispatch(setCredentials({ 
          token: token, 
          user: tempUser 
      }));
      
      // L'utilisateur sera chargé dans le prochain cycle d'exécution/rendu.
      // Nous laissons isLoading à true pour l'instant.

    } else {
        // Aucune donnée de connexion trouvée. Le chargement est terminé, l'utilisateur est déconnecté.
        setIsLoading(false); 
    }

  }, [dispatch, user]);

  return useMemo(() => ({ 
    user, 
    userId, 
    logout, 
    isLoading
  }), [user, userId, logout, isLoading]);
};