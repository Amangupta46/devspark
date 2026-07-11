// Placeholder React Query Hook
// import { useQuery } from '@tanstack/react-query';

export function useCrm() {
  /*
  return useQuery({
    queryKey: ['crm'],
    queryFn: crmService.getAll
  });
  */
  return { data: [], isLoading: false };
}

// import { useMutation, useQueryClient } from '@tanstack/react-query';
// import { crmKeys } from '../constants';

export function useCreateCrm() {
  return { mutate: (data: any) => {}, isLoading: false };
}

export function useUpdateCrm() {
  return { mutate: (data: any) => {}, isLoading: false };
}

export function useDeleteCrm() {
  return { mutate: (id: string) => {}, isLoading: false };
}
