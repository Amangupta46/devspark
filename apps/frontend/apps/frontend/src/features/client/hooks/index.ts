// Placeholder React Query Hook
// import { useQuery } from '@tanstack/react-query';

export function useClient() {
  /*
  return useQuery({
    queryKey: ['client'],
    queryFn: clientService.getAll
  });
  */
  return { data: [], isLoading: false };
}

// import { useMutation, useQueryClient } from '@tanstack/react-query';
// import { clientKeys } from '../constants';

export function useCreateClient() {
  return { mutate: (data: any) => {}, isLoading: false };
}

export function useUpdateClient() {
  return { mutate: (data: any) => {}, isLoading: false };
}

export function useDeleteClient() {
  return { mutate: (id: string) => {}, isLoading: false };
}
