import { useCallback, useMemo } from 'react';
import { useAppSelector, useAppDispatch } from '@/hooks/store';
import { selectCurrentUser, logout as _logout } from '../stores/authSlice';
import storage from '@/utils/storage';

export const useAuth = () => {
  const user = storage.getToken();
  const userId = storage.getUserId();

  const dispatch = useAppDispatch();

  const logout = useCallback(() => {
    dispatch(_logout());
  }, [dispatch]);

  return useMemo(() => ({ user, userId, logout }), [user, userId, logout]);
};
