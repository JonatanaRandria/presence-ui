import { useEffect, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useGetAllEventsQuery } from '../api/eventApi';
import { getErrorMessage } from '@/api/utils';

export const useEventList = (props = {}) => {
  const { defaultQuery = '' } = props;
  const [searchParams, setSearchParams] = useSearchParams();

  const query = searchParams.get('query') ?? defaultQuery;

  const { data, isFetching, isLoading, error } = useGetAllEventsQuery(undefined, {
    refetchOnMountOrArgChange: true,
    refetchOnFocus: true,
    refetchOnReconnect: true,
  });

  const handleSearchChange = (value: string) => {
    if (value !== '') {
      searchParams.set('query', value);
    } else {
      searchParams.delete('query');
    }
    setSearchParams(searchParams, { replace: true });
  };

  const filteredEvents = useMemo(() => {
    if (!query) return data ?? [];
    return (data ?? []).filter((event) =>
      event.title.toLowerCase().includes(query.toLowerCase())
    );
  }, [data, query]);

  useEffect(() => {
    window.scrollTo({ top: 0 });
  }, [query]);

  return {
    searchParams,
    handleSearchChange,
    query,
    events: filteredEvents,
    isLoading: isFetching || isLoading,
    error: error ? getErrorMessage(error) : '',
  };
};
