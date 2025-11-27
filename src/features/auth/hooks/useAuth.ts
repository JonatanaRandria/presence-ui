import { useCallback, useMemo, useState, useEffect } from 'react';
import { useAppSelector, useAppDispatch } from '@/hooks/store';
import { selectCurrentUser, logout as _logout, setCredentials } from '../stores/authSlice';
import storage from '@/utils/storage';

// NOTE: You must provide a way to construct the full 'User' object 
// from the stored data (token, userid) or make an API call (GET /me).
// The 'tempUser' below is a placeholder.

export const useAuth = () => {
  const user = useAppSelector(selectCurrentUser);
  const userId = user?.id;
  const dispatch = useAppDispatch();
  
  const [isLoading, setIsLoading] = useState(true); 

  const logout = useCallback(() => {
    dispatch(_logout());
  }, [dispatch]);
  
  useEffect(() => {
    const token = storage.getToken(); 
    const storedUserId = storage.getUserId(); 
    
    if (user) { 
        setIsLoading(false);
        return;
    }

    if (token && storedUserId) {
      // START OF PLACEHOLDER LOGIC: Replace with actual User retrieval
      // If the token is a simple JWT, you might decode it here.
      // Otherwise, you need to trigger a 'verify session' API call.
      
      const tempUser: any = { id: storedUserId, username: 'unknown', email: 'unknown' }; // Populate required User fields
      
      dispatch(setCredentials({ 
          token: token, 
          user: tempUser 
      }));
      // END OF PLACEHOLDER LOGIC
    }

    setIsLoading(false); 
    
  }, [dispatch, user]);

  return useMemo(() => ({ 
    user, 
    userId, 
    logout, 
    isLoading
  }), [user, userId, logout, isLoading]);
};