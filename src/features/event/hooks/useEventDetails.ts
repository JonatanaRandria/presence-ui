import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useGetEventByIdQuery } from '../api/eventApi';
import { getErrorMessage } from '@/api/utils';

export const useEventDetails = () => {
  const { id } = useParams<{ id: string }>();

  const {
    data: event,
    isFetching,
    isLoading,
    error,
  } = useGetEventByIdQuery(id!, {
    skip: !id,
    refetchOnMountOrArgChange: true,
    refetchOnFocus: true,
    refetchOnReconnect: true,
  });

  useEffect(() => {
    window.scrollTo({ top: 0 });
  }, [id]);

  return {
    id,
    event,
    isLoading: isLoading || isFetching,
    error: error ? getErrorMessage(error) : '',
  };
};
