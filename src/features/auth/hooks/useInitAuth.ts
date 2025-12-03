// /src/features/auth/hooks/useInitAuth.ts

import { useEffect } from 'react';
import storage from '@/utils/storage';
// ⚠️ Importez la nouvelle mutation de vérification
import { useVerifyTokenMutation } from '../api/loginApi'; 

export const useInitAuth = () => {
  const token = storage.getToken();
  // Utilisez la nouvelle mutation useVerifyTokenMutation
  const [verifyToken, { isUninitialized, isLoading: isLoginLoading, isSuccess, isError }] = useVerifyTokenMutation();

  useEffect(() => {
    if (token) {
      // 🚀 L'appel est maintenant correct car l'argument correspond au type TokenVerificationCredentials
      verifyToken({ token }); 
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  
  // Le reste de la logique reste la même
  const isLoading = !!token && (isUninitialized || isLoginLoading);
  
  return { isLoading, isSuccess, isError };
};