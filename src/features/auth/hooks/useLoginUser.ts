import { useCallback } from 'react';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from '@/lib/useForm';
import { getErrorMessage } from '@/api/utils';
import type { LoginCredentials, User } from '../types/auth';
import { useLoginWithCredentialsMutation } from '../api/loginApi'; 
import { useAppDispatch } from '@/hooks/store';

type useLoginUserProps = {
  schema: yup.ObjectSchema<LoginCredentials>;
  defaultValues: LoginCredentials;
  onSuccess?: (user: User) => void;
};

export const useLoginUser = ({ schema, defaultValues, onSuccess }: useLoginUserProps) => {
  const dispatch = useAppDispatch();
  // ❌ Le type <LoginCredentials> ne doit plus contenir 'remember'
  const useFormApi = useForm<LoginCredentials>({ resolver: yupResolver(schema), defaultValues });
  const { handleSubmit, formState } = useFormApi;
  const [userLogin, mutationState] = useLoginWithCredentialsMutation();

  // ❌ Suppression de '{ remember, ...formState }' dans handleSubmit
  const onSubmit = useCallback(
    handleSubmit(async (formState) => {
      try {
        // ❌ Suppression du dispatch 'rememberAuth'
        const user = await userLogin(formState).unwrap(); 
        onSuccess?.(user);
      } catch (err) {
        useFormApi.setError('root.serverError', { message: getErrorMessage(err) });
      }
    }),
    [handleSubmit, useFormApi.setError, userLogin, onSuccess, dispatch]
  );

  return {
    useFormApi,
    mutationState,
    onSubmit,
    register: useFormApi.register,
    errors: formState.errors,
    isSubmitting: formState.isSubmitting,
  };
};