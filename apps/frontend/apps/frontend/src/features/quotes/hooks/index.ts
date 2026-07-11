// Placeholder React Query Hook
// import { useQuery } from '@tanstack/react-query';

export function useQuotes() {
  /*
  return useQuery({
    queryKey: ['quotes'],
    queryFn: quotesService.getAll
  });
  */
  return { data: [], isLoading: false };
}

// import { useMutation, useQueryClient } from '@tanstack/react-query';
// import { quotesKeys } from '../constants';

export function useCreateQuotes() {
  return { mutate: (data: any) => {}, isLoading: false };
}

export function useUpdateQuotes() {
  return { mutate: (data: any) => {}, isLoading: false };
}

export function useDeleteQuotes() {
  return { mutate: (id: string) => {}, isLoading: false };
}
