import { useEffect } from 'react';

import storage from '@/utils/storage';
import { useLoginMutation } from '../api/loginApi';

export const useInitAuth = () => {
  const token = storage.getToken();
  const [loginToken, { isUninitialized, isLoading, isSuccess, isError }] = useLoginMutation();

  useEffect(() => {
    if (token) {
      loginToken({ token });
    }
  }, []);

  if (!token) {
    return { isLoading, isSuccess, isError };
  }
  return { isLoading: isUninitialized ? true : isLoading, isSuccess, isError };
};
