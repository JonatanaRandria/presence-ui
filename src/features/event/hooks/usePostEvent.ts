import { useCallback } from 'react';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import type { Event, CreateEvent } from '../types';
import { useForm } from '@/lib/useForm';
import { getErrorMessage } from '@/api/utils';
import { useCreateEventMutation } from '../api/eventApi';

type usePostEventProps = {
  // ❌ SUPPRESSION : userId n'est plus requis ici car il est inclus dans defaultValues/schema
  schema: yup.ObjectSchema<CreateEvent>;
  defaultValues?: CreateEvent;
  onSuccess?: (payload: Event) => void;
};

// ❌ SUPPRESSION : userId est retiré des arguments déstructurés
export const usePostEvent = ({ schema, defaultValues, onSuccess }: usePostEventProps) => {
  const useFormApi = useForm<CreateEvent>({ resolver: yupResolver(schema), defaultValues });
  const [createEvent] = useCreateEventMutation();

  const handleSubmit = useCallback(
    useFormApi.handleSubmit(async (payload) => {
      try {       
          const result = await createEvent({ ...payload }).unwrap();
          onSuccess?.(result);
      } catch (err) {
        useFormApi.setError('root.serverError', { message: getErrorMessage(err) });
      }
    }),
    [useFormApi.handleSubmit, useFormApi.setError, createEvent, onSuccess] // 💡 Mise à jour des dépendances
  );

  return {
    useFormApi,
    handleSubmit,
    register: useFormApi.register,
    errors: useFormApi.formState.errors,
    isSubmitting: useFormApi.formState.isSubmitting,
  };
};